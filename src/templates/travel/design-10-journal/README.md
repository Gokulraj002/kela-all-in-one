# Kela Travels — design-10-journal

An experimental cinematic travel journal. A photographer's field journal come
alive: film-stock grain, mono-spaced annotations, frame counters, light leaks.
Avant-garde but legible — Fraunces italics over Space Mono field notes, on
film black / cream / amber.

## Signature mechanic — Film-strip rewind

The Expeditions section is a vertical film strip: frames with real
sprocket-hole edges (CSS radial-gradient), each frame a destination with a
mono-spaced annotation (`FRAME 014 — SPITI, 04:12, f/8`).

- The viewport pins on scroll (scrub-driven). Scrolling **down** advances the
  strip; scrolling **up** rewinds it — the HUD names the direction
  (`ADVANCE ▸` / `◂ REWIND`) via `ScrollTrigger.onUpdate`'s direction.
- A frame counter ticks with scrub progress; the active frame stays full
  opacity while the rest dim to 35%.
- Every chapter crossing fires **exactly one** amber light-leak flash
  (a `yoyo` opacity pulse guarded by a `lastChapter` ref — never repeated).
- Reduced-motion renders a static stacked reel with a final-state counter;
  mobile gets the same pinned mechanic in a narrower strip.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # open the ATELIER viewer, pick Travel → Kela Travels
npm run build      # full app build (must stay clean)
npx oxlint src/templates/travel/design-10-journal
```

## Structure

```
design-10-journal/
  index.jsx    — default export; nav, hero, film-strip expeditions,
                 process, photographer, contact, footer
  meta.js      — `export const meta` (contract shape)
  content.js   — all copy/data; 5 expeditions {name, price, blurb,
                 duration, tag, frame, exif, chapter}
  styles.css   — all styling; tokens on `.tpl-design-10-journal` only
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/frame-001..072.jpg
  README.md
```

## Replacing images

Drop new files over `assets/hero.jpg`, `dest-1.jpg`, `dest-2.jpg`,
`dest-3.jpg`, `detail.jpg` (keep names + JPG), or use the lab's Upload panel —
upload keys are `hero`, `product-0`, `product-1`, `product-2`, `detail`
(`img(key, fallback)` in `index.jsx`). The hero signature is a scroll-driven
frame sequence (`assets/frames/frame-001..072.jpg`), scrubbed by scroll via
the shared `ScrollFrames` component instead of an autoplaying video file.

## Tokens

```css
.tpl-design-10-journal {
  --color-primary: #0e0d0b;   /* film black */
  --color-accent: #e08a3c;    /* amber */
  --color-text: #f1ead8;      /* cream */
  --font-display: 'Fraunces', serif;
  --font-body: 'Space Mono', monospace;
}
```

Every color/font in `styles.css` comes from these vars (customizer-safe).
Never write to `:root`. Fonts load once via a `<link>` injected in
`useEffect` (`tpl-font-design-10-journal`).

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero` (eyebrow/title/sub/ctas/
corner annotations), `expeditions` (chapters + 5 items with `frame` numbers
`004/009/014/019/024` and `exif` strings), `craft` steps, `story`
(photographer bio/stats/quote), `contact`, `footer`. Prices are ₹ numbers;
`price()` formats them. No emojis, no lorem.

## Motion notes

- GSAP + ScrollTrigger in `useLayoutEffect` with `gsap.context` + `revert()`.
- **Every** ScrollTrigger gets `scroller: scroller()` (the platform scrolls
  inside `.tpl-scope`, not `window`).
- `useReducedMotion()` → static layouts only, no pins.
- Hero gets the single parallax allowance (`.fj-hero-drift`).

## Deploy

Standalone export via `tools/export-template.mjs` copies this folder plus
`../../_shared` — no platform imports, so the zip builds clean on its own.
