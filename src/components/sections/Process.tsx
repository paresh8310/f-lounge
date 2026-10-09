import {
  BUSINESS,
  HAS_ADDRESS,
  HAS_PHONE,
  MAPS_DIRECTIONS_URL,
  MAPS_LISTING_URL,
  whatsappLink,
  STORE_PHOTOS,
} from "../../data/business";
import { Reveal, SectionHeading } from "../ui";
import { ArrowUpRightIcon, ClockIcon, InstagramIcon, MapPinIcon, StarIcon, WhatsAppIcon } from "../icons";

/**
 * VISIT F.LOUNGE — store info & trust.
 * - Address: only shown when verified (HAS_ADDRESS). Otherwise locality only.
 * - Hours: as listed on the Justdial listing.
 * - Rating: attributed to Justdial, from the supplied screenshot — not live.
 */
export default function Process() {
  const wa = whatsappLink("Hi F.LOUNGE! I'd like to visit the store — could you share directions and details?");

  return (
    <section id="visit" aria-label="Visit F.LOUNGE" className="relative bg-obsidian py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Store Info"
          title={
            <>
              VISIT <span className="text-lime">F.LOUNGE</span>
            </>
          }
          description="Walk in, try it on, take it home. Here's everything you need to find us."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {/* Info panel */}
          <Reveal className="lg:col-span-7">
            <div className="card-dark flex h-full flex-col rounded-lg p-8 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="eyebrow">The Store</p>
                  <h3 className="headline mt-3 text-4xl text-bone sm:text-5xl">
                    F<span className="text-lime">.</span>LOUNGE
                  </h3>
                  <p className="mt-2 text-sm text-bone/60">{BUSINESS.type}</p>
                </div>
                {/* Trust indicator — attributed to Justdial, not a live rating */}
                <a
                  href={BUSINESS.justdialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-bone/15 px-5 py-3 transition-colors hover:border-lime/60"
                  aria-label="F.LOUNGE rating on Justdial (opens Justdial listing)"
                >
                  <span className="flex items-center gap-1 text-lime">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                  <span className="text-sm font-bold text-bone">
                    {BUSINESS.rating.value}/5
                    <span className="ml-2 font-normal text-bone/50">
                      {BUSINESS.rating.source} · {BUSINESS.rating.count} ratings
                    </span>
                  </span>
                  <ArrowUpRightIcon className="h-4 w-4 text-bone/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              <dl className="mt-9 grid gap-6 sm:grid-cols-2">
                <div className="flex gap-4">
                  <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-lime" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Where</dt>
                    <dd className="mt-1.5 text-[15px] leading-relaxed text-bone/85">
                      {HAS_ADDRESS ? BUSINESS.addressFull : `${BUSINESS.locality}, ${BUSINESS.city}, ${BUSINESS.region}`}
                      {!HAS_ADDRESS && (
                        <span className="mt-1 block text-xs text-bone/40">Exact address on our Justdial listing</span>
                      )}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <ClockIcon className="mt-1 h-5 w-5 shrink-0 text-lime" />
                  <div>
                    <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Hours</dt>
                    <dd className="mt-1.5 text-[15px] text-bone/85">
                      {BUSINESS.hoursLines[0]}
                      <span className="block">{BUSINESS.hoursLines[1]}</span>
                      <span className="mt-1 block text-xs text-bone/40">As listed on Justdial</span>
                    </dd>
                  </div>
                </div>
                {HAS_PHONE && (
                  <div className="flex gap-4">
                    <WhatsAppIcon className="mt-1 h-5 w-5 shrink-0 text-lime" />
                    <div>
                      <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Call</dt>
                      <dd className="mt-1.5 text-[15px] text-bone/85">{BUSINESS.phoneDisplay}</dd>
                    </div>
                  </div>
                )}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn-lime">
                  <MapPinIcon className="h-4 w-4" />
                  Find Us
                </a>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                )}
                <a href={BUSINESS.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href={HAS_ADDRESS ? MAPS_LISTING_URL : BUSINESS.justdialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
                  {HAS_ADDRESS ? "Google Maps" : "Justdial Listing"}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Store experience panel */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="card-dark flex h-full flex-col rounded-lg p-8 md:p-10">
              <p className="eyebrow">The Vibe</p>
              <h3 className="headline mt-3 text-3xl text-bone">INSIDE THE STORE</h3>
              <div className="mt-6 grid flex-1 grid-cols-2 gap-3">
                {STORE_PHOTOS.map((photo, i) => (
                  <div
                    key={photo.id}
                    className={`relative overflow-hidden rounded-md border border-bone/10 bg-obsidian ${
                      i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                    }`}
                  >
                    <StorePhotoPlaceholder seed={i} />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs leading-relaxed text-bone/45">
                Real store photos land here soon. What we can promise now: racks of fresh readymade fits, a team
                that loves styling, and zero pressure.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StorePhotoPlaceholder({ seed }: { seed: number }) {
  const accents = ["#D7FF38", "#B9A1FF", "#FF6038"];
  const accent = accents[seed % accents.length];
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="300" height="200" fill="#161616" />
        {/* hanging racks abstract */}
        <path d="M20 40 H280" stroke="#F5F1E8" strokeOpacity="0.2" strokeWidth="2" />
        {[50, 90, 130, 170, 210, 250].map((x, i) => (
          <g key={x} transform={`translate(${x + (seed * 13) % 10}, 40)`}>
            <path d="M0 0 v14" stroke="#F5F1E8" strokeOpacity="0.25" />
            <rect x="-14" y="14" width="28" height={54 + ((i + seed) % 3) * 12} rx="4" fill={accent} fillOpacity={0.12 + (i % 3) * 0.05} stroke="#F5F1E8" strokeOpacity="0.15" />
          </g>
        ))}
      </svg>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-bold tracking-[0.35em] text-bone/30 uppercase">
        Photo soon
      </span>
    </div>
  );
}
