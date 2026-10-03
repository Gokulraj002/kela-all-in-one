import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Coffee, kept like a secret' },
  nav: [
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Collection', href: '#collection' },
    { label: 'Provenance', href: '#provenance' },
    { label: 'Ritual', href: '#ritual' },
  ],
  hero: {
    eyebrow: `${kela.name.toUpperCase()} — ÉDITION LIMITÉE`,
    title: 'Darkness, refined.',
    lot: 'LOT 47 OF 200',
    sub: 'Three lots. Two hundred bags each. One roast, once a year.',
    cta: 'Shop the Collection',
  },
  philosophy: {
    eyebrow: 'The Philosophy',
    title: 'Less, but better.',
    manifesto: 'We do not chase harvests. We wait for one. A single estate, a single varietal, roasted in a single week — then sealed, numbered, and never repeated.',
    body: `${kela.name} exists for the drinker who has tasted everything and keeps returning to the same question: what if a coffee were treated like a vintage? We answer once a year.`,
  },
  collection: {
    eyebrow: 'The Collection',
    title: 'Three lots. Nothing else.',
    products: [
      {
        name: 'Noir Réserve', lot: 'Lot 47 of 200', lotNum: 47, of: 200,
        notes: 'Black cherry · Cacao · Smoke', price: 2400,
        desc: 'The flagship. Washed heirloom lots, roasted dark and slow, sealed within the hour.',
        img: 'product-1', alt: 'Espresso with swirling crema in a black ceramic cup, dark moody light',
      },
      {
        name: 'Minuit Estate', lot: 'Lot 112 of 200', lotNum: 112, of: 200,
        notes: 'Molasses · Clove · Dark honey', price: 2100,
        desc: 'A night-harvested estate lot, built for espresso and long evenings.',
        img: 'product-2', alt: 'Macro of roasted coffee beans with an oil sheen on a black background',
      },
      {
        name: 'Noir Absolu', lot: 'Lot 8 of 200', lotNum: 8, of: 200,
        notes: 'Truffle · Blackcurrant · Leather', price: 2900,
        desc: 'Our rarest microlot. Eight bags remain of two hundred. When they are gone, they are gone.',
        img: 'product-0', alt: 'Espresso with swirling crema in a black ceramic cup, dark moody light',
      },
    ],
    gift: 'Add gift wrap',
    wrapped: 'Wrapped',
  },
  provenance: {
    eyebrow: 'Provenance',
    title: 'In numbers.',
    lotLabel: 'Bags sealed this year',
    items: [
      { label: 'Estate', value: 'Hacienda Santa Lucía' },
      { label: 'Altitude', value: '1,850 m' },
      { label: 'Varietal', value: 'Heirloom Typica' },
      { label: 'Process', value: 'Washed · 72-hour ferment' },
      { label: 'Roast week', value: 'Week 38, 2026' },
      { label: 'Roast master', value: 'E. Marchetti' },
    ],
    certTitle: 'Certificate of Origin',
    cert: 'Each bag leaves the maison with a hand-numbered certificate, sealed in wax and signed by the roast master. The number on your bag matches the number on your certificate — always.',
  },
  ritual: {
    eyebrow: 'The Ritual',
    title: 'Brew it like it matters.',
    steps: [
      { t: '18 g, medium-fine', d: 'Weigh the coffee. Precision is the first luxury.' },
      { t: '92°C · 250 ml', d: 'Water just off the boil, poured slow and even.' },
      { t: '3:30, undisturbed', d: 'Let it bloom, then draw down. No stirring.' },
      { t: 'Serve black', d: 'Milk would be a rumour. Drink it pure.' },
    ],
  },
  circle: {
    eyebrow: 'The Private Circle',
    title: 'Hear it first.',
    sub: 'First access to each year\u2019s lot, before the public release. One letter a season. Nothing more.',
    cta: 'Request an Invitation',
    placeholder: 'Your email address',
    success: 'Your request is received. The maison writes once a season — watch for the seal.',
  },
  contact: {
    email: `circle@${kela.domain}`,
    phone: '+91 22 4000 4700',
    address: 'By appointment, Kala Ghoda, Mumbai',
    hours: 'Private tastings, Saturdays',
  },
  footer: {
    line: `\u00A9 2026 ${kela.name}. Roasted once a year.`,
    note: 'Numbered lots sell out. The circle hears first.',
  },
};
