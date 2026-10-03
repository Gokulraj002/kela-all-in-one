# ATELIER — Coffee & Café: Art Direction (Phase 2)

Author: Agent B (Creative Art Director). Status: Phase 2 complete — ready for Phase 3 (motion) and Phase 4 (build).

Binding references: `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` (token names, scoped vars),
`src/templates/coffee/COFFEE_BRIEF.md` (research, section order, interactions), `BUILDER_GUIDE.md`.

Global rules applied to all ten: no generic purple/blue gradients, no cheap gold (metallics are
accents only, desaturated and sparing), no neon, luxury restraint, no emojis, each palette is
art-directed 60/30/10 (dominant / structural / accent), and every design owns a unique
display+body type pairing — no two pairings repeat.

Token names used below are the contract tokens: `--color-background`, `--color-surface`,
`--color-primary`, `--color-secondary`, `--color-accent`, `--color-text`, `--color-muted`,
`--font-display`, `--font-body`.

---

## 01 — Ember & Oak · Artisan Coffee House

**Palette (60/30/10: cream / espresso / copper)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F6F1E8` | Warm cream page ground (60) |
| `--color-surface` | `#ECE2CE` | Parchment panels, menu boards |
| `--color-primary` | `#2B2118` | Espresso — headlines, nav, footer (30) |
| `--color-secondary` | `#6B4F33` | Oak brown — rules, dividers, labels |
| `--color-accent` | `#B07B3F` | Copper — underlines, stamps, CTAs (10) |
| `--color-text` | `#241B12` | Body copy |
| `--color-muted` | `#8A7A64` | Captions, hours |

**Type pairing:** Fraunces + Manrope.
Usage: Fraunces 72pt optical, soft-wonky axis on, for oversized zine headlines (clamp 3–7rem);
italic Fraunces for pull-notes and the time-of-day hero line. Manrope regular for body,
Manrope semibold all-caps 11px letterspaced 0.18em for eyebrows and menu categories. Prices in
Fraunces tabular figures — they are editorial, not commerce.

**Layout:** 12-column asymmetric editorial grid; headlines break the column edge and bleed over
imagery; menu board section on the parchment surface with tabbed categories in a chalkboard
rhythm (Espresso / Filter / Brunch / Bakes). Sections overlap: story text overlaps the gallery
image by half a column — magazine spread behavior.

**Visual hierarchy:** One enormous serif idea per viewport, then quiet body copy. Whitespace is
warm, never stark. The Visit block is visually calm and findable, never decorative.

**Imagery:** Morning sunlight through the interior, empty table set for the day; espresso
extraction macro; milk pour mid-swirirl; pastry-case croissant; barista hands tamping with
shallow depth of field. Grade: warm daylight, lifted shadows, slight amber cast, honest grain —
matches cream/espresso/copper exactly.

**Composition rules:** Images never sit in neat boxes — full-bleed or hard-edged crops that
break the grid; text sits on paper, never reversed out of photography except the hero;
one copper rule per section, never more.

**Personality:** Warm · Editorial · Grounded.

**Differentiation:**
- Nav: minimal top bar (wordmark / links / "Visit" CTA); on mobile a sticky bottom bar with
  two quick actions — Get directions, Menu. Only design with a mobile bottom quick-bar.
- Hero: sunlit interior, half-viewport image left, time-aware serif note right
  ("This morning's pour…") that swaps copy by hour.
- Product presentation: chalkboard-style menu tabs with sensory one-liners and serif prices —
  atmosphere first, commerce second.
- Footer: colophon style — small serif, house note, holiday-exception hours, like a journal's
  back page.
- CTA: single "Visit" primary; everything funnels to address + hours.

---

## 02 — Roastworks · Specialty Roastery

**Palette (60/30/10: kraft / charcoal / ember)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#E9DFCC` | Kraft paper ground (60) |
| `--color-surface` | `#DCCFB6` | Bag-card surface, timeline track |
| `--color-primary` | `#26211B` | Charcoal — headlines, nav, data (30) |
| `--color-secondary` | `#7A6A52` | Roast-brown — badges, secondary labels |
| `--color-accent` | `#C65A26` | Ember — roast-level markers, freshness dates, CTAs (10) |
| `--color-text` | `#231E16` | Body copy |
| `--color-muted` | `#8C7C66` | Specs, card metadata |

