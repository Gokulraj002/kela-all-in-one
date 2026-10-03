# Kela Hotels — design-04-lodge

**Tag:** Mountain Lodge · **Palette:** bark / ember · **Type:** Fraunces (display) + Manrope (body)

A warm timber-craft hotel site for a Himalayan mountain lodge. Fireside copy,
generous airy rhythm, and one signature interaction: the **Hearth fan** —
room cards start stacked like firewood (rotated ±8°, overlapping) and fan
into an arc as the section scrolls through (scrubbed, no pin on desktop).

## Sections

1. **Hero** — scroll-driven fireside frame sequence (`assets/frames/frame-001.jpg`
   … `frame-072.jpg`, scrubbed by `<ScrollFrames>`, pinned `+=170%`);
   canvas glow-in (opacity, 2s); masked word-rise headline.
2. **Booking bar** — dates, room, guests; live night count and per-night math
   via `price()`; **season-aware rates** (winter ×1.2 peak, summer ×1.0).
3. **Fireside note** — winter / summer switcher driving the note copy and the
   booking rates.
4. **Rooms** — the Hearth fan signature flow (3 timber-warm cards).
5. **Mountain days** — guided treks, skiing & snow play, bonfire evenings.
6. **Mountain kitchen** — hearty dining story + detail image.
7. **Getting there** — journey steps, address, tap-to-call, maps link.
8. **Footer.**

Tour stops (`data-tour`): Welcome · Check Availability · Fireside Note ·
Rooms · Mountain Days · Mountain Kitchen · Getting There.

## Run

```bash
npm install
npm run dev
```

The template is self-contained: it imports only its own folder files,
`../../_shared`, `react`, `gsap`, `gsap/ScrollTrigger`.

## Structure

```
design-04-lodge/
  index.jsx    — the site (BookingBar, SeasonSwitcher, RoomCard, hearth fan)
  meta.js      — platform metadata (id, tag, fonts, colors, features)
  content.js   — all editable copy, rooms, seasons, rates
  styles.css   — all styling; tokens on `.tpl-design-04-lodge` only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/frame-001.jpg … frame-072.jpg (scroll-scrubbed hero)
  README.md
```

## Replacing images

Drop new files over the five JPGs in `assets/` (same names), or use the
platform Upload panel — the keys are `hero`, `product-0` (Deodar Suite),
`product-1` (The Hearth Room), `product-2` (Sunrise Trail Cabin / treks),
`detail` (kitchen / bonfire). Keep the honeyed warm grade for coherence.

The hero is a scroll-scrubbed frame sequence: `import.meta.glob` loads
`assets/frames/frame-*.jpg` (72 frames) into `<ScrollFrames>`, which pins the
hero for `+=170%` of scroll and paints frames onto a canvas — frame 0 first,
so there is no blank flash. Reduced-motion renders the first frame as a
static image with no pin.

## Tokens

All on `.tpl-design-04-lodge` (never `:root`):

| token | value | use |
|---|---|---|
| `--color-primary` | `#2E2118` | bark ink |
| `--color-accent` | `#C97B3F` | ember |
| `--color-background` | `#F7F0E3` | warm cream |
| `--color-surface` | `#EFE2CC` | warm sand |
| `--color-deep` | `#231810` | fireside night |
| `--font-display` | Fraunces | headlines |
| `--font-body` | Manrope | body/UI |

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero`, `booking`,
`seasons` (winter/summer copy + rate multipliers), `rooms` (name, price,
size, sleeps, desc, imgKey), `days`, `kitchen`, `visit`, `footer`.
Brand name, room names, prices and contact all flow through `useCustom()`,
so Customize / Upload / currency panels work.

## Motion notes

- `useLayoutEffect` + `gsap.context(..., rootRef)` + `ctx.revert()`;
  `scroller()` on every ScrollTrigger.
- Reveals: 1.2s `power2.out` (lodge personality); card hovers: 4px lift.
- Hearth fan: desktop-only `matchMedia('(min-width: 900px)')`, scrub 1,
  trigger `.ld-rooms-stage` from `top 90%` → `top 25%`. The fanned final
  state is the **CSS default**, so reduced-motion / no-JS renders the fan
  complete. Mobile (<900px): cards stack vertically, no fan.
- Hero glow-in runs once on mount (2s canvas opacity); under
  reduced-motion `<ScrollFrames>` renders the first frame as a static
  image with no pin.

## Deploy

Exported as a standalone Vite app via the platform exporter
(`tools/export-template.mjs`); `npm run build` must stay clean.
