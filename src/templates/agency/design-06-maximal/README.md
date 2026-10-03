# Kela Studio — design-06-maximal

A bold maximalist collective site: controlled chaos, every layer placed.
Hot paper `#F2EDE0` ground, black `#141210` type, acid yellow `#D8E03C`
stickers — with magenta `#E02E8A` used on exactly three elements.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-06-maximal/
  index.jsx   — the site (default export)
  meta.js     — named export `meta`
  content.js  — named export `content` (all copy/data)
  styles.css  — all styles, scoped to .tpl-design-06-maximal
  assets/     — hero.jpg, work-1..3.jpg, detail.jpg, frames/ (72 scroll-sequence JPGs)
  README.md
```

## Motion (M6 — collage avalanche)

- **Hero:** collage pieces pop in with `back.out(1.4)` (the single allowed
  overshoot), rotation settling to ±4deg.
- **Hero wall:** the wheatpaste wall plays frame-by-frame while the hero is
  pinned (+=170% scroll); the headline rides on a pasted paper sheet.
- **Work wall:** tall collage field; a scrubbed timeline tumbles each poster
  in with its own rotation (±4deg), scale 0.9→1, x-drift, `expo.out`,
  staggered by scroll position (not time).
- **Velocity kick:** one rAF loop reads ScrollTrigger velocity and adds a
  capped (±8deg) temporary rotation to avalanche layers + hero stickers;
  decays to rest. Paused offscreen and on `document.hidden`.
- **Crew marquee:** constant 40px/s, decorative, duration set from measured
  track width.
- **Stickers:** wiggle on hover (rotation ±2, 0.3s).
- **Reduced motion:** everything renders in its final static state —
  no scrub, no kick, no marquee animation.

## Replacing images

Drop new files into `assets/` with the same names, or use the lab's
Upload panel — image keys are `hero`, `work-1`, `work-2`, `work-3`, `detail`.
The hero is a scroll-driven frame sequence: `assets/frames/frame-001.jpg` …
`frame-072.jpg`, scrubbed by the pinned hero (`+=170%` of scroll;
reduced-motion shows a static frame). The taped collage frame in the hero
shows the static `hero` poster.

## Tokens

All on `.tpl-design-06-maximal` — never `:root`:

`--color-background` `#F2EDE0` · `--color-surface` `#E4DCC6` ·
`--color-primary` `#141210` · `--color-secondary` `#4A4438` ·
`--color-accent` `#D8E03C` · `--color-text` `#141210` ·
`--color-muted` `#7A7263` · `--font-display` Syne · `--font-body` Work Sans.

Magenta `#E02E8A` appears on exactly 3 elements: the hero "100% LOUD"
sticker, one avalanche poster backing, and the contact CTA.

## Deploy

Standalone export via `tools/export-template.mjs design-06-maximal`
builds the folder as its own Vite app.
