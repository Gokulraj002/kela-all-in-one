# ATELIER · Real Estate — VIDEO_PLAN.md

One signature cinematic clip per design (~10s, H.264, 1280×720, 24fps,
seamless-loop feel). File: `assets/hero-loop.mp4` in each design folder.
Poster: the design's `assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding — same as coffee)

- Use the shared `<LoopVideo src poster alt className>` from `../../_shared`
  (or `../../../_shared`); do NOT hand-roll video logic.
- `<video muted autoplay loop playsinline preload="metadata" poster>`
- Pause when offscreen (IntersectionObserver, threshold 0.15) — built in.
- `prefers-reduced-motion` → poster image only, no video element.
- On video error → video hides, poster remains. Never a black hole.
- Import the clip statically (`import heroLoop from './assets/hero-loop.mp4'`)
  or via the dynamic-import pattern from coffee design-01 if preferred.
- Photorealistic, on-palette grade per design, no text, no watermarks,
  no visible faces (hands/silhouettes OK). If a clip looks cheap, plasticky,
  or off-palette → regenerate.

## Storyboards

### 01 · design-01-villas — "Dusk arrival" (10s) — HERO background
- 0–3s: slow aerial orbit high over a modern villa at dusk, warm interior
  light glowing through glass walls, pool a sheet of turquoise.
- 3–7s: orbit descends and tightens; landscape lighting blooms along the
  driveway, water ripples catch the last amber sky.
- 7–10s: settle into a low three-quarter view of the facade; loop on the
  water shimmer and light flicker.
- Grade: deep teal dusk / champagne interior glow / amber horizon.

### 02 · design-02-urban — "Blue-hour stack" (10s) — HERO background
- 0–3s: slow crane-down past residential towers at blue hour, grid of
  windows warming on floor by floor.
- 3–7s: descend to street level; lobby glow, a resident silhouette crosses
  (no face), city bokeh behind.
- 7–10s: settle on the tower crown against deep blue sky; loop on the
  window-light shimmer.
- Grade: ink blue / warm tungsten windows / steel.

### 03 · design-03-commercial — "The atrium" (10s) — HERO background
- 0–3s: slow push-in through a double-height glass atrium lobby, morning
  light raking across stone floor.
- 3–7s: glide past the reception desk (unmanned, sculptural), reflections
  sliding across glass balustrades.
- 7–10s: rise slightly to reveal the full atrium volume; loop on the
  light play and dust motes.
- Grade: cool daylight / graphite / brushed brass accents.

### 04 · design-04-plots — "The grid from above" (10s) — INTERLUDE film section
- 0–4s: high aerial drift over a plotted development at golden hour —
  the road grid, green avenues, a central lake catching light.
- 4–8s: slow descent along the main boulevard; plot markers and young
  avenue trees slide past.
- 8–10s: settle over the lake edge at low altitude; loop on water glint.
- Grade: golden-hour warmth / fresh greens / earth.

### 05 · design-05-heritage — "Hands of restoration" (10s) — RITUAL section
- 0–3s: extreme close on craftsman hands repointing lime mortar between
  old bricks (no faces), dust in warm side-light.
- 3–7s: slow pull-back along a restored colonnade; carved stone detail,
  brass fixtures gleaming.
- 7–10s: settle on the facade in late-afternoon sun; loop on the
  light moving across carved stone.
- Grade: sepia-warm / aged stone / brass.

### 06 · design-06-coliving — "Courtyard life" (10s) — HERO background
- 0–3s: sunlit communal courtyard, hammocks and long tables; young
  residents as soft silhouettes crossing frame (no faces).
- 3–7s: slow drift past string lights and planters; a hand sets down a
  coffee cup on a shared table.
- 7–10s: rise to show the courtyard's full social geometry; loop on the
  leaf movement and light.
- Grade: bright morning / terracotta / leaf green.

### 07 · design-07-smart — "The house wakes" (10s) — HERO background
- 0–3s: minimalist living room at dawn, cool and still; a single warm
  light fades up as blinds begin to rise.
- 3–7s: light sweeps the room — cove lighting ignites along the ceiling,
  the space warms from blue to amber.
- 7–10s: room fully awake in golden morning light; loop on the final
  glow breathing subtly.
- Grade: dawn blue → warm amber transition / charcoal / oak.

### 08 · design-08-retreat — "Edge of the water" (10s) — HERO background
- 0–4s: slow drift over an infinity pool toward the ocean beyond, palm
  fronds swaying at frame edge.
- 4–8s: descend to water level; the pool's edge dissolves into the sea,
  soft waves, distant sail.
- 8–10s: settle on the horizon line; loop on the water movement.
- Grade: aqua / bleached wood / warm white.

### 09 · design-09-trust — "The handover" (10s) — STORY section
- 0–3s: close on hands exchanging house keys over a doorway (no faces),
  warm domestic light.
- 3–7s: pull-back through the doorway into a bright, honest living room —
  simple furniture, sunlight, a child's drawing on the wall (no people).
- 7–10s: settle on the sunlit room; loop on the curtain movement.
- Grade: warm daylight / honest whites / natural wood.

### 10 · design-10-archviz — "Concrete light study" (10s) — HERO background
- 0–3s: abstract architectural forms — curved concrete planes, a slot of
  hard light raking across the surface.
- 3–7s: slow orbital move around the forms; shadows sweep and stretch,
  revealing depth and texture.
- 7–10s: settle into a graphic composition of light and mass; loop on the
  shadow drift.
- Grade: monochrome concrete / hard white light / deep shadow.
