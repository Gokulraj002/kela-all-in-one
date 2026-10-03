# ATELIER · Creative Agency — Motion & Interaction Direction

**Applies to:** design-01-portfolio … design-10-playground (React + Vite + GSAP + ScrollTrigger).
**Companion docs:** `REACT_TEMPLATE_CONTRACT.md` §5, `AGENCY_BRIEF.md`, `BUILDER_GUIDE.md`.

## 1. Category motion principles

The agency category's motion language is **typographic, decisive, and physical** — type
leads, images follow, and every transition lands like a decision. Personality differs in
*tempo and texture*: Swiss snaps, maximal tumbles, cinematic drifts, witty tosses.

1. **Type moves first.** Headlines reveal (word-mask, line-slide, or kinetic scatter)
   before supporting imagery. Never let a paragraph arrive before its headline.
2. **Decisive easings.** `power3.out` / `power4.out` / `expo.out` for entrances;
   `power2.inOut` for crossfades. No elastic, no bounce, no back-ease except 06's
   sticker pops (single use, subtle).
3. **One signature scroll mechanic per design** (§4). Everything else is the quiet
   house grammar in §3. If two effects compete, cut one.
4. **Conversion never waits.** "Start a project" / inquiry CTAs are never gated on
   animation completion.
5. **Timeline-based, always.** One `useLayoutEffect`, one `gsap.context`, named
   timelines, `revert()` cleanup. `scroller: scroller()` on EVERY ScrollTrigger —
   the platform scrolls inside `.tpl-scope`, never `window`.

## 2. Technical contract (binding, extends BUILDER_GUIDE)

- `gsap.registerPlugin(ScrollTrigger)` once per template.
- Motion in `useLayoutEffect` under `gsap.context(() => {...}, rootRef)`; cleanup
  `() => ctx.revert()`. Deps `[reduced, scroller]`.
- **Reduced motion:** gate with `useReducedMotion()`. When true: static final states,
  opacity-only fades ≤0.3s, all scrub/pin/rAF/cursor/kinetic effects OFF. Never leave
  content at `opacity: 0` — set initial states via GSAP `fromTo`, never hiding CSS.
- **Offscreen discipline:** `toggleActions: 'play none none reverse'`, `once: true`
  where no reverse needed, `start: 'top 88%'`. Max ONE rAF loop per template,
  paused offscreen (IntersectionObserver) and on `document.hidden`.
- **Performance:** transform + opacity only. Clip-path wipes allowed (composited
  cheaply), full-bleed regions, duration ≥ 0.8s.
- **Class grammar:** `.rv` (default reveal), `.rv-mask` (word-masked headline),
  `.rv-img` (image bloom frame), `.rv-stagger` (children stagger), `.pin-scene`,
  `.draw-line` (rule/underline draw), `.ticker-track`.

## 3. Primitive catalog

### 3.1 `typeRise(targets, opts)` — word-mask headline reveal
Words rise through overflow masks. `{ stagger: 0.06, yPercent: 110, duration: 0.9, ease: 'power4.out' }`.
Server-safe: builders split words into `<span class="w"><span class="wi">` in JSX.

### 3.2 `blockRise(targets, opts)` — the default content reveal
`{ y: 32, opacity: [0,1], duration: 0.9, ease: 'power3.out', start: 'top 88%', once: true }`.

### 3.3 `hardWipe(targets, opts)` — rectangular clip reveal for images
`clip-path: inset(0 100% 0 0) → inset(0 0% 0 0)`, 0.9s, `power4.inOut`. The Swiss
discipline wipe; 05 owns the purist form, others may use sparingly.

### 3.4 `lineDraw(targets, opts)` — rules and underlines draw
`scaleX 0→1` (or SVG stroke draw), 0.6–1s. Eyebrow rules, grid lines, hand underlines.

### 3.5 `countUp(targets, opts)` — metric numerals tick
`{ snap: 1, duration: 1.2 }` on scroll enter. 01 outcome numerals, 08 metrics.

### 3.6 `crossfadeSwap(container, opts)` — image crossfade on state change
0.5s opacity crossfade for index-driven image swaps (01, 02).

