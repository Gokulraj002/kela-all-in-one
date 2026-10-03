# Kela Studio — design-01-portfolio

Portfolio-first creative agency site. The most commercially direct design in the
agency set: the latest case is the hero, the work index is the centerpiece, and
every claim carries a number. Paper `#F7F5F0`, ink `#16130E`, signal red `#E03E2D`;
Archivo (expanded, 700–900) for headlines, Inter for everything functional.

## Personality

Confident · Direct · Commercial. Motion is decisive and typographic: headlines
rise through word masks, the latest-case frame hard-wipes open, outcome numerals
count up, and the signature **M1 scroll-driven work index** pins a two-column
stage — the case list scrolls on the left while the preview image crossfades on
the right, driven by whichever row crosses the center line. Filter chips toggle
with 0.25s red fills; hover draws a red underline under case titles.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template renders inside the ATELIER viewer (wrapped in `.tpl-scope`). For a
standalone check, import the component directly in a scratch Vite page with the
`_shared` folder alongside `src/templates`.

## Structure

```
design-01-portfolio/
  index.jsx    — default export; nav, hero, M1 work index, capabilities, clients, studio, contact, footer
  meta.js      — contract-shaped meta
  content.js   — brand, nav, hero, 12 cases, filters, capabilities, clients, studio, contact, footer
  styles.css   — tokens on .tpl-design-01-portfolio; every rule scoped
  README.md
  assets/      — hero.jpg, work-1.jpg, work-2.jpg, work-3.jpg, detail.jpg, frames/ (72 JPGs)
```

Interactive bits: discipline filter (All / Identity / Campaign / Digital / Art
Direction) that rebuilds the index; pinned M1 index with center-line active-row
tracking and crossfading preview (≥1024px), stacked cards below; count-up
outcome numerals; budget-band inquiry form that composes a `mailto:` with the
brief pre-filled (never a dead form). Reduced motion renders a static case grid,
poster-only hero, and final numeral values.

## Replace images

Drop new files over `assets/hero.jpg`, `work-1.jpg`, `work-2.jpg`,
`work-3.jpg`, `detail.jpg` — or use the lab's Upload panel, which maps to keys
`hero`, `work-1`, `work-2`, `work-3`, `detail`. Keep the daylight studio grade
(paper whites, ink blacks, signal-red accents in the work itself) so the
palette stays coherent. The hero is a scroll-driven frame sequence — 72 JPGs
in `assets/frames/` (the 10s pin-up dolly, scrubbed as you scroll); `hero.jpg`
remains as a general still for the `hero` image key.

## Tokens

On `.tpl-design-01-portfolio`: `--color-background #F7F5F0`,
`--color-surface #ECE8DE`, `--color-primary #16130E`,
`--color-secondary #5C5546`, `--color-accent #E03E2D`,
`--color-text #1C1812`, `--color-muted #8B8474`,
`--font-display 'Archivo'`, `--font-body 'Inter'`. The customizer rewrites
these live.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero` (latest case + outcome
numeral + meta), `work`, `filters`, `cases` (12 × client/title/sector/year/
discipline/scope/budget/outcome/imgKey), `capabilities` (5 with proof lines),
`clients`, `studio` (facts), `contact` (email, phone, addresses, project types,
budget bands), `footer`. Brand, contact email and all images flow through
`useCustom()` so overrides apply.

## Deploy

Exported as a standalone Vite template via the lab's exporter (see
`tools/export-template.mjs`). Fonts load from Google Fonts at runtime with
`display=swap`.
