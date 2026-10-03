# Kela Studio — design-05-swiss

Minimal Swiss studio site. Discipline as luxury: the 12-column grid is visible
and load-bearing; rules draw, content snaps in with hard rectangular clip
wipes. International orange appears on index numbers and the active row only.

## Personality

Quiet, exact, restrained. One line, one image, eight numbered projects, two
columns of capabilities with no adjectives, studio facts with no story, three
journal notes, and a contact block. The email link is the call to action —
there is no button.

## Run

From the atelier root:

```bash
npm install
npm run dev
```

The template also ships as a standalone export (`tools/export-template.mjs`);
the folder is self-contained: `index.jsx` imports only `react`, `gsap`,
`gsap/ScrollTrigger`, `../../_shared`, and local files.

## Structure

```
design-05-swiss/
  index.jsx      — the site (nav, hero, index, capabilities, studio, journal, contact, footer)
  meta.js        — library metadata (id, palette, fonts, features)
  content.js     — all copy: brand, 8 projects, capabilities, facts, journal, contact
  styles.css     — all styles, scoped to .tpl-design-05-swiss
  assets/        — hero.jpg, work-1..3.jpg, detail.jpg, frames/ (72 JPG scrub frames)
  README.md
```

## Motion (M5 — grid-line reveal system)

- Page load: the 12 hairline grid rules draw top→bottom, staggered by column.
- Then the hero headline and the hero cut sequence snap in with hard rectangular
  clip wipes (`power2.out`, ≤ 0.7s).
- Scroll: section rules draw left→right; content blocks hard-wipe in;
  index rows count their number in, draw their rule, and slide the title 12px.
- Hover: index rows invert black↔white in 0.15s. No other motion exists.
- `prefers-reduced-motion`: everything renders static and final. Initial
  states are set by GSAP, never by CSS, so nothing is ever hidden.

Every ScrollTrigger uses `scroller()` from `useTplScope()` so reveals work
inside the ATELIER viewer's scroll container.

## Replacing images

Swap the files in `assets/` (same names), or use the lab's Upload panel —
the template reads images through `useCustom().img(key, fallback)`:

| key      | used for            |
|----------|---------------------|
| `work-1` | projects 01, 05     |
| `work-2` | projects 02, 06     |
| `work-3` | projects 03, 07     |
| `detail` | projects 04, 08     |

The hero cut is a scroll-driven frame sequence: `assets/frames/frame-001.jpg`
… `frame-072.jpg` (72 frames extracted from the 10s trimmer-cut clip),
scrubbed by `ScrollFrames` with `pinDistance="+=170%"`. `hero.jpg` is kept as
the fallback poster asset.

## Tokens

Scoped to `.tpl-design-05-swiss` (never `:root`):

| token | value | role |
|---|---|---|
| `--color-background` | `#FFFFFF` | ground |
| `--color-surface` | `#F4F4F2` | image wells |
| `--color-primary` | `#111111` | type, rules |
| `--color-secondary` | `#555555` | labels |
| `--color-accent` | `#FF4D00` | index numbers, active row only |
| `--color-text` | `#111111` | body |
| `--color-muted` | `#8A8A8A` | captions |
| `--color-rule` | `#E2E2E2` | grid hairlines |
| `--font-display` | IBM Plex Sans | headlines |
| `--font-body` | IBM Plex Mono | data, labels, captions |

The lab's Customize panel rewrites these live.

## content.js

JSON-compatible object: `brand`, `nav`, `hero`, `work.projects[8]`
(`n`/`client`/`year`/`discipline`/`img`/`alt`), `capabilities.columns[2]`,
`studio.facts`, `journal.notes[3]`, `contact` (address/email/hours/phone),
`footer`.

## Deploy

The standalone export (`npm run export` tooling) copies this folder plus
`src/templates/_shared` into a Vite app; the Google Fonts link
(`#tpl-font-design-05-swiss`) is injected at runtime by `index.jsx`.
