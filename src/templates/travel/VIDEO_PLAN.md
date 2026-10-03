# ATELIER · Travel & Tourism — VIDEO_PLAN.md

One signature cinematic clip per design (~10s, seamless-loop feel).
File: `assets/hero-loop.mp4` in each design folder. Poster: the design's
existing `assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding — same as coffee)

- `<video muted autoplay loop playsinline preload="metadata" poster={hero.jpg}>`
- Use the shared `<LoopVideo src poster alt className>` from `../../_shared`
  (handles everything below — do NOT hand-roll). Wire the mp4 via dynamic
  `import('./assets/hero-loop.mp4')` in a `useEffect` so the build never
  breaks if the clip is missing — poster carries the hero.
- Pause when offscreen (IntersectionObserver, threshold 0.15).
- `prefers-reduced-motion` → poster image only, no video element.
- On video error → video hides, poster remains. Never a black hole.
- `preload="metadata"`. Photorealistic, on-palette grade per design,
  no text, no watermarks, no people with visible faces (silhouettes at
  distance OK, backs of heads OK). If a clip looks cheap, plasticky, or
  off-palette → regenerate.

## Storyboards

### 01 · design-01-luxury — "The Approach" (10s) — HERO background
- 0–3s: aerial drift toward a private yacht anchored off limestone cliffs, golden-hour light raking the water.
- 3–7s: slow lateral glide past the cliffs; wake trailing white behind the hull.
- 7–10s: settle on the yacht small against the cliff face; loop on water shimmer.
- Grade: deep ink-navy shadows, champagne-gold highlights, ivory sky.

### 02 · design-02-adventure — "Ridgeline" (10s) — HERO background
- 0–3s: drone push over a knife-edge Himalayan ridgeline, prayer flags snapping in the foreground.
- 3–7s: push continues, clouds boiling below the ridge, a distant summit catching light.
- 7–10s: hold on the summit glow; loop on flag flutter + cloud drift.
- Grade: basalt black, cold stone grey, one hot-orange accent (flags).

### 03 · design-03-honeymoon — "Blue Hour" (10s) — HERO background
- 0–3s: overwater villa at dusk, lanterns warming one by one along the deck.
- 3–7s: slow drift across the lagoon; gentle wavelets catching the last pink light.
- 7–10s: settle on the villa's reflection doubling in the water; loop on the ripple.
- Grade: blush pink, pearl, dusk mauve — soft, never saccharine.

### 04 · design-04-heritage — "Morning Rite" (10s) — HERITAGE section film (mid-page)
- 0–3s: slow drift through an ancient sandstone temple courtyard, incense smoke curling.
- 3–7s: light shafts move across carved pillars; a distant bell's vibration in the dust.
- 7–10s: settle on a carved doorway glowing from within; loop on smoke drift.
- Grade: terracotta, sandstone gold, deep indigo shadow.

### 05 · design-05-island — "The Sandbar" (10s) — HERO background
- 0–3s: aerial drift over a crescent sandbar, turquoise shallows on both sides.
- 3–7s: gentle waves wash the bar's edge; the color gradient shifts aqua→deep blue.
- 7–10s: a lone palm's shadow stretches; loop on the water's breathing motion.
- Grade: sea-glass, bleached sand, luminous white — overexposed slightly, never harsh.

### 06 · design-06-safari — "First Light" (10s) — HERO background
- 0–3s: savanna at dawn, elephant herd silhouettes crossing frame left→right.
- 3–7s: camera holds as dust hangs in the low light; grass swaying in the foreground.
- 7–10s: last elephant exits frame, sun cresting the acacia line; loop on grass sway + dust.
- Grade: savanna gold, acacia green-black, charcoal sky warming.

### 07 · design-07-backpack — "Night Train" (10s) — JOURNEYS section film (mid-page)
- 0–3s: looking out a night-train window, platform lights smearing past.
- 3–7s: the train finds rhythm; dark countryside with scattered village lights.
- 7–10s: a distant town glows on the horizon; loop on the light-smear rhythm.
- Grade: off-black, sodium marigold, teal glass reflection.

### 08 · design-08-spiritual — "A Thousand Flames" (10s) — HERO background
- 0–3s: rows of oil lamps at a riverside ghat at dusk, flames trembling.
- 3–7s: slow push-in through the lamps; mist rising off the dark water behind.
- 7–10s: hold on one lamp's flame, huge and steady; loop on flame tremble.
- Grade: marigold flame, ivory smoke, deep maroon-black dark.

### 09 · design-09-rail — "The Slow Line" (10s) — HERO background
- 0–3s: aerial tracking of a luxury train gliding through highland moors, morning mist.
- 3–7s: the train curves through the frame; steam/smoke trailing back over the carriages.
- 7–10s: the line straightens toward a distant viaduct; loop on the glide.
- Grade: Pullman green, brass-gold morning light, cream mist.

### 10 · design-10-journal — "Wind Script" (10s) — HERO background
- 0–3s: desert dunes, wind rippling the sand crests in real time.
- 3–7s: a lone traveler's silhouette walks the ridge line, small against the dune sea.
- 7–10s: the figure crests and the wind erases the footprints; loop on sand flow.
- Grade: film black shadows, warm cream sand, amber light-leak warmth.
