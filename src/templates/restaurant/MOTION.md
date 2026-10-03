# ATELIER · Restaurant — Motion & Interaction Direction

Applies to: design-01-finedining … design-10-chefstable (React + Vite + GSAP + ScrollTrigger).
Companion docs: `REACT_TEMPLATE_CONTRACT.md` §5 (binding), `RESTAURANT_BRIEF.md`,
`BUILDER_GUIDE.md` (canonical GSAP pattern).

## 1. Category motion principles

The restaurant category's motion language is **appetite-first, tactile, paced
like a meal** — never gimmicky:

1. **Courses arrive like plates.** Default reveals are soft rises (`y: 32 → 0`,
   0.9s, `power3.out`) — a plate set down, not thrown.
2. **Steam and gloss.** Image reveals favor clip-path wipes (the cloche lift)
   and inner-image drift; product images bloom `scale 1.08 → 1`.
3. **One signature scroll mechanic per design** (assigned in §3) — the menu/dish
   flow. Everything else is quiet house grammar.
4. **Scrub, don't tick.** All scroll-driven motion via ScrollTrigger scrub.
   No raw scroll listeners. `scroller: scroller()` on every trigger.
5. **Pace by concept:** fine dining is slow, street food is fast, omakase is
   still. Speed is a design decision, not a default.
6. **Conversion beats choreography.** Reserve/order CTAs never wait on animation.

## 2. Technical contract (binding)

- `useLayoutEffect` + `gsap.context(..., rootRef)` + `revert()` cleanup.
- `scroller: scroller()` from `useTplScope()` on EVERY ScrollTrigger.
- `useReducedMotion()`: render final state; scrubbed/pinned/rAF effects OFF;
  state changes (tabs, filters, steps) still work, instantly or ≤0.3s fade.
- Pin gating: desktop pins via `gsap.matchMedia('(min-width: 768px)')`;
  mobile gets stacked/swipe-native layouts. Never pin on mobile.
- Animate transform/opacity only. Max one rAF loop per template; pause
  offscreen (`IntersectionObserver`) and on `document.hidden`.
- Initial states via GSAP `fromTo` only — never CSS that hides content
  (reduced-motion must show everything).

## 3. The 10 scroll-driven menu/dish flows

Each design owns ONE of these. They must not resemble each other, nor coffee's
10 mechanics (pinned horizontal rail, scrub zoom journey, snap carousel,
velocity marquee, sticky stacking cards, clip-morph gallery, 3D-tilt velocity
cards, pinned coverflow, chapter-synced rail, velocity-fling deck).

### M1 · 01 Lumière — "The seven veils" (curtain-lift course sequence)
Seven full-viewport course panels. Scrolling lifts a veil: each panel's
overlay wipes away with `clip-path: inset(0 0 100% 0) → inset(0)` scrubbed,
revealing the course beneath like a cloche lifted in slow motion. A Roman-
numeral counter (I/VII) tweens as panels change. Desktop: pinned sequence,
scrub 1. Mobile: stacked panels, veils become simple reveals. Reduced:
all courses visible, no veils.

### M2 · 02 Cucina Terra — "Lazy-susan orbit" (scroll-rotated dish ring)
A circular arrangement of 6 dish cards orbits a central table image as the
user scrolls — scrub rotates the ring (`rotation: 0 → 120`, transform-origin
center), each card counter-rotating to stay upright. The centered dish name
crossfades to whichever card passes the top marker. Desktop + mobile (no
pin — the ring lives in normal flow, scrubbed across its section).
Reduced: static ring, all cards visible.

### M3 · 03 Agni — "Elemental bands" (scroll-ignited chapter bands)
The menu is four full-width bands (Smoke / Earth / Fire / Ice). As each band
enters, its dishes ignite: an ember-glow edge sweeps across the band
(`clip-path` wipe + accent border draw, scrubbed), dish cards stagger-rise,
and the band's element glyph scales in. Bands alternate dark/light for
rhythm. Scrub 0.6. Reduced: bands static, all visible.

### M4 · 04 Chowk — "Direction-slam cards" (scroll-direction-reactive entries)
Crave-cards slam in from alternating sides based on scroll DIRECTION:
scrolling down → cards enter from the right with overshoot (`x: 120 → 0`,
`back.out(1.4)`, 0.5s); scrolling up → from the left. Track direction via
ScrollTrigger `onUpdate` (self.direction). Spice meters fill as their card
lands. Fast, punchy, never slow. Reduced: cards static.

### M5 · 05 Umi — "The counter serve" (conveyor service, pinned)
Pinned section (desktop): a fixed counter bar at the bottom; dishes travel
along it right → left as you scroll (scrub). Each dish PAUSES at center —
spotlit (scale 1.06, others dim to 0.5 opacity) — while its course note
fades in above; then it continues off. 6 dishes, one spotlight at a time.
Mobile: horizontal swipe strip, no pin. Reduced: static row, all visible.

### M6 · 06 Soil & Stem — "Season dial" (scroll-rotated menu control)
A large circular season dial (Spring/Summer/Autumn/Winter). Scrolling
rotates the dial (scrub, 90° per season); the menu below crossfades between
seasonal sets as the dial passes each detent — active season's dishes rise
in, previous season's sink out. The dial is the control; the menu obeys.
Reduced: four season tabs (click), no rotation.