**Type pairing:** DM Serif Display + Inter.
Usage: DM Serif Display for confident short headlines (never long paragraphs — it stays a
label voice); Inter for everything informational: tasting-note badges, roast scales, origin
specs, tabular data. Badge text is Inter 10px uppercase, tracked — the tasting-card convention.

**Layout:** Rigid 12-col data grid, generous gutters; product cards carry a fixed badge block
(origin / altitude / process / roast / tasting notes) — the nerd-readable unit of the site.
Roast timeline runs as a horizontal scrubbed track; origin map sits in a full-width charcoal
panel for contrast (the one dark inversion).

**Visual hierarchy:** Specs first, story second. Freshness date ("Roasted Tue") outranks
marketing copy on every card. Two audiences served: retail cards left, wholesale panel right.

**Imagery:** Drum mid-roast glowing; single-origin bag flat-lay with beans; green-to-roasted
bean progression spread; espresso shot with crema; roaster's hands holding fresh beans.
Grade: warm industrial — neutral daylight with ember warmth in highlights, crisp texture,
no soft-focus romance.

**Composition rules:** Cards align to the grid with zero bleed; photography is square or
4:3, catalog-honest; the ember accent appears only on roast markers, freshness dates, and CTAs.

**Personality:** Technical · Honest · Industrial-warm.

**Differentiation:**
- Nav: utility shop nav (Single Origins / Blends / Decaf) + Wholesale link + cart. Only
  design with a dual-audience nav.
- Hero: roastery drum mid-roast, freshness promise headline ("Roasted this week") with the
  roast-day schedule as supporting data.
- Product presentation: tasting-note badges and roast-scale indicators on every card; roast
  date printed like a batch number. Trust through specifics.
- Footer: split retail/wholesale — roast-day schedule, volume tiers, training note.
- CTAs: "Shop beans" (retail) and "Wholesale" (B2B) as parallel primaries.

---

## 03 — Fika & Ljus · Scandinavian Café

**Palette (60/30/10: white / oak / fjord blue)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#FBFAF6` | White ground (60) |
| `--color-surface` | `#F0ECE2` | Pale oak-linen panels |
| `--color-primary` | `#33383B` | Soft ink — never pure black (30) |
| `--color-secondary` | `#B99A6B` | Oak — hairlines, material notes |
| `--color-accent` | `#5E7A8C` | Fjord blue — used only at dawn/dusk tints and quiet CTAs (10) |
| `--color-text` | `#2B2F33` | Body copy |
| `--color-muted` | `#9AA0A3` | Whisper captions |

**Type pairing:** Libre Baskerville + Instrument Sans.
Usage: Libre Baskerville for long, calm headlines at modest scale (2–3rem — the only design
where the headline whispers); Instrument Sans light for body at generous line-height 1.8.
Eyebrows are lowercase with wide tracking — soft, never shouty.

**Layout:** Vast whitespace; single serene column for editorial beats; the menu grouped by
moment (Morning / Fika / Evening) rather than category; sections separated by breathing
dividers (a thin oak rule that slowly expands — the "pause" animation).

**Visual hierarchy:** Room first, words second. The calmest visual weight of all ten — the
conversion is the promise of lingering.

**Imagery:** Pale birch interior in soft daylight, empty and serene; cardamom bun on ceramic;
slow pour-over in glass; open rye sandwich; ceramic cup on linen in window light.
Grade: desaturated, cool-pale, airy highlights, almost no contrast crush — like daylight
through linen.

**Composition rules:** Centered or near-centered compositions; images float in whitespace with
wide margins; never full-bleed; no badges, no marquees, no countdowns anywhere.

**Personality:** Calm · Luminous · Restrained.

**Differentiation:**
- Nav: ultra-minimal centered text links, generous letterspacing, no sticky CTA. The
  quietest nav in the set.
- Hero: pale interior, enormous whitespace, daylight-aware tint (cooler at dawn, warmer at
  dusk — CSS only), one quiet headline.
- Product presentation: menu grouped by time-of-day with seasonal bake notes; light roasts
  described by feeling, not specs.
- Footer: whisper-minimal — address, hours, one contact line.
- CTA: soft "Visit" — low pressure, always secondary to the room.

---

## 04 — Rush Hour Coffee · Urban Coffee

