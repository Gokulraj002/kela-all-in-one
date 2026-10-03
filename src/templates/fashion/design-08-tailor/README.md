# Kela Fashion — Bespoke Tailoring (design-08-tailor)

Menswear tailoring, precise and sartorial. A bespoke menswear house site
built like a fitting book: chalk-ecru ground, ink-charcoal ink,
oxblood reserved for chalk-mark motifs and the booking CTA.

## Personality

Precision as luxury. Measurements, cloth specs and appointment slots
outrank lifestyle imagery. The tape measure is a design motif, not
decoration — the signature scroll mechanic is a **tapeRail**: a pinned
measurement-tape rail unrolls on scrub (≥768px), activating five stage
cards (Measure → Cut → Stitch → Press → Fit) as its leading edge passes
each marker, with a live centimetre readout.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # template mounts in the ATELIER viewer
```

Standalone export: `node tools/export-template.mjs design-08-tailor`
(assembles a self-contained Vite project from this folder).

## Structure

```
design-08-tailor/
  index.jsx    — default export; Nav, Hero, TapeRail, Wardrobe,
                 ClothLibrary, Fittings, CraftFilm, Appointments, Footer
  meta.js      — template metadata (contract shape)
  content.js   — all editable copy, prices, cloth data, slots
  styles.css   — all styling; tokens on .tpl-design-08-tailor only
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg,
                 detail.jpg, frames/ (72 JPGs for the scroll-driven craft film)
  README.md
```

## Replacing images

Drop new files over the names in `assets/` (keep the same filenames), or
use the lab's Upload panel — upload keys are `hero`, `product-0`,
`product-1`, `product-2`, `detail`. The craft film is a scroll-driven frame
sequence at `assets/frames/frame-001.jpg` … `frame-072.jpg` (plays via
`ScrollFrames`, scrubbed by scroll, with a static first frame for
reduced-motion).

Image map: `hero` → tailor chalking a bandhgala · look-1 (`product-0`) →
charcoal bandhgala portrait · look-2 (`product-1`) → cloth library rolls ·
look-3 (`product-2`) → sherwani macro · `detail` → needle/thread/chalk
macro (bespoke-suit card + craft-film poster).

## Tokens

On `.tpl-design-08-tailor` (the customizer rewrites these live):

| Token | Value | Role |
|---|---|---|
| `--color-background` | `#F1EEE6` | chalk-ecru ground |
| `--color-surface` | `#E3DDCE` | fitting-book panels, cloth cards |
| `--color-primary` | `#23211C` | ink-charcoal headlines, nav |
| `--color-accent` | `#7A2A26` | oxblood — chalk marks, booking CTA |
| `--color-text` | `#23211C` | body copy |
| `--color-muted` | `#857D6C` | measurements, cloth specs |
| `--font-display` | Spectral | headlines, the voice of the cutting table |
| `--font-body` | IBM Plex Sans | specs, tables, booking UI |

## content.js

Plain object: `brand`, `nav`, `hero`, `process.stages[5]`,
`wardrobe.items[3]` (prices in ₹ numbers, rendered via `price()`),
`cloths.items[6]` (mill / GSM / composition / price per metre),
`fittings.visits[3]`, `film`, `booking` (modes, slots), `testimonials`,
`contact`, `footer`.

## Motion notes

- GSAP + ScrollTrigger in `useLayoutEffect`, `gsap.context` + `revert()`.
- Every ScrollTrigger passes `scroller: scroller()` (platform scrolls in
  `.tpl-scope`).
- tapeRail: single scrubbed trigger (`end: '+=320%'`, `pin`, `scrub: 1`)
  gated by `gsap.matchMedia('(min-width: 768px)')`. Tape unroll, stage
  thresholds `(i+1)/5`, and the cm readout all derive from the same
  progress value — no multi-trigger sync. Mobile / reduced-motion: tape
  fully unrolled, all stages visible and active, readout shows final cm.
- `useReducedMotion()` respected everywhere; video renders poster-only.

## Deploy

Ship via the ATELIER exporter (see Run above); the output is a static
Vite build — host on any static host.
