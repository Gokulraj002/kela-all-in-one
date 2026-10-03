# ATELIER · Saree & Fashion — Motion & Interaction Direction

**Author:** Motion Director + Video Planner (subagent). **Phases 3–4: animation planning.**
**Applies to:** design-01-heritage … design-10-avant (React + Vite + GSAP + ScrollTrigger).
**Companion docs:** `REACT_TEMPLATE_CONTRACT.md` §5 (binding), `FASHION_BRIEF.md` (per-design interactions), `BUILDER_GUIDE.md` (canonical GSAP pattern).
**Constraint:** none of coffee's 10 scroll mechanics may be reused (no pinned horizontal
rail, scrub-linked zoom journey, snap carousel, velocity-reactive marquee, sticky
stacking cards, clip-morph gallery, 3D-tilt velocity cards, pinned coverflow,
chapter-synced rail, velocity-fling deck). Every mechanic below is invented for this
category.

## 1. Category motion principles

The fashion category's motion language is **textile-first — cloth behaves like cloth**.
Every design shares these instincts; personality differs in *what moves, how far, and
how fast*:

1. **Fabric falls, never pops.** Default reveals settle like draped cloth — a soft
   downward settle (`y: -28 → 0`) or a hem lifting in breeze (`y: 32 → 0`), eased
   `power3.out`. Nothing scales up from zero unless it is unfolding.
2. **Folds open, never cut.** Full-bleed image changes and section transitions unfold
   from a fold line (clip-path opening), not hard cuts or diagonal slashes.
3. **Threads draw the eye.** SVG thread strokes draw across the page to lead the eye
   between sections — `strokeDashoffset` only, eased `power2.inOut`.
4. **Palette is a chapter.** Color stories shift with scroll — backgrounds, tints, and
   accents cross-tint per chapter rather than snapping between sections.
5. **Luxury is restraint.** Maximum one *signature* motion per design (assigned in §4).
   Everything else is the quiet house grammar in §3. If two effects compete for the
   eye, cut one.
6. **Conversion beats choreography.** Size chart, price, add-to-bag, and boutique
   address never wait on animation. Motion yields to tap targets and mobile scroll
   physics.
7. **Everything timeline-based.** No animation spaghetti: one `useLayoutEffect`, one
   `gsap.context`, named timelines, `revert()` cleanup. Never animate on raw scroll
   events — ScrollTrigger or rAF only.

## 2. Technical contract for motion code

Binding for every builder (extends `BUILDER_GUIDE.md`):

- **Scroller.** The platform scrolls inside `.tpl-scope`, NOT `window`. Every
  ScrollTrigger MUST pass `scroller: scroller()` from `useTplScope()`. No exceptions.
- **Lifecycle.** Motion lives in `useLayoutEffect` under `gsap.context(() => {...}, rootRef)`,
  returned cleanup `() => ctx.revert()`. Register `ScrollTrigger` once per template.
- **Reduced motion.** Gate with `useReducedMotion()` (from `../../../_shared`). When true:
  run only the §5 fallback path — static fully-visible layout, CSS `.rv` fades, all
  scrubbed/pinned/thread/marquee effects OFF, timelines replaced by instant state or
  single 0.3s opacity.
- **Mobile pin-gating.** Every pinned mechanic in §4 is gated with
  `gsap.matchMedia()` at `(min-width: 768px)`. Below 768px: no pins, stacked static
  layouts with `drapeSettle` reveals (or fully static under reduced motion).
- **Pause offscreen work.** Use `toggleActions: 'play none none reverse'` for reveals;
  `ScrollTrigger` with `once: true` where no reverse is needed. Ambient loops (sway,
  pulse) pause when offscreen via IntersectionObserver and on `document.hidden`.
  ScrollTriggers must not hold listeners for far-away sections: set `start: 'top 88%'`.
- **Performance.** Animate transform and opacity only (no width/height/top/left/filter
  tweens). The drape-simulator's SVG path redraw is the single allowed exception —
  one `<path>` `d` rewrite per scrub tick, inside the ScrollTrigger `onUpdate`.
  Limit `will-change` to actively animating elements; clear it on complete.
  Clip-path unfolds are composited cheaply in Chromium; keep the animated region
  full-bleed or card-sized and the duration ≥ 0.8s.
