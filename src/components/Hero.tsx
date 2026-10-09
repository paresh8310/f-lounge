import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BUSINESS } from "../data/business";
import { ArrowRightIcon, MapPinIcon, SparkIcon } from "./icons";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const HEADLINE_WORDS = ["YOUR", "FIT.", "YOUR", "ENERGY."];

/**
 * Cinematic video hero.
 *  - Autoplay / muted / loop / playsInline, poster fallback, error fallback
 *  - Dark gradient overlay for readability
 *  - Reduced motion: no parallax drift, video gets `paused` treatment
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    // Some mobile browsers need an explicit play() call after mount.
    const tryPlay = () => v.play().catch(() => setVideoFailed(true));
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [reduce]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-obsidian"
      aria-label="F.LOUNGE introduction"
    >
      {/* Video background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 will-change-transform">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/media/f-lounge-hero.mp4"
            poster="/media/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          /* Fallback art direction: layered gradient composition */
          <div className="h-full w-full" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,#2a2a1a_0%,#101010_55%)]" />
            <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-lime/15 blur-[130px]" />
            <div className="absolute -right-16 bottom-0 h-[380px] w-[380px] rounded-full bg-acid/15 blur-[130px]" />
          </div>
        )}
        {/* Dark gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/25 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/55 via-transparent to-transparent" />
      </motion.div>

      {/* Side rail */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 items-center gap-3 lg:flex" aria-hidden>
        <span className="h-px w-14 bg-bone/30" />
        <span className="text-[10px] font-bold tracking-[0.4em] text-bone/50 uppercase">
          {BUSINESS.locality} — {BUSINESS.city}
        </span>
      </div>

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 pb-24 pt-40 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="eyebrow flex items-center gap-2"
        >
          <SparkIcon className="h-3.5 w-3.5 text-lime" />
          Readymade fashion · {BUSINESS.locality}, {BUSINESS.city}
        </motion.p>

        <h1 className="headline mt-6 text-[19vw] leading-[0.9] sm:text-[15vw] lg:text-[9.5rem] xl:text-[11rem]">
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={i}
              className={`mr-[0.28em] inline-block ${i === 1 || i === 3 ? "text-lime" : "text-bone"}`}
              initial={{ opacity: 0, y: reduce ? 0 : 90 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.11, ease: EASE }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
          className="mt-6 max-w-md text-base text-bone/75 md:text-lg"
        >
          Find your vibe. Own your look.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a href="#collections" className="btn-lime group">
            Explore the Collection
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#visit" className="btn-ghost">
            <MapPinIcon className="h-4 w-4" />
            Visit Our Store
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#collections"
        aria-label="Scroll to collections"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[9px] font-bold tracking-[0.4em] text-bone/50 uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-bone/15">
          <span className="scroll-dot absolute left-0 top-0 h-3 w-px bg-lime" />
        </span>
      </motion.a>
    </section>
  );
}
