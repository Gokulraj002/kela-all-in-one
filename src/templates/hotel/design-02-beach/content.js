import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'A beach retreat, kept quiet' },
  nav: [
    { label: 'The Retreat', href: '#story' },
    { label: 'The Tide', href: '#gallery' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Slow Days', href: '#experiences' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'The Konkan coast — where the road runs out',
    title: 'The tide keeps its own time.',
    sub: 'Nine rooms on a pale stretch of sand. No schedule, no speakers, no hurry — just dawn, the sea, and whatever the day brings.',
    cta: 'Check availability',
    ctaHref: '#booking',
  },
  seasons: [
    {
      id: 'clear',
      name: 'The clear season',
      note: 'Now — the clear season. Pale mornings, calm sea.',
    },
    {
      id: 'warm',
      name: 'The warm months',
      note: 'Now — the warm months. Slow afternoons, warm water.',
    },
    {
      id: 'monsoon',
      name: 'The monsoon',
      note: 'Now — the monsoon. We rest while the sea resets.',
    },
  ],
  tide: {
    eyebrow: 'The tide, in four washes',
    title: 'Watch the water come in.',
    hint: 'Keep scrolling — slowly',
    slides: [
      {
        key: 'hero',
        alt: 'Empty beach at dawn, pale light on wet sand',
        caption: 'First light. The beach belongs to no one yet.',
      },
      {
        key: 'detail',
        alt: 'Footprints in wet sand as the tide recedes',
        caption: 'The tide keeps a diary in the sand.',
      },
      {
        key: 'product-2',
        alt: 'A traditional thali lunch served on a low table by the sea',
        caption: 'Lunch arrives where the water meets the table.',
      },
      {
        key: 'product-0',
        alt: 'Whitewashed room with a linen-dressed bed in soft morning light',
        caption: 'Linen, limewash, and unhurried mornings.',
      },
    ],
  },
  story: {
    eyebrow: 'The retreat',
    title: 'A philosophy of slowness',
    body: [
      `${kela.name} is nine rooms on a quiet stretch of the Konkan coast. There is no lobby music, no activity desk, no itinerary pressed into your hand at check-in.`,
      'Days here are shaped by the tide chart pinned by the kitchen door. You eat when the fishers return. You walk when the sand is cool. You sleep when the sea goes quiet.',
      'We keep things deliberately few: one long veranda, one kitchen, one stretch of sand. What remains is space — and time that moves at the speed of water.',
    ],
  },
  rooms: {
    eyebrow: 'Rooms',
    title: 'Three ways to wake up.',
    note: 'All rates include breakfast, taxes, and all the quiet you can hold.',
    items: [
      {
        name: 'The Linen Room',
        price: 8500,
        size: '320 sq ft',
        imgKey: 'product-0',
        alt: 'Whitewashed room with a linen-dressed bed in soft morning light',
        desc: 'Limewashed walls, a linen bed, and a window that frames the morning sea. Garden side; birdsong included.',
      },
      {
        name: 'The Courtyard Room',
        price: 12500,
        size: '450 sq ft',
        imgKey: 'product-1',
        alt: 'Open-air shower in a private planted courtyard',
        desc: 'A private courtyard with an open-air shower among the palms. Afternoon shade, evening jasmine.',
      },
      {
        name: 'The Sea Room',
        price: 16500,
        size: '520 sq ft',
        imgKey: 'product-2',
        alt: 'Thali lunch served on the Sea Room’s deck by the water',
        desc: 'First row to the water, with a deck where lunch is served at noon. You will hear the tide from the bed.',
      },
    ],
  },
  experiences: {
    eyebrow: 'Slow days',
    title: 'Nothing scheduled. Everything possible.',
    items: [
      {
        time: '6:00',
        name: 'Dawn walk with the fishers',
        desc: 'Walk the shoreline as the boats come in. Coffee is waiting when you return.',
      },
      {
        time: '12:30',
        name: 'Thali lunch by the sea',
        desc: 'Whatever the morning boats brought, served on a low table in the shade of the palms.',
      },
      {
        time: '21:00',
        name: 'Stargazing from the dunes',
        desc: 'No lights past the veranda. The Milky Way does the rest.',
      },
    ],
  },
  booking: {
    eyebrow: 'Stay',
    title: 'Check availability',
    note: 'Choose your dates and we will do the arithmetic. We confirm every stay by hand, usually within the day.',
    cta: 'Request to reserve',
    fields: { room: 'Room', checkIn: 'Check-in', checkOut: 'Check-out', guests: 'Guests' },
  },
  visit: {
    eyebrow: 'Practical',
    title: 'Good to know.',
    seasons: [
      {
        name: 'The clear season',
        when: 'October – February',
        desc: 'Pale mornings, calm sea, cool nights. Our favourite months.',
      },
      {
        name: 'The warm months',
        when: 'March – May',
        desc: 'Slow afternoons and warm water. The mangoes arrive in April.',
      },
      {
        name: 'The monsoon',
        when: 'June – September',
        desc: 'We close while the sea resets, and reopen with the first clear sky.',
      },
    ],
    gettingThere: {
      title: 'Getting there',
      body: 'The nearest airport is ninety minutes by the coastal road. Tell us your arrival time and we will have the car — and the coffee — ready.',
    },
    house: [
      { k: 'Check-in', v: '2 pm, or whenever the road lets you' },
      { k: 'Check-out', v: '11 am, slowly' },
      { k: 'Write to us', v: `hello@${kela.domain}` },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 98200 12345',
    instagram: `@${kela.instagram}`,
  },
  footer: {
    line: `© 2026 ${kela.name}. All tides reserved.`,
    colophon: 'Nine rooms · one beach · no hurry',
  },
};
