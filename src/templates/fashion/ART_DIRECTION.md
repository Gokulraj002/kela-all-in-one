# ATELIER — Saree & Fashion: Art Direction (Phase 2)

Author: Art Director (subagent). Status: Phase 2 complete — ready for Phase 3 (motion) and Phase 4 (build).

Binding references: `~/workspace/atelier/REACT_TEMPLATE_CONTRACT.md` (token names, scoped vars),
`BUILDER_GUIDE.md`, and `src/templates/coffee/ART_DIRECTION.md` (format/depth reference).

Global rules applied to all ten: no generic purple/blue gradients anywhere, no cheap gold
(metallics are accents only, desaturated and sparing), no neon except design-10's deliberate
acid note, luxury restraint, no emojis, each palette is art-directed 60/30/10
(dominant / structural / accent), palettes are grounded in real textile color
(turmeric, indigo, kumkum, zari, ivory, charcoal, madder, rani pink, marigold, khadi),
and every design owns a unique display font — no display family repeats across the ten.

Token names used below are the contract tokens: `--color-background`, `--color-surface`,
`--color-primary`, `--color-accent`, `--color-text`, `--color-muted`,
`--font-display`, `--font-body`.

Fashion-specific cheap-AI traps guarded against in every design: plastic over-retouched skin,
glossy stock smiles, random decorative gradients, mannequin-sheen product renders,
and "ethnic" cliché styling. Hands, weave, and fabric must read as real.

---

## 01 — Heritage Handloom House · design-01-heritage

**Palette (60/30/10: khadi ivory / indigo / turmeric)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F4ECDA` | Khadi ivory page ground (60) |
| `--color-surface` | `#E7D9BC` | Loom-wood parchment panels, chapter cards |
| `--color-primary` | `#26355E` | Indigo dye — headlines, nav, footer (30) |
| `--color-accent` | `#D9A441` | Turmeric — weaver marks, chapter dots, CTAs (10) |
| `--color-text` | `#2B2318` | Body copy |
| `--color-muted` | `#8A7A5E` | Captions, dates, marginalia |

**Type pairing:** Rozha One + Mukta.
Usage: Rozha One for monumental craft headlines — the loom as monument, set large with
generous leading; Mukta (humanist, Devanagari-capable) for body and weaver-name captions.
Eyebrows in Mukta semibold caps, tracked, turmeric-colored: cluster names
("Kanchipuram · Pochampally · Chanderi").

**Layout:** Documentary editorial. Full-bleed loom imagery alternating with khadi reading
columns; a weaver-index (portrait + name + cluster + years at loom) as the human spine;
process chapters (Dye → Warp → Weave → Finish) as a horizontal scroll on desktop.

**Visual hierarchy:** The makers outrank the merchandise. Weaver portraits and process
imagery first; the saree collection appears inside the story, never as a cold catalog.

**Imagery:** Weavers at pit looms in shed light; indigo dye vats with hands lifting yarn;
warp threads in sun; macro of zari-less cotton weave; finished saree folded on teak.
Grade: warm shed daylight, honest 35mm grain, deep indigo shadows, turmeric highlights —
documentary, never styled.

**Material/texture language:** Khadi weave texture as background grain (subtle, real),
raw cotton matte, indigo dye, teak loom wood, brass bobbins and shuttles. Paper feels
handmade; rules feel like selvedge edges.

**Composition rules:** Images full-bleed or hard-cropped; captions set like photo-essay
credits (name · cluster · year); turmeric accent only on chapter markers and the
"Meet the weavers" CTA.

**Personality:** Reverent · Documentary · Human.

**What to avoid:** Glossy model shots; plastic skin or beauty-retouched weavers' hands —
hands must show work; "ethnic" stock-smile tropes; gold gradient dividers; dewy fashion
retouch anywhere near the loom.

**Differentiation:**
- Nav: cluster-based (Weavers / Process / Collection) + "Commission" link. The only
  maker-first nav.
- Hero: weaver at loom, full-bleed, one Rozha One line — craft as monument.
- Product presentation: sarees shown on the weaver or the loom first, flat-lay second;
  each piece carries its maker's name.
