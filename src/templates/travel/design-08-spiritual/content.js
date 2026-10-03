import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Pilgrimage journeys',
  },
  nav: [
    { label: 'Yatras', href: '#destinations' },
    { label: 'The Practice', href: '#story' },
    { label: 'Temple Stays', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Pilgrimage journeys across sacred India',
    title: 'Come back to stillness.',
    sub: 'Slow journeys to the ghats, monasteries and temple towns of India. Small groups, silent mornings, and all the time in the world.',
    cta: 'Begin the journey',
    ctaHref: '#destinations',
    whisper: 'Nine journeys a year. Never more than twelve pilgrims.',
  },
  yatras: {
    eyebrow: 'Yatras',
    title: 'Five journeys, one circle.',
    lede: 'There is no itinerary to conquer here. Each yatra moves at the pace of prayer — one sacred place, entered slowly, left reluctantly.',
    hint: 'Scroll gently — the wheel turns with you',
    captionEyebrow: 'Now turning into view',
    journeys: [
      {
        name: 'Varanasi — The River of Returning',
        tag: 'The Ganges',
        duration: '7 days',
        price: 48000,
        blurb:
          'Dawn boats on the river, evening aarti on the ghats, and long unhurried afternoons in the old city\u2019s lanes. We stay within earshot of the temple bells.',
      },
      {
        name: 'The Himalayan Monastery',
        tag: 'Ladakh',
        duration: '10 days',
        price: 72000,
        blurb:
          'A cliffside gompa above the clouds. Morning prayers with the monks, butter tea at sunrise, and a silence so complete you can hear the prayer flags.',
      },
      {
        name: 'Bodh Gaya — The Seat of Awakening',
        tag: 'Mahabodhi',
        duration: '5 days',
        price: 36000,
        blurb:
          'Sit beneath the descendant of the Bodhi tree at first light. The whole town moves at the pace of walking meditation, and so will you.',
      },
      {
        name: 'The Southern Temples',
        tag: 'Tamil Nadu',
        duration: '8 days',
        price: 58000,
        blurb:
          'Madurai\u2019s thousand-pillared halls, dusk lamps in ancient courtyards, and temple towns where the evening still belongs to the gods.',
      },
      {
        name: 'Ayodhya — City of Lamps',
        tag: 'Diwali season',
        duration: '6 days',
        price: 44000,
        blurb:
          'When the riverfront is lit with a million diyas, we walk the ghats slowly and simply watch. Some things need no commentary.',
      },
    ],
  },
  practice: {
    eyebrow: 'The practice',
    title: 'How we travel',
    body: [
      `A ${kela.name} yatra is not a tour. It is a practice with a suitcase. We rise before the town does, keep silence until the sun is up, and visit one sacred place a day — never two.`,
      'There are no queues to beat and no sights to tick off. Our guides are scholars and seekers, not announcers. If you need to hurry, this is not your journey.',
    ],
    pillars: [
      {
        title: 'Silence',
        text: 'Mornings are held in silence until breakfast. Phones sleep in a cloth bag from dusk. You will be amazed how loud the world was.',
      },
      {
        title: 'Mornings',
        text: 'We begin at 4:30 with tea, then walk, boat or sit as the sacred places wake. The best hour of every holy town belongs to those who rise for it.',
      },
      {
        title: 'Contemplation',
        text: 'Each evening ends with lamps, a short reading, and stillness together. No performances, no speeches — just the day settling.',
      },
    ],
    rhythm: [
      { time: '4:30', text: 'Wake. Tea in silence.' },
      { time: '5:30', text: 'Dawn sitting, boat, or walk.' },
      { time: '7:00', text: 'Breakfast — the first words of the day.' },
      { time: 'Days', text: 'One place, entered deeply.' },
      { time: 'Dusk', text: 'Lamps, chanting, rest.' },
    ],
    imageCaption: 'A single diya beside marigolds, before dawn aarti.',
  },
  stays: {
    eyebrow: 'Temple stays',
    title: 'Sleep near the sacred.',
    body: 'We stay in simple, beautiful places within walking distance of the temples — so the town\u2019s rhythm becomes yours. No resorts, no lobbies, no buffets at midnight.',
    places: [
      {
        name: 'Riverside Haveli',
        where: 'Varanasi',
        text: 'A 200-year-old merchant house on the ghats. Wake to bells; sleep to the river.',
        rate: 6500,
        rateNote: 'per night, twin share',
      },
      {
        name: 'Monastery Guesthouse',
        where: 'Ladakh',
        text: 'Plain rooms inside the gompa walls. Butter lamps in the corridor, stars through the window.',
        rate: 4800,
        rateNote: 'per night, twin share',
      },
      {
        name: 'Temple-town Ashram',
        where: 'Bodh Gaya',
        text: 'Courtyard rooms around a bodhi sapling. Meals eaten together, in quiet.',
        rate: 3900,
        rateNote: 'per night, twin share',
      },
    ],
  },
  contact: {
    eyebrow: 'Begin',
    title: 'Write to us.',
    body: 'Tell us which journey is calling, and when. We reply within two days — slowly, and personally.',
    email: `namaste@${kela.domain}`,
    phone: '+91 98200 12345',
    note: 'Nine journeys a year. The next circle opens soon.',
  },
  footer: {
    line: `${kela.name} — pilgrimage journeys across sacred India.`,
    colophon: 'Travel slowly. Leave only footprints, take only stillness.',
  },
};
