# Kela Estates — design-04-plots (ATELIER · Real Estate)

Brand: name, domain and Instagram handle come from `src/templates/_shared/brand.js` (`brandFor('realestate')`) via `content.js`.

Land-story-led plotted-development website. Parchment and earth tones, survey-map
motifs, plot-number ticks — the romance of ground, told like a surveyor's journal.

## Design personality

- **Palette:** parchment `#EFE6D4` / forest `#2E4A34` / earth `#8A6D4B` / ink `#211C13`
- **Type:** Fraunces (display) + Instrument Sans (body), injected once via
  `#tpl-font-design-04-plots`
- **Mood:** rooted, generous, legacy — hairline rules, corner-ticked cards, a compass
  rose and scale bar on the masterplan

## Signature scroll mechanic — masterplan map zoom

The pinned survey map zooms in three stages (estate → sector → plot) via a scrubbed
scale + translate tween on the SVG group:

1. **I · The Estate** — full 68-acre plan, no highlight
2. **II · The Sector** — pans across Northgate Meadows → Lakeview Rows → Boulevard
   Greens; each featured plot pulses (`.is-active`) as the detail card updates
   (plot no., dimensions, facing, area, price)
3. **III · The Plot** — deep zoom onto Meadow Quarter plot M-21

A minimap (bottom-right of the map) shows the current viewport as a zooming
rectangle, computed from the same tween state. Pins gate at ≥768px via
`gsap.matchMedia`; below that (and under `prefers-reduced-motion`) the map renders
full-extent with a static plot list — everything visible, nothing pinned.

## Signature video — "The grid from above" (interlude)

`assets/frames/frame-001.jpg`…`frame-072.jpg` (72 frames, 640px wide, extracted
from the original 10s 1280×720 clip): high aerial drift over the plotted
grid at golden hour → descent along the main boulevard → settle over the lake
edge. Placed as a **full-bleed mid-page interlude** section (not the hero),
played frame-by-frame by scroll via shared `<ScrollFrames>` pinned with a short
`+=120%` pinDistance, so the flyover reads as a cinematic beat within the page
flow. Reduced-motion renders the first frame statically.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-04-plots/
  index.jsx    — component (nav → hero → the land → interlude film →
                 masterplan → collections → why land → enquire footer)
  meta.js      — template metadata
  content.js   — all editable copy, plot data, prices (numbers in ₹)
  styles.css   — tokens on .tpl-design-04-plots only
  assets/      — hero.jpg, listing-1..3.jpg, detail.jpg, frames/ (72 scrub frames)
  README.md
```

## Replacing images

Keep the same filenames and Img keys (`hero`, `product-0`…`product-2`, `detail`).
Custom uploads through the lab override these keys automatically via `img()`.

## Tokens

All colors/fonts are CSS vars on `.tpl-design-04-plots`; the customizer rewrites
`--color-primary` / `--color-accent` live. Every color in the file uses `var()`.

## content.js

Prices are plain numbers in ₹ (rendered through `price()`); plot data also feeds
the scrubbed detail card, so keep `masterplan.plots` in highlight order.

## Deploy

Standalone export via `tools/export-template.mjs` — the template imports only
`react`, `gsap`, `gsap/ScrollTrigger`, `./content.js`, `./styles.css`,
`./assets/*` and `../../_shared/*`.
