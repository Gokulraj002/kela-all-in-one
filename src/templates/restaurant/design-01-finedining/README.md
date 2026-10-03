# Kela Kitchen — design-01-finedining

**Personality:** Hushed · Precise · Ceremonial. A fine-dining tasting menu rendered as seven movements.

**Signature motion (M1 — "The seven veils"):** on desktop (≥768px) the tasting section pins and each course panel's veil lifts via scrubbed `clip-path` (`inset(0 0 0%) → inset(0 0 100%)`, scrub 1), revealing the course beneath like a cloche lifting in slow motion; a Roman-numeral counter (I/VII) tweens as panels change. Mobile stacks the panels with quiet reveals; reduced-motion renders everything static, veils hidden.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

## Structure

- `index.jsx` — the template (nav, hero, philosophy, the tasting, wine, private dining, reserve, footer)
- `content.js` — all copy: brand, 7 courses, wine pairings, hours, contact
- `meta.js` — contract metadata
- `styles.css` — all styling, tokens scoped to `.tpl-design-01-finedining`
- `assets/` — `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`, `detail.jpg`, plus `frames/frame-001.jpg` … `frame-072.jpg` (the scroll-driven hero sequence)

## Replace images

Drop new JPGs over the files in `assets/` with the same names, or use the platform Upload panel with keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

```css
--color-background: #131110; --color-surface: #1d1a17;
--color-primary: #f2ead9;   --color-secondary: #8a7b63;
--color-accent: #a88b4f;    --color-text: #e9e0ce;
--color-muted: #7e7461;
--font-display: 'Cormorant Garamond', serif;
--font-body: 'Outfit', sans-serif;
```

Brass (`--color-accent`) is a 10% accent: numerals, seals, the Reserve CTA, hairlines — never a gradient.

## content.js

Course names render through `productName(i, fallback)` (customizable in the platform); prices through `price(n)` in ₹ by default.

## Deploy

Built and QA'd via the ATELIER platform exporter (`tools/export-template.mjs`); standalone `vite build` of the exported folder is the deploy artifact.
