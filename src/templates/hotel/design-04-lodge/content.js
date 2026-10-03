import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'A timber lodge in the high Himalayas — warm by design',
  },
  nav: [
    { label: 'Rooms', href: '#rooms' },
    { label: 'Mountain Days', href: '#days' },
    { label: 'Kitchen', href: '#kitchen' },
    { label: 'Getting There', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Mountain lodge · 2,350 m · Est. 1998',
    title: 'Come in from the cold.',
    sub: 'A timber lodge of warm rooms, slow mornings, and a fire that is never allowed to go out — tucked into a deodar forest above the valley.',
    cta: 'Check availability',
    ctaHref: '#booking',
    note: 'Tonight at the lodge: clear skies, −4°C, and mulled apple cider on the veranda.',
  },
  booking: {
    eyebrow: 'Plan your stay',
    title: 'The fire is lit. Pick your dates.',
    roomsLabel: 'Stay in',
    guestsLabel: 'Guests',
    checkinLabel: 'Check-in',
    checkoutLabel: 'Check-out',
    nightsLabel: 'nights',
    perNight: 'per night',
    total: 'Estimated total',
    cta: 'Check availability',
    confirmed: 'Good news — your dates look open. We will hold the room while you pack your woollens.',
    seasonalNote: 'Rates move with the mountain: winter is peak, summer is gentler.',
  },
  seasons: {
    winter: {
      label: 'Winter',
      months: 'Dec – Mar',
      headline: 'Snow on the roof, fire in the hearth.',
      body: [
        'The lodge earns its name in winter. Snow settles on the deodars, the stone fireplace in the lounge runs all day, and every room gets a hot-water bottle tucked between the sheets at turndown.',
        'Days are for skiing the gentle slopes above the village and coming back to soup, bread, and the longest evening of your year.',
      ],
      notes: ['Ski slopes 20 min away', 'Bonfire every evening', 'Hot-water bottles at turndown'],
      multiplier: 1.2,
      rateNote: 'Winter peak rates apply',
    },
    summer: {
      label: 'Summer',
      months: 'Apr – Nov',
      headline: 'Cool pines, long golden evenings.',
      body: [
        'When the plains swelter, the retreat sits at a breezy 22°C. The trails open up — rhododendron walks in April, high meadows by June — and dinner moves out to the veranda under a sky full of stars.',
        'Mornings start with birdsong and end, if you like, with a guided trek to the sunrise ridge.',
      ],
      notes: ['22°C afternoons', 'Guided treks daily', 'Veranda dinners under stars'],
      multiplier: 1.0,
      rateNote: 'Summer gentle rates apply',
    },
  },
  rooms: [
    {
      name: 'Deodar Suite',
      price: 14500,
      size: '520 sq ft',
      sleeps: 'Sleeps 2',
      desc: 'Timber walls, a king bed under hand-loomed wool blankets, and a window seat made for watching snowfall.',
      imgKey: 'product-0',
      alt: 'Timber lodge bedroom with wool blankets and warm bedside lamplight, frosted window looking onto snowy pines',
    },
    {
      name: 'The Hearth Room',
      price: 18900,
      size: '680 sq ft',
      sleeps: 'Sleeps 3',
      desc: 'Our signature stay — a private stone fireplace, deep leather chairs, and a soaking tub facing the peaks.',
      imgKey: 'product-1',
      alt: 'Stone fireplace lounge with glowing flames, leather armchairs and wool rug on timber floor',
    },
    {
      name: 'Sunrise Trail Cabin',
      price: 11500,
      size: '410 sq ft',
      sleeps: 'Sleeps 2',
      desc: 'A detached cedar cabin at the trailhead. Wake to first light on the ridge, straight from your pillow.',
      imgKey: 'product-2',
      alt: 'Snow-dusted mountain trail winding through pines toward glowing Himalayan peaks at sunrise',
    },
  ],
  days: {
    eyebrow: 'Mountain days',
    title: 'Fill your days the slow way.',
    items: [
      {
        title: 'Guided treks',
        text: 'From rhododendron walks to the sunrise ridge — our naturalists know every switchback. Packed lunches from the kitchen, always.',
        imgKey: 'product-2',
        alt: 'Snow-dusted trek trail at sunrise through dark pines toward glowing peaks',
      },
      {
        title: 'Skiing & snow play',
        text: 'Gentle beginner slopes twenty minutes up the road in winter, with instructors, gear, and hot soup waiting back at the lodge.',
        imgKey: 'hero',
        alt: 'Timber lodge glowing warm against snowy peaks at dusk, snow falling softly',
      },
      {
        title: 'Bonfire evenings',
        text: 'Every evening, weather permitting: a bonfire on the terrace, roasted corn, stories, and a sky that shows off.',
        imgKey: 'detail',
        alt: 'Hands wrapped around a steaming hot drink, firelight glowing warm in the background',
      },
    ],
  },
  kitchen: {
    eyebrow: 'Mountain kitchen',
    title: 'Hearty food for cold air.',
    body: [
      'The kitchen runs on one belief: nobody should ever be cold and hungry at the same time. Slow-cooked dals, fresh tandoor bread, mountain trout when the rivers allow, and desserts that taste like childhood.',
      'Breakfast is served until late — trekkers leave at dawn, sleepers drift in at ten, and both are equally welcome.',
    ],
    notes: ['Tandoor & slow-cooked mountain fare', 'Breakfast until late', 'Packed trek lunches on request'],
    imgKey: 'detail',
    alt: 'Hands wrapped around a steaming cup of hot chocolate, warm firelight in the background',
  },
  visit: {
    eyebrow: 'Getting there',
    title: 'The journey is part of it.',
    body: 'We are a 6-hour drive from Chandigarh and 11 hours from Delhi, up a winding forest road that rewards you at every turn. The nearest airport is Chandigarh; we arrange pickups on request.',
    address: `${kela.name}, Pine Forest Road, Near Sunrise Ridge, Himachal Pradesh`,
    phone: '+91 98160 00000',
    email: `stay@${kela.domain}`,
    checkin: 'Check-in 1 pm · Check-out 11 am',
    steps: [
      { label: 'Fly', text: 'Land at Chandigarh (IXC) — 6 hrs by road' },
      { label: 'Drive', text: '11 hrs from Delhi via Shimla road' },
      { label: 'Arrive', text: 'We meet you at the forest gate with hot chai' },
    ],
  },
  footer: {
    line: `© 2026 ${kela.name}. Warm rooms, cold air, good fire.`,
    colophon: 'A mountain lodge in the high Himalayas · Crafted with timber & patience',
  },
};