**Palette (60/30/10: bone / ink / burnt orange)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F2EBDC` | Bone ground (60) |
| `--color-surface` | `#E4D8C0` | Poster panels, location cards |
| `--color-primary` | `#141311` | Ink — type blocks, nav, footer (30) |
| `--color-secondary` | `#3E3B34` | Warm graphite — secondary type |
| `--color-accent` | `#DE4E1D` | Burnt orange — ticker, order pill, hover states (10) |
| `--color-text` | `#141311` | Body copy |
| `--color-muted` | `#7E7668` | Supporting copy |

**Type pairing:** Fraunces + Space Grotesk.
Usage: Fraunces at poster weight — enormous, tight leading, uppercase treatments for the
kinetic headline; Space Grotesk for everything functional at medium weight with wide tracking
for labels. The contrast is the point: classical serif made to shout.

**Layout:** Dense, poster-like; full-width marquee ticker of the day's specials under the nav;
hero is type-first with a cropped street-energy image slashed diagonally; locations as
high-contrast cards; menu as fast priced rows with quick-add.

**Visual hierarchy:** Speed. CTA and price are never more than a glance away; storytelling
sections (city/community) sit last and are skimmable.

**Imagery:** Barista at the machine in a gritty-chic shop; iced coffee in to-go cup with
condensation; espresso shot pulled fast; breakfast sandwich grab-and-go; shopfront signage at
rush hour. Grade: high-contrast, warm-neon-free street warmth, slight motion energy —
matches bone/ink/burnt orange.

**Composition rules:** Cropped hard, rotated a degree or two on stickers/badges; ink blocks
reverse type to bone; burnt orange only on the ticker, the order pill, and hover inversions.

**Personality:** Loud · Fast · Unapologetic.

**Differentiation:**
- Nav: bold top bar with a sticky "Order ahead" pill that never leaves the viewport; on
  mobile an app-like bottom tab bar (Menu / Order / Locations) — the only app-pattern nav.
- Hero: kinetic serif headline with street-energy crop, order-ahead CTA dominant.
- Product presentation: grab-and-go rows, priced, filterable (Hot / Cold / Food), quick-add
  affordance on every row.
- Footer: big-type location list with per-spot hours; loyalty note.
- CTA: "Order ahead" repeated everywhere — highest CTA density in the set.

---

## 05 — The Copper Kettle · Vintage Café

**Palette (60/30/10: cream / oxblood / brass)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F4ECDC` | Aged cream ground (60) |
| `--color-surface` | `#E9DBC0` | Parchment cards, guestbook paper |
| `--color-primary` | `#571C20` | Oxblood — headlines, crest, reservation ticket (30) |
| `--color-secondary` | `#7A5326` | Dark brass-brown — rules, secondary type |
| `--color-accent` | `#B08A3C` | Brass — the machine's glint, seals, ticket edges (10) |
| `--color-text` | `#33231C` | Body copy |
| `--color-muted` | `#97816B` | Annotations, dates |

**Type pairing:** Playfair Display + Manrope.
Usage: Playfair Display with letterspaced small-caps eyebrows for the heritage voice;
longer, bookish paragraphs allowed here (the only design that reads like a chapter);
Manrope for form labels, menu prices, and UI. "Since" dates set in Playfair italic.

**Layout:** Centered, print-like; crest wordmark top-center; decade timeline as the
structural spine (scrubbable horizontally, vertical on mobile); classic menu annotated with
the year each item joined ("on the menu since 1974"); guestbook as handwritten-feel cards.

**Visual hierarchy:** History first. The timeline is the page's skeleton; menu and craft
hang off it. Reservation is the premium path and is styled as a printed table ticket.

**Imagery:** Wood-and-brass interior in warm tungsten light; classic cappuccino in vintage
cup and saucer; traditional pastry (éclair / sachertorte); brass lever machine detail;
aged menu board patina. Grade: sepia-tinged, tungsten warmth, soft vignette — patina as a
grade, matched to cream/oxblood/brass.

**Composition rules:** Symmetry and centering; images in thin brass rules like framed
prints; texture overlays (letterpress grain) kept subtle; nothing rotates, nothing shouts.

**Personality:** Heritage · Ritual · Patina'd.

**Differentiation:**
- Nav: classic centered crest wordmark, serif links; reservation link styled as a printed
  ticket — the only crest nav.
- Hero: patina interior, heritage serif, "since 1962" framing.
- Product presentation: menu as annotated classics with joining-year annotations; the lever
  machine as a product of craft.
- Footer: letterpress-style, private-events note, heritage sign-off.
- CTA: "Reserve a table" — the only reservation-first CTA in the set.

---

## 06 — Maison Noir · Premium Coffee Brand

