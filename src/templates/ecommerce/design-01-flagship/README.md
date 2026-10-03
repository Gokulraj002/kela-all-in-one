# Kela Store Flagship — design-01-flagship

Minimal flagship store, gallery-led, museum spacing. One product per
viewport: a horizontal gallery wall scrubs past on scroll (desktop), the
wall pausing at each pedestal under a center spotlight while its museum
label plate (Nº, name, detail, price) fades in. Mobile gets an elegant
stacked walk — one piece per screen.

## Personality

Quiet, assured, curatorial. Bone `#F4F1EA` ground, ink `#1A1815` text,
deep bronze `#8C6A3F` accent, hairline rules, small-caps eyebrows,
numbered pieces ("Nº 01 — The Sculpted Tote"). Cormorant Garamond for
display, Inter for the quiet labels.

## Run

From the atelier repo root:

```bash
npm install
npm run dev
```

The design registers in the ATELIER viewer under E-commerce → Kela Store
Flagship. Brand name, domain and handle come from
`src/templates/_shared/brand.js` (`brandFor('ecommerce')`). Standalone export: `tools/export-template.mjs design-01-flagship`.

## Structure

```
design-01-flagship/
  index.jsx   — the site (nav, hero, gallery walk, craft, care, footer, cart drawer)
  meta.js     — platform metadata (id, name, palette, features…)
  content.js  — all copy + INR prices (edit here, never in JSX)
  styles.css  — all styling; tokens live on .tpl-design-01-flagship only
  assets/     — hero.jpg, product-1..3.jpg, detail.jpg, frames/ (72 scroll-scrubbed hero frames)
  README.md
```

## Replacing images

Swap files in `assets/` keeping the names, or use the lab's Upload panel
(keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`).

- `hero.jpg` — gallery interior with a single pedestal
- `product-1.jpg` — Nº 01, the sculpted leather tote on a pedestal
- `product-2.jpg` — Nº 02, the silk twill scarf, flat-lay
- `product-3.jpg` — Nº 03, the stoneware vessel, macro
- `detail.jpg` — Nº 04 reuses `hero.jpg` (cashmere throw on the pedestal);
  `detail.jpg` is the packaging-ritual still for the Craft section
- `assets/frames/frame-001.jpg` … `frame-072.jpg` — "The pedestal": 72 frames
  of a dolly-in on the pedestal, silk cloth drifting past, light breathing.
  Scrubbed by scroll via ScrollFrames (pinned `+=170%`); reduced motion
  shows frame-001 as a static print.

No text or watermarks in imagery; keep the bone/ink/bronze grade.

## Tokens

On `.tpl-design-01-flagship` — never `:root`:

`--color-background #F4F1EA` · `--color-surface #EDE8DB` ·
`--color-primary #1A1815` · `--color-secondary #5A5248` ·
`--color-accent #8C6A3F` · `--color-text` · `--color-muted` ·
`--font-display 'Cormorant Garamond'` · `--font-body 'Inter'`.

## Content

`content.js` holds brand, nav, hero, the four products (prices as plain
₹ numbers: 24500 / 8900 / 6400 / 18200), craft story, shipping & care,
contact and footer. Prices render through the `price()` hook; names
through `productName(i, fallback)`; images through `img(key, fallback)`.

## Motion

GSAP + ScrollTrigger, `gsap.context` + `revert()`, `scroller()` on every
trigger, `gsap.matchMedia('(min-width: 1024px)')` for the pinned walk
(pin is killed/restored on resize across the breakpoint). Reduced motion
renders the walk as a calm static stack — no JS animation at all.

## Deploy

Ship as part of the ATELIER lab (viewer + export tooling), or deploy the
standalone export zip anywhere static files are served.
