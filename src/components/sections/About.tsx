import { BUSINESS } from "../../data/business";
import { Marquee, Reveal, SectionHeading } from "../ui";
import { InstagramIcon, ArrowUpRightIcon } from "../icons";

/** Brand introduction — verified info only, Gen Z tone. */
export default function About() {
  return (
    <section id="about" aria-label="About F.LOUNGE" className="relative bg-obsidian">
      <Marquee />
      <div className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="The Brand"
            title={
              <>
                NOT JUST A STORE.
                <br />
                <span className="text-lime">A MOOD.</span>
              </>
            }
          />
          <Reveal delay={0.2}>
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-relaxed text-bone/70 sm:text-base">
              <p>
                F.LOUNGE is a readymade garment store in {BUSINESS.locality}, {BUSINESS.city} — built for
                everyone who treats getting dressed like the best part of the day.
              </p>
              <p>
                Fresh drops, everyday fits and pieces that hit different — walk in, try it on, take it home
                the same day. No waiting, no fuss. Just your fit, your energy.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-9 flex flex-wrap gap-3">
              <span className="sticker-lime">Ready to wear</span>
              <span className="sticker-acid">New drops weekly</span>
              <span className="sticker">All ages, all vibes</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.15} className="card-dark relative h-full min-h-[280px] overflow-hidden p-8">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-lime/10 blur-3xl" aria-hidden />
            <p className="eyebrow">Quick facts</p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Type</dt>
                <dd className="mt-1 text-lg font-semibold text-bone">{BUSINESS.type}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Area</dt>
                <dd className="mt-1 text-lg font-semibold text-bone">
                  {BUSINESS.locality}, {BUSINESS.city}
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.25em] text-bone/40 uppercase">Hours</dt>
                <dd className="mt-1 text-lg font-semibold text-bone">
                  {BUSINESS.hoursLines[0]} · {BUSINESS.hoursLines[1]}
                </dd>
              </div>
            </dl>
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold tracking-wide text-lime"
            >
              <InstagramIcon className="h-4 w-4" />
              @{BUSINESS.instagram.handle}
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
