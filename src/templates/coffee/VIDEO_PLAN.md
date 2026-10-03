# ATELIER · Coffee — VIDEO_PLAN.md

One signature cinematic clip per design (6–10s, seamless-loop feel).
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
  no people with visible faces (hands/process OK). If a clip looks cheap,
  plasticky, or off-palette → regenerate.

## Storyboards

### 01 · design-01-artisan — "First extraction" (8s) — HERO background
- 0–3s: macro of espresso extraction beginning — first dark drops beading under the portafilter, warm cream tones.
- 3–6s: slow pull-back as the stream steadies into a rich, even flow; crema forming.
- 6–8s: settle on the cup filling, gentle steam rising; loop point on steam drift.
- Grade: warm daylight, cream/espresso/copper.

### 02 · design-02-roastery — "The tumble" (8s) — HERO background
- 0–3s: close on green-to-gold beans tumbling inside the roaster drum window.
- 3–6s: beans deepen toward medium roast, drum rotation steady, ember glow rising.
- 6–8s: full tumble at roast color, heat shimmer; loop on rotation cycle.
- Grade: industrial-warm, kraft/charcoal/ember.

### 03 · design-03-scandi — "The spiral" (9s) — HERO background
- 0–3s: gooseneck kettle spout enters frame, thin stream begins over the dripper.
- 3–7s: slow concentric spiral pour, water blooming the coffee bed; utterly calm.
- 7–9s: kettle lifts away, last drops fall; loop on the still dripper.
- Grade: desaturated pale, soft daylight, fjord-blue coolness.

### 04 · design-04-urban — "Tamp & rush" (7s) — HERO background
- 0–2s: hard tamp — tamper slams the puck (kinetic hit, slight camera punch).
- 2–5s: pull-back through café motion, city bokeh smearing behind glass.
- 5–7s: espresso shot pulling fast; loop on the pour.
- Grade: high-contrast bone/ink, burnt-orange accents.

### 05 · design-05-vintage — "The ritual" (9s) — RITUAL section (not hero)
- 0–3s: brass lever pulled down in one smooth draw, sepia warmth.
- 3–6s: espresso ribboning into a vintage cup, patina glow.
- 6–9s: cup lifted from the drip tray, steam curl; loop on steam.
- Grade: sepia, cream/oxblood/brass.

### 06 · design-06-premium — "Crema" (8s) — HERO background
- 0–3s: extreme macro of crema surface, still as lacquer.
- 3–6s: impossibly slow swirl begins, champagne light moving across it.
- 6–8s: swirl settles into a perfect spiral; loop on the gloss.
- Grade: near-black, champagne highlights.

### 07 · design-07-subscription — "Never empty" (7s) — RITUAL section
- 0–2s: roasted beans begin cascading from above into an open bag.
- 2–5s: cascade continues, bag filling, morning light flaring softly.
- 5–7s: last beans settle, bag mouth folds; loop on the settle.
- Grade: fresh bright, cream/forest/terracotta.

### 08 · design-08-ecommerce — "The pour" (6s) — PRODUCT section side film
- 0–2s: kettle stream hits fresh grounds, bloom rising fast.
- 2–4s: steady commercial pour, clean and precise.
- 4–6s: dripper drips slow, cup full; loop on the drip.
- Grade: clean white studio, caramel/espresso.

### 09 · design-09-story — "Origin drift" (10s) — CHAPTER transition film
- 0–4s: slow aerial drift over terraced coffee estate, morning mist.
- 4–8s: drift continues across the valley, light breaking through.
- 8–10s: settle toward the farm buildings; loop on mist movement.
- Grade: parchment-warm documentary, forest greens.

### 10 · design-10-experimental — "Emulsion" (7s) — HERO background
- 0–2s: black field, a drop of coffee/ink hits and blooms.
- 2–5s: fluid macro turbulence, persimmon light raking across.
- 5–7s: bloom resolves into slow marbling; loop on the drift.
- Grade: lab-noir black/cream/persimmon.
