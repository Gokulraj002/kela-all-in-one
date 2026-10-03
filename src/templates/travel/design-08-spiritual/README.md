# Kela Travels — design-08-spiritual

**Tag:** Spiritual · **Num:** 08

## Design personality

Kela Travels is a pilgrimage-journey site for sacred India — temple-town calm,
reverent and unhurried. Nothing here is commercial-feeling: the design itself
is meant to lower the heart rate. Centered, contemplative layouts; extreme
whitespace; Cormorant Garamond italics whispering over Newsreader body copy.

**Palette** — marigold `#D99A2B`, ivory `#F7F2E8`, maroon-black `#2A1E1E`.
Dark sections (hero, yatras, contact) alternate with ivory ones (practice,
stays) like night and dawn.

## Signature mechanic — the Mandala orbit

The Yatras section pins a circular stage on desktop (≥768px). Five journey
cards ride a ring around a slowly turning mandala SVG (one revolution ≈ 3
minutes). Scroll-scrub rotates the ring 540°; the card nearest the **top**
position scales 1→1.16 and brightens while the others dim, and a fixed
caption below names the focused journey with its blurb, duration and price.
Scrubbing back reverses the orbit. Mobile and `prefers-reduced-motion` get a
quiet vertical stack with the mandala as a header motif — no pin, no scrub.

## Signature video — "A Thousand Flames"

`assets/frames/` — 72 JPG stills (640px wide) extracted from the original 10s
hero clip, scrubbed frame-by-frame on scroll through the shared
`<ScrollFrames>` (pinned `+=170%`, reduced-motion → first frame as a static
image). Rows of oil lamps on a riverside ghat at dusk (frames 1–22), a slow
push-in through the flames with mist off dark water (23–51), settling on one
huge steady flame (52–72).

## Run

```bash
npm install
npm run dev      # open the ATELIER viewer and pick 08 · Kela Travels
npm run build    # full app build (must stay green)
```

## Structure

```
design-08-spiritual/
  index.jsx    — the site; OrbitStage holds the pinned ring mechanic
  meta.js      — template metadata (contract shape)
  content.js   — all copy: brand, nav, hero, 5 yatras, practice, stays, contact
  styles.css   — all styling; tokens scoped to .tpl-design-08-spiritual
  assets/      — hero.jpg, dest-1.jpg, dest-2.jpg, dest-3.jpg, detail.jpg, frames/
  README.md
```

## Replacing images

Swap any file in `assets/` keeping the filename, or use the lab's Upload
panel — keys are `hero`, `product-0…product-4` (the five yatras), `detail`.
Recommended: photorealistic, no text/watermarks/faces, graded toward
marigold flame / ivory mist / deep maroon-black shadow.

## Tokens

On `.tpl-design-08-spiritual`: `--color-primary`, `--color-primary-deep`,
`--color-secondary`, `--color-accent`, `--color-accent-soft`,
`--color-background`, `--color-surface`, `--color-text`,
`--color-text-ivory`, `--color-muted`, `--color-muted-dark`,
`--color-hairline`, `--color-hairline-soft`, `--color-card`,
`--font-display`, `--font-body`. The customizer rewrites these live; no
`:root` is touched and no hex appears outside the token block.

## content.js

Plain JSON-compatible object. Yatras are `yatras.journeys[]` with
`{ name, tag, duration, price (₹ number), blurb }` — names/prices render
through `productName(i, …)` / `price(n)` so Customize works. `stays.places[]`
use `productName(10+i, …)`. Contact falls back to `content.contact` when the
platform provides no overrides.

## Deploy

Standalone export via `tools/export-template.mjs` (see
`REACT_TEMPLATE_CONTRACT.md`); the hero is a scroll-driven frame sequence,
so there is no video file to bundle.
