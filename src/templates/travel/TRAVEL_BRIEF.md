# ATELIER · Travel & Tourism — Category Brief

Ten art-directed travel website experiences. Each must feel like a different
agency's flagship site — different nav, hero structure, typography, palette,
image treatment, section order, interaction model, motion language, CTA, footer.
Wanderlust is the product: every image and every word should make the reader
want to go.

## The 10 designs

| # | Folder | Name | Direction | Fonts | Palette |
|---|--------|------|-----------|-------|---------|
| 01 | design-01-luxury | Meridian & Grey | Luxury tour operator, cinematic, exclusive | Cormorant Garamond + Jost | Ink navy `#101820`, champagne `#C9A961`, ivory |
| 02 | design-02-adventure | Ridgeline | Adventure/trekking, raw, kinetic | Anton + Inter | Basalt `#1A1A18`, safety orange `#E4572E`, stone |
| 03 | design-03-honeymoon | Halcyon | Honeymoon specialists, romantic, soft | Italiana + Montserrat | Blush `#E8CFC3`, pearl, dusk mauve `#6E5A6E` |
| 04 | design-04-heritage | Old Roads | Cultural heritage tours, storied, rich | Fraunces + Spectral | Terracotta `#B4552D`, sandstone `#E4D3B3`, indigo `#232A4A` |
| 05 | design-05-island | Salt & Light | Beach island escapes, luminous calm | Cormorant Garamond + Outfit | Sea-glass `#9CC5B8`, sand `#F2EAD8`, white |
| 06 | design-06-safari | Dust & Thunder | Wildlife safaris, dramatic, wild | Bitter + Inter | Savanna gold `#C99A3C`, acacia `#3E4A2E`, charcoal `#191713` |
| 07 | design-07-backpack | Bunk & Trail | Budget backpacking, youthful, honest | Archivo + Inter | Off-black `#17181C`, teal `#1F7A78`, marigold `#E8A33D` |
| 08 | design-08-spiritual | Stillpoint | Pilgrimage/spiritual journeys, serene | Cormorant Garamond + Newsreader | Marigold `#D99A2B`, ivory `#F7F2E8`, maroon-black `#2A1E1E` |
| 09 | design-09-rail | The Slow Line | Cruise & rail journeys, slow-travel romance | DM Serif Display + Inter | Pullman green `#22392C`, brass `#B08A3C`, cream `#F4EDDE` |
| 10 | design-10-journal | Fieldnotes | Experimental cinematic travel journal | Fraunces + Space Mono | Film black `#0E0D0B`, cream `#F1EAD8`, amber `#E08A3C` |

## Signature scroll mechanics (one per design — all NEW, none repeat coffee's 10)

1. **Luxury — "The Grand Itinerary"**: pinned section; an SVG route line draws
   across the viewport on scrub while destination cards dock sequentially at
   waypoints, each scaling 0.8→1 as the line reaches it.
2. **Adventure — "Ascent meter"**: pinned climb; an altitude readout counts up
   on scrub, cards pass through a fixed viewport window with scale+blur shift
   like checkpoints, background darkens as altitude rises.
3. **Honeymoon — "Slow dissolve duets"**: pinned full-bleed diptychs dissolving
   into each other on scrub with a soft iris mask; captions rise like breath.
4. **Heritage — "Excavation layers"**: pinned stratigraphic scroll; horizontal
   era-layers peel back via clip-path wipes revealing cards stacked in depth,
   timeline spine on the side.
5. **Island — "Tide drift"**: unpinned scroll-linked drift; cards translate at
   a fraction of scroll speed on gentle sine-wave paths, bob amplitude follows
   scroll velocity. Calm, never a marquee.
6. **Safari — "Dawn-to-dusk scrub"**: pinned diorama; sky color scrubs
   dawn→noon→dusk, silhouettes parallax at 3 depths, cards unfold with scaleY
   from the grass line.
7. **Backpack — "Ticket-stub stack"**: perforated-ticket cards dealt from a
   fanned stack — scrub-driven rotation→0 as each lands, prices stamped on.
8. **Spiritual — "Mandala orbit"**: pinned circular ring of destination cards
   orbiting a center motif on scrub; the card nearest top scales up and
   brightens; static grid under reduced-motion.
9. **Rail — "Window journey"**: pinned train-window frame stays fixed while the
   landscape (destination cards + scenery bands) scrolls horizontally past it
   on scrub, like looking out a moving window; subtle speed-blur on fast scroll.
10. **Journal — "Film-strip rewind"**: vertical film strip of frames scrubbing
    with scroll direction, sprocket-hole styling, frame counter ticking,
    light-leak flash on chapter change.

## Global rules

- Real-feeling copy, prices in ₹ (numbers via `price()`), no lorem, no emojis.
- 5 unique images per design, art-directed to the palette. No repeats.
- One signature video per design per VIDEO_PLAN.md (frame-verify before shipping).
- Spacing/whitespace creative-director pass before QA.
- Independent QA per design with real fixes.
