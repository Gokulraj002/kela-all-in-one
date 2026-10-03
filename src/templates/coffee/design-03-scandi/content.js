import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Scandinavian café' },
  nav: [
    { label: 'Ritual', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Seasons', href: '#craft' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'A quiet café — Bengaluru',
    title: 'Sit down. The light is good.',
    sub: 'Fika is the Swedish pause — coffee, something baked, and nowhere else to be. We keep the room pale, the roasts light, and the hours unhurried.',
    cta: 'Visit us',
    ctaHref: '#visit',
  },
  ritual: {
    eyebrow: 'The ritual',
    title: 'Fika, twice a day.',
    body: [
      'In Sweden, fika is not a coffee break. It is a small ceremony, taken twice daily, that says the work can wait and the people cannot. A cup, a bun, a chair by the window.',
      'We built this room around that pause: birch tables, linen curtains, ceramics made two streets away. The coffee is roasted light so the cup stays clear and gentle — nothing here is in a hurry, including the coffee.',
    ],
    points: [
      { time: '10:30', text: 'Morning fika — filter coffee and the first buns out of the oven.' },
      { time: '15:00', text: 'Afternoon fika — the day\u2019s true pause. Everything stops for twenty minutes.' },
    ],
  },
  moments: [
    {
      id: 'morning',
      label: 'Morning',
      note: 'For slow starts and open notebooks.',
      items: [
        { name: 'Filter Coffee', price: 240, desc: 'Light roast, brewed slow in glass.' },
        { name: 'Rye Porridge', price: 220, desc: 'Oat and rye, brown butter, lingonberry.' },
        { name: 'Cardamom Bun', price: 170, desc: 'Baked at seven, gone by eleven.' },
      ],
    },
    {
      id: 'fika',
      label: 'Fika',
      note: 'The pause itself, on a plate.',
      items: [
        { name: 'Fika for Two', price: 520, desc: 'Two filters, two buns, one unhurried hour.' },
        { name: 'Cinnamon Bun', price: 160, desc: 'Soft, buttery, barely sweet.' },
        { name: 'Open Rye Sandwich', price: 260, desc: 'Soft cheese, dill, pickled cucumber.' },
      ],
    },
    {
      id: 'evening',
      label: 'Evening',
      note: 'Low light, low caffeine, long conversations.',
      items: [
        { name: 'Evening Filter', price: 250, desc: 'Decaf Ethiopian, honeyed and calm.' },
        { name: 'Hot Chocolate', price: 240, desc: 'Seventy percent dark, sea salt.' },
        { name: 'Rye Crisp & Cheese', price: 200, desc: 'Crispbread, aged cheese, honey.' },
      ],
    },
  ],
  seasons: {
    eyebrow: 'Daylight & seasons',
    title: 'Hours, told in light.',
    lines: [
      { season: 'Winter', text: 'We open with the sun at 7:30. The room is blue until nine; the coffee is hot by eight.' },
      { season: 'Summer', text: 'Light until eight in the evening. The long tables fill with readers and the patient.' },
      { season: 'Monsoon', text: 'Grey days, warm room. Cardamom buns double as weather insurance.' },
    ],
    seasonal: 'December brings saffron buns; June brings elderflower cold brew. The menu turns with the year, quietly.',
  },
  room: {
    eyebrow: 'The room',
    title: 'Pale, quiet, made to linger.',
    materials: ['Birch tables', 'Linen curtains', 'Handmade ceramics', 'Pale oak floors'],
    note: 'No music with lyrics. No rush. Laptops welcome until noon; after that, the room belongs to conversation.',
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Come and stay a while.',
    address: '21 Lavelle Road, Bengaluru 560001',
    phone: '+91 80 4890 5678',
    email: `hej@${kela.domain}`,
    hours: [
      { days: 'Monday – Friday', time: '7:30 AM – 8:00 PM' },
      { days: 'Saturday – Sunday', time: '8:30 AM – 8:00 PM' },
    ],
    note: 'Fika is served all day. The window seats are first-come, first-loved.',
  },
  footer: {
    line: `${kela.name} — a Scandinavian café, Bengaluru.`,
    whisper: 'Take the pause.',
  },
};
