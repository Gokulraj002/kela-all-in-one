import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'Urban boutique hotel',
    city: 'Bengaluru',
  },
  nav: [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Rooftop', href: '#dining' },
    { label: 'Neighborhood', href: '#experiences' },
    { label: 'Work', href: '#work' },
    { label: 'Practical', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Boutique hotel — Bengaluru',
    title: 'The city, on your terms.',
    sub: '72 design-led rooms, a rooftop that runs past midnight, and Church Street at your door.',
    cta: 'Check availability',
    ctaHref: '#booking',
    stats: [
      { value: '72', label: 'Rooms' },
      { value: '18th', label: 'Floor rooftop' },
      { value: '2 PM', label: 'Check-in' },
    ],
  },
  booking: {
    eyebrow: 'Reserve',
    title: 'Book direct. Skip the queue.',
    note: 'Best-rate promise when you book here — no middlemen, no markup.',
  },
  rooms: {
    eyebrow: 'Stay',
    title: 'Six rooms. Zero filler.',
    intro:
      'Every room faces the city or the sky. Concrete, brass and blackout blinds — sharp by design, quiet by engineering.',
    items: [
      {
        name: 'Grid Room',
        price: 8500,
        size: '320 sq ft · Queen',
        desc: 'Our entry shot of the city. Raw concrete, brass light, a bed that means business.',
        imgKey: 'product-0',
        crop: 'a',
        tag: 'Most booked',
      },
      {
        name: 'Signal Room',
        price: 9800,
        size: '360 sq ft · Queen',
        desc: 'A corner of calm above the noise. Deep desk, 1 Gbps line, fast everything.',
        imgKey: 'product-0',
        crop: 'b',
      },
      {
        name: 'Concrete Loft',
        price: 11200,
        size: '480 sq ft · King',
        desc: 'Double-height volume with the skyline framed like a poster.',
        imgKey: 'product-0',
        crop: 'c',
      },
      {
        name: 'Corner Studio',
        price: 12900,
        size: '520 sq ft · King',
        desc: 'Two walls of glass. The city works the night shift — you do not have to.',
        imgKey: 'product-0',
        crop: 'd',
      },
      {
        name: 'Brass Suite',
        price: 16500,
        size: '780 sq ft · King + lounge',
        desc: 'Separated lounge, freestanding tub, and the best light in the building.',
        imgKey: 'product-0',
        crop: 'e',
      },
      {
        name: 'Rooftop Penthouse',
        price: 24000,
        size: '1,200 sq ft · Private terrace',
        desc: 'A private terrace over the rooftops. Sunrise is optional; the view is not.',
        imgKey: 'hero',
        crop: 'a',
        tag: 'Top floor',
      },
    ],
  },
  rooftop: {
    eyebrow: 'Drink',
    title: 'The rooftop runs past midnight.',
    intro:
      'Floor 18. Concrete, canvas shade sails, and a short list of drinks we take personally. Non-residents welcome till the queue says otherwise.',
    hours: 'Tue–Sun · 5 PM – 1 AM',
    drinks: [
      { name: 'Signal Old Fashioned', price: 950, note: 'Smoked orange, single barrel' },
      { name: 'Concrete Negroni', price: 1050, note: 'Barrel-rested, bitter finish' },
      { name: 'Blue Hour Spritz', price: 850, note: 'Built for the 6 PM light' },
      { name: 'Grid Espresso Martini', price: 950, note: 'Third-wave shot, sharp pour' },
    ],
  },
  neighborhood: {
    eyebrow: 'Explore',
    title: 'The block, curated.',
    intro: 'Our front desk keeps this list honest. If a place slips, it leaves the list.',
    tabs: [
      {
        id: 'coffee',
        label: 'Coffee',
        spots: [
          { name: 'Third Wave Coffee', note: 'Roastery flagship', walk: '2-min walk' },
          { name: 'Blue Tokai', note: 'Slow bar, single origins', walk: '5-min walk' },
          { name: 'Dyu Art Cafe', note: 'Courtyard, all-day breakfast', walk: '8-min walk' },
        ],
      },
      {
        id: 'eats',
        label: 'Eats',
        spots: [
          { name: "Koshy's", note: 'Bengaluru institution since 1940', walk: '4-min walk' },
          { name: 'Toit', note: 'Brewpub, loud in a good way', walk: '6-min walk' },
          { name: 'The Fatty Bao', note: 'Asian bao bar', walk: '5-min walk' },
        ],
      },
      {
        id: 'culture',
        label: 'Culture',
        spots: [
          { name: 'Cubbon Park', note: 'Morning run territory', walk: '10-min walk' },
          { name: 'NGMA Bengaluru', note: 'Modern art, quiet halls', walk: '12-min walk' },
          { name: 'Rangoli Metro Art Center', note: 'Street-level exhibitions', walk: '7-min walk' },
        ],
      },
      {
        id: 'late',
        label: 'Late',
        spots: [
          { name: 'Our rooftop', note: 'Last pour at 12:30 AM', walk: 'Lift to 18' },
          { name: "Skydeck by Sherlock's", note: 'Open-air, skyline view', walk: '9-min walk' },
          { name: 'Pecos', note: 'Old-school pub, zero pretense', walk: '6-min walk' },
        ],
      },
    ],
  },
  work: {
    eyebrow: 'Work',
    title: 'Built for the working trip.',
    intro:
      'Every room is a desk-first room. When you need more, the building gives you three gears.',
    spaces: [
      {
        name: 'The Day Desk',
        spec: '40 seats · 1 Gbps fibre',
        price: 600,
        unit: '/ day',
        desc: 'Lobby coworking with real chairs, real plugs and coffee that arrives fast.',
      },
      {
        name: 'The Boardroom',
        spec: '12 seats · 4K screen',
        price: 18000,
        unit: '/ day',
        desc: 'Glass box, acoustic walls, whiteboard paint and a host who runs the AV.',
      },
      {
        name: 'The Library',
        spec: '6 seats · Members quiet',
        price: 0,
        unit: 'Guests only',
        desc: 'Low light, long tables, no calls. The building’s quietest square footage.',
      },
    ],
  },
  visit: {
    eyebrow: 'Practical',
    title: 'The fine print, up front.',
    facts: [
      { label: 'Check-in', value: '2 PM · early on request' },
      { label: 'Check-out', value: '12 PM · late till 2 PM' },
      { label: 'Address', value: '14 Church Street, Bengaluru 560001' },
      { label: 'Airport', value: '45 min by cab, traffic permitting' },
      { label: 'Metro', value: 'MG Road station · 5-min walk' },
      { label: 'Parking', value: 'Valet · 60 bays, EV chargers' },
    ],
    email: `stay@${kela.domain}`,
    phone: '+91 80 4920 7700',
    instagram: `@${kela.instagram}`,
  },
  footer: {
    line: `© 2026 ${kela.name}, Bengaluru. All rights reserved.`,
    colophon: 'Design 03 — Urban · ATELIER demo template',
  },
};
