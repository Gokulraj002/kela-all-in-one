# Kela Hotels — design-01-palace

**Tag:** Palace Resort · **Fonts:** Cormorant Garamond (display) + Jost (body)
**Palette:** deep maroon-ink `#2A1A12` / antique gold `#C9A24B`

Regal cinematic maximalism — the grandest design in the hotel category.
Ceremonial symmetry, a crest-monogram nav, and a pinned suite theatre where
each suite is revealed by a theatrical double-curtain clip-path wipe.

## Run

```bash
npm install
npm run dev      # open the ATELIER viewer, pick Hotel → Kela Hotels
```

## Structure

```
design-01-palace/
  index.jsx    — component (nav, hero, booking bar, legend, curtain suites,
                 dining, experiences, weddings, testimonials, visit, footer)
  meta.js      — `meta` export (contract shape)
  content.js   — all copy, 4 suite rates (₹/night), dining, contact
  styles.css   — tokens on .tpl-design-01-palace only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/ (72 scroll-driven hero frames, frame-001…frame-072.jpg)
  README.md
```

## Motion

- Hero: façade slow scale 1.08→1 over 2.5s + gold rule draw + masked word-rise.
- Signature (§3.01 "Grand curtain reveal"): pinned section on ≥768px
  (gsap.matchMedia, resize-safe), scrubbed double-curtain clip-path wipe
  (top `inset(0 0 50% 0)→inset(0 0 100% 0)`, bottom `inset(50% 0 0 0)→inset(100% 0 0 0)`),
  suite name word-rise beneath. Mobile / reduced-motion: stacked static cards.
- Light-first reveals (opacity + y 28, 1.1s), gold rule draws, curtain-wipe frames.

## Replace images

Swap files in `assets/` keeping the same names, or use the lab's Upload
panel — image keys: `hero`, `product-0…3` (suites), `detail`.
Regenerate the hero frames with the media tool to `VIDEO_PLAN.md` §01 if reshooting.

## Tokens (customizer)

`--color-primary`, `--color-accent`, `--color-background`, `--color-surface`,
`--color-text`, `--color-muted`, `--font-display`, `--font-body`.

## Content

Edit `content.js` — brand, nav, hero, booking note, legend beats, suite names /
prices / sizes, dining, experiences, weddings, testimonials, visit, footer.

## Deploy

Built by the platform exporter as a standalone Vite app (`index.jsx` imports
only react, gsap, `../../_shared`, and local files — no platform imports).
