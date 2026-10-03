# Kela Fashion — design-04-sadak · Streetwear Fusion

**Personality:** Loud · Fast · Unapologetic. The loud one in the fashion category —
Indo-western streetwear drops with stock counters, brutalist-leaning Anton type
scale, city-at-night energy. Built for thumbs and metro platforms.

## What it is

A drop-commerce microsite for the street label **Kela Fashion**:
hero with a looping "Fabric Snap" video background + drop countdown,
the latest drop as quick-add cards with stock counts and size chips,
a pinned **runwayWalk** scroll mechanic (garment runners cross in 3 depth lanes,
center look pausing mid-crossing), lookbook grid, drop counters, fusion codes,
past-drop archive, stores, drop-list signup, and a big-type footer.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev      # the platform shell mounts this template in the viewer
```

## Structure

```
design-04-sadak/
  index.jsx    — default export; nav, hero, drop, runway, lookbook, counters,
                 codes, archive, stores, drop-list, footer
  meta.js      — export const meta { id: 'design-04-sadak', num: '04', … }
  content.js   — export const content — all copy, products, stores
  styles.css   — tokens ONLY on .tpl-design-04-sadak (no :root)
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                 frames/ (72 scrub frames: frame-001.jpg … frame-072.jpg)
  README.md
```

## Replacing images

Drop new files into `assets/` with the same names, or use the lab's
Upload panel — keys are `hero`, `product-0` … `product-3`, `detail`.
Hero scrub: `assets/frames/frame-001.jpg … frame-072.jpg` (scroll-scrubbed
via the shared ScrollFrames component, pin +=170%). Reduced-motion users
get frame-001 as a static image with all content visible.

## Tokens

Scoped on `.tpl-design-04-sadak`:
`--color-background #111110` · `--color-surface #1D1D1B` ·
`--color-primary #F2EFE6` · `--color-text #F2EFE6` ·
`--color-accent #E8442E` (vermilion — ticker, timer, CTA pill only) ·
`--color-muted #8F8B80` · `--font-display 'Anton'` · `--font-body 'Space Grotesk'`.
The customizer rewrites these live.

## content.js

Edit brand name, nav, hero lines, the 4 drop pieces
(`name`, `price` in ₹ numbers, `stock`, `fabric`, `fit`, `tag`),
runway look captions, lookbook shots, counters, fusion codes,
archive rows, stores, drop-list cities, contact + footer copy.
Prices render via `price()` (₹ by default); product names via `productName(i, …)`.

## Deploy

The platform's exporter (`tools/export-template.mjs`) zips this folder as a
standalone Vite template. No platform imports — only `react`, `gsap`,
`./local` files and `../../_shared`.

## Notes

- Runway pin is gated `≥768px` via `gsap.matchMedia`; mobile and
  `prefers-reduced-motion` get the static look grid.
- Mid-crossing pause: scrub timeline holds the mid-lane runner at 50% while
  the name card reads, then releases it — lane durations differ (0.6 / 0.7 /
  0.25+0.25 spans) for the depth parallax.
- Vermilion is reserved: ticker, timer, CTA pill, hover inversions.
