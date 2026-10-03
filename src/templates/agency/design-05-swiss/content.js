import { KELA, brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

/* Kela Studio (agency) — design-05-swiss content.
   Plain object, JSON-compatible. Edit copy here; layout stays in index.jsx. */
export const content = {
  brand: {
    name: kela.name,
    mark: `${KELA.name}®`,
    city: 'Zürich',
    tagline: 'Studio for graphic design',
  },
  nav: [
    { n: '01', label: 'Work', href: '#work' },
    { n: '02', label: 'Studio', href: '#studio' },
    { n: '03', label: 'Journal', href: '#journal' },
    { n: '04', label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: `${kela.name} — Zürich. Est. 2011.`,
    title: 'Design, practised with restraint.',
    meta: [
      ['Practice', 'Graphic design'],
      ['Staff', '12'],
      ['Office', 'Geroldstrasse 31, Zürich'],
    ],
  },
  work: {
    eyebrow: '01 — Selected work',
    title: 'Index',
    note: 'Eight projects. Client, year, discipline.',
    projects: [
      { n: '01', client: 'Haus der Architektur', year: '2025', discipline: 'Identity system', img: 'work-1',
        alt: 'Open editorial spread on a white table with a strict Swiss grid, black and white photographs and hairline rules' },
      { n: '02', client: 'Verlag Meridian', year: '2024', discipline: 'Editorial design', img: 'work-2',
        alt: 'A gallery wall of five framed minimal posters with abstract black geometric compositions' },
      { n: '03', client: 'Stadtgalerie Nord', year: '2024', discipline: 'Exhibition graphics', img: 'work-3',
        alt: 'Tall black information panels mounted along a white wall in an empty museum hall' },
      { n: '04', client: 'Atelier Brunner', year: '2023', discipline: 'Wayfinding', img: 'detail',
        alt: 'Stack of white paper sheets with printed crop marks and a metal ruler, close-up' },
      { n: '05', client: 'Papierfabrik AG', year: '2023', discipline: 'Packaging', img: 'work-1',
        alt: 'Open editorial spread on a white table with a strict Swiss grid, black and white photographs and hairline rules' },
      { n: '06', client: 'Kunstverein Ost', year: '2022', discipline: 'Identity system', img: 'work-2',
        alt: 'A gallery wall of five framed minimal posters with abstract black geometric compositions' },
      { n: '07', client: 'Edition Klartext', year: '2022', discipline: 'Editorial design', img: 'work-3',
        alt: 'Tall black information panels mounted along a white wall in an empty museum hall' },
      { n: '08', client: 'Büro für Raum', year: '2021', discipline: 'Wayfinding', img: 'detail',
        alt: 'Stack of white paper sheets with printed crop marks and a metal ruler, close-up' },
    ],
  },
  capabilities: {
    eyebrow: '02 — Capabilities',
    title: 'What we do',
    columns: [
      {
        label: 'A — Design',
        items: [
          'Identity systems',
          'Editorial design',
          'Wayfinding',
          'Exhibition graphics',
          'Packaging',
        ],
      },
      {
        label: 'B — Production',
        items: [
          'Art direction',
          'Type design',
          'Print production',
          'Digital design',
          'Motion identity',
        ],
      },
    ],
    note: 'No strategy decks. No brand purpose statements. The work, delivered.',
  },
  studio: {
    eyebrow: '03 — Studio',
    title: 'Facts',
    facts: [
      ['Founded', '2011'],
      ['Staff', '12 designers'],
      ['Address', 'Geroldstrasse 31, 8005 Zürich'],
      ['Practice', 'Graphic design, print, digital'],
      ['Clients', 'Cultural institutions, architects, publishers'],
      ['Working language', 'German, English'],
    ],
  },
  journal: {
    eyebrow: '04 — Journal',
    title: 'Notes',
    notes: [
      {
        n: '01',
        date: '2026-09-14',
        title: 'On margins',
        text: 'A margin is a decision. We set ours at 24 mm and do not move them.',
      },
      {
        n: '02',
        date: '2026-07-02',
        title: 'On the second colour',
        text: 'One accent colour is enough. Ours is used for numbers and nothing else.',
      },
      {
        n: '03',
        date: '2026-04-21',
        title: 'On finishing',
        text: 'A project is finished when there is nothing left to remove.',
      },
    ],
  },
  contact: {
    eyebrow: '05 — Contact',
    title: 'Write to us',
    email: `studio@${kela.domain}`,
    phone: '+41 44 555 01 10',
    address: ['Geroldstrasse 31', '8005 Zürich', 'Switzerland'],
    hours: [
      ['Mon–Fri', '09:00–18:00'],
      ['Sat–Sun', 'Closed'],
    ],
    note: 'New projects: include scope and timeline. We reply within five working days.',
  },
  footer: {
    line: `${kela.name} — Geroldstrasse 31, 8005 Zürich`,
    colophon: ['Set in IBM Plex Sans & IBM Plex Mono', `© 2026 ${kela.name}`, 'Printed on the grid'],
  },
};
