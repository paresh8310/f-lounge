import { BUSINESS, HAS_WHATSAPP, whatsappLink } from "../data/business";
import { ArrowUpRightIcon, InstagramIcon, MapPinIcon, WhatsAppIcon } from "./icons";

export default function Footer() {
  const wa = whatsappLink();
  return (
    <footer className="border-t border-bone/10 bg-obsidian pb-28 pt-16 md:pb-10" aria-label="Footer">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="headline text-4xl text-bone">
              F<span className="text-lime">.</span>LOUNGE
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/55">
              Readymade garments in {BUSINESS.locality}, {BUSINESS.city}. Your fit. Your energy.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={BUSINESS.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="F.LOUNGE on Instagram"
                className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-lime hover:text-lime"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              {HAS_WHATSAPP && wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="F.LOUNGE on WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone/70 transition-colors hover:border-lime hover:text-lime"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                </a>
              )}
              <a
                href={BUSINESS.justdialUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="F.LOUNGE on Justdial"
                className="grid h-11 place-items-center rounded-full border border-bone/15 px-4 text-[11px] font-bold tracking-[0.2em] text-bone/70 uppercase transition-colors hover:border-lime hover:text-lime"
              >
                Justdial
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.3em] text-bone/40 uppercase">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: "Home", href: "#home" },
                { label: "Collections", href: "#collections" },
                { label: "Looks", href: "#looks" },
                { label: "Instagram", href: "#instagram" },
                { label: "Visit Us", href: "#visit" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-bone/65 transition-colors hover:text-lime">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[11px] font-bold tracking-[0.3em] text-bone/40 uppercase">Store</p>
            <ul className="mt-5 space-y-3 text-sm text-bone/65">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                {BUSINESS.locality}, {BUSINESS.city}, {BUSINESS.region}
              </li>
              <li>
                {BUSINESS.hoursLines[0]} · {BUSINESS.hoursLines[1]}
              </li>
              <li>
                <a
                  href={BUSINESS.justdialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-lime"
                >
                  Rated {BUSINESS.rating.value}/5 on Justdial
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-bone/10 pt-7 text-xs text-bone/35 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#home" className="transition-colors hover:text-bone/70">
              Privacy
            </a>
            <a href="#home" className="transition-colors hover:text-bone/70">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
