# Kela Cafe — design-06-premium

**Personality:** Dark cinematic luxury. Near-black grounds, champagne type,
Cormorant Garamond at large scale with extreme whitespace. Museum spacing —
one idea per screen. Scarcity and ritual; silence is the aesthetic.

**Conversion goal:** Purchase flagship products; join the private circle for
limited releases.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-06-premium/
  index.jsx    — component (Nav, Hero, Philosophy, Collection, Provenance, Ritual, Circle, Footer)
  meta.js      — contract meta
  content.js   — all copy, products with lot numbers (₹ numbers), provenance data, ritual steps
  styles.css   — tokens scoped to .tpl-design-06-premium
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
  README.md
```

**Note:** `hero.jpg` and `menu-1.jpg` are currently same-design stand-ins
(copies of `detail.jpg` and `menu-2.jpg`) — the flagship-bag-in-dark-light
hero and the studio still-life generations failed with a media-pipeline
transport error. Regenerate those two shots and overwrite the files; no code
changes needed (upload keys `hero` and `product-0`).

## Motion

- **Hero** — near-black holds 0.6s (deliberate cinema, not a stall), then the
  flagship pour-wipes in over 1.8s while a single line of copy word-rises and
  the lot number ("LOT 47 OF 200") types in character by character. Total ≤ 3.5s.
- **Flagship parallax** — the hero image drifts `yPercent: -6` scrubbed across
  the hero (the category's second parallax allowance).
- **Reveals** — `steamRise` at 1.4s, `y: 48`, stagger 0. Museum pieces arrive
  one at a time, centered.
- **Provenance** — the lot counter ticks 1 → 47 (1.5s, snapped) while the
  edition bar fills to 47/200; the certificate panel unfolds with a slow
  vertical `clip-path` open (1.4s).
- **Fade-to-black beats** — 0.8s black dips into the Collection and Provenance
  sections (max two), like film cuts.
- **Gift wrap** — the ribbon badge flips `rotateY` in 0.5s (the category's
  single allowed 3D transform, kept subtle).
- **Hover** — almost none by design: product images get a 1.2s slow zoom;
  the circle email field gets a gold underline draw on focus.
- Reduced motion: fades only; counter shows the final number; no parallax,
  no zooms, no beats.

## Replace images

Swap the files in `assets/` (same filenames) or use the lab's Upload panel —
upload keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Tokens

`--color-background #100D0A` · `--color-surface #1A1512` ·
`--color-primary #D9C9A8` · `--color-secondary #6E5F45` ·
`--color-accent #C9A961` · `--color-text #F2EBDD` · `--color-muted #8E8474` ·
`--font-display 'Cormorant Garamond'` · `--font-body 'Manrope'`.
Gold appears on seals and numbering only — one glint per section.

## content.js

Edit brand, nav, hero (eyebrow/title/lot/sub), philosophy, collection
products (names via the customizer's `productName()`, prices are ₹ numbers
rendered through `price()`), provenance data, ritual steps, circle copy,
contact, and footer.

## Deploy

Exported as a standalone Vite app via the ATELIER exporter; any static host
works (`npm run build` → `dist/`).
