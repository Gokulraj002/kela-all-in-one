# Kela Cafe — design-04-urban

**Personality:** Brutalist-urban poster energy. Bone ground, ink blocks, burnt
orange accents. Fraunces at poster weight made to shout, Space Grotesk for
everything functional. The loud one — built for thumbs and train platforms.

**Conversion goal:** Order ahead for pickup. "Order Ahead" appears in the sticky
nav pill, the hero, the order section, the menu section, and the city section —
plus an app-like bottom tab bar (Menu / Order / Locations) on mobile.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-04-urban/
  index.jsx    — component (Nav, Hero, Ticker, Order, Locations, Menu, Rhythm, City, Footer, TabBar)
  meta.js      — contract meta
  content.js   — all copy, menu items (₹ numbers), locations, hours
  styles.css   — tokens scoped to .tpl-design-04-urban
  assets/      — hero.jpg, menu-1.jpg, menu-2.jpg, menu-3.jpg, detail.jpg
  README.md
```

## Motion

- **Specials ticker** — rAF loop, content duplicated exactly 2x, wraps modulo
  half width. Pauses when offscreen (IntersectionObserver), on
  `document.hidden`, and on hover. Static single copy under reduced motion.
- **Hero** — kinetic word slam (`power4.out`, stagger 0.04, 0.7s) with a hard
  offset shadow on the final word, diagonal hard-clip wipe on the image,
  CTA pill pop (`back.out(2)`).
- **Color-block wipes** — a burnt-orange panel sweeps across the Order and
  Locations sections (max two per page); content rises in as it clears.
- **Location switcher** — hours panel x-slides 0.35s on tab change.
- **Menu** — Hot / Cold / Food filter with quick-add rows; rows invert on
  hover, quick-add buttons fill-sweep.
- **Order pill** — subtle 2s pulse that stops after the first tap.
- Reduced motion: static ticker, no slam, wipes become cuts, no pulse.

## Replace images

Swap the files in `assets/` (same filenames) or use the lab's Upload panel —
upload keys are `hero`, `menu-0`, `menu-1`, `menu-2`, `detail`.

## Tokens

`--color-background #F2EBDC` · `--color-surface #E4D8C0` ·
`--color-primary #141311` · `--color-secondary #3E3B34` ·
`--color-accent #DE4E1D` · `--color-text #141311` · `--color-muted #7E7668` ·
`--font-display 'Fraunces'` · `--font-body 'Space Grotesk'`.
The Customize panel can rewrite these live — every color/font in the CSS comes
from `var()`.

## content.js

Edit brand, nav, hero copy, ticker specials, order steps/slots, locations
(name/area/address/phone/hours), menu items (prices are ₹ numbers), daily
rhythm, city notes, contact, and footer. Prices render through the
customizer's `price()` formatter.

## Deploy

Exported as a standalone Vite app via the ATELIER exporter; any static host
works (`npm run build` → `dist/`).