**Palette (60/30/10: near-black / champagne-light / champagne)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#100D0A` | Near-black ground (60) |
| `--color-surface` | `#1A1512` | Product plinths, ritual panels |
| `--color-primary` | `#D9C9A8` | Champagne — headlines, wordmark, lot numbers (30) |
| `--color-secondary` | `#6E5F45` | Dark bronze — hairlines, provenance labels |
| `--color-accent` | `#C9A961` | Champagne gold — embossed-seal detail, edition numbering ONLY (10, desaturated, never gradient) |
| `--color-text` | `#F2EBDD` | Body copy |
| `--color-muted` | `#8E8474` | Quiet captions |

**Type pairing:** Cormorant Garamond + Manrope.
Usage: Cormorant Garamond light at large scale with extreme whitespace for the cinematic
voice; italic Cormorant for manifesto lines. Manrope in small tracked caps for provenance
data (lot, altitude, edition). Never more than one idea per screen.

**Layout:** Museum spacing — one flagship product per viewport; provenance as numbered
editions ("Lot 47 of 200"); ritual as a slow editorial scroll; private circle as a single
serene signup. Slow cinematic reveals, product parallax.

**Visual hierarchy:** Scarcity and ritual. Numbered lots outrank product features; the
manifesto outranks the menu. Silence is the aesthetic — if it can be removed, remove it.

**Imagery:** Flagship bag in dramatic dark light; studio still-life product shots; dark
moody espresso cup; bean macro with oil sheen; embossed seal close-up. Grade: low-key
chiaroscuro, deep blacks, champagne highlights — no crushed detail in the product.

**Composition rules:** Centered, symmetrical, still; images full-bleed but slow; gold accent
appears on seals and numbering only — one glint per section maximum.

**Personality:** Opulent · Silent · Precise.

**Differentiation:**
- Nav: minimal luxury — wordmark, Collection, Provenance, Ritual, cart icon. The sparsest
  nav after Scandi, but dark and ceremonial.
- Hero: cinematic dark, single flagship product, one line of copy.
- Product presentation: 3–4 signature products with museum spacing, lot numbering,
  gift-wrap option at product level. Scarcity as layout.
- Footer: private-circle signup, restrained contact, no clutter.
- CTA: "Shop the collection" — singular, unhurried.

---

## 07 — Never Empty · Coffee Subscription

**Palette (60/30/10: cream / forest / terracotta)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F8F4E9` | Cream ground (60) |
| `--color-surface` | `#EFEBDA` | Builder panels, quiz cards |
| `--color-primary` | `#22392C` | Forest — headlines, builder steps, nav (30) |
| `--color-secondary` | `#5A6B4E` | Sage — secondary labels, reassurance microcopy |
| `--color-accent` | `#C96F3F` | Terracotta — CTA buttons, progress, price highlights (10) |
| `--color-text` | `#242E22` | Body copy |
| `--color-muted` | `#8B917F` | Helper text |

**Type pairing:** DM Serif Display + Plus Jakarta Sans.
Usage: DM Serif Display for the friendly promise headlines ("Never run out again");
Plus Jakarta Sans for the builder UI — steps, options, live price, FAQ. Reassurance
microcopy (pause / skip / cancel anytime) set in Jakarta medium at the same size as body —
a design material, not fine print.

**Layout:** Funnel, wizard-led. Hero CTA opens the plan builder (method → coffee → amount →
grind → frequency) with live price and a summary panel showing first-delivery date;
how-it-works in 3 steps; taste-quiz teaser; lineup; proof strip; pricing-clarity + FAQ.

**Visual hierarchy:** The completed configuration is the page's climax — every section points
at the builder. Reassurance copy sits at every decision point, never buried.

**Imagery:** Subscription box arriving / bag on a kitchen counter in morning light; bag
lineup as the choice set; beans pouring into a grinder; home pour-over setup; tasting-notes
card included in the box. Grade: fresh daylight, clean and appetizing, warm cream tones —
morning optimism.

**Composition rules:** Builder UI on forest-cream contrast panels; imagery lifestyle-warm;
terracotta reserved for CTAs, progress states, and the live price — never decorative.

**Personality:** Fresh · Reassuring · Sunny.

**Differentiation:**
- Nav: top bar with persistent "Build your plan" CTA; progress steps inside the builder —
  the only funnel nav.
- Hero: the promise (fresh, on your schedule, pause anytime) with plan-builder entry as
  the dominant action.