- Footer: craft credits like a film — dye masters, weavers, clusters.
- CTA: "Commission a weave" — the only commission-first CTA.

---

## 02 — Modern Minimalist Label · design-02-minimal

**Palette (60/30/10: paper / soft black / clay)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#FAF8F2` | Paper white ground (60) |
| `--color-surface` | `#ECE8DB` | Lookbook panels, product cards |
| `--color-primary` | `#191817` | Soft black — headlines, nav, prices (30) |
| `--color-accent` | `#9C6B4A` | Raw clay — the single warm note: size dots, CTA underline (10) |
| `--color-text` | `#191817` | Body copy |
| `--color-muted` | `#8B8577` | Specs, fabric notes |

**Type pairing:** Archivo + Inter.
Usage: Archivo at medium weight, tight tracking, for quiet confident headlines at modest
scale (the only design where restraint is the headline); Inter light for body and the
entire commerce UI. Product names in Archivo regular, prices in Inter tabular — commerce
without noise.

**Layout:** Severe grid, vast whitespace. One look per viewport; collection as a calm
editorial grid (no badges, no sale flags); fabric notes as small spec lines under each
piece. Nothing overlaps, nothing shouts.

**Visual hierarchy:** Garment first, words second. The cut and drape carry the page;
copy is reduced to fabric, fit, and price.

**Imagery:** Garments on invisible forms or calm standing figures in overcast daylight;
flat-lays on paper; macro of seam finishing and raw edges; empty studio corner.
Grade: soft overcast daylight, desaturated, barely-there grain, true whites — like
looking through clean glass.

**Material/texture language:** Paper, raw silk matte, undyed cotton, brushed steel
hardware, pale concrete. Surfaces are matte; the only sheen is a silk close-up.

**Composition rules:** Centered or grid-strict; images never full-bleed; clay accent
appears on at most one element per viewport; no rotation, no overlap, no shadows.

**Personality:** Quiet · Precise · Confident.

**What to avoid:** Any gradient whatsoever; drop shadows; glossy buttons; lifestyle
clutter and smiling stock faces; "shop the look" popups; urgency badges.

**Differentiation:**
- Nav: whisper-minimal — wordmark, Collection, Journal, discreet cart count.
- Hero: single garment, enormous whitespace, one quiet line.
- Product presentation: lookbook grid, fabric-first spec lines, no promotional language.
- Footer: minimal — stockists, care guide, contact.
- CTA: soft "Add to bag" — commerce as quiet service.

---

## 03 — Bridal Couture · design-03-bridal

**Palette (60/30/10: kumkum maroon / ivory-gold / zari)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#311316` | Deep kumkum-maroon ground (60) |
| `--color-surface` | `#421A1E` | Ceremony panels, couture cards |
| `--color-primary` | `#F3E3C2` | Ivory-gold — headlines, wordmark, ceremony names (30) |
| `--color-accent` | `#C6A15B` | Zari gold — embroidery details, seals, CTAs (10, desaturated, never gradient) |
| `--color-text` | `#F6EBD4` | Body copy |
| `--color-muted` | `#A98F7B` | Quiet captions, ritual notes |

**Type pairing:** Cinzel + Jost.
Usage: Cinzel for inscriptional, ceremonial headlines — the voice of vows and heirlooms;
Cinzel's classical caps for ceremony names (Mehendi / Sangeet / Pheras). Jost light for
body and atelier notes; italic Jost for the couturier's hand-written-feel annotations.

**Layout:** Ceremonial procession. Chapters by ceremony, each opening full-bleed;
couture pieces presented one per viewport like museum objects; the atelier (karigars,
embroidery frames) as a reverent interlude; private appointment as the serene finale.

**Visual hierarchy:** Ceremony first, garment second, commerce last. The appointment —
not the price — is the conversion.

**Imagery:** Lehenga embroidery macro with zari catching candlelight; draped silhouette
in dark studio; karigar hands at the adda frame; marigold and silk in the atelier;
bridal portrait in low-key light, unsmiling, regal.
Grade: candlelit warmth, low-key chiaroscuro, zari highlights against deep maroon
shadows, fine 65mm-style grain — opulence through shadow, not brightness.

