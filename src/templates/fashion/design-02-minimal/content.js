import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: { name: kela.name, tagline: 'Undyed. Unhurried.' },
  nav: ['Philosophy', 'Collection', 'Fabric', 'Visit'],
  hero: {
    eyebrow: 'Contemporary pret · Undyed kora cotton',
    title: 'Cloth, unhurried.',
    sub: 'Twelve pieces a year. No dye, no print, no noise — only cut, weight, and the honest colour of cotton.',
    cta: 'Enquire',
  },
  philosophy: {
    eyebrow: 'Philosophy',
    title: 'Restraint is the design.',
    body: `${kela.name} works in a single cloth — undyed kora cotton, woven on handlooms in Tamil Nadu. We do not chase seasons. Each piece is cut to be worn for a decade: seams you can open, hems you can let down, fabric that softens instead of fading. What you see is what the field grew.`,
  },
  collection: {
    eyebrow: 'The Core',
    title: 'Four pieces. Nothing more.',
    note: 'Scroll — each pleat opens in turn.',
  },
  products: [
    {
      name: 'Pleated Column Dress',
      price: 12400,
      fabric: 'Undyed kora cotton · knife pleats',
      fit: 'Relaxed column · model wears S',
    },
    {
      name: 'Everyday Tee — Set of Three',
      price: 3800,
      fabric: '180 GSM single jersey · undyed',
      fit: 'True to size · pre-shrunk',
    },
    {
      name: 'Raw Kora Wrap',
      price: 9600,
      fabric: 'Handloom kora · raw selvedge',
      fit: 'One size · drapes to the ankle',
    },
    {
      name: 'Hand-Finished Shirt',
      price: 7200,
      fabric: 'French seams · hand-rolled hems',
      fit: 'Easy cut · wears in, not out',
    },
  ],
  fabric: {
    eyebrow: 'The Cloth',
    title: 'One fabric, fully declared.',
    body: `Every ${kela.name} garment begins as greige kora cotton — unbleached, undyed, unhurried. We publish the numbers other labels hide.`,
    specs: [
      { label: 'Weave', value: 'Plain weave, handloom' },
      { label: 'Weight', value: '140 GSM shirting · 180 GSM jersey' },
      { label: 'Dye', value: 'None — the colour of the boll' },
      { label: 'Shrinkage', value: 'Under 3%, pre-shrunk' },
      { label: 'Finish', value: 'Stone-washed once, then left alone' },
    ],
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Come and touch the cloth.',
    body: 'The studio shop in Indiranagar carries the full core. Fittings are unhurried; tea is offered.',
    cta: 'Enquire',
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 80 4115 2210',
    address: '14, 4th Cross, Indiranagar, Bengaluru 560038',
    hours: 'Tue – Sun · 11 am – 7 pm',
    instagram: `https://instagram.com/${kela.instagram}`,
  },
  footer: {
    note: 'Stockists · Care guide · Journal',
    line: `© 2026 ${kela.name} · Woven in Tamil Nadu`,
  },
};
