import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');
const short = kela.name.split(' ')[0];

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'Built for business. Done properly.',
  },
  nav: [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Work', href: '#work' },
    { label: 'Dining', href: '#dining' },
    { label: 'Getting here', href: '#visit' },
  ],
  utility: {
    phone: '+91 80 4920 7700',
    note: 'Check-in 2 PM · Check-out 12 PM · Express check-in under 60 seconds',
  },
  hero: {
    eyebrow: 'Business hotel · City centre',
    title: 'Check in. Get to work.',
    sub: 'A hotel engineered around the working day — fibre Wi-Fi, quiet rooms, meeting space on every floor, and a breakfast that respects your 8 a.m.',
    cta: 'Book now',
    ctaHref: '#booking',
    secondary: { label: 'Meetings', href: '#work' },
    stats: [
      { value: 1, suffix: ' Gbps', label: 'Fibre Wi-Fi in every room' },
      { value: 38, suffix: '', label: 'Meeting rooms and suites' },
      { value: 12, suffix: ' min', label: 'From the international airport' },
      { value: 97, suffix: '%', label: 'Of guests rate the sleep excellent' },
    ],
  },
  booking: {
    eyebrow: 'Express booking',
    title: 'Booked in 30 seconds.',
    sub: 'Dates, guests, rate — no account, no phone calls, no fine print.',
    baseRate: 8500,
    rateNote: 'Best-rate promise · Free cancellation until 6 PM on arrival day',
    detailNote: 'Your key card is printed and waiting — check-in at the express desk takes under a minute.',
    guests: [1, 2, 3, 4],
  },
  rooms: {
    eyebrow: 'The room index',
    title: 'Rooms that work as hard as you do.',
    boardNote: 'Live index — rates per night, taxes included',
    items: [
      {
        code: 'MD·01',
        name: 'Essential Business Room',
        price: 8500,
        size: '320 sq ft',
        meta: 'King bed · Work desk · Rain shower',
        desc: 'Everything a working night needs: a real desk, blackout blinds, and a chair built for long sessions.',
        imgKey: 'product-0',
      },
      {
        code: 'MD·02',
        name: 'Executive Club Room',
        price: 12500,
        size: '420 sq ft',
        meta: 'King bed · Club lounge · Soaking tub',
        desc: 'Upper floors and quieter air, with Club Lounge access for breakfasts that double as meetings.',
        imgKey: 'product-0',
      },
      {
        code: 'MD·03',
        name: `${short} Suite`,
        price: 21000,
        size: '680 sq ft',
        meta: 'Separate study · Lounge · Dining for four',
        desc: 'A study with a door that closes, a desk that fits two laptops, and room for late working sessions.',
        imgKey: 'product-0',
      },
    ],
  },
  work: {
    eyebrow: 'Work & meetings',
    title: 'The building is a business tool.',
    body: 'Fourteen floors of quiet. Meeting rooms on every level, a business centre that never sleeps, and fibre that holds a video call from the lobby to the rooftop.',
    stats: [
      { value: 1, suffix: ' Gbps', label: 'Dedicated fibre in every room' },
      { value: 100, suffix: '%', label: 'Coverage, tested every night' },
      { value: 24, suffix: '/7', label: 'Business centre and printing' },
      { value: 60, suffix: ' sec', label: 'Express check-in, guaranteed' },
    ],
    rooms: [
      { name: 'Boardroom 12', capacity: '12 seats', floor: 'Level 4' },
      { name: `${short} Hall`, capacity: '240 theatre', floor: 'Level 2' },
      { name: 'The Studio', capacity: '40 classroom', floor: 'Level 4' },
      { name: 'Focus Pods', capacity: '1–2 persons', floor: 'Level 6' },
    ],
    cta: { label: 'Enquire for meetings', href: '#visit' },
  },
  dining: {
    eyebrow: 'All-day dining',
    title: 'Breakfast in seven minutes.',
    points: [
      {
        name: 'The Daybreak Counter',
        time: '6:30 – 10:30 AM',
        text: 'A working breakfast: espresso in ninety seconds, a full hot spread, and a grab-and-go counter for the 7:40 flight.',
      },
      {
        name: `${short} All-Day`,
        time: '11 AM – 11 PM',
        text: 'Mains on the table in fifteen minutes. Quiet corners for working lunches, faster service than the office canteen.',
      },
      {
        name: 'In-room express',
        time: '24 hours',
        text: 'Order from your room, at your door in twenty minutes. The menu is built for eating over a keyboard.',
      },
    ],
  },
  visit: {
    eyebrow: 'Getting here',
    title: 'Twelve minutes from touchdown.',
    times: [
      { place: 'International airport', time: '12 min', note: 'Hotel shuttle every 20 min' },
      { place: 'Business district', time: '8 min', note: 'Metro or cab' },
      { place: 'City centre', time: '15 min', note: 'Direct metro line' },
      { place: 'Metro station', time: '4 min', note: 'On foot, covered walkway' },
    ],
    address: `1 ${short} Plaza, Residency Road, Bengaluru 560025`,
    phone: '+91 80 4920 7700',
    email: `stay@${kela.domain}`,
  },
  footer: {
    line: `© 2026 ${kela.name}. Crafted for the working traveller.`,
    colophon: 'ATELIER · Hotel collection 07',
  },
};
