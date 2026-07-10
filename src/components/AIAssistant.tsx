import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithStadiumIQ } from "@/lib/chat.functions";
import { sanitizeInput } from "@/lib/helpers";
import { LANGUAGES, MAX_CHAT_LENGTH, RATE_LIMIT_PER_MIN } from "@/lib/constants";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant({ seedMessage }: { seedMessage?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Hi! I'm StadiumIQ. Ask me about gates, transport, matches, or accessibility.",
    },
  ]);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timestampsRef = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chat = useServerFn(chatWithStadiumIQ);

  useEffect(() => {
    if (seedMessage && open) setInput(seedMessage);
  }, [seedMessage, open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const send = useCallback(async () => {
    const clean = sanitizeInput(input.trim());
    if (!clean) return;
    const now = Date.now();
    timestampsRef.current = timestampsRef.current.filter((t) => now - t < 60_000);
    if (timestampsRef.current.length >= RATE_LIMIT_PER_MIN) {
      setError("You're sending messages too quickly. Please wait a moment.");
      return;
    }
    timestampsRef.current.push(now);
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await chat({ data: { messages: next, language: lang } });
      setMessages((m) => [...m, { role: "assistant", content: reply || "…" }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [input, messages, chat, lang]);

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void send();
      }
    },
    [send],
  );

  return (
    <>
      <button
        aria-label={open ? "Close AI assistant" : "Open AI assistant chat"}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="StadiumIQ AI assistant"
          className="fixed bottom-24 right-4 z-50 flex h-[32rem] w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:right-6"
        >
          <div className="flex items-center justify-between border-b border-border bg-navy px-4 py-3">
            <div>
              <div className="text-sm font-bold text-primary">StadiumIQ</div>
              <div className="text-[11px] text-muted-foreground">AI-powered stadium concierge</div>
            </div>
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-md border border-border bg-input px-2 py-1 text-xs"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.label}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Thinking…
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="rounded-md bg-destructive/20 p-2 text-xs text-destructive"
              >
                {error}
              </div>
            )}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-end gap-2">
              <textarea
                aria-label="Message StadiumIQ"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHAT_LENGTH))}
                onKeyDown={onKey}
                rows={2}
                placeholder="Ask about gates, matches, transport…"
                className="flex-1 resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                aria-label="Send message"
                onClick={send}
                disabled={!canSend}
                className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </div>
            <div className="mt-1 text-right text-[10px] text-muted-foreground">
              {input.length}/{MAX_CHAT_LENGTH}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
