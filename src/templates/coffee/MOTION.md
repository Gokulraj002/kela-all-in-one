# ATELIER · Coffee & Café — Motion & Interaction Direction

**Author:** Agent C (Motion + Interaction Director). **Phases 3–4: animation planning.**
**Applies to:** design-01-artisan … design-10-experimental (React + Vite + GSAP + ScrollTrigger).
**Companion docs:** `REACT_TEMPLATE_CONTRACT.md` §5 (binding), `COFFEE_BRIEF.md` (per-design interactions), `BUILDER_GUIDE.md` (canonical GSAP pattern).

## 1. Category motion principles

The coffee category's motion language is **warm, organic, fluid — never gimmicky**. Every
design shares these instincts; personality differs in *what moves, how far, and how fast*:

1. **Slow rises like steam.** Default vertical reveals drift upward with soft ease
   (`power2.out` / `power3.out`), never pop. The house default rise is `y: 36 → 0`, 1s.
2. **Gentle pour-like wipes.** Full-bleed image changes and section transitions feel poured,
   not cut: clip-path or mask sweeps, always eased, never linear.
3. **Soft bean-bloom scales.** Product and gallery images bloom from `scale 1.06 → 1`
   inside an overflow-hidden frame — never scale the layout box itself.
4. **Roast-timeline progressions.** Scrubbed scroll progressions (roast, history, brewing
   steps) move in one direction, bound to ScrollTrigger scrub — never to raw scroll ticks.
5. **Origin-map path draws.** SVG strokes draw with `strokeDashoffset` only; pins bloom
   in after their path is 80% drawn.
6. **Luxury is restraint.** Maximum one *signature* motion per design (assigned in §4).
   Everything else is the quiet house grammar in §3. If two effects compete for the eye,
   cut one.
7. **Conversion beats choreography.** Hours, price, address, and the primary CTA never
   wait on animation. Motion yields to tap targets and mobile scroll physics.
8. **Everything timeline-based.** No animation spaghetti: one `useLayoutEffect`, one
   `gsap.context`, named timelines, `revert()` cleanup. Never animate on raw scroll
   events — ScrollTrigger or rAF only.

## 2. Technical contract for motion code

Binding for every builder (extends `BUILDER_GUIDE.md`):

- **Scroller.** The platform scrolls inside `.tpl-scope`, NOT `window`. Every
  ScrollTrigger MUST pass `scroller: scroller()` from `useTplScope()`. No exceptions.
- **Lifecycle.** Motion lives in `useLayoutEffect` under `gsap.context(() => {...}, rootRef)`,
  returned cleanup `() => ctx.revert()`. Register `ScrollTrigger` once per template.
- **Reduced motion.** Gate with `useReducedMotion()` (from `../../../_shared`). When true:
  run only the §5 fallback path — static layout, CSS `.rv` fades, all scrubbed/pinned/
  marquee/cursor effects OFF, timelines replaced by instant state or single 0.3s opacity.
- **Pause offscreen work.** Use `toggleActions: 'play none none reverse'` for reveals;
  `ScrollTrigger` with `once: true` where no reverse is needed. Marquee rAF loops pause
  when the track is outside the viewport (IntersectionObserver) and on `document.hidden`.
  ScrollTriggers must not hold listeners for far-away sections: set `start: 'top 88%'`.
- **Performance.** Animate transform and opacity only (no width/height/top/left/filter
  tweens). Limit `will-change` to actively animating elements; clear it on complete.
  Clip-path wipes are allowed (they are composited cheaply in Chromium) but keep the
  animated region full-bleed and the duration ≥ 0.8s to avoid jank perception.
- **Class grammar.** Builders use these hook classes in JSX so motion selectors stay
  consistent: `.rv` (default reveal), `.rv-mask` (word-masked headline), `.rv-img`
  (image bloom frame), `.rv-stagger` (children stagger group), `.marquee-track`,
  `.pin-scene` (pinned container), `.draw-path` (SVG draw), `.parallax-layer`.

---

## 3. Primitive catalog — named, reusable animations

Builders implement these 8 primitives identically across designs. Parameters are options
objects; unspecified values fall back to the house defaults shown.

