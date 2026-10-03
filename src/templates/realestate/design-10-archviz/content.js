import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: { name: kela.name, short: 'KE' },
  nav: [
    { href: '#projects', label: 'Projects' },
    { href: '#process', label: 'Process' },
    { href: '#studio', label: 'Studio' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Archviz studio — Bengaluru',
    title: 'Form follows light',
    sub: `${kela.name} designs and visualises concrete architecture — villas, galleries and workspaces rendered as sculpture before a single slab is poured.`,
    cta: 'Enter the orbit',
    ctaHref: '#projects',
    scroll: 'Scroll to rotate',
    side: 'Concrete light study — N 12.97°, E 77.59°',
  },
  marquee: ['Form', 'Light', 'Mass', 'Shadow', 'Concrete', 'Void'],
  projects: {
    eyebrow: 'Selected works',
    title: 'The orbit',
    hint: 'Scroll — the ring turns',
    note: 'Conceptual visualisations. All figures in',
    items: [
      {
        name: 'Villa Meridian',
        location: 'Devanahalli, Bengaluru',
        area: '12,400 sq ft',
        price: 86000000,
        status: 'Built 2025',
        desc: 'A single folded concrete plane wraps five bedrooms around a sunken court. Shadow is the second facade.',
      },
      {
        name: 'The Light Slot House',
        location: 'Whitefield, Bengaluru',
        area: '7,800 sq ft',
        price: 52000000,
        status: 'Under construction',
        desc: 'One diagonal cut of daylight organises the entire section — rooms tuned to the hour, not the view.',
      },
      {
        name: 'Massing Study 07',
        location: 'Conceptual commission',
        area: '21,000 sq ft',
        price: 149000000,
        status: 'In visualisation',
        desc: 'A cluster of cast volumes tuned like instruments against the sky. The model came before the brief.',
      },
    ],
  },
  process: {
    eyebrow: 'Method',
    title: 'Cast, not decorated',
    intro:
      `Five moves, no shortcuts. Every ${kela.name} project passes through the same sequence — from sun-path survey to the first monsoon.`,
    steps: [
      {
        title: 'Read the site',
        text: 'Sun path, wind, soil and slope. We spend two weeks on the ground before a single line is drawn.',
      },
      {
        title: 'Mass the void',
        text: 'Clay and card models first — dozens of them. The building is whatever remains after the light is let in.',
      },
      {
        title: 'Choreograph light',
        text: 'Every slot, slit and oculus is simulated across a full year of sun before it is cast in concrete.',
      },
      {
        title: 'Pour the truth',
        text: 'Board-formed, bush-hammered or raw — the finish is chosen once and honoured on every surface.',
      },
      {
        title: 'Hand over the keys',
        text: 'We stay through the first monsoon. A building is only finished when the weather has signed it.',
      },
    ],
    imageCaption: `Board-formed concrete, raking light — the ${kela.name} finish standard.`,
  },
  studio: {
    eyebrow: 'The studio',
    title: 'Twelve people. One material.',
    body: [
      `${kela.name} was founded in Bengaluru in 2014 by two architects who were tired of renders that lied. We build physical models, pour test panels, and photograph real light before we promise a client anything on screen.`,
      'The result is a practice that treats visualisation as a structural discipline: every shadow in our films has been earned by a model, a mock-up, or a building standing in the weather.',
    ],
    stats: [
      { value: '2014', label: 'Founded in Bengaluru' },
      { value: '64', label: 'Structures visualised' },
      { value: '11', label: 'Built and standing' },
    ],
    principals: [
      { name: 'Arjun Mehta', role: 'Founding partner — massing' },
      { name: 'Sara Thomas', role: 'Founding partner — light' },
      { name: 'Kabir Rao', role: 'Head of visualisation' },
    ],
    giant: kela.name.split(' ')[0].toUpperCase(),
  },
  contact: {
    eyebrow: 'Commission',
    title: 'Bring us the impossible site.',
    text: 'Slopes, odd orientations, impossible light — that is where we do our best work. Write with the site plan and we will answer within two working days.',
    email: `hello@${kela.domain}`,
    instagram: `@${kela.instagram}`,
    phone: '+91 80 4115 2210',
    address: '14, 4th Cross, Indiranagar, Bengaluru 560038',
    hours: 'Mon–Fri, 10:00–18:00 IST',
    cta: 'Start a commission',
  },
  footer: {
    line: `${kela.name} — architecture as art, visualised honestly.`,
    colophon: `All projects shown are conceptual visualisations. © 2026 ${kela.name}, Bengaluru.`,
  },
};
