# ATELIER — Restaurant: Art Direction

Binding: `REACT_TEMPLATE_CONTRACT.md` (token names, scoped vars),
`RESTAURANT_BRIEF.md` (section order, interactions), `BUILDER_GUIDE.md`.

Global rules: no generic purple/blue gradients, no cheap gold (metallics are
10% accents only, desaturated, never gradients), no neon, no emojis. Every
palette is 60/30/10 (dominant / structural / accent). Every design owns a
unique display+body pairing — no two pairings repeat in this category.

Food photography direction (all 10): Michelin-grade styling, honest texture,
steam/gloss where appetizing, shallow depth of field on plated dishes,
no plasticky renders, no text, no watermarks. A bad food photo fails the
design — regenerate without hesitation.

Token names: `--color-background`, `--color-surface`, `--color-primary`,
`--color-secondary`, `--color-accent`, `--color-text`, `--color-muted`,
`--font-display`, `--font-body`.

---

## 01 — Lumière · Fine Dining

**Palette (60/30/10: near-black / ivory / brass)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#131110` | Near-black ground (60) |
| `--color-surface` | `#1D1A17` | Course panels, private-dining card |
| `--color-primary` | `#F2EAD9` | Ivory — headlines, wordmark (30) |
| `--color-secondary` | `#8A7B63` | Stone — hairlines, course labels |
| `--color-accent` | `#A88B4F` | Brass — numerals, seals, reserve CTA (10) |
| `--color-text` | `#E9E0CE` | Body copy |
| `--color-muted` | `#7E7461` | Quiet captions |

**Type pairing:** Cormorant Garamond + Outfit.
Cormorant light at large scale, extreme whitespace, italic for chef's notes.
Outfit in small tracked caps for course data (I–VII, wine pairings). Never more
than one idea per viewport — silence is the aesthetic.

**Layout:** Museum spacing — one course per viewport in the tasting section;
centered, symmetrical, still. Philosophy as a single column of long-form text.

**Imagery (5):** hero — single plated fine-dining dish on black slate, dramatic
side light; dish-1 — scallop crudo, citrus pearls, macro; dish-2 — dry-aged
duck breast, sliced, jus gloss; dish-3 — dark chocolate dessert, gold leaf
restraint; detail — chef's tweezers placing micro-herb, hands only.
Grade: low-key chiaroscuro, deep blacks, warm highlights.

**Personality:** Hushed · Precise · Ceremonial.
**Differentiation:** Nav is wordmark + Reserve only. Courses as Roman-numeral
movements. Footer is a colophon. CTA: "Reserve a table" — one, unhurried.

---

## 02 — Cucina Terra · Rustic Trattoria

**Palette (60/30/10: cream / wood / terracotta)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F7F0DF` | Warm cream ground (60) |
| `--color-surface` | `#EFE3C8` | Recipe cards, story panels |
| `--color-primary` | `#3A2A1E` | Wood-brown — headlines, nav (30) |
| `--color-secondary` | `#7C5B3A` | Oak — rules, secondary labels |
| `--color-accent` | `#B4552D` | Terracotta — stamps, CTA, Sunday-table flag (10) |
| `--color-text` | `#33261B` | Body copy |
| `--color-muted` | `#96805F` | Annotations |

**Type pairing:** Fraunces + Karla.
Fraunces with soft optical sizing for abundant headlines, italic for nonna
quotes. Karla for body and menu rows — warm, readable, unfussy. Prices in
Fraunces tabular.

**Layout:** Abundant, overlapping editorial — images break the grid like dishes
crowding a table; the menu reads as a chalkboard (dark panel inversion once).

**Imagery (5):** hero — family table laden with pasta, bread, wine, steam
rising, warm tungsten; dish-1 — hand-torn pappardelle with ragù, pecorino
shower; dish-2 — wood-fired margherita, leopard-spotted crust; dish-3 —
tiramisu in a rustic glass, cocoa dust; detail — flour-dusted hands rolling
pasta on wood.
Grade: warm tungsten, honest grain, appetite-first.

**Personality:** Warm · Hearty · Generous.
**Differentiation:** Chalkboard menu panel (the one dark inversion). Dishes
carry origin notes ("Nonna Elba's ragù"). CTA: "Book the big table".

