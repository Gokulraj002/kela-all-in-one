# Kela Fashion — design-06-silk

**Luxury silk maison, dark cinematic.** Pure silk sarees, zari, museum spacing,
one product per viewport. Silence is the aesthetic. Slow motion only.

## Personality

Opulent · Silent · Precise. Near-black grounds, champagne silk type in Bodoni
Moda, pale-champagne accents used only for seals and edition numbering. The
signature is **drapeSim**: a pinned silk panel (desktop) carrying an SVG drape
wave whose amplitude is tied to scroll progress — 8 → 46 → 14 across a `+=300%`
scrub — with a champagne sheen translating across and zari flecks brightening
with amplitude. The "Silk Pour" hero loop runs behind a 0.6s cinematic hold.

## Run

```bash
npm install
npm run dev      # open the ATELIER viewer, pick Fashion → Kela Fashion (silk design)
```

## Structure

```
design-06-silk/
  index.jsx   — default export React component (nav, hero, philosophy,
                collection + drapeSim, provenance, drape ritual, salon, footer)
  meta.js     — template metadata (id design-06-silk, num 06)
  content.js  — all copy, products (₹), contact — edit freely
  styles.css  — tokens scoped to .tpl-design-06-silk only
  assets/     — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                frames/ (frame-001.jpg … frame-072.jpg — "Silk Pour" hero
                frame sequence, scrubbed by ScrollFrames on scroll)
  README.md
```

## Replacing images

Drop new files over `assets/hero.jpg`, `look-1.jpg`, `look-2.jpg`,
`look-3.jpg`, `detail.jpg` (same names), or use the lab's Upload panel —
upload keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.
Keep the dark cinematic grade: near-black ground, single key light, champagne
highlights, no faces, no text in frame.

## Tokens (customizer)

Scoped on `.tpl-design-06-silk`:

- `--color-background: #0D0B09` — near-black ground
- `--color-surface: #161210` — plinth panels, cards
- `--color-primary: #EBDCBE` — champagne silk (headlines)
- `--color-accent: #D8C29A` — pale champagne (seals, numbering only)
- `--color-text: #F0E6D2` — body copy
- `--color-muted: #847768` — captions
- `--font-display: 'Bodoni Moda', serif` · `--font-body: 'Manrope', sans-serif`

Fonts load via Google Fonts (`tpl-font-design-06-silk` link, injected once).

## content.js

Brand, nav, hero (incl. `zariCount` tick), philosophy manifesto + stats,
three products with `price` (INR numbers, rendered via `price()`), provenance
cards, drape-ritual steps, salon copy, contact (email / instagram / whatsapp /
address / hours), footer lines.

## Motion notes

- `drapeSim`: pinned ≥768px via `gsap.matchMedia`; the wave is one `<path>`
  whose `d` is rebuilt in the scrub `onUpdate` (the single allowed per-tick
  DOM write). Reduced-motion / mobile: static drape at mid amplitude.
- Hero: 0.6s black hold → 1.8s `foldUnfold` of the pour → word-masked title →
  zari counter ticks to 1,200.
- Reveals: `drapeSettle` 1.4s; images `foldUnfold` 1.6s with 6% inner drift;
  one parallax allowance (flagship silk, −6% scrubbed); two film-cut black
  dips between chapters.

## Deploy

Exported by the ATELIER exporter as a standalone Vite site (see
`tools/export-template.mjs`). Self-contained: imports only `react`, `gsap`,
`./content.js`, `./styles.css`, `./assets/*`, and `../../_shared`.