- Product presentation: builder-first, not catalog-first — products appear as configuration
  options inside the wizard; the lineup section is secondary.
- Footer: FAQ-forward (pause/skip/cancel clarity), gifting note.
- CTA: "Build your plan" — one verb, one funnel.

---

## 08 — The Whole Shelf · Coffee E-commerce

**Palette (60/30/10: white / espresso / caramel)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#FFFFFF` | White ground (60) |
| `--color-surface` | `#F5F1EA` | Card surfaces, filter bar |
| `--color-primary` | `#2A2019` | Espresso — headlines, nav, prices (30) |
| `--color-secondary` | `#6B563E` | Cocoa — secondary labels, review stars context |
| `--color-accent` | `#C08B4D` | Caramel — quick-add buttons, sale/featured flags, badges (10) |
| `--color-text` | `#2A2019` | Body copy |
| `--color-muted` | `#98908A` | Specs, counts |

**Type pairing:** Bodoni Moda + Inter.
Usage: Bodoni Moda for category headlines and the hero promotion — high-contrast Didone
elegance that still reads commercial; Inter for the entire commerce UI: filters, product
names, prices, cart drawer, checkout-minimal fields. Prices in Inter semibold tabular.

**Layout:** Shelf-density commerce. Hero as featured collection / seasonal promotion; shop-by-
category tiles; bestsellers row; sticky faceted filter toolbar (roast / origin / process /
price / sort with live counts); dense product grid with quick-add on every card; reviews
strip; brew-guide education.

**Visual hierarchy:** Comparison at speed — badges, price, and quick-add outrank story.
Facets and sort are always visible; the cart drawer is one tap away.

**Imagery:** Styled shelf of products, editorial; clean bean-bag product shots on white;
grinder equipment shots; boxed gift sets; packaging close-ups with label texture.
Grade: clean studio light, true whites, accurate product color — catalog honesty with an
editorial hero.

**Composition rules:** Grid-strict; product images on consistent backgrounds; caramel used
for action elements and flags only; hover reveals quick-add and quick-view.

**Personality:** Clean · Confident · Commercial.

**Differentiation:**
- Nav: category top nav with search and cart drawer; sticky filter toolbar on scroll —
  the only faceted-discovery nav.
- Hero: promo / featured collection with seasonal offer, not atmosphere.
- Product presentation: dense grid, taste badges, roast badges, quick-add on hover,
  quick-view modal, wishlist hearts. Built for comparison shopping.
- Footer: commerce-complete — shipping/returns clarity, buying guides, categories.
- CTA: "Add to cart" per card — distributed, not singular.

---

## 09 — From Cherry to Cup · Coffee Storytelling

**Palette (60/30/10: parchment / ink / harvest gold)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F2EBD8` | Parchment ground (60) |
| `--color-surface` | `#E8DCC0` | Chapter cards, pull-quote panels |
| `--color-primary` | `#211C13` | Ink — headlines, chapter titles (30) |
| `--color-secondary` | `#4A5D3A` | Forest — chapter markers, farmer-card accents |
| `--color-accent` | `#8A6D3B` | Harvest gold — progress bar, active chapter dot, pull-quote rules (10) |
| `--color-text` | `#211C13` | Long-form body copy |
| `--color-muted` | `#8B7F68` | Marginalia, glossary |

**Type pairing:** Cormorant Garamond + Instrument Sans.
Usage: Cormorant Garamond for long-form editorial chapters at reading measure (65ch),
pull quotes in large italic; Instrument Sans for chapter labels, data callouts (altitude,
varietal, process days), the progress nav, and glossary terms. The pairing reads as
documentary: literature over, field notes under.

**Layout:** Horizontal chapter scroll on desktop (pinned chapters with transitions),
vertical on mobile; chapter progress bar top with chapter names; pull quotes breaking the
column; farmer cards as protagonists; interactive processing-method diagram (washed /
natural / honey — click to see the flavor shift); epilogue newsletter signup.

**Visual hierarchy:** Reading is the conversion — chapter completion, time on site. Data
callouts (1,800m, washed, 12-day fermentation) punctuate the narrative like field notes.

**Imagery:** Coffee farm landscape at dawn; hands picking red cherries; drying beds in sun;
roast in progress; cupping table with steam. Grade: documentary warmth, natural light,
film-like grain, honest skin tones and earth — matches parchment/ink/forest.