---

## 03 — Agni · Modern Indian

**Palette (60/30/10: charcoal / ivory / ember)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#191410` | Charcoal ground (60) |
| `--color-surface` | `#241C16` | Dish panels, journey cards |
| `--color-primary` | `#F5EEDF` | Ivory — headlines (30) |
| `--color-secondary` | `#8C6E4E` | Ash-bronze — labels, dividers |
| `--color-accent` | `#D9622B` | Ember — fire markers, CTAs (10) |
| `--color-text` | `#EDE4D2` | Body copy |
| `--color-muted` | `#8A7A64` | Captions |

**Type pairing:** Rozha One + Manrope.
Rozha One — an Indian-rooted display serif — for bold, confident headlines.
Manrope for body and UI in tracked caps for section labels. Fire words set
large; restraint everywhere else.

**Layout:** Bold and architectural — full-bleed fire imagery, dishes grouped
by element (Smoke / Earth / Fire / Ice) as chapter-like bands.

**Imagery (5):** hero — modern plated Indian dish (scallop moilee) with smoke,
dark slate; dish-1 — tandoori lamb chops, char marks, mint dust; dish-2 —
butter chicken reimagined, tomato-fenugreek gloss; dish-3 — saffron
shrikhand dessert, pistachio; detail — tadka: hot oil with mustard seeds and
curry leaves hitting dal, sizzle frozen.
Grade: dramatic dark, ember warmth in highlights, crisp char texture.

**Personality:** Refined · Bold · Elemental.
**Differentiation:** Menu grouped by element, not course. Fire is a recurring
visual motif (never literal flames in UI — ember accent only). CTA: "Reserve".

---

## 04 — Chowk · Street Food

**Palette (60/30/10: paper / ink / chili)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F4ECDC` | Paper ground (60) |
| `--color-surface` | `#E9DCC2` | Crave-cards, legend panels |
| `--color-primary` | `#17130E` | Ink — poster type, nav (30) |
| `--color-secondary` | `#4A4238` | Warm graphite — secondary type |
| `--color-accent` | `#C1272D` | Chili — stickers, order pill, spice meters (10) |
| `--color-text` | `#17130E` | Body copy |
| `--color-muted` | `#7E7264` | Supporting copy |

**Type pairing:** Anton + Work Sans.
Anton — condensed, uppercase, poster-loud — for kinetic headlines. Work Sans
for everything functional. Spice-level meters and "LEGEND" badges are the
visual vocabulary.

**Layout:** Dense, sticker-covered, poster-like. Crave-cards in a fast grid;
marquee-ish energy without a marquee (04 owns kinetic slam instead).

**Imagery (5):** hero — street cart at night, giant tawa with dosa, steam
blasting, motion energy; dish-1 — chole bhature, glossy chole, steam;
dish-2 — pav bhaji, butter melting, ladi pav; dish-3 — kulfi falooda,
rose syrup drip; detail — hands assembling pani puri, vibrant chutneys.
Grade: high-contrast, saturated, night-market warmth — maximum crave.

**Personality:** Loud · Fast · Craveable.
**Differentiation:** Spice meters on every card, legend badges, order pill
sticky. CTA: "Order now" — repeated, highest density in the set.

---

## 05 — Umi · Omakase

**Palette (60/30/10: washi / ink / vermillion)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F5F2EA` | Washi ground (60) |
| `--color-surface` | `#ECE7D8` | Course cards, etiquette panels |
| `--color-primary` | `#1C1C1A` | Ink — headlines, nav (30) |
| `--color-secondary` | `#6E6A5E` | Stone — hairlines, labels |
| `--color-accent` | `#B03A2E` | Vermillion — hanko seal, seat CTA (10) |
| `--color-text` | `#232320` | Body copy |
| `--color-muted` | `#9A958A` | Whisper captions |

**Type pairing:** Shippori Mincho + Zen Kaku Gothic New.
Shippori Mincho (Japanese serif) for quiet, precise headlines. Zen Kaku
Gothic New for body and the etiquette list. Enormous whitespace; the page
breathes like the counter between courses.

**Layout:** Serene single column; the progression section is a horizontal
counter (pinned, desktop); etiquette as numbered quiet rules.

