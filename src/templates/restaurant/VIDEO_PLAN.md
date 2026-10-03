# ATELIER · Restaurant — VIDEO_PLAN.md

One signature cinematic clip per design (6–10s, seamless-loop feel).
File: `assets/hero-loop.mp4` in each design folder. Poster: the design's
`assets/hero.jpg` (always present, always the fallback).

## Integration rules (binding)

- Use the shared `<LoopVideo src poster alt className>` from `../../_shared`
  (muted/autoplay/loop/playsinline, `preload="metadata"`, poster always,
  IntersectionObserver offscreen pause, reduced-motion → poster only,
  error → poster remains). Do NOT hand-roll video.
- Load the clip via dynamic `import('./assets/hero-loop.mp4')` in a
  `useEffect` (keeps the build green if the clip is missing); render
  `<Img>` poster until it resolves.
- Photorealistic, on-palette grade per design, no text, no watermarks,
  no visible faces (hands/process OK). Food must look delicious — if a clip
  looks cheap or plasticky, regenerate.

## Storyboards

### 01 · design-01-finedining — "The final touch" (8s) — HERO background
- 0–3s: extreme macro — chef's tweezers lower a single micro-herb toward a
  plated dish, near-black background, brass-warm side light.
- 3–6s: the herb lands; a drop of jus glistens as the plate rotates a
  fraction. Utterly still, utterly precise.
- 6–8s: settle on the finished plate, light breathing across the glaze;
  loop on the light.
- Grade: low-key chiaroscuro, ivory/brass highlights.

### 02 · design-02-trattoria — "Flames & the pan" (7s) — HERO background
- 0–2s: close on a pan hitting flame — fire licks up around pasta, warm
  tungsten kitchen.
- 2–5s: the toss — pasta arcs through flame in slow motion, sparks and
  steam.
- 5–7s: settle back to the pan, flame dying to embers; loop on ember glow.
- Grade: warm tungsten, hearty, appetizing.

### 03 · design-03-modernindian — "The tempering" (8s) — HERO background
- 0–3s: macro of hot oil — mustard seeds begin to pop, curry leaves
  unfurling, dark background.
- 3–6s: the tadka pours in a thin stream over dal, seeds crackling,
  oil shimmering.
- 6–8s: settle on the finished bowl, gentle steam; loop on steam drift.
- Grade: dramatic dark, ember-orange highlights.

### 04 · design-04-street — "The sizzle" (6s) — HERO background
- 0–2s: night street cart — batter hits the giant screaming-hot tawa,
  steam exploding outward.
- 2–4s: the dosa spreads and crisps, edges lifting, oil glistening.
- 4–6s: fold and lift, steam blast; loop on the steam.
- Grade: high-contrast night-market, chili-warm.

### 05 · design-05-omakase — "The single cut" (9s) — HERO background
- 0–3s: extreme macro — a yanagiba knife touches toro, the blade beginning
  its single draw. Vast calm.
- 3–7s: the cut completes in one motion, the slice separating with a
  glisten of fat.
- 7–9s: the slice laid on rice by fingertips; loop on stillness.
- Grade: minimal, precise, true color.

### 06 · design-06-farm — "Morning harvest" (8s) — HERO background
- 0–3s: hands in dark soil, pulling carrots — soil falling away, dew on
  greens, morning backlight.
- 3–6s: the bunch lifts into the light, droplets catching sun.
- 6–8s: settle into a wooden crate of greens; loop on leaf sway.
- Grade: fresh daylight, true greens.

### 07 · design-07-rooftop — "Golden pour" (8s) — HERO background
- 0–3s: amber cocktail pouring over a large ice cube, backlit by golden
  hour, city bokeh behind.
- 3–6s: the pour settles, smoke from a garnish curling up through the
  light.
- 6–8s: the finished drink, condensation, bokeh breathing; loop on the
  shimmer.
- Grade: golden-hour cinematic.

### 08 · design-08-patisserie — "The glaze" (7s) — HERO background
- 0–2s: glossy mirror glaze pouring over a small entremet, slow and
  luxurious, morning light.
- 2–5s: glaze cascades down the sides, pooling at the base.
- 5–7s: the finished glaze, perfect reflection; loop on the gloss.
- Grade: soft morning light, delicate.

### 09 · design-09-cloud — "Sealed with steam" (6s) — ORDER section film
- 0–2s: hands folding a delivery box at speed, steam bursting out as the
  lid closes.
- 2–4s: the "HOT" sticker slapped on, box sliding across the pass.
- 4–6s: box lifted into a delivery bag; loop on the handoff.
- Grade: bold, high-contrast, steam-forward.

### 10 · design-10-chefstable — "The reveal" (9s) — HERO background
- 0–3s: a cloche on a dark table, a hand approaching — theatre silence.
- 3–6s: the cloche lifts in slow motion, aromatic smoke billowing out
  across the frame.
- 6–9s: smoke clearing to reveal the glowing dish beneath; loop on smoke
  drift.
- Grade: theatrical dark, spotlight pool.
