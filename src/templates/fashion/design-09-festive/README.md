# Kela Fashion — design-09-festive (Festive Ethnic Wear)

**Personality.** The celebratory one of the ATELIER fashion set. Diwali / Eid /
Navratri / wedding-season occasion edits in saturated festive color — peacock
green, marigold ivory, marigold. Joyful but premium, never gaudy. The most
chromatic hero of the ten designs.

**Signature motion: weaveReveal.** A pinned section (desktop ≥768px via
`gsap.matchMedia`, `end: '+=300%'`, `scrub: 1`, ONE ScrollTrigger) opens
covered by a single woven SVG overlay: warp threads `draw-path` down first
(0→40% of the scrub), colored weft bands fill in band by band (40→80%), then
the whole weave lifts away (opacity → 0, 80→100%) revealing the festive
collection beneath, like cloth off the loom. Mobile: the weave renders
already lifted — the collection is simply visible, no pin. Reduced motion:
overlay hidden entirely, collection fully visible.

**Signature video: "Color in Motion" (10s hero background).** Silk hem twirling
through marigold petals, festival-light bokeh blooming behind, looping on the
glow. Saturated marigold/magenta/emerald grade. No faces, no text.

## Run

From `~/workspace/atelier`:

```bash
npm install
npm run dev
```

The platform viewer renders this template inside `.tpl-scope`; standalone
exports are assembled by `tools/export-template.mjs`.

## Structure

```
design-09-festive/
  index.jsx   — the site (nav, hero, weaveReveal edits, lookbook, calendar, gifting, visit, footer)
  meta.js     — meta (id design-09-festive, num 09, name "Utsav", tag "Festive Wear")
  content.js  — all editable copy, products with ₹ prices, occasion calendar
  styles.css  — tokens scoped to .tpl-design-09-festive only (no :root)
  assets/     — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg, frames/ (72 scroll frames)
  README.md
```

## Replace images

Swap any file in `assets/` keeping the same filename, or use the lab's
Upload panel — upload keys: `hero`, `product-0` … `product-3`, `detail`.
The hero motion is a scroll-driven frame sequence (`assets/frames/frame-001.jpg`
… `frame-072.jpg`), scrubbed by the ScrollFrames component. To replace the
motion, swap those 72 frames keeping the same filenames (zero-padded order).

## Tokens

On `.tpl-design-09-festive`: `--color-background` #14342C (peacock green),
`--color-surface` #1C463A, `--color-primary` #F5E7C6 (marigold ivory),
`--color-accent` #E07B1A (marigold), `--color-text` #F7ECD2,
`--color-muted` #9AA08C, `--font-display` 'Yatra One', `--font-body` 'Hind'.
The customizer rewrites these live. Every color/font in the CSS comes from
these vars.

## content.js

`brand`, `nav`, `hero` (countdown + CTAs), `occasions` (4: Diwali / Eid /
Navratri / Wedding with theme colors + cut-offs), `products` (name,
occasion, price in ₹ numbers, desc, fabric, badge), `lookbook`, `calendar`
(festivals with ship-by dates), `gifts`, `gifting`, `visit`, `footer`.
Prices render through `price()` from `useCustom()`, never hardcoded.

## Deploy

Exported as a standalone Vite zip by the lab's exporter; `npm run build`
inside the export must stay clean.
