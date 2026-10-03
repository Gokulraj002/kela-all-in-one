import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Wood-fired coffee house' },
  nav: [
    { label: 'Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Craft', href: '#craft' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Est. 2016 — Fort, Mumbai',
    title: 'Coffee, poured like daylight.',
    sub: 'A wood-fired coffee house in the old fort district. Roasted downstairs, poured slow, served in the morning light.',
    cta: 'Plan your visit',
    ctaHref: '#visit',
    notes: {
      morning:
        "This morning's pour — a washed Yirgacheffe, apricot and jasmine, pulled at first light.",
      afternoon:
        "This afternoon's pour — our house espresso, burnt honey and cocoa. Over ice, if you like.",
      evening:
        'This evening\u2019s pour — a slow decaf filter, made for long conversations.',
    },
  },
  menuTabs: [
    {
      id: 'espresso',
      label: 'Espresso',
      items: [
        { name: 'Espresso', price: 180, desc: 'Double ristretto, burnt-honey crema.' },
        { name: 'Cortado', price: 220, desc: 'Silky one-to-one, single origin.' },
        { name: 'Flat White', price: 260, desc: 'Velvet microfoam, cocoa finish.' },
        { name: 'Cappuccino', price: 240, desc: 'Classic thirds, dusted cocoa.' },
      ],
    },
    {
      id: 'filter',
      label: 'Filter',
      items: [
        { name: 'Pour Over — Yirgacheffe', price: 280, desc: 'Washed Ethiopian, apricot and jasmine.' },
        { name: 'Aeropress — Huila', price: 290, desc: 'Honey-process Colombian, red cherry.' },
        { name: 'French Press — Estate Blend', price: 260, desc: 'Full-bodied, jaggery and warm spice.' },
        { name: 'Cold Brew', price: 300, desc: 'Eighteen-hour steep, chocolate and orange.' },
      ],
    },
    {
      id: 'brunch',
      label: 'Brunch',
      items: [
        { name: 'Shakshuka & Sourdough', price: 380, desc: 'Baked eggs, smoked tomato, herbs.' },
        { name: 'Mushroom Toast', price: 340, desc: 'Forest mushrooms, thyme, sourdough.' },
        { name: 'Akuri on Toast', price: 320, desc: 'Parsi-style spiced eggs, buttered toast.' },
      ],
    },
    {
      id: 'bakes',
      label: 'Bakes',
      items: [
        { name: 'Butter Croissant', price: 160, desc: 'Laminated over three days.' },
        { name: 'Banana Espresso Bread', price: 180, desc: 'Toasted, with salted butter.' },
        { name: 'Cardamom Bun', price: 170, desc: 'Swedish-style, pearl sugar.' },
      ],
    },
  ],
  story: {
    eyebrow: 'The house',
    title: 'A room built around the roast.',
    body: [
      `${kela.name} began in 2016 with a secondhand roaster, an oak counter salvaged from a Irani café, and a stubborn belief that a coffee house should feel like a well-kept journal — considered, warm, and a little worn at the edges.`,
      'We roast in small batches in the room below, so the whole house smells faintly of caramelised sugar by eight in the morning. Upstairs, the light does the decorating. Come early for the window seats; they go the way good things go.',
    ],
    barista: {
      name: 'Meera Krishnan',
      role: 'Head barista',
      note: '“Dial the grinder by taste, not by number. The beans change with the weather, and so should we.”',
    },
  },
  craft: {
    eyebrow: 'Roast & craft',
    title: 'From drum to cup, in five acts.',
    stages: [
      { time: '06:00', title: 'Green in', text: 'Today\u2019s lots — Chikmagalur and Yirgacheffe — go into the drum as the city wakes.' },
      { time: '06:40', title: 'First crack', text: 'The beans speak. We listen, and ease off the heat.' },
      { time: '07:20', title: 'The drop', text: 'Roast dropped at the exact second the sugars peak. No darker.' },
      { time: '07:45', title: 'The rest', text: 'Beans rest, degas, and settle into themselves.' },
      { time: '09:00', title: 'First pour', text: 'The first shot of the day is always the barista\u2019s. Then yours.' },
    ],
    methods: [
      { name: 'V60', text: 'For clarity — florals and bright fruit.' },
      { name: 'Aeropress', text: 'For body — sweet, syrupy, forgiving.' },
      { name: 'French Press', text: 'For comfort — deep and chocolatey.' },
      { name: 'Espresso', text: 'For intensity — the house signature.' },
    ],
    team: [
      { name: 'Meera Krishnan', role: 'Head barista — roast & espresso' },
      { name: 'Arjun Shetty', role: 'Filter bar — pour overs & brew lab' },
    ],
  },
  gallery: {
    eyebrow: 'The room',
    title: 'Light, oak, regulars.',
    captions: ['The counter at eight', 'The craft, up close'],
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Come by. Stay a while.',
    address: '14 Rampart Row, Fort, Mumbai 400001',
    phone: '+91 22 4890 1234',
    email: `hello@${kela.domain}`,
    hours: [
      { days: 'Monday – Friday', time: '8:00 AM – 10:00 PM' },
      { days: 'Saturday – Sunday', time: '9:00 AM – 11:00 PM' },
    ],
    holidayNote: 'Diwali day we open at noon; Christmas morning, first pour is on the house.',
    directions:
      'Two minutes from CST station — walk up Rampart Row, look for the oak door and the smell of fresh roast. Street parking on weekends; metro to Churchgate plus a ten-minute walk.',
  },
  footer: {
    line: `${kela.name} — a wood-fired coffee house, Fort, Mumbai.`,
    colophon: 'Set in Fraunces & Manrope. Printed, more or less, on warm paper.',
  },
};