---

## 4. The 10 scroll mechanics (all NEW — none repeat coffee's 10)

Coffee used: pinned horizontal rail · scrub zoom journey · snap carousel · velocity
marquee · sticky stacking cards · clip-morph gallery · 3D-tilt velocity cards ·
pinned coverflow · chapter-synced rail · velocity-fling deck. **None of these may
appear here.** Each agency design owns one of the following:

### M1 — Scroll-driven work index (01 portfolio)
Pinned two-column: left is a scrolling list of case rows; as each row crosses the
active line, the right image crossfades to that case (`crossfadeSwap` driven by
ScrollTrigger `onUpdate`, throttled). Pinned ≥1024px only; stacked cards on mobile;
static list under reduced motion.

### M2 — Process spine scrub (02 brand)
A vertical spine with 4 phase nodes. Scroll scrub draws the spine (`scaleY`) and
each phase's deliverable collage slides in from alternating sides as its node
activates. Phases: Discover / Define / Design / Deliver. Reduced motion: all
phases visible, spine fully drawn.

### M3 — Showreel scrub (03 motion)
Pinned letterboxed frame: scroll scrubs through 5 film stills (crossfade +
`scale 1.08→1` settle), a running frame counter (`00:00:00:00` style ticking with
progress), and the letterbox bars widen from 8% to 14% across the pin. ≥1024px pin;
stacked stills on mobile.

### M4 — Headline toss deck (04 witty)
Witty one-liner cards stack in a deck; scrolling tosses the top card off with
rotation (`rotation: 8–14deg, x: ±120, 0.6s expo.in`) revealing the next, which
slams in with a 2px cobalt punchline highlight. 6 cards, scrub-linked to a
200vh scroll region. Reduced motion: static stacked list.

### M5 — Grid-line reveal system (05 swiss)
The 12-column grid is visible (hairlines). On scroll, grid cells' rules draw
(`lineDraw` staggered by column), then content blocks snap in with `hardWipe`
aligned to grid cells. Index rows: number counts in, row rule draws, title
slides 12px. Everything lands on the grid — the discipline IS the motion.

### M6 — Collage avalanche (06 maximal)
Work posters absolutely positioned in a tall collage field; scroll scrub tumbles
them in — each with its own rotation (±4deg), scale (0.9→1), and slight x-drift,
`expo.out`, staggered by scroll position (not time). Scroll velocity adds a
temporary extra rotation kick (rAF-throttled, capped). Reduced motion: static
collage, all visible.

### M7 — Darkroom develop (07 photo)
Images enter heavily blurred and underexposed (`filter: blur(24px) brightness(0.4)`
— set via GSAP fromTo, never CSS-hidden) and "develop" into clarity as they cross
the viewport: scrub-linked `blur 24→0`, `brightness 0.4→1` over a 60vh scroll
distance per image. Filmstrip captions fade in after develop completes.
Reduced motion: images render developed. (Filter animation is the ONE allowed
exception to transform-only — it's the design's entire concept; keep regions
small and durations scrub-smooth.)

### M8 — Spec-sheet accordion rail (08 digital)
Case studies as full-width rows. On scroll enter, the active row expands
(height auto-tween 0.5s) revealing metrics, which `countUp`; a sticky side rail
shows the active case's giant index number crossfading per row. Inactive rows
compress to one line. Reduced motion: all rows expanded statically.

### M9 — Journal margin notes (09 indie)
Long-form personal narrative; as paragraphs enter, small margin notes and photos
fade/slide in from the margins (desktop: absolute-positioned asides; mobile:
inline). Key lines get a hand-drawn-feel underline (`lineDraw` with a slightly
wavy SVG path, 0.8s). Intimate, slow, `sine.out`.

### M10 — Kinetic type field (10 playground)
Hero headline as individual letter spans in a full-viewport field. Letters
continuously react: scroll velocity applies scatter force (x/y offsets +
rotation, spring back with `expo.out` on settle), pointer proximity repels
letters (rAF, lerp 0.12, desktop only). A "calm/chaos" slider lets visitors
tune the field energy. Reduced motion: static headline, slider hidden.

