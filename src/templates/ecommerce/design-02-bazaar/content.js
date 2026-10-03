import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

/* Kela Store bazaar (brand from _shared/brand.js) — design-02-bazaar. All copy editable; JSON-compatible. */
export const content = {
  brand: { name: kela.name, tagline: 'Handmade India, delivered home' },
  nav: [
    { label: 'Stalls', href: '#products' },
    { label: 'Sellers', href: '#story' },
    { label: 'Delivery', href: '#delivery' },
    { label: 'Contact', href: '#contact' },
  ],
  ticker: [
    'Free shipping over \u20B9999',
    'Festive gifting is on \u2014 gift wrap free',
    'Cash on delivery across India',
    '7-day easy returns',
    'New stalls every Friday',
  ],
  hero: {
    eyebrow: 'A marketplace of handmade India',
    title: 'Every lane has a story. Every stall, a maker.',
    sub: 'Six stalls, forty artisans, one long afternoon of wandering. Textiles, brass, spice and clay \u2014 straight from the maker\u2019s hands to your doorstep.',
    cta: 'Browse the stalls',
    ctaHref: '#products',
    ctaSecondary: 'Meet the sellers',
    ctaSecondaryHref: '#story',
  },
  categories: ['All', 'Textiles', 'Brass', 'Spices', 'Bangles', 'Pottery'],
  products: [
    {
      idx: 0,
      name: 'Handloom Throw',
      price: 3200,
      desc: 'Handwoven cotton throw in saffron and indigo, softened by three washes.',
      badge: 'Bestseller',
      cat: 'Textiles',
      imgKey: 'product-0',
      alt: 'Tall stacks of folded handloom textiles in saffron, teal and chili red at a market stall',
    },
    {
      idx: 1,
      name: 'Brass Diya Set',
      price: 1450,
      desc: 'Set of six hand-beaten brass diyas from Moradabad, cotton wicks included.',
      badge: 'Handmade',
      cat: 'Brass',
      imgKey: 'product-1',
      alt: 'Rows of hand-beaten brass diyas, bowls and bangles gleaming in warm market light',
    },
    {
      idx: 2,
      name: 'Block-Print Cushion',
      price: 980,
      desc: 'Jaipur block-print cushion cover in chili red on natural cotton, hidden zip.',
      badge: 'New',
      cat: 'Textiles',
      imgKey: 'product-0',
      alt: 'Stacks of block-print cotton fabrics in deep red and cream at a market stall',
    },
    {
      idx: 3,
      name: 'Spice Gift Box',
      price: 1250,
      desc: 'Six stone-ground spices \u2014 turmeric, chili, cardamom and more \u2014 in a keepsake tin.',
      badge: 'Gift-ready',
      cat: 'Spices',
      imgKey: 'product-2',
      alt: 'Vibrant spice piles in terracotta bowls and brass dishes \u2014 turmeric, chili, cardamom',
    },
    {
      idx: 4,
      name: 'Lac Bangles Pair',
      price: 760,
      desc: 'Hand-rolled lac bangles in teal and gold, made in small festive batches.',
      badge: 'Festive',
      cat: 'Bangles',
      imgKey: 'product-1',
      alt: 'Stacks of brass bangles and bowls catching golden light at a market stall',
    },
    {
      idx: 5,
      name: 'Terracotta Planter',
      price: 640,
      desc: 'Wheel-thrown terracotta planter with a raw, sun-baked finish. Draining hole included.',
      badge: 'Under \u20B9700',
      cat: 'Pottery',
      imgKey: 'product-2',
      alt: 'Terracotta bowls and brass dishes of spices arranged at a market stall',
    },
  ],
  stalls: {
    eyebrow: 'The stalls',
    title: 'Walk the lanes.',
    body: 'Two lanes of stalls drift past like a walk through the market \u2014 scroll and the whole bazaar picks up its pace. Tap a sticker to see one craft at a time.',
  },
  story: {
    eyebrow: 'The sellers',
    title: 'Bought from people, not warehouses.',
    body: [
      `Every stall in the ${kela.name} bazaar is run by the family that makes what it sells. No middlemen, no mystery \u2014 the price on the tag is the price the maker set.`,
      'We visit every workshop once a season, sit on the floor, drink the chai, and only then list the stall.',
    ],
    sellers: [
      {
        name: 'Rukmini Devi',
        craft: 'Handloom weaver \u2014 Panipat',
        quote: '\u201CMy grandmother taught me on a wooden loom. Every throw takes two full days, and my name goes on the tag.\u201D',
      },
      {
        name: 'Salim Khan',
        craft: 'Brasswork \u2014 Moradabad',
        quote: '\u201CBrass remembers the hand that beats it. Machine work shines the same everywhere; mine shines like home.\u201D',
      },
      {
        name: 'Lakshmi Amma',
        craft: 'Spice blends \u2014 Kochi',
        quote: '\u201CI grind on the day I pack. If the turmeric doesn\u2019t stain your fingers yellow, send it back to me.\u201D',
      },
    ],
    imageAlt: 'Two hands exchanging a lit brass diya across a market counter, colorful fabric rolls blurred behind',
  },
  delivery: {
    eyebrow: 'Festival delivery',
    title: 'Ordered today, at your door this week.',
    items: [
      { title: 'Free shipping', text: 'On every order over \u20B9999, anywhere in India.' },
      { title: 'Cash on delivery', text: 'Pay at the door \u2014 UPI, cards and cash all welcome.' },
      { title: '7-day easy returns', text: 'Changed your mind? One message and we collect it.' },
      { title: 'Free gift wrap', text: 'Festive-season wrapping, with a handwritten note.' },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 80 4719 2200',
    address: '14 Commercial Street, Bengaluru 560001',
    hours: 'Open every day, 10 AM \u2013 9 PM',
  },
  footer: {
    line: `${kela.name} \u2014 handmade India, delivered home.`,
    colophon: 'Set in Archivo & Work Sans. Printed, more or less, on warm paper.',
  },
};
