import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS, NAV_LINKS, SECTION_IDS, whatsappLink } from "../data/business";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

function Wordmark({ onClick, light }: { onClick?: () => void; light?: boolean }) {
  return (
    <a
      href="#home"
      onClick={onClick}
      className={`headline text-xl leading-none transition-colors md:text-2xl ${light ? "text-obsidian" : "text-bone"}`}
      aria-label="F.LOUNGE — home"
    >
      F<span className="text-lime">.</span>LOUNGE
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const wa = whatsappLink();

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-bone/10 bg-obsidian/85 shadow-[0_10px_40px_-25px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Wordmark />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex xl:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-[12px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 ${
                    isActive ? "text-lime" : "text-bone/70 hover:text-bone"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-lime transition-all duration-400 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={BUSINESS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !px-5 !py-2.5 text-[11px]"
            >
              @f.lounge__
            </a>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime !px-5 !py-2.5 text-[11px]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone transition-colors hover:border-lime hover:text-lime md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex flex-col bg-obsidian md:hidden"
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Wordmark onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-bone/20 text-bone"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="container-x mt-6 flex flex-1 flex-col overflow-y-auto">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                    className="border-b border-bone/10"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 headline text-4xl text-bone transition-colors active:text-lime"
                    >
                      {link.label}
                      <span className="font-sans text-xs font-bold tracking-widest text-bone/30">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 pb-10">
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="btn-lime w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp Us
                  </a>
                )}
                <a
                  href={BUSINESS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn-ghost w-full"
                >
                  Follow @f.lounge__
                </a>
                <p className="mt-4 text-center text-xs text-bone/50">
                  {BUSINESS.locality}, {BUSINESS.city} · {BUSINESS.hoursLines[0]} {BUSINESS.hoursLines[1]}
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
