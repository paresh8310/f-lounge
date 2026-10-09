import { BUSINESS, HAS_WHATSAPP, whatsappLink } from "../../data/business";
import { Reveal } from "../ui";
import { ArrowRightIcon, InstagramIcon, WhatsAppIcon } from "../icons";

/** Bold closing CTA — explore, follow, or message. */
export default function FinalCta() {
  const wa = whatsappLink();
  return (
    <section aria-label="Final call to action" className="relative overflow-hidden bg-lime py-24 text-obsidian md:py-36">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[28px] border-obsidian/10"
        aria-hidden
      />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-acid/30 blur-3xl" aria-hidden />
      <div className="container-x relative text-center">
        <Reveal>
          <p className="text-[11px] font-bold tracking-[0.35em] uppercase">One last thing</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="headline mx-auto mt-5 max-w-4xl text-[13vw] leading-[0.95] sm:text-7xl lg:text-8xl">
            READY TO OWN
            <br />
            YOUR LOOK?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#collections" className="btn bg-obsidian text-lime hover:bg-onyx">
              Explore the Collection
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border-2 border-obsidian/70 text-obsidian hover:border-obsidian hover:bg-obsidian/5"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow Us
            </a>
            {HAS_WHATSAPP && wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#25d366] text-white hover:bg-[#1fb955]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp Us
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
