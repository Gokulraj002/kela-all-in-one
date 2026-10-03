# Kela Fashion — design-10-avant

Experimental avant-garde runway-theatrical website for **Kela Fashion**, a conceptual
fashion atelier in Mumbai. The gallery piece of the ATELIER fashion category: dark,
thesis-driven, commission-first. "Beautiful is boring."

## Personality

Daring · Theatrical · Uncompromising. Carbon ground, bone type, one acid-lime
synthetic note, and a single crimson thread stitched through the whole page.
Spectacle first, information second — the show is the page; the running order and
credits are the quiet infrastructure beneath it.

## Run

```bash
npm install
npm run dev
```

Standalone export is assembled by `tools/export-template.mjs` (copies this folder,
rewrites imports) — the template must stay self-contained.

## Structure

```
design-10-avant/
  index.jsx    — the website (default export React component)
  meta.js      — named export `meta` (platform registry)
  content.js   — named export `content` (all editable copy/data)
  styles.css   — ALL styling, tokens scoped to .tpl-design-10-avant
  assets/      — hero.jpg, look-1.jpg, look-2.jpg, look-3.jpg, detail.jpg,
                 frames/ (72 JPG frame sequence for the scroll-driven hero)
  README.md
```

### Sections

1. **Hero** (`#hero`) — "Wind Machine" scroll-driven frame sequence (72 JPGs,
   pinned `+=170%` scrub via shared `<ScrollFrames>`) as full-bleed background,
   cryptic Syne headline ("Beautiful is boring."), weftWipe entrance, single-source
   light-bar sweep. Reduced motion: static first frame, all overlay content visible.
2. **Manifesto** (`#story`) — three sharp fragments with acid-lime strikes, one 0.15s
   light flash on entry.
3. **The Stitched Collection** (`#collection`) — the **threadPath** signature mechanic:
   pinned (≥768px, `end: '+=350%'`, `scrub: 1`) stage where one crimson SVG thread
   draws through 5 look frames in order; a needle dot rides the path head via
   `getPointAtLength` in the scrub callback; each frame's border stitches in
   (SVG rect dash draw) and the look settles with a sharp `drapeSettle` as the head
   reaches it. Mobile / reduced-motion: static stacked frames, thread fully drawn.
4. **Running Order** (`#gallery`) — the 5 looks numbered like a show running order,
   fabric codes, ₹ prices via `price()`, per-look Enquire buttons.
5. **Process** (`#craft`) — material-experiment cards (click a material, read its
   story), deconstruction journal, detail macro with foldUnfold entrance.
6. **Private Viewings** (`#visit`) — commission steps (Consult → Toile → Fittings)
   and a restrained enquiry form ("Request a viewing").
7. **Footer** (`#contact`) — manifesto fragment, atelier contact, credits.

Nav: minimal avant-garde — fixed bar with overlay menu + "Request a viewing" CTA
always present.

## How to replace images

Drop new files into `assets/` keeping the names (`hero.jpg`, `look-1.jpg`,
`look-2.jpg`, `look-3.jpg`, `detail.jpg`), or use the platform
Customize/Upload panel — upload keys are `hero`, `product-0`, `product-1`,
`product-2`, `detail` (mapped in `index.jsx` via `<Img k=…>`). To change the
scroll-driven hero motion, replace the `assets/frames/frame-###.jpg` sequence
(ordered filenames; first frame paints immediately as the poster).

## Tokens

All on `.tpl-design-10-avant` (never `:root`):

- `--color-background` `#131313` · `--color-surface` `#1F1F1F`
- `--color-primary` / `--color-text` `#EDEAE2` (bone)
- `--color-accent` `#C6F135` (acid lime — alerts, strikes, CTA only)
- `--color-muted` `#7C7A72` · `--color-crimson` `#D61F3C` (the thread)
- `--font-display` `'Syne', sans-serif` · `--font-body` `'Space Mono', monospace`

The lab customizer rewrites these live.

## content.js

Plain object: `brand`, `nav`, `hero`, `manifesto` (fragments with `strike` words),
`collection.looks` (no/name/fabric/code/price/img/alt), `looks.rows`,
`process.materials` + `journal`, `viewing.steps` + `form`, `contact`, `footer`.
Prices are numbers in ₹ — rendered with `price()`, never hardcoded.

## Motion notes

- Two pinned ScrollTriggers: hero frame-sequence scrub (`+=170%`) and the
  threadPath (`+=350%`, pin-gated ≥768px via `gsap.matchMedia`); every
  ScrollTrigger passes `scroller: scroller()`.
- One rAF loop (needle-ring cursor, fine pointers only, pauses on `document.hidden`);
  hero ambient drift is a paused-when-offscreen GSAP yoyo.
- Reduced motion: no cursor, no flash, no pin — thread fully drawn,
  all frames visible in final state; hero shows a static first frame with all
  overlay copy visible.
- Theatrical blackout cuts (instant to black, 0.2s fade) — max two per page.

## Deploy

Built and QA'd as part of the ATELIER platform (`npm run build` at the repo root);
the standalone zip is produced by the platform exporter. No external JS beyond
react/gsap. Google Fonts (Syne + Space Mono) are injected at runtime with
`display=swap`.
