import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A seven-course tasting in seven movements',
  },
  nav: [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'The Tasting', href: '#tasting' },
    { label: 'Wine', href: '#wine' },
    { label: 'Private', href: '#private' },
  ],
  hero: {
    eyebrow: 'Kala Ghoda · Mumbai',
    title: kela.name,
    sub: 'Seven courses, composed in silence and served in seven movements. One table, one evening, nothing hurried.',
    cta: 'Reserve a table',
    ctaHref: '#reserve',
    meta: ['Seven movements', 'Wine pairing available', 'Tuesday – Sunday'],
  },
  philosophy: {
    eyebrow: 'The Philosophy',
    title: 'Cooking is the art of leaving things out.',
    body: [
      `${kela.name} is a single table of twenty-two seats in a quiet room in Kala Ghoda. The kitchen serves one menu each evening — seven courses, written each morning, changed with the tide and the season. There is no à la carte, no rush, and no noise that does not belong.`,
      'We cook the way a museum hangs a painting: one idea per wall, lit with care, given its silence. A scallop arrives as three bites and one thought. The duck carries twenty-one days of patience in every slice. Dessert is a study in restraint — dark chocolate, a whisper of gold, nothing more.',
      'Come hungry for the ceremony as much as the food. The evening lasts three hours. You will remember it longer.',
    ],
    chef: 'Chef Aarav Mehta',
    chefNote: 'Seven movements, seven silences — the plate says only what it must.',
  },
  tasting: {
    eyebrow: 'The Tasting',
    title: 'Seven movements',
    note: 'The full tasting, ₹18,500 per guest. Wine pairing, ₹9,500.',
  },
  courses: [
    {
      name: 'Scallop Crudo',
      desc: 'Hokkaido scallop, finger-lime pearls, sea herbs, cold-pressed coastal oil. Served at precisely four degrees.',
      pairing: 'Chablis 1er Cru, Burgundy',
      price: 2400,
    },
    {
      name: 'Osciètre & Blini',
      desc: 'Petrossian osciètre caviar, smoked crème, buckwheat blini, chive cut at the pass. Eaten in a single bite.',
      pairing: 'Blanc de Blancs, Champagne',
      price: 3800,
    },
    {
      name: 'Dry-Aged Duck',
      desc: 'Twenty-one-day aged duck breast, blackberry jus with a mirror gloss, charred endive, thyme.',
      pairing: 'Pinot Noir, Burgundy',
      price: 4600,
    },
    {
      name: 'A5 Wagyu',
      desc: 'Kagoshima striploin, bone-marrow crumb, smoked maldon salt. Rested eleven minutes, as it deserves.',
      pairing: 'Barolo, Piedmont',
      price: 6800,
    },
    {
      name: 'Tandoor Lobster',
      desc: 'Konkan lobster, curry-leaf beurre monté, charred lime. Our one nod to the fire outside.',
      pairing: 'Viognier, Condrieu',
      price: 5400,
    },
    {
      name: 'Aged Comté',
      desc: 'Twenty-four-month Comté, truffle honey, walnut sablé. A pause before the final movement.',
      pairing: 'Sauternes, Bordeaux',
      price: 2200,
    },
    {
      name: 'Noir',
      desc: 'Seventy-percent Ecuadorian chocolate, restrained gold leaf, smoked-salt caramel. Silence, then sweetness.',
      pairing: 'Vintage Port, Douro',
      price: 1800,
    },
  ],
  wine: {
    eyebrow: 'The Pairing',
    title: 'Poured in sequence',
    body: 'Seven wines for seven movements, poured tableside as each course arrives. The pairing is optional, and never hurried — roughly ninety millilitres per pour, chosen to whisper rather than shout.',
    price: 9500,
    rows: [
      { course: 'I — Scallop Crudo', wine: 'Chablis 1er Cru, Burgundy', note: 'Chalk and citrus against the cold scallop.' },
      { course: 'II — Osciètre & Blini', wine: 'Blanc de Blancs, Champagne', note: 'Fine bubbles to carry the smoke.' },
      { course: 'III — Dry-Aged Duck', wine: 'Pinot Noir, Burgundy', note: 'Earth and silk for the aged bird.' },
      { course: 'IV — A5 Wagyu', wine: 'Barolo, Piedmont', note: 'Structure to meet the fat.' },
      { course: 'V — Tandoor Lobster', wine: 'Viognier, Condrieu', note: 'Stone fruit cools the curry leaf.' },
      { course: 'VI — Aged Comté', wine: 'Sauternes, Bordeaux', note: 'Honey on honey, properly restrained.' },
      { course: 'VII — Noir', wine: 'Vintage Port, Douro', note: 'Darkness answered with darkness.' },
    ],
  },
  private: {
    eyebrow: 'Private Dining',
    title: 'The Salon',
    body: 'A separate room for eight guests, behind a single brass door. The full tasting, a dedicated sommelier, and the kitchen’s complete attention — from the first pour to the last silence.',
    points: ['Eight seats, one table', 'Dedicated sommelier', 'Full evening buyout available'],
    cta: 'Enquire for the Salon',
    ctaHref: '#reserve',
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Reserve a table',
    address: ['14 Rampart Row, Kala Ghoda', 'Fort, Mumbai 400001'],
    phone: '+91 22 4971 2200',
    email: `reserve@${kela.domain}`,
    hours: [
      { days: 'Tuesday – Sunday', time: 'First seating · 19:00' },
      { days: 'Tuesday – Sunday', time: 'Second seating · 21:30' },
      { days: 'Monday', time: 'The kitchen rests' },
    ],
    note: 'The tasting is ₹18,500 per guest; wine pairing ₹9,500. Evenings last three hours. Parties of seven or more, write to us directly.',
  },
  footer: {
    colophon: 'Set in Cormorant Garamond & Outfit · Photographed in available darkness',
    line: `© 2026 ${kela.name}, Kala Ghoda, Mumbai. All rights reserved.`,
  },
};
