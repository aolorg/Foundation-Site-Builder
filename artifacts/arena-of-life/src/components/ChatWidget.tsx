import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";
import { useSubmitContact } from "@workspace/api-client-react";

const base = import.meta.env.BASE_URL; // includes trailing slash

type Msg = { role: "user" | "assistant"; content: string };

const NAVY = "hsl(215,65%,16%)";
const GOLD = "hsl(43,85%,50%)";

const WELCOME =
  "Welcome to the Arena of Life Foundation. Ask me anything — our mission, programs, events, donations, or how to get involved. If I can't help, I'll take a message for our founder.";
const MAX_CONTACT_MESSAGE_LENGTH = 5000;
const MAX_CHAT_CONTEXT_LENGTH = 900;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [mode, setMode] = useState<"chat" | "leave-message" | "message-sent">("chat");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState("");
  const { mutateAsync: submitContact, isPending } = useSubmitContact();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, mode, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      const res = await fetch(`${base}api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // The server supplies the only trusted instruction/assistant context.
          messages: history
            .filter((message) => message.role === "user")
            .slice(-10),
        }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";
        for (const evt of events) {
          const line = evt.trim();
          if (!line.startsWith("data:")) continue;
          const payload = JSON.parse(line.slice(5).trim());
          if (payload.content) {
            acc += payload.content;
            setMessages([...history, { role: "assistant", content: acc }]);
          }
          if (payload.error) throw new Error(payload.error);
        }
      }
      if (!acc) throw new Error("Empty response");
    } catch (err) {
      setMessages([
        ...history,
        {
          role: "assistant",
          content:
            (err instanceof Error && err.message !== "Empty response" && err.message !== "Request failed"
              ? err.message + " "
              : "I'm having trouble answering right now. ") +
            "You can leave a message below and our founder will get back to you.",
        },
      ]);
    } finally {
      setStreaming(false);
    }
  };

  const sendMessageToFounder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    try {
      const lastQuestions = messages
        .filter((m) => m.role === "user")
        .slice(-3)
        .map((m) => `- ${m.content}`)
        .join("\n")
        .slice(0, MAX_CHAT_CONTEXT_LENGTH);
      const context = lastQuestions ? `\n\n(Visitor's recent chat questions:\n${lastQuestions})` : "";
      const message = form.message.trim().slice(0, MAX_CONTACT_MESSAGE_LENGTH - context.length) + context;
      await submitContact({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          inquiryType: "Chat Assistant Message",
          message,
        },
      });
      setMode("message-sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setFormError("Couldn't send your message. Please check your name, email, and message, then try again.");
    }
  };

  return (
    <>
      {/* Floating bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        data-testid="chat-bubble-button"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: GOLD, color: NAVY }}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          data-testid="chat-panel"
          className="fixed bottom-24 right-5 z-50 w-[min(24rem,calc(100vw-2.5rem))] h-[min(34rem,calc(100vh-8rem))] rounded-2xl shadow-2xl border border-black/10 flex flex-col overflow-hidden bg-white"
        >
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between" style={{ background: NAVY }}>
            <div>
              <p className="text-white font-bold text-sm">Arena of Life Assistant</p>
              <p className="text-xs" style={{ color: GOLD }}>
                Ask about our mission, programs & events
              </p>
            </div>
            {mode !== "chat" ? (
              <button
                onClick={() => setMode("chat")}
                className="text-white/70 hover:text-white text-xs underline"
                data-testid="chat-back-button"
              >
                Back to chat
              </button>
            ) : (
              <button
                onClick={() => setMode("leave-message")}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md"
                style={{ background: GOLD, color: NAVY }}
                data-testid="chat-leave-message-button"
              >
                <Mail size={13} /> Leave a message
              </button>
            )}
          </div>

          {mode === "chat" && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[hsl(220,20%,97%)]">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                      style={
                        m.role === "user"
                          ? { background: NAVY, color: "white" }
                          : { background: "white", color: "hsl(215,30%,20%)", border: "1px solid hsl(220,15%,90%)" }
                      }
                    >
                      {m.content || (
                        <span className="inline-flex gap-1 items-center py-1">
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: GOLD }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:120ms]" style={{ background: GOLD }} />
                          <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:240ms]" style={{ background: GOLD }} />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="p-3 border-t border-gray-100 bg-white flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                maxLength={1000}
                  data-testid="chat-input"
                  className="flex-1 text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsl(43,85%,50%)]"
                />
                <button
                  type="submit"
                  disabled={streaming || !input.trim()}
                  aria-label="Send"
                  data-testid="chat-send-button"
                  className="w-10 h-10 rounded-lg flex items-center justify-center disabled:opacity-40"
                  style={{ background: NAVY, color: GOLD }}
                >
                  <Send size={17} />
                </button>
              </form>
            </>
          )}

          {mode === "leave-message" && (
            <form onSubmit={sendMessageToFounder} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[hsl(220,20%,97%)]">
              <p className="text-sm text-gray-600">
                Leave your details and message — it goes straight to our founder.
              </p>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                maxLength={200}
                data-testid="chat-form-name"
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsl(43,85%,50%)]"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email address"
                maxLength={320}
                data-testid="chat-form-email"
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsl(43,85%,50%)]"
              />
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Your message or question"
                maxLength={4000}
                data-testid="chat-form-message"
                className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[hsl(43,85%,50%)] resize-none"
              />
              {formError && <p className="text-xs text-red-600">{formError}</p>}
              <button
                type="submit"
                disabled={isPending}
                data-testid="chat-form-submit"
                className="w-full py-2.5 rounded-lg text-sm font-bold disabled:opacity-50"
                style={{ background: GOLD, color: NAVY }}
              >
                {isPending ? "Sending…" : "Send to the Founder"}
              </button>
            </form>
          )}

          {mode === "message-sent" && (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center bg-[hsl(220,20%,97%)]">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ background: GOLD }}>
                <Mail size={22} color={NAVY} />
              </div>
              <p className="font-bold text-base mb-1" style={{ color: NAVY }}>
                Message sent
              </p>
              <p className="text-sm text-gray-600">
                Thank you — your message is on its way to our founder. We'll be in touch soon.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