---

## 5. Per-design motion personality

### 01 Studio Meridian — portfolio
Decisive and commercial. Hero: `typeRise` on the outcome-led headline, then the
latest-case image `hardWipe`s in. M1 index drives the work section. Filter chips
toggle with 0.25s background fills; case cards `blockRise` with tight stagger.
Outcome numerals `countUp` on enter. Hover: image scale 1→1.06, red underline draw.

### 02 Mark & Matter — brand
Methodical. Hero: `typeRise` slow (stagger 0.09), identity flat-lay blooms.
M2 spine scrub anchors the process section. Case spreads crossfade on tab.
Deliverable lists stagger in. Hover: spread zoom 1.04, ochre seal rotate 8deg.

### 03 Framehouse — motion
Cinematic and slow. Hero: 0.5s black hold, then projector-haze still fades in
(1.8s), title `typeRise` in Anton. M3 showreel scrub is the centerpiece.
Section transitions: 0.6s fade-to-black dips (max 2). Hover: film cards get a
frame-counter tick on the thumbnail. Reduced motion: no holds, no dips.

### 04 Frankly® — witty
Playful but snappy. Hero: the killer line `typeRise`s with the punchline word
in cobalt popping last (scale 1.15→1, 0.3s). M4 toss deck for the lines section.
Anti-list rows: strikethrough draws on hover. Buttons: hard shadow shift on hover
(translate 2px), no soft fades — wit is dry.

### 05 Norm Studio — swiss
Discipline. Hero: grid draws first (`lineDraw` staggered 0.05), then headline
and image snap in with `hardWipe`. M5 throughout. Everything `power2.out`,
durations ≤0.7s. Hover: row invert (black↔white) 0.15s. No other motion exists.

### 06 Studio Louder — maximal
Joyful chaos, placed. Hero: collage pieces pop in with rotation
(`scale 0.8→1, rotation ±6→±4, back.out(1.4)` — the one allowed overshoot).
M6 avalanche for work. Marquee of crew names (slow, 40px/s — distinct from M-velocity
marquees: constant speed, decorative). Hover: stickers wiggle (rotation ±2, 0.3s).

### 07 Halide Studio — photo
Patient. Hero: single frame M7-develops over the scroll (slow, reverent).
Series presented as horizontal filmstrips with sprocket-hole edges (CSS).
Captions fade in post-develop. Hover: frame lifts 4px, caption slides up.
The quietest dark design.

### 08 Interface/Dept — digital
Systematic. Hero: UI montage `blockRise` with metric band `countUp` on load.
M8 accordion rail for cases. Capability grid: cells draw borders on scroll.
Hover: row highlight + arrow slide. Everything measured, nothing decorative.

### 09 June Park® — indie
Intimate. Hero: portrait fades in (1.2s), name `typeRise` gentle, availability
pill pulses once. M9 margin notes throughout. Wavy underlines draw under key
lines. Hover: project images warm-shift (subtle sepia overlay fade 0.5s).
Slowest light design.

### 10 PROTO® — playground
Alive. Hero: M10 kinetic field immediately interactive. Experiments section:
each sketch has its own micro-interaction (documented per sketch). Overlay nav:
circular clip-path expand 0.7s. Type tool: weight/width sliders drive
`font-variation-settings` live. Reduced motion: everything static, tool hidden.

---

## 6. Reduced-motion policy (binding)
Per contract §5 + coffee baseline: final-state rendering, no hidden content,
scrub/pin/rAF/cursor/kinetic OFF, state changes instant or ≤0.3s fade, no
information removed (M2 spine drawn, M3 stills stacked, M4 cards listed,
M8 rows expanded, M10 headline static).

## 7. Performance budget
Max one rAF loop per template (06 velocity kick / 10 field / 03 counter via
scrub not rAF). Max one pin per template (01 index / 03 showreel). M7 filter
tweens: keep blurred regions < 60vh and prefer `will-change: filter` only
during the scrub. `ScrollTrigger.batch` for grids (01, 06, 08).
