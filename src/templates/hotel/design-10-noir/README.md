# Kela Hotels — design-10-noir

**Cinematic Hotel.** An experimental dark cinematic hotel site: near-black and bone,
light that arrives slowly, and a vertical filmstrip room gallery with sprocket-hole
edges and light-leak sweeps.

## Design personality

Noir, strange, never broken. Cormorant Garamond italic accents carry the voice,
Archivo 800 uppercase carries the headlines, IBM Plex Mono carries the labels.
The practical section is set entirely in mono. One invert flash fires exactly
once at the manifesto — rare, 0.15s, 8%.

## Run

```bash
npm install
npm run dev
```

## Structure

```
design-10-noir/
  index.jsx    — component (nav, hero, concept, filmstrip, night, screenings, practical, booking, footer)
  meta.js      — template metadata
  content.js   — all editable copy, rooms, rates, practical lines
  styles.css   — all styling; tokens on .tpl-design-10-noir only
  assets/      — hero.jpg, room-1.jpg, room-2.jpg, room-3.jpg, detail.jpg, frames/ (scroll-driven hero sequence, 72 frames)
  README.md
```

## Signature motion

**Filmstrip noir** (MOTION.md §3.10): a pinned vertical filmstrip on desktop —
frames advance with a scrubbed y-translation; each entering frame gets a 0.6s
diagonal light-leak sweep (containerAnimation triggers). Grain overlay is static
(opacity only, never animated). Reduced-motion and mobile: stacked frames, no leaks.

Also: hero light-shaft sweep + word-rise, hidden overlay menu (circular clip-path,
0.7s power4.inOut), lerped custom cursor ring (desktop pointer:fine only).

## How to replace images

Drop new JPGs into `assets/` with the same filenames, or use the platform
Upload panel — keys are `hero`, `product-0` … `product-3`, `detail`.

## Tokens

`--color-primary #0C0C0E` · `--color-accent #D8D3C8` · `--color-background` ·
`--color-surface` · `--color-film` · `--color-text` · `--color-muted` ·
`--color-faint` · `--color-line` · `--font-display` (Archivo) ·
`--font-accent` (Cormorant Garamond) · `--font-mono` (IBM Plex Mono).

## content.js

Brand, nav, hero copy, story/manifesto, rooms (names, ₹ rates, sizes, descs),
the-night entries, screening events, practical mono lines, booking labels, footer.

## Deploy

Standalone export via the ATELIER exporter; the component is self-contained
(only `react`, `gsap`, `gsap/ScrollTrigger`, and `../../_shared` imports).
