import { BUSINESS, INSTAGRAM_POSTS } from "../../data/business";
import { Reveal, SectionHeading } from "../ui";
import { ArrowUpRightIcon, InstagramIcon } from "../icons";

/**
 * THE F.LOUNGE FEED.
 * FALLBACK MODE: a configurable gallery of real images + post URLs supplied
 * by the owner (INSTAGRAM_POSTS in src/data/business.ts). It is explicitly
 * labelled as curated — NOT claimed to be a live feed. When an official
 * Instagram integration is configured this section can switch to live
 * embeds (see README).
 */
export default function Reviews() {
  return (
    <section id="instagram" aria-label="F.LOUNGE Instagram feed" className="relative bg-onyx py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="On the gram"
            title={
              <>
                THE F.LOUNGE <span className="text-lavender">FEED</span>
              </>
            }
            description="Drops, fits and store moments from Instagram. Curated highlights — follow @f.lounge__ for the live feed."
          />
          <Reveal delay={0.15}>
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost group"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow @f.lounge__
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {INSTAGRAM_POSTS.map((post, i) => {
            const img = (
              <div className="group relative aspect-square overflow-hidden rounded-lg border border-bone/10 bg-obsidian">
                <IgPlaceholder seed={i} />
                <div className="absolute inset-0 flex items-center justify-center bg-obsidian/0 transition-colors duration-300 group-hover:bg-obsidian/50">
                  <InstagramIcon className="h-6 w-6 text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                {post.caption && (
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 to-transparent p-3 text-[11px] text-bone/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {post.caption}
                  </p>
                )}
              </div>
            );
            return (
              <Reveal key={post.id} delay={(i % 3) * 0.06}>
                {post.postUrl ? (
                  <a href={post.postUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open Instagram post: ${post.alt}`}>
                    {img}
                  </a>
                ) : (
                  img
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[11px] tracking-[0.2em] text-bone/35 uppercase">
            Curated gallery · hand-picked posts — connect the official Instagram API for live updates
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function IgPlaceholder({ seed }: { seed: number }) {
  const accents = ["#D7FF38", "#B9A1FF", "#FF6038", "#F5F1E8", "#D7FF38", "#B9A1FF"];
  const accent = accents[seed % accents.length];
  return (
    <div className="absolute inset-0" aria-hidden>
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <rect width="200" height="200" fill="#141414" />
        <circle cx={40 + (seed * 61) % 130} cy={50 + (seed * 43) % 110} r="62" fill={accent} fillOpacity="0.16" />
        <rect x={110 - (seed * 23) % 60} y={120} width="70" height="10" rx="5" fill={accent} fillOpacity="0.35" transform={`rotate(${-8 + seed * 5} ${140 - (seed * 23) % 60} 125)`} />
      </svg>
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-bold tracking-[0.35em] text-bone/25 uppercase">
        Post soon
      </span>
    </div>
  );
}
