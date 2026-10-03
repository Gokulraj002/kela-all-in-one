# ATELIER · Real Estate — Category Brief

10 art-directed real-estate website experiences. Each design changes
navigation, hero structure, layout, hierarchy, typography, image treatment,
section order, interaction model, motion language, CTA and footer — never
a recolor.

## The 10 directions

### 01 · design-01-villas — "Meridian Estates" — Luxury villas developer
Cinematic, exclusive, private. Full-bleed dusk film hero, whispered
typography, invitation-only viewing CTA. Museum spacing; one residence per
viewport. Scroll mechanic: **pinned drone-descent journey** — scroll
descends from aerial-wide to ground detail across 3 altitude stops, listing
cards arriving at each stop.

### 02 · design-02-urban — "Stack & Stone" — Urban apartments
Sharp, efficient, dense. Data-forward listings (price/sqft, floor, facing),
sticky filter bar, floor-plan-forward cards. Scroll mechanic: **elevator
rail** — a sticky tower graphic; scrolling moves the highlight floor by
floor, each floor's apartment card sliding in.

### 03 · design-03-commercial — "Northgate Works" — Commercial spaces
Confident B2B. Spec-sheet honesty: floor plates, ceiling heights, parking
ratios. Restrained navy/graphite, tabular numerals. Scroll mechanic:
**blueprint draw-on** — floor-plan SVG strokes draw as you scroll; each
completed room reveals its spec card.

### 04 · design-04-plots — "Aaranya Acres" — Plotted developments
Land-story led: aerials, masterplan, the romance of ground. Parchment and
earth tones, survey-map motifs. Scroll mechanic: **masterplan map zoom** —
pinned SVG masterplan zooms estate → sector → plot; plots highlight in
sequence, detail card updating per plot.

### 05 · design-05-heritage — "The Lime & Lintel Co." — Heritage restoration
Storied craft. Archival sepia meets restored full color; craftsman
profiles, material library (lime, teak, brass). Scroll mechanic:
**before/after wipe scrub** — pinned comparison; scroll scrubs a vertical
wipe between archival sepia and restored color, chapter by chapter.

### 06 · design-06-coliving — "Kindred House" — Co-living spaces
Youthful community. Warm, social, a little messy-in-a-good-way. Member
stories, house rituals, transparent pricing. Scroll mechanic: **polaroid
scatter** — listing/member cards as polaroids that scatter and reassemble
on scroll with springy physics feel.

### 07 · design-07-smart — "Halcyon Living" — Smart homes, tech-led
Tech-led living without the gadget clichés. Calm dark UI, living light.
Feature chapters keyed to time of day. Scroll mechanic: **day-night home
simulation** — pinned interior where scroll scrubs dawn → day → dusk →
night; lighting grade shifts, feature overlays toggle per phase.

### 08 · design-08-retreat — "Stillwater Reserve" — Resort second homes
Escape-led. Slow, breathable, horizon-heavy. Long scroll pauses, tide-like
motion. Scroll mechanic: **parallax depth layers** — pinned sequence with
foreground/mid/background layers drifting at different rates; listings
float between layers.

### 09 · design-09-trust — "Sahaj Homes" — Affordable housing
Trust and clarity led. Honest pricing, cost breakup, construction updates,
resident voices. No luxury gloss — warmth and proof. Scroll mechanic:
**transparent pricing ledger** — scroll-stacked cost-breakdown ledger;
bars grow and numbers count up as each cost line arrives; pinned summary.

### 10 · design-10-archviz — "Studio Monolith" — Experimental archviz
3D-feel immersion. Dark, graphic, kinetic type; the architecture is the
art. Scroll mechanic: **orbital turntable carousel** — listings arranged
on a virtual ring; scroll rotates the orbit (rotateY), center card faces
forward.

## Category-wide rules

- Real copy only: believable project names, Indian locations (Bengaluru,
  Alibaug, Whitefield, Devanahalli…), ₹ pricing as numbers via `price()`.
- No lorem ipsum, no emojis, no stock-photo clichés (no handshakes, no
  "sold" signs, no keys-in-hand tropes except the planned trust film).
- Every design: nav, hero, 3–5 sections, footer; `data-tour` on 3+ stops.
- Reduced-motion: all scroll mechanics degrade to static, fully-visible
  layouts. Mobile: pinned sequences gate at ≥768px via gsap.matchMedia;
  provide swipe/scroll-native fallbacks below.
