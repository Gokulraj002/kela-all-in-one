import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: { name: kela.name, est: 'MMXIV' },

  nav: [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Philosophy', href: '#craft' },
    { label: 'Guest Words', href: '#story' },
  ],

  hero: {
    eyebrow: 'A private travel atelier — by referral',
    title: 'The world, quietly arranged.',
    sub: 'Private charters, after-hours museums, and villas that never appear on booking sites — designed one journey at a time.',
    cta: 'Begin an itinerary',
    ctaHref: '#destinations',
    note: 'Forty journeys a year. Never forty-one.',
  },

  itinerary: {
    eyebrow: 'The Grand Itinerary',
    title: 'Four ways in.',
    body: 'Scroll — the route draws itself, and each destination docks as the line arrives.',
    footNote: 'Every itinerary begins with a conversation. Nothing here is a package.',
    footCta: 'Enquire about a journey',
  },

  destinations: [
    {
      name: 'Amalfi, After Hours',
      price: 1480000,
      duration: '9 days',
      tag: 'By invitation',
      blurb:
        'A cliffside villa above Positano, held eleven nights a year. Your chef arrives by boat; the coast road empties after nine.',
    },
    {
      name: 'Kyoto in Maple Season',
      price: 1120000,
      duration: '7 days',
      tag: 'Autumn',
      blurb:
        'A machiya in Gion with a private garden. Tea with a fourteenth-generation master; temples after the gates close.',
    },
    {
      name: 'The Alpine Hour',
      price: 1640000,
      duration: '8 days',
      tag: 'Winter',
      blurb:
        'A chalet above Zermatt with the Matterhorn as wallpaper. Heli-ski at first light, the spa entirely to yourselves.',
    },
    {
      name: 'The Limestone Coast',
      price: 2250000,
      duration: '10 days',
      tag: 'Private charter',
      blurb:
        'Ten days aboard a 42-metre yacht along the Dalmatian coast. Anchorages chosen the morning you wake in them.',
    },
  ],

  craft: {
    eyebrow: 'The philosophy',
    title: 'Travel, arranged like a private collection.',
    body: [
      `${kela.name} was founded on a simple refusal: we do not sell trips. We compose journeys for people who have seen everything, and arrange for them to see it differently — privately, precisely, and without an audience.`,
      'Each journey is designed by one person, your travel designer, who stays with you from the first call to the flight home. They know how you take your coffee at 30,000 feet, which museums you walk quickly through, and when a day should simply be left empty.',
    ],
    pillars: [
      {
        title: 'Private charters',
        text: 'Aircraft, yachts, and rail cars held under your name alone. The timetable bends around you — never the reverse.',
      },
      {
        title: 'After-hours access',
        text: 'Museums after closing, temples before dawn, vineyards when the harvest is in. The quietest hours, reserved.',
      },
      {
        title: 'A dedicated designer',
        text: 'One person designs your journey and answers your calls. No hand-offs, no account managers, no queues.',
      },
    ],
  },

  story: {
    eyebrow: 'Guest words',
    title: 'Said quietly, afterwards.',
    quotes: [
      {
        text: 'They opened the Uffizi at seven in the morning. Just us, and the Botticellis.',
        name: 'Meera & Arjun Rao',
        route: 'Florence, after hours',
      },
      {
        text: 'Our villa was not listed anywhere. That is rather the point.',
        name: 'Aditya Menon',
        route: 'Amalfi, nine nights',
      },
      {
        text: 'The ryokan garden, empty, at dawn. I still think about it most mornings.',
        name: 'Kavya Nair',
        route: 'Kyoto, maple season',
      },
    ],
  },

  contact: {
    eyebrow: 'Enquire',
    title: 'Begin with a conversation.',
    body: 'Tell us when, and roughly where your mind is. A designer replies within one day — personally, never from a queue.',
    email: `studio@${kela.domain}`,
    phone: '+91 98450 12345',
    fields: {
      name: 'Your name',
      email: 'Email',
      when: 'When are you thinking?',
      where: 'Where is your mind?',
      send: 'Request a consultation',
    },
  },

  footer: {
    line: `${kela.name} — a private travel atelier.`,
    colophon: 'By referral · Forty journeys a year · Est. MMXIV',
  },
};