**Imagery (5):** hero — single piece of toro nigiri on dark ceramic, vast
negative space; dish-1 — sashimi moriawase, precise cuts; dish-2 — uni
gunkan, glistening; dish-3 — tamago, layered, macro; detail — chef's hands
forming nigiri, knife work.
Grade: minimal, precise, true color — nothing oversaturated.

**Personality:** Restrained · Precise · Reverent.
**Differentiation:** The only "served progression" mechanic. "12 seats"
scarcity framing. Etiquette as content. CTA: "Request a seat".

---

## 06 — Soil & Stem · Farm-to-Table

**Palette (60/30/10: cream / leaf / soil)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F6F1E2` | Cream ground (60) |
| `--color-surface` | `#ECE5D0` | Season cards, farm panels |
| `--color-primary` | `#2F4A2C` | Leaf — headlines, nav (30) |
| `--color-secondary` | `#7A5C3E` | Soil — rules, secondary labels |
| `--color-accent` | `#C07A2E` | Harvest — season dial, CTAs (10) |
| `--color-text` | `#2C3324` | Body copy |
| `--color-muted` | `#8B8A76` | Field notes |

**Type pairing:** Lora + Nunito Sans.
Lora — a rooted, readable serif — for honest headlines. Nunito Sans for
body and farm-source notes. Nothing precious; everything true.

**Layout:** Honest grid; the season dial is the centerpiece; farm-source
notes ("Row 7, picked this morning") on every dish.

**Imagery (5):** hero — hands pulling carrots from dark soil, morning light,
dew; dish-1 — heirloom tomato salad, basil, honest plating; dish-2 —
roast chicken with farm vegetables; dish-3 — berry galette, rustic;
detail — wooden crate of just-picked greens.
Grade: fresh daylight, true greens, earthy warmth.

**Personality:** Honest · Green · Grounded.
**Differentiation:** Season dial drives the menu. Farm-source notes
everywhere. CTA: "See today's menu".

---

## 07 — Aurelia · Rooftop Lounge

**Palette (60/30/10: midnight / sand / champagne)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#14161E` | Midnight ground (60) |
| `--color-surface` | `#1E212C` | Cocktail cards, view panels |
| `--color-primary` | `#EFE4CE` | Sand — headlines (30) |
| `--color-secondary` | `#7A7F94` | Dusk — labels, dividers |
| `--color-accent` | `#D9A05E` | Champagne — golden-hour markers, CTAs (10) |
| `--color-text` | `#E8DFCB` | Body copy |
| `--color-muted` | `#8B8FA3` | Quiet captions |

**Type pairing:** Italiana + Jost.
Italiana — single-weight, high-glamour — for sweeping headlines. Jost
(geometric sans) for body and cocktail specs. Golden-hour copy voice.

**Layout:** Full-bleed skyline imagery; cocktails as stars in a refined grid;
the "golden hour" (5–7pm) as a recurring ritual band.

**Imagery (5):** hero — smoked old fashioned at golden hour, city bokeh
behind; dish-1 — burrata with heirloom tomatoes, dusk light; dish-2 —
tuna tartare cones, elegant; dish-3 — chocolate fondant, gold dust
restraint; detail — bartender's pour, backlit amber.
Grade: golden-hour warmth, bokeh, cinematic.

**Personality:** Glamorous · Golden · Elevated.
**Differentiation:** Cocktails lead, food supports. Golden-hour ritual band.
CTA: "Reserve golden hour".

---

## 08 — Butter & Bloom · Patisserie

**Palette (60/30/10: blush / cocoa / rose)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F8F1E7` | Blush ground (60) |
| `--color-surface` | `#F1E4D3` | Case shelves, craft panels |
| `--color-primary` | `#3E2A22` | Cocoa — headlines, nav (30) |
| `--color-secondary` | `#8A6A52` | Crust — rules, labels |
| `--color-accent` | `#C48A7A` | Rose — bake-time flags, CTAs (10) |
| `--color-text` | `#3E2A22` | Body copy |
| `--color-muted` | `#A08B78` | Delicate captions |

**Type pairing:** Marcellus + Mulish.
Marcellus — quiet Roman elegance — for delicate headlines. Mulish for body
and the bake schedule. Generous letterspacing on eyebrows; everything soft.

