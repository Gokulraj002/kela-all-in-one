# Kela Travels — design-09-rail

**Rail & Cruise · Pullman-era romance, timetable precision.** A slow-travel
romance in Pullman green (#22392C), brass (#B08A3C) and cream (#F4EDDE) —
like a beautifully kept 1930s poster that moves. DM Serif Display headlines,
Inter body, and every section spaced with timetable precision.

## Signature mechanic — the window journey

The journeys section pins a brass-mullioned train window in the viewport
while the landscape scrolls horizontally past it on scrub, like looking out
of a moving carriage:

- **Destination cards** (4, from `content.js`) travel at 1x scroll speed.
- **Scenery layer** (SVG line-art mountains, gradient hills, brass sun disc)
  travels at **0.4x** — the parallax sells the journey.
- A **milepost counter** ticks 000 → 480 with scroll progress.
- **Speed lines** fade in with scroll velocity — fast scrolling blurs the view.
- Desktop (≥768px): pinned via `gsap.matchMedia`, resize-safe.
- Mobile: the same cards become a horizontal snap-swipe (no pin).
- `prefers-reduced-motion`: a static card list, no pin, no scrub.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-09-rail/
  index.jsx    — the site (nav, hero, window journey, timetable, deck, berths, plan, footer)
  meta.js      — design metadata for the ATELIER library
  content.js   — all copy: journeys, timetable rows, berths, contact
  styles.css   — all styling, tokens scoped to .tpl-design-09-rail
  assets/      — hero.jpg, dest-1/2/3.jpg, detail.jpg, frames/ (72 JPG scroll frames)
  README.md
```

## Sections

| id | tour stop | what |
|---|---|---|
| `hero` | Departures | scroll-scrubbed aerial train sequence (72 frames), headline, departure ticker |
| `journeys` | Journeys | the pinned window-journey mechanic |
| `timetable` | Timetable | departure-board rows: route, day, duration, from-price, status |
| `observation` | Observation Deck | full-bleed brass-detail band with pull quote |
| `berths` | Berths | three classes, Pullman Day Coach → Observation Suite |
| `contact` | Plan Your Journey | travel-desk form + address/phone/email |

## Replace images

Drop new files into `assets/` with the same names (`hero.jpg`,
`dest-1.jpg`, `dest-2.jpg`, `dest-3.jpg`, `detail.jpg`) — or use the lab's
Upload panel, which maps to keys `hero`, `product-0`, `product-1`,
`product-2`, `detail`. The hero motion is a scroll-driven frame sequence in
`assets/frames/` (72 JPG frames, scrubbed by `<ScrollFrames>`); the first frame
acts as the poster.

## Tokens

All design tokens live on `.tpl-design-09-rail` — never `:root`:

```css
--color-primary / --color-secondary / --color-accent / --color-accent-soft
--color-background / --color-surface / --color-text / --color-muted
--color-ink / --color-cream
--font-display ('DM Serif Display') / --font-body ('Inter')
```

## content.js

Plain JSON-compatible object. Journeys are `{ name, tag, duration, price,
blurb }` with `price` as a ₹ number (formatted by the shared `price()`
helper, so currency customisation works). Timetable rows mirror the journeys
for the departure board.

## Deploy

Standalone export via the lab's exporter (`tools/export-template.mjs`) —
the folder is self-contained: only `react`, `gsap`, and `../../_shared`
imports.
