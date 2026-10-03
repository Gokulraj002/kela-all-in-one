# Kela Estates — design-06-coliving

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Co-living spaces for ATELIER (real estate category, design 06).

## Personality

Youthful community: warm, social, alive — messy in a good way. Member
stories, house rituals, transparent ₹/month pricing. Sticker-like badges,
polaroid piles, terracotta + cream + leaf green on ink.

- **Palette:** cream `#FAF5EA` · terracotta `#C96F3F` · leaf `#5A7A4E` · ink `#26221B`
- **Type:** DM Serif Display (display) + Plus Jakarta Sans (body)
- **Signature motion:** polaroid scatter — listing/member cards styled as
  polaroids scatter outward with springy `back.out` rotation on scroll,
  settle into a readable grid under a brief desktop pin, then re-scatter
  into the next set (the houses → house-life moments).
- **Signature motion (hero):** scroll-driven `ScrollFrames` sequence —
  "Courtyard life": 72 JPG frames in `assets/frames/` scrub frame-by-frame
  through a pinned hero; the frames advance as you scroll and fall back
  to a static first frame with reduced motion. Bright morning /
  terracotta / leaf grade.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev   # then open the ATELIER viewer and pick Kela Estates (design-06-coliving)
```

## Structure

```
design-06-coliving/
  index.jsx   — the site (nav, hero, houses scatter, rituals, members,
                pricing, footer)
  content.js  — all copy: brand, hero, houses, rituals, member stories,
                pricing plans, visit/contact, footer
  meta.js     — viewer metadata
  styles.css  — all styling; tokens on .tpl-design-06-coliving only
  assets/     — hero.jpg, listing-1..3.jpg, detail.jpg, frames/ (72 hero frames)
  README.md
```

## Replace images

Swap the JPGs in `assets/` (same filenames) or use the lab's Upload panel:
`hero`, `product-0`…`product-2`, `product-3`, `detail`. The hero sequence
lives in `assets/frames/` as `frame-001.jpg`…`frame-072.jpg`.

## Tokens

Defined on `.tpl-design-06-coliving` (never `:root`):
`--color-cream`, `--color-cream-deep`, `--color-terracotta`,
`--color-terracotta-deep`, `--color-leaf`, `--color-leaf-deep`,
`--color-ink`, `--color-ink-soft`, `--color-muted`, `--color-paper`,
`--font-display`, `--font-body`. The customizer rewrites these live.

## content.js

Plain JSON-compatible object. Prices are numbers (₹/month) rendered via
`price()`; house/plan names via `productName(i, fallback)`; contact via
the `contact` object from `useCustom()`.

## Deploy

Export through the ATELIER viewer (`export-template.mjs`): the folder is
self-contained — it imports only `react`, `gsap`, `gsap/ScrollTrigger`,
`../../_shared`, and its own files.
