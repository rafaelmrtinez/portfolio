const APP_ENV = import.meta.env.VITE_APP_ENV;

const API_BASE_URL =
  APP_ENV === "dev" ? "http://localhost:8000" : import.meta.env.VITE_API_BASE_URL;

interface ProblemDetails {
  detail?: unknown;
  title?: string;
}

interface ChatResponse {
  output: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly retryAfter?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

let sessionRequest: Promise<void> | null = null;
let sessionReady = false;

function getApiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error("The API base URL is not configured.");
  }

  return `${API_BASE_URL.replace(/\/$/, "")}${path}`;
}

async function getErrorMessage(response: Response) {
  const body = await response.text();
  if (body) {
    try {
      const problem = JSON.parse(body) as ProblemDetails;
      if (Array.isArray(problem.detail)) {
        const messages = problem.detail
          .map((item) => (typeof item === "object" && item !== null && "msg" in item ? item.msg : undefined))
          .filter((message): message is string => typeof message === "string" && message.length > 0);
        if (messages.length > 0) return messages.join(". ");
      }
      if (typeof problem.detail === "string" || problem.title) {
        return typeof problem.detail === "string" ? problem.detail : problem.title ?? "";
      }
    } catch {
      return body;
    }
  }

  return `Request failed with status ${response.status}.`;
}

async function toApiError(response: Response) {
  const retryAfter = response.headers.get("Retry-After") ?? undefined;
  const detail = await getErrorMessage(response);
  const message =
    response.status === 429
      ? `Too many requests. Please try again later${retryAfter ? ` (Retry-After: ${retryAfter})` : ""}.`
      : response.status === 500
        ? "Tom is temporarily unavailable. Please try again later."
        : response.status === 502
          ? "The AI service is temporarily unavailable. Please try again later."
          : response.status === 503
            ? "The chat service is currently unavailable. Please try again later."
            : detail;

  return new ApiError(
    message,
    response.status,
    retryAfter,
  );
}

async function createSession(force = false): Promise<void> {
  if (!force && sessionReady) {
    return;
  }
  if (sessionRequest) {
    return sessionRequest;
  }

  sessionRequest = fetch(getApiUrl("/api/v1/session"), {
    method: "POST",
    credentials: "include",
  }).then(async (response) => {
    if (response.status !== 200 && response.status !== 201) {
      throw await toApiError(response);
    }
    sessionReady = true;
  });

  try {
    await sessionRequest;
  } catch (error) {
    sessionReady = false;
    sessionRequest = null;
    throw error;
  } finally {
    sessionRequest = null;
  }
}

export function ensureSession() {
  return createSession();
}

export async function revokeSession() {
  const response = await fetch(getApiUrl("/api/v1/session"), {
    method: "DELETE",
    credentials: "include",
  });

  if (response.status !== 204) {
    throw await toApiError(response);
  }

  sessionReady = false;
  sessionRequest = null;
}

async function requestChat(input: string) {
  return fetch(getApiUrl("/api/v1/chat"), {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
}

export async function sendChatMessage(input: string) {
  const normalizedInput = input.trim();
  if (!normalizedInput) {
    throw new ApiError("Please enter a message.", 422);
  }
  if (normalizedInput.length > 2000) {
    throw new ApiError("Messages must be 2,000 characters or fewer.", 422);
  }

  await ensureSession();
  let response = await requestChat(normalizedInput);

  if (response.status === 401) {
    await createSession(true);
    response = await requestChat(normalizedInput);
  }

  if (!response.ok) {
    throw await toApiError(response);
  }

  const body: unknown = await response.json();
  if (
    typeof body !== "object" ||
    body === null ||
    !("output" in body) ||
    typeof (body as ChatResponse).output !== "string"
  ) {
    throw new Error("The chat service returned an invalid response.");
  }

  return (body as ChatResponse).output;
}
