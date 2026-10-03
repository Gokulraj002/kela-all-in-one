/* Kela Hotels — all editable copy, rates, and contact details.
   JSON-compatible: no functions. Prices are INR per night. */

import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'A palace, not a hotel',
    monogram: 'KH',
  },

  nav: [
    { label: 'Legend', href: '#legend' },
    { label: 'Suites', href: '#suites' },
    { label: 'Dining', href: '#dining' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Weddings', href: '#weddings' },
  ],

  hero: {
    eyebrow: 'Udaipur · Rajasthan · Est. 1894',
    title: 'A palace, not a hotel',
    sub: 'Forty-two suites behind carved sandstone walls, a fountain court that has run for a hundred and thirty years, and evenings that arrive on brass trays.',
    cta: 'Check availability',
    ctaHref: '#booking',
  },

  booking: {
    title: 'Reserve your stay',
    note: 'Best rate guaranteed when you book direct. Suites include breakfast in the Durbar Hall.',
  },

  legend: {
    eyebrow: 'The legend',
    title: 'Three centuries of ceremony',
    beats: [
      {
        year: '1894',
        title: 'A winter residence rises',
        text: 'Maharana Fateh Singh commissions a winter palace on the lake road — forty artisans, eleven years of carving, one courtyard fountain that has never stopped running.',
      },
      {
        year: '1968',
        title: 'Doors open to guests',
        text: 'The family opens the residence to travellers. The durbar hall becomes a dining room; the zenana courtyard becomes the spa. Nothing is redecorated — only re-lit.',
      },
      {
        year: 'Today',
        title: 'A living palace',
        text: 'Forty-two suites and chambers, three restaurants, and a staff of ninety — many of them third-generation. The lamp-lighting at dusk is still done by hand, door by door.',
      },
    ],
  },

  suites: {
    eyebrow: 'The suites',
    title: 'Sleep like royalty',
    hint: 'Scroll — the curtains part for each suite',
    rooms: [
      {
        name: 'The Maharaja Suite',
        price: 85000,
        size: '1,450 sq ft',
        wing: 'Palace Wing · Private terrace',
        desc: 'Four-poster bed under a mirrored canopy, a marble hammam, and a terrace that faces the sunset over the old city.',
        imgKey: 'product-0',
        alt: 'Royal palace suite bedroom with carved four-poster bed, warm lamplight, arched windows',
      },
      {
        name: 'The Durbar Suite',
        price: 62000,
        size: '1,050 sq ft',
        wing: 'Durbar Wing · Candlelit salon',
        desc: 'A sitting room lined with fresco panels, deep stone bathtub in veined marble, and brasswork that catches every flame.',
        imgKey: 'product-1',
        alt: 'Luxurious marble bathroom with polished brass fixtures, stone tub, warm lantern glow',
      },
      {
        name: 'The Jharokha Suite',
        price: 48000,
        size: '820 sq ft',
        wing: 'East Wing · Carved bay window',
        desc: 'Wake inside the famous bay window — carved lattice, a daybed in the arch, and morning light that arrives patterned.',
        imgKey: 'product-2',
        alt: 'Candlelit durbar hall dining room, long tables set with brass, mirrored pillars',
      },
      {
        name: 'The Courtyard Chamber',
        price: 32000,
        size: '560 sq ft',
        wing: 'Garden Wing · Courtyard access',
        desc: 'Steps from the fountain court, with a carved stone jharokha and the sound of water through the night.',
        imgKey: 'product-3',
        alt: 'Carved sandstone jharokha arch with sunlight streaming through latticework',
      },
    ],
  },

  dining: {
    eyebrow: 'Dining',
    title: 'Three rooms, one kitchen of fire',
    restaurants: [
      {
        name: 'The Durbar Hall',
        cuisine: 'Royal Rajasthani',
        time: '7:00 – 11:00 pm',
        note: 'Chef Bhanwar Singh’s laal maas is cooked over the same wood fire his grandfather tended. Thalis arrive on beaten brass.',
      },
      {
        name: 'Zaiqa',
        cuisine: 'Modern Indian',
        time: '12:30 – 3:30 pm · 7:00 – 10:30 pm',
        note: 'Palace recipes re-composed — smoked dahi kebab, saffron risotto with morels, a dessert trolley of mithai reimagined.',
      },
      {
        name: 'The Terrace Bar',
        cuisine: 'Sundowners & small plates',
        time: '5:00 pm – midnight',
        note: 'Forty feet above the courtyard. Old-monks and filter-kaapi cocktails, kachoris at dusk, the city lighting up below.',
      },
    ],
    cta: 'Reserve a table',
  },

  experiences: {
    eyebrow: 'Experiences',
    title: 'Royal rituals, on request',
    items: [
      {
        name: 'Dinner under the desert stars',
        text: 'A private table on the ramparts, forty candles, a folk musician at a respectful distance, and a menu written that morning.',
      },
      {
        name: 'Arrival in the 1952 Buick',
        text: 'The palace’s restored Buick Super collects you from the airport — whitewall tyres, a brass horn, and absolutely no hurry.',
      },
      {
        name: 'Rose & hammam ritual',
        text: 'Ninety minutes in the marble hammam: rose-petal steam, a full-body ubtan polish, and jasmine tea served on the cooling slab.',
      },
    ],
  },

  weddings: {
    eyebrow: 'Weddings & events',
    title: 'Marry like the maharanas did',
    text: 'The fountain court seats four hundred for dinner under string lights. Baraats arrive through the elephant gate; pheras happen at dawn on the terrace. Our wedding atelier plans twelve celebrations a year — never more.',
    cta: 'Begin the conversation',
    stat: '12 celebrations a year · 400 guests in the court',
  },

  testimonials: {
    eyebrow: 'Guest book',
    title: 'What the court remembers',
    quotes: [
      {
        text: 'The lamp-lighting at dusk made my daughter gasp. Staff appear exactly when needed and never otherwise. We have stayed in palaces across Rajasthan — this is the one we return to.',
        name: 'Meera Krishnan',
        detail: 'Chennai · stayed 6 nights',
      },
      {
        text: 'Our wedding in the fountain court was the single most beautiful evening of our lives. The team handled four hundred guests like it was a family dinner.',
        name: 'Aarav & Diya Mehta',
        detail: 'Mumbai · married here, March 2026',
      },
      {
        text: 'I came for two nights and stayed for nine. The Jharokha Suite’s window seat, the Buick, the laal maas — every detail feels considered, never staged.',
        name: 'Jonathan Pierce',
        detail: 'London · stayed 9 nights',
      },
    ],
  },

  visit: {
    eyebrow: 'Practical',
    title: 'Finding the palace',
    address: '14 Lake Pichola Road, Chand Pole, Udaipur, Rajasthan 313001',
    phone: '+91 294 252 1894',
    email: `stay@${kela.domain}`,
    checkin: '2:00 pm',
    checkout: '11:00 am',
    directions: 'Twenty-five minutes from Maharana Pratap Airport. The 1952 Buick collects guests on request; taxis reach the elephant gate in all seasons.',
  },

  footer: {
    line: `© 2026 ${kela.name}, Udaipur. All rights reserved.`,
    colophon: 'A member of the Heritage Grand collection.',
  },
};
