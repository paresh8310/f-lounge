# F.LOUNGE — Gen Z Fashion Website

Immersive, production-quality website for **F.LOUNGE**, a readymade garment store in Abbigere/Jalahalli, Bengaluru. Cinematic video hero, selective 3D, editorial lookbook, Instagram gallery, WhatsApp-first enquiries, and an AI-assistant shell — built with React + TypeScript + Vite + Tailwind CSS 4 + Framer Motion + Three.js.

## Quick start

```bash
npm install
npm run dev      # local dev
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## What's live

- **Cinematic hero** — your video (`public/media/f-lounge-hero.mp4`, autoplay/muted/loop/playsInline), oversized animated headline "YOUR FIT. YOUR ENERGY.", scroll indicator, gradient overlays, gradient-composition fallback if the video fails, reduced-motion support.
- **Selective 3D** — Three.js accent scene (floating lime/lavender/acid rings + gems) scoped to the hero, pointer parallax + scroll depth, desktop-only, lazy-loaded, static SVG fallback.
- **Collections / Lookbook** — category filters (All / Women / Men / Kids / New In), editorial grid, per-look WhatsApp enquiry with prefilled message. Branded "photo soon" placeholders until real photography is added.
- **Style inspiration** — labelled styling ideas (not product listings).
- **THE F.LOUNGE FEED** — Instagram gallery. Currently the **curated fallback** (explicitly labelled — not claimed as live). 6 slots with hover states and per-post links.
- **VISIT F.LOUNGE** — store info, listed hours (8:30 AM–10:30 PM), Justdial-attributed rating pill (5.0/5 · 8 ratings, links to the listing), Find Us / WhatsApp / Instagram / Justdial CTAs, store-experience photo slots.
- **WhatsApp** — floating button + all CTAs generated via `wa.me` deep links. The float also launches the **style assistant** chat.
- **Style assistant** — chat UI with two modes: (1) secure backend via `POST /api/assistant` if deployed, (2) local verified-knowledge answers (hours, location, Instagram, category info) with WhatsApp escalation for anything unverified. Never invents prices/stock.
- **Mobile bottom bar, full-screen menu, custom cursor (desktop), film grain, marquee, smooth anchor nav, sticky solid-on-scroll navbar.**
- SEO/OG metadata + `ClothingStore` JSON-LD in `index.html`.

## Configure before launch — `src/data/business.ts`

This is the single source of truth. Flagged `PLACEHOLDER` fields **must** be filled:

| Field | Status | Notes |
|---|---|---|
| `addressFull` | ⚠️ placeholder | Exact verified store address. Until set, "Find Us" links to the Justdial listing (no invented map pin). |
| `phoneDisplay` | ⚠️ placeholder | Verified phone number. Hidden from UI until set. |
| `whatsappNumber` | ⚠️ placeholder | Digits-only international format (e.g. `919876543210`). Until set, WhatsApp CTAs degrade gracefully / show placeholder state. |
| `LOOKBOOK` | add photos | Drop images into `public/media/` as `look-1.jpg` … or edit entries (`src` accepts local paths or URLs). |
| `INSTAGRAM_POSTS` | add posts | Same pattern; add `postUrl` per item to link the real Instagram post, optional `caption`. |
| `STORE_PHOTOS` | add photos | `store-1.jpg` … real store shots. |
| `CATEGORIES` | edit | Adjust to actual merchandise categories. |

**Not configured by design:** prices, sizes, stock, discounts, reviews/testimonials — the brief forbids inventing them. Add a verified `products` array when catalogue data exists; `productEnquiryMessage(name)` already generates contextual WhatsApp CTAs.

## Instagram live feed (optional upgrade)

The gallery is intentionally a labelled manual fallback — no scraping. For a live feed, options ranked:

1. **Instagram Basic Display API** — requires a Meta developer app + the account owner's authorization; fetch server-side, cache results, never expose tokens in frontend.
2. **Official oEmbed / embed posts** — embed individual verified post URLs; simplest official route.
3. Keep the curated gallery (current state) — zero risk, full control.

Whichever route is chosen, swap the data source feeding the `#instagram` section; the UI already supports captions, post links and hover overlays.

## AI assistant backend (optional)

The chat calls `AI_ASSISTANT_ENDPOINT` (`/api/assistant`) with `{ message }` and expects `{ reply }`. If you deploy an LLM behind this route:

- Keep API keys in **server-side env vars** only.
- Ground the prompt strictly in the same verified data from `business.ts`.
- The frontend times out after 6 s and falls back to local answers — the site never appears broken without the backend.
- Without a backend, the assistant still answers store/hours/location questions locally and escalates the rest to WhatsApp.

## Performance & accessibility notes

- 3D bundle (~123 KB gzipped `three`) is a separate chunk loaded on idle, desktop fine-pointer only.
- Video is 2.1 MB — fine for a hero. For further optimization, re-encode to ~720p H.264/WebM (~1 MB) and add a `poster` (`public/media/hero-poster.jpg`).
- `prefers-reduced-motion` disables marquee, parallax, 3D motion and video autoplay.
- Semantic landmarks, skip link, aria labels on all controls, focus-visible outlines, keyboard-closable chat (Esc).

## Assets referenced

- Hero video: from `Video-61038.mp4` → `public/media/f-lounge-hero.mp4`.
- Instagram: https://www.instagram.com/f.lounge__/
- Justdial: https://www.justdial.com/Bangalore/F-Lounge-Jalahalli/080PXX80-XX80-241024200043-L4Z6_BZDET
