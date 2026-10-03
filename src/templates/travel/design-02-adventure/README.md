# Kela Travels — design-02-adventure

**Tag:** Adventure · **Num:** 02
**Personality:** Raw expedition broadsheet. A trekking company's site that reads like a field poster nailed to a basecamp wall — big condensed Anton type, altimeter aesthetics, safety-orange checkpoint energy. No polish, all grit. Basalt black, cold stone grey, hot orange.

## Signature mechanic — the Ascent meter

The treks section (`#destinations`) is a pinned altimeter climb on desktop (≥768px):

- A large altitude readout **counts up on scrub** (2,800M → 5,364M) via the pinned `ScrollTrigger`'s `onUpdate` — no intervals.
- Four trek cards pass through a **fixed viewport window** (orange checkpoint-gate corners) one at a time: entering cards shift from `scale(0.9) + blur(12px) + desaturate`, the active card is sharp and full-color, the rest dim.
- The background **darkens as altitude rises** (day → thin-air gradient overlay).
- A checkpoint label tracks `CHECKPOINT 02 / 04 — HIGH DESERT` style state.
- Mobile (<768px): cards stack normally; the meter sits inline above them and still scrubs live (no pin).
- `prefers-reduced-motion`: static stacked cards, fixed summit readout, no pins.

## Run

From the atelier repo root:

```bash
npm install
npm run dev
```

The template renders inside the ATELIER viewer (wraps it in `.tpl-scope`). For standalone dev, import `index.jsx` directly — it carries its own fonts, images, and video.

## Structure

```
design-02-adventure/
  index.jsx    — default export: nav, hero (video), ascent meter, ethos, departures, gear, basecamp, footer
  meta.js      — named export `meta` (contract shape)
  content.js   — named export `content`: all copy, 4 treks {name, price ₹, blurb, duration, altitude, tag}, departures, gear list, contact
  styles.css   — ALL styling; tokens scoped to `.tpl-design-02-adventure` only
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/ (72 scroll-scrub keyframes, 640px wide)
  README.md
```

Sections and tour stops: `hero` (Kela Travels) · `destinations` (The Ascent) · `story` (Expedition Ethos) · `visit` (Departures) · `craft` (Kit List) · `contact` (Basecamp). All marked `data-tour`.

## Replace images

Drop new JPGs into `assets/` with the same filenames, or use the lab's Upload panel — the `Img` `k` keys are `hero`, `product-0` (Everest), `product-1` (Ladakh), `product-2` (Patagonia), `detail` (gear macro). The hero runs on scroll-driven frames (`ScrollFrames`, `assets/frames/frame-001…072.jpg`) pinned for `+=170%` — no video file needed.

## Tokens

```css
.tpl-design-02-adventure {
  --color-primary: #1a1a18;   /* basalt */
  --color-accent: #e4572e;    /* safety orange */
  --color-secondary: #8a8578; /* stone */
  --color-background: #1a1a18;
  --color-surface: #232320;
  --color-text: #f2efe9;      /* bone */
  --color-muted: #8a8578;
  --font-display: 'Anton', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

The Customize panel rewrites these live. Fonts load via a Google Fonts link injected once (`tpl-font-design-02-adventure`).

## content.js

Plain object, JSON-compatible. Edit treks (prices are ₹ numbers — the platform formats them via `price()`), departure rows (`status`: `open` / `filling` / `waitlist`), gear items, and basecamp contact details. Brand, email, and imagery also respond to the lab's Customize/Upload panels through `useCustom`.

## Motion notes

GSAP + ScrollTrigger in `useLayoutEffect` with `gsap.context` + `revert()`. Every trigger carries `scroller()` from `useTplScope()`. Pins are gated with `gsap.matchMedia()` so a resize across 768px kills/restores them instead of sticking. Reduced-motion renders simple static layouts.

## Deploy

Standalone export via `tools/export-template.mjs` (copies the folder + `_shared`), then any static host. `vite build` must stay clean.
