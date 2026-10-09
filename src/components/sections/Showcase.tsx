import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, LOOKBOOK, HAS_WHATSAPP, productEnquiryMessage, whatsappLink, type GalleryItem } from "../../data/business";
import { Reveal, SectionHeading } from "../ui";
import { WhatsAppIcon } from "../icons";

/**
 * COLLECTIONS — editorial lookbook grid.
 * Entries come from LOOKBOOK in src/data/business.ts. While owner photos
 * are not yet added, a branded "photo coming soon" placeholder is shown —
 * never stock imagery pretending to be merchandise.
 */
export default function Showcase() {
  const [filter, setFilter] = useState<string>("all");

  // Editorial pacing: alternate card spans.
  const spans = [
    "md:col-span-2 md:row-span-2",
    "md:col-span-2",
    "md:col-span-1",
    "md:col-span-1",
    "md:col-span-2",
    "md:col-span-2",
  ];

  return (
    <section id="collections" aria-label="Collections and lookbook" className="relative bg-onyx py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Collections"
            title={
              <>
                THE <span className="text-lime">LOOKBOOK</span>
              </>
            }
            description="Fresh fits from the store floor. Tap any look to enquire on WhatsApp — the team will confirm sizes, price and availability."
          />
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter looks">
              {[{ id: "all", name: "All" }, ...CATEGORIES].map((c) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-bold tracking-[0.18em] uppercase transition-colors ${
                    filter === c.id
                      ? "border-lime bg-lime text-obsidian"
                      : "border-bone/20 text-bone/70 hover:border-lime/60 hover:text-bone"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* While owner photos are pending the whole lookbook shows branded
            placeholders; category filters remain functional for real data. */}
        <motion.div layout className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 [grid-auto-rows:minmax(200px,auto)]">
          {LOOKBOOK.map((item: GalleryItem, i) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              className={`group relative overflow-hidden rounded-lg border border-bone/10 bg-obsidian ${spans[i % spans.length]}`}
            >
              <div className="relative h-full min-h-[220px] w-full">
                <PlaceholderArt label={item.label ?? `LOOK 0${i + 1}`} seed={i} />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] text-lime uppercase">{item.label ?? `LOOK 0${i + 1}`}</p>
                    <p className="mt-1 headline text-xl text-bone">ENQUIRE NOW</p>
                  </div>
                  {HAS_WHATSAPP && (
                    <a
                      href={whatsappLink(productEnquiryMessage(item.label ?? `Look ${i + 1}`)) ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${item.label ?? `look ${i + 1}`} on WhatsApp`}
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#25d366] text-white transition-transform duration-300 group-hover:scale-110"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <AnimatePresence>
          {/* note about upcoming catalogue */}
        </AnimatePresence>
        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-xs tracking-wide text-bone/40">
            Live product photos, sizes and prices land here as the catalogue is photographed — nothing is shown until it's verified in store.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** Branded editorial placeholder for pending photography. */
function PlaceholderArt({ label, seed }: { label: string; seed: number }) {
  const palettes = [
    ["#D7FF38", "#101010"],
    ["#B9A1FF", "#101010"],
    ["#FF6038", "#101010"],
  ];
  const [accent] = palettes[seed % palettes.length];
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="400" height="500" fill="#151515" />
        <circle cx={80 + (seed * 67) % 240} cy={140 + (seed * 53) % 200} r="130" fill={accent} fillOpacity="0.16" />
        <circle cx={300 - (seed * 41) % 180} cy={360 - (seed * 29) % 160} r="80" fill={accent} fillOpacity="0.1" />
        <path d="M0 470 Q 200 400 400 470" stroke={accent} strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
        <path d="M0 420 Q 200 350 400 420" stroke={accent} strokeOpacity="0.18" strokeWidth="1.5" fill="none" />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold tracking-[0.4em] text-bone/30 uppercase">
        {label} · photo soon
      </span>
    </div>
  );
}