**Layout:** The glass case — tiered shelves, morning-light panels; the bake
schedule as a timeline of the morning ("7:40 — croissants out").

**Imagery (5):** hero — croissant cross-section, honeycomb crumb, morning
light; dish-1 — pistachio entremet, mirror glaze; dish-2 — sourdough loaf,
scored ear, flour dust; dish-3 — fruit tart, glazed berries; detail —
hands laminating dough, butter layers.
Grade: soft morning light, delicate, appetizing crumb texture.

**Personality:** Delicate · Crafted · Morning-fresh.
**Differentiation:** Bake-time notes on every item. Tiered glass-case
presentation. CTA: "Pre-order for morning".

---

## 09 — Hotbox · Cloud Kitchen

**Palette (60/30/10: paper / ink / signal)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F4F4F0` | Paper ground (60) |
| `--color-surface` | `#E8E8E2` | Lane cards, tracker panels |
| `--color-primary` | `#141414` | Ink — headlines, nav (30) |
| `--color-secondary` | `#5A5A56` | Graphite — secondary type |
| `--color-accent` | `#FF5C1A` | Signal orange — timers, order CTA, lane flags (10) |
| `--color-text` | `#141414` | Body copy |
| `--color-muted` | `#8A8A84` | Meta text |

**Type pairing:** Bricolage Grotesque + Inter.
Bricolage — characterful, modern — for bold app-like headlines. Inter for
the entire transactional UI: lanes, timers, tracker. Speed is the aesthetic.

**Layout:** App-density. Dispatch lanes (Biryani / Burger / Dessert) as
horizontal bands; order tracker as a 3-step timeline; deals as bold flags.

**Imagery (5):** hero — delivery box opening, steam bursting out, bold;
dish-1 — dum biryani, saffron rice, steam; dish-2 — smash burger, cheese
pull; dish-3 — molten chocolate box cake; detail — hands sealing a box,
"hot" sticker.
Grade: bold, high-contrast, steam-forward — appetite at speed.

**Personality:** Fast · Bold · Thumb-first.
**Differentiation:** Dispatch lanes, live-feel timers, tracker timeline.
The only app-pattern nav. CTA: "Order now — 30 min".

---

## 10 — Encore · Chef's Table

**Palette (60/30/10: black / bone / crimson)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#0D0C0A` | Black ground (60) |
| `--color-surface` | `#171410` | Act panels, playbill cards |
| `--color-primary` | `#EFE6D4` | Bone — headlines (30) |
| `--color-secondary` | `#7A6F5C` | Ash — labels, dividers |
| `--color-accent` | `#B3352B` | Crimson — act markers, ticket CTA (10) |
| `--color-text` | `#E9DFC9` | Body copy |
| `--color-muted` | `#8A7F6A` | Playbill notes |

**Type pairing:** Abril Fatface + Space Mono.
Abril Fatface — theatrical, high-drama — for act titles. Space Mono for
"stage directions", course notes, and the box-office UI. Dinner as theatre.

**Layout:** Playbill structure — Acts I/II/III as curtain-reveal sections;
cast list for the team; box-office for booking.

**Imagery (5):** hero — cloche being lifted, smoke billowing, dramatic;
dish-1 — "the forest floor" — mushroom dish, moss, drama; dish-2 — liquid
nitrogen dessert, vapor; dish-3 — "ember" — fire-finished dish; detail —
chef plating with tweezers under a spotlight.
Grade: theatrical dark, spotlight pools, smoke and vapor.

**Personality:** Theatrical · Daring · Unrepeatable.
**Differentiation:** Playbill menu, act curtains, box-office booking.
CTA: "Book tickets" — the only ticket-framed CTA.

---

## Cross-design contrast (for QA)

- Dark grounds: 01, 03, 07, 10. Light grounds: 02, 04, 05, 06, 08, 09.
- Accent hues all distinct: brass 01 / terracotta 02 / ember 03 / chili 04 /
  vermillion 05 / harvest 06 / champagne 07 / rose 08 / signal orange 09 /
  crimson 10.
- All 10 display+body pairings unique within the category.
- Japanese (05) and Indian-rooted (03) display faces used with cultural
  specificity — never as costume.
