# Kela Cafe — design-03-scandi

Scandinavian café. Extreme restraint as luxury: white ground, pale oak surfaces, fjord blue used only at dawn/dusk tints and quiet CTAs. Libre Baskerville whispers the headlines at modest scale; Instrument Sans light carries the body at generous line-height. Whitespace is the design.

## Personality

Calm · Luminous · Restrained. The only design whose motion vocabulary is fades and breathing — nothing translates more than a few pixels, nothing scales. Signature: the **breathing divider** (a thin oak rule with a small circle expanding on a 4s sine rAF loop, paused offscreen via IntersectionObserver — one shared loop for the whole page). `steamRise` is overridden to opacity-only. This design degrades most gracefully under reduced motion: identical, minus the breathing loop.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

Renders inside the ATELIER viewer (wrapped in `.tpl-scope`). For a standalone check, import the component directly in a scratch Vite page with the `_shared` folder alongside `src/templates`.

## Structure

```
design-03-scandi/
  index.jsx    — nav, hero, ritual, moment menu, seasons, room gallery, visit, footer
  meta.js      — contract-shaped meta
  content.js   — brand, hero, ritual, 3 moment menus (₹ numbers), seasons, room, visit
  styles.css   — tokens on .tpl-design-03-scandi; every rule scoped
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
```

Interactive bits: daylight-aware hero tint (cooler at dawn, warmer at dusk — computed once on load, CSS 2s transition); menu grouped by moment (Morning/Fika/Evening) with 0.6s crossfades; the room gallery as a slow crossfading pair (6s interval, 2s crossfade, paused offscreen); breathing dividers between sections. No marquee, no badges, no sticky CTAs — calm wins.

## Replace images

Drop new files over `assets/hero.jpg`, `menu-1.jpg`, `menu-2.jpg`, `menu-3.jpg`, `detail.jpg` — or use the lab's Upload panel (keys `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`). Keep the grade desaturated, cool-pale, airy — like daylight through linen.

## Tokens

On `.tpl-design-03-scandi`: `--color-background #FBFAF6`, `--color-surface #F0ECE2`, `--color-primary #33383B`, `--color-secondary #B99A6B`, `--color-accent #5E7A8C`, `--color-text #2B2F33`, `--color-muted #9AA0A3`, `--font-display 'Libre Baskerville'`, `--font-body 'Instrument Sans'`. The customizer rewrites these live.

## content.js

Plain JSON-compatible object. Prices are ₹ numbers rendered via `price()`; names via `productName()`; brand and contact email via `useCustom()` overrides.

## Deploy

Exported as a standalone Vite template via the lab's exporter (see `tools/export-template.mjs`). Fonts load from Google Fonts at runtime with `display=swap`.