**Material/texture language:** Zari gold thread (accent only), velvet, raw silk sheen,
marigold, sandalwood. Gold is thread and seal, never background wash.

**Composition rules:** Symmetrical, still, centered; zari accent on embroidery details
and the appointment seal only — one glint per section; type reversed to ivory-gold,
never over busy imagery.

**Personality:** Regal · Ceremonial · Unhurried.

**What to avoid:** Plastic over-retouched skin; neon-ish red saturation; generic gold
gradients and lens flares; stock "Indian bride" poses with glossy smiles; countdown
timers or sale language — nothing here is discounted.

**Differentiation:**
- Nav: ceremony chapters + "Private appointment" as the only CTA. The most ceremonial nav.
- Hero: dark bridal portrait, one Cinzel line — a vow, not a headline.
- Product presentation: one couture piece per viewport, museum spacing, ceremony-tagged.
- Footer: atelier address, appointment line, heirloom-restoration note.
- CTA: "Book a private appointment" — singular, unhurried.

---

## 04 — Streetwear Fusion · design-04-street

**Palette (60/30/10: ink / bone / vermilion)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#111110` | Ink-black ground (60) |
| `--color-surface` | `#1D1D1B` | Drop cards, look panels |
| `--color-primary` | `#F2EFE6` | Bone — kinetic headlines, nav (30) |
| `--color-accent` | `#E8442E` | Vermilion (sindoor red-orange) — ticker, drop timer, CTA pill (10) |
| `--color-text` | `#F2EFE6` | Body copy |
| `--color-muted` | `#8F8B80` | Drop metadata, stock counts |

