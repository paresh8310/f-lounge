import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HAS_WHATSAPP, whatsappLink } from "../data/business";
import { WhatsAppIcon, CloseIcon, SparkIcon } from "./icons";
import AssistantChat from "./AssistantChat";

/**
 * Floating WhatsApp button — always available, independent of the AI chat.
 * Also hosts the optional AI assistant launcher (chat degrades to WhatsApp
 * when no backend/AI credentials are configured).
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappLink();

  return (
    <>
      <AnimatePresence>{chatOpen && <AssistantChat onClose={() => setChatOpen(false)} />}</AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, y: visible ? 0 : 16 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="fixed right-4 bottom-6 z-[65] flex flex-col items-end gap-3 md:right-7 md:bottom-7"
      >
        {/* AI assistant launcher */}
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-expanded={chatOpen}
          aria-label={chatOpen ? "Close style assistant" : "Open style assistant"}
          className="grid h-12 w-12 place-items-center rounded-full border border-bone/20 bg-onyx/90 text-lime shadow-[0_14px_34px_-12px_rgba(0,0,0,0.8)] backdrop-blur transition-colors hover:border-lime"
        >
          {chatOpen ? <CloseIcon className="h-5 w-5" /> : <SparkIcon className="h-5 w-5" />}
        </button>

        {/* Direct WhatsApp CTA — works regardless of AI config */}
        {HAS_WHATSAPP && wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with F.LOUNGE on WhatsApp — message is pre-filled for you"
            className="wa-pulse grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_16px_36px_-12px_rgba(37,211,102,0.65)]"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </a>
        ) : (
          <span
            className="grid h-14 w-14 place-items-center rounded-full bg-smoke text-bone/40"
            title="WhatsApp number not configured yet — set it in src/data/business.ts"
            aria-hidden
          >
            <WhatsAppIcon className="h-7 w-7" />
          </span>
        )}
      </motion.div>
    </>
  );
}
