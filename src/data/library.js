/* ATELIER — category + design registry.
   Adding a future category = append one entry here + one folder under
   src/templates/<slug>/. No platform rewrite needed. */
import { brandFor } from '../templates/_shared/brand.js';

export { CATEGORIES } from './categories.js';
import { CATEGORIES } from './categories.js';

/* Static (iframe) designs: served from /public/templates/<slug>/ */
export const JEWELRY_DESIGNS = [
  { id: 'design-01-editorial', num: '01', name: 'Lumière', tag: 'Editorial', kind: 'static',
    src: '/templates/jewelry/design-01-editorial/index.html',
    style: 'Editorial Luxury', animation: 'Slow cinematic reveals', typography: 'Playfair Display + Manrope',
    layout: 'Asymmetrical', mood: 'Elegant / Fashion', palette: 'Champagne Luxury',
    blurb: 'A fashion-publication homepage for a maison that leads with story.',
    colors: { primary: '#35312C', accent: '#A9884B' }, fontPair: 'Playfair Display|Manrope' },
  { id: 'design-02-modern-studio', num: '02', name: 'Forme', tag: 'Modern Studio', kind: 'static',
    src: '/templates/jewelry/design-02-modern-studio/index.html',
    style: 'Modern Minimal', animation: 'Precise geometric movement', typography: 'Fraunces + Space Grotesk',
    layout: 'Architectural grid', mood: 'Contemporary / Composed', palette: 'Future Pearl',
    blurb: 'Gallery-clean geometry for contemporary high jewelry.',
    colors: { primary: '#25272A', accent: '#9AA1A8' }, fontPair: 'Fraunces|Space Grotesk' },
  { id: 'design-03-bridal', num: '03', name: 'Éternelle', tag: 'Bridal', kind: 'static',
    src: '/templates/jewelry/design-03-bridal/index.html',
    style: 'Bridal Romantic', animation: 'Soft romantic motion', typography: 'Cormorant Garamond + Manrope',
    layout: 'Centered editorial', mood: 'Romantic / Tender', palette: 'Blush Jewel',
    blurb: 'Softness and ceremony — bridal with a material atelier.',
    features: ['Material switcher', 'Try-the-look demo'],
    colors: { primary: '#6D6661', accent: '#B98F91' }, fontPair: 'Cormorant Garamond|Manrope' },
  { id: 'design-04-heritage', num: '04', name: 'The Heritage House', tag: 'Heritage', kind: 'static',
    src: '/templates/jewelry/design-04-heritage/index.html',
    style: 'Heritage Archival', animation: 'Storytelling transitions', typography: 'Libre Baskerville + Instrument Sans',
    layout: 'Chaptered narrative', mood: 'Timeless / Warm', palette: 'Archival Champagne',
    blurb: 'An archival narrative for maisons with decades behind them.',
    colors: { primary: '#2E2A24', accent: '#A8894F' }, fontPair: 'Libre Baskerville|Instrument Sans' },
  { id: 'design-05-gemstone', num: '05', name: 'Gemma', tag: 'Gemstone', kind: 'static',
    src: '/templates/jewelry/design-05-gemstone/index.html',
    style: 'Gemstone Atelier', animation: 'Light & refraction', typography: 'Bodoni Moda + Plus Jakarta Sans',
    layout: 'Centered showcase', mood: 'Rich / Precious', palette: 'Emerald Luxury',
    blurb: 'Emerald-room drama with a live gemstone atelier.',
    features: ['Gemstone switcher'],
    colors: { primary: '#0E5146', accent: '#C5A15A' }, fontPair: 'Bodoni Moda|Plus Jakarta Sans' },
  { id: 'design-06-future', num: '06', name: 'Obsidian', tag: 'Future', kind: 'static',
    src: '/templates/jewelry/design-06-future/index.html',
    style: 'Future Dark', animation: 'Spatial / 3D movement', typography: 'Fraunces + Space Grotesk',
    layout: 'Layered depth', mood: 'Bold / Avant-garde', palette: 'Dark Pearl',
    blurb: 'A dark, spatial concept — drag the piece in 360°.',
    features: ['360° concept viewer'],
    colors: { primary: '#E8E4DA', accent: '#9FB6C9' }, fontPair: 'Fraunces|Space Grotesk' },
  { id: 'design-07-quiet-luxury', num: '07', name: 'Sereine', tag: 'Quiet Luxury', kind: 'static',
    src: '/templates/jewelry/design-07-quiet-luxury/index.html',
    style: 'Quiet Luxury', animation: 'Restrained fades', typography: 'Libre Baskerville + Instrument Sans',
    layout: 'Airy minimal', mood: 'Calm / Understated', palette: 'Pearl & Sage',
    blurb: 'Whisper-quiet luxury. Nothing shouts; everything lands.',
    colors: { primary: '#3B4038', accent: '#747D67' }, fontPair: 'Libre Baskerville|Instrument Sans' },
  { id: 'design-08-lookbook', num: '08', name: 'Ode', tag: 'Lookbook', kind: 'static',
    src: '/templates/jewelry/design-08-lookbook/index.html',
    style: 'Fashion Lookbook', animation: 'Editorial transitions', typography: 'Cormorant Garamond + Manrope',
    layout: 'Full-bleed spreads', mood: 'Editorial / Expressive', palette: 'Blush Editorial',
    blurb: 'A seasonal lookbook — full-bleed spreads, issue numbers.',
    features: ['Try-the-look demo'],
    colors: { primary: '#211E1B', accent: '#B98F91' }, fontPair: 'Cormorant Garamond|Manrope' },
  { id: 'design-09-commerce', num: '09', name: 'Carat & Co.', tag: 'Commerce', kind: 'static',
    src: '/templates/jewelry/design-09-commerce/index.html',
    style: 'Premium Commerce', animation: 'Responsive product motion', typography: 'DM Serif Display + Inter',
    layout: 'Product grid', mood: 'Refined / Shoppable', palette: 'Sapphire & Pearl',
    blurb: 'Shoppable luxury — filter, quick-view, and configure.',
    colors: { primary: '#1E3A4D', accent: '#C4A15F' }, fontPair: 'DM Serif Display|Inter' },
  { id: 'design-10-experimental', num: '10', name: 'Prisma', tag: 'Experimental', kind: 'static',
    src: '/templates/jewelry/design-10-experimental/index.html',
    style: 'Experimental Immersive', animation: 'Scroll-driven scenes', typography: 'Fraunces + Space Grotesk',
    layout: 'Pinned chapters', mood: 'Dramatic / Immersive', palette: 'Dark Champagne',
    blurb: 'Scroll-driven cinema for the avant-garde maison.',
    colors: { primary: '#EFE9DC', accent: '#CDB78C' }, fontPair: 'Fraunces|Space Grotesk' },
];

