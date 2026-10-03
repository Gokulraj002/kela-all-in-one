/* Kela Fashion (brand from _shared/brand.js) — design-04-sadak · editable content (JSON-compatible, no functions) */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Indo-western streetwear. Drops, not catalogs.',
  },
  nav: ['Drop', 'Lookbook', 'Codes', 'Stores'],
  hero: {
    eyebrow: 'DROP 07 — GULLY GHOST · LIVE NOW',
    titleA: 'BORN ON',
    titleB: 'THE SADAK',
    sub: 'Bandhgala cuts, kurta attitude, dhoti-parachute cargos. Mumbai to Delhi to Bengaluru — the drop closes when the stock dies.',
    cta: 'Shop the drop',
    altCta: 'Join the drop list',
  },
  drop: {
    kicker: 'THE LATEST DROP',
    title: 'DROP 07 — GULLY GHOST',
    line: 'Four pieces. Numbered. When it is gone, it is gone — we do not restock, we do not do resale markups.',
    pieces: [
      {
        name: 'Gully Ghost Bomber-Kurta',
        price: 5490,
        stock: 17,
        fabric: '240 GSM brushed twill · sindoor-thread embroidery',
        fit: 'Oversized street fit — size down for a clean line',
        tag: 'FLAGSHIP',
      },
      {
        name: 'Dhoti-Cargo Parachute',
        price: 3990,
        stock: 9,
        fabric: 'Ripstop cotton canvas · safety-orange bar tacks',
        fit: 'Drawstring hems — wears long, stacks on sneakers',
        tag: 'LOW STOCK',
      },
      {
        name: 'Block-Graffiti Street Kurta',
        price: 2890,
        stock: 23,
        fabric: 'Hand-blocked cotton poplin · screen-print hit',
        fit: 'Boxy street fit — true to size',
        tag: null,
      },
      {
        name: 'Neon-Rail Bandhgala Jacket',
        price: 6990,
        stock: 5,
        fabric: 'Bonded neoprene shell · quilted vermilion lining',
        fit: 'Cropped bomber block — size up for layering',
        tag: 'ALMOST GONE',
      },
    ],
  },
  runway: {
    kicker: 'THE RUNWAY',
    collection: 'GULLY GHOST — FW26',
    note: 'Scroll: the city walks the collection past you.',
    looks: [
      { img: 'product-0', lane: 'near', name: 'LOOK 01 — GHOST BOMBER', note: 'Sindoor embroidery, snapped in wind' },
      { img: 'product-1', lane: 'mid', name: 'LOOK 02 — DHOTI CARGO', note: 'Parachute hems, rain-slick asphalt' },
      { img: 'product-2', lane: 'far', name: 'LOOK 03 — NEON RAIL', note: 'Quilted vermilion lining, night lane' },
    ],
  },
  lookbook: {
    kicker: 'LOOKBOOK',
    title: 'SHOT IN THE CITY, NOT THE STUDIO',
    note: 'Bandra rooftops, Hauz Khas lanes, Indiranagar rain. Flash-frozen, unretouched, on the move.',
    shots: [
      { img: 'product-0', cap: 'Bomber-kurta · Bandra rooftop, 1:12 AM' },
      { img: 'product-1', cap: 'Dhoti cargos · Indiranagar rain' },
      { img: 'product-2', cap: 'Neon-rail jacket · Hauz Khas lane' },
      { img: 'detail', cap: 'Paisley-graffiti patch · macro' },
    ],
  },
  counters: {
    kicker: 'THE COUNT',
    items: [
      { num: 54, suffix: '', label: 'pieces left in Drop 07' },
      { num: 11, suffix: ' MIN', label: 'fastest sellout — Drop 06' },
      { num: 3, suffix: '', label: 'cities, one drop night' },
      { num: 0, suffix: '', label: 'restocks. ever.' },
    ],
  },
  codes: {
    kicker: 'THE FUSION CODES',
    title: 'HOW WE REMIX THE CLASSICS',
    items: [
      {
        code: 'CODE 01',
        title: 'BANDHGALA → BOMBER',
        body: 'The mandarin collar and quilted lining stay. The length gets cropped, the shoulders go dropped, the closure goes industrial.',
      },
      {
        code: 'CODE 02',
        title: 'KURTA → GRAPHIC TEE LENGTH',
        body: 'Hand-blocked motifs meet screen-print hits. Boxy street block, side slits kept — the kurta never left, it just got loud.',
      },
      {
        code: 'CODE 03',
        title: 'DHOTI → PARACHUTE CARGO',
        body: 'The dhoti drape becomes drawstring hems and six pockets. Stacks on chunky sneakers, swims in the rain.',
      },
    ],
  },
  archive: {
    kicker: 'PAST DROPS',
    title: 'GONE. THAT IS THE POINT.',
    note: 'No restocks, no resale markup from us. The archive is proof of velocity.',
    drops: [
      { name: 'DROP 06 — CONCRETE BLOOM', stat: 'Sold out in 11 min' },
      { name: 'DROP 05 — MIDNIGHT LOCAL', stat: 'Sold out in 26 min' },
      { name: 'DROP 04 — SIGNAL JAM', stat: 'Sold out in 9 min' },
    ],
  },
  stores: {
    kicker: 'STORES',
    title: 'TOUCH THE FABRIC',
    shops: [
      { city: 'MUMBAI', area: 'Bandra West — Chapel Road', hours: '11 AM – 9 PM, all days' },
      { city: 'NEW DELHI', area: 'Hauz Khas Village', hours: '11 AM – 8:30 PM, Tue–Sun' },
      { city: 'BENGALURU', area: 'Indiranagar 100 Feet Road', hours: '11 AM – 9 PM, all days' },
    ],
  },
  droplist: {
    kicker: 'DROP LIST',
    title: 'FIRST PING, FIRST COP',
    body: 'One SMS per drop. Your city, your size run, the link before the public timer starts. No spam — we hate that more than restocks.',
    cta: 'Get the ping',
    cities: ['Mumbai', 'New Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'],
  },
  contact: {
    email: `cop@${kela.domain}`,
    phone: '+91 98200 12345',
    instagram: `@${kela.instagram}`,
  },
  footer: {
    line: `${kela.name.toUpperCase()} — cut on the street, sewn in Mumbai.`,
    copy: `© 2026 ${kela.name}. All drops final. No restocks.`,
    links: ['Shipping', 'Returns (14 days)', 'Size guide', 'Care', 'Contact'],
  },
};
