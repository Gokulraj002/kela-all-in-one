import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'An omakase counter in Mumbai',
    mark: 'K',
  },
  nav: [
    { label: 'The Counter', href: '#counter' },
    { label: 'The Progression', href: '#progression' },
    { label: 'Etiquette', href: '#etiquette' },
    { label: 'Reserve', href: '#reserve' },
  ],
  hero: {
    eyebrow: 'おまかせ · Omakase',
    title: 'Trust the chef.',
    sub: 'Twelve seats. Six courses. One evening, served in silence — the way it has always been done.',
    cta: 'Request a seat',
    ctaHref: '#reserve',
    seats: 'Twelve seats · Two seatings nightly',
  },
  counter: {
    eyebrow: 'The Counter',
    title: 'Thirty years. Twelve seats. One knife.',
    body: [
      `${kela.name} is a twelve-seat hinoki counter in Kala Ghoda, Mumbai. There is no menu. Each morning the chef walks the market; each evening he serves six courses — the same six to every guest, in the same quiet.`,
      'Chef Kenji Mori trained in Ginza for twenty years before crossing the sea. He believes a nigiri should be eaten within four seconds of being placed, and that the best conversation at a counter is none at all.',
    ],
    chef: 'Chef Kenji Mori',
    chefRole: 'Itamae',
    chefNote: 'The fish does the talking. I only do the cutting.',
  },
  progression: {
    eyebrow: 'The Progression',
    title: 'Served, not chosen.',
    copy: 'Six courses arrive in a fixed order, decided each morning at the market. You do not choose. You receive.',
  },
  courses: [
    {
      jp: '造り',
      name: 'Tsukuri — Sashimi',
      desc: 'Three precise cuts from the morning market — hon-maguro, kinmedai, hotate. Nothing else on the plate.',
      note: 'The season arrives first.',
    },
    {
      jp: '握り',
      name: 'Nigiri — Toro',
      desc: 'Toro cut in a single draw, pressed over warm seasoned rice. Eaten the moment it is placed.',
      note: 'The single cut.',
    },
    {
      jp: '軍艦',
      name: 'Gunkan — Uni',
      desc: 'Hokkaido uni, still glistening, over rice. The nori is wrapped seconds before serving.',
      note: 'Eat it before it settles.',
    },
    {
      jp: '玉子',
      name: 'Tamago',
      desc: 'Layered sweet omelette, twelve folds. The quiet test of every itamae.',
      note: 'The chef’s signature.',
    },
    {
      jp: '手',
      name: 'Nigiri — The Hands',
      desc: 'Formed inches from you, by hands that have done this for thirty years. Watch, then eat.',
      note: 'Formed as you watch.',
    },
    {
      jp: '印',
      name: 'The Chef’s Mark',
      desc: 'A sweet to close. Mizu-yokan, red bean, a single black sesame — the evening, sealed.',
      note: 'The evening, sealed.',
    },
  ],
  etiquette: {
    eyebrow: 'Etiquette',
    title: 'How to sit at the counter.',
    rules: [
      'Arrive unhurried. The counter begins when all twelve are seated.',
      'Eat each piece the moment it is placed. Warm rice waits for no one.',
      'Do not dip the rice in soy — the chef has seasoned every grain.',
      'Photograph quietly, never with flash. The counter is a quiet room.',
      'Phones stay away; conversation stays low.',
      'Trust the progression. It is served, not chosen.',
    ],
  },
  reserve: {
    eyebrow: 'Reserve',
    title: 'Twelve seats. Request one.',
    copy: 'Two seatings nightly — 18:00 and 20:30, Tuesday to Sunday. The full progression, ₹9,500 per guest. Tell us your preferred evening; we confirm within a day.',
    seatings: ['18:00', '20:30'],
    price: 9500,
    closed: 'Closed Mondays. The counter rests.',
    confirm: 'Request received. We confirm within one day — the counter keeps twelve seats, no more.',
  },
  visit: {
    address: '14 Rampart Row, Kala Ghoda, Mumbai 400001',
    phone: '+91 22 4890 1212',
    email: `reserve@${kela.domain}`,
    hours: [
      { days: 'Tuesday – Sunday', time: 'Seatings 18:00 · 20:30' },
      { days: 'Monday', time: 'Closed' },
    ],
  },
  footer: {
    line: `© 2026 ${kela.name}. Twelve seats, served in silence.`,
  },
};
