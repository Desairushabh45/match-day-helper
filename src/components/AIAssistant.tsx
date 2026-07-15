/**
 * @fileoverview AIAssistant — Multilingual GenAI chat widget for StadiumIQ.
 * Provides a floating chat button and panel powered by the Gemini AI model
 * via a TanStack Start server function. Supports 5 languages, rate limiting,
 * input sanitisation, and keyboard-accessible interaction.
 *
 * @module AIAssistant
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithStadiumIQ } from "@/lib/chat.functions";
import { sanitizeInput } from "@/lib/helpers";
import { LANGUAGES, MAX_CHAT_LENGTH, RATE_LIMIT_PER_MINUTE } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";

/** A single chat message with a role and text content */
interface Msg {
  /** Originator of the message */
  role: "user" | "assistant";
  /** Message text content */
  content: string;
}

/** Props accepted by the AIAssistant component */
interface AIAssistantProps {
  /** Optional seed message to pre-fill the input when the panel opens */
  seedMessage?: string;
}

/**
 * Floating multilingual AI assistant widget for StadiumIQ.
 * Renders a toggle button (bottom-right) that opens a chat panel powered by
 * the Google Gemini AI model. Implements:
 * - Client-side rate limiting (max {@link RATE_LIMIT_PER_MIN} msgs/min)
 * - Input sanitisation via {@link sanitizeInput}
 * - Debounced character counter to reduce re-renders during typing
 * - Smooth scroll-to-bottom on new messages
 * - Keyboard shortcut: Enter to send, Shift+Enter for newline
 *
 * @param {AIAssistantProps} props - Component props
 * @returns {JSX.Element} The floating chat button and optional chat panel
 */
export function AIAssistant({ seedMessage }: AIAssistantProps) {
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

  /** Debounced input value — used for character counter to reduce renders */
  const debouncedInput = useDebounce(input, 300);

  // Pre-fill the input field with the seed message when the panel opens
  useEffect(() => {
    if (seedMessage && open) setInput(seedMessage);
  }, [seedMessage, open]);

  // Auto-scroll to the latest message on update
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  /**
   * Whether the send button/action should be enabled.
   * Memoised to avoid recomputing on every render.
   */
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  /**
   * Sends the current input to the AI assistant via the server function.
   * Performs rate-limit checking, sanitisation, and optimistic UI update.
   *
   * @returns {Promise<void>}
   */
  const handleSend = useCallback(async () => {
    const clean = sanitizeInput(input.trim());
    if (!clean) return;
    const now = Date.now();
    timestampsRef.current = timestampsRef.current.filter((t) => now - t < 60_000);
    if (timestampsRef.current.length >= RATE_LIMIT_PER_MINUTE) {
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

  /**
   * Keyboard handler for the textarea — sends message on Enter (without Shift).
   *
   * @param {React.KeyboardEvent<HTMLTextAreaElement>} e - Keyboard event
   * @returns {void}
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void handleSend();
      }
    },
    [handleSend],
  );

  /**
   * Toggles the chat panel open or closed.
   *
   * @returns {void}
   */
  const handleToggle = useCallback(() => setOpen((o) => !o), []);

  const handleLanguageChange = useCallback((langToSet: string) => {
    setLang(langToSet);
  }, []);

  return (
    <>
      <button
        aria-label={open ? "Close AI assistant" : "Open AI assistant chat"}
        onClick={handleToggle}
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
              <h3 className="text-sm font-bold text-primary">AI Multilingual Assistance</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Powered by Grok AI · Available in 5 languages ·<br/>
                Navigation, crowd management, accessibility support
              </p>
            </div>
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="rounded-md border border-border bg-input px-2 py-1 text-xs"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.flag} {l.name}
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
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask about gates, matches, transport…"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                className="flex-1 resize-none rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                aria-label="Send message"
                onClick={handleSend}
                disabled={!canSend}
                className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </div>
            <div className="mt-1 text-right text-[10px] text-muted-foreground">
              {debouncedInput.length}/{MAX_CHAT_LENGTH}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
