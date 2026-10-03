import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: {
    name: kela.name,
    line: 'A slow-travel island studio',
  },
  nav: [
    { label: 'Escapes', href: '#destinations' },
    { label: 'Slowness', href: '#story' },
    { label: 'Journal', href: '#journal' },
    { label: 'Plan', href: '#contact' },
  ],
  hero: {
    eyebrow: 'A slow-travel island studio',
    title: 'Where the water is clear and the hours are long.',
    sub: 'Small-group island escapes planned around tides, not timetables — four to six days of barefoot luxury on the quietest atolls we know.',
    cta: 'See the escapes',
    ctaHref: '#destinations',
    note: 'Now booking · November to March',
    videoAlt:
      'Aerial drift over a crescent sandbar, turquoise shallows on both sides, gentle waves washing the bar\u2019s edge',
  },
  escapes: {
    eyebrow: 'Escapes',
    title: 'Four islands, no rush.',
    lede: 'Each escape is a single island, a single beach house, and a few days shaped around the tide tables. Nothing is hurried; everything is included.',
    hint: 'Scroll — the islands drift past',
    items: [
      {
        name: 'The Sandbar Atoll',
        price: 48000,
        duration: '5 days',
        tag: 'Signature',
        blurb:
          'A crescent of bleached sand that appears and disappears with the tide. Days are measured in swims, not hours; the sandbar picnic arrives by skiff at noon.',
      },
      {
        name: 'Leaning Palm Beach',
        price: 36500,
        duration: '4 days',
        tag: 'Slow mornings',
        blurb:
          'One palm, one hammock, one beach with no other footprints by nine. Mornings are for coffee on the stilts deck; afternoons belong to the lagoon.',
      },
      {
        name: 'Coralglass Lagoon',
        price: 54000,
        duration: '6 days',
        tag: 'Barefoot',
        blurb:
          'Water so clear the boat looks suspended in air. Snorkel the house reef at slack tide, then do absolutely nothing on the sand for the rest of the day.',
      },
      {
        name: 'Hammock Point',
        price: 29000,
        duration: '3 days',
        tag: 'Drift',
        blurb:
          'A three-day reset on stilts above the shallows. Sleep over the water, wake to it, and let the tide set the only schedule that matters.',
      },
    ],
  },
  story: {
    eyebrow: 'Philosophy',
    title: 'In praise of slowness.',
    body: [
      'Most itineraries are lists. Ours are rhythms. We plan around the two daily high tides, the hour the lagoon goes glassy, and the short dusk when the water turns to silver.',
      'You will not visit five islands in five days. You will learn one beach the way you learn a person — slowly, in the morning light, then again at noon.',
    ],
    imageAlt: 'Sunlight refracting through turquoise shallows over rippled white sand',
    tenets: [
      {
        title: 'No alarms',
        text: 'The tide is the only schedule. Breakfast arrives when you do.',
      },
      {
        title: 'One island per escape',
        text: 'Depth over distance. We stay until the beach knows our names.',
      },
      {
        title: 'Barefoot luxury',
        text: 'Thread-count matters more than star-count. So does the reef at your doorstep.',
      },
    ],
  },
  journal: {
    eyebrow: 'Field notes',
    title: 'Notes from the shallows.',
    notes: [
      {
        date: 'February',
        title: 'The lagoon goes glassy at 6:40',
        text: 'For eleven minutes the water holds the sky so perfectly you cannot tell where you end. Nobody photographs it. Everyone remembers it.',
      },
      {
        date: 'January',
        title: 'What the sandbar taught us',
        text: 'It is only there for four hours a day. Scarcity makes it precious — we have started applying that logic to everything, including lunch.',
      },
      {
        date: 'March',
        title: 'A defence of doing nothing',
        text: 'Day three is when it happens: the shoulders drop, the book stays closed, and the hammock becomes the whole itinerary. We count that as a successful escape.',
      },
    ],
  },
  plan: {
    eyebrow: 'Plan',
    title: 'Begin with a conversation.',
    body: 'Tell us when you can disappear for a few days, and whether you prefer your water glassy or your sandbar at noon. We reply within a day — usually from a beach.',
    cta: 'Write to us',
    email: `hello@${kela.domain}`,
    phone: '+91 98200 11223',
    address: 'Fort Kochi, Kerala',
    hours: 'Replies within a day, tides permitting',
  },
  footer: {
    line: `${kela.name} — a slow-travel island studio.`,
    colophon: 'Photographed at slack tide · Planned around the moon',
  },
};