- **Class grammar.** Builders use these hook classes in JSX so motion selectors stay
  consistent: `.rv` (default reveal), `.rv-mask` (word-masked headline), `.rv-img`
  (image unfold frame), `.rv-stagger` (children stagger group), `.pin-scene`
  (pinned container), `.draw-path` (SVG thread draw), `.parallax-layer`,
  `.pleat-card` (fold cards), `.look-runner` (runway crossing figures),
  `.tape-rail` (tailor's measure), `.swatch-band` (dye swatches),
  `.thread-stage` (avant thread looks).

---

## 3. Primitive catalog — named, reusable animations

Builders implement these 8 primitives identically across designs. Parameters are options
objects; unspecified values fall back to the house defaults shown.

### 3.1 `drapeSettle(targets, opts)`
Cloth-like settle — the default content reveal.
```
drapeSettle('.rv', {
  y: -28,            // px start offset (falls into place like draped cloth)
  opacity: [0, 1],
  duration: 1.0,
  ease: 'power3.out',
  stagger: 0.08,    // per-target, use with .rv-stagger children
  start: 'top 88%',  // ScrollTrigger start
  once: true
})
```
- Implementation: `gsap.fromTo` + per-target ScrollTrigger with `scroller: scroller()`.
- Usage note: the only reveal most designs use by default. Reduced-motion: skip,
  leave `.rv` visible.

### 3.2 `foldUnfold(targets, opts)`
Pleat-style unfold from a fold line — for images and section transitions.
```
foldUnfold('.rv-img', {
  from: 'inset(0% 0% 100% 0%)',  // opens downward from the top fold line
  to: 'inset(0% 0% 0% 0%)',
  duration: 1.2,
  ease: 'power4.inOut',
  innerDrift: 6                  // % inner img translate-y during unfold
})
```
- Implementation: clip-path tween on the frame + slight counter-drift of the inner
  image. `overflow: hidden` on frame; inner img scale 1.06.
- Usage note: 01 gallery, 06 look reveals, 08 fitting-room panels. Keep to one
  unfold per viewport.

### 3.3 `threadDraw(paths, opts)`
Thread-line SVG draws that lead the eye between sections.
```
threadDraw('.thread-svg .draw-path', {
  duration: 2.0,
  ease: 'power2.inOut',
  stagger: 0.2,
  needleAt: 0.85,     // needle/dot marker rides the path head at 85%
  needle: '.thread-needle'
})
```
- Implementation: set `strokeDasharray = length` via `getTotalLength()`, tween
  `strokeDashoffset` to 0; a small needle dot follows via `MotionPathPlugin`-free
  manual interpolation (sample `getPointAtLength` in `onUpdate` — cheap, one dot).
- Usage note: 01 chapter dividers, 10 collection stitching. Paths must have real,
  flowing geometry — no straight rulers.

### 3.4 `weftWipe(targets, opts)`
Weave-band wipe — horizontal bands sweep across like a shuttle pass.
```
weftWipe('.weft-frame', {
  bands: 5,            // number of horizontal bands in the wipe
  duration: 1.4,
  ease: 'power3.inOut',
  direction: 1         // 1 = left→right shuttle, -1 = right→left
})
```
- Implementation: build the wipe from `bands` stacked divs whose `scaleX` tweens
  `0→1` staggered — transform-only, no per-band clip-path. Bands share one
  overflow-hidden frame.
- Usage note: 09 festive reveals, 04 collection swaps. Band count fixed per design
  (do not restyle per breakpoint).

### 3.5 `hemSway(targets, opts)`
Ambient fabric sway — the category's only ambient loop.
```
hemSway('.sway-img img', {
  x: 10,             // px drift
  rotate: 0.6,       // deg — barely-there
  duration: 6,
  yoyo: true,
  repeat: -1,
  ease: 'sine.inOut'
})
```
- Implementation: single rAF-free GSAP yoyo tween; paused offscreen via
  IntersectionObserver and on `document.hidden`. Max one per template.
- Usage note: 02 hero drape, 03 dupatta drift. Reduced-motion: off, static image.

### 3.6 `pleatStagger(targets, opts)`
Folded-card cascade — cards arrive with alternating slight folds.
```
pleatStagger('.pleat-card', {
  rotate: 2.5,       // deg, alternates sign per card (folded-paper feel)
  y: 40,
  duration: 0.9,
  ease: 'power3.out',
  stagger: 0.1,
  start: 'top 85%'
})
```
- Implementation: `gsap.fromTo` per card with `rotation: i % 2 ? r : -r`. Cards sit
  in normal flow — never combined with a scrubbed unfold on the same element.
- Usage note: 02 product rows, 07 designer cards.

### 3.7 `tintChapter(container, opts)`
Scroll-scrubbed palette shift for color-story sections.
```
tintChapter('.tint-scene', {
  chapters: '.tint-chapter',   // each chapter declares --tint-from/--tint-to
  scrub: 1,
  onChapter: (i) => {}         // callback to swap chapter copy/imagery
})
```
- Implementation: one ScrollTrigger, `scrub: 1`; progress cross-tints CSS custom
  properties on the container (`gsap.to` on CSS vars — no layout cost) and toggles
  `.is-active` per chapter. All DOM writes inside the scrub callback; no React
  state per tick (use refs).
- Usage note: 03 bridal color story. Reduced-motion: each chapter keeps its own
  static tint.

### 3.8 `lookPass(container, opts)`
Runway crossing — figures walk across the viewport on scrub.
```
lookPass('.runway-scene', {
  runners: '.look-runner',   // each runner: { depth, speed } via data attrs
  scrub: 0.8,
  lanes: 3                    // depth lanes: near (fast), mid, far (slow)
})
```
- Implementation: one ScrollTrigger, `scrub: 0.8`; each `.look-runner` tweens
  `x` from `110vw → -110vw` scaled by its depth lane (near lanes travel farther
  and blur slightly). Runners are garment-cropped figures — no faces. Loop-neutral:
  runners start/end fully offscreen.
- Usage note: 04 street runway only. Reduced-motion: runners parked as a static
  grid.

---

## 4. Per-design animation personalities

Each design gets ONE signature scroll-driven collection-flow mechanic. The rest is
house grammar from §3, tuned per design. Every design lists: personality, hero
entrance, scroll reveals, image treatment, signature collection flow, hover/micro-
interactions, section transitions, reduced-motion fallback, and primitives used.

### design-01-heritage — Heritage Handloom House
- **Personality:** Museum-warm craft. Motion feels like handling cloth on a loom —
  deliberate, rhythmic, hand-paced. Nothing is fast; nothing is slick.
- **Hero entrance:** Handloom image `foldUnfold`s down from the top fold (1.6s) while
  the house name `wordRise`s via `.rv-mask` (stagger 0.09). A single weft thread
  `threadDraw`s beneath the headline (1.8s). Total ≤ 2.8s.
- **Scroll reveals:** `drapeSettle` at 1.2s with generous stagger (0.12) — warp and
  weft alternating leads, like alternating shuttle passes.
- **Image treatment:** Gallery frames `foldUnfold`; dye-vat imagery gets the warmest
  grade and a slow `hemSway` on the hero only.
- **Signature collection flow — pageturnLookbook:** a pinned lookbook (≥768px via
  `gsap.matchMedia`) of 4 craft chapters (Loom → Dye → Weave → Drape). Scroll
  advances pages with a fabric page-turn: outgoing page wipes via a corner-anchored
  clip-path sweep (`polygon` corner sweep, 1s, `power4.inOut`) while the incoming
  page settles with `foldUnfold`; a weft thread `threadDraw`s along the page foot
  between chapters. One ScrollTrigger, `scrub: 0.6`, `end: '+=300%'`, all DOM writes
  in the scrub callback. Mobile (<768px): chapters stack with `foldUnfold` reveals,
  no pin.
- **Hover/micro:** Weaver-profile rows — hover draws a thread underline (CSS, 0.4s);
  craft-step tabs crossfade 0.5s. Fabric swatch chips bloom (`scale 1→1.12`, 0.4s)
  on hover.
- **Section transitions:** Woven dividers — a thin double-rule with a shuttle dot
  that `threadDraw`s across once per section entry.
- **Reduced motion:** Pages stack statically, all chapters visible; thread dividers
  render fully drawn; no pin.
- **Primitives:** `foldUnfold`, `drapeSettle`, `threadDraw`, `hemSway`.

### design-02-minimal — Modern Minimalist Label
- **Personality:** Still air. The quietest design in the category — motion is the
  absence of motion, broken only by fabric obeying gravity.
- **Hero entrance:** A single length of pale fabric settles (`drapeSettle`, `y: -40`,
  1.8s, `sine.out`) over a static frame; headline fades in 0.8s later (opacity
  only). No mask, no wipe. `hemSway` begins on the hero drape after entrance.
- **Scroll reveals:** `drapeSettle` overridden long — 1.4s, `sine.out`, stagger 0 —
  pieces arrive one at a time, centered, never in cascades.
- **Image treatment:** No unfolds, no wipes. Product images simply settle. The look
  gallery is a slow crossfading pair (7s interval, 2.5s crossfade).
- **Signature collection flow — pleatUnfold:** a pinned pleat wall (≥768px via
  `gsap.matchMedia`) — 4 pleat-cards folded shut (`scaleY: 0.08`, origin center)
  unfold sequentially (`scaleY → 1`, 0.9s each, `power4.inOut`) as scroll scrubs
  through `end: '+=250%'`, each pleat revealing one look; the pleat's fold line
  stays visible as a hairline seam. One ScrollTrigger, `scrub: 0.8`, transform-only.
  Mobile: pleats render fully open in a static stack with `drapeSettle` reveals.
- **Hover/micro:** Almost none. Product rows get a 0.5s opacity underline on hover;
  the size-guide trigger fades in a panel (0.4s). No zooms, no lifts.
- **Section transitions:** None — sections breathe through whitespace.
- **Reduced motion:** Identical to the full path minus `hemSway`; pleats open.
- **Primitives:** `drapeSettle`, `hemSway`. Deliberately the smallest set.

### design-03-bridal — Bridal Couture
- **Personality:** Ceremonial and luminous. Motion moves like a dupatta in still
  air — slow arcs, glowing edges, color as the main event.
- **Hero entrance:** Lehenga-hem image `foldUnfold`s (1.6s) while gold-dust particles
  (12 CSS dots, opacity-only twinkle, paused offscreen) settle; headline `wordRise`
  stagger 0.08 with a champagne shimmer on the final word (CSS gradient shift,
  2s, once).
- **Scroll reveals:** `drapeSettle` at 1.1s; embroidery macros `foldUnfold` with a
  longer inner drift (10%) so thread detail seems to pour in.
- **Image treatment:** `weftWipe` (bands 4) for lehenga↔dupatta↔embroidery swaps;
  dupatta imagery gets a slow `hemSway` (the category's second sway allowance).
- **Signature collection flow — colorChapters:** `tintChapter` across 4 color-story
  chapters (Ivory → Blush → Gold → Crimson), pinned ≥768px (`gsap.matchMedia`,
  `end: '+=350%'`, `scrub: 1`): the whole scene cross-tints per chapter while
  chapter imagery crossfades and a dupatta edge drifts through frame. Progress
  shown as 4 silk-thread dots that fill as chapters activate. Mobile: chapters
  stack, each keeping its own static tint, no pin.
- **Hover/micro:** Trousseau builder options — selecting a silhouette crossfades the
  preview (0.5s) and tweens the price numerically (`snap: 1`, 0.6s). Embroidery
  swatches bloom on hover.
- **Section transitions:** Chapter boundaries use a full-viewport `weftWipe` of the
  incoming art — the story's page-turn.
- **Reduced motion:** No pin; chapters stack with their static tints; imagery swaps
  instantly; price updates without tween.
- **Primitives:** `foldUnfold`, `drapeSettle`, `weftWipe`, `tintChapter`, `hemSway`.

### design-04-street — Streetwear Fusion
- **Personality:** The loud one. Concrete, flash, lookbook velocity. Fastest motion
  in the category — fabric snaps, type hits, the city smears behind.
- **Hero entrance:** Kinetic headline slams in (`wordRise` via `.rv-mask`, hard
  `power4.out`, stagger 0.04, 0.7s total) plus a 2px chromatic text-shadow snap on
  the final word; fabric-snap image `weftWipe`s fast (bands 6, 0.6s). CTA pill pops
  (`scale 0.9→1`, `back.out(2)`, 0.5s, delay 0.4).
- **Scroll reveals:** `drapeSettle` overridden fast — `y: -20`, 0.6s, `power2.out`.
  Sections snap, not drift.
- **Image treatment:** Hard `weftWipe` reveals (0.6s); look cards get high-contrast
  hover invert instead of image motion.
- **Signature collection flow — runwayWalk:** `lookPass` across a pinned runway
  (≥768px via `gsap.matchMedia`, `end: '+=300%'`, `scrub: 0.8`): garment-cropped
  runners cross the viewport in 3 depth lanes — near lane fast with slight motion
  smear (2px blur via SVG filter is banned; simulate with duplicated offset ghost
  at 30% opacity), far lane slow — while a fixed camera frame holds the collection
  name. Center-stage look pauses mid-crossing at 50% scroll for its name card, then
  continues. Mobile: runners parked as a static lookbook grid, no pin.
- **Hover/micro:** Drop-countdown rows invert (bg↔text) in 0.2s; quick-add buttons
  fill-sweep 0.25s; size chips toggle with a 0.25s background fill.
- **Section transitions:** Full-bleed ink-block wipes between drops — a solid panel
  sweeps across (0.5s, `power3.inOut`) as content snaps in. Max twice per page.
- **Reduced motion:** Runway static grid; headline appears without slam; wipes
  become cuts; hovers keep instant color change.
- **Primitives:** `weftWipe`, `drapeSettle` (fast override), `wordRise` (via
  `.rv-mask`), `lookPass`. **Hardest:** the mid-crossing pause + lane parallax —
  see report note.

### design-05-slow — Sustainable Slow Fashion
- **Personality:** Earth-paced. Motion follows natural processes — dye blooming in
  water, cloth breathing, seasons turning. Nothing hurries.
- **Hero entrance:** Cotton-field image fades in over 2s (opacity only); the
  "grown, not made" line `drapeSettle`s at 1.2s; headline `wordRise` stagger 0.1.
- **Scroll reveals:** `drapeSettle` with the longest durations (1.3s, `sine.out`) —
  everything arrives like dye spreading through water.
- **Image treatment:** Dye-vat imagery crossfades slowly (3s) between indigo/madder/
  turmeric states on a 9s interval (paused offscreen); block-print macros
  `foldUnfold`.
- **Signature collection flow — swatchAccordion:** a pinned dye-journey (≥768px via
  `gsap.matchMedia`, `end: '+=300%'`, `scrub: 0.8`) of 4 swatch-bands (Indigo vat →
  Madder root → Block print → Cotton field). The active band's detail panel
  expands via `scaleY 0→1` (origin top, transform-only accordion illusion) while
  inactive bands compress to thread-thin strips; a dye-bloom dot marks the active
  stage on a side rail. All DOM writes in the scrub callback. Mobile: all bands
  expanded and stacked, rail static.
- **Hover/micro:** Impact counters (litres saved, artisans paid) tick up on entry
  (`snap: 1`, 1.5s). Maker cards `drapeSettle` with a hand-drawn underline on
  hover (CSS).
- **Section transitions:** Watercolor-bleed dividers — a soft radial tint that
  blooms in (opacity, 1.2s) between process and collection.
- **Reduced motion:** All bands expanded and stacked; counters show final values;
  dye crossfades instant.
- **Primitives:** `drapeSettle`, `foldUnfold`, `threadDraw` (side rail).

### design-06-silk — Luxury Silk Maison
- **Personality:** Liquid luxury. Dark, champagne-lit, museum-spaced. Motion is the
  slowest deliberate in the category and always symmetrical — silk pours, shimmers,
  settles.
- **Hero entrance:** Near-black frame holds 0.6s, then silk-pour image `foldUnfold`s
  over 1.8s while a single line of copy `wordRise`s beneath; zari thread count
  ("1,200 zari threads") ticks in (`snap: 1`, 1.5s). Total ≤ 3.5s.
- **Scroll reveals:** `drapeSettle` at 1.4s, `y: -36`, stagger 0 — museum pieces
  arrive one at a time, centered.
- **Image treatment:** Product parallax — flagship silk drifts `yPercent: -6`
  scrubbed across its section (the category's single parallax allowance);
  `foldUnfold` (1.6s) on collection pieces.
- **Signature collection flow — drapeSim:** a pinned silk panel (≥768px via
  `gsap.matchMedia`, `end: '+=300%'`, `scrub: 1`) carrying an SVG drape wave whose
  **amplitude is tied to scroll progress** — a `wave = { amp: 8 }` object tweened
  `8 → 46 → 14` across the scrub while a champagne sheen gradient translates
  across the silk and zari flecks (opacity-only dots) brighten with amplitude.
  Path `d` is rebuilt from the wave function in `onUpdate` (the category's one
  allowed per-tick DOM write, single `<path>`). Caption: "Scroll to pour the silk."
  Mobile: static mid-amplitude drape, no pin.
- **Hover/micro:** Almost none. Silk pieces get a 1.2s slow zoom (`scale 1→1.06`)
  on hover; the private-client email field gets a gold thread underline draw on
  focus.
- **Section transitions:** Fade-to-black beats — 0.8s black overlay dips between
  Maison → Collection → Atelier, like film cuts. Max two per page.
- **Reduced motion:** Static drape at mid amplitude; fades only; counter shows
  final number; no parallax.
- **Primitives:** `foldUnfold`, `drapeSettle`, `threadDraw` (underline). **Hardest:**
  the scroll-driven wave redraw — see report note.

### design-07-boutique — Multi-Designer Boutique
- **Personality:** Gallery-host. Warm, conversational, rack-density without clutter.
  Motion orients — you always know which designer rail you're on.
- **Hero entrance:** Promise headline `wordRise` (stagger 0.07), then the designer
  index card `drapeSettle`s with a soft repeating glow pulse on its border (2.5s
  loop, pauses offscreen) — the most-tapped element earns the only loop.
- **Scroll reveals:** Standard `drapeSettle` (1s) for designer cards with
  `pleatStagger` on card rows (alternating 2° folds).
- **Image treatment:** `foldUnfold` on atelier-detail macros; rack imagery uses the
  mirror-column drift below.
- **Signature collection flow — mirrorColumns:** a pinned designer-rail section
  (≥768px via `gsap.matchMedia`, `end: '+=280%'`, `scrub: 0.8`): two garment-rack
  columns scroll in **opposite directions** on the same scrub — left rack drifts up
  (`y: 0 → -40%`) while right rack drifts down (`y: 0 → 40%`) — mirrored around a
  static center column of designer names that highlight as their rack passes the
  center line. Transform-only, one ScrollTrigger. Mobile: single static rack
  column, names list above.
- **Hover/micro:** Designer rows lift 3px + thread-underline draw (0.35s); selected
  designer stamps a silk-check badge (`scale 1.3→1`, 0.3s, `back.out(3)`).
  Appointment sheet slides up on mobile (0.5s `power4.out`).
- **Section transitions:** Rack-to-atelier uses a `weftWipe` (bands 4, 1s).
- **Reduced motion:** Columns static; names all visible; sheet appears without
  slide; no glow pulse.
- **Primitives:** `drapeSettle`, `pleatStagger`, `foldUnfold`, `weftWipe`.

### design-08-tailor — Menswear Tailoring
- **Personality:** Instrument-precise craft. Motion is measured — literally. Every
  movement reads like a tailor's hand: chalk, cut, stitch, press.
- **Hero entrance:** Shears-and-chalk image `foldUnfold`s (1.2s); the house rule
  ("Cut once. Cut right.") `wordRise`s fast (stagger 0.05); a tape-measure line
  `threadDraw`s across the hero foot.
- **Scroll reveals:** `drapeSettle` short and snappy (0.8s, `power2.out`) — utility
  rhythm.
- **Image treatment:** Needle/thread macros `foldUnfold`; pressing-steam imagery
  gets a slow upward drift (`yPercent: -8` scrubbed — the category's second
  parallax allowance, steam rises).
- **Signature collection flow — tapeRail:** a vertical **measurement-tape rail**
  pinned along the section edge (≥768px via `gsap.matchMedia`, `end: '+=320%'`,
  `scrub: 1`): the tape unrolls downward (`scaleY 0→1`, origin top) with printed
  tick marks, and as its leading edge passes each of 5 stage markers (Measure →
  Cut → Stitch → Press → Fit), that stage's card activates — chalk outline draws
  around the card (`threadDraw` on its border path) and its detail `drapeSettle`s
  in. Progress readout shows the "measurement" in cm, tweened (`snap: 1`).
  Mobile: tape rendered fully unrolled beside stacked stage cards, no pin.
- **Hover/micro:** Fabric-book swatches fan on hover (rotate spread, 0.4s);
  appointment slots toggle with a chalk-circle draw (SVG, 0.5s). Fit-checklist
  items strike through with a thread line on complete.
- **Section transitions:** Chalk-line dividers — a dashed rule that draws across
  (`threadDraw`, 0.8s) between craft and booking.
- **Reduced motion:** Tape fully unrolled; all stages visible and active; readout
  shows final cm.
- **Primitives:** `foldUnfold`, `drapeSettle` (fast override), `threadDraw`.
  **Hardest:** syncing tape edge to stage thresholds — see report note.

### design-09-festive — Festive Ethnic Wear
- **Personality:** Celebration in motion. Saturated, warm, generous — color does the
  talking and the page keeps up. The most chromatic design in the category.
- **Hero entrance:** Marigold-and-light image `weftWipe`s in (bands 5, 1s) while
  the headline `wordRise`s (stagger 0.07); a string of festival lights (CSS dots)
  twinkles in with staggered opacity (paused offscreen).
- **Scroll reveals:** `drapeSettle` at 0.9s with warm stagger (0.1) — generous,
  abundant cascades.
- **Image treatment:** `weftWipe` for color-story swaps (magenta → marigold →
  emerald); twirl imagery gets the category's third `hemSway` (slow, 8s).
- **Signature collection flow — weaveReveal:** a pinned section (≥768px via
  `gsap.matchMedia`, `end: '+=300%'`, `scrub: 1`) opens **covered by a woven SVG
  overlay** — warp threads (`draw-path` verticals) draw across first (0→40% of
  scrub), then colored weft bands fill in band by band (40→80%), and finally the
  whole weave lifts away (`opacity → 0`, 80→100%) revealing the festive collection
  beneath, fully revealed like cloth off the loom. One ScrollTrigger; overlay is a
  single SVG, pointer-events none. Mobile: weave renders complete then static
  (or skipped — collection visible), no pin.
- **Hover/micro:** Color-filter chips burst-fill with their color (0.3s); look cards
  get a festive lift (4px + warm shadow, 0.35s). "Shop the look" buttons shimmer
  (CSS gradient sweep on hover only).
- **Section transitions:** Petal-fall divider — marigold dots drift down once per
  section entry (opacity/transform, 1.2s, `once: true`).
- **Reduced motion:** Weave overlay hidden; collection fully visible; twinkles off;
  filters switch instantly.
- **Primitives:** `weftWipe`, `drapeSettle`, `threadDraw` (warp threads),
  `hemSway`.

### design-10-avant — Experimental Avant-Garde
- **Personality:** The gallery piece. Stark light, theatrical scale, wind. The only
  design where motion is allowed to be *strange* — but never broken. Daring within
  the category's textile warmth.
- **Hero entrance:** Full-bleed wind-blasted fabric `weftWipe`s in from the left
  (inverted direction, 1.6s) while the cryptic headline `wordRise`s with exaggerated
  stagger (0.12). A stark single-source light bar sweeps once (opacity, 1s).
- **Scroll reveals:** `drapeSettle` with unusual easings — `expo.out` on headlines,
  `sine.inOut` on body — and alternating x-offsets (±48px) for lab-asymmetry.
- **Image treatment:** Full-bleed imagery with slow continuous drift — 20s
  `yPercent ±4` yoyo on hero and runway sections (pauses offscreen; the category's
  only ambient drift). Look images arrive via `foldUnfold` with a hard `expo.out`.
- **Signature collection flow — threadPath:** a pinned "stitched collection" (≥768px
  via `gsap.matchMedia`, `end: '+=350%'`, `scrub: 1`): a **single crimson thread**
  (one SVG path threading through 5 `.thread-stage` look frames in order) draws
  itself across the scrub; as the thread head reaches each frame, that frame's
  border stitches in (`threadDraw` on the frame path) and the look settles with a
  sharp `drapeSettle`. The thread's needle dot rides the path head (sampled via
  `getPointAtLength`). One ScrollTrigger, all DOM writes in the scrub callback.
  Mobile: all 5 looks visible, thread fully drawn and static, no pin.
- **Hover/micro:** Unconventional cursor — a needle-ring that lerps after the
  pointer (rAF, lerp 0.15) and elongates over interactive elements (desktop only,
  hidden on touch/reduced-motion). Manifesto section arrives with a single 0.15s
  light-flash at 8% opacity — used exactly once.
- **Section transitions:** Stark cut to black between acts (instant under a 0.2s
  fade) — theatrical blackouts, max two per page.
- **Reduced motion:** No cursor, no drift, no flash; thread fully drawn; looks
  static.
- **Primitives:** `weftWipe` (inverted), `wordRise` (via `.rv-mask`),
  `drapeSettle` (alternating offsets), `threadDraw`, `foldUnfold`. **Hardest:**
  the needle dot riding the path head — see report note.

---

## 5. Reduced-motion policy (category baseline)

When `useReducedMotion()` is true, every design MUST:

1. Render all content in final state — no element left at `opacity: 0`, translated,
   folded, or covered. (Builders: set initial states via GSAP `fromTo`, never via
   CSS that hides content. Pleats render open; tapes unrolled; weaves lifted;
   threads fully drawn.)
2. Replace every primitive with its documented fallback: reveals → static;
   scrubbed/pinned → final or stacked state; thread draws → fully drawn;
   rAF loops (sway, twinkle, pulse, drift, cursor) → off.
3. Keep *state-change* feedback: tab switches, filter changes, step changes still
   update content, just instantly (or with a ≤0.3s opacity fade).
4. Never remove information: all chapters, stages, looks, prices, and measurements
   render final values in order.

## 6. Performance budget & offscreen discipline

- Max **one** rAF/ambient loop per template at a time (sway OR twinkle OR pulse OR
  drift OR cursor — never two). Pause it when offscreen or when `document.hidden`.
- Max **one** pinned ScrollTrigger per template (§4 mechanics only).
- Parallax limited to: 06 product section, 08 steam imagery. Nowhere else.
- `ScrollTrigger.batch` for product grids (02) and card rows (07).
- Images inside animated frames always `overflow: hidden` + inner scale headroom
  (1.06–1.12) so unfolds never reveal frame edges.
- The drape-simulator's per-tick SVG path rewrite (06) is the only allowed per-tick
  DOM write beyond ScrollTrigger's own updates; keep it to one `<path>`.
- After build, QA checks: no ScrollTrigger without `scroller: scroller()`; no
  `addEventListener('scroll')`; `ctx.revert()` present; reduced-motion path renders
  with content visible; every pin gated by `gsap.matchMedia('(min-width: 768px)')`.
