# ATELIER · Hotel & Resort — Motion & Interaction Direction

**Applies to:** design-01-palace … design-10-noir (React + Vite + GSAP + ScrollTrigger).
**Companion docs:** `REACT_TEMPLATE_CONTRACT.md` §5 (binding), `HOTEL_BRIEF.md`, `BUILDER_GUIDE.md`.
**House grammar:** reuse coffee's primitives where they fit (`steamRise` reveals, `wordRise` masked headlines, `beanBloom`-style image settles, `pourWipe` clip wipes) — but every design's SIGNATURE room/gallery flow is new, invented for this category. None of coffee's 10 mechanics may repeat.

## 1. Category motion principles

Hotel motion is **cinematic, unhurried, and confident**. Light moves more than objects:
1. **Light first.** Reveals feel like light arriving — slow opacity + gentle y drift (y: 28, 1.1s, power3.out). Nothing pops.
2. **One signature flow per design.** The room/gallery mechanic (§3) is the star; everything else is quiet grammar.
3. **Booking never waits.** Dates, rates, CTAs render instantly; motion decorates around them.
4. **Timeline-based, one context, revert() cleanup.** `scroller: scroller()` on every ScrollTrigger (platform scrolls inside `.tpl-scope`).
5. **Reduced motion:** all flows degrade to fully-visible static layouts; no content hidden.

## 2. Technical contract (binding)

- `useLayoutEffect` + `gsap.context(..., rootRef)` + `return () => ctx.revert()`.
- `scroller: scroller()` from `useTplScope()` on EVERY ScrollTrigger.
- Gate pins behind `gsap.matchMedia('(min-width: 768px)')` (resize-safe); mobile = stacked/swipe.
- Animate transform + opacity only. Max one rAF loop per template, paused offscreen.
- `useReducedMotion()` → skip all signature flows; render static final state.

## 3. The 10 signature room/gallery flows (all new)

### 01 · design-01-palace — "Grand curtain reveal"
Pinned section; suites revealed one by one by a theatrical double-curtain clip-path wipe: top and bottom panels retract symmetrically (`inset(0 0 50% 0)` + `inset(50% 0 0 0)` → `inset(0)`), scrubbed across the pin. Suite name rises masked beneath. Mobile: stacked, simple fade.

### 02 · design-02-beach — "Tide-wash dissolve"
NO pin. A tall section maps vertical scroll to image index: images crossfade with a soft horizontal drift (x: 40→0) and blur 6px→0, like tide washing in. ScrollTrigger scrub across the section, `onUpdate` sets active index (throttled by scrub itself). Reduced: all images stacked visible.

### 03 · design-03-urban — "Spotlight grid"
Strict 3×2 room grid; as each row enters, ScrollTrigger batch spotlights the "active" room (scale 1→1.02, others dim to 0.55 opacity + saturate 0.6) with a mono index label ("03 / 06"). Scrolling moves the spotlight. Hover overrides to full. Distinct from coffee: focus-dimming, not motion.

### 04 · design-04-lodge — "Hearth fan"
Room cards start stacked like firewood (rotated ±8°, overlapping); a scrubbed timeline fans them into an arc (rotation → 0, x spread, y settle) as the section scrolls through. Scrub 1, no pin (or short pin on desktop). Reduced: fanned final state.

### 05 · design-05-haveli — "Jharokha window pan"
A wide panoramic strip (300vw) of courtyard imagery; an arch-shaped mask (border-radius top) acts as the "window" — scrolling pans the strip behind the fixed arch window (x: 0 → -(strip - viewport), scrubbed, pinned on desktop). Like looking through a palace window. Mobile: native horizontal swipe.

### 06 · design-06-eco — "Canopy descent"
Vertical multi-depth parallax: three layers (foreground leaves silhouette, room cards, background mist) move at 1.4x / 1.0x / 0.6x scroll speed via scrubbed yPercent. Feels like descending through canopy. Room cards are the middle layer. No pin — pure scroll-speed differential.

### 07 · design-07-business — "Split-flap board"
Room index styled as a departure board; when a room row enters viewport, its name/rate "flips" in with a split-flap effect: two-half clip animation (top half rotateX 90→0) + a soft click-like scale pulse. Triggered per-row via ScrollTrigger once. Fast, confident, ≤0.5s each.

### 08 · design-08-spa — "Breath gallery"
Program images scale with scroll direction: scrolling down = inhale (scale 1→1.04, 1.2s sine), scrolling up = exhale (back). Implemented via ScrollTrigger onUpdate direction detection driving a gsap tween (not raw scroll ticks). Plus a 6s ambient sine loop when idle. Reduced/idle-off: static.

### 09 · design-09-villas — "Estate map journey"
Stylized SVG estate map; a marker travels along a path (`motionPath`-free: use strokeDashoffset progress + `getPointAtLength` for marker position) scrubbed through a pinned section; villa cards highlight in sequence as the marker reaches their nodes. Desktop pin; mobile: static map + stacked cards.

### 10 · design-10-noir — "Filmstrip noir"
Vertical filmstrip: tall cinematic frames with sprocket-hole edges advance as you scroll (y translation scrubbed, frames entering with a light-leak sweep — a diagonal gradient overlay wiping 0.6s). Grain overlay static (opacity only). Reduced: stacked frames, no leaks.

## 4. Per-design animation personalities

- **01 palace:** Ceremonial. Hero: façade image slow scale 1.08→1 over 2.5s + gold rule draw + masked word-rise. Section transitions: curtain motif reused small.
- **02 beach:** Breathing. Hero: single 1.8s fade. Everything opacity-only, durations ≥1.4s, sine.out.
- **03 urban:** Kinetic-sharp. Hero: headline slams (stagger 0.04, power4.out). Fast reveals (0.6s). High-contrast hovers.
- **04 lodge:** Hearth-warm. Hero: warm windows glow-in (opacity 2s). Reveals 1.2s power2.out. Card hovers: 4px lift.
- **05 haveli:** Ornate-slow. Hero: courtyard fade 2s + arch mask scale-in. Pattern dividers draw via SVG dashoffset.
- **06 eco:** Layered-organic. Hero: mist drift (slow x yoyo 24s, pauses offscreen). Reveals 1.1s.
- **07 business:** Instrument-fast. Hero: blue-hour image + counting stat ticks. Reveals 0.7s. Numbers tween.
- **08 spa:** Breath-slow. Hero: still water, 2s fade, one line of copy. Slowest reveals (1.5s).
- **09 villas:** Discreet-luxe. Hero: aerial slow zoom 1.06→1 over 3s. Map draws on enter.
- **10 noir:** Film-dark. Hero: light-shaft gradient sweep + word-rise. Invert flash once at manifesto (0.15s, 8% — rare).

## 5. Reduced-motion & performance

Same policy as coffee §5–§6: final-state rendering, one rAF max, one pin max per template, `once: true` reveals, offscreen pause. QA greps: no ScrollTrigger without `scroller()`, `ctx.revert()` present.
