# Kela Hotels — design-07-business

**Tag:** Business Hotel · **Fonts:** Archivo (display) + Inter (body)
**Palette:** Steel ink `#1B2A3A` / confident blue `#2E7CD6` — clean, cool, precise.

## Design personality

The fastest, most utility-driven design in the hotel category. Kela Hotels is a
business hotel engineered around the working day: a confident utility nav bar,
an express 30-second booking widget with live night/rate math, a room index
styled as a split-flap departure board, Wi-Fi proof stats that count up, and
transfer times stated in minutes — not adjectives.

**Signature flow (§3.07 — "Split-flap board"):** each room row entering the
viewport flips its top flap half in (`rotateX 90 → 0`, ≤0.5s) with a soft
scale pulse, triggered once per row via ScrollTrigger. Reduced motion renders
the board instantly, no animation.

**Hero:** scroll-driven frame sequence (`assets/frames/`, the 10s "Tower
ascent" clip played frame-by-frame as the visitor scrolls, pinned for
`+=170%`) with masked word-rise headline, 0.7s utility reveals, and counting
stat ticks with snap.

## Sections

1. Hero (tower at blue hour + stat ticks) — `data-tour="Welcome"`
2. Express booking widget (dates/guests, 30-second promise) — `data-tour="Book in 30 Seconds"`
3. Rooms — split-flap board index — `data-tour="Room Index"`
4. Work — meeting rooms, boardroom visual, Wi-Fi proof — `data-tour="Work & Meetings"`
5. All-day dining — `data-tour="All-Day Dining"`
6. Location — airport/city transfer times — `data-tour="Getting Here"`
7. Footer + mobile quick-book bar

## Run

```bash
npm install
npm run dev   # template renders inside the ATELIER viewer at /hotel/design-07-business
```

## Structure

```
design-07-business/
  index.jsx    — component (nav, hero, booking, rooms board, work, dining, visit, footer)
  meta.js      — meta export (id, name, tag, fonts, colors, features)
  content.js   — all editable copy: brand, nav, hero stats, rooms, meeting rooms, dining, times
  styles.css   — all styling, tokens on .tpl-design-07-business only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg, frames/ (72 scroll frames)
  README.md
```

## How to replace images

Drop new files into `assets/` with the same names, or use the lab's Upload
panel — image keys are `hero`, `product-0` (room), `product-1` (boardroom),
`product-2` (breakfast), `detail` (key card). The hero is a scroll-driven
frame sequence loaded from `assets/frames/frame-001.jpg` … `frame-072.jpg`
via `import.meta.glob`, pinned and scrubbed by the shared `ScrollFrames`
component.

## Tokens

All on `.tpl-design-07-business`: `--color-primary`, `--color-accent`,
`--color-background`, `--color-surface`, `--color-surface-2`, `--color-text`,
`--color-muted`, `--color-line`, `--color-ink`, `--color-board*`,
`--font-display`, `--font-body`. The customizer rewrites these live. Never
write to `:root`.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `utility`, `hero` (title, sub,
stats), `booking` (baseRate, notes), `rooms` (code/name/price/size/meta/desc),
`work` (body, proof stats, meeting rooms), `dining` (3 venues with time
promises), `visit` (transfer times, address, phone, email), `footer`.
Room names route through `productName(i, …)`, rates through `price(n)`.

## Deploy

Standalone export via `tools/export-template.mjs` (copies the folder + `_shared`,
builds with Vite). No platform imports — only `react`, `gsap`,
`gsap/ScrollTrigger`, `./` files and `../../_shared`.