### 3.1 `steamRise(targets, opts)`
Soft upward drift like steam — the default content reveal.
```
steamRise('.rv', {
  y: 36,            // px start offset
  opacity: [0, 1],
  duration: 1.0,
  ease: 'power3.out',
  stagger: 0.08,    // per-target, use with .rv-stagger children
  start: 'top 88%',  // ScrollTrigger start
  once: true
})
```
- Implementation: `gsap.fromTo` + per-target ScrollTrigger with `scroller: scroller()`.
- Usage note: the only reveal 01/03/05/06 use by default. Reduced-motion: skip,
  leave `.rv` visible.

### 3.2 `pourWipe(targets, opts)`
Pour-like clip-path wipe for images and section transitions.
```
pourWipe('.rv-img', {
  from: 'inset(12% 8% 88% 8%)',  // start mask — pour enters from top
  to: 'inset(0% 0% 0% 0%)',
  duration: 1.2,
  ease: 'power4.inOut',
  innerDrift: 8                  // % inner img translate-y during wipe
})
```
- Implementation: clip-path tween on the frame + slight counter-drift of the inner
  image for a poured-photo feel. `overflow: hidden` on frame; inner img scale 1.08.
- Usage note: 01 gallery, 09 chapter art swaps, 06 hero. Keep to one wipe per viewport.

### 3.3 `beanBloom(targets, opts)`
Soft product bloom — image settles from a gentle over-zoom.
```
beanBloom('.product-frame img', {
  scale: [1.12, 1.0],
  duration: 1.4,
  ease: 'power2.out',
  y: 12             // px, combined soft settle
})
```
- Implementation: triggered at `'top 85%'`. Image inside `overflow:hidden` frame.
- Usage note: 02 product cards, 06 collection, 08 bestsellers. Never combine with
  `pourWipe` on the same element.

### 3.4 `roastProgress(trigger, track, opts)`
Scrubbed one-directional progression — roast stages, decade timelines, brewing steps.
```
roastProgress('.roast-track', '.roast-progress', {
  stages: '.roast-stage',   // children that activate as progress passes
  scrub: 1,                 // scrub smoothing
  fill: 'scaleX',           // or scaleY for vertical (05 mobile)
  onStage: (i) => {}        // callback to set active stage UI
})
```
- Implementation: one ScrollTrigger, `scrub: 1`, progress drives a fill transform and
  toggles `.is-active` per stage by thresholds. All DOM writes inside the scrub
  callback; no React state per tick (use refs).
- Usage note: 02 roast timeline, 05 history timeline (vertical variant), 07 quiz
  progress. Reduced-motion: render the final state (all stages visible).

### 3.5 `originDraw(paths, opts)`
SVG stroke draws for maps/routes, with blooming pins after.
```
originDraw('.origin-svg .draw-path', {
  duration: 2.0,
  ease: 'power2.inOut',
  stagger: 0.25,
  pinAt: 0.8,         // pin scale-in starts when path is 80% drawn
  pins: '.origin-pin'
})
```
- Implementation: set `strokeDasharray = length` via `getTotalLength()`, tween
  `strokeDashoffset` to 0; pins `beanBloom` in with slight delay. Paths must have
  real geometry — no fake straight lines on the map.
- Usage note: 02 origin map. If the design has no SVG geometry, do NOT use.

### 3.6 `chapterPin(container, opts)`
Pinned scroll storytelling — media pinned while text chapters advance.
```
chapterPin('.pin-scene', {
  chapters: '.chapter',      // equal-height panels
  mediaCrossfade: true,      // crossfade pinned media per chapter
  scrub: 0.6,
  progressUI: '.chapter-dots'
})
```
- Implementation: `ScrollTrigger` pin with `end: '+=' + chapters.length * 100 + '%'`,
  scrubbed timeline scrubbing chapter opacity/translate and pinned media crossfade.
  Progress dots update via `onUpdate` (throttled by ScrollTrigger itself).
- Usage note: 09 desktop chapters; 05 craft section (short variant, 2–3 panels).
  **Mobile: never pin** — stack chapters and use `steamRise`. Gate with
  `window.matchMedia('(min-width: 1024px)')`.

### 3.7 `wordRise(targets, opts)`
Editorial headline reveal — words rise through an overflow mask, one by one.
```
wordRise('.rv-mask', {
  stagger: 0.06,
  yPercent: 110,     // words start fully masked
  duration: 0.9,
  ease: 'power4.out'
})
```
- Implementation: builder splits the headline into `<span class="w"><span class="wi">`
  word wrappers in JSX (server-safe, no runtime splitting). Mask `.w` has
  `overflow:hidden`; `.wi` translates `110% → 0`.
