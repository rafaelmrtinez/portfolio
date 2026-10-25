import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { TomChat } from "./TomChat";

const INITIAL_GREETING = "Hi, I am Tom. Let's chat!";
const CLOSE_GREETING = "Just ping me whenever you need help!";
const GREETING_VISIBLE_MS = 3000;
const INITIAL_GREETING_DELAY_MS = 1200;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(INITIAL_GREETING);
  const [showGreeting, setShowGreeting] = useState(false);
  const greetingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowGreeting(true);
      greetingTimer.current = setTimeout(() => setShowGreeting(false), GREETING_VISIBLE_MS);
    }, INITIAL_GREETING_DELAY_MS);

    return () => {
      clearTimeout(showTimer);
      if (greetingTimer.current) clearTimeout(greetingTimer.current);
    };
  }, []);

  const clearGreetingTimer = () => {
    if (greetingTimer.current) {
      clearTimeout(greetingTimer.current);
      greetingTimer.current = null;
    }
  };

  const toggleChat = () => {
    if (open) {
      setOpen(false);
      clearGreetingTimer();
      setGreeting(CLOSE_GREETING);
      setShowGreeting(true);
      greetingTimer.current = setTimeout(() => setShowGreeting(false), GREETING_VISIBLE_MS);
    } else {
      setOpen(true);
      clearGreetingTimer();
      setShowGreeting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 h-[480px] rounded-xl border shadow-2xl bg-background flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-200">
          <TomChat />
        </div>
      )}
      <div className="flex items-center gap-3">
        {/* Greeting bubble */}
        {!open && (
          <div
            className={`bg-background border shadow-md rounded-2xl rounded-br-sm px-4 py-2 text-sm font-medium text-foreground whitespace-nowrap transition-all duration-500 ease-out ${
              showGreeting
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-3 pointer-events-none"
            }`}
          >
            {greeting}
          </div>
        )}
        <Button
          size="icon"
          className="h-16 w-16 rounded-full shadow-xl overflow-hidden p-0 shrink-0 ring-2 ring-primary/40 ring-offset-2 transition-transform duration-300 hover:scale-105"
          onClick={toggleChat}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <img src="/tom-ai.png" alt="Tom" className="h-full w-full rounded-full object-cover" />
          )}
        </Button>
      </div>
    </div>
  );
}
