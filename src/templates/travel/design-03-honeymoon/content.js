import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: { name: kela.name, descriptor: 'Honeymoon atelier' },

  nav: [
    { label: 'Escapes', href: '#escapes' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Love Notes', href: '#notes' },
    { label: 'Plan', href: '#contact' },
  ],

  hero: {
    eyebrow: 'Honeymoon specialists · est. 2016',
    title: 'The honeymoon, taken slowly.',
    sub: `${kela.name} plans unhurried escapes for two — lantern-lit decks, private plunge pools, breakfasts that drift toward noon. Everything arranged before you arrive; the only decision left is when to look up.`,
    cta: 'Plan our escape',
    ctaHref: '#contact',
    secondary: 'See the escapes',
    secondaryHref: '#escapes',
  },

  escapes: {
    eyebrow: 'Three escapes, nothing else',
    title: 'Slow dissolve duets',
    intro:
      'Scroll gently. Each escape opens through the next like an iris — no jumps, no hurry. Three places we know the way the light falls at six in the evening.',
    items: [
      {
        name: 'The Sandbank Letters',
        place: 'Maldives',
        price: 485000,
        blurb:
          'A sandbank that exists only at low tide, and an overwater villa the rest of the time. Dhoni sunsets, dinner with just your footprints in the sand, and a lagoon that holds the sky after dark.',
        duration: '7 nights',
        tag: 'Barefoot & private',
      },
      {
        name: 'Blue Hour, Ours Alone',
        place: 'Santorini',
        price: 392000,
        blurb:
          'A cave suite carved into the caldera, a plunge pool that mirrors the dusk, and nobody else’s schedule to keep. Sunrise from the terrace; slow dinners in Imerovigli when you’re ready.',
        duration: '6 nights',
        tag: 'Cliffside calm',
      },
      {
        name: 'The Mist Edit',
        place: 'Bali',
        price: 265000,
        blurb:
          'Frangipani on still water, an infinity edge dissolving into jungle, mist that burns off by ten. A temple blessing at dawn, the pool by noon, and nothing at all in between.',
        duration: '8 nights',
        tag: 'Jungle stillness',
      },
    ],
  },

  story: {
    eyebrow: 'Our philosophy',
    title: 'Slowness is a discipline.',
    body: [
      'Most honeymoons fail the way most itineraries fail: three islands, four flights, and a couple who needed a nap more than a boat ride. We plan the opposite.',
      'One place. Long mornings. A concierge who knows your names by the second day and a schedule with more white space than plans. You have the rest of your lives to be busy — this week is not that.',
    ],
    rules: [
      { k: 'One island per trip', v: 'Always. Depth over distance.' },
      { k: 'Breakfast until noon', v: 'No apologies, no checkout rush.' },
      { k: 'No group tours', v: 'Ever. It is the two of you.' },
      { k: 'A concierge on message', v: 'Day and night, the whole trip.' },
    ],
    quote: {
      text: 'Arrive tired. Leave unrecognizable to yourselves.',
      by: `The ${kela.name} house rule`,
    },
  },

  notes: {
    eyebrow: 'Love notes',
    title: 'Written after, not before.',
    items: [
      {
        text: 'We didn’t check the time once in eight days. I didn’t know that was still possible.',
        by: 'Anaya & Rehan',
        trip: 'Maldives, March',
      },
      {
        text: 'They remembered I don’t like cut flowers but love frangipani. That was day one.',
        by: 'Sofia & Arjun',
        trip: 'Bali, June',
      },
      {
        text: 'Our planner moved our whole trip by a day when a storm shifted. We found out at breakfast — already rebooked, already calm.',
        by: 'Meera & Kabir',
        trip: 'Santorini, September',
      },
    ],
  },

  contact: {
    eyebrow: 'Begin',
    title: 'Tell us about the two of you.',
    body: 'Write a few lines — where you’ve dreamed of, when you can leave, what a perfect slow morning looks like. A planner replies within a day, and the first conversation is always unhurried.',
    email: `hello@${kela.domain}`,
    phone: '+91 98450 22110',
    studio: '44, 3rd Cross, Koramangala, Bengaluru',
    hours: 'Mon–Sat, 10:00–18:00 IST',
    extrasTitle: 'Quiet add-ons',
    extras: [
      'Vow renewals at blue hour',
      'Private chef dinners, wherever you are',
      'Seaplane arrivals over the atoll',
      'A photographer who disappears',
    ],
    cta: 'Write to us',
  },

  footer: {
    line: `${kela.name} — honeymoons, taken slowly.`,
    colophon: 'Set in Italiana & Montserrat. Printed on recycled pixels.',
  },
};