- Usage note: hero headlines for 01/05/06/09, section titles for 10. Only one
  `wordRise` visible per viewport — mask reveals compete badly.

### 3.8 `marqueeLoop(track, opts)`
Seamless marquee ticker — rAF-driven, pauses offscreen.
```
marqueeLoop('.marquee-track', {
  speed: 60,          // px per second
  direction: -1,
  pauseOnHover: true
})
```
- Implementation: duplicate track content 2x, rAF advances `x`, wraps modulo half
  width. Pause via IntersectionObserver on the track + `document.visibilitychange`.
  Reduced-motion: static, no loop (render one copy).
- Usage note: 04 specials ticker only. Never use on more than one design in this
  category — 04 owns the marquee.

---

## 4. Per-design animation personalities

Each design gets ONE signature motion. The rest is house grammar from §3, tuned per
design. Every design lists: personality, hero entrance, scroll reveals, image
treatment, signature interaction, hover/micro-interactions, section transitions,
reduced-motion fallback, and primitives used.

### design-01-artisan — Ember & Oak · Artisan Coffee House
- **Personality:** Editorial zine, daylight-warm. Motion reads like turning pages of a
  printed house journal — unhurried, asymmetric, paper-soft.
- **Hero entrance:** `wordRise` on the oversized serif headline (stagger 0.08), then the
  time-of-day note (`steamRise`, delay 0.5). Hero image blooms behind with `pourWipe`
  from the top, as if daylight is being poured in. Total entrance ≤ 2.2s.
- **Scroll reveals:** `steamRise` with long durations (1.1s) and generous stagger (0.12)
  on asymmetric grid pairs — left column leads, right column trails by 0.15s.
