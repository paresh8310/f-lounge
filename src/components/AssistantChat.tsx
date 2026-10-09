import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BUSINESS, HAS_WHATSAPP, whatsappLink } from "../data/business";
import { CloseIcon, SendIcon, WhatsAppIcon } from "./icons";

interface Msg {
  role: "user" | "bot";
  text: string;
}

/**
 * F.LOUNGE style assistant.
 *
 * Two modes:
 *  1. Backend mode — set AI_ASSISTANT_ENDPOINT (a secure server route
 *     holding the AI credentials; see README) and the chat will POST
 *     { message } to it and use { reply }.
 *  2. Local mode (default) — answers from VERIFIED business config only.
 *     Anything it cannot answer escalates to WhatsApp. It never invents
 *     prices, stock or availability.
 */
const LOCAL_ANSWERS: { match: RegExp; reply: string }[] = [
  {
    match: /(hour|open|close|timing|time)/i,
    reply: `We're listed as open daily, ${BUSINESS.hoursLines[1]} (as shown on our Justdial listing). Pop by anytime within those hours!`,
  },
  {
    match: /(where|location|address|direction|reach|map)/i,
    reply: `You'll find us in ${BUSINESS.locality}, ${BUSINESS.city}. Tap "Visit Our Store" for directions and our listing link.`,
  },
  {
    match: /(instagram|insta|gram|follow|post)/i,
    reply: `We're @${BUSINESS.instagram.handle} on Instagram — see the latest drops on the feed and follow us for new arrivals!`,
  },
  {
    match: /(price|cost|rate|how much|₹|rupee)/i,
    reply: "Prices vary by piece and change with new stock — the team on WhatsApp will give you exact, current pricing for anything you like.",
  },
  {
    match: /(size|fit|sizing|xl|xxl|measurement)/i,
    reply: "Sizes available depend on the piece. Send us the outfit you're eyeing on WhatsApp and we'll confirm what's in stock in your size.",
  },
  {
    match: /(men|woman|women|kid|child|girl|boy)/i,
    reply: "We stock readymade fits across women's, men's and kids' wear. Tell the WhatsApp team what you're looking for and they'll share photos of what's in store.",
  },
  {
    match: /(hi|hello|hey|yo|vanakkam|namaste)/i,
    reply: "Hey! I'm the F.LOUNGE style buddy. Ask me about the store, timings, location or what we stock — for live prices and availability I'll pass you to the team on WhatsApp.",
  },
];

const ESCALATION = `That's one for the humans! The F.LOUNGE team on WhatsApp can check live stock, sizes and prices for you${
  HAS_WHATSAPP ? " — tap below to continue the chat there." : "."
}`;

/** Optional secure backend endpoint — set in business.ts to enable server-side AI. Empty = local mode (no network calls). */
const ASSISTANT_ENDPOINT = ""; // e.g. "/api/assistant"

export default function AssistantChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hey! I'm the F.LOUNGE style buddy. Ask me about the store, timings, location or what we stock.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setBusy(true);

    let reply: string | null = null;

    // 1. Try the secure backend (only when ASSISTANT_ENDPOINT is configured).
    if (ASSISTANT_ENDPOINT) {
      try {
        const res = await fetch(ASSISTANT_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const data = (await res.json()) as { reply?: string };
          if (data.reply) reply = data.reply;
        }
      } catch {
        /* no backend configured — fall through to local answers */
      }
    }

    // 2. Local verified-knowledge fallback.
    if (!reply) {
      const hit = LOCAL_ANSWERS.find((a) => a.match.test(text));
      reply = hit ? hit.reply : ESCALATION;
    }

    setMessages((m) => [...m, { role: "bot", text: reply! }]);
    setBusy(false);
  }

  const wa = whatsappLink("Hi F.LOUNGE! I have a question about your store.");

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-label="F.LOUNGE style assistant"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-4 bottom-24 z-[66] flex h-[480px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-bone/15 bg-obsidian shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:right-7"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-onyx px-4 py-3">
        <div>
          <p className="text-sm font-bold tracking-wide text-bone">STYLE ASSISTANT</p>
          <p className="text-[10px] tracking-[0.2em] text-lime uppercase">F.LOUNGE · Beta</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="grid h-9 w-9 place-items-center rounded-full border border-bone/15 text-bone/70 hover:text-bone"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <p
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-lime text-obsidian"
                  : "rounded-bl-sm bg-onyx text-bone/90"
              }`}
            >
              {m.text}
            </p>
          </div>
        ))}
        {busy && (
          <div className="flex justify-start">
            <p className="rounded-2xl rounded-bl-sm bg-onyx px-3.5 py-2.5 text-sm text-bone/50">…</p>
          </div>
        )}
      </div>

      {/* WhatsApp escalation */}
      {HAS_WHATSAPP && wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mb-2 flex items-center justify-center gap-2 rounded-full bg-[#25d366]/15 py-2 text-xs font-bold tracking-wide text-[#25d366] transition-colors hover:bg-[#25d366]/25"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Continue on WhatsApp
        </a>
      )}

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="flex items-center gap-2 border-t border-bone/10 bg-onyx px-3 py-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about fits, timings…"
          aria-label="Message the style assistant"
          className="flex-1 rounded-full bg-obsidian px-4 py-2.5 text-sm text-bone placeholder:text-bone/35 focus:outline-none focus:ring-1 focus:ring-lime/60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          aria-label="Send message"
          className="grid h-10 w-10 place-items-center rounded-full bg-lime text-obsidian transition-transform active:scale-95 disabled:opacity-40"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </motion.div>
  );
}