### M7 · 07 Aurelia — "Focus-pull ascent" (depth-of-field dish reveal)
Cocktail/plate cards rise from below a "horizon" line as you scroll — each
card travels `y: 120 → 0` while its blur eases `blur(8px) → blur(0)` and
scale settles `1.04 → 1`, scrubbed per card. Like a camera finding focus
as the city rises to meet you. Stagger via individual triggers. Reduced:
sharp and still.

### M8 · 08 Butter & Bloom — "The glass case" (tiered shelf, Z-depth bloom)
Three glass shelves (tiers). Scrolling tilts the case subtly in perspective
(`rotationX: 8 → 0`, scrubbed) and the tier nearest viewport-center blooms
forward (`z: 0 → 60`, items scale 1.08) while others recede. A bake-time
flag pops on the focused tier. Desktop 3D via `transformPerspective`;
mobile: flat shelves, bloom only. Reduced: flat, static.

### M9 · 09 Hotbox — "Dispatch lanes" (scroll-accelerated order flow)
Three horizontal lanes (Biryani / Burger / Dessert). Scrolling accelerates
dish cards along their lane — `x` driven by scroll with an ease that
SPEEDS UP mid-lane (custom ease: slow start, fast middle, settle at end),
each card carrying a mini progress bar (kitchen → rider → door) that fills
with its travel. Lane labels count delivered items. Urgent, kinetic.
Reduced: static lanes.

### M10 · 10 Encore — "Act curtains" (theater curtain + spotlight)
The menu is three acts. Scrolling parts a two-panel curtain for each act —
panels wipe outward from center (`clip-path: inset(0 50%) → inset(0 0)`),
scrubbed — while a spotlight (radial-gradient mask... use a soft-edged
circular clip reveal, no literal gradient UI) opens on the act's featured
dish. Act title rises through a mask. One curtain per act, max drama.
Reduced: acts stacked, curtains open.

## 4. Per-design motion personalities

### 01 Lumière
Hushed, ceremonial. Hero: 0.6s black hold, then the plated dish wipes in
(1.8s `power4.inOut`), headline word-mask rise beneath. Reveals at 1.3s,
`y: 40`, no stagger — courses arrive one at a time. Numerals count I→VII
as veils lift. Hover: almost none — a slow 1.2s image zoom on course
photos. Reduced: fades only.

### 02 Cucina Terra
Warm, abundant. Hero: table image pour-wipes in, headline word-rise with
bounce-free `power3.out`. Reveals stagger generously (0.12) like dishes
landing on a table. Chalkboard panel: dish names draw in with a chalk-like
stagger. Hover: cards lift 4px, images warm-zoom. Reduced: static.

### 03 Agni
Bold, elemental. Hero: ember-glow edge sweeps the hero frame on load
(1s), headline slams with `power4.out` stagger 0.05. Element bands ignite
on scroll (§M3). Hover: dish cards get an ember underline draw. Reduced:
static, bands visible.

### 04 Chowk
Loud, fast. Hero: kinetic headline slam (0.6s, stagger 0.04), order pill
pops with `back.out(2)`. Everything 0.5–0.7s, `power2.out`. Direction-slam
cards (§M4). Hover: rows invert chili↔paper in 0.2s. Reduced: instant.

### 05 Umi
Still, reverent. Hero: single nigiri fades in over 1.6s, headline fades
0.6s later — no masks, no wipes near the hero. Counter serve (§M5) is the
only complex motion. Reveals are opacity-only, 1.4s, `sine.out`. Hover:
none on dishes (reverence); links underline-draw. Reduced: identical
minus serve motion.

### 06 Soil & Stem
Honest, growing. Hero: harvest image blooms in, headline rises like a
sprout (`y: 48 → 0`, 1.1s, `power2.out`). Season dial (§M6). Reveals with
a gentle `y: 28`. Farm notes fade in under dishes. Hover: images settle-
zoom 1.04. Reduced: dial becomes tabs.

### 07 Aurelia
Golden, cinematic. Hero: cocktail image wipes in with a warm edge light,
headline word-rise (stagger 0.08). Focus-pull ascent (§M7). Golden-hour
band: a thin champagne rule draws across as it enters. Hover: cocktail
cards lift with a soft glow (box-shadow, 0.4s). Reduced: sharp stills.

### 08 Butter & Bloom
Delicate, morning-soft. Hero: croissant cross-section fades in 1.4s,
headline in Marcellus rises gently. Glass case (§M8). Bake-schedule
timeline: items check in with a soft pop as they enter. Hover: pastries
get a 1.05 bloom. Reduced: flat shelves.

### 09 Hotbox
Urgent, app-snappy. Hero: box bursts open — image scales `1.1 → 1` fast
(0.7s), headline slams. Dispatch lanes (§M9). Tracker: 3 steps light up
scrubbed. Everything ≤0.6s. Hover: cards nudge 2px, buttons fill-sweep.
Reduced: instant.

### 10 Encore
Theatrical, dramatic. Hero: black hold 0.5s, cloche image wipes in,
smoke overlay drifts (slow, 20s yoyo — the one ambient loop, pauses
offscreen). Act curtains (§M10). Manifesto: single invert flash (0.15s,
once). Hover: playbill rows get a crimson edge draw. Reduced: no flash,
no drift, curtains open.

## 5. Reduced-motion baseline (binding, all designs)

1. All content renders in final state — nothing left at opacity 0.
2. Scrubbed/pinned/rAF → final or stacked state; tabs/filters/steps work
   instantly (≤0.3s fade allowed).
3. M6 dial → season tabs; M5 serve → static row; M1 veils → visible;
   M10 curtains → open; M4 slams → static; M9 lanes → static.
