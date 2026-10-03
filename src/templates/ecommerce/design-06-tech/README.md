# Kela Store Tech — design-06-tech

Brand name, domain and handle come from `src/templates/_shared/brand.js` (`brandFor('ecommerce')`).

Dark precision gadget store for the ATELIER e-commerce library. Spec-forward,
HUD-annotated, engineered — graphite `#101216`, steel `#9AA3B2`, and signal
cyan `#57D0E8` used flat and thin. Space Grotesk display + IBM Plex Mono body.

## Personality

Kela Store's tech storefront sells like lab equipment: every product carries a tag
(`HP-01`, `SW-02`…), every claim carries a number. The signature scroll
mechanic is the **Blueprint Scan** — a pinned section where a vertical
scan-line sweeps the four-unit lineup with scroll scrub. As the line crosses
each product, its HUD callout pops in (crosshair + mono spec text + drawn SVG
leader line) and the readout panel publishes that unit's spec sheet.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-06-tech/
  index.jsx    — component: nav, hero, blueprint scan, spec matrix, support, footer, cart drawer
  meta.js      — template metadata (contract shape)
  content.js   — all copy, products (₹), specs, support items
  styles.css   — tokens scoped to .tpl-design-06-tech ONLY
  README.md
  assets/
    hero.jpg         — gadget on dark turntable, cyan edge light
    product-1.jpg    — Aria wireless headphones, studio shot
    product-2.jpg    — Pulse smartwatch, AMOLED macro
    product-3.jpg    — Orbit mechanical keyboard, detail
    detail.jpg       — GaN circuit board macro (doubles as charger visual)
  assets/frames/   — 72 hero frames (frame-001.jpg … frame-072.jpg), scrubbed by scroll
                      via the ScrollFrames component; the old signature video file was deleted 2026-10-02
```

## Replacing images

Swap any file in `assets/` keeping the same filename, or use the platform's
Upload panel — upload keys are `product-0`, `product-1`, `product-2`,
`detail` (the Volt charger maps to `detail`).

## Tokens

```css
.tpl-design-06-tech {
  --color-background: #101216; --color-surface: #16191f; --color-panel: #1b1f27;
  --color-secondary: #9aa3b2; --color-accent: #57d0e8;
  --color-text: #f2f4f6; --color-muted: #78818f;
  --font-display: 'Space Grotesk'; --font-body: 'IBM Plex Mono';
}
```

The customizer rewrites these live. Never write to `:root`.

## content.js

Brand, nav, hero copy, four products with INR prices / badges / per-product
spec rows / HUD callout anchors, scan copy, spec-matrix rows, support items,
cart copy, contact, footer. All prices flow through `price()` (₹ formatting);
names through `productName()`.

## Motion notes

- GSAP + ScrollTrigger, `gsap.context` + `revert()`, `scroller()` on every trigger.
- Blueprint Scan pin is desktop-only via `gsap.matchMedia('(min-width: 1024px)')`.
- Mobile (<1024px): stacked cards, callouts static, scan-line and readout hidden.
- `prefers-reduced-motion`: no pin, no reveals — everything static and visible
  (`.is-reduced` class on root; LoopVideo renders poster only).
- Demo cart is in-component `useState` — drawer, quantities, totals, Escape to close.

## Deploy

Standalone export via `tools/export-template.mjs`; `vite build` must be clean.