/* Native React designs register here as they are built:
   { id, kind: 'react', component: () => import('../templates/coffee/design-01-artisan/index.jsx'), meta } */
import { meta as coffeeMeta01 } from '../templates/coffee/design-01-artisan/meta.js';
import { meta as coffeeMeta02 } from '../templates/coffee/design-02-roastery/meta.js';
import { meta as coffeeMeta03 } from '../templates/coffee/design-03-scandi/meta.js';
import { meta as coffeeMeta04 } from '../templates/coffee/design-04-urban/meta.js';
import { meta as coffeeMeta05 } from '../templates/coffee/design-05-vintage/meta.js';
import { meta as coffeeMeta06 } from '../templates/coffee/design-06-premium/meta.js';
import { meta as coffeeMeta07 } from '../templates/coffee/design-07-subscription/meta.js';
import { meta as coffeeMeta08 } from '../templates/coffee/design-08-ecommerce/meta.js';
import { meta as coffeeMeta09 } from '../templates/coffee/design-09-story/meta.js';
import { meta as coffeeMeta10 } from '../templates/coffee/design-10-experimental/meta.js';
import { meta as ecoMeta01 } from '../templates/ecommerce/design-01-flagship/meta.js';
import { meta as ecoMeta02 } from '../templates/ecommerce/design-02-bazaar/meta.js';
import { meta as ecoMeta03 } from '../templates/ecommerce/design-03-maison/meta.js';
import { meta as ecoMeta04 } from '../templates/ecommerce/design-04-drop/meta.js';
import { meta as ecoMeta05 } from '../templates/ecommerce/design-05-eco/meta.js';
import { meta as ecoMeta06 } from '../templates/ecommerce/design-06-tech/meta.js';
import { meta as ecoMeta07 } from '../templates/ecommerce/design-07-apparel/meta.js';
import { meta as ecoMeta08 } from '../templates/ecommerce/design-08-home/meta.js';
import { meta as ecoMeta09 } from '../templates/ecommerce/design-09-beauty/meta.js';
import { meta as ecoMeta10 } from '../templates/ecommerce/design-10-brutal/meta.js';
import { meta as restaurantMeta06 } from '../templates/restaurant/design-06-farm/meta.js';
import { meta as restaurantMeta08 } from '../templates/restaurant/design-08-patisserie/meta.js';
import { meta as restaurantMeta01 } from '../templates/restaurant/design-01-finedining/meta.js';
import { meta as restaurantMeta02 } from '../templates/restaurant/design-02-trattoria/meta.js';
import { meta as restaurantMeta03 } from '../templates/restaurant/design-03-modernindian/meta.js';
import { meta as restaurantMeta04 } from '../templates/restaurant/design-04-street/meta.js';
import { meta as restaurantMeta05 } from '../templates/restaurant/design-05-omakase/meta.js';
import { meta as restaurantMeta07 } from '../templates/restaurant/design-07-rooftop/meta.js';
import { meta as restaurantMeta09 } from '../templates/restaurant/design-09-cloud/meta.js';
import { meta as restaurantMeta10 } from '../templates/restaurant/design-10-chefstable/meta.js';
import { meta as reMeta01 } from '../templates/realestate/design-01-villas/meta.js';
import { meta as reMeta02 } from '../templates/realestate/design-02-urban/meta.js';
import { meta as reMeta03 } from '../templates/realestate/design-03-commercial/meta.js';
import { meta as reMeta04 } from '../templates/realestate/design-04-plots/meta.js';
import { meta as reMeta05 } from '../templates/realestate/design-05-heritage/meta.js';
import { meta as reMeta06 } from '../templates/realestate/design-06-coliving/meta.js';
import { meta as reMeta07 } from '../templates/realestate/design-07-smart/meta.js';
import { meta as reMeta08 } from '../templates/realestate/design-08-retreat/meta.js';
import { meta as reMeta09 } from '../templates/realestate/design-09-trust/meta.js';
import { meta as reMeta10 } from '../templates/realestate/design-10-archviz/meta.js';
import { meta as fashionMeta01 } from '../templates/fashion/design-01-heritage/meta.js';
import { meta as fashionMeta02 } from '../templates/fashion/design-02-minimal/meta.js';
import { meta as fashionMeta03 } from '../templates/fashion/design-03-bridal/meta.js';
import { meta as fashionMeta04 } from '../templates/fashion/design-04-sadak/meta.js';
import { meta as fashionMeta05 } from '../templates/fashion/design-05-slow/meta.js';
import { meta as fashionMeta06 } from '../templates/fashion/design-06-silk/meta.js';
import { meta as fashionMeta07 } from '../templates/fashion/design-07-boutique/meta.js';
import { meta as fashionMeta08 } from '../templates/fashion/design-08-tailor/meta.js';
import { meta as fashionMeta09 } from '../templates/fashion/design-09-festive/meta.js';
import { meta as fashionMeta10 } from '../templates/fashion/design-10-avant/meta.js';
import { meta as agencyMeta01 } from '../templates/agency/design-01-portfolio/meta.js';
import { meta as agencyMeta02 } from '../templates/agency/design-02-brand/meta.js';
import { meta as agencyMeta03 } from '../templates/agency/design-03-motion/meta.js';
import { meta as agencyMeta04 } from '../templates/agency/design-04-witty/meta.js';
import { meta as agencyMeta05 } from '../templates/agency/design-05-swiss/meta.js';
import { meta as agencyMeta06 } from '../templates/agency/design-06-maximal/meta.js';
import { meta as agencyMeta07 } from '../templates/agency/design-07-photo/meta.js';
import { meta as agencyMeta08 } from '../templates/agency/design-08-digital/meta.js';
import { meta as agencyMeta09 } from '../templates/agency/design-09-indie/meta.js';
import { meta as agencyMeta10 } from '../templates/agency/design-10-playground/meta.js';
import { meta as hotelMeta01 } from '../templates/hotel/design-01-palace/meta.js';
import { meta as hotelMeta02 } from '../templates/hotel/design-02-beach/meta.js';
import { meta as hotelMeta03 } from '../templates/hotel/design-03-urban/meta.js';
import { meta as hotelMeta04 } from '../templates/hotel/design-04-lodge/meta.js';
import { meta as hotelMeta05 } from '../templates/hotel/design-05-haveli/meta.js';
import { meta as hotelMeta06 } from '../templates/hotel/design-06-eco/meta.js';
import { meta as hotelMeta07 } from '../templates/hotel/design-07-business/meta.js';
import { meta as hotelMeta08 } from '../templates/hotel/design-08-spa/meta.js';
import { meta as hotelMeta09 } from '../templates/hotel/design-09-villas/meta.js';
import { meta as hotelMeta10 } from '../templates/hotel/design-10-noir/meta.js';
import { meta as travelMeta01 } from '../templates/travel/design-01-luxury/meta.js';
import { meta as travelMeta02 } from '../templates/travel/design-02-adventure/meta.js';
import { meta as travelMeta03 } from '../templates/travel/design-03-honeymoon/meta.js';
import { meta as travelMeta04 } from '../templates/travel/design-04-heritage/meta.js';
import { meta as travelMeta05 } from '../templates/travel/design-05-island/meta.js';
import { meta as travelMeta06 } from '../templates/travel/design-06-safari/meta.js';
import { meta as travelMeta07 } from '../templates/travel/design-07-backpack/meta.js';
import { meta as travelMeta08 } from '../templates/travel/design-08-spiritual/meta.js';
import { meta as travelMeta09 } from '../templates/travel/design-09-rail/meta.js';
import { meta as travelMeta10 } from '../templates/travel/design-10-journal/meta.js';
import { meta as techMeta07 } from '../templates/technology/design-07-robotics/meta.js';
import { meta as techMeta01 } from '../templates/technology/design-01-saas/meta.js';
import { meta as techMeta02 } from '../templates/technology/design-02-ai/meta.js';
import { meta as techMeta03 } from '../templates/technology/design-03-devtools/meta.js';
import { meta as techMeta04 } from '../templates/technology/design-04-secure/meta.js';
import { meta as techMeta05 } from '../templates/technology/design-05-cloud/meta.js';
import { meta as techMeta06 } from '../templates/technology/design-06-consumer/meta.js';
import { meta as techMeta08 } from '../templates/technology/design-08-fintech/meta.js';
import { meta as techMeta09 } from '../templates/technology/design-09-opensource/meta.js';
import { meta as techMeta10 } from '../templates/technology/design-10-webgl/meta.js';

