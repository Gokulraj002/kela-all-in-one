# ATELIER · Saree & Fashion — VIDEO_PLAN.md

One signature cinematic clip per design (~10s, seamless-loop feel).
File: `assets/hero-loop.mp4` in each design folder. Poster: the design's
existing `assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding)

- `<video muted autoplay loop playsinline preload="metadata" poster={hero.jpg}>`
- Use the shared `<LoopVideo src poster alt className>` from `../../../_shared`
  (handles everything below — do NOT hand-roll).
- Pause when offscreen (IntersectionObserver, threshold 0.15).
- `prefers-reduced-motion` → poster image only, no video element.
- On video error → video hides, poster remains. Never a black hole.
- `preload="metadata"` + lazy: only the hero/placement video loads eagerly
  enough to play; everything else waits for visibility.
- Photorealistic, on-palette grade per design, no text, no watermarks,
  no visible faces (hands / process / fabric only — crop at or below the
  neck, or shoot hands and cloth exclusively). If a clip looks cheap,
  plasticky, off-palette, or shows a face → regenerate.

## Storyboards

### 01 · design-01-heritage — "The Shuttle" (9s) — HERO background
- 0–3s: macro of hands at a wooden handloom — shuttle thrown through warp
  threads, yarn tension singing; indigo and madder tones.
- 3–6s: beater bar slams the weft home, hands smoothing the fresh weave;
  dyed yarn cones soft in the background bokeh.
- 6–9s: shuttle throw repeats in rhythm; loop on the shuttle's return pass.
- Grade: warm handloom — deep indigo, madder red, raw cotton cream.

### 02 · design-02-minimal — "Still Air" (8s) — HERO background
- 0–3s: a single length of pale oatmeal fabric hangs in still air, barely
  moving; soft window light raking across the weave.
- 3–6s: one slow fold releases and falls, the drape settling with gravity;
  dust motes drifting in the light.
- 6–8s: fabric comes to perfect rest; loop on the held stillness.
- Grade: desaturated stone, oatmeal, bone — near-monochrome calm.

### 03 · design-03-bridal — "The Twirl" (9s) — HERO background
- 0–3s: lehenga hem begins a slow twirl — embroidered border flaring,
  cropped at the waist, no face; gold thread catching light.
- 3–6s: macro pass over zardozi embroidery as the skirt turns, sequins
  flaring; dupatta edge drifting through frame.
- 6–9s: twirl slows, hem settling into soft folds; loop on the settle.
- Grade: luminous ivory, champagne gold, deep crimson shadows.

### 04 · design-04-street — "Fabric Snap" (7s) — HERO background
- 0–2s: hard fabric snap — a jacket hem cracked in wind, kinetic hit with a
  slight camera punch; city motion smearing behind.
- 2–5s: hands adjusting a collar mid-stride, lookbook energy, neon bokeh
  streaking past; cropped below the chin.
- 5–7s: snap repeats as the figure turns away; loop on the turn.
- Grade: high-contrast asphalt and ink, neon-magenta accents.

### 05 · design-05-slow — "The Vat" (10s) — CRAFT section (not hero)
- 0–3s: hands lowering yarn into an indigo dye vat, the surface breaking;
  natural dye clouds blooming in water.
- 3–7s: yarn lifted, dripping indigo oxidizing from green to deep blue;
  block-printing hands stamping a motif in the cutaway.
- 7–10s: dyed skeins hung to dry, swaying gently; loop on the sway.
- Grade: earthy — deep indigo, madder, turmeric, raw cotton.

### 06 · design-06-silk — "Silk Pour" (8s) — HERO background
- 0–3s: extreme macro of champagne silk pouring over hands, liquid drape;
  zari threads glinting as the cloth moves.
- 3–6s: the pour slows into a perfect drape, shimmer traveling across the
  folds like light on water.
- 6–8s: silk settles into stillness, gloss holding; loop on the gloss.
- Grade: near-black ground, champagne and antique-gold highlights.

### 07 · design-07-boutique — "The Rail" (8s) — ATELIER section (not hero)
- 0–3s: slow drift along a garment rail — silks, organzas, and embroidered
  pieces brushing past camera, hands parting two garments.
- 3–6s: atelier details in passing — a tailor's chalk mark, a pinned muslin
  toile, measuring tape draped over a shoulder form.
- 6–8s: rail continues its drift into soft focus; loop on the drift.
- Grade: warm gallery neutrals — warm grey, brass, ivory.

### 08 · design-08-tailor — "Needle & Steam" (8s) — CRAFT section (not hero)
- 0–3s: macro of needle and thread pulling through dark wool suiting, chalk
  lines visible; shears gliding along a chalk cut.
- 3–6s: pressing iron lifting, a plume of steam rising through a shaft of
  window light; hands smoothing the pressed seam.
- 6–8s: steam dissipating, cloth perfectly pressed; loop on the steam rise.
- Grade: charcoal, ink, brass — precise and masculine.

### 09 · design-09-festive — "Color in Motion" (9s) — HERO background
- 0–3s: saturated silk hem twirling through marigold petals, festival lights
  bokeh blooming behind; cropped at the waist, no face.
- 3–6s: slow-motion petal fall and light streaks, colors flaring magenta,
  marigold, emerald as the fabric turns.
- 6–9s: twirl resolving into a held drape, lights settling to glow;
  loop on the glow.
- Grade: festive saturation — marigold, magenta, emerald, gold.

### 10 · design-10-avant — "Wind Machine" (8s) — HERO background
- 0–3s: stark single-source light on black — a vast length of fabric blasted
  sideways by a wind machine, sculptural and violent.
- 3–6s: fabric writhing in the blast, light raking across the folds;
  theatrical, runway-scale.
- 6–8s: wind easing, fabric falling into a held sculptural shape;
  loop on the fall.
- Grade: stark monochrome — black, bone white, one crimson accent.
