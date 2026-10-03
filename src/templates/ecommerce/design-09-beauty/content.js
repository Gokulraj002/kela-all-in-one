import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Botanical skincare, bottled softly' },
  nav: [
    { label: 'Formulas', href: '#products' },
    { label: 'Ingredients', href: '#story' },
    { label: 'Ritual', href: '#ritual' },
    { label: 'Reviews', href: '#reviews' },
  ],
  hero: {
    eyebrow: 'Botanical skincare · Small-batch · Mumbai',
    title: 'Skincare that dissolves into you.',
    sub: 'Twelve botanicals, folded into four quiet formulas. No noise, no sting — just skin, drinking slowly.',
    cta: 'Explore the formulas',
    ctaHref: '#products',
    ctaSecondary: 'Meet the ingredients',
    ctaSecondaryHref: '#story',
    note: 'Free shipping over ₹1,500 · 30-day petal promise',
  },
  products: [
    {
      name: 'Rose Renewal Serum',
      price: 2850,
      size: '30 ml',
      badge: 'Bestseller',
      desc: 'Damask rose distillate and rosehip, folded into weightless squalane. Twelve botanicals that sink in like morning light.',
      formula: ['Damask rose distillate', 'Rosehip seed oil', 'Olive squalane'],
    },
    {
      name: 'Cloud Whip Moisturiser',
      price: 2200,
      size: '50 ml',
      badge: 'New',
      desc: 'A whipped ceramide cream that melts on contact — five ceramides and hyaluronic acid, cushioned in oat milk.',
      formula: ['5 ceramides', 'Hyaluronic acid', 'Oat milk'],
    },
    {
      name: 'Botanical Cleansing Oil',
      price: 1650,
      size: '120 ml',
      badge: 'Cult favourite',
      desc: 'Camellia and chamomile melt the day away. Massages like silk, rinses like water — never tight, never filmed.',
      formula: ['Camellia oil', 'Chamomile extract', 'Oat lipid'],
    },
    {
      name: 'Petal Lip Tint',
      price: 950,
      size: '8 g',
      badge: '4 sheer shades',
      desc: 'A wash of petal colour in a balm-soft stick. Sheer, buildable, never sticky.',
      formula: ['Rosehip butter', 'Jojoba esters', 'Vitamin E'],
    },
  ],
  shades: [
    { name: 'Petal Nude', hex: '#D9A08F', note: 'Your lips, rested — a warm neutral undertone.' },
    { name: 'Rosewater', hex: '#C4747E', note: 'A fresh flush — a cool pink undertone.' },
    { name: 'Rosewood', hex: '#8A4B3C', note: 'The signature — a deep, warm rose.' },
    { name: 'Wild Berry', hex: '#6E2F3A', note: 'Evening depth — berry over a brown base.' },
  ],
  formulasHead: {
    eyebrow: 'The formulas',
    title: 'Watch each formula resolve.',
    intro:
      `Every ${kela.name} formula begins as raw botanicals. Scroll slowly — each ingredient layer dissolves into its finished bottle, the way it does on your skin.`,
  },
  story: {
    eyebrow: 'Ingredients',
    title: 'Soft science, stated plainly.',
    body: [
      'We formulate the way a perfumer composes — a few materials, chosen for how they behave together, at percentages we print on the box. Nothing hidden behind “proprietary blend”.',
      'Each ingredient below earns its place in the bottle above. Tap nothing; just read. Good formulas need no hard sell.',
    ],
    ingredients: [
      { name: 'Damask Rose', note: 'Picked at dawn, distilled by noon. The heart note of every formula.' },
      { name: 'Rosehip', note: 'Cold-pressed seeds, rich in pro-vitamin A for a lit-from-within look.' },
      { name: 'Hyaluronic Acid', note: 'Five molecular weights — from surface dew to a deeper drink.' },
      { name: 'Ceramides', note: 'The mortar between your skin’s bricks. We use five of them.' },
      { name: 'Camellia Oil', note: 'Featherweight and fast-absorbing; a centuries-old ritual oil.' },
      { name: 'Chamomile', note: 'Cools the look of redness on contact. The peacemaker.' },
    ],
  },
  ritual: {
    eyebrow: 'The ritual',
    title: 'Four steps, five unhurried minutes.',
    steps: [
      {
        num: '01',
        title: 'Cleanse',
        product: 'Botanical Cleansing Oil',
        text: 'Warm a coin-sized pool between your palms. Massage for sixty slow seconds, then rinse with lukewarm water.',
      },
      {
        num: '02',
        title: 'Treat',
        product: 'Rose Renewal Serum',
        text: 'Three to four drops, pressed — never rubbed — into damp skin. Wait half a breath between layers.',
      },
      {
        num: '03',
        title: 'Moisturise',
        product: 'Cloud Whip Moisturiser',
        text: 'A fingertip of whip, smoothed upward along the jaw and cheeks. This seals everything beneath it.',
      },
      {
        num: '04',
        title: 'Tint',
        product: 'Petal Lip Tint',
        text: 'One sheer pass for day; three for evening. Blot once on a tissue, and smile at someone.',
      },
    ],
  },
  reviews: {
    eyebrow: 'Reviews',
    title: 'Skin, in their words.',
    items: [
      {
        quote:
          'My skin drinks the serum like it has been waiting all year. Two weeks in, my foundation sits better than it ever has.',
        name: 'Aditi R.',
        place: 'Mumbai',
      },
      {
        quote:
          'The cleansing oil is the gentlest thing I own. Makeup, sunscreen, the whole day — gone in a minute, no tightness after.',
        name: 'Sana K.',
        place: 'Bengaluru',
      },
      {
        quote:
          'Cloud Whip is exactly that — a cloud. My winter skin stopped flaking by day three. I have repurchased twice.',
        name: 'Meera J.',
        place: 'Delhi',
      },
    ],
    assurances: [
      'Free shipping over ₹1,500',
      '30-day petal promise',
      'Cruelty-free, always',
      'No added fragrance',
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 98200 12345',
    instagram: `@${kela.instagram}`,
    address: 'Studio 4, Kala Ghoda, Fort, Mumbai 400001',
  },
  newsletter: {
    title: 'Letters from the lab',
    sub: 'Formulation notes and first access to small batches. One letter a month, never more.',
    cta: 'Subscribe',
    thanks: 'Welcome in. Your first letter arrives with the new moon.',
  },
  cart: {
    title: 'Your bag',
    empty: 'Your bag is empty — the formulas are waiting.',
    checkout: 'Checkout',
    demoNote: 'Demo checkout — no payment is taken.',
    browse: 'Browse the formulas',
  },
  footer: {
    line: `© 2026 ${kela.name}. Made slowly in Mumbai.`,
    colophon: 'Set in Cormorant Garamond & Jost. Printed, more or less, on blush paper.',
  },
};
