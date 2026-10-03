# Kela Fashion — design-01-heritage

Heritage handloom house for ATELIER (Saree & Fashion category, design 01).
Craft-documentary feel: weavers, looms, GI-tag craft clusters. Warm tungsten
light, film grain, honest texture.

## Personality

Reverent · Documentary · Human. The makers outrank the merchandise — weaver
portraits and process imagery first; the collection appears inside the story,
never as a cold catalog.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

## Structure

```
design-01-heritage/
  index.jsx    — default export React component (VastraHeritage)
  meta.js      — export const meta (contract shape)
  content.js   — export const content (all editable copy/data, JSON-compatible)
  styles.css   — all styling; tokens scoped to .tpl-design-01-heritage only
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                 frames/ (72-frame scroll-scrubbed shuttle sequence)
  README.md
```

## Sections

1. **Hero** (`#hero`, tour "The Loom") — "The Shuttle" 72-frame scroll-scrubbed
   sequence (hands/shuttle/beater, no faces, no text) pinned for +=170% scroll,
   foldUnfold canvas entrance, Rozha One word-rise headline, weft-thread draw,
   WhatsApp CTAs.
2. **Craft clusters** (`#story`, tour "Craft Clusters") — GI-tag explorer:
   Kanchipuram / Banaras / Chanderi tabs with motif, zari, loom count, price band.
3. **Craft chapters** (`#craft`, tour "Craft Chapters") — signature
   **pageturnLookbook**: pinned (≥768px) Loom → Dye → Weave → Drape pages with
   fabric corner-sweep page turns, weft-thread foot draws, chapter dots.
   Static stacked chapters below 768px and under reduced motion.
4. **Collection** (`#collection`, tour "The Collection") — 4 cards with weave
   badges (GI, Silk Mark, zari purity), ₹ prices via `price()`, per-product
   WhatsApp enquiry deep-links.
5. **Weavers** (`#weavers`, tour "The Weavers") — artisan index with names,
   villages, years at the loom, quotes; hover thread-underline.
6. **Visit** (`#visit`, tour "Visit Us") — address, hours, bridal/video-call
   note, WhatsApp CTA card, email/phone/instagram via `useCustom`.
7. **Footer** — film-style craft credits (dye masters, weavers, clusters).

## Replacing images

Drop new files over `assets/hero.jpg`, `look-1.jpg`, `look-2.jpg`,
`look-3.jpg`, `detail.jpg` (same names), or use the lab's Upload panel —
upload keys are `hero`, `product-0…product-3`, `detail`. The hero is a
scroll-scrubbed frame sequence (`assets/frames/frame-001.jpg` … `frame-072.jpg`)
pinned for +=170% of scroll; frame-001 paints immediately as the first frame
and under reduced motion it renders as a static image with all copy visible.

## Tokens

On `.tpl-design-01-heritage` (customizer rewrites these live):

| Token | Default |
|---|---|
| `--color-background` | `#f4ecda` (khadi ivory) |
| `--color-surface` | `#e7d9bc` (loom-wood parchment) |
| `--color-primary` | `#26355e` (indigo) |
| `--color-accent` | `#d9a441` (turmeric) |
| `--color-text` | `#2b2318` |
| `--color-muted` | `#8a7a5e` |
| `--font-display` | `'Rozha One', serif` |
| `--font-body` | `'Mukta', sans-serif` |

## content.js

Brand, nav, hero copy, clusters (GI data), chapters (stats), products
(prices as numbers in ₹, rendered via `price()`), weavers, visit details,
contact (email/phone/WhatsApp/Instagram), footer credits.

## Notes

- WhatsApp deep-links use `content.contact.whatsapp` — replace
  `919876543210` with the house number before publishing.
- Motion: GSAP + ScrollTrigger in one `useLayoutEffect` / `gsap.context`
  with `revert()` cleanup; every trigger passes `scroller: scroller()`;
  pin gated at `(min-width: 768px)` via `gsap.matchMedia`.
- Reduced motion: no pin, chapters stack fully visible, threads fully
  drawn, video replaced by poster (`LoopVideo` handles this).
