import { LOOKBOOK } from "../../data/business";
import { Reveal, SectionHeading } from "../ui";
import { ArrowUpRightIcon, SparkIcon } from "../icons";

/**
 * FEATURED LOOKS + STYLE INSPIRATION.
 * All imagery is pending owner photography — cards show branded
 * placeholders with a clear "styling idea" label. Nothing is presented
 * as an actual product listing.
 */
const INSPO = [
  {
    id: "inspo-1",
    title: "STORE-TO-STREET",
    idea: "Pick a statement top in store, keep the rest simple — instant main-character energy.",
  },
  {
    id: "inspo-2",
    title: "COLOUR BLOCK",
    idea: "Our racks are organised so brights sit next to neutrals. Ask the team to pull a combo for you.",
  },
  {
    id: "inspo-3",
    title: "DRESS-UP CASUAL",
    idea: "One accessory changes everything. Grab a fit, then style it three ways at home.",
  },
];

export default function WhyUs() {
  return (
    <section id="looks" aria-label="Featured looks and style inspiration" className="relative bg-obsidian py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Style Inspiration"
          title={
            <>
              FRESH <span className="text-acid">FITS,</span> FRESH <span className="text-lavender">IDEAS</span>
            </>
          }
          description="Styling directions we love — every piece can be pulled off the rack at F.LOUNGE. Labelled ideas, not listings."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {INSPO.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="card-dark group relative flex h-full flex-col overflow-hidden rounded-lg p-7 transition-colors duration-500 hover:border-lime/50">
                <div
                  className="mb-6 h-40 w-full rounded-md"
                  aria-hidden
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, rgba(215,255,56,0.25), rgba(16,16,16,0) 60%)"
                        : i === 1
                          ? "linear-gradient(135deg, rgba(185,161,255,0.28), rgba(16,16,16,0) 60%)"
                          : "linear-gradient(135deg, rgba(255,96,56,0.25), rgba(16,16,16,0) 60%)",
                  }}
                >
                  <div className="grid h-full place-items-center">
                    <SparkIcon className="h-10 w-10 text-bone/25 transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                </div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-bone/40 uppercase">Styling idea</p>
                <h3 className="headline mt-2 text-2xl text-bone">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-bone/60">{item.idea}</p>
                <a
                  href="#collections"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-lime uppercase"
                >
                  See the collection
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Featured looks strip */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <div className="flex items-center justify-between">
              <h3 className="headline text-3xl text-bone sm:text-4xl">
                FEATURED <span className="text-lime">LOOKS</span>
              </h3>
              <a
                href={LOOKBOOK.length ? "#collections" : "#collections"}
                className="hidden text-xs font-bold tracking-[0.2em] text-bone/50 uppercase hover:text-lime sm:block"
              >
                View all
              </a>
            </div>
            <div className="mt-8 flex gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
              {LOOKBOOK.slice(0, 4).map((look, i) => (
                <div
                  key={look.id}
                  className="group relative aspect-[3/4] w-64 shrink-0 overflow-hidden rounded-lg border border-bone/10 bg-onyx sm:w-72"
                >
                  <PlaceholderLook seed={i + 2} />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
                  <p className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.3em] text-lime uppercase">
                    {look.label ?? `LOOK 0${i + 1}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PlaceholderLook({ seed }: { seed: number }) {
  const accents = ["#D7FF38", "#B9A1FF", "#FF6038", "#F5F1E8"];
  const accent = accents[seed % accents.length];
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="300" height="400" fill="#181818" />
        <circle cx={60 + (seed * 71) % 180} cy={120 + (seed * 37) % 160} r="100" fill={accent} fillOpacity="0.14" />
        <path d={`M0 ${300 + (seed % 3) * 20} Q 150 ${240 + (seed % 3) * 18} 300 ${300 + (seed % 3) * 20}`} stroke={accent} strokeOpacity="0.3" fill="none" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
