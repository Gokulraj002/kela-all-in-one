# ATELIER · Real Estate — Motion Direction

Shared motion language: slow, weighted, confident. Property film pacing —
nothing bouncy, nothing under 0.8s for major moves. `power3.out` /
`power4.inOut` for reveals; `expo.out` for hero entrances.

## The 10 scroll mechanics (all distinct; none repeat coffee's 10)

Coffee's 10 (DO NOT reuse): pinned horizontal rail, scrub zoom journey,
snap carousel, velocity marquee, sticky stacking cards, clip-morph gallery,
velocity 3D-tilt cards, pinned coverflow, chapter-synced rail, velocity-fling deck.

### 01 · villas — Pinned drone-descent journey
Pin a full-bleed viewport. Scroll scrubs a 3-stop descent: aerial-wide →
mid three-quarter → ground-level detail (crossfading three images, scale
1.15→1). An altitude indicator (300m → 120m → 12m) tracks progress; at each
stop a residence card fades/slides in beside the frame. Reduced-motion /
mobile: static stacked sections.

### 02 · urban — Elevator rail
A sticky tower graphic (CSS-built, 24 floors) pins beside the listings.
Scroll moves a glowing floor marker floor-by-floor (stepped scrub); each
step slides the matching apartment card in from the side with price, sqft,
facing. Stepped via ScrollTrigger snap on the scrub timeline.

### 03 · commercial — Blueprint draw-on
Pinned floor-plan SVG. Scroll scrubs `stroke-dashoffset` so walls draw
themselves; as each room completes, its spec card (area, ceiling height,
capacity) fades in at the room's position. Ends with the full plan + a
spec summary bar.

### 04 · plots — Masterplan map zoom
Pinned SVG masterplan (roads, lake, sectors). Scroll zooms in three stages
(estate → sector → plot) via scale + transform-origin scrub; plots highlight
in sequence (fill pulse), a detail card updates per highlighted plot
(plot no., dimensions, price). A minimap shows current zoom.

### 05 · heritage — Before/after wipe scrub
Pinned comparison frame. Scroll scrubs a vertical wipe handle between an
archival sepia image and the restored full-color image; three chapters
(facade / colonnade / interiors), each a wipe pass with a caption. The
handle has a brass grip; dates label each side.

### 06 · coliving — Polaroid scatter
Listing/member cards styled as polaroids in a loose pile. On scroll enter,
they scatter outward with rotation (gsap, springy `back.out`), then settle
into a readable grid as the section pins briefly; scrolling further
re-scatters into the next set. Community-first, playful but controlled.

### 07 · smart — Day-night home simulation
Pinned interior frame. Scroll scrubs a 24h cycle in four phases
(dawn → day → dusk → night): the image grade crossfades (CSS filters +
overlay tints), and feature overlays toggle per phase (blinds / climate /
lighting scenes / security). A time readout tracks 06:00 → 22:00.

### 08 · retreat — Parallax depth layers
Pinned full-bleed scene in 3 depth layers (foreground palms / mid villa /
background sea+sky as separate images). Scroll moves each layer at a
different rate (yPercent 18 / 8 / 3) while listing cards float up between
layers. Tide-like `sine.inOut` easing on layer tweens.

### 09 · trust — Transparent pricing ledger
A pinned ledger: "Where every rupee goes." Scroll stacks cost lines
(land, construction, approvals, amenities, margin); each arriving line
grows its bar and counts its number up; a running total pins at the top.
Ends with the per-sqft figure and a "no hidden charges" seal.

### 10 · archviz — Orbital turntable carousel
Listings arranged on a virtual ring (rotateY). Scroll rotates the orbit;
the center card faces forward (counter-rotated), side cards fall away in
perspective. A scrubbed rotation with inertia feel (`scrub: 1`), project
index readout updating. Dark stage, spotlight on center.

## Implementation notes

- Every ScrollTrigger gets `scroller: scroller()`. All in `gsap.context`,
  reverted on cleanup. `gsap.matchMedia` for ≥768px pin gating.
- Reduced motion: render the end-state layout statically (all cards visible,
  no pins). Never leave content hidden behind a disabled animation.
- Mobile: native vertical scroll through the same content, simplified.
