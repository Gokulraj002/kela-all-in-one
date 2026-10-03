# Kela Kitchen — Chef's Table (design-10-chefstable)

**Personality:** Theatrical · Daring · Unrepeatable. Dinner as a three-act
performance — playbill menu, cast list, box-office booking. The only
ticket-framed CTA in the restaurant set.

**Type:** Abril Fatface (high-drama act titles) + Space Mono (stage
directions, course notes, box-office UI).

**Palette:** black `#0D0C0A` / bone `#EFE6D4` / crimson `#B3352B` (10%).

## Run

```bash
cd ~/workspace/atelier
npm install
npm run dev        # template mounts via the platform viewer
```

## Structure

- `index.jsx` — the site: theatrical nav → hero (cloche reveal scroll-frames sequence)
  → the premise (manifesto, one invert flash) → the three acts (M10 curtain
  + spotlight mechanic) → the chef (director's note) → cast list → box
  office (ticket tiers + reserve) → playbill footer.
- `content.js` — all copy: acts/scenes, cast, tiers, visit, footer.
- `styles.css` — tokens on `.tpl-design-10-chefstable` only.
- `assets/` — `hero.jpg`, `dish-1.jpg`, `dish-2.jpg`, `dish-3.jpg`,
  `detail.jpg`, plus `frames/` — the 72 JPG hero frames scrubbed by scroll
  (replaces the old hero loop video; no mp4 ships).

## Signature motion (M10 — Act curtains)

Each act's two curtain panels part horizontally from centre
(`inset(0 0% 0 0%) → inset(0 100% 0 0%)` / mirrored), scrubbed, while a
soft-edged spotlight (`radial-gradient` veil, CSS var `--spot` 0% → 165%)
opens on the featured dish and the act title rises through a mask.
Defaults are the open state — reduced-motion renders everything visible
with no flash, no smoke drift, curtains open.

## Replace images

Drop new JPGs over `assets/hero.jpg`, `dish-1.jpg`, `dish-2.jpg`,
`dish-3.jpg`, `detail.jpg` (or upload via the lab — keys `hero`,
`product-0`, `product-1`, `product-2`, `detail`), and drop new JPGs over
`assets/frames/frame-001.jpg` … `frame-072.jpg` to reshoot the scroll-driven
hero sequence. Copy `hero.jpg` to the public thumb after changes:

```bash
cp assets/hero.jpg ~/workspace/atelier/public/templates/restaurant/design-10-chefstable/thumb.jpg
```

## Tokens

`--color-background/surface/primary/secondary/accent/text/muted`,
`--color-curtain` (curtain fabric), `--font-display`, `--font-body` —
rewritten live by the customizer.

## Deploy

Standalone export via `tools/export-template.mjs` bundles this folder with
`src/templates/_shared`; no platform imports are used.
