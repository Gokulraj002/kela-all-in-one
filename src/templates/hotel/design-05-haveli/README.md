# Kela Hotels — design-05-haveli (Heritage Haveli)

The most decorative design in the hotel category: a 200-year-old Shekhawati
merchant haveli turned twelve-suite heritage hotel. Ornate and storied —
arches, frescoes, pattern — but breathable: generous section rhythm,
ivory-on-terracotta contrast, and one confident signature motion.

## Personality

- **Tag:** Heritage Haveli
- **Type:** Rozha One (display) + Mada (body)
- **Palette:** terracotta-ink `#5A2E1E` / marigold `#D9A441` on sandstone ivory
- **Light:** morning raking light; **materials:** sandstone + fresco pigment
- **Motion:** ornate-slow — courtyard fade 2s + arch mask scale-in on the hero,
  pattern dividers drawn via SVG dashoffset

## Signature flow — Jharokha window pan (§3.05)

A 300vw panoramic strip of courtyard imagery pans behind a fixed arch-shaped
mask (`border-radius` top) — like looking through a palace window. Scrubbed
through a desktop pin (≥768px via `gsap.matchMedia`); native horizontal swipe
on mobile; a static stacked layout under `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev      # the design renders inside the ATELIER viewer
npm run build    # production build
npm run lint     # oxlint
```

## Structure

```
design-05-haveli/
  index.jsx    — default export; nav, hero, booking bar, story timeline,
                 jharokha pan + rooms, fresco gallery, experiences, visit, footer
  meta.js      — named export `meta` (contract shape)
  content.js   — all editable copy, rooms, beats, routes (JSON-compatible)
  styles.css   — all styling; tokens on `.tpl-design-05-haveli` only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/ (72 scroll-driven hero frames, 640px)
  README.md
```

## Replacing images

Swap the five JPGs in `assets/` (keep the filenames) or use the lab's Upload
panel — the image keys are `hero`, `product-0` (Marwari Suite), `product-1`
(fresco), `product-2` (jharokha), `detail` (folk music). The hero motion is a
scroll-driven frame sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`,
72 frames at 640px) scrubbed by the shared `ScrollFrames` component
(Apple-style: the "video" advances frame by frame as the visitor scrolls,
pinned for `+=170%`); reduced-motion visitors get a static first frame.

## Tokens

All design tokens live on `.tpl-design-05-haveli` — never `:root`:

```css
--color-primary: #5A2E1E;  --color-accent: #D9A441;
--color-background: #F6EDDC; --color-surface: #FFFDF6;
--color-deep: #2B140B;      --color-text: #38220F;
--color-muted: #8F7154;     --color-line: #E2CFAE;
--color-ivory: #FBF4E3;
--font-display: 'Rozha One', serif; --font-body: 'Mada', sans-serif;
```

The Customize panel rewrites these live.

## content.js

Plain object: `brand`, `nav`, `hero`, `booking`, `story.beats[]` (4 timeline
beats), `rooms[]` (name, price, size, imgKey, desc, perks), `pan.panels[]`
(5 panorama captions), `fresco` (body, motifs, stats), `experiences.items[]`,
`visit` (check-in, address, routes), `contact`, `footer`. Room names and rates
flow through `useCustom()`'s `productName()` / `price()` so the lab's
customizer and currency controls work.

## Deploy

The lab's exporter assembles a standalone Vite zip from this folder
(`export-template.mjs`); no platform imports are used, so the template builds
and runs on its own.
