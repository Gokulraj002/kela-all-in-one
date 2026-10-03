# ATELIER · IT & Technology — VIDEO_PLAN.md

One signature cinematic clip per design (~10s, seamless-loop feel).
File: `assets/hero-loop.mp4` in each design folder. Poster: the design's
`assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding)

- Use the shared `<LoopVideo src poster alt className>` from `../../_shared`
  (muted/autoplay/loop/playsinline, preload="metadata", poster always present,
  IntersectionObserver offscreen pause, reduced-motion → poster only,
  error → poster remains). Do NOT hand-roll video.
- Photorealistic or high-end render realism, on-palette grade per design.
  No text, no watermarks, no visible faces (hands/process OK).
  Abstract tech cinema: server halls, chip macros, light, data flows.
  **No matrix rain, no cheesy holograms, no fake UI screens, no green code
  waterfalls.** If a clip looks cheap, plasticky, or off-palette → regenerate.
- Verify with ffprobe: ~10s duration, H.264, 1280×720.

## Storyboards

### 01 · design-01-saas — "Glass ascent" (10s) — HERO background
- 0–3s: slow vertical drift up a glass office-tower facade, morning light.
- 3–7s: clouds and sky sweep across the reflections as the camera rises.
- 7–10s: settle into a clean sky reflection; loop on the slow cloud drift.
- Grade: bright daylight, paper white / indigo-tinted glass.

### 02 · design-02-ai — "Pulse" (10s) — HERO background
- 0–3s: near-black field; faint fiber-optic threads fade in, out of focus.
- 3–7s: a violet pulse ignites and travels along the threads; cyan echoes follow.
- 7–10s: threads dim back toward darkness; loop on the pulse cycle.
- Grade: near-black, violet/cyan glow, cinematic falloff.

### 03 · design-03-devtools — "Keystrokes" (8s) — HERO background
- 0–2s: extreme macro of a backlit keyboard in darkness, one keypress.
- 2–6s: hands type in steady rhythm, shallow depth of field, green status glow.
- 6–8s: hands lift, keys settle; loop on the idle glow.
- Grade: editor-dark, green/amber accents.

### 04 · design-04-secure — "Red sweep" (8s) — HERO background
- 0–2s: dark server corridor; a thin red scan line ignites at frame left.
- 2–6s: the line sweeps steadily across the racks, rack LEDs flaring as it passes.
- 6–8s: line exits frame right, corridor falls dark; loop on the sweep.
- Grade: black/steel, single signal-red accent.

### 05 · design-05-cloud — "Above the clouds" (10s) — HERO background
- 0–4s: slow aerial push above a cloud deck at dusk, teal-to-amber sky.
- 4–8s: a lit data-center campus resolves below through a break in the clouds.
- 8–10s: hold on the campus glow; loop on the cloud drift.
- Grade: deep navy dusk, cyan/teal campus lights.

### 06 · design-06-consumer — "Paper drift" (8s) — HERO background
- 0–2s: warm sunlight; coral and sunshine paper shapes begin to float upward.
- 2–6s: shapes tumble playfully in slow motion, soft shadows on cream.
- 6–8s: shapes drift out of frame; loop on the float cycle.
- Grade: warm cream daylight, coral/sunshine/teal.

### 07 · design-07-robotics — "Assembly" (10s) — HERO background
- 0–3s: robotic arm at rest in a precision lab, orange accent light raking.
- 3–7s: the arm moves with deliberate slowness, picking a small component.
- 7–10s: component placed, arm settles; loop on the rest position.
- Grade: graphite dark, safety-orange accents, industrial haze.

### 08 · design-08-fintech — "Gold traces" (8s) — HERO background
- 0–3s: extreme macro, dark green field; gold circuit traces enter from left.
- 3–6s: slow lateral move along the traces, light glinting off the gold.
- 6–8s: traces curve out of frame; loop on the lateral glide.
- Grade: deep green / champagne gold, macro precision.

### 09 · design-09-opensource — "Many hands" (8s) — HERO background
- 0–2s: sunlit wooden table; diverse hands (no faces) enter frame with laptops.
- 2–6s: hands place sticky notes, point, type — collaborative rhythm.
- 6–8s: hands settle, notes remain; loop on the warm stillness.
- Grade: warm paper daylight, purple/green accents in the notes.

### 10 · design-10-experimental — "Chrome drift" (8s) — HERO background
- 0–2s: black studio space; chrome geometric forms fade in, catching light.
- 2–6s: forms rotate impossibly slowly, iridescent violet-cyan reflections.
- 6–8s: rotation continues into the loop point; seamless drift.
- Grade: black studio, subtle iridescence, art-directed (never gaudy).
