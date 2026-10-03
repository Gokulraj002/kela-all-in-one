# design-09-story — Kela Cafe

Coffee Storytelling: a parchment documentary narrative that follows one harvest
from the Western Ghats to the cup. Parchment / ink / forest / harvest-gold
palette; Cormorant Garamond + Instrument Sans.

## Personality
Lyrical · Documentary · Human. Reading is the conversion — chapter completion
leads to a newsletter epilogue.

## Run
From the atelier repo root: `npm install`, then `npm run dev`. The template is a
self-contained React component (`index.jsx` default export).

## Structure
- `index.jsx` — the website (nav, hero, pinned 5-chapter story, people, origin
  lots, glossary, newsletter epilogue, footer)
- `content.js` — all copy: chapters, process-diagram methods, farmers, lots
  (prices as ₹ numbers), glossary, contact
- `meta.js` — contract metadata
- `styles.css` — all styling, tokens scoped to `.tpl-design-09-story` (never `:root`)
- `assets/` — hero.jpg (farm dawn), menu-1.jpg (harvest hands), menu-2.jpg
  (drying beds), menu-3.jpg (roast), detail.jpg (cherry basket)

## Signature motion
`chapterPin` — one pinned ScrollTrigger on desktop (≥1024px): a scrubbed
timeline drives chapter text + pinned media crossfade; progress dots and a top
progress bar update via `onUpdate`. Mobile: pinning fully disabled, chapters
stack with steam-rise reveals. The Chapter Three process diagram (washed /
natural / honey) crossfades copy and tweens flavor bars on tab switch.

## Replacing images
Swap the five JPGs in `assets/` keeping the same filenames, or use the lab's
Upload panel (keys: `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`).

## Tokens
`--color-background #F2EBD8`, `--color-surface #E8DCC0`,
`--color-primary #211C13` (ink), `--color-secondary #4A5D3A` (forest),
`--color-accent #8A6D3B` (harvest gold), `--font-display` Cormorant Garamond,
`--font-body` Instrument Sans. The customizer rewrites these live.

## content.js
JSON-compatible: brand, nav, hero, chapters[5] (each with data callouts, pull
quote, caption, tint), processDiagram.methods[3], people.farmers[3],
lots.items[3] (price numbers rendered via `price()`), glossary.terms[5],
epilogue, contact, footer.

## Deploy
Exported as a standalone Vite app via the lab's export tooling; needs only
`react`, `gsap`. Fonts load from Google Fonts with `display=swap`.

## Chapter-synced product rail
The three origin lots ride the *same* pinned chapter timeline — each chapter tweens
the slim rail (docked at the bottom of the pinned viewport) to its lot
(`LOT_AT_CHAPTER = [0, 1, 1, 2, 2]`), and `onUpdate` highlights the active lot card.
No second pin, no new ScrollTrigger. Mobile / reduced-motion: the rail becomes a
native horizontal swipe row under the stacked chapters.

## Chapter-transition film
The "Origin drift" Interlude section is a scroll-scrubbed frame sequence
(`assets/frames/frame-001.jpg` … `frame-072.jpg`) via the shared
`<ScrollFrames>`: full-bleed canvas, pinned `+=170%` of scroll, frame 0
painted immediately as a poster. Reduced motion: static first frame, no pin.
