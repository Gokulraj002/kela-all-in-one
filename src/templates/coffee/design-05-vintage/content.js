import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'A Mumbai institution since 1962' },
  nav: [
    { label: 'History', href: '#history' },
    { label: 'Classics', href: '#menu' },
    { label: 'Ritual', href: '#ritual' },
    { label: 'Craft', href: '#craft' },
    { label: 'Guestbook', href: '#guestbook' },
  ],
  hero: {
    since: 'Since 1962 — Fort, Mumbai',
    title: 'Sixty-four years. One unchanged cup.',
    sub: 'The brass still gleams, the lever still pulls, and the cappuccino still arrives exactly as it did in 1962.',
    cta: 'Reserve a Table',
  },
  history: {
    eyebrow: 'House History',
    title: 'The room remembers.',
    sub: 'Scroll through six decades. The decades below are scrubbable — the photographs keep pace.',
    decades: [
      {
        decade: '1960s', year: '1962', title: `${kela.name} Opens`,
        body: 'Doraswamy Iyer opens a six-table coffee house on Rampart Row with a second-hand brass lever machine and a family filter recipe.',
        photo: 0, caption: 'The room, 1962 — the brass machine on day one.',
      },
      {
        decade: '1970s', year: '1974', title: 'The Cappuccino Joins',
        body: 'Our cappuccino — thick foam, cocoa dust, the gold-rimmed cup — goes on the menu. It has never left.',
        photo: 1, caption: 'The cappuccino, unchanged since 1974.',
      },
      {
        decade: '1980s', year: '1988', title: 'The Machine Is Rebuilt',
        body: 'The 1962 lever machine is stripped down, re-brassed, and reborn. It still pulls every shot today.',
        photo: 2, caption: 'Sachertorte joins the cabinet, 1981 — baked in-house since.',
      },
      {
        decade: '1990s', year: '1995', title: 'The Regulars\u2019 Table',
        body: 'The corner table becomes unofficially reserved for the morning club — judges, journalists, and one famous poet.',
        photo: 0, caption: 'The corner table, mid-morning, most days.',
      },
      {
        decade: '2020s', year: '2024', title: 'The Third Generation',
        body: 'Meera Iyer takes the counter. Same beans, same brass, same unhurried mornings.',
        photo: 1, caption: 'The third generation at the lever.',
      },
    ],
  },
  menu: {
    eyebrow: 'The Classics',
    title: 'On the menu for decades.',
    sub: 'Nothing here is new. That is the point.',
    items: [
      { name: 'Kettle Cappuccino', since: 1974, desc: 'Thick velvet foam, cocoa dust, served in the gold-rimmed cup.', price: 180 },
      { name: 'South Indian Filter', since: 1962, desc: 'Peaberry blend, frothed davara-tumbler style, jaggery on request.', price: 120 },
      { name: 'Sachertorte', since: 1981, desc: 'Dark chocolate, apricot heart, whipped cream. Baked in-house daily.', price: 240 },
      { name: 'Bun Maska & Chai', since: 1968, desc: 'The old-morning classic. Soft bun, cold butter, cutting chai.', price: 90 },
      { name: 'Cold Coffee, Old Style', since: 1977, desc: 'Blended thick, no syrups, served in a steel tumbler.', price: 150 },
    ],
  },
  signatures: {
    eyebrow: 'House Signatures',
    title: 'Every classic, in full frame.',
    sub: 'Scroll on — each plate takes its turn at the pass.',
  },
  ritual: {
    eyebrow: 'The Ritual',
    title: 'One pull, nine seconds.',
    body: 'The brass lever comes down in a single smooth draw and the espresso ribbons into the cup, exactly as it has since 1962. Watch the film — then come and watch it happen.',
    note: 'Filmed at the counter, morning shift. No retakes needed.',
  },
  craft: {
    eyebrow: 'The Craft',
    title: 'The lever machine.',
    body: 'No buttons, no timers. The barista\u2019s arm is the pump and the ear is the gauge. Sixty-four years of pulls, and the crema still arrives like poured silk.',
    points: ['1962 brass lever group, rebuilt 1988', 'Peaberry blend, roasted medium-dark', 'Water at 92\u00B0C, never rushed', 'Every shot pulled to order'],
  },
  guestbook: {
    eyebrow: 'Guestbook',
    title: 'In their words.',
    entries: [
      { quote: 'My grandfather brought my father here. My father brought me. The cappuccino tastes like all three of us.', name: 'Aditya R.', detail: 'regular since 1998' },
      { quote: `I wrote my first novel at the corner table. ${kela.name} wrote half of it.`, name: 'S. Banerjee', detail: 'author' },
      { quote: 'The only place in the city where nobody checks their watch.', name: 'Farah K.', detail: 'architect' },
    ],
  },
  reserve: {
    eyebrow: 'Visit & Reserve',
    title: 'Reserve a table.',
    sub: 'Printed like the tickets of old — date, party, name. We hold tables for fifteen minutes past the hour.',
    stub: 'ADMIT ONE',
    success: 'Your table is held. Show this ticket at the counter — we will keep the brass warm.',
  },
  contact: {
    email: `reserve@${kela.domain}`,
    phone: '+91 22 2200 1962',
    address: '9 Rampart Row, Fort, Mumbai 400001',
    hours: 'Tue–Sun 8 AM – 8 PM · Closed Mondays',
  },
  footer: {
    line: `\u00A9 2026 ${kela.name}. Pouring since 1962.`,
    note: 'Private events in the back room — write to us.',
  },
};
