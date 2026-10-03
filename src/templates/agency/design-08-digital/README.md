# design-08-digital — Kela Studio

Digital product agency site. Systems thinking, metrics outrank adjectives.
A sharp, spec-sheet aesthetic for founders, CTOs, and VCs who hire systems, not vibes.

**Palette:** off-white `#F6F7F8` · graphite `#101418` · electric blue `#1F5CFF` (60/30/10)
**Type:** Sora (600–800, headlines + metric numerals, tabular) + Inter (UI, specs, body)
**Mood:** Systematic · Sharp · Accountable

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # open the lab, pick Agency → Kela Studio
```

Standalone export is assembled by `tools/export-template.mjs` (copies this folder
+ `src/templates/_shared` into a self-contained Vite app).

## Structure

```
design-08-digital/
  index.jsx      — component: nav, hero (UI montage + metric band), outcomes,
                   M8 case accordion rail, capabilities, sprints, testimonials,
                   audit booking form, footer
  meta.js        — lab listing metadata (id, palette, features…)
  content.js     — ALL copy: brand, nav, hero, 6 cases, metrics, capabilities,
                   sprints, testimonials, contact
  styles.css     — all styles, scoped to .tpl-design-08-digital
  assets/
    hero.jpg     — device lineup with product UI (also the public thumb)
    frames/      — 72 JPG frames of "The build": stylus wireframes → device
                   lineup lights up, scrubbed by scroll (ScrollFrames)
    work-1.jpg   — app screens · Meridian Bank / Axis
    work-2.jpg   — dashboard close-up · Freightline
    work-3.jpg   — design system components · Bloom
    detail.jpg   — stylus wireframing macro · Cadence
```

## Motion (M8 — spec-sheet accordion rail)

- Hero: masked word-rise headline, hard-wipe video frame, metric band **countUp on load**.
- Case studies render as full-width spec-sheet rows. The row crossing the active
  viewport band expands (0.55s height tween) revealing metrics, which count up;
  a sticky side rail shows the giant index number crossfading per row; inactive
  rows compress to one headline line. Rows are also click-togglable.
- Capability grid cells draw their borders on scroll (`lineDraw`-style).
- Everything runs in one `useLayoutEffect` / `gsap.context` with `revert()`
  cleanup; `scroller: scroller()` on every ScrollTrigger.
- **Reduced motion:** all rows expanded statically, metrics at final values,
  no scrub/pin, video replaced by poster.

## Replacing images

Swap files in `assets/` keeping the same names, or use the lab's Upload panel
(image keys: `hero`, `work-1`, `work-2`, `work-3`, `detail`). No legible UI text
in replacement imagery — keep screens abstract.

## Tokens

Scoped to `.tpl-design-08-digital`: `--color-background --color-surface
--color-primary --color-secondary --color-accent --color-text --color-muted
--color-border --font-display --font-body`. The lab customizer rewrites these live.

## Deploy

Build via the lab exporter or `vite build` on the standalone export; serve `dist/`.
No server code, no env vars — the audit form composes a `mailto:` with the brief
pre-filled (never a dead form).
