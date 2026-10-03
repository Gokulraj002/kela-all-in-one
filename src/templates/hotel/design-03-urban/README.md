# Kela Hotels — design-03-urban

**Urban boutique hotel. Sharp, fast, editorial.**

The loud urban one in the ATELIER hotel category: ink and signal orange,
condensed-feeling Archivo headlines, mono Space Grotesk labels, and a
signature scroll-spotlight room grid. Built for business-creatives and
design tourists who book fast and judge faster.

## Personality

- **Kinetic hero** — the headline slams in word by word over a 10-second
  looping rooftop-at-dusk video (city lights flickering on).
- **Spotlight grid (§3.03)** — a strict 3×2 room grid. Scrubbed scroll
  moves a spotlight from room to room: the active room scales to 1.02 while
  the rest dim to 0.55 opacity at 0.6 saturation, with a mono index readout
  (`01 / 06` → `06 / 06`). Hovering any card overrides to full.
- **Fast grammar** — every reveal is 0.6s; rules snap in; hovers invert
  (cards flip to ink, buttons flip to accent). No border-radius anywhere
  except the sticky Book pill.
- **Real booking affordance** — dates, guests, room selector, live night
  count and per-night math via the platform `price()` formatter, ending in
  a demo "held" reference.

## Sections

Nav (mono labels + sticky Book pill) → hero → booking bar → rooms
(spotlight grid) → rooftop bar → neighborhood tabs → work spaces →
practical → footer. Tour stops: The House, Book Direct, Six Rooms,
The Rooftop, The Neighborhood, Work Here, Practical.

## Run

From the repo root:

```bash
npm install
npm run dev
```

Open the ATELIER viewer and select **Hotel → 03 Kela Hotels**.

## Structure

```
design-03-urban/
  index.jsx   — component (nav, hero, BookingBar, RoomCard grid,
                rooftop, NeighborhoodTabs, work, practical, footer)
  meta.js     — catalog metadata (id, fonts, colors, features)
  content.js  — all editable copy, rooms, rates, tabs, facts
  styles.css  — all styling, tokens on .tpl-design-03-urban only
  README.md
  assets/
    hero.jpg       — rooftop terrace at dusk, city skyline
    room-1.jpg     — design-led room, concrete + brass (5 crop variants)
    room-3.jpg     — cocktail at the rooftop bar
    detail.jpg     — lobby art installation (black/orange sculpture)
    frames/        — 72-frame scroll-scrub sequence (replaces the old hero mp4)
```

The bathroom shot (`room-2.jpg`) from the original shot list could not be
generated in-session (the generation worker failed once; the request was not
repeated). The six room cards reuse `room-1.jpg` with five distinct
object-position crops, and the Rooftop Penthouse uses the rooftop terrace
shot (`hero`) as its private-terrace visual.

## Replace images

Drop new files into `assets/` with the same names, or use the lab's Upload
panel — image keys are `hero`, `product-0`, `product-1`, `product-2`,
`product-3`, `detail`. In JSX, rooms resolve via
`img(key, fallback)` so uploads win automatically:

- `hero` → hero backdrop + penthouse card
- `product-0` → the five design-led room cards
- `product-2` → rooftop bar image
- `detail` → work/lobby image
- `product-1`, `product-3` → spare keys wired to the upload panel

## Tokens

```css
.tpl-design-03-urban {
  --color-primary: #14161a;
  --color-secondary: #1e2126;
  --color-accent: #e8622c;
  --color-background: #f3f1ec;
  --color-surface: #14161a;
  --color-text: #14161a;
  --color-muted: #6b6f76;
  --font-display: 'Archivo', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
}
```

The Customize panel rewrites these live. Never hardcode hex in new CSS —
always `var(--…)`.

## content.js

Plain object: `brand`, `nav`, `hero`, `booking`, `rooms.items[]`
(`name`, `price` in ₹, `size`, `desc`, `imgKey`, `crop`, `tag`),
`rooftop` (drinks + hours), `neighborhood.tabs[]`, `work.spaces[]`,
`visit` (facts, email, phone), `footer`. Room names and prices render
through `productName(i, …)` / `price(…)` so the lab's customization works.

## Motion contract

- `useLayoutEffect` + `gsap.context(…, rootRef)` + `revert()` cleanup.
- `scroller: scroller()` on every ScrollTrigger.
- `useReducedMotion()` → no tweens at all; static, fully-visible layout.
- Hero word-slam: 0.7s, `power4.out`, stagger 0.04. Reveals: 0.6s,
  `power3.out`, `once: true`.

## Deploy

Standalone export via the platform exporter (copies the folder + `_shared`,
builds with Vite). The hero video is dynamically imported so the build
stays green if the clip is ever missing — the poster carries the hero.
