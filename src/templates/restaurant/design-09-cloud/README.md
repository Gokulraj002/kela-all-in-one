# Kela Kitchen · design-09-cloud — Cloud Kitchen

**Personality:** Fast · Bold · Thumb-first. App-density delivery-first
template on a paper ground with ink type and signal-orange accents.

**Run:** from `~/workspace/atelier` — `npm install`, then `npm run dev`.

## Structure

- `index.jsx` — the site: app-like nav (track-order link) → hero
  (steam-burst box, live-feel doorstep timer) → THE LINEUP (3 dispatch
  lanes) → how it works (3-step tracker + order film) → combos & deals
  → delivery zones → order CTA → functional footer.
- `meta.js` / `content.js` — template meta + all copy/data (₹ prices as
  numbers, rendered via `price()`; dish names via `productName(i, …)`).
- `styles.css` — all styling, tokens scoped on `.tpl-design-09-cloud`.
- `assets/` — `hero.jpg`, `dish-1.jpg` (biryani), `dish-2.jpg` (burger),
  `dish-3.jpg` (dessert), `detail.jpg`, `frames/` (72-frame order-film
  sequence, `frame-001.jpg` … `frame-072.jpg`, replaces the old mp4).

## Signature mechanic — M9 “Dispatch lanes”

Three lanes (Biryani / Burger / Dessert). Scrolling scrubs each lane:
cards translate `x` with a `sine.inOut` travel ease (slow start, fast
middle, settle at end), each card carries a mini progress bar
(kitchen → rider → door) that fills with its travel via a staggered
per-card journey function (lead card delivers first). Lane headers
count live `delivered` tallies. Reduced motion: static lanes, bars full.

## Scroll-driven order film

The old 6s mp4 is replaced by a scroll-driven frame sequence
(Apple-style): the film stays sticky in its grid column while scrolling
through the 3 steps scrubs the 72 frames on a `<canvas>`
(`StickyScrubFrames` in `index.jsx` — a non-pinning sibling of shared
`ScrollFrames`, since a full pin would stretch the 2-column grid).
The scrub range matches the step light-up tracker so the box fold →
steam burst → sticker slap sequence plays as the steps are read.
Reduced motion: static first frame. Mobile (< 768px): the film scrolls
with the flow (no sticky) and the scrub still works.

## Images / replacing

Drop new JPGs over the same filenames in `assets/`. Upload keys in the
platform: `hero`, `product-0`, `product-1`, `product-2`, `detail`.
Dish names/prices are customizable via `productName(i, fallback)` —
indexes 0–2 biryani lane, 3–5 burger lane, 6–8 dessert lane.

## Tokens (customizer rewrites these)

`--color-primary #141414` · `--color-secondary #5A5A56` ·
`--color-accent #FF5C1A` · `--color-background #F4F4F0` ·
`--color-surface #E8E8E2` · `--color-text #141414` ·
`--color-muted #8A8A84` · `--font-display 'Bricolage Grotesque'` ·
`--font-body 'Inter'`.

## Notes

- The order film is a scroll-scrubbed frame sequence
  (`assets/frames/frame-001.jpg` … `frame-072.jpg`); the mp4 was removed
  to cut media weight.
- The hero doorstep timer is a live-feel client-side countdown; it is
  decorative, not a real ETA feed.
