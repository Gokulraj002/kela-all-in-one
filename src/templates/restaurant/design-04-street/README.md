# Kela Kitchen — design-04-street (Street Food)

Loud poster-style street food for the ATELIER library. Paper/ink/chili
palette, Anton + Work Sans, dense sticker-covered poster grid, maximum crave.

## Personality
Loud · Fast · Craveable. Kinetic headline slam (0.6s), sticky order pill that
pops with `back.out(2)`, and the signature **M4 "Direction-slam cards"**
mechanic: crave-cards slam in from the side you are scrolling toward —
scrolling down they enter from the right with overshoot (`x: 140 → 0`,
`back.out(1.4)`, 0.55s); scrolling up they come from the left. Direction is
tracked live via `ScrollTrigger` `onUpdate` (`self.direction`). Spice meters
fill as their card lands. Reduced motion: cards render static, meters lit.

## Run
From `~/workspace/atelier`: `npm install`, `npm run dev`. The design previews
inside the ATELIER viewer; standalone export via `tools/export-template.mjs`.

## Structure
- `index.jsx` — default export React component (sections: nav → hero →
  cravings wall → legends → locations → order → footer)
- `meta.js` — `export const meta = {...}`
- `content.js` — brand, nav, hero, 6 cravings (5 dish cards + 1 combo band),
  3 legends, 3 cart locations, order combos/steps, visit, footer
- `styles.css` — all styling, tokens scoped to `.tpl-design-04-street`
- `assets/` — `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`,
  `detail.jpg`, `frames/` (72 scroll-scrub hero frames)

## Hero: scroll-driven frames
The hero no longer autoplays a video file. `assets/frames/frame-001.jpg` …
`frame-072.jpg` (dosa batter hitting a screaming-hot tawa, steam exploding)
are scrubbed frame-by-frame as the visitor scrolls via the shared
`ScrollFrames` component (`pinDistance="+=170%"`, Apple-style). Reduced
motion: no pin, static first frame. This cut ~7.4MB of media weight.

## Replacing images
Upload keys: `hero`, `product-0` (dish-1), `product-1` (dish-2),
`product-2` (dish-3), `detail`. In the lab, Upload maps these keys; dish
names come from `productName(i, fallback)` (indices 0–4 match the first five
craving cards).

## Tokens
`--color-background #F4ECDC` · `--color-surface #E9DCC2` ·
`--color-primary #17130E` · `--color-secondary #4A4238` ·
`--color-accent #C1272D` · `--font-display Anton` · `--font-body Work Sans`.

## Content & deploy
Edit `content.js` (plain JSON-compatible). Prices in ₹ numbers rendered via
`price()`. Standalone build: `vite build` the exported template — no platform
imports, no `:root` writes.
