# ATELIER · E-commerce — VIDEO_PLAN.md

One signature cinematic clip per design (~10s, seamless-loop feel).
File: `assets/hero-loop.mp4` in each design folder. Poster: the design's
`assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding)

- Use the shared `<LoopVideo src poster alt className>` from
  `../../_shared` — do NOT hand-roll video logic.
- Muted, autoplay, loop, playsinline, `preload="metadata"`, poster always.
- IntersectionObserver offscreen pause (built into LoopVideo).
- `prefers-reduced-motion` → poster image only.
- On error → poster remains. Never a black hole.
- Photorealistic, on-palette grade per design, no text, no watermarks,
  no visible faces (hands/process OK). Cheap/plasticky/off-palette →
  regenerate. Render H.264, 1280×720, 24fps, ~10s.

## Storyboards

### 01 · design-01-flagship — "The pedestal" (10s) — HERO background
- 0–3s: slow dolly-in on a single product on a stone pedestal, museum light.
- 3–7s: a silk cloth drifts past in the foreground, soft focus.
- 7–10s: settle on the product, light breathing; loop on the drift.
- Grade: bone/ink/bronze, gallery daylight.

### 02 · design-02-bazaar — "The stalls" (10s) — HERO background
- 0–3s: slow lateral pan across colorful market stalls, fabrics fluttering.
- 3–7s: pass brass goods catching light, hands arranging textiles.
- 7–10s: settle into the crowd's warmth; loop on the flutter.
- Grade: saffron/teal/chili on warm paper.

### 03 · design-03-maison — "The drape" (10s) — HERO background
- 0–3s: dark silk slowly drapes over a luxury object, champagne rim light.
- 3–7s: fabric settles, object revealed in low light.
- 7–10s: light breathes across the surface; loop on the sheen.
- Grade: near-black/champagne.

### 04 · design-04-drop — "The burst" (8s) — HERO background
- 0–2s: macro of a shoebox lid lifting, tissue paper exploding upward.
- 2–5s: slow-motion paper and dust hanging in hard light.
- 5–8s: product revealed, paper settling; loop on the settle.
- Grade: high-contrast bone/ink, volt-orange accent prop.

### 05 · design-05-eco — "The wrap" (10s) — HERO background
- 0–3s: hands wrapping a product in kraft paper, morning light.
- 3–7s: twine tied in a slow bow, sprig tucked in.
- 7–10s: parcel lifted, dust motes; loop on the lift.
- Grade: cream/moss/clay, sunlit.

### 06 · design-06-tech — "The turntable" (10s) — HERO background
- 0–3s: gadget rotating on a dark turntable, edge light tracing it.
- 3–7s: macro push across circuit detail, cyan accents glinting.
- 7–10s: full rotation completes; loop on the rotation.
- Grade: graphite/steel, thin cyan.

### 07 · design-07-apparel — "The rack" (10s) — HERO background
- 0–3s: slow dolly along a garment rack, fabrics swaying gently.
- 3–7s: pass a linen shirt catching window light, texture macro.
- 7–10s: settle at the rack's end; loop on the sway.
- Grade: warm gray/ink/oxblood, soft daylight.

### 08 · design-08-home — "The light" (10s) — HERO background
- 0–4s: sunlight drifting across a styled living-room vignette.
- 4–8s: slow push past ceramics and linen, dust in the light shaft.
- 8–10s: settle on the armchair; loop on the light drift.
- Grade: linen/clay/oak, golden warmth.

### 09 · design-09-beauty — "The swirl" (10s) — HERO background
- 0–3s: extreme macro of cream swirling, soft and slow.
- 3–7s: a serum drop falls and blooms through the swirl.
- 7–10s: surface settles to gloss; loop on the sheen.
- Grade: blush/sand/rosewood, dewy soft.

### 10 · design-10-brutal — "The belt" (8s) — HERO background
- 0–3s: parcels moving on a warehouse conveyor, harsh top light.
- 3–6s: tracking shot along the belt, barcodes flashing past.
- 6–8s: belt continues; loop on the motion.
- Grade: desaturated concrete/black, flat yellow label accents.
