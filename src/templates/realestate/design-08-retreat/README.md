# Kela Estates — design-08-retreat

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Escape-led resort second-home experience for the ATELIER library. Slow,
breathable, horizon-heavy: long scroll pauses, tide-like motion, vast
whitespace. Set on the Alibaug coast; prices in ₹.

## Design personality

- **Palette:** warm white `#F7F4EC` / aqua `#5E8B8C` / driftwood `#A08B6D` / deep sea `#173038`
- **Type:** Cormorant Garamond (display) + Instrument Sans (body), loaded via Google Fonts (`tpl-font-design-08-retreat`)
- **Nav:** barely-there — transparent over the hero frames, solidifies to a frosted warm-white bar past the hero, with a horizon-line hairline motif
- **Mood:** slow, breathable, far away. Nothing moves faster than `sine.inOut`.

## Signature scroll mechanic — parallax depth layers (MOTION.md §08)

The **Residences** section pins full-bleed (desktop, ≥768px) as a scene in
3 depth layers, each drifting at its own rate on a tide-like `sine.inOut`
ease while the three residence cards float up between the layers:

| Layer | Image | Drift |
|---|---|---|
| Background — sea + sky | `hero.jpg` | yPercent 3 |
| Mid — the villa | `listing-1.jpg` (product-0) | yPercent 8 |
| Foreground — the waterline | `detail.jpg` (detail), blurred band | yPercent 18 |

A chapter readout tracks the drift (`01 — The sea / 02 — The villa / 03 — The waterline`).
Below 768px and under `prefers-reduced-motion`, the same content renders as a
static, fully-visible stacked composition — no pins, nothing hidden.

## Signature sequence — "Edge of the water" (scroll-driven frames)

`assets/frames/frame-001.jpg` … `frame-072.jpg` (640px-wide JPGs extracted
from the original 10s clip) play as the **hero background** via the shared
`<ScrollFrames>`: the visitor scrubs the sequence frame by frame while the
hero pins for `+=170%` of scroll — Apple-style, and ~60% lighter than video.

- frames 0–28 — slow drift over the infinity pool toward the ocean, palm fronds at frame edge
- frames 29–58 — descend to water level; pool edge dissolves into the sea, distant sail
- frames 59–71 — settle on the horizon line

Grade: aqua / bleached wood / warm white. No text, no watermarks, no faces.
`hero.jpg` is the reduced-motion / error fallback (first frame is the poster
otherwise — the canvas never paints blank).

## Sections

`nav → hero → the place → residences → the slow life → ownership → footer`,
with `data-tour` stops: Arrive, The Place, Residences, The Slow Life, Ownership.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-08-retreat/
  index.jsx     — default export React component (GSAP + ScrollTrigger, gsap.context + revert)
  meta.js       — template metadata (contract shape)
  content.js    — all editable copy, residence data, prices (₹ numbers)
  styles.css    — all styling; tokens on .tpl-design-08-retreat only, never :root
  assets/       — hero.jpg, listing-1.jpg, listing-2.jpg, listing-3.jpg, detail.jpg, frames/ (frame-001.jpg … frame-072.jpg)
  README.md
```

## How to replace images

Drop new JPGs over the files in `assets/` keeping the names, or use the
lab's Upload panel — image keys are `hero`, `product-0`, `product-1`,
`product-2`, `detail` (wired through `useCustom()`'s `img()`).

## Tokens

```css
.tpl-design-08-retreat {
  --color-primary: #173038;   /* deep sea */
  --color-secondary: #5E8B8C; /* aqua */
  --color-accent: #A08B6D;    /* driftwood */
  --color-background: #F7F4EC;/* warm white */
  --color-surface: #FDFBF4;
  --color-text: #173038;
  --color-muted: rgba(23, 48, 56, 0.64);
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Instrument Sans', sans-serif;
}
```

All colors/fonts in the CSS come from these vars. The customizer rewrites
them live.

## content.js

Brand, nav, hero, place (facts), residences (3 items with ₹ prices),
slow-life rituals + services, ownership plans + contact, footer. Brand name,
prices, images and contact all flow through `useCustom()` so Customize /
Upload keep working.

## Deploy

Standalone export via the platform exporter (`tools/export-template.mjs`);
the component imports only its own folder, `../../_shared`, `react`,
`gsap` and `gsap/ScrollTrigger`.
