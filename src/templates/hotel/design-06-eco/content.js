/* Kela Hotels — all editable copy, rates, and data. Plain JSON-compatible. */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'A forest-first retreat' },

  nav: [
    { label: 'The Promise', href: '#story' },
    { label: 'Canopy Stays', href: '#rooms' },
    { label: 'The Forest', href: '#experiences' },
    { label: 'Dining', href: '#dining' },
    { label: 'Impact', href: '#impact' },
  ],

  hero: {
    eyebrow: 'A forest-first retreat · Western Ghats',
    title: 'Sleep in the canopy.',
    sub: 'Twelve rooms at three heights in living rainforest — low-impact luxury measured in birdsong, not thread counts.',
    cta: 'Stay with us',
    ctaHref: '#booking',
    secondary: 'Walk the forest',
    secondaryHref: '#experiences',
  },

  booking: {
    eyebrow: 'Plan your stay',
    title: 'The forest keeps a room for you',
    note: 'Free cancellation to 7 days · Estate breakfast included · Conservation levy funds rewilding',
    cta: 'Check availability',
    confirm:
      'Request received. Our forest desk confirms every stay personally within a day — no instant machines here.',
  },

  promise: {
    eyebrow: 'The promise',
    title: 'Luxury that leaves the forest better.',
    body: [
      `${kela.name} sits inside 40 acres of recovering rainforest in Coorg. We did not clear the forest to build rooms — we threaded twelve rooms through it, at the heights the forest already had: emergent, canopy, understorey.`,
      'Everything here is measured. Solar arrays carry most of our load, the kitchen grows 90% of what it serves, and every stay funds the rewilding of the ground beneath it. The numbers below are audited each season — this is data with soul.',
    ],
    stats: [
      { value: 14200, suffix: '', label: 'native saplings planted since 2019' },
      { value: 100, suffix: '%', label: 'single-use plastic eliminated' },
      { value: 68, suffix: '%', label: 'of our energy from the sun' },
      { value: 42, suffix: '', label: 'bird species recorded on our trails' },
    ],
  },

  rooms: [
    {
      name: 'The Emergent',
      height: '28 m above the forest floor',
      price: 18500,
      size: '620 sq ft',
      sleeps: 'Sleeps 2',
      desc: 'Our highest room — a deck in the emergent layer where hornbills cross at eye level. Outdoor rain shower, telescope, and a hammock built for two.',
      imgKey: 'product-0',
      alt: 'Wooden treehouse deck with woven furniture among rainforest canopy in morning mist',
    },
    {
      name: 'The Canopy',
      height: '18 m above the forest floor',
      price: 14000,
      size: '480 sq ft',
      sleeps: 'Sleeps 2',
      desc: 'Sleep at leaf level. The bathroom is open to the forest — a stone tub under ferns, hot water from the sun. Langurs may watch. We consider this a feature.',
      imgKey: 'product-1',
      alt: 'Open-air stone bathtub surrounded by ferns and jungle plants in dappled sunlight',
    },
    {
      name: 'The Understorey',
      height: '8 m above the forest floor',
      price: 9500,
      size: '390 sq ft',
      sleeps: 'Sleeps 2',
      desc: 'A forest-floor suite beside the waterfall trail. Fall asleep to water over rock; wake to the dawn chorus. Private plunge pool fed by the stream.',
      imgKey: 'product-2',
      alt: 'Waterfall cascading through dense jungle beside a forest trail',
    },
  ],

  experiences: {
    eyebrow: 'The forest',
    title: 'Guided, quiet, and on the forest\u2019s schedule.',
    body: 'Every walk leaves with a naturalist and returns with a story. Groups are capped at six — the forest notices crowds.',
    imageKey: 'product-3',
    imageAlt: 'Waterfall cascading through dense jungle, light filtering through the leaves',
    items: [
      { name: 'Dawn chorus walk', when: '5:30 AM · 2 hrs', desc: 'Forty species before breakfast, with our resident naturalist and very good coffee.' },
      { name: 'Waterfall trail', when: '9:00 AM · 3 hrs', desc: 'A guided trail to the falls and a swim in the plunge pool. Leeches optional, towels provided.' },
      { name: 'Canopy bridge at first light', when: '6:00 AM · 1 hr', desc: 'Cross the suspension bridge as the mist lifts and the canopy wakes up around you.' },
      { name: 'Night forest', when: '7:30 PM · 1.5 hrs', desc: 'Owls, civets, and fireflies on a red-light walk. The forest has a second shift.' },
    ],
  },

  dining: {
    eyebrow: 'Farm to table',
    title: 'The Canopy Kitchen',
    body: [
      'Ninety percent of what the kitchen serves is grown on the estate — coffee, greens, jackfruit, wild honey. The rest comes from farms we can walk to.',
      'Everything is wood-fired and seasonal. The menu is written each morning on a slate, in chalk, after the farm walk.',
    ],
    imageKey: 'detail',
    imageAlt: 'Rain drops beading on large green tropical leaves, macro photograph',
    menu: [
      { name: 'Estate breakfast', detail: 'Served in the trees, 7–10 AM', price: 0 },
      { name: 'Wood-fired lunch thali', detail: 'What the farm gave today', price: 950 },
      { name: 'Canopy tasting menu', detail: 'Seven courses, one fire', price: 2400 },
    ],
    note: 'Breakfast is included with every stay. Dinner under the stars on request.',
  },

  impact: {
    eyebrow: 'Impact report',
    title: 'The 2025–26 season, in numbers.',
    body: 'We publish this every year on seed paper. If a number gets worse, it stays on the page — that is the point of counting.',
    rows: [
      { k: 'Hectares under rewilding', v: '40' },
      { k: 'Native saplings planted', v: '14,200' },
      { k: 'Single-use plastic generated', v: '0 kg' },
      { k: 'Energy from solar', v: '68%' },
      { k: 'Water recycled', v: '92%' },
      { k: 'Team from neighbouring villages', v: '84%' },
      { k: 'Conservation levy per stay', v: '₹1,200' },
    ],
    note: 'Every stay carries a ₹1,200 conservation levy. It funds 12 m² of rewilding — the forest you slept in, planted back.',
  },

  contact: {
    email: `stay@${kela.domain}`,
    phone: '+91 98220 44556',
    address: `${kela.name}, Polibetta, Coorg, Karnataka 571215`,
    instagram: `https://instagram.com/${kela.instagram}`,
  },

  footer: {
    line: `© 2026 ${kela.name}. All rights reserved.`,
    colophon: 'Built low-impact · 68% solar-powered pixels',
  },
};
