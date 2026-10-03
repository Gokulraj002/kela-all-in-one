/* Kela Estates (brand from _shared/brand.js) — design-06-coliving · content.js
   All copy is real, written for a co-living house in Koramangala, Bengaluru.
   Prices are plain numbers in ₹/month, rendered through price() in JSX. */

import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Live like you\u2019re part of something.',
  },

  nav: [
    { label: 'Houses', href: '#houses' },
    { label: 'Rituals', href: '#rituals' },
    { label: 'Members', href: '#members' },
    { label: 'Pricing', href: '#pricing' },
  ],

  hero: {
    eyebrow: 'Co-living in Koramangala, Bengaluru',
    title: 'A house full of people, not just rooms.',
    sub: 'Private rooms, long shared tables, hammocks in the courtyard, and forty-odd housemates who will actually learn your name.',
    cta: 'Book a tour',
    ctaHref: '#pricing',
    ctaSecondary: 'Meet the members',
    ctaSecondaryHref: '#members',
    sticker: 'New wing just opened',
    note: 'Move-in ready rooms from next Monday. Bring a suitcase, leave the rest to us.',
  },

  scatter: {
    label: 'The scatter board',
    setA: {
      title: 'The houses',
      kicker: 'Scroll — the pile scatters, then settles',
      hint: 'Keep scrolling',
    },
    setB: {
      title: 'House life',
      kicker: 'The messy-good part',
      hint: 'Every house has these',
    },
    houses: [
      {
        name: 'The Courtyard House',
        price: 18500,
        unit: '/month',
        photoAlt: 'Sunlit private bedroom with cream linen, terracotta throw pillows and a potted plant by the window',
        caption: 'Your own room, your own door',
        note: '4th Block · 12 private rooms around a shared courtyard',
      },
      {
        name: 'The Kitchen House',
        price: 16500,
        unit: '/month',
        photoAlt: 'Housemates cooking together in a sunlit shared kitchen, seen as soft backlit silhouettes',
        caption: 'A kitchen that cooks together',
        note: '80 Feet Road · double kitchen, long dining table for 16',
      },
      {
        name: 'The Terrace House',
        price: 19500,
        unit: '/month',
        photoAlt: 'Rooftop lounge at golden hour with low cushions, planters and string lights',
        caption: 'A terrace that owns the sunset',
        note: '5th Block · rooftop lounge, hammock deck, city views',
      },
    ],
    moments: [
      {
        photoAlt: 'Close-up of a shared wooden table with coffee cups, a small plant and a notebook in morning light',
        caption: 'Sunday long-table breakfast',
        note: 'Everyone brings one dish. Nobody remembers whose.',
      },
      {
        photoAlt: 'Sunlit communal courtyard with hammocks, long tables and string lights overhead',
        caption: 'Hammock diplomacy hour',
        note: 'The good hammocks are claimed by 9 am. Plan accordingly.',
      },
      {
        photoAlt: 'Rooftop lounge glowing at golden hour with cushions and planters',
        caption: 'Terrace movie nights',
        note: 'Fridays. Projector, popcorn, democratic voting.',
      },
    ],
  },

  rituals: {
    eyebrow: 'House rituals',
    title: 'The calendar everyone actually follows.',
    body: `A ${kela.name} house runs on small, stubborn traditions. They\u2019re not mandatory \u2014 they\u2019re just impossible to skip once you\u2019ve been to one.`,
    items: [
      {
        day: 'Mon',
        name: 'House dinner',
        text: 'One long table, one shared pot. Cooking rota rotates; eating is compulsory-adjacent.',
      },
      {
        day: 'Wed',
        name: 'Co-work mornings',
        text: 'The courtyard becomes the quietest caf\u00e9 in Koramangala. Deep work till lunch, then chaos.',
      },
      {
        day: 'Fri',
        name: 'Terrace cinema',
        text: 'A projector, a whitewashed wall, and film picks voted on the house noticeboard.',
      },
      {
        day: 'Sun',
        name: 'Long-table breakfast',
        text: 'Slow morning, endless filter coffee, and the weekly house meeting nobody dreads.',
      },
    ],
    photoAlt: 'Close-up of the shared dining table with coffee cups, plants and a notebook in morning light',
  },

  members: {
    eyebrow: 'Member stories',
    title: 'People who moved in for a month and stayed for years.',
    stories: [
      {
        name: 'Aishwarya',
        role: 'Product designer · Courtyard House',
        quote:
          'I came for the room and stayed for the breakfast table. My best friend, my co-founder, and my Sunday dosa critic all live on the same floor.',
      },
      {
        name: 'Rohan',
        role: 'Ex-chef, now PM · Kitchen House',
        quote:
          'I cook Monday house dinner for forty people. It\u2019s the best restaurant I\u2019ve ever run, and the diners never leave bad reviews.',
      },
      {
        name: 'Meera',
        role: 'Grad student · Terrace House',
        quote:
          'Exam season was survivable because the terrace was silent after ten and the courtyard had company whenever I needed it.',
      },
    ],
  },

  pricing: {
    eyebrow: 'Transparent pricing',
    title: 'One number. Everything in.',
    body: 'No brokerage, no hidden charges, no lock-in beyond thirty days. Every plan includes Wi-Fi, housekeeping, utilities, and all the house rituals.',
    plans: [
      {
        name: 'Twin Share',
        price: 12000,
        unit: '/month',
        tag: 'Best for first-timers',
        features: [
          'Bed in a bright twin room',
          'Shared courtyard + kitchen access',
          'All utilities + 100 Mbps Wi-Fi',
          'Weekly housekeeping',
        ],
      },
      {
        name: 'Private Room',
        price: 18500,
        unit: '/month',
        tag: 'Most loved',
        features: [
          'Your own room, your own door',
          'Work desk + reading corner',
          'All utilities + 100 Mbps Wi-Fi',
          'Twice-weekly housekeeping',
          'Priority terrace hammock rights',
        ],
      },
      {
        name: 'Studio Nook',
        price: 26000,
        unit: '/month',
        tag: 'For the settled',
        features: [
          'Self-contained studio nook',
          'Kitchenette + ensuite',
          'All utilities + 100 Mbps Wi-Fi',
          'Daily housekeeping',
          'Two guest passes a month',
        ],
      },
    ],
    fineprint: 'Refundable deposit of one month\u2019s rent. Notice period: 30 days, always.',
  },

  visit: {
    eyebrow: 'Come see it',
    title: 'Tours every evening at six.',
    body: 'Walk the courtyard, meet whoever\u2019s around the long table, and decide if the vibe fits. No sales pitch \u2014 the house does the talking.',
    address: '14, 4th Block, Koramangala, Bengaluru 560034',
    email: `hello@${kela.domain}`,
    phone: '+91 80 4719 2200',
    instagram: `@${kela.instagram}`,
  },

  footer: {
    line: `${kela.name} \u2014 co-living in Koramangala, Bengaluru.`,
    colophon: 'Rooms from \u20b912,000/month \u00b7 No brokerage \u00b7 30-day notice, always.',
  },
};
