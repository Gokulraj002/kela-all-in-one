# ATELIER · E-commerce — Motion & Scroll Mechanics

All motion: GSAP + ScrollTrigger, timeline-based, `gsap.context` + revert,
`scroller()` on EVERY ScrollTrigger, `useReducedMotion()` → static
fully-visible layouts. Pin gating: desktop-only pins via
`gsap.matchMedia()` `(min-width: 1024px)` unless the mechanic is
mobile-safe; mobile always gets a clean stacked fallback.

Signature entrance language per design is in each builder brief. The 10
scroll-driven product flows below are BINDING — one per design, no repeats,
none borrowed from coffee's set (no pinned horizontal rail, no scrub zoom
journey, no snap carousel, no velocity marquee, no sticky stacking cards,
no clip-morph gallery, no 3D-tilt cards, no coverflow, no chapter rail,
no fling deck).

## 01 · flagship — "Gallery Walk"
Pinned section (desktop). A horizontal gallery wall of 4 pedestal products
scrubs past; the wall pauses at each pedestal under a center spotlight
(hold segments in the scrub timeline) while a museum label plate
(name, Nº, price) fades in. Wall eases between holds with power2.inOut.

## 02 · bazaar — "Stall Conveyor"
Two diagonal rows of stall cards drift in OPPOSITE directions, speed =
base + scroll-velocity × factor (rAF loop reading a ScrollTrigger
onUpdate delta). Cards tilt with the plane. Feels like walking past
stalls. Mobile: static 2-col grid.

## 03 · maison — "Veil Unveiling"
Pinned full-bleed, 3 editorial spreads. A dark scrim lifts via
`clip-path: inset()` scrub per spread; champagne hairline draws on;
letterbox bars breathe in/out. Slow, silent, one spread per third of pin.

## 04 · drop — "Drop Cascade"
Products fall from above as you scroll — scrub-driven y from -120% with
elastic-ish ease (use `ease: 'back.out(1.4)'` on scrubbed tween segments),
slight rotation settle. Each landing triggers its price slash reveal.
Countdown timer (real interval to midnight) pulses the CTA.

## 05 · eco — "Growth Timeline"
Vertical pinned timeline (desktop). An SVG stem path draws with scrub;
products bloom from nodes — scale 0→1 + blur 8→0, rooted to the stem.
Parallax soil/paper layers drift at 0.6x. Counters tick on arrival.

## 06 · tech — "Blueprint Scan"
Pinned. A vertical scan-line sweeps the product lineup with scrub; as it
crosses each product, HUD callouts pop (crosshair + mono spec text,
drawn leader lines via SVG). Readout panel updates specs per product.

## 07 · apparel — "Lookbook Turn"
Full-bleed lookbook pages turn with scroll scrub — page wipe with skewY
and a page-edge shadow (magazine feel, 4 looks). When a page lands, its
shoppable product tags pop in with stagger. Folio numbers count.

## 08 · home — "Room Dolly"
Pinned. Slow dolly-zoom INTO the room scene (scale 1→1.35 scrub,
transform-origin drifting across hotspots). Hotspot dots pulse; as each
centers, its product card docks at the side panel with details + price.

## 09 · beauty — "Formula Dissolve"
Three products, layered dissolves. Scrub cross-dissolves an ingredient
macro texture layer (opacity + blur + scale 1.06→1) into the packshot —
like a formula resolving into the bottle. Soft, slow, no hard cuts.

## 10 · brutal — "Ledger Shuffle"
Raw product ledger table. On scroll-velocity spikes (debounced),
rows SHUFFLE order (Fisher-Yates) with a hard cut; prices strike-through
to sale price on shuffle. Sort buttons (price/name) re-cut the table.
No easing longer than 0.15s — everything snaps.
