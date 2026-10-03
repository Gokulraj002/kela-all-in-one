# Kela Fashion — design-05-slow · Slow Fashion

Earthy editorial template for sustainable slow fashion: handloom, natural
dyes, artisan stories, cotton fields at golden hour. Honest, grounded, warm.

## Personality

Restraint is the luxury. Transparency is the product — impact numbers and
maker names outrank marketing copy. The calmest design in the fashion
category: breathing fades, 1.3s reveals, motion that follows natural
processes like dye blooming in water.

## Run

```bash
npm install
npm run dev     # template renders inside the ATELIER viewer
```

## Structure

```
design-05-slow/
  index.jsx    — React component (nav, hero, dye journey, collection,
                 makers, craft scroll-scrub, impact, footer)
  meta.js      — id design-05-slow · num 05 · name "Mitti" · tag "Slow Fashion"
  content.js   — all copy, products, artisans, impact stats (plain object)
  styles.css   — tokens on .tpl-design-05-slow only; no :root
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                 frames/frame-001.jpg … frame-072.jpg ("The Vat" scroll-scrub sequence)
  README.md
```

## Signature motion — swatchAccordion

A pinned dye journey (`≥768px` via `gsap.matchMedia`, `end: '+=300%'`,
`scrub: 0.8`) through 4 swatch-bands: Indigo Vat → Madder Root → Turmeric →
Undyed Kora. Scrub progress maps to per-band weights with smooth crossfades
at segment boundaries:

- active band's detail panel blooms via transform-only `scaleY` (origin top)
- inactive bands compress to thread-thin strips (transform-only `scaleY`)
- a dye-bloom dot pulses down a side rail as the stage changes

All DOM writes happen in the scrub `onUpdate`; no layout thrash.
Mobile (<768px) and `prefers-reduced-motion`: pin is never created — all
bands render fully expanded and stacked, counters show final values.

## Sections (tour stops)

hero → story (Dye Journey) → products (Collection) → gallery (Makers) →
craft ("The Vat" scroll-scrub sequence) → visit (Our Footprint) → footer.

## Replace images

Drop new files over `assets/hero.jpg`, `look-1.jpg`, `look-2.jpg`,
`look-3.jpg`, `detail.jpg` (same names) or use the lab's Upload panel —
upload keys are `hero`, `product-0…product-3`, `detail`. Keep the earthy
grade: golden-hour light, film grain, muted saturation, no white packshots.

Replace the craft sequence by overwriting files in `assets/frames/`
(`frame-001.jpg` … `frame-072.jpg`, 16:9 JPGs, hands/process/fabric only,
no faces, no text). The scrub pins for `+=120%` of scroll and plays the
frames front-to-back as the visitor scrolls.

## Tokens

On `.tpl-design-05-slow`: `--color-background #EDE4CC` (oat),
`--color-surface #DECFAC`, `--color-primary #3B422B` (moss),
`--color-accent #9C4F2A` (madder), `--color-text #2E2A1F`,
`--color-muted #7E7460`, `--font-display 'Fraunces'`,
`--font-body 'Work Sans'`. The customizer rewrites primary/accent and the
font pair live via inline scope vars.

## content.js

Brand, nav, hero, journey bands (name/source/swatch/days/water/notes),
8 products (name/price/dye/fabric/days/maker/desc + 4-line cost breakdown),
3 artisans (name/role/quote/wage), craft copy, impact stats, contact, footer.
Prices are plain ₹ numbers rendered through `price()`.

## Deploy

Built as part of the ATELIER app (`npm run build`); standalone export via
`tools/export-template.mjs` copies the folder with `_shared` — imports stay
inside `./local` and `../../_shared` so the export stays self-contained.
