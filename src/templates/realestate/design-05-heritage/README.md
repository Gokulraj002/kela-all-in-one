# Kela Estates — design-05-heritage

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

**Heritage Restoration** · ATELIER real-estate template 05/10.

Storied craft: archival sepia meets restored full color. A letterpress-styled
site for a Malleshwaram heritage-restoration practice — craftsman profiles,
a four-material library (lime, teak, brass, stone), and a scroll-scrubbed
before/after wipe across three restoration chapters (facade / colonnade /
interiors).

## Run

```bash
npm install
npm run dev
```

The template is self-contained under
`src/templates/realestate/design-05-heritage/` and mounts inside the ATELIER
platform shell (`.tpl-scope`); it also runs standalone via the template
exporter.

## Structure

- `index.jsx` — the site: nav (crest wordmark), hero, restorations, the
  before/after wipe, craft & materials, the ritual film, journal, enquire,
  footer. GSAP + ScrollTrigger in `gsap.context` with `revert()` cleanup.
- `meta.js` — design metadata for the platform catalog.
- `content.js` — all editable copy: brand, projects, wipe chapters,
  materials, craftsmen, journal entries, contact.
- `styles.css` — all styling; tokens scoped to `.tpl-design-05-heritage`
  only (never `:root`).
- `assets/` — `hero.jpg`, `listing-1.jpg`, `listing-2.jpg`,
  `listing-3.jpg`, `detail.jpg`, `frames/` (72 JPG frames for the
  scroll-driven ritual sequence — extracted from the retired
  `hero-loop.mp4`, 10s, 1280×720, H.264, deleted 2026-10-02).

## Scroll mechanic — before/after wipe scrub

A pinned stage (desktop ≥768px, via `gsap.matchMedia`) holds three
chapters. Scrolling scrubs a brass-gripped vertical handle: the archival
sepia layer wipes away right-to-left to reveal the restored full-color
image beneath, with dates labeling each side (1902 → 2026). Each chapter
arrives with its own caption card. Reduced-motion and mobile get static
side-by-side sepia/color pairs instead — no pins, nothing hidden.

## Replace images

Drop new JPGs into `assets/` with the same filenames, or use the lab's
Upload panel — images resolve through `useCustom`'s `img()` with keys
`hero`, `product-0`, `product-1`, `product-2`, `detail`. The sepia
"archival" versions are CSS-graded from the same files, so only the five
color originals need replacing.

## Tokens

Edit on `.tpl-design-05-heritage` in `styles.css` (the customizer rewrites
these live):

- `--color-primary` `#5A2320` (oxblood) · `--color-secondary` `#CBBFA8`
  (aged stone) · `--color-accent` `#A9884B` (brass)
- `--color-background` `#F1EAD9` (limewash) · `--color-surface` `#E8DCC2`
- `--color-text` `#2B1E17` · `--color-muted` `#857558`
- `--font-display` Playfair Display · `--font-body` Manrope
  (injected as Google Fonts link `tpl-font-design-05-heritage`)

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero`, `restorations`
(projects carry ₹ prices as numbers, rendered via `price()`),
`compare.chapters`, `craft` (materials + craftsmen), `ritual`, `journal`,
`enquire`, `footer`. No functions, safe for the customizer.

## Deploy

Exported as a standalone Vite app by the platform exporter
(`tools/export-template.mjs`); the template imports only its own folder,
`../../_shared`, `react`, and `gsap` — nothing platform-specific.
