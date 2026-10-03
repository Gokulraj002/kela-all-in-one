import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Second homes on the Alibaug coast',
  },
  nav: [
    { label: 'The Place', href: '#place' },
    { label: 'Residences', href: '#residences' },
    { label: 'The Slow Life', href: '#slow-life' },
    { label: 'Ownership', href: '#ownership' },
  ],
  hero: {
    eyebrow: 'Alibaug Coast · Maharashtra',
    title: 'Where the day ends at the waterline',
    sub: 'A small reserve of second homes built around one idea — that the most luxurious thing you can own is unhurried time.',
    cta: 'Arrange a visit',
    ctaHref: '#ownership',
    note: 'Tide turning · 2.4 m',
  },
  place: {
    eyebrow: 'The Place',
    title: 'Fifty minutes from the city. A world away from it.',
    body: [
      `${kela.name} sits on a quiet headland of the Alibaug coast, reached by ferry from the Gateway and a short drive through coconut groves. Twelve acres of protected shoreline, one private beach, and water you can see through.`,
      'Everything here is oriented the same way — toward the horizon. The villas, the paths, the infinity edges. You arrive, and your eyes go where they are meant to go: out, and far.',
    ],
    facts: [
      { value: '12', unit: 'acres of shoreline reserve' },
      { value: '1', unit: 'private beach, 300 m' },
      { value: '50', unit: 'minutes by ferry + drive' },
      { value: '18', unit: 'homes, never more' },
    ],
  },
  residences: {
    eyebrow: 'Residences',
    title: 'Three ways to live at the edge',
    hint: 'Scroll — the layers drift apart',
    items: [
      {
        name: 'The Horizon Villa',
        desc: 'Four bedrooms over the bluff. Glass on three sides, bleached-deck terraces, and a pool that does not know where it ends.',
        price: 48500000,
        specs: ['4 bedrooms', '4,200 sq ft', 'Beachfront'],
      },
      {
        name: 'The Drift House',
        desc: 'Three bedrooms in the palm grove. Open-plan living that faces the sea from every chair in the house.',
        price: 36000000,
        specs: ['3 bedrooms', '3,100 sq ft', 'Palm grove'],
      },
      {
        name: 'The Saltwater Suite',
        desc: 'Two bedrooms for weekend people. A morning-light suite with sheer curtains, and the ocean as your second wall.',
        price: 24000000,
        specs: ['2 bedrooms', '1,950 sq ft', 'Sea-facing'],
      },
    ],
  },
  slowLife: {
    eyebrow: 'The Slow Life',
    title: 'Days here have a tide table',
    body: `There is no itinerary at ${kela.name}. There is a rhythm — the ferry schedule, the tide, the hour the light goes gold on the deck. The rest arranges itself.`,
    rituals: [
      {
        time: '06:30',
        title: 'The first swim',
        text: 'The pool before the sun finds it. Coffee arrives as the light does.',
      },
      {
        time: '11:00',
        title: 'The ferry in',
        text: 'Friends arrive from the city on the mid-morning boat. Lunch is long.',
      },
      {
        time: '16:40',
        title: 'The slow sail',
        text: 'The house boat goes out when the wind settles. Back by golden hour.',
      },
      {
        time: '19:15',
        title: 'The deck hour',
        text: 'No agenda. The horizon does the entertaining.',
      },
    ],
    services: [
      'Private chef and house staff',
      'Wellness pavilion and treatments',
      'Concierge boat service',
      'Guest suites for the ferry-full crowd',
    ],
  },
  ownership: {
    eyebrow: 'Ownership',
    title: 'Own the hours, not the worries',
    body: 'Every home is freehold. A resident trust manages the reserve — the beach, the grove, the staff, the boats — so your visits begin the moment the ferry docks.',
    plans: [
      {
        name: 'Full Ownership',
        price: 48500000,
        priceNote: 'from',
        lines: ['Freehold title, plot and villa', 'Two full-time house staff', 'Boat and chef on call', 'Rental program when you are away'],
      },
      {
        name: 'Seasonal Quarters',
        price: 19000000,
        priceNote: 'from',
        lines: ['Quarter-share, 90 days a year', 'Fixed calendar, fully managed', 'Suite-styled residences', 'Swap weeks with other reserves'],
      },
    ],
    contact: {
      email: `visit@${kela.domain}`,
      phone: '+91 98200 11223',
      instagram: `@${kela.instagram}`,
      address: `${kela.name}, Nagaon Coast, Alibaug, Maharashtra 402204`,
    },
  },
  footer: {
    line: `${kela.name} — second homes on the Alibaug coast.`,
    colophon: '18 homes · One private beach · The horizon, daily.',
  },
};
