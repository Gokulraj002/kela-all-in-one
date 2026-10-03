# Kela Travels — design-04-heritage

Cultural heritage tours presented as a beautifully printed monograph.
Storied, rich, scholarly-warm: serif display, archival tones, era-based
storytelling. Fraunces + Spectral; terracotta `#B4552D`, sandstone
`#E4D3B3`, indigo `#232A4A`.

## Signature scroll mechanic — Excavation layers

The Journeys section (`#destinations`) is a pinned stratigraphic scroll on
desktop (≥768px, motion allowed). Four era plates — Living (surface),
Colonial, Medieval, Ancient (bedrock) — are stacked in visual depth. On
scrub, each stratum **peels back** via a `clip-path: inset()` wipe, revealing
the journey card beneath at a deeper scale step with a sepia grade that
eases to full color as it is revealed. A slim timeline spine on the side
fills as eras pass, with a live "Stratum I–IV" readout.

- Mobile (<768px): stacked era chapters in normal document flow, full color.
- `prefers-reduced-motion`: static stacked chapters, no pin, no peel.

## Sections

Crest nav → hero (still image, slow GSAP drift) → Excavation layers →
"Morning Rite" film interlude (mid-page, scroll-scrubbed frame sequence via
shared `ScrollFrames`, `assets/frames/frame-001.jpg` … `frame-072.jpg`,
pinned `+=170%` at `80svh`) → monograph Field Notes
journal → Scholar Guides → Plan Your Journey (visit + contact) →
correspondence band → footer. Tour stops: `data-tour` on hero,
destinations, gallery, story, craft, visit, contact.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-04-heritage/
  index.jsx    — default export component (nav/hero/strata/film/journal/guides/visit/contact/footer)
  meta.js      — named export `meta` (contract shape)
  content.js   — named export `content` (all copy, journeys, eras, guides)
  styles.css   — all styling; tokens scoped to .tpl-design-04-heritage
  assets/      — hero.jpg, dest-1.jpg, dest-2.jpg, dest-3.jpg, detail.jpg, frames/ (72 scroll-scrub frames)
  README.md
```

## Replacing images

Swap the files in `assets/` keeping the same filenames (same aspect
ratios recommended: hero 16:9-ish, dest 3:2, detail 4:3). Or use the lab's
Upload panel — the keys are `hero`, `product-0`, `product-1`,
`product-2`, `detail` (era strata map in order). The film poster is the
`hero` key.

## Tokens

All tokens live on `.tpl-design-04-heritage` in `styles.css` (no `:root`):
`--color-primary` `#232A4A`, `--color-accent` `#B4552D`,
`--color-background` `#EFE6D2`, `--color-surface` `#E4D3B3`,
`--color-deep` `#141832`, `--font-display` Fraunces, `--font-body`
Spectral. The lab customizer rewrites these live.

## content.js

Plain JSON-compatible object: brand/nav, hero, `eras.items` (numeral, name,
period, note, journey index), `journeys` (name, price in ₹, blurb,
duration, era, tag), film, journal entries, guides, visit facts/contact,
footer. Journey names/prices render through `useCustom`'s
`productName`/`price` so the customizer works.

## Deploy

The template is self-contained (imports only `react`, `gsap`,
`../../_shared`, local files) and ships with the ATELIER build. The
standalone exporter bundles the folder as-is; the mp4 loads via dynamic
import with a poster fallback, so the page is never broken without it.
