import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'A hotel, shot in the dark' },
  nav: [
    { label: 'Concept', href: '#story' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'The Night', href: '#dining' },
    { label: 'Screenings', href: '#experiences' },
    { label: 'Practical', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Scene 01 — The lobby',
    title: 'Check in after dark.',
    sub: `${kela.name} is a hotel shot like a film — long shadows, low light, and rooms that hold the frame until morning.`,
    cryptic: 'No lobby music. No small talk. The night, on loop.',
    cta: 'Book a night',
    ctaHref: '#contact',
    altCta: 'Read the concept',
    altCtaHref: '#story',
    videoAlt: 'Rain streaking down the dark lobby window, a shaft of light sweeping slowly across, blurred city lights beyond',
  },
  story: {
    eyebrow: 'Scene 02 — The concept',
    title: 'A hotel, treated like a film.',
    body: [
      `Every hotel has rooms. ${kela.name} has scenes. You arrive in the dark, the light arrives slowly, and nothing in the building is in a hurry to be seen.`,
      'Corridors run like dolly tracks. The bar keeps bar hours like a nightclub keeps secrets. Checkout is a hard cut — no lingering wide shots.',
    ],
    manifesto: [
      { n: 'I', text: 'Light arrives slowly. Nothing pops.' },
      { n: 'II', text: 'Every corridor is a dolly track.' },
      { n: 'III', text: 'The bar stays open until the last reel.' },
      { n: 'IV', text: 'Checkout is just a hard cut.' },
    ],
  },
  rooms: {
    eyebrow: 'Scene 03 — The rooms',
    title: 'Sleep in the frame.',
    hint: 'Scroll — the strip advances',
    note: 'All rates per night, taxes included. Two guests, no questions.',
    items: [
      {
        name: 'The Night Suite',
        price: 18000,
        size: '420 sq ft',
        desc: 'One lamp. Black walls. A bed that holds the frame.',
        imgKey: 'product-0',
        shot: 'Reel 01',
        alt: 'Moody hotel bedroom at night lit by a single warm bedside lamp, deep shadows',
      },
      {
        name: 'The Rain Suite',
        price: 22000,
        size: '510 sq ft',
        desc: 'Glass on three sides. The city, out of focus.',
        imgKey: 'product-2',
        shot: 'Reel 02',
        alt: 'Rain streaking down a dark hotel window at night, blurred amber city lights beyond',
      },
      {
        name: 'The Vinyl Suite',
        price: 16000,
        size: '380 sq ft',
        desc: 'A turntable, a chair, and nothing to prove.',
        imgKey: 'product-3',
        shot: 'Reel 03',
        alt: 'Intimate listening corner at night, a vinyl record on a turntable in warm lamplight',
      },
    ],
  },
  night: {
    eyebrow: 'Scene 04 — The night',
    title: 'After 22:00, the reel changes.',
    items: [
      {
        name: 'The Bar',
        hours: '22:00 — 03:00',
        desc: 'Backlit bottles, low stools, and a bartender who has heard every ending.',
        imgKey: 'product-1',
        alt: 'Dark cocktail bar at night, rows of bottles glowing amber on backlit shelves',
      },
      {
        name: 'The Listening Room',
        hours: '20:00 — 01:00',
        desc: 'One turntable, forty records, and a strict no-talking policy after midnight.',
        imgKey: 'detail',
        alt: 'Vinyl record spinning on a turntable in a dark listening room, warm lamp glow',
      },
      {
        name: 'Late Dining',
        hours: '23:00 — 02:00',
        desc: 'A short menu for the hours no other kitchen keeps: broth, toast, black coffee, and one excellent chocolate dessert.',
        textOnly: true,
      },
    ],
  },
  screenings: {
    eyebrow: 'Scene 05 — Screenings',
    title: 'The courtyard screen.',
    body: 'Every Friday at 23:59, one film. No trailers, no interval, no phones — sealed at the door, returned at the credits.',
    events: [
      { name: 'Midnight Screenings', when: 'Fridays, 23:59', desc: 'One film on the courtyard screen. Guests only, thirty seats.' },
      { name: 'The Private Reel', when: 'On request', desc: 'Hire the screening room for twenty-four. You pick the film; we handle the projector.' },
      { name: 'Final Cut Night', when: '31 December', desc: 'One long night across every room. Breakfast is served at 04:00.' },
    ],
  },
  visit: {
    eyebrow: 'Scene 06 — Practical',
    title: 'The fine print, in plain type.',
    lines: [
      { k: 'Address', v: '14 Lantern Row, Fort, Mumbai 400001' },
      { k: 'Check-in', v: '15:00 — the lobby is darkest at dusk' },
      { k: 'Check-out', v: '12:00 — a hard cut' },
      { k: 'Doors', v: 'Lock at 02:00. Knock twice.' },
      { k: 'Front desk', v: 'Answered 24 hours, slowly' },
      { k: 'Phone', v: '+91 22 4890 2210' },
      { k: 'Email', v: `nights@${kela.domain}` },
      { k: 'The lift', v: 'Original, 1962. Also slow.' },
    ],
  },
  contact: {
    eyebrow: 'Scene 07 — The booking',
    title: 'Book a night.',
    body: 'Pick a reel, pick your dates. This is a demonstration booking — no payment is taken.',
    labels: { room: 'Room', checkin: 'Check-in', checkout: 'Check-out', guests: 'Guests', nights: 'Nights', perNight: 'Per night', total: 'Total', reserve: 'Reserve the night', reserved: 'The night is yours.' },
    confirm: 'Consider it held. We will write to confirm before dusk.',
    demo: 'Demo booking — no payment taken',
  },
  footer: {
    line: `© 2026 ${kela.name}. All nights reserved.`,
    colophon: 'Shot on location. Graded in the dark.',
  },
};
