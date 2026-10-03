# design-07-smart — "Kela Estates"

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Smart homes, tech-led — without the gadget clichés. A calm dark nocturne:
near-black surfaces, living amber light, dawn-blue accents, fine hairlines
and glowing touches. The headline act is a scroll-scrubbed **day-night home
simulation**: a pinned interior frame where scrolling drags the light from
06:00 to 22:00 — the grade crossfades (CSS filters + overlay tints) while
feature overlays toggle per phase (blinds / climate / lighting scenes /
security).

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template mounts in the ATELIER viewer under Real Estate → "Kela Estates".

## Structure

```
design-07-smart/
  index.jsx    — component (nav, hero, day simulation, features, floor plans, visit, footer)
  meta.js      — meta (id 'design-07-smart', num '07')
  content.js   — all copy, prices (₹ numbers), contact
  styles.css   — tokens on .tpl-design-07-smart only
  assets/      — hero.jpg, listing-1.jpg, listing-2.jpg, listing-3.jpg, detail.jpg, frames/ (72 scroll-driven hero frames)
  README.md
```

## Sections

- **Nav** — minimal dark, glowing amber CTA ("Book a private tour")
- **Hero** — full-bleed scroll-driven frame sequence "The house wakes" (72 frames, pinned +=170%)
- **The Day** — pinned day-night simulation (≥768px + motion); four static
  phase cards on mobile / reduced-motion
- **Features** — four hairline-grid chapters + the one-dial story (detail.jpg)
- **Floor Plans** — three residences (2/3/4 BHK, Bengaluru, ₹ via price())
- **Visit + Footer**

Tour stops (`data-tour`): The House Wakes · A Day in the House · Features ·
Floor Plans · Visit.

## Replacing images

Drop new files into `assets/` keeping the names, or use the lab's Upload
panel — Img keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`.
The hero is a scroll-driven frame sequence: `assets/frames/frame-001.jpg` …
`frame-072.jpg` (72 frames), scrubbed via `ScrollFrames` (`pinDistance="+=170%"`).
To replace the motion, swap the frames (keep the zero-padded names) — the
poster for reduced-motion is the first frame.

## Tokens

Scoped to `.tpl-design-07-smart` (never `:root`):

```
--color-primary: #101114    --color-accent: #e8a33d
--color-secondary: #7a93b5  --color-oak: #b08a5a
--color-background / --color-surface / --color-text / --color-muted / --color-hairline
--font-display: 'Space Grotesk'   --font-body: 'Inter'
```

The Customize panel rewrites these live.

## content.js

Plain object: brand, nav, hero, day (four phases with time/system/title/text),
features (four items + specs), plans (three residences with numeric ₹ prices),
visit, footer. Prices flow through `price()` from `useCustom()`.

## Deploy

The standalone export (`tools/export-template.mjs`) bundles this folder with
`../../_shared`; fonts load from Google Fonts (id `tpl-font-design-07-smart`).
