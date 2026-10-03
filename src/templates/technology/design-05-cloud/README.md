# design-05-cloud — "Kela Tech" · Cloud Infrastructure

A data-visualization-led marketing site for a fictional global cloud platform.
Airy light sections alternate with deep-navy "data moments"; the centerpiece
is a pinned, scroll-scrubbed topology zoom that descends edge → region →
cluster → pod with crosshair focus rings and per-layer stat panels.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-05-cloud/
  index.jsx   — default export; nav, hero (ScrollFrames), topology zoom,
                products, region map, metrics, pricing calculator, docs,
                CTA, footer
  meta.js     — template metadata (id, palette, fonts, features)
  content.js  — all copy: layers, products, 28 regions, metrics, pricing rates
  styles.css  — all styling; tokens scoped to .tpl-design-05-cloud (never :root)
  README.md
  assets/     — hero.jpg, feature-1.jpg, feature-2.jpg, feature-3.jpg,
                detail.jpg, frames/ (72 JPG keyframes scrubbed by scroll)
```

## Signature motion — topology zoom

- Desktop ≥768px with motion: the `.st-topo-pin` stage pins for `+=300%`
  scroll; a scrubbed timeline zooms each of the 4 nested layers in turn
  (edge → region → cluster → pod), draws a 4-corner crosshair ring per
  layer, crossfades the stat panel, and recedes previous layers.
- Mobile <768px and `prefers-reduced-motion`: pin is disabled and a static
  stacked diagram (all 4 layers, all labels visible) renders instead.
- Built with `gsap.matchMedia` inside `gsap.context` + `revert()` cleanup;
  every ScrollTrigger passes `scroller: scroller()`.

## Hero — scroll-driven frames

The hero is a `ScrollFrames` scrub (72 JPG keyframes in `assets/frames/`,
Apple-style): the stage pins for `+=170%` of scroll and the frame sequence
advances as the visitor scrolls. `prefers-reduced-motion` renders the first
frame as a static image with no pin. The hero overlay (eyebrow, title, CTAs,
status row, scroll cue) sits above the canvas in `.sf-overlay`.

## Replace images

Drop new files over `assets/hero.jpg`, `feature-1.jpg`, `feature-2.jpg`,
`feature-3.jpg`, `detail.jpg` — or use the lab's Upload
panel (keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`).

## Tokens

Scoped on `.tpl-design-05-cloud`: `--color-primary #0B1B33`,
`--color-accent #38BDF8`, `--color-teal #2DD4BF`,
`--color-background #F4F8FC`, `--font-display 'Outfit'`,
`--font-body 'Inter'`. The customizer rewrites these live.

## content.js

Brand, nav, hero, topology layers (name/tag/desc/stats), products,
28 regions (name/code/x/y map %), metrics, pricing rates + slider ranges,
CTA, docs, contact, footer. Brand, prices (via `price()`), and images
(resolve via `img()`) honor lab customization.

## Deploy

Standalone export via the lab's exporter (`tools/export-template.mjs`):
the folder is self-contained — only `../../_shared`, `react`, `gsap`
imports. Fonts load from Google Fonts (`tpl-font-design-05-cloud`).