**Type pairing:** Anton + Space Grotesk.
Usage: Anton at enormous scale, uppercase, tight leading — kinetic poster headlines that
collide with imagery; italic or outlined Anton for interrupt lines ("DROP 07 — SOLD OUT
IN 11 MIN"). Space Grotesk medium for product names, drop data, and UI; tracked caps
for the ticker.

**Layout:** Poster-dense and kinetic. Marquee ticker under nav; hero is type-first with a
hard-cropped street image slashed diagonally; drops as high-contrast cards with live
stock counts; lookbook as a fast horizontal strip.

**Visual hierarchy:** Speed and scarcity. Drop timer and stock count outrank storytelling;
price and size selector never more than a glance away.

**Imagery:** Models in motion on the street at night; flash-lit product shots; screen-print
close-ups; crowd energy at a drop event; sticker-bombed details.
Grade: high contrast, flash-frozen, sodium-street warmth, hard shadows, visible grain —
shot on the move, not in a studio.

**Material/texture language:** Denim, canvas, screen-print ink, concrete, safety-orange
thread, sticker vinyl. Texture is urban and printed, never soft.

**Composition rules:** Cropped hard; stickers/badges rotated a degree or two; vermilion
only on ticker, timer, CTA pill, and hover inversions; bone type reversed out of ink
blocks.

**Personality:** Loud · Fast · Unapologetic.

**What to avoid:** Soft beauty light; pastel gradients; corporate smiles; over-smoothed
skin; luxury serif voice; anything that reads as a mall brand.

**Differentiation:**
- Nav: bold top bar with persistent vermilion drop-timer pill; mobile bottom tab bar
  (Drops / Lookbook / Cart) — the only app-pattern nav in fashion.
- Hero: kinetic Anton headline colliding with a night-street crop.
- Product presentation: drop cards with live stock counts, size grid, quick-add.
- Footer: big-type stockist list, community note, no formality.
- CTA: "Cop the drop" — highest CTA density in the set.

---

## 05 — Sustainable Slow Fashion · design-05-slow

**Palette (60/30/10: oat / moss / madder)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#EDE4CC` | Oat ground (60) |
| `--color-surface` | `#DECFAC` | Journal panels, impact cards |
| `--color-primary` | `#3B422B` | Moss — headlines, nav, footer (30) |
| `--color-accent` | `#9C4F2A` | Madder root — impact numbers, CTA, progress (10) |
| `--color-text` | `#2E2A1F` | Body copy |
| `--color-muted` | `#7E7460` | Field notes, captions |

**Type pairing:** Fraunces + Work Sans.
Usage: Fraunces with its soft-wonky axis for earthy editorial headlines — the voice of
the field journal; italic Fraunces for farmer/dyer pull-quotes. Work Sans for body,
impact data, and the transparency UI (cost breakdown, maker list). Impact numbers in
Fraunces tabular — data with warmth.

**Layout:** Editorial journal. Chapters (Grow → Dye → Sew → Wear → Mend); impact
dashboard as honest data panels (water, wages, miles); maker cards as protagonists;
a visible cost-breakdown per garment; mend/repair program as a standing section.

**Visual hierarchy:** Transparency is the product. Impact numbers and maker names outrank
marketing copy; the cost breakdown sits on the product card itself.

**Imagery:** Cotton fields at golden hour; hands with madder-dyed yarn; natural dye pots;
sewing atelier in daylight; worn-and-mended garments, beautifully aged.
Grade: golden-hour natural light, film grain, earthy muted saturation, soft shadows —
honest and sun-warmed.

**Material/texture language:** Handloom cotton, undyed wool, terracotta, jute, indigo
patchwork, visible mending stitches (sashiko-like). Nothing is new-looking on purpose.

**Composition rules:** Full-bleed field openers, calm reading columns after; images
captioned like field notes; madder accent only on impact data and CTAs.

**Personality:** Honest · Earthy · Patient.

**What to avoid:** Fast-fashion gloss; white-background packshots; plastic skin;
greenwashing leaf icons and green gradients; vague "eco" claims without numbers.

**Differentiation:**
- Nav: journal chapters + "Our impact" + repair-program link. The only transparency nav.
- Hero: field at golden hour, Fraunces headline as a promise, not a pitch.
- Product presentation: cost-breakdown on every card; maker attribution per garment.
- Footer: impact report, repair booking, take-back program.
- CTA: "Meet your maker" alongside "Add to bag" — provenance as conversion.

---

## 06 — Luxury Silk Maison · design-06-silk

**Palette (60/30/10: near-black / champagne / silk-light)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#0D0B09` | Near-black ground (60) |
| `--color-surface` | `#161210` | Plinth panels, maison chapters |
| `--color-primary` | `#EBDCBE` | Champagne silk — headlines, wordmark (30) |
| `--color-accent` | `#D8C29A` | Pale champagne — seal detail, edition numbering ONLY (10, matte, never gradient) |
| `--color-text` | `#F0E6D2` | Body copy |
| `--color-muted` | `#847768` | Quiet captions |

**Type pairing:** Bodoni Moda + Manrope.
Usage: Bodoni Moda light at large scale with extreme whitespace — high-contrast Didone
for the cinematic voice; italic Bodoni for manifesto lines. Manrope in small tracked
caps for maison data (mommes, weave, edition). Never more than one idea per screen.

**Layout:** Museum spacing — one silk piece per viewport; provenance as numbered editions;
the weave as a slow editorial scroll (sericulture → throwing → weaving); private salon
as a single serene signup.

**Visual hierarchy:** Scarcity and ritual. Edition numbers outrank product features; the
manifesto outranks the menu. Silence is the aesthetic.

**Imagery:** Silk saree in single-source dark light, sheen tracing the drape; mulberry
cocoons macro; loom in darkness with one shaft of light; still-life of folded silk on
black marble; seal close-up.
Grade: dark cinematic, single key light, silk-sheen highlights, detailed blacks, subtle
grain — chiaroscuro matched to near-black/champagne.

**Material/texture language:** Mulberry silk sheen, champagne satin, dark teak, black
marble, pearl. Sheen is the material story — light moving across silk.

**Composition rules:** Centered, symmetrical, still; images full-bleed but slow;
champagne accent on seals and numbering only — one glint per section maximum.

**Personality:** Opulent · Silent · Precise.

**What to avoid:** Gold gradients; purple/blue gradients especially; over-lit
e-commerce white; plastic mannequin sheen; more than one idea per screen.

**Differentiation:**
- Nav: minimal luxury — wordmark, Collection, Maison, Salon. The sparsest nav in fashion.
- Hero: cinematic dark, single silk drape, one line of copy.
- Product presentation: 3–4 signature silks with museum spacing, edition numbering.
- Footer: private-salon signup, restrained contact.
- CTA: "Enter the salon" — singular, unhurried.

---

## 07 — Multi-Designer Boutique · design-07-boutique

**Palette (60/30/10: gallery white / ink / rani pink)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#FCFBF8` | Gallery-white ground (60) |
| `--color-surface` | `#F1EEE7` | Designer cards, exhibition panels |
| `--color-primary` | `#1E1C19` | Ink — headlines, nav (30) |
| `--color-accent` | `#BE2F5B` | Rani pink — exhibition dates, curator picks, CTA (10) |
| `--color-text` | `#1E1C19` | Body copy |
| `--color-muted` | `#8E8A80` | Designer bios, dates |

**Type pairing:** Marcellus + Outfit.
Usage: Marcellus for refined gallery headlines — classical but contemporary, the
curator's voice; set at moderate scale with wide margins. Outfit for designer names,
exhibition data, filters, and UI. Designer names in Marcellus regular feel like wall
labels.

**Layout:** Gallery curation. Designers as an indexed roster (wall-label cards);
"current exhibition" as the hero rotation; pieces grouped by designer, never by trend;
editorial notes from the curator; appointment-based styling service.

**Visual hierarchy:** The curator's eye first. Exhibition framing outranks individual
products; designer identity outranks price.

**Imagery:** Boutique interior like a white-box gallery; garments on minimal rails;
designer portraits in their studios; exhibition-style installations; detail shots as
"object studies."
Grade: gallery white-box light, neutral color, crisp, minimal grain — accurate and calm.

**Material/texture language:** White plaster, pale oak rails, glass, brushed brass,
cotton dust covers. The space is the material.

**Composition rules:** Grid-strict roster; generous margins; rani pink only on
exhibition markers, curator picks, and the appointment CTA; no overlapping elements.

**Personality:** Curated · Composed · Discerning.

**What to avoid:** Busy collage layouts; drop shadows; gradient overlays on images;
stock-model grins; trend-chasing language ("hot," "must-have").

**Differentiation:**
- Nav: Designers index / Exhibitions / Journal / Styling appointment. The only
  roster-driven nav.
- Hero: current exhibition — one designer, gallery framing, dates in rani pink.
- Product presentation: designer-grouped, wall-label cards with curator notes.
- Footer: designer application note, press, appointment contact.
- CTA: "Book a styling appointment" — service-first.

---

## 08 — Menswear Tailoring · design-08-tailor

**Palette (60/30/10: chalk ecru / ink-charcoal / oxblood)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#F1EEE6` | Chalk-ecru ground (60) |
| `--color-surface` | `#E3DDCE` | Fitting-book panels, cloth cards |
| `--color-primary` | `#23211C` | Ink-charcoal suiting — headlines, nav (30) |
| `--color-accent` | `#7A2A26` | Oxblood — chalk-mark details, booking CTA (10) |
| `--color-text` | `#23211C` | Body copy |
| `--color-muted` | `#857D6C` | Measurements, cloth specs |

**Type pairing:** Spectral + IBM Plex Sans.
Usage: Spectral for precise, contemporary-serif headlines — the voice of the cutting
table; Spectral's technical clarity suits measurements and method. IBM Plex Sans for
specs, measurement tables, cloth codes, and the booking UI — tabular, exact.

**Layout:** The fitting book. Cloth library as swatch-indexed cards (mill, weight,
composition); the cut explained in measured steps; fitting process as a 3-appointment
timeline; master tailor portraits; booking as a proper appointment ledger.

**Visual hierarchy:** Precision first. Measurements, cloth specs, and appointment slots
outrank lifestyle imagery; the tape measure is a design motif, not decoration.

**Imagery:** Master tailor chalking a lapel; shears on worsted wool; basted jacket on the
stand; cloth bolts in the library; fitting in north-light studio.
Grade: cool north-light, precise medium contrast, fine grain, true fabric color —
the fitting room, honestly lit.

**Material/texture language:** Worsted wool, chalk lines, horn buttons, oxblood leather,
steel shears, mahogany. Surfaces feel cut and measured.

**Composition rules:** Ruled lines like pattern paper; spec tables grid-strict;
oxblood only on chalk-mark motifs and the booking CTA; imagery captioned with
measurements.

**Personality:** Precise · Sartorial · Assured.

**What to avoid:** Glossy magazine retouch; neon accents; gradient backgrounds;
cartoon needle-and-thread icons; "sharp look" clichés.

**Differentiation:**
- Nav: Cloth Library / The Cut / Fittings / Journal + "Book a fitting." The only
  spec-driven nav.
- Hero: tailor's hands chalking cloth, Spectral headline as a statement of method.
- Product presentation: cloth-first (choose cloth, then silhouette); made-to-measure
  steps, not SKUs.
- Footer: fitting ledger note, cloth-mill credits, care.
- CTA: "Book a fitting" — appointment-first, like a tailor's book.

---

## 09 — Festive Ethnic Wear · design-09-festive

**Palette (60/30/10: peacock green / marigold ivory / marigold)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#14342C` | Deep peacock-green ground (60) |
| `--color-surface` | `#1C463A` | Celebration panels, collection cards |
| `--color-primary` | `#F5E7C6` | Marigold ivory — headlines, nav (30) |
| `--color-accent` | `#E07B1A` | Marigold — diya dots, occasion tags, CTA (10) |
| `--color-text` | `#F7ECD2` | Body copy |
| `--color-muted` | `#9AA08C` | Captions, occasion notes |

**Type pairing:** Yatra One + Hind.
Usage: Yatra One for celebratory display — decorative, festive, unapologetically joyful
headlines for Diwali/ wedding-season collections; Hind (clean, Devanagari-capable) for
body, occasion tags, and UI so the decoration never harms readability.

**Layout:** Celebration calendar. Collections grouped by occasion (Diwali / Shaadi /
Pongal / Eid); lookbook as a vibrant horizontal strip; gifting section with wrapping
notes; family-group styling ("dress the baraat") as a joyful feature.

**Visual hierarchy:** Occasion first. The festival calendar drives discovery; color
stories per occasion; gifting CTA sits beside every collection.

**Imagery:** Marigold garlands and diyas; bandhani and mirror-work macro; families
dressed for celebration, laughing for real; festive table with textiles; twilight
courtyard in warm light.
Grade: celebratory warm light, marigold-hour glow, rich saturation held just back from
clipping, lively grain — festivity with control.

**Material/texture language:** Bandhani dots, mirror work, marigold garlands, silk
tassels, brass diyas. Pattern and reflection do the decorating.

**Composition rules:** Joyful density allowed — the one design where abundance is the
point; marigold accent on occasion tags and CTAs; imagery warm but never oversaturated.

**Personality:** Joyful · Abundant · Warm.

**What to avoid:** Oversaturated candy colors; plastic skin; gradient text; clip-art
diyas and fireworks; generic "festive sale" urgency.

**Differentiation:**
- Nav: occasion-based (Diwali / Wedding / Festive edit) + Gifting. The only
  calendar-driven nav in fashion.
- Hero: celebration in full color — the most chromatic hero of the ten.
- Product presentation: occasion-grouped collections, color-story filters, gifting
  options per piece.
- Footer: festival calendar, gifting concierge, family-styling note.
- CTA: "Shop the occasion" + "Gift it" — celebration-first.

---

## 10 — Experimental Avant-Garde · design-10-avant

**Palette (60/30/10: carbon / bone / acid lime)**

| Token | Hex | Role |
|---|---|---|
| `--color-background` | `#131313` | Carbon ground (60) |
| `--color-surface` | `#1F1F1F` | Manifesto panels, look cards |
| `--color-primary` | `#EDEAE2` | Bone — brutalist headlines, nav (30) |
| `--color-accent` | `#C6F135` | Acid lime — the one synthetic note: show alerts, manifesto strikes (10) |
| `--color-text` | `#EDEAE2` | Body copy |
| `--color-muted` | `#7C7A72` | Show notes, credits |

**Type pairing:** Syne + Space Mono.
Usage: Syne extra-bold, oversized, overlapping, rotated — runway-theatrical display
type as installation; mixed-case Syne for manifesto fragments. Space Mono in small
tracked caps as the technical counter-voice: look numbers, fabric codes, show credits —
the dresser's checklist against the spectacle.

**Layout:** Runway as theatre. Full-bleed look imagery with type overlapping at the
edges; manifesto as three sharp fragments, not paragraphs; looks indexed like a show
running order; backstage as the honest counterpoint; show-invitation signup.

**Visual hierarchy:** Spectacle first, information second. The show is the page; the
running order and credits are the quiet infrastructure beneath it.

**Imagery:** Runway in hard spotlight against void black; sculptural garments in motion
blur; backstage chaos in available light; textile experiments macro (burnt, bonded,
acid-dyed); empty concrete venue.
Grade: theatrical — hard spotlight vs void, high contrast, motion blur permitted,
stark and unforgiving.

**Material/texture language:** Raw concrete, black latex/vinyl, acid-dyed mesh, steel
runway, torn organza. Materials feel tested to destruction.

**Composition rules:** Type collides with imagery; acid lime only on show alerts,
manifesto strikes, and the invitation CTA; unconventional cursor on desktop; restraint
inside the invitation form itself (daring outside, usable inside).

**Personality:** Daring · Theatrical · Uncompromising.

**What to avoid:** Pretty soft-focus; pastel gradients; commercial smiling; generic
"futuristic" blue/purple neon gradients — the acid lime is a single flat accent, never
a glow.

**Differentiation:**
- Nav: minimal avant-garde — overlay menu, look-number labels, invitation CTA always
  present. The only overlay nav in fashion.
- Hero: immersive runway image, cryptic Syne headline, "Request an invitation."
- Product presentation: looks as a show running order — numbered, credited, not priced
  like retail.
- Footer: manifesto fragment, atelier contact, minimal.
- CTA: "Request an invitation" — access-first, the only gated CTA.

---

## Cross-design contrast notes (for QA)

- Light grounds: 01 (khadi ivory), 02 (paper), 05 (oat), 07 (gallery white), 08 (chalk
  ecru). Dark grounds: 03 (kumkum maroon), 04 (ink), 06 (near-black), 09 (peacock
  green), 10 (carbon). Five light / five dark — the category's natural drama.
- No display font repeats across the ten: Rozha One (01) / Archivo (02) / Cinzel (03) /
  Anton (04) / Fraunces (05) / Bodoni Moda (06) / Marcellus (07) / Spectral (08) /
  Yatra One (09) / Syne (10). Body fonts are likewise all distinct: Mukta / Inter /
  Jost / Space Grotesk / Work Sans / Manrope / Outfit / IBM Plex Sans / Hind /
  Space Mono.
- Accent hue families, one per design: turmeric 01 / clay 02 / zari gold 03 /
  vermilion 04 / madder 05 / champagne 06 / rani pink 07 / oxblood 08 / marigold 09 /
  acid lime 10. The four warm metallics are separated by value and role: bright turmeric
  (01, light ground) vs antique zari (03, dark maroon) vs pale champagne (06, near-black,
  seal-only) vs deep marigold (09, peacock green).
- Metallics appear as 10% accents only, desaturated, never as gradients — per the
  luxury-restraint rule carried over from coffee.
- Dark-ground designs are differentiated by hue, not just darkness: maroon-ceremonial
  03 / ink-street 04 / near-black-cinematic 06 / peacock-festive 09 / carbon-theatrical
  10 — no two darks share a color temperature or mood.
- Serif display voices split by temperament: Rozha One (monumental craft) 01 /
  Cinzel (inscriptional ceremony) 03 / Fraunces (soft editorial) 05 / Bodoni Moda
  (high-contrast cinema) 06 / Marcellus (gallery classical) 07 / Spectral (technical
  serif) 08 — six serifs, six irreconcilable treatments.
