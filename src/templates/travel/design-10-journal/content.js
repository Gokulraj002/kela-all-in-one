import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A cinematic travel journal, shot on film.',
  },
  nav: [
    { href: '#destinations', label: 'Expeditions' },
    { href: '#craft', label: 'Process' },
    { href: '#story', label: 'Photographer' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'ROLL 03 — THE THAR DESERT',
    title: 'The journal is the journey.',
    sub: `${kela.name} is a travel journal kept the slow way — one frame at a time, from the Thar dunes to the high valleys of Spiti. Five expeditions. Twenty-four frames. No shortcuts.`,
    cta: 'Advance the strip',
    ctaHref: '#destinations',
    secondary: 'Meet the photographer',
    secondaryHref: '#story',
    annotations: {
      tl: 'CAM 01 — M6 / 35MM',
      tr: 'FRAME 0001 → 0024',
      bl: 'STOCK: 500T · PUSHED +1',
      br: 'SCROLL TO ADVANCE',
    },
  },
  expeditions: {
    eyebrow: 'The film strip',
    title: 'Five expeditions, one roll.',
    intro:
      'Scroll down to advance the strip. Scroll up to rewind. Every frame is a real departure — small groups, film cameras welcome, notebooks mandatory.',
    chapters: ['CH. I — SAND', 'CH. II — ALTITUDE', 'CH. III — THE DARKROOM'],
    items: [
      {
        name: 'Wind Script — Thar Dunes',
        short: 'THAR',
        tag: 'Desert',
        duration: '5 days',
        price: 54500,
        frame: '004',
        exif: '05:47 · f/8 · 1/250',
        chapter: 0,
        blurb:
          'Five dawns on the Sam dunes. We walk the ridge before the wind wakes, shoot the crests as they sharpen, and let the afternoon erase our footprints. Nights are for the journal.',
      },
      {
        name: 'The Golden Fort — Jaisalmer',
        short: 'JAISALMER',
        tag: 'Heritage',
        duration: '6 days',
        price: 68500,
        frame: '009',
        exif: '18:12 · f/5.6 · 1/125',
        chapter: 0,
        blurb:
          'A living fort under monsoon light. We shoot the ramparts as storm cloud breaks over the old city, eat where the guides eat, and annotate every frame before dinner.',
      },
      {
        name: 'The Cold Desert — Spiti',
        short: 'SPITI',
        tag: 'Mountain',
        duration: '8 days',
        price: 72400,
        frame: '014',
        exif: '04:12 · f/8 · 1/60',
        chapter: 1,
        blurb:
          'Altitude, silence, and a monastery older than most countries. The road is the subject; the camera is just along for the ride. Acclimatisation days are shooting days.',
      },
      {
        name: 'Tea in the Mist — Munnar',
        short: 'MUNNAR',
        tag: 'Plantation',
        duration: '5 days',
        price: 59800,
        frame: '019',
        exif: '06:03 · f/4 · 1/250',
        chapter: 1,
        blurb:
          'Dawn fog over terraced green. We walk with the pickers, shoot the layers as the light burns through, and learn why mist is a photographer\u2019s oldest friend.',
      },
      {
        name: 'The Darkroom Session',
        short: 'JAIPUR',
        tag: 'Workshop',
        duration: '3 days',
        price: 32800,
        frame: '024',
        exif: '12:00 · f/2.8 · 1/60',
        chapter: 2,
        blurb:
          'Bring your exposed rolls; leave with prints. Three days in our Jaipur darkroom — develop, contact-sheet, and print your keepers under the amber safelight.',
      },
    ],
  },
  craft: {
    eyebrow: 'How the journal is made',
    title: 'Four steps, zero shortcuts.',
    intro:
      'Every expedition ends the same way: in the darkroom, with wet prints on the line and the field notes spread out to dry.',
    steps: [
      {
        n: '01',
        title: 'Shoot it on film',
        text: 'Every expedition carries two film bodies and a strict 36-frame limit per location. Scarcity is the editor.',
      },
      {
        n: '02',
        title: 'Develop by hand',
        text: 'Negatives are developed in small batches in our Jaipur darkroom. No presets, no filters — just chemistry and patience.',
      },
      {
        n: '03',
        title: 'Annotate everything',
        text: 'Each keeper frame gets a mono-spaced field note: the time, the aperture, and what the wind was doing.',
      },
      {
        n: '04',
        title: 'Bind the roll',
        text: 'The journal is printed on cotton paper and bound by hand. Yours to keep; the negatives stay with us.',
      },
    ],
  },
  story: {
    eyebrow: 'The photographer',
    title: 'Arjun Mehta shoots slowly.',
    body: [
      `Arjun spent eleven years as a press photographer before he walked away from the wire and bought a one-way ticket to Jaisalmer with two film cameras and a notebook. ${kela.name} is what came back.`,
      'He leads every expedition himself, develops every roll by hand, and still believes the best editing happens before you press the shutter — in the waiting, the watching, and the writing down.',
    ],
    stats: [
      { value: '214', label: 'Rolls shot' },
      { value: '18,400', label: 'Km on foot' },
      { value: '1,204', label: 'Frames kept' },
      { value: '36', label: 'Frames per location' },
    ],
    quote: {
      text: 'Digital remembers everything. Film remembers what mattered.',
      by: `Arjun Mehta — Founder, ${kela.name}`,
    },
  },
  contact: {
    eyebrow: 'Commissions',
    title: 'Bring a camera. Leave with a journal.',
    body: 'Private expeditions, editorial assignments, and darkroom workshops. Tell us where you are going — we will bring the film.',
    email: `hello@${kela.domain}`,
    phone: '+91 98290 11223',
    address: '14 Kundan Marg, Jaipur 302001',
    hours: 'Replies within 48 hours, usually from a tent.',
    cta: 'Start a commission',
  },
  footer: {
    line: `© 2026 ${kela.name}. Shot on film, built for the web.`,
    colophon: 'Set in Fraunces & Space Mono. No pixels were hurried.',
  },
};
