import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade-and-rise reveal on scroll; respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 26, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="headline mt-4 text-4xl text-bone sm:text-5xl lg:text-6xl">{title}</h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[15px] leading-relaxed text-bone/60 sm:text-base">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

const MARQUEE_WORDS = ["NEW DROPS", "EVERY WEEK", "F.LOUNGE", "ABBIGERE", "READYMADE", "YOUR FIT", "YOUR ENERGY"];

/** Infinite scrolling sticker strip — pure decoration, aria-hidden. */
export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = (
    <div className="marquee-track shrink-0" style={reverse ? { animationDirection: "reverse" } : undefined}>
      {MARQUEE_WORDS.map((w, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="headline text-3xl text-bone/90 sm:text-4xl">{w}</span>
          <span className={`h-2.5 w-2.5 rounded-full ${i % 3 === 0 ? "bg-lime" : i % 3 === 1 ? "bg-acid" : "bg-lavender"}`} />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-bone/10 py-5" aria-hidden>
      <div className="flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
