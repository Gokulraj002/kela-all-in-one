import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A morning patisserie',
    est: 'Est. 2019 — Kala Ghoda, Mumbai',
  },
  nav: [
    { label: 'The Craft', href: '#craft' },
    { label: 'The Case', href: '#case' },
    { label: 'Bake Schedule', href: '#schedule' },
    { label: 'Custom Cakes', href: '#cakes' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'A morning patisserie · Mumbai',
    title: 'Laminated with patience, served with light.',
    sub: 'Croissants folded over three days, entremets glazed at dawn, and bread from a slow overnight ferment — everything leaves our ovens before the city wakes.',
    cta: 'Pre-order for morning',
    ctaHref: '#visit',
    secondaryCta: 'See the case',
    secondaryCtaHref: '#case',
  },
  craft: {
    eyebrow: 'The craft',
    title: 'Twenty-seven layers of butter and time',
    body: [
      `Every croissant at ${kela.name} begins as a block of cultured butter folded into dough, then folded again — three single folds, one double, resting a full night between each.`,
      'We laminate cold and slow, the way the old Parisian houses taught. The result is a crumb you can count: twenty-seven distinct layers that shatter, then melt.',
      'Sourdough ferments overnight on wild starter. Entremets are glazed one by one at first light, never before. Nothing here is rushed, and everything is gone by noon.',
    ],
    stats: [
      { value: '27', label: 'Butter layers in every croissant' },
      { value: '72h', label: 'From dough to case, unhurried' },
      { value: '7:40', label: 'The moment the first tray lands' },
    ],
  },
  tiers: [
    {
      id: 'viennoiserie',
      name: 'Viennoiserie',
      caption: 'Folded, proofed, baked to a whisper',
      flag: 'Out of the oven · 7:40',
      items: [
        {
          name: 'Butter Croissant',
          price: 165,
          desc: 'Twenty-seven layers, cultured butter, a honeycomb crumb you can hear.',
          note: 'First tray lands 7:40',
          image: 'hero',
        },
        {
          name: 'Pain au Chocolat',
          price: 195,
          desc: 'Two batons of single-origin dark chocolate inside our signature fold.',
          note: 'Out at 8:05',
          image: 'hero',
        },
      ],
    },
    {
      id: 'entremets',
      name: 'Entremets',
      caption: 'Glazed at dawn, served by mid-morning',
      flag: 'Glazed fresh · 9:15',
      items: [
        {
          name: 'Pistachio Mirror',
          price: 385,
          desc: 'Sicilian pistachio mousse under a flawless mirror glaze, sable Breton base.',
          note: 'Glazed at 9:15',
          image: 'product-0',
        },
        {
          name: 'Fruit Tart du Matin',
          price: 340,
          desc: 'Vanilla-bean pastry cream, market berries under a whisper of apricot glaze.',
          note: 'Assembled 9:30',
          image: 'product-2',
        },
      ],
    },
    {
      id: 'breads',
      name: 'Breads',
      caption: 'Overnight ferment, scored by hand',
      flag: 'From the deck oven · 10:00',
      items: [
        {
          name: 'Country Sourdough',
          price: 320,
          desc: 'Wild starter, eighteen-hour ferment, a deeply caramelised scored ear.',
          note: 'Out at 10:00',
          image: 'product-1',
        },
        {
          name: 'Brioche Feuilletée',
          price: 210,
          desc: 'Our laminated brioche — croissant and brioche in one tender crumb.',
          note: 'Out at 10:20',
          image: 'hero',
        },
      ],
    },
  ],
  schedule: {
    eyebrow: 'The morning',
    title: 'What comes out of the oven, and when',
    note: 'The case fills in this order, every single morning. When a tray is gone, it is gone.',
    items: [
      { time: '5:30', name: 'Ovens lit', desc: 'Deck oven to 250°C. First dough out of retarder, scored while cold.' },
      { time: '6:15', name: 'Baguettes de tradition', desc: 'Poolish baguettes baked on the stone — crisp, open, gone by nine.' },
      { time: '7:40', name: 'Croissants & viennoiserie', desc: 'The first tray lands in the case. The smell does the marketing.' },
      { time: '8:05', name: 'Pain au chocolat', desc: 'Second lamination of the morning, chocolate batons melted just so.' },
      { time: '9:15', name: 'Entremets glazed', desc: 'Mirror glaze at exactly 32°C, poured one dome at a time.' },
      { time: '10:00', name: 'Sourdough & brioche', desc: 'The overnight ferment finally meets the deck oven.' },
    ],
  },
  cakes: {
    eyebrow: 'Custom cakes',
    title: 'A cake that only exists for you',
    body: [
      'Weddings, birthdays, quiet celebrations — our entremetiers build one-of-a-kind cakes to order, from a pistachio mirror large enough for twenty to a jasmine-and-white-chocolate centrepiece.',
      'Tell us the occasion, the flavours you love, and the date. We take a small number of commissions each week so every cake gets the dawn shift.',
    ],
    points: ['72 hours notice', 'Tastings by appointment', 'Delivery across South Mumbai'],
    cta: 'Enquire for a custom cake',
    ctaHref: '#visit',
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Find us where the morning smells of butter',
    address: '14 Rampart Row, Kala Ghoda, Fort, Mumbai 400001',
    phone: '+91 98200 12345',
    email: `hello@${kela.domain}`,
    hours: [
      { days: 'Tuesday – Sunday', time: '7:30 am – 1:00 pm' },
      { days: 'Monday', time: 'Closed — the ovens rest' },
    ],
    note: 'Pre-orders close at 9 pm the evening before. Pick up from 7:40 am, warm from the tray.',
  },
  footer: {
    line: `© 2026 ${kela.name} Patisserie. Baked before dawn, every day.`,
    credit: 'Laminated with patience in Mumbai.',
  },
};
