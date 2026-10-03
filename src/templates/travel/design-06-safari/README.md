# Kela Travels — design-06-safari

Wildlife safari operator site for a Kenya + Rajasthan outfit. Dramatic and wild — big Bitter slab type, dawn/dusk grades, a sense of scale and patience. Cinematic naturalism throughout: charcoal skies, savanna-gold light, acacia-green-black silhouettes.

## Personality

Dramatic · Patient · Wild. Motion reads like a day on the plains: slow, heat-hazed, then suddenly everything happens at once. The signature is the **dawn-to-dusk scrub** — a pinned diorama where the sky (dawn → noon → dusk), a travelling sun disc, and three depths of silhouette parallax all move with the scroll, while each drive's card unfolds from the grass line as its hour arrives (05:40 / 12:15 / 18:50). Everything else is dust-drift reveals: masked word-rise headlines, clip-wipe frames, hairline rule draws.

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev
```

The template renders inside the ATELIER viewer (wrapped in `.tpl-scope`). For a standalone check, import the component directly in a scratch Vite page with the `_shared` folder alongside `src/templates`.

## Structure

```
design-06-safari/
  index.jsx    — default export; nav + sighting ticker, hero (scroll-driven
                 frame sequence), dawn-to-dusk diorama (safaris), grounds
                 triptych, field notes, guides, plan/contact, footer
  meta.js      — contract-shaped meta
  content.js   — all copy: ticker items, safaris (₹ number prices, times),
                 grounds, story, guides, contact, footer
  styles.css   — tokens on .tpl-design-06-safari; every rule scoped
  assets/      — hero.jpg, dest-1.jpg, dest-2.jpg, dest-3.jpg, detail.jpg,
                 frames/ (72 scroll-scrub hero frames, "First Light")
  README.md
```

The diorama (`Diorama` in index.jsx): on desktop ≥768px a scrubbed pin drives sky crossfades, the sun arc (position + glow), 3-depth silhouette parallax (hills / acacias / grass), the chapter clock, and card unfolds — all in one GSAP timeline. Below 768px the pin never builds and CSS restacks it as a static dawn sky with stacked cards. `prefers-reduced-motion` renders `SafariStatic` instead: dawn sky, no pin, plain grid.

## Replace images

Drop new files over `assets/hero.jpg`, `dest-1.jpg`, `dest-2.jpg`, `dest-3.jpg`, `detail.jpg` — or use the lab's Upload panel, which maps to keys `hero`, `product-0`, `product-1`, `product-2`, `detail`. Keep the warm dawn grade (savanna gold / acacia / charcoal) so the diorama skies stay coherent. The hero sequence is 72 JPG frames (`assets/frames/frame-001.jpg` … `frame-072.jpg`), scrubbed frame-by-frame as the visitor scrolls via the shared `ScrollFrames` component (pinned `+=170%`); reduced-motion shows frame 001 statically.

## Tokens

On `.tpl-design-06-safari`: `--color-background #191713`, `--color-surface #221D15`, `--color-primary #191713`, `--color-secondary #3E4A2E`, `--color-accent #C99A3C`, `--color-text #F4EBD6`, `--color-muted #A79B7E`, `--font-display 'Bitter'`, `--font-body 'Inter'`, plus `--sky-dawn-*` / `--sky-noon-*` / `--sky-dusk-*` scene stops for the diorama. The customizer rewrites the base tokens live.

## content.js

Plain JSON-compatible object: `brand`, `nav`, `cta`, `ticker` (sighting lines), `hero`, `safaris` (chapters with times + items with ₹ number prices, durations, tags), `grounds`, `story` (body, stats, quote), `guides`, `contact`, `footer`. Brand, contact email, prices, and safari names all flow through `useCustom()` so overrides apply.

## Deploy

Exported as a standalone Vite template via the lab's exporter (see `tools/export-template.mjs`). Fonts load from Google Fonts at runtime with `display=swap`.
