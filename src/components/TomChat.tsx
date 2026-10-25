import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { sendChatMessage } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  id: 0,
  role: "assistant",
  content: "Hi! I'm Tom, Rafael's personal assistant. How can I help you today?",
};

function safeUrl(url: string) {
  if (/^[a-z][a-z\d+\-.]*:/i.test(url) && !/^(https?:|mailto:|tel:)/i.test(url)) {
    return "";
  }

  return url;
}

export function TomChat() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const output = await sendChatMessage(text);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: output,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: error instanceof Error ? error.message : "Unable to reach Tom right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 min-w-0 w-full flex-col">
      {/* Header */}
      <div className="flex min-w-0 shrink-0 items-center gap-2 rounded-t-xl border-b px-4 py-3 text-primary-foreground">
        <Avatar className="h-7 w-7">
          <AvatarImage src="/tom-ai.png" alt="Tom" className="object-cover" />
          <AvatarFallback className="bg-primary-foreground text-primary text-xs font-bold">T</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-semibold leading-none text-muted-foreground">Tom</p>
          <p className="text-xs opacity-70 text-muted-foreground">Personal Assistant</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="min-h-0 min-w-0 flex-1 px-3 py-3">
        <div className="flex min-w-0 w-full max-w-full flex-col gap-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex min-w-0 w-full max-w-full items-end gap-2 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {msg.role === "assistant" && (
                <Avatar className="h-6 w-6 shrink-0">
                  <AvatarImage src="/tom-ai.png" alt="Tom" className="object-cover" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">T</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`min-w-0 break-words rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "w-fit max-w-[75%] bg-primary text-primary-foreground rounded-br-sm"
                    : "w-full max-w-[90%] bg-muted/10 text-foreground rounded-bl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    urlTransform={safeUrl}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="mt-[1.25em] mb-[0.5em] max-w-full break-words text-base font-semibold first:mt-0">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="mt-[1.25em] mb-[0.5em] max-w-full break-words text-base font-semibold first:mt-0">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="mt-[1.25em] mb-[0.5em] max-w-full break-words font-semibold first:mt-0">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => <p className="mb-[0.9em] max-w-full break-words last:mb-0">{children}</p>,
                      ul: ({ children }) => (
                        <ul className="mb-[0.9em] list-disc space-y-[0.35em] pl-5 last:mb-0">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="mb-[0.9em] list-decimal space-y-[0.35em] pl-5 last:mb-0">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="max-w-full break-words pl-1 [&>ul]:mt-[0.35em] [&>ol]:mt-[0.35em]">
                          {children}
                        </li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="my-[0.9em] max-w-full overflow-hidden border-l-2 border-primary/50 pl-3 italic">
                          {children}
                        </blockquote>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-words underline underline-offset-2"
                        >
                          {children}
                        </a>
                      ),
                      hr: () => <hr className="my-[1em] border-border/60" />,
                      table: ({ children }) => (
                        <div className="my-[0.9em] min-w-0 w-full max-w-full overflow-x-auto overflow-y-hidden overscroll-x-contain">
                          <table className="w-max min-w-full border-collapse text-left text-xs">{children}</table>
                        </div>
                      ),
                      th: ({ children }) => (
                        <th className="whitespace-nowrap border border-border/60 bg-muted/40 px-2 py-1 font-semibold">
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td className="whitespace-nowrap border border-border/60 px-2 py-1 align-top">{children}</td>
                      ),
                      del: ({ children }) => <del>{children}</del>,
                      pre: ({ children }) => (
                        <pre className="my-[0.9em] w-full max-w-full overflow-x-auto rounded-md bg-muted p-2 text-xs leading-normal">
                          {children}
                        </pre>
                      ),
                      code: ({ children }) => (
                        <code className="break-words rounded bg-muted/60 px-1 py-0.5 font-mono text-[0.9em]">
                          {children}
                        </code>
                      ),
                      img: ({ src, alt, title }) => (
                        <img src={src} alt={alt ?? ""} title={title} className="h-auto max-w-full" loading="lazy" />
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2">
              <Avatar className="h-6 w-6 shrink-0">
                <AvatarImage src="/tom-ai.png" alt="Tom" className="object-cover" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">T</AvatarFallback>
              </Avatar>
              <div className="bg-muted/10 rounded-2xl rounded-bl-sm px-3 py-2">
                <span className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex min-w-0 shrink-0 gap-2 border-t px-3 py-3">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void sendMessage();
            }
          }}
          placeholder="Ask Tom anything…"
          maxLength={2000}
          className="min-w-0 flex-1 text-sm"
          disabled={isLoading}
        />
        <Button className="shrink-0" size="icon" onClick={sendMessage} disabled={!input.trim() || isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
