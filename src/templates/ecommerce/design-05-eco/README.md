# Kela Store Eco — design-05-eco

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

An earthy, story-led sustainable store for the ATELIER e-commerce library.
Cream `#F6F1E7`, moss `#4A5D3A`, clay `#B0713E`, charcoal `#2A2620`.
Fraunces display + Manrope body. Organic SVG dividers, subtle CSS grain,
honest impact counters, and a demo cart. Mood: honest, warm, grounded.

## The idea

The collection grows out of a single drawn stem. On desktop, the products
section pins while an SVG stem draws itself with the scroll; four products
bloom from its nodes (scale 0 → 1, blur 8 → 0), rooted to the stem, while
paper-toned background layers drift at 0.6x. On mobile (and with
`prefers-reduced-motion`), the same products stack along a left-rail stem —
fully visible, no motion required.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-05-eco/
  index.jsx    — the site: nav, hero, growth timeline, materials, impact, contact, footer, cart drawer
  meta.js      — library metadata (id, palette, features…)
  content.js   — all copy, prices (₹), stats, contact — edit copy here
  styles.css   — all styling, tokens scoped to .tpl-design-05-eco
  assets/      — hero.jpg, product-1…4.jpg, detail.jpg, frames/ (72-frame hero scroll sequence)
  README.md
```

## Replacing images

Drop new JPGs over the files in `assets/` keeping the names, or use the
lab's Upload panel — the keys are `hero`, `product-0`…`product-3`, `detail`.
The hero is a scroll-driven 72-frame JPG sequence (`assets/frames/frame-001.jpg`
…`frame-072.jpg`) scrubbed frame-by-frame as the visitor scrolls the pinned
hero (Apple-style); the hero poster `hero.jpg` always carries the frame if the
sequence is missing.

## Tokens

All design tokens live on `.tpl-design-05-eco` in `styles.css` —
`--color-background/surface/primary/secondary/accent/text/muted`,
`--font-display/body`. The lab customizer rewrites these live; never use
`:root` or hardcoded hex in new rules.

## content.js

Plain object: `brand`, `nav`, `hero`, `productsIntro`, `products`
(name/price/desc/badge/stage/footprint/alt), `materials`, `impact.stats`,
`shipping`, `contact`, `footer`. Prices are numbers in ₹, formatted by the
platform's `price()` via `useCustom`.

## Deploy

The template is self-contained: it imports only its own folder,
`../../_shared`, `react`, and `gsap`. The lab's exporter
(`tools/export-template.mjs`) bundles it into a standalone Vite site.
