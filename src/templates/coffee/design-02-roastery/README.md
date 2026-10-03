# Kela Cafe — design-02-roastery

Specialty coffee roastery. Industrial-warm and data-forward: kraft paper ground, charcoal data panels, ember accents only on roast markers, freshness dates, and CTAs. DM Serif Display speaks in short label-voice headlines; Inter carries every badge, scale, and spec.

## Personality

Technical · Honest · Industrial-warm. Motion is precise and instrument-like — scrubbed progressions, scale ticks, map draws. The roast timeline and origin map are the stars; everything else is snappy utility rhythm (0.7–0.8s reveals, never editorial drift).

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

Renders inside the ATELIER viewer (wrapped in `.tpl-scope`). For a standalone check, import the component directly in a scratch Vite page with the `_shared` folder alongside `src/templates`.

## Structure

```
design-02-roastery/
  index.jsx    — nav, hero, lineup, roast timeline, origin map, wholesale, brew guides, footer
  meta.js      — contract-shaped meta
  content.js   — brand, hero schedule, 6-product lineup (₹ numbers), 5 timeline stages, 4 origins, wholesale tiers, brew guides
  styles.css   — tokens on .tpl-design-02-roastery; every rule scoped
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
```

Interactive bits: roast-level selector (Light/Medium/Dark) that morphs the lineup with crossfades and sliding roast-scale dots; shop-category nav filtering (Single Origins/Blends/Decaf); add-to-bag with a popping cart count; a scrubbed bean-to-bag timeline that activates five stages; an SVG origin map whose trade routes draw via `getTotalLength()` with pins blooming at 80% (mobile gets a swipeable region list); a wholesale inquiry form with success state.

## Replace images

Drop new files over `assets/hero.jpg`, `menu-1.jpg`, `menu-2.jpg`, `menu-3.jpg`, `detail.jpg` — or use the lab's Upload panel (keys `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`). Keep the warm-industrial grade: neutral daylight, ember warmth in highlights, crisp texture.

## Tokens

On `.tpl-design-02-roastery`: `--color-background #E9DFCC`, `--color-surface #DCCFB6`, `--color-primary #26211B`, `--color-secondary #7A6A52`, `--color-accent #C65A26`, `--color-text #231E16`, `--color-muted #8C7C66`, `--font-display 'DM Serif Display'`, `--font-body 'Inter'`. The customizer rewrites these live.

## content.js

Plain JSON-compatible object. Product prices are ₹ numbers rendered via `price()`; names via `productName()`; brand and contact email via `useCustom()` overrides.

## Deploy

Exported as a standalone Vite template via the lab's exporter (see `tools/export-template.mjs`). Fonts load from Google Fonts at runtime with `display=swap`.
