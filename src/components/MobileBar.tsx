import { BUSINESS, whatsappLink } from "../data/business";
import { InstagramIcon, WhatsAppIcon, SparkIcon } from "./icons";

/** Persistent bottom bar — mobile only (COLLECTIONS / INSTAGRAM / WHATSAPP). */
export default function MobileBar() {
  const wa = whatsappLink();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-bone/10 bg-obsidian/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      role="navigation"
      aria-label="Quick actions"
    >
      <div className="grid grid-cols-3 divide-x divide-bone/10">
        <a
          href="#collections"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold tracking-wide text-bone/80 active:bg-bone/5"
        >
          <SparkIcon className="h-[18px] w-[18px] text-lime" />
          Collection
        </a>
        <a
          href={BUSINESS.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold tracking-wide text-bone/80 active:bg-bone/5"
        >
          <InstagramIcon className="h-[18px] w-[18px] text-lavender" />
          Instagram
        </a>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 bg-lime py-2.5 text-[11px] font-bold tracking-wide text-obsidian active:bg-bone"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
        ) : (
          <a
            href="#visit"
            className="flex flex-col items-center gap-1 bg-lime py-2.5 text-[11px] font-bold tracking-wide text-obsidian active:bg-bone"
          >
            <SparkIcon className="h-[18px] w-[18px]" />
            Visit Us
          </a>
        )}
      </div>
    </div>
  );
}
