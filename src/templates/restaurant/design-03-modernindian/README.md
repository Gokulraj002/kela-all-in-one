# Kela Kitchen — Modern Indian (design-03-modernindian)

**Personality:** Refined · Bold · Elemental. A modern Indian kitchen where fire
is the design metaphor and the organising principle of the menu — dishes are
grouped by element (Smoke / Earth / Fire / Ice), not by course.

**Run:** `npm install`, then `npm run dev` from `~/workspace/atelier`.

## Structure

```
index.jsx    — default-export React component (nav, hero, philosophy,
               elemental menu bands, tasting journeys, bar, reserve, footer)
meta.js      — export const meta (contract shape)
content.js   — export const content (plain JSON-compatible copy + prices)
styles.css   — all styling, scoped to .tpl-design-03-modernindian
assets/      — hero.jpg, dish-1.jpg, dish-2.jpg, dish-3.jpg, detail.jpg,
               frames/ (frame-001.jpg … frame-072.jpg — scroll-driven
               tadka-tempering sequence, scrubbed via ScrollFrames)
README.md
```

## Signature motion — M3 "Elemental bands"

Four full-width bands (Smoke / Earth / Fire / Ice), alternating dark/light.
Each band ignites on scroll via a scrubbed (0.6) timeline:
- an ember-glow edge sweeps across the band's top (`clip-path` wipe)
- dish cards stagger-rise (`y: 56 → 0`)
- the element glyph scales in (`scale 0.6 → 1`)

In-flow, no pin. Reduced motion: bands render static and fully visible
(initial states are set only through GSAP `fromTo`, never in CSS).

Hero: an ember-edged frame sweeps across on load (1s), headline slams in
with `power4.out` word stagger (0.05). Hover on dishes: ember underline draw.

## Replacing images

Swap the files in `assets/` keeping the same names, or use the lab's Upload
panel — keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens (scoped, customizer-editable)

`--color-background #191410` · `--color-surface #241C16` ·
`--color-primary #F5EEDF` · `--color-secondary #8C6E4E` ·
`--color-accent #D9622B` · `--color-text #EDE4D2` · `--color-muted #8A7A64` ·
`--font-display 'Rozha One'` · `--font-body 'Manrope'`.

## content.js

Brand, nav, hero copy, philosophy, the four element bands (dishes with ₹
prices as numbers), two tasting journeys, the bar list, Delhi/Mumbai
locations, footer. Rendered through `useCustom` — brand names via
`productName(i, fallback)`, prices via `price()` — so Customize works.

## Deploy

Built as part of the ATELIER app (`npm run build` at repo root); standalone
export via `tools/export-template.mjs design-03-modernindian`.
