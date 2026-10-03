# Kela Hotels — design-02-beach (Hotel · Beach Retreat)

Minimal beach retreat. Restraint as luxury — the calmest design in the ATELIER
hotel category. Pale dawn light, limewash and linen, enormous whitespace.
Everything fades; nothing hurries.

- **Fonts:** Fraunces (light, display) + Inter (body)
- **Palette:** sea-mist ink `#3E4A4A`, sage accent `#9DB8B0`, limewash background
- **Signature flow:** "Tide-wash dissolve" — a tall, unpinned section maps
  vertical scroll to image index; slides crossfade with a soft horizontal drift
  (x 40→0) and blur (6px→0), like tide washing in.
- **Motion grammar:** opacity-only reveals, durations ≥ 1.4s, `sine.out`.
  Hero: one single 1.8s fade. Nothing translates more than 12px, nothing
  scales (except the tide flow).

## Run

From `~/workspace/atelier`:

```bash
npm install
npm run dev
```

The platform viewer renders this template inside `.tpl-scope`; standalone it
works the same (the shared context falls back to `window` as scroller).

## Structure

```
design-02-beach/
  index.jsx    — the website (nav, hero, tide gallery, retreat, rooms,
                 slow days, booking bar, practical, footer)
  meta.js      — catalog entry (id, name, tag, fonts, colors, features)
  content.js   — all editable copy, rooms + rates, seasons, contact
  styles.css   — ALL styling; tokens on `.tpl-design-02-beach` only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg,
                 frames/ (72 scroll-driven hero frames; see Media status below)
  README.md
```

## Media status

The 5 JPGs and `assets/frames/frame-001.jpg` … `frame-072.jpg` (72 frames
extracted from the signature loop per `VIDEO_PLAN.md` §02 — "First tide", ~9s:
dawn beach → wave washes in → water recedes; desaturated airy grade; no
text/watermarks/faces) are all on disk. The template is built media-safe:

- Images use `<Img k="hero" src={img('hero')} …/>` with **no static import**,
  so the build stays green. The platform renders its elegant placeholder
  (soft sage tone + brand initial) until real assets arrive; the Customize
  panel's Upload tab already fills every slot live.
- The hero is a scroll-driven frame sequence: `ScrollFrames` scrubs the 72
  frames with a 170% pin (`pinDistance="+=170%"`). Frame 0 paints first as a
  poster, so there is no blank flash; reduced-motion renders frame 0 as a
  static image with no pin.

When the media pass succeeds, drop the files into `assets/` and wire them as
fallbacks, e.g.:

```jsx
import heroImg from './assets/hero.jpg';
// …
<Img k="hero" src={img('hero', heroImg)} eager alt="…" />
```

Image keys (must match the upload panel): `hero`, `product-0` (Linen Room),
`product-1` (Courtyard Room), `product-2` (Sea Room / deck lunch), `detail`.

## Tokens

```css
.tpl-design-02-beach {
  --color-primary: #3e4a4a;   --color-accent: #9db8b0;
  --color-background: #f5f2ea; --color-surface: #fdfcf8;
  --color-text: #3e4a4a;       --color-muted: #8b948f;
  --color-line: #dfe0d8;       --color-veil: #f5f2ea;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', -apple-system, 'Segoe UI', sans-serif;
}
```

The customizer rewrites these live. Never touch `:root`.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `hero`, `seasons`,
`tide.slides` (image keys + captions), `story.body[]`, `rooms.items[]`
(name / price in ₹ / size / desc / imgKey), `experiences.items[]` (time, name,
desc), `booking` labels, `visit` (seasons, getting there, house facts),
`contact`, `footer`. Rates flow through `price()`; room names through
`productName(i, fallback)`; images through `img(key)`; brand/contact through
`useCustom()`.

## Notes

- Tour stops (`data-tour`): Welcome, The Tide, The Retreat, Rooms, Slow Days,
  Check Availability, Visit.
- `prefers-reduced-motion`: hero renders visible, reveals skipped, tide gallery
  becomes a stacked, fully-visible sequence. No content is ever hidden.
- Booking bar is a realistic demo: date inputs, guests, room select, live
  night-count and per-night math via `price()`; "Request to reserve" is the
  demo handoff (no payment).
- Responsive: single-column rooms and stacked grids ≤ 900px; nav links hide
  ≤ 700px leaving wordmark + soft "Check availability".

## Deploy

Standalone export via `tools/export-template.mjs` (see category README); the
folder is self-contained — only relative imports plus `../../_shared`,
`react`, `gsap`, `gsap/ScrollTrigger`.