- **Image treatment:** `pourWipe` on gallery frames; menu close-ups use `beanBloom`.
  Gentle parallax on the hero only: `yPercent: -8` scrubbed across the hero's
  ScrollTrigger (the category's single parallax allowance).
- **Signature interaction:** Time-of-day hero note — crossfades copy (morning/afternoon/
  evening) with a 0.8s opacity drift, triggered once on load and at the top of each
  hour via `setInterval` (not on scroll).
- **Hover/micro:** Menu tab filter — active tab underline draws (`scaleX 0→1`, 0.4s);
  tab panels crossfade 0.5s. Card hovers: image `scale 1→1.05` over 0.6s, no lift.
  Mobile bottom bar slides up once after hero (0.6s, once).
- **Section transitions:** Hairline rules draw between sections (`scaleX`, scrubbed
  0.3s) — the zine's page dividers.
- **Reduced motion:** Static layout; tab crossfades become instant; parallax off.
- **Primitives:** `wordRise`, `steamRise`, `pourWipe`, `beanBloom`.

### design-02-roastery — Roastworks · Specialty Roastery
- **Personality:** Data-forward craft. Motion is precise and instrument-like — progress
  bars, scale ticks, map draws. The only design where scrubbed progressions are the
  star.
- **Hero entrance:** Roast-drum image `beanBloom` (1.4s) while the "roasted this week"
  freshness badge counts in — a small numeric tick from roast-day to today. Headline
  `wordRise`, fast (stagger 0.05).
- **Scroll reveals:** `steamRise` but shorter and snappier (0.8s, `power2.out`) — utility
  rhythm, not editorial drift.
- **Image treatment:** Product cards `beanBloom`; roast-stage imagery swaps with
  `pourWipe` as stages activate.
- **Signature interaction:** Roast timeline (`roastProgress`, scrub 1) — the bean-to-bag
  journey: progress fill drives 5 stage cards, each activating with tasting-note
  badges fading in at its threshold. Plus the roast-level selector: clicking a level
  (Light/Medium/Dark) morphs the lineup — cards crossfade 0.4s, and each card's roast
  indicator dot slides along its mini roast-scale (`x` tween 0.5s, `power3.inOut`).
- **Hover/micro:** Tasting-note badges lift 2px on hover; product card quick facts
  expand with a 0.35s height auto-tween (use `gsap.to` with `height: 'auto'` measured
  once). Cart count pops (`scale 1.3→1`, 0.3s) on add.
- **Section transitions:** Roast-scale divider — a horizontal gradient bar that fills
  scrubbed between lineup and wholesale sections.
- **Reduced motion:** Timeline renders fully active; selector filters instantly; origin
  map shows all pins.
- **Primitives:** `beanBloom`, `steamRise`, `roastProgress`, `originDraw`, `pourWipe`.
  **Hardest:** `originDraw` — see report note.

### design-03-scandi — Fika & Ljus · Scandinavian Café
- **Personality:** Restraint as luxury. The only design whose motion vocabulary is
  *fades and breathing* — nothing translates more than 12px, nothing scales.
- **Hero entrance:** A single 1.6s opacity fade on the pale interior image, headline
  fades in 0.6s later. No mask, no wipe, no rise. The daylight-aware tint shifts
  via a 2s CSS transition on an overlay (cooler at dawn, warmer at dusk — CSS only,
  computed once on load).
- **Scroll reveals:** Opacity-only `steamRise` variant — override `y: 0`, duration 1.4,
  `ease: 'sine.out'`. Long, barely-there fades.
- **Image treatment:** No wipes, no blooms, no parallax. Images simply appear. The
  room gallery is a slow crossfading pair (6s interval, 2s crossfade).
- **Signature interaction:** The "pause" breathing divider — a thin rule with a small
  circle that expands and contracts on a 4s sine loop (rAF, `scale 1→1.15→1`),
  placed between sections. It pauses when offscreen.
- **Hover/micro:** Links underline-draw only (CSS, 0.3s). Menu moment-tabs (Morning /
  Fika / Evening) crossfade 0.6s. No card lifts, no image zooms — calm wins.
- **Section transitions:** None beyond the breathing divider.
- **Reduced motion:** Identical to the full path minus the breathing loop (rule is
  static). This design degrades most gracefully — note that in QA.
- **Primitives:** `steamRise` (opacity-only override). Deliberately the smallest set.

### design-04-urban — Rush Hour Coffee · Urban Coffee
- **Personality:** The loud one. Kinetic, poster-like, built for thumbs and train
  platforms. Fastest motion in the category — and the only design allowed a marquee.
- **Hero entrance:** Kinetic headline slams in: `wordRise` with hard `power4.out`,
  stagger 0.04, 0.7s total, plus a 2px red-shift text-shadow snap on the final word.
  CTA pill pops (`scale 0.9→1`, back.out(2), 0.5s, delay 0.4). No slow fades anywhere
  near the hero.
- **Scroll reveals:** `steamRise` overridden fast — `y: 24`, duration 0.6,
  `ease: 'power2.out'`. Sections snap, not drift.
- **Image treatment:** Hard clip reveals — `pourWipe` overridden to a fast diagonal
  (`inset` with skewed polygon, 0.7s). Location cards: no image motion, high-contrast
  hover invert instead.
- **Signature interaction:** Marquee ticker of the day's specials (`marqueeLoop`,
  70px/s, `pauseOnHover: true`) pinned under the hero; plus the location switcher —
  switching spots swaps the hours panel with a 0.35s x-slide and staggers the new
  hours rows in.
- **Hover/micro:** High-contrast hovers everywhere — menu rows invert (bg↔text) in
  0.2s; quick-add buttons fill-sweep left-to-right 0.25s; sticky "Order ahead" pill
  gets a subtle pulse (`scale 1→1.04→1`, 2s loop) that stops after first tap.
- **Section transitions:** Full-bleed color-block wipes between major sections —
  a solid accent panel sweeps across (0.5s, `power3.inOut`) as the next section's
  content `steamRise`s in. Poster energy, used at most twice per page.
- **Reduced motion:** Marquee static (one copy visible); headline appears without
  slam; hovers keep color change but instant; color-block wipes become cuts.
- **Primitives:** `marqueeLoop`, `steamRise` (fast override), `wordRise`, `pourWipe`
  (diagonal override). **Hardest:** `marqueeLoop` seamless wrap — see report note.

### design-05-vintage — The Copper Kettle · Vintage Café
- **Personality:** Heritage as the product. Motion feels like handling old paper —
  slow fades, sepia warmth, timeline-first storytelling. Nothing moves fast.
- **Hero entrance:** Sepia interior fades in over 2s (opacity only), the "since 1962"
  line letterpress-stamps in (`opacity 0→1` + 1px y-settle, 0.8s, delay 0.8),
  headline `wordRise` at a stately stagger 0.1.
- **Scroll reveals:** `steamRise` with the longest durations in the category
  (1.3s, `sine.out`) — everything arrives like a memory surfacing.
