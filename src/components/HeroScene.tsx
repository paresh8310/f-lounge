import { useEffect, useRef, useState } from "react";
import type { HeroSceneHandle } from "../three/heroScene";

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Idle-time loader so the 3D bundle never competes with first paint. */
function whenIdle(cb: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout: 900 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 300);
  return () => window.clearTimeout(id);
}

/** Fashion-editorial SVG fallback — abstract shapes matching the brand palette. */
function EditorialFallback({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 700"
      fill="none"
      aria-hidden
      className={`h-full w-full transition-opacity duration-1000 ${className ?? ""}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="450" cy="330" r="300" stroke="#D7FF38" strokeOpacity="0.35" strokeWidth="1.5" />
      <ellipse cx="450" cy="340" rx="380" ry="210" stroke="#B9A1FF" strokeOpacity="0.4" strokeWidth="1.2" transform="rotate(-14 450 340)" />
      <circle cx="250" cy="210" r="60" fill="#FF6038" fillOpacity="0.5" />
      <circle cx="680" cy="470" r="42" fill="#F5F1E8" fillOpacity="0.35" />
      <rect x="620" y="150" width="26" height="130" rx="13" fill="#D7FF38" fillOpacity="0.7" transform="rotate(24 633 215)" />
      <rect x="200" y="470" width="16" height="110" rx="8" fill="#B9A1FF" fillOpacity="0.6" transform="rotate(-18 208 525)" />
    </svg>
  );
}

type SceneState = "loading" | "ready" | "fallback";

/**
 * Full-viewport 3D accent layer scoped to the hero (absolute, above video, below copy).
 * Renders only on fine-pointer desktops — mobile skips WebGL entirely.
 */
export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<SceneState>("loading");

  useEffect(() => {
    let cancelled = false;
    let handle: HeroSceneHandle | null = null;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile || !webglAvailable()) {
      setState("fallback");
      return;
    }

    const cancelIdle = whenIdle(() => {
      import("../three/heroScene")
        .then(({ createHeroScene }) => {
          if (cancelled || !containerRef.current || !canvasRef.current) return;
          const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          handle = createHeroScene(containerRef.current, canvasRef.current, {
            mobile: false,
            reducedMotion,
          });
          if (cancelled) {
            handle.dispose();
            handle = null;
          } else {
            setState("ready");
          }
        })
        .catch(() => {
          if (!cancelled) setState("fallback");
        });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      <EditorialFallback className={state === "ready" ? "opacity-0" : "opacity-100"} />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
          state === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
