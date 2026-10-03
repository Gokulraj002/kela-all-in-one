# ATELIER · IT & Technology — Category Brief

10 website experiences for technology companies. Each design must be a
**different genre of tech site** — different nav, hero, layout, typography,
imagery, section order, interaction model, motion language, CTA, footer.
Study coffee's `BUILDER_GUIDE.md` + the contract before building; the
conventions (imports, `useCustom`, `Img` keys, tokens, fonts, motion,
`data-tour`, content.js, README) are identical.

Folder per design: `src/templates/technology/design-NN-<name>/`
with `index.jsx`, `meta.js`, `content.js`, `styles.css`, `README.md`,
`assets/` = `hero.jpg`, `feature-1.jpg`, `feature-2.jpg`, `feature-3.jpg`,
`detail.jpg` + `hero-loop.mp4`.

`Img` upload keys: `hero`, `product-0`, `product-1`, `product-2`, `detail`.

## Scroll mechanics (one per design — all NEW, none repeat coffee's 10)

Coffee used: pinned horizontal rail · scrub zoom journey · snap carousel ·
velocity marquee · sticky stacking cards · clip-morph gallery · 3D-tilt
velocity cards · pinned coverflow · chapter-synced rail · velocity-fling deck.
**Do not reuse any of these.** The 10 tech mechanics:

1. **01-saas — Hotspot tour.** Pinned dashboard mock; scroll advances 4 steps.
   Each step pulses a hotspot region ON the dashboard and swaps the callout
   card beside it. Scrub-linked (scroll progress drives the active step).
2. **02-ai — Neural pulse.** Pinned SVG network; scroll scrubs a pulse
   traveling node→node along edges; each reached node activates its
   capability card. Pure SVG + scrub, no canvas needed.
3. **03-devtools — Terminal typer.** Pinned terminal window; scroll progress
   types commands character-by-character; each executed command reveals a
   feature panel. Typing is driven by scroll position.
4. **04-secure — Threat-scan sweep.** Pinned dark panel; a scan line sweeps
   top→bottom with scroll; each completed sweep "detects" threats that lock
   into a threat-card grid.
5. **05-cloud — Topology zoom.** Pinned nested-layer diagram
   (edge → region → cluster → pod); scroll zooms through layers with
   crosshair focus rings; labels swap per layer.
6. **06-consumer — Spring assembly.** Phone mockups whose app screens
   spring/bounce (overshoot ease) into a device frame on scroll triggers;
   screens assemble into a stacked deck.
7. **07-robotics — Exploded view.** Pinned product visual; scroll explodes it
   into labeled parts with leader lines, then reassembles. Scrub-linked.
8. **08-fintech — Ledger cascade.** Pinned ledger table; scroll drives
   count-up numbers cascading down the rows; each row's metrics tween in
   sequence as the section scrubs.
9. **09-opensource — Contribution fill.** Pinned contributor wall; scrolling
   "commits" — avatar tiles flip in like a contribution graph filling to a
   full mosaic; a commit counter tallies.
10. **10-webgl — 3D dolly.** CSS-3D scene (no three.js — contract allows
    react+gsap only); layered translateZ planes; scroll scrubs a camera dolly
    through the depth field.

All mechanics: desktop-first with a static fully-visible fallback under
reduced-motion; pin gating at ≥768px via gsap.matchMedia (resize-safe);
`scroller()` on every ScrollTrigger.

## The 10 designs

### 01 · design-01-saas — "Northbeam" — Enterprise SaaS
- Palette: paper #FAFAF8 · ink #101828 · indigo #4F46E5 · slate
- Typography: Sora (display) + Inter (body)
- Layout: 12-col grid; centered hero → dashboard mock → logo strip →
  feature hotspot tour → metrics → testimonial → pricing teaser → CTA → footer
- Mood: trustworthy, calm, assured
- Motion: calm fades, count-up metrics, hotspot pulse; nothing bouncy
- Images: hero = glass office-tower facade (morning); feature-1 = bright
  modern office interior (no faces); feature-2 = laptop with abstract
  dashboard (shallow DOF); feature-3 = team hands around table (no faces);
  detail = glass + steel architectural detail

### 02 · design-02-ai — "Cortexa" — AI startup
- Palette: near-black #050508 · violet #8B5CF6 · cyan #22D3EE
- Typography: Space Grotesk (display) + Inter (body)
- Layout: full-bleed dark hero w/ neural field → capability pulse section →
  model cards → metrics → research notes → CTA → footer
- Mood: mysterious, intelligent, cinematic
- Motion: slow cinematic reveals, glowing node pulses, 0.5s black hold on hero
- Images: hero = dark fiber-optic threads; feature-1 = server hall, blue glow;
  feature-2 = chip macro; feature-3 = dark research lab; detail = fiber-optic
  close-up

### 03 · design-03-devtools — "Shipkit" — Developer tools
- Palette: editor dark #0D1117 · green #3FB950 · amber #D29922 · light docs
  sections in #FFFFFF
- Typography: JetBrains Mono (display/code) + Inter (body)
- Layout: docs-sidebar nav; terminal hero; quickstart; terminal-typed
  features; API teaser; changelog; CTA; footer
- Mood: precise, fast, hacker-credible
- Motion: typed reveals, caret blinks, crisp 0.25s transitions
- Images: hero = backlit keyboard macro (dark); feature-1 = code on screen
  (dark); feature-2 = developer desk (no face); feature-3 = server LEDs;
  detail = keycap macro

