/* Kela Fashion (brand from _shared/brand.js) — Festive Ethnic Wear · design-09-festive · content.js
   Plain JSON-compatible object. All editable text lives here. */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Festive ethnic wear, woven in celebration',
  },
  nav: ['Diwali', 'Eid', 'Wedding', 'The Edit', 'Gifting', 'Visit'],
  hero: {
    eyebrow: 'The Festive Edit 2026',
    title: 'Color in Motion',
    sub: 'Silks, shararas and lehengas cut for the festival season — marigold light, mirror work, and twirls that fill a room.',
    cta: 'Shop the festive edit',
    secondary: 'Gift the season',
    countdownLabel: 'Diwali · 8 November',
  },
  occasions: [
    { id: 'diwali', label: 'Diwali', color: '#E07B1A', date: '8 November', cutoff: 'Order by 30 Oct for delivery', note: 'Marigold, silk, diya-light golds.' },
    { id: 'eid', label: 'Eid', color: '#2E8B6E', date: '20 March', cutoff: 'Order by 11 March for delivery', note: 'Emerald shararas, soft gold.' },
    { id: 'navratri', label: 'Navratri', color: '#C2185B', date: '11 October', cutoff: 'Order by 2 Oct for delivery', note: 'Rani pink bandhani, mirror work.' },
    { id: 'wedding', label: 'Wedding Season', color: '#B8860B', date: 'Nov – Feb', cutoff: 'Bespoke by appointment', note: 'Peacock lehengas, gota patti.' },
  ],
  products: [
    { name: 'Marigold Anarkali', occasion: 'diwali', price: 24900, desc: 'Peacock-green silk anarkali, hand-set zari', fabric: 'Pure mulberry silk', badge: 'Ready to ship' },
    { name: 'Rani Sharara', occasion: 'eid', price: 31500, desc: 'Marigold kurta, rani-pink sharara, mirror work', fabric: 'Chanderi silk, mirror handwork', badge: 'Ships in 48h' },
    { name: 'Emerald Lehenga', occasion: 'wedding', price: 58000, desc: 'Festive lehenga with gota patti border', fabric: 'Raw silk, gota patti', badge: 'Made to order' },
    { name: 'Bandhani Twirl Set', occasion: 'navratri', price: 14900, desc: 'Bandhani co-ord, mirror-flare skirt', fabric: 'Georgette, tie-dye bandhani', badge: 'Ready to ship' },
  ],
  lookbook: [
    { title: 'The Twirl', sub: 'Diwali night, marigold hour', img: 'look-1' },
    { title: 'Mirror & Marigold', sub: 'Eid-morning sharara', img: 'look-2' },
    { title: 'Diya Light', sub: 'Still life in celebration', img: 'look-3' },
  ],
  calendar: [
    { fest: 'Navratri', date: '11 – 19 Oct', edit: 'Bandhani & mirror', ship: 'Order by 2 Oct' },
    { fest: 'Diwali', date: '8 Nov', edit: 'Silk & marigold', ship: 'Order by 30 Oct' },
    { fest: 'Wedding season', date: 'Nov – Feb', edit: 'Lehengas & gota patti', ship: 'Bespoke by appointment' },
    { fest: 'Eid al-Fitr', date: '20 Mar', edit: 'Shararas & soft gold', ship: 'Order by 11 Mar' },
  ],
  gifts: [
    { name: 'The Marigold Box', price: 4900, desc: 'Silk dupatta, diya set, gifting note' },
    { name: 'The Baraat Box', price: 9900, desc: 'Family set — two dupattas, kids’ kurta' },
    { name: 'The Gota Pouch', price: 1900, desc: 'Gota patti potli, ready to gift' },
  ],
  gifting: {
    title: 'Gift it, wrapped in marigold',
    body: 'Every festive order ships in our marigold-ivory box with a hand-tied gota ribbon and your note, written by hand. Gifting concierge for bulk family orders.',
    note: 'Wrapping & note always included.',
  },
  visit: {
    title: 'Visit the festive floor',
    address: '14 Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Mon – Sat · 11am – 8pm',
    phone: '+91 98200 12345',
    body: 'Try the Diwali edit under real diya light. Festive stylists on the floor through the season.',
  },
  footer: {
    line: `© 2026 ${kela.name} · Festive ethnic wear`,
    calendarNote: 'Festival calendar: Navratri · Diwali · Wedding season · Eid',
    concierge: 'Gifting concierge · Family styling for the baraat',
  },
};
