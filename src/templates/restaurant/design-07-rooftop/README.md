# Kela Kitchen — design-07-rooftop · Rooftop Lounge

**Personality:** Glamorous · Golden · Elevated. A rooftop lounge at golden
hour — cocktails lead, small plates support, and the city performs nightly.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # the platform viewer mounts this template in the lab
```

The template is self-contained per `REACT_TEMPLATE_CONTRACT.md` — it is
rendered by the ATELIER viewer and exported standalone via
`tools/export-template.mjs`.

## Structure

```
design-07-rooftop/
  index.jsx    — the site (nav, hero scroll-frames, golden-hour band, sips & plates,
                 the view, private skies, reserve form, footer)
  meta.js      — registry metadata (contract shape)
  content.js   — all copy, cocktail specs, plate data, prices (₹ numbers)
  styles.css   — ALL styling; tokens scoped to .tpl-design-07-rooftop
  assets/      — hero.jpg, dish-1/2/3.jpg, detail.jpg, frames/ (72 scroll frames)
```

## Replace images

Drop JPGs over the files in `assets/` (same names), or use the lab's Upload
panel — keys are `product-0`, `product-1`, `product-2`, `detail`.
(`hero` stills are superseded by `assets/frames/` — the scroll-driven sequence;
drop `frame-001.jpg` … `frame-072.jpg` over those to re-skin the hero motion.)

## Tokens (scoped)

`--color-background #14161E` · `--color-surface #1E212C` ·
`--color-primary #EFE4CE` · `--color-secondary #7A7F94` ·
`--color-accent #D9A05E` (champagne, 10%) · `--color-text #E8DFCB` ·
`--color-muted #8B8FA3` · `--color-on-accent #14161E` (text on champagne) ·
`--color-shadow #000000` (soft shadows) · `--font-display 'Italiana'` · `--font-body 'Jost'`.

The lab customizer rewrites these live; brand, currency, contact, product
names and prices all flow through `useCustom()` — nothing is hardcoded.

## Signature mechanic (M7 — "Focus-pull ascent")

Every cocktail and plate card rises from below a horizon line as you scroll:
`y: 120 → 0`, `blur(8px) → blur(0)`, `scale: 1.04 → 1`, scrubbed per card via
individual ScrollTriggers — like a camera finding focus as the city rises.
Gentler on touch (60px / 4px). `prefers-reduced-motion`: sharp and still.

## Deploy

Exported standalone by the platform (see `REACT_TEMPLATE_CONTRACT.md` §export).
The hero is a scroll-driven frame sequence (`assets/frames/frame-001.jpg` …
`frame-072.jpg`, pinned `+=170%` via the shared `ScrollFrames` component) —
no video file, first frame paints immediately like a poster, and
`prefers-reduced-motion` gets the static first frame with no pin.