### 04 · design-04-secure — "Aegis" — Cybersecurity
- Palette: black #0A0A0A · white #FFFFFF · signal red #FF3B30 · steel #8E8E93
- Typography: Archivo (display) + IBM Plex Mono (body accents)
- Layout: sharp grid; hero threat map; scan-sweep section; platform grid;
  compliance strip; metrics; CTA; footer
- Mood: vigilant, exact, uncompromising
- Motion: scan-line sweeps, status flickers (subtle), hard cuts
- Images: hero = dark server corridor, red accent; feature-1 = SOC, blurred
  screens; feature-2 = biometric/lock macro; feature-3 = fiber cables;
  detail = circuit macro with red light

### 05 · design-05-cloud — "Stratus" — Cloud infrastructure
- Palette: deep navy #0B1B33 · sky #38BDF8 · teal #2DD4BF · light #F4F8FC
- Typography: Outfit (display) + Inter (body)
- Layout: airy light sections; dark data moments; topology zoom centerpiece;
  region map; metrics; pricing; CTA; footer
- Mood: expansive, reliable, engineered
- Motion: smooth zooms, data draw-ons, drifting map pins
- Images: hero = cloud deck at dusk (aerial); feature-1 = data-center hall;
  feature-2 = server racks (blue); feature-3 = network cables; detail = cooling
  infrastructure

### 06 · design-06-consumer — "Pip" — Consumer app
- Palette: cream #FFF8F0 · coral #FF6B6B · sunshine #FFC53D · teal #2EC4B6
- Typography: Nunito (display) + Inter (body)
- Layout: centered playful hero w/ phone; spring-assembly feature section;
  reviews; how-it-works; download CTA; footer
- Mood: joyful, warm, approachable
- Motion: springy overshoot (tasteful), sticker badges pop, gentle floats
- Images: hero = phone in hand, warm light; feature-1 = friends with phones
  (no faces); feature-2 = colorful abstract app screens; feature-3 = sunny
  lifestyle; detail = phone macro, warm

### 07 · design-07-robotics — "Kestrel" — Hardware/robotics
- Palette: graphite #1A1D21 · safety orange #FF5C00 · steel #C7CDD4 ·
  blueprint #12395B (blueprint sections)
- Typography: Barlow Condensed (display) + Barlow (body)
- Layout: technical grid; hero product shot; exploded-view spec section;
  engineering; use cases; metrics; CTA; footer
- Mood: precise, powerful, engineered
- Motion: mechanical eases, leader-line draws, spec callouts
- Images: hero = robotic arm, dark lab; feature-1 = robot joint macro;
  feature-2 = factory floor; feature-3 = engineer hands (no face);
  detail = mechanical component macro

### 08 · design-08-fintech — "Ledgerline" — Fintech API
- Palette: paper #FDFCF8 · deep green #0E3B2E · gold #C9A227 · ink
- Typography: Bricolage Grotesque (display) + Inter (body)
- Layout: editorial, numbers-led; hero stats; ledger-cascade API section;
  code sample; metrics; compliance; pricing; CTA; footer
- Mood: solid, trustworthy, exact
- Motion: count-ups, ledger row reveals, restrained fades
- Images: hero = gold lines on deep green (abstract); feature-1 = modern bank
  architecture; feature-2 = hand holding card (no face); feature-3 = financial
  district; detail = chip macro, gold

### 09 · design-09-opensource — "Commons" — Open-source project
- Palette: warm paper #F7F3EA · purple #7C3AED · green #16A34A · ink
- Typography: Public Sans (display) + IBM Plex Mono (accents)
- Layout: community hero; contribution-fill wall; features; showcase grid;
  docs teaser; CTA; footer
- Mood: welcoming, energetic, collective
- Motion: tile flips, commit counter, warm rises
- Images: hero = collaboration table, warm daylight; feature-1 = community
  meetup (no faces); feature-2 = laptops with code; feature-3 = mural wall;
  detail = sticky-notes macro

### 10 · design-10-webgl — "Prism" — Experimental 3D-led
- Palette: black #060608 · iridescent violet/cyan (subtle, art-directed) ·
  white #FFFFFF
- Typography: Unbounded (display) + Inter (body)
- Layout: full-bleed immersive; 3D-dolly journey centerpiece; lab notes;
  about; CTA; footer; overlay nav
- Mood: daring, sensory, futuristic
- Motion: camera dolly, parallax depth, one invert flash max
- Images: hero = chrome 3D render (dark); feature-1 = iridescent material
  macro; feature-2 = dark studio; feature-3 = geometric installation;
  detail = glass prism macro

## Spacing pass (binding, before QA)

Generous clamp() section padding; consistent vertical rhythm; no cramped
rows, no dead gaps, no content tucking under nav. Verify by code inspection
at 360 / 768 / 1440 widths.

## QA gate (per design, with real fixes)

Contract grep (no `:root`, no platform imports) · `useCustom` for
brand/prices/images/contact · `data-tour` on 3+ sections · all images have
alt · no emojis/lorem · reduced-motion path renders fully visible ·
responsive classes at 360/768/1440 · video ffprobe (~10s, H.264, 720p) ·
LoopVideo integration correct · `npx oxlint` clean.