**Composition rules:** Full-bleed cinematic chapter openers, then calm reading columns;
images captioned like a photo essay; forest green marks the human chapters, harvest gold
marks progress.

**Personality:** Lyrical · Documentary · Human.

**Differentiation:**
- Nav: chapter progress nav — side dots / top progress bar with chapter names, "next
  chapter" affordances. The only progress-driven nav.
- Hero: chapter title over cinematic farm image, "Begin the journey."
- Product presentation: there is no catalog — coffee appears as origin lots inside the
  narrative; the interactive process diagram is the "product" moment.
- Footer: epilogue — newsletter signup, glossary, credits like a film.
- CTA: "Continue" per chapter; final CTA is the newsletter ("Join the journey").

---

## 10 — Laboratory No. 9 · Experimental Café

**Palette (60/30/10: black / cream / persimmon)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#0D0C0A` | Black ground (60) |
| `--color-surface` | `#16130F` | Lab panels, session cards |
| `--color-primary` | `#F4EDE0` | Cream — kinetic headlines, nav (30) |
| `--color-secondary` | `#8A8478` | Ash — mono-style labels, secondary copy |
| `--color-accent` | `#F4562A` | Persimmon — experiment markers, booking CTA, flavor visualizer (10) |
| `--color-text` | `#F4EDE0` | Body copy |
| `--color-muted` | `#6E6A5E` | Protocol notes |

**Type pairing:** Fraunces + Instrument Sans.
Usage: Fraunces used kinetically — oversized, overlapping, rotating, viewport-filling
display type with italic interrupts ("BATCH 047 — TASTE THE UNREPEATABLE"); Instrument Sans
in small tracked caps as the lab-protocol label voice (method, batch, temp, time).
The kinetic treatment — not the fonts themselves — carries the avant-garde identity.

**Layout:** Immersive full-bleed; experiment menu framed as lab protocol with batch numbers;
sensory language section (flavor as color/texture/sound); method cards (siphon, nitro,
cascara, fermentation) with animated transitions; bookable tasting-session calendar;
short sharp manifesto.

**Visual hierarchy:** Sensory impact first, protocol second. The booking flow is always one
gesture away; the manifesto is three lines, not three paragraphs.

**Imagery:** Dramatic siphon brewer in dark lab light with vapor; tasting flight of three
small glasses; nitro pour cascading; abstract top-down latte art; macro coffee texture.
Grade: dark, dramatic, vapor and glass catching persimmon-warm highlights against black —
lab-noir, matched to black/cream/persimmon.

**Composition rules:** Full-bleed imagery with type overlapping at the edges; persimmon
only on interactive/booking elements and the flavor visualizer; unconventional cursor on
desktop; restraint in the booking stepper itself (daring outside, usable inside).

**Personality:** Daring · Sensory · Cryptic.

**Differentiation:**
- Nav: minimal avant-garde — hidden/overlay menu, small protocol labels, booking CTA
  always present. The only overlay nav.
- Hero: immersive sensory image, cryptic kinetic headline, "Book a session."
- Product presentation: the experiment menu as rotating lab protocol — batch numbers,
  method cards, sensory descriptors instead of a menu.
- Footer: manifesto fragment, session contact, minimal.
- CTA: "Book a session" — booking-first, the only calendar-driven CTA.

---

## Cross-design contrast notes (for QA)

- Light grounds: 01, 02, 03, 05, 07, 08, 09. Dark grounds: 06, 10. Only 04 mixes
  (bone ground with ink blocks) and 02 inverts once (charcoal map panel).
- No two designs share a display+body pairing; no two share the same accent hue family
  in the same role (copper 01 / ember 02 / fjord blue 03 / burnt orange 04 / brass 05 /
  champagne 06 / terracotta 07 / caramel 08 / harvest gold 09 / persimmon 10).
- Metallics (copper, brass, champagne, caramel) appear as 10% accents only, desaturated,
  never as gradients — per luxury-restraint rule.
- Fraunces appears in 01 (editorial zine), 04 (brutalist poster), 10 (kinetic avant-garde):
  same display family, three irreconcilable treatments — differentiated by scale, case,
  motion, and surrounding system.
- DM Serif Display appears in 02 (technical label voice) and 07 (friendly promise voice):
  differentiated by pairing body (Inter vs Plus Jakarta Sans) and context (data vs funnel).
- Cormorant Garamond appears in 06 (dark luxury) and 09 (parchment documentary):
  differentiated by ground (near-black vs parchment) and body pairing.