function nativeEntry(meta, blurb, loader, category = 'coffee') {
  return {
    id: meta.id, num: meta.num, tag: meta.tag, name: meta.name, blurb,
    style: meta.style, animation: meta.animation, typography: meta.typography,
    layout: meta.layout, mood: meta.mood, palette: meta.palette,
    features: meta.features, colors: meta.colors,
    fontPair: meta.fonts.display + '|' + meta.fonts.body,
    kind: 'react',
    component: loader,
    thumb: `/templates/${category}/${meta.id}/thumb.webp`,
  };
}

export const NATIVE_DESIGNS = {
  coffee: [
    nativeEntry(coffeeMeta01, 'A warm craft editorial for a wood-fired neighborhood coffee house.',
      () => import('../templates/coffee/design-01-artisan/index.jsx')),
    nativeEntry(coffeeMeta02, 'Data-forward roastery — origins, roast levels and brew science.',
      () => import('../templates/coffee/design-02-roastery/index.jsx')),
    nativeEntry(coffeeMeta03, 'Scandinavian calm, where whitespace is the design.',
      () => import('../templates/coffee/design-03-scandi/index.jsx')),
    nativeEntry(coffeeMeta04, 'Brutalist-urban poster energy with order-ahead speed.',
      () => import('../templates/coffee/design-04-urban/index.jsx')),
    nativeEntry(coffeeMeta05, 'Heritage letterpress café on a scrubbable decade timeline.',
      () => import('../templates/coffee/design-05-vintage/index.jsx')),
    nativeEntry(coffeeMeta06, 'Dark cinematic luxury, sold in numbered lots.',
      () => import('../templates/coffee/design-06-premium/index.jsx')),
    nativeEntry(coffeeMeta07, 'A reassuring subscription wizard that builds your plan.',
      () => import('../templates/coffee/design-07-subscription/index.jsx')),
    nativeEntry(coffeeMeta08, 'Dense shoppable shelf with faceted discovery.',
      () => import('../templates/coffee/design-08-ecommerce/index.jsx')),
    nativeEntry(coffeeMeta09, 'A parchment documentary, from cherry to cup.',
      () => import('../templates/coffee/design-09-story/index.jsx')),
    nativeEntry(coffeeMeta10, 'Avant-garde coffee lab with kinetic intent.',
      () => import('../templates/coffee/design-10-experimental/index.jsx')),
  ],
  ecommerce: [
    nativeEntry(ecoMeta01, 'Minimal gallery retail — museum spacing, numbered pieces.',
      () => import('../templates/ecommerce/design-01-flagship/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta02, 'A vibrant marketplace bazaar — dense, stickered, alive.',
      () => import('../templates/ecommerce/design-02-bazaar/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta03, 'Dark editorial luxury boutique in letterbox spreads.',
      () => import('../templates/ecommerce/design-03-maison/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta04, 'Drop-culture flash sale — live countdown, stamp badges.',
      () => import('../templates/ecommerce/design-04-drop/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta05, 'Sustainable eco store with impact counters and organic flow.',
      () => import('../templates/ecommerce/design-05-eco/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta06, 'Tech gadgets with HUD annotations and a spec matrix.',
      () => import('../templates/ecommerce/design-06-tech/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta07, 'Editorial lookbook commerce — folio pages, shoppable tags.',
      () => import('../templates/ecommerce/design-07-apparel/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta08, 'Room-scene living store with material swatches.',
      () => import('../templates/ecommerce/design-08-home/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta09, 'Soft ingredient-led beauty with a shade finder.',
      () => import('../templates/ecommerce/design-09-beauty/index.jsx'), 'ecommerce'),
    nativeEntry(ecoMeta10, 'Brutalist commerce ledger — no decoration, all signal.',
      () => import('../templates/ecommerce/design-10-brutal/index.jsx'), 'ecommerce'),
  ],
  restaurant: [
    nativeEntry(restaurantMeta01, 'Hushed ceremonial 7-course tasting — near-black, ivory, brass.',
      () => import('../templates/restaurant/design-01-finedining/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta02, 'Rustic family-table abundance — cream, wood, terracotta.',
      () => import('../templates/restaurant/design-02-trattoria/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta03, 'Bold elemental modern Indian — charcoal, ivory, ember.',
      () => import('../templates/restaurant/design-03-modernindian/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta04, 'Loud poster-style street food — paper, ink, chili.',
      () => import('../templates/restaurant/design-04-street/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta05, 'Japanese restraint — washi, ink, vermillion.',
      () => import('../templates/restaurant/design-05-omakase/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta06, 'Honest farm-to-table editorial — a scroll-rotated season dial drives four seasonal menus, with grower stories, today\u2019s harvest board, and a fortnightly barn supper club.',
      () => import('../templates/restaurant/design-06-farm/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta07, 'Golden-hour glamour — midnight, sand, champagne.',
      () => import('../templates/restaurant/design-07-rooftop/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta08, 'A delicate morning patisserie — three glass-case tiers, bake-time flags, and the morning bake schedule.',
      () => import('../templates/restaurant/design-08-patisserie/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta09, 'App-density delivery-first — paper, ink, signal orange.',
      () => import('../templates/restaurant/design-09-cloud/index.jsx'), 'restaurant'),
    nativeEntry(restaurantMeta10, 'Theatrical playbill dining — black, bone, crimson.',
      () => import('../templates/restaurant/design-10-chefstable/index.jsx'), 'restaurant'),
  ],
  realestate: [
    nativeEntry(reMeta01, 'Cinematic luxury villas, Alibaug — dusk film hero, whispered type, invitation-only viewings.',
      () => import('../templates/realestate/design-01-villas/index.jsx'), 'realestate'),
    nativeEntry(reMeta02, 'Sharp data-forward Whitefield apartments — live inventory, sticky filters, floor-plan cards.',
      () => import('../templates/realestate/design-02-urban/index.jsx'), 'realestate'),
    nativeEntry(reMeta03, 'Confident B2B leasing, Hebbal ORR — spec-sheet honesty, ₹/sqft, walkthrough CTAs.',
      () => import('../templates/realestate/design-03-commercial/index.jsx'), 'realestate'),
    nativeEntry(reMeta04, 'Land-story plotted development, Devanahalli — survey-map motifs, legacy tone.',
      () => import('../templates/realestate/design-04-plots/index.jsx'), 'realestate'),
    nativeEntry(reMeta05, 'Malleshwaram heritage restoration — archival letterpress, material library, craftsman profiles.',
      () => import('../templates/realestate/design-05-heritage/index.jsx'), 'realestate'),
    nativeEntry(reMeta06, 'Youthful Koramangala co-living — sticker badges, member stories, ₹/month pricing.',
      () => import('../templates/realestate/design-06-coliving/index.jsx'), 'realestate'),
    nativeEntry(reMeta07, 'Calm dark smart-home nocturne — time-of-day feature chapters.',
      () => import('../templates/realestate/design-07-smart/index.jsx'), 'realestate'),
    nativeEntry(reMeta08, 'Escape-led Alibaug coast second homes — horizon-heavy, extra-generous whitespace.',
      () => import('../templates/realestate/design-08-retreat/index.jsx'), 'realestate'),
    nativeEntry(reMeta09, 'Trust-led affordable housing, Tumkur Road — honest ₹4,250/sqft all-in rate.',
      () => import('../templates/realestate/design-09-trust/index.jsx'), 'realestate'),
    nativeEntry(reMeta10, 'Experimental dark archviz — kinetic type, overlay nav, architecture-as-art.',
      () => import('../templates/realestate/design-10-archviz/index.jsx'), 'realestate'),
  ],
  fashion: [
    nativeEntry(fashionMeta01, 'Heritage handloom house — page-turn loom→dye→weave→drape chapters.',
      () => import('../templates/fashion/design-01-heritage/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta02, 'Minimalist label — pleat-wall cards unfolding on scrub.',
      () => import('../templates/fashion/design-02-minimal/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta03, 'Bridal couture — color-story chapters + trousseau builder + appointment scheduler.',
      () => import('../templates/fashion/design-03-bridal/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta04, 'Streetwear fusion — 3-lane runway walk with mid-crossing pause.',
      () => import('../templates/fashion/design-04-sadak/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta05, 'Slow fashion — dye-journey swatch accordion Indigo→Madder→Turmeric→Undyed.',
      () => import('../templates/fashion/design-05-slow/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta06, 'Dark luxury silk maison — scroll-driven SVG drape-wave simulation.',
      () => import('../templates/fashion/design-06-silk/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta07, 'Multi-designer boutique — mirror counter-scrolling rails.',
      () => import('../templates/fashion/design-07-boutique/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta08, 'Bespoke menswear — measurement-tape rail with live cm readout.',
      () => import('../templates/fashion/design-08-tailor/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta09, 'Festive ethnic wear — weave-reveal SVG overlay.',
      () => import('../templates/fashion/design-09-festive/index.jsx'), 'fashion'),
    nativeEntry(fashionMeta10, 'Avant-garde — a single crimson thread stitching through 5 look frames.',
      () => import('../templates/fashion/design-10-avant/index.jsx'), 'fashion'),
  ],
  agency: [
    nativeEntry(agencyMeta01, 'Portfolio-first studio — typographic work index, proof-dense, signal-red outcome numerals.',
      () => import('../templates/agency/design-01-portfolio/index.jsx'), 'agency'),
    nativeEntry(agencyMeta02, 'Brand identity agency — methodical, scrubbed 4-phase process spine.',
      () => import('../templates/agency/design-02-brand/index.jsx'), 'agency'),
    nativeEntry(agencyMeta03, 'Motion/film studio — dark, letterboxed, cinema grammar.',
      () => import('../templates/agency/design-03-motion/index.jsx'), 'agency'),
    nativeEntry(agencyMeta04, 'Copy-driven agency — the funniest site, typography carries everything.',
      () => import('../templates/agency/design-04-witty/index.jsx'), 'agency'),
    nativeEntry(agencyMeta05, 'Swiss minimal — visible grid discipline, international-orange punctuation.',
      () => import('../templates/agency/design-05-swiss/index.jsx'), 'agency'),
    nativeEntry(agencyMeta06, 'Maximalist collective — composed collage chaos.',
      () => import('../templates/agency/design-06-maximal/index.jsx'), 'agency'),
    nativeEntry(agencyMeta07, 'Photography-led — dark, images are the interface.',
      () => import('../templates/agency/design-07-photo/index.jsx'), 'agency'),
    nativeEntry(agencyMeta08, 'Digital product agency — metric-led, systematic.',
      () => import('../templates/agency/design-08-digital/index.jsx'), 'agency'),
    nativeEntry(agencyMeta09, 'Indie freelancer — intimate first-person journal.',
      () => import('../templates/agency/design-09-indie/index.jsx'), 'agency'),
    nativeEntry(agencyMeta10, 'Experimental playground — interaction IS the content.',
      () => import('../templates/agency/design-10-playground/index.jsx'), 'agency'),
  ],
  hotel: [
    nativeEntry(hotelMeta01, 'Luxury palace resort — royal maroon and gold, grand curtain reveals.',
      () => import('../templates/hotel/design-01-palace/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta02, 'Minimal beach retreat — tide-wash dissolve, breath-led spacing.',
      () => import('../templates/hotel/design-02-beach/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta03, 'Urban boutique — ink and signal orange, spotlight room grid.',
      () => import('../templates/hotel/design-03-urban/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta04, 'Mountain lodge — bark and ember, hearth-fan room cards.',
      () => import('../templates/hotel/design-04-lodge/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta05, 'Heritage haveli — deep teal and marigold, jharokha window pan.',
      () => import('../templates/hotel/design-05-haveli/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta06, 'Eco jungle resort — forest and moss, canopy descent.',
      () => import('../templates/hotel/design-06-eco/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta07, 'Business hotel — navy and brass, split-flap room board.',
      () => import('../templates/hotel/design-07-business/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta08, 'Spa & wellness — warm stone and sage, breath gallery.',
      () => import('../templates/hotel/design-08-spa/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta09, 'Private villas — midnight and champagne, estate map journey.',
      () => import('../templates/hotel/design-09-villas/index.jsx'), 'hotel'),
    nativeEntry(hotelMeta10, 'Dark cinematic hotel — black and blood-red, filmstrip noir.',
      () => import('../templates/hotel/design-10-noir/index.jsx'), 'hotel'),
  ],
  travel: [
    nativeEntry(travelMeta01, 'Cinematic private-travel atelier — route-line draw, waypoint docking.',
      () => import('../templates/travel/design-01-luxury/index.jsx'), 'travel'),
    nativeEntry(travelMeta02, 'Ridgeline adventure — ascent meter, alpine expedition spirit.',
      () => import('../templates/travel/design-02-adventure/index.jsx'), 'travel'),
    nativeEntry(travelMeta03, 'Halcyon honeymoon — soft, intimate, celebration-paced journeys.',
      () => import('../templates/travel/design-03-honeymoon/index.jsx'), 'travel'),
    nativeEntry(travelMeta04, 'Old Roads heritage — archival routes, storied destinations.',
      () => import('../templates/travel/design-04-heritage/index.jsx'), 'travel'),
    nativeEntry(travelMeta05, 'Salt & Light island — tide drift, sandbar clarity.',
      () => import('../templates/travel/design-05-island/index.jsx'), 'travel'),
    nativeEntry(travelMeta06, 'Dust & Thunder safari — wild, expedition-grade storytelling.',
      () => import('../templates/travel/design-06-safari/index.jsx'), 'travel'),
    nativeEntry(travelMeta07, 'Bunk & Trail backpacking — honest, trail-worn, hostel-to-hostel.',
      () => import('../templates/travel/design-07-backpack/index.jsx'), 'travel'),
    nativeEntry(travelMeta08, 'Stillpoint spiritual — quiet, contemplative, pilgrimage-paced.',
      () => import('../templates/travel/design-08-spiritual/index.jsx'), 'travel'),
    nativeEntry(travelMeta09, 'The Slow Line rail — unhurried rail journeys, window-seat cinema.',
      () => import('../templates/travel/design-09-rail/index.jsx'), 'travel'),
    nativeEntry(travelMeta10, 'Fieldnotes journal — experimental, diary-led travel narrative.',
      () => import('../templates/travel/design-10-journal/index.jsx'), 'travel'),
  ],
  technology: [
    nativeEntry(techMeta01, 'Confident enterprise SaaS — dashboard-led, precise, clear.',
      () => import('../templates/technology/design-01-saas/index.jsx'), 'technology'),
    nativeEntry(techMeta02, 'Dark cinematic AI startup with a neural constellation hero.',
      () => import('../templates/technology/design-02-ai/index.jsx'), 'technology'),
    nativeEntry(techMeta03, 'Docs-led dev tools with a terminal hero.',
      () => import('../templates/technology/design-03-devtools/index.jsx'), 'technology'),
    nativeEntry(techMeta04, 'High-contrast cybersecurity with a threat-map hero.',
      () => import('../templates/technology/design-04-secure/index.jsx'), 'technology'),
    nativeEntry(techMeta05, 'Data-viz cloud infrastructure with a topology centerpiece.',
      () => import('../templates/technology/design-05-cloud/index.jsx'), 'technology'),
    nativeEntry(techMeta06, 'Playful warm consumer app, phone-led.',
      () => import('../templates/technology/design-06-consumer/index.jsx'), 'technology'),
    nativeEntry(techMeta07, 'Industrial precision — a scroll-scrubbed exploded view of the Kestrel K7 robotic arm with leader-line spec callouts.',
      () => import('../templates/technology/design-07-robotics/index.jsx'), 'technology'),
    nativeEntry(techMeta08, 'Trust-through-numbers fintech, editorial and assured.',
      () => import('../templates/technology/design-08-fintech/index.jsx'), 'technology'),
    nativeEntry(techMeta09, 'Community open source — warm, collaborative, alive.',
      () => import('../templates/technology/design-09-opensource/index.jsx'), 'technology'),
    nativeEntry(techMeta10, 'Experimental CSS-3D lab with an overlay nav.',
      () => import('../templates/technology/design-10-webgl/index.jsx'), 'technology'),
  ],
};

/* Every design is a Kela site, listed as "<Kela brand> · <design style>"
   (e.g. "Kela Cafe · Artisan"); the original concept name stays available as
   conceptName. Memoised so each design keeps one object identity — the viewer
   reloads a template when its design object changes. */
const brandedDesigns = new Map();
export function designsFor(slug) {
  if (!brandedDesigns.has(slug)) {
    const list = slug === 'jewelry' ? JEWELRY_DESIGNS : NATIVE_DESIGNS[slug] || [];
    const brand = brandFor(slug);
    brandedDesigns.set(slug, brand
      ? list.map((d) => ({ ...d, conceptName: d.name, name: `${brand.name} · ${d.tag}` }))
      : list);
  }
  return brandedDesigns.get(slug);
}

export function categoryBySlug(slug) {
  return CATEGORIES.find((c) => c.slug === slug);
}
