import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Coffee at city speed' },
  nav: [
    { label: 'Order', href: '#order' },
    { label: 'Locations', href: '#locations' },
    { label: 'Menu', href: '#menu' },
    { label: 'Rhythm', href: '#rhythm' },
    { label: 'City', href: '#city' },
  ],
  hero: {
    eyebrow: 'EST. 2019 — MUMBAI',
    title: 'COFFEE AT CITY SPEED',
    sub: 'Order ahead, skip the queue, grab and go. Your espresso starts pulling 90 seconds before you arrive.',
    cta: 'Order Ahead',
    ctaSecondary: 'Find a Location',
    badge: '90-SEC PICKUP',
  },
  ticker: [
    'DOUBLE SHOT DAYS — 2X ESPRESSO 7–9 AM',
    'COLD BREW HAPPY HOUR 3–5 PM',
    'FREE CROISSANT WITH ANY LARGE 8–10 AM',
    'STUDENT RUSH — 15% OFF WITH ID',
    'NEW: SALTED CARAMEL COLD FOAM',
  ],
  order: {
    eyebrow: 'ORDER AHEAD',
    title: 'In and out before the signal changes.',
    sub: 'Three taps. Zero queue. Your cup waits on the orange shelf with your name on it.',
    steps: [
      { n: '01', title: 'Pick your fuel', desc: 'The full menu, priced for the platform edge. Tap, customise, done.' },
      { n: '02', title: 'Name your minute', desc: 'Choose a pickup slot. We start pulling your shot 90 seconds before.' },
      { n: '03', title: 'Pay and fly', desc: `UPI, cards, or the ${kela.name} wallet. Grab from the orange shelf.` },
    ],
    slots: ['ASAP', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM'],
    note: 'Average pickup today: 2 min 40 sec from order to hand.',
  },
  locations: {
    eyebrow: 'THREE SPOTS',
    title: 'Find your platform.',
    list: [
      {
        name: 'Fort',
        area: 'Kala Ghoda',
        address: '14 Rampart Row, Fort, Mumbai 400001',
        phone: '+91 22 4890 1122',
        hours: [
          ['Mon–Fri', '7:00 AM – 9:00 PM'],
          ['Sat', '8:00 AM – 10:00 PM'],
          ['Sun', '8:00 AM – 6:00 PM'],
        ],
      },
      {
        name: 'Bandra',
        area: 'Linking Road',
        address: '201 Linking Road, Bandra West, Mumbai 400050',
        phone: '+91 22 4890 1133',
        hours: [
          ['Mon–Fri', '7:30 AM – 10:00 PM'],
          ['Sat–Sun', '8:00 AM – 10:00 PM'],
        ],
      },
      {
        name: 'Andheri',
        area: 'Metro Gate 3',
        address: 'Station Plaza, Andheri West, Mumbai 400058',
        phone: '+91 22 4890 1144',
        hours: [['Mon–Sun', '6:30 AM – 11:00 PM']],
      },
    ],
  },
  menu: {
    eyebrow: 'GRAB & GO',
    title: 'The fast menu.',
    sub: 'Priced, packed, and moving. Everything travels well.',
    cats: ['Hot', 'Cold', 'Food'],
    items: {
      Hot: [
        { name: 'Rush Espresso', desc: 'Double shot, syrupy crema, gone in three sips.', price: 140 },
        { name: 'Cortado Express', desc: 'Espresso cut with steamed milk. No foam, no fuss.', price: 180 },
        { name: 'Platform Cappuccino', desc: 'Classic thirds, cocoa dust, drinkable on the move.', price: 200 },
      ],
      Cold: [
        { name: 'Cold Brew Black', desc: '18-hour steep, chocolate-dark, over ice.', price: 220 },
        { name: 'Iced Oat Latte', desc: 'Double espresso, oat milk, cold and clean.', price: 240 },
        { name: 'Orange Espresso Tonic', desc: 'Espresso over tonic and ice. The 4 PM reset.', price: 260 },
      ],
      Food: [
        { name: 'Croissant, Egg & Cheese', desc: 'Flaky, molten, wrapped to go.', price: 160 },
        { name: 'Masala Beans Toastie', desc: 'Baked beans, masala butter, sourdough.', price: 180 },
        { name: 'Overnight Oats Cup', desc: 'Cold brew-soaked oats, banana, honey.', price: 150 },
      ],
    },
  },
  flow: {
    eyebrow: 'THE LINEUP',
    title: 'The menu, in motion.',
    sub: 'Scroll and the line speeds up — it moves with you.',
    hint: 'Scroll faster — the line keeps up',
  },
  rhythm: {
    eyebrow: 'DAILY RHYTHM',
    title: 'What is brewing when.',
    slots: [
      { time: '6:30 AM', title: 'First Pull', desc: 'Espresso rush. Commuters three deep at the bar.' },
      { time: '10:00 AM', title: 'Filter Hour', desc: 'Slow brews for the laptop crowd.' },
      { time: '3:00 PM', title: 'Cold Brew O\u2019Clock', desc: 'Iced everything. Happy hour till five.' },
      { time: '7:00 PM', title: 'Last Call', desc: 'Decaf and wind-down pours.' },
    ],
  },
  city: {
    eyebrow: 'THE CITY',
    title: 'The city runs on us.',
    body: `Playlists from the bar, zines from the regulars, collab bakes from the corner bakery. ${kela.name} is a neighbourhood habit with three addresses.`,
    notes: ['Bar playlists, updated every Monday', 'Zine wall — take one, leave one', 'Collab bakes from Crumb & Co.'],
    loyalty: `${kela.name} Wallet — every 9th coffee is on us.`,
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 22 4890 1100',
    address: '14 Rampart Row, Fort, Mumbai 400001',
    hours: 'Mon–Fri 7 AM – 9 PM',
  },
  footer: {
    line: `\u00A9 2026 ${kela.name}. Brewed fast, served faster.`,
    note: 'Made for the morning rush.',
  },
};