- **Image treatment:** Sepia/patina grading is CSS; reveals are soft opacity fades
  with a faint vignette that eases out as the image arrives (opacity tween on an
  overlay, 1.5s).
- **Signature interaction:** Scrubbable history timeline — `roastProgress` in vertical
  mode (`fill: 'scaleY'`): decades (1960s→2020s) activate on scroll scrub, each with
  a decade photo crossfading in the pinned panel (desktop pin via `chapterPin`
  short variant, 2–3 panels) or stacking on mobile.
- **Hover/micro:** Menu "on the menu since 1974" annotations fade in on row hover
  (0.4s); reservation ticket button has a perforated-edge hover — dashed border
  draws in (stroke-dashoffset on an SVG rect, 0.6s). Guestbook cards tilt 1deg toward
  the cursor (rAF-throttled, desktop only).
- **Section transitions:** Aged-paper dividers — a torn-edge SVG mask wipes slowly
  (1.2s) between history and menu.
- **Reduced motion:** Timeline shows all decades stacked; pin disabled; ticket hover
  static.
- **Primitives:** `steamRise` (slow override), `wordRise`, `roastProgress` (vertical),
  `chapterPin` (short variant), `originDraw` (for the ticket's dashed border).

### design-06-premium — Maison Noir · Premium Coffee Brand
- **Personality:** Luxury restraint. Dark, cinematic, museum-spaced. Motion is the
  slowest in the category and always symmetrical — nothing staggers casually.
- **Hero entrance:** Near-black frame holds for 0.6s, then the flagship product
  `pourWipe`s in over 1.8s while a single line of copy `wordRise`s beneath it.
  Lot number ("Lot 47 of 200") types in with a 1.2s character reveal. Total ≤ 3.5s —
  deliberate, never laggy.
- **Scroll reveals:** `steamRise` at 1.4s, `y: 48`, stagger 0 — museum pieces arrive
  one at a time, centered, never in playful cascades.
- **Image treatment:** Product parallax — the flagship image drifts `yPercent: -6`
  scrubbed across its section (slower and shallower than 01's hero parallax).
  `beanBloom` on collection pieces, 1.6s.
- **Signature interaction:** Limited-edition numbering moment — when the Provenance
  section enters, the lot counter ticks 1→47 (1.5s, `snap: 1`) while the edition
  bar fills; a "certificate" panel unfolds with a slow `clip-path` vertical open.
- **Hover/micro:** Almost none by design. Product images get a 1.2s slow zoom
  (`scale 1→1.06`) on hover; the private-circle email field gets a gold underline
  draw on focus. Gift-wrap toggle flips the product card's ribbon badge (0.5s
  rotateY — the category's single allowed 3D transform, and it must stay subtle).
- **Section transitions:** Fade-to-black beats — 0.8s black overlay dips between
  Philosophy → Collection → Provenance, like film cuts. Max two per page.
- **Reduced motion:** Fades only; counter shows final number; no parallax, no zooms.
- **Primitives:** `pourWipe`, `wordRise`, `steamRise` (slow override), `beanBloom`.

### design-07-subscription — Never Empty · Coffee Subscription
- **Personality:** Friendly geometric, funnel-first. Motion's job is orientation —
  users must always know which step they're on and what changed in the price.
- **Hero entrance:** Promise headline `wordRise` (stagger 0.07), then the plan-builder
  CTA card `steamRise`s with a soft repeating glow pulse on its border (2.5s loop,
  pauses offscreen) — the single most-clicked element earns the only loop.
- **Scroll reveals:** Standard `steamRise` (1s) for the 3-step "How it works" cards
  with a connecting dashed path that `originDraw`s between them as they enter.
- **Image treatment:** `beanBloom` on lineup bags; the builder's coffee preview
  crossfades 0.4s when the selection changes.
- **Signature interaction:** Plan-builder step transitions — a 4-step wizard
  (coffee → amount → frequency → grind) with directional slide transitions:
  forward slides content left (`x: 40→0`, 0.45s, `power3.out`), back slides right.
  The live price tweens numerically (`snap: 0.01`, 0.5s) on every change, and the
  summary panel's first-delivery date flips with a 0.3s y-roll. A `roastProgress`
  bar across the wizard top shows step completion (non-scrubbed — driven by step
  state, not scroll).
- **Hover/micro:** Option cards lift 4px + border-accent in 0.3s on hover; selected
  state stamps in with a 0.35s scale-check badge. Reassurance microcopy
  (pause/skip/cancel) fades in under each step, never competing with the price.
- **Section transitions:** Builder opens as a full-screen sheet on mobile —
  slides up 0.5s `power4.out` with backdrop fade; closes reversed. Desktop builder
  is inline with step slides only.
- **Reduced motion:** Steps crossfade instantly; price updates without tween;
  sheet appears without slide; no glow pulse.
- **Primitives:** `wordRise`, `steamRise`, `beanBloom`, `roastProgress` (step-driven),
  `originDraw` (how-it-works connector). **Hardest:** directional step transitions +
  numeric price tween — see report note.

### design-08-ecommerce — The Whole Shelf · Coffee E-commerce
- **Personality:** Shelf-density commerce. Motion is transactional — fast, honest,
  reversible. Every animation answers "did my action register?"
- **Hero entrance:** Featured-collection image `beanBloom` (1s), promo headline
  `steamRise` fast (0.7s). No cinematic hold — shoppers scroll immediately.
- **Scroll reveals:** `steamRise` at 0.7s with tight stagger (0.05) on product grids;
  use `once: true` and batch via `ScrollTrigger.batch` for grid performance.
- **Image treatment:** `beanBloom` on bestsellers; category tiles use a quick
  `pourWipe` (0.8s).
- **Signature interaction:** Quick-view FLIP — clicking a product card's quick-view
  expands it into a modal: the card image FLIPs (position/size tween, 0.5s,
  `power3.inOut`) from grid to modal while the modal shell fades in; closing
  reverses the FLIP back to the exact card. Cart drawer slides from the right
  (0.45s, `power4.out`); backdrop fades 0.3s. Quick-add button morphs to a check
  (0.3s) on success.
- **Hover/micro:** Card hover — image `scale 1→1.05` (0.5s) + quick-add bar slides
  up from the card bottom (0.35s). Wishlist heart pops (`scale 1.4→1`, 0.3s,
  `back.out(3)`). Filter chips toggle with a 0.25s background fill; live counts
  tween numerically. Sort dropdown opens with a 0.3s y-fade.
- **Section transitions:** Filter changes re-flow the grid with a FLIP-lite:
  cards fade/scale out (0.25s), grid re-renders, cards `steamRise` back in with
  stagger 0.03. Keep it under 0.6s total — speed is the feature.
- **Reduced motion:** Modal and drawer appear without slide/FLIP; grid re-renders
  instantly; hovers keep color change only.
- **Primitives:** `beanBloom`, `steamRise` (fast, batched), `pourWipe` (fast).
  **Hardest:** quick-view FLIP — see report note.

### design-09-story — From Cherry to Cup · Coffee Storytelling
- **Personality:** Narrative-first, editorial-cinematic. Motion serves the chapter
  arc — pinned scenes, art crossfades, a visible journey with a beginning and end.
- **Hero entrance:** Cinematic farm image holds full-bleed; chapter title
  `wordRise`s (stagger 0.09, 1.2s); "Begin the journey" button pulses once
  (`scale 1→1.05→1`, 1.2s) then rests. Scroll hint — a thin line that draws
  downward on a 2s loop, pausing offscreen.
- **Scroll reveals:** Inside chapters, pull quotes `steamRise` at 1.1s; farmer cards
  `beanBloom`.
- **Image treatment:** `pourWipe` for chapter art transitions — each chapter's art
  pours in as its text arrives.
- **Signature interaction:** Pinned scroll chapters (`chapterPin`, desktop ≥1024px) —
  5 chapters, media pinned left while text scrolls right; pinned media crossfades
  per chapter (farm → cherries → drying beds → roast → cup). Chapter progress
  dots + a top progress bar (`scaleX` scrubbed across the whole story). The
  processing-method diagram is interactive: clicking Washed/Natural/Honey
  crossfades the diagram art (0.5s) and tweens the flavor-shift bars
  (`scaleX`, 0.6s). Mobile: chapters stack, progress bar stays, pins off.
- **Hover/micro:** "Next chapter" links get an arrow nudge (`x: 0→6→0`, 0.6s loop
  on hover only). Glossary terms underline-draw on hover. Epilogue newsletter
  field mirrors 06's gold underline draw.
- **Section transitions:** Chapter boundaries use a full-viewport `pourWipe` of the
  incoming art — the story's page-turn. Palette subtly shifts per chapter
  (dawn → noon → roast-dark) via a 1s background-color transition on the pinned
  media frame.
- **Reduced motion:** No pins; chapters stack with fades; diagram switches instantly;
  progress bar static at final state per viewed chapter.
- **Primitives:** `wordRise`, `steamRise`, `beanBloom`, `pourWipe`, `chapterPin`.
  **Hardest:** `chapterPin` with per-chapter media crossfade — see report note.

### design-10-experimental — Laboratory No. 9 · Experimental Café
- **Personality:** The gallery piece. Dark, sensory, lab-protocol language. The only
  design where motion is allowed to be *strange* — but never broken. Daring within
  the category's warmth.
- **Hero entrance:** Full-bleed siphon-brewer image `pourWipe`s in from the bottom
  (inverted pour — vapor rises, 1.6s) while the cryptic headline `wordRise`s with
  an exaggerated stagger (0.12). A fine grain overlay fades in over 2s (opacity
  only, static image — never animated grain).
- **Scroll reveals:** `steamRise` with unusual easings — `expo.out` on headlines,
  `sine.inOut` on body — and offset directions: alternate sections rise from
  alternating x-offsets (±48px) for lab-asymmetry.
- **Image treatment:** Full-bleed imagery with slow continuous drift — a 20s
  `yPercent ±4` yoyo on hero and lab sections (pauses offscreen; the category's
  only ambient drift). Method images transition with a liquid mask wipe
  (`pourWipe` with a wavy SVG mask path, 1s).
- **Signature interaction:** Brewing-method picker — selecting Siphon/Nitro/Cascara/
  Fermentation triggers a three-part transition: outgoing art liquid-wipes out
  (0.5s), method data (temp, time, ratio) counts/tweens in with staggered
  `steamRise` (0.4s), and a flavor visualizer — abstract concentric rings —
  redraws via `originDraw` on SVG circles with a 1.2s draw. Session booking flow
  is a 3-step stepper with 10-style slide transitions (reuse 07's pattern, darker).
- **Hover/micro:** Unconventional cursor — a small ring that lerps after the pointer
  (rAF, lerp 0.15) and expands over interactive elements (desktop only, hidden on
  touch/reduced-motion). Nav overlay opens with a circular clip-path expand from
  the menu button (0.7s, `power4.inOut`).
- **Section transitions:** Manifesto section arrives with a full-viewport invert flash
  — 0.15s white flash at 8% opacity, then content `wordRise`s. Used exactly once;
  the shock is the point, so it must be rare.
- **Reduced motion:** No cursor, no drift, no flash; method picker crossfades
  instantly; overlay menu fades in.
- **Primitives:** `pourWipe` (inverted + wavy-mask variants), `wordRise`,
  `steamRise` (alternating offsets), `originDraw` (flavor rings). **Hardest:**
  the custom cursor + circular clip-path nav — see report note.

---

## 5. Reduced-motion policy (category baseline)

When `useReducedMotion()` is true, every design MUST:

1. Render all content in final state — no element left at `opacity: 0` or translated.
   (Builders: set initial states via GSAP `fromTo`, never via CSS that hides content.)
2. Replace every primitive with its documented fallback: reveals → static;
   scrubbed/pinned → final or stacked state; marquee → single static copy;
   rAF loops (cursor, breathing divider, drift, pulse) → off.
3. Keep *state-change* feedback: tab switches, filter changes, step changes still
   update content, just instantly (or with a ≤0.3s opacity fade).
4. Never remove information: timelines show all stages, maps show all pins,
   chapters stack in order, prices/dates render final values.

## 6. Performance budget & offscreen discipline

- Max **one** rAF loop per template at a time (marquee OR cursor OR breathing OR
  drift — never two). Pause it when offscreen or when `document.hidden`.
- Max **one** pinned ScrollTrigger per template (09 chapters, 05 short variant).
- Parallax limited to: 01 hero, 06 product section. Nowhere else.
- `ScrollTrigger.batch` for product grids (08) and card rows (02).
- Images inside animated frames always `overflow: hidden` + inner scale headroom
  (1.06–1.12) so blooms never reveal frame edges.
- After build, QA checks: no ScrollTrigger without `scroller: scroller()`; no
  `addEventListener('scroll')`; `ctx.revert()` present; reduced-motion path renders
  with content visible.
