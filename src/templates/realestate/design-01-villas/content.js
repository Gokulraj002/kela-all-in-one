import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: { name: kela.name, tagline: 'Private villas · Alibaug' },
  nav: [
    { label: 'Residences', href: '#residences' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Alibaug', href: '#location' },
  ],
  hero: {
    eyebrow: 'Alibaug — by private appointment',
    title: 'Some addresses are kept quiet.',
    sub: 'Eleven private villas on Alibaug\u2019s quietest coastline. Shown after dusk, by appointment — never by advertisement.',
    cta: 'Request a private viewing',
    ctaHref: '#contact',
    hint: 'Scroll — the descent begins',
  },
  descent: {
    eyebrow: 'The descent',
    title: 'Come down to the water.',
    intro:
      'Three altitudes. Three residences. Scroll, and the estate opens below you — from the tree line to the stone at the pool\u2019s edge.',
    stops: [
      {
        altitude: '300',
        imgKey: 'hero',
        alt: 'Aerial-wide view of a modern glass villa at dusk, glowing against a deep teal sky, pool still in the foreground',
      },
      {
        altitude: '120',
        imgKey: 'product-0',
        alt: 'Three-quarter view of a villa courtyard at dusk, warm interior light and landscaped paths',
      },
      {
        altitude: '12',
        imgKey: 'detail',
        alt: 'Close-up of stone cladding meeting still pool water at dusk, champagne reflections',
      },
    ],
  },
  residences: [
    {
      name: 'Villa Meridian',
      price: 145000000,
      beds: 5,
      baths: 7,
      area: '9,800 sq.ft.',
      plot: '1.1 acre wooded plot',
      imgKey: 'product-0',
      blurb:
        'The signature residence. A glass pavilion wrapped in stone, its living wall folding open to a courtyard that holds the evening light.',
      alt: 'Villa exterior in three-quarter view at dusk, warm interior light, landscaped courtyard',
    },
    {
      name: 'The Glass Pavilion',
      price: 117500000,
      beds: 4,
      baths: 6,
      area: '7,200 sq.ft.',
      plot: '0.8 acre garden plot',
      imgKey: 'product-1',
      blurb:
        'A double-height living room in glass, built around the sunset. The garden comes inside; the day never quite leaves.',
      alt: 'Double-height living room at dusk, glass wall to the garden, champagne-toned light',
    },
    {
      name: 'Casa Duna',
      price: 182500000,
      beds: 6,
      baths: 8,
      area: '11,400 sq.ft.',
      plot: '1.6 acre dune plot',
      imgKey: 'product-2',
      blurb:
        'The largest residence — a master suite that wakes to the water. Oak, linen, lamplight; the sea keeps its own hours beyond the glass.',
      alt: 'Master suite at dusk, bed facing a glass wall, soft warm lamps',
    },
  ],
  philosophy: {
    eyebrow: 'The philosophy',
    title: 'Built for the blue hour.',
    body: [
      `Every ${kela.name} residence is designed backwards from dusk — the hour the house is truly lived in. Glass is placed where the last light lands. Stone is chosen for how it holds warmth after the sun goes. Water is set where it can double the sky.`,
      'We build eleven villas, not eighty. One architect, one landscape studio, one lighting designer — the same hands from the first sketch to the final lamp. Nothing here is value-engineered after the brochure is printed.',
    ],
    principles: [
      { title: 'Light first', text: 'Orientation, glazing and landscape lighting are drawn before a single wall.' },
      { title: 'Stone and water', text: 'Quarried stone, still water, teak — materials that age into the coastline.' },
      { title: 'Engineered silence', text: 'Acoustic glazing and set-back siting. The loudest sound is the pool filter.' },
      { title: 'One of eleven', text: `A fixed, finished collection. When the eleventh villa is sold, ${kela.name} is complete.` },
    ],
    imageAlt: 'Close-up of stone cladding and still pool water at dusk, champagne reflections',
    caption: 'Stone and still water — the materials of the estate',
  },
  location: {
    eyebrow: 'The setting',
    title: 'Twenty minutes from the mainland. A world apart.',
    body: [
      `Alibaug\u2019s southern coast keeps its own pace — fishing villages, casuarina groves, and beaches that empty by evening. ${kela.name} sits on the quietest stretch, reached by sea or by the coastal road.`,
      'Owners arrive the way the coast prefers: by water, as the light goes.',
    ],
    distances: [
      { place: 'Mandwa jetty', time: '15 min by car' },
      { place: 'Gateway of India', time: '20 min by private boat' },
      { place: 'Awas beach', time: '5 min by car' },
      { place: 'Alibaug town', time: '12 min by car' },
    ],
    note: 'Dusk viewings depart from the Mandwa jetty. We will arrange the crossing.',
  },
  contact: {
    eyebrow: 'Private viewings',
    title: 'The list is short. The evening is long.',
    body: `Viewings are held Thursday to Sunday, at dusk — when the houses make their case. Tell us when you can come; a member of the ${kela.name} family will write back within a day.`,
    email: `viewings@${kela.domain}`,
    phone: '+91 98200 45678',
    instagram: `@${kela.instagram}`,
    hours: 'Viewings: Thu – Sun, 5:30 PM onwards',
  },
  footer: {
    line: `${kela.name} — eleven private villas, Alibaug.`,
    colophon: 'Shown after dusk, by appointment. Never by advertisement.',
  },
};
