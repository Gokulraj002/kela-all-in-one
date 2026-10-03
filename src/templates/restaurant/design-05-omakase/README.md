# Kela Kitchen — Omakase (design-05-omakase)

**Personality:** Restrained · Precise · Reverent. The calmest design in the
restaurant category — enormous whitespace, opacity-only motion, no hover on
dishes. A twelve-seat omakase counter in Kala Ghoda, Mumbai.

**Signature mechanic (M5 — "The counter serve"):** a pinned desktop section
where six courses travel right → left along a hinoki counter bar as you
scroll. Each dish pauses at center — spotlit (scale 1.06, others dim to
0.45) — while its course note fades in above. One spotlight at a time, like
being served. Mobile: horizontal swipe strip. Reduced motion: static grid,
all six courses visible.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template renders through the ATELIER viewer; it also works standalone
via the export assembler (`tools/export-template.mjs`).

## Structure

- `index.jsx` — the site: whisper nav, scroll-driven hero frame sequence,
  the counter (chef), the progression (signature mechanic), etiquette,
  reserve, minimal footer
- `meta.js` — library metadata (`export const meta`)
- `content.js` — all editable copy: brand, hero, chef, 6 courses, etiquette
  rules, seatings, visit info
- `styles.css` — all styling; tokens on `.tpl-design-05-omakase` only
- `assets/` — `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`,
  `detail.jpg`, plus `assets/frames/` — 72 JPG frames for the scroll-driven
  hero sequence (`frame-001.jpg` … `frame-072.jpg`)

## Replace images

Swap files in `assets/` keeping the same names, or use the lab's Upload
panel — keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.
The sixth "course" is a CSS hanko seal, not an image.

## Tokens

`--color-background: #F5F2EA` (washi) · `--color-surface: #ECE7D8` ·
`--color-primary: #1C1C1A` (ink) · `--color-secondary: #6E6A5E` ·
`--color-accent: #B03A2E` (vermillion, hanko + CTA) · `--color-text`,
`--color-muted` · `--font-display: 'Shippori Mincho'` ·
`--font-body: 'Zen Kaku Gothic New'`. The customizer rewrites these live;
never hardcode hex in CSS.

## content.js

Plain JSON-compatible object. Course names render through
`productName(i, fallback)`; the evening price renders through `price(9500)`;
brand/email through the customization context with content.js fallbacks.

## Deploy

The whole folder is self-contained — the export assembler
(`tools/export-template.mjs`) copies it into a standalone Vite project:
`node tools/export-template.mjs restaurant design-05-omakase`, then
`npm install && npm run build` in the exported dir.
