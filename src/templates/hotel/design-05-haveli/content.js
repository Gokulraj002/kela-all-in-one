import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'A frescoed haveli, kept like a family heirloom',
  },
  nav: [
    { label: 'Story', href: '#story' },
    { label: 'Rooms', href: '#rooms' },
    { label: 'Frescoes', href: '#fresco' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Mandawa · Shekhawati · Rajasthan',
    title: `${kela.name}`,
    sub: 'A 200-year-old merchant haveli turned twelve-suite heritage hotel — every wall a painting, every courtyard a morning raga.',
    cta: 'Reserve your stay',
    ctaHref: '#booking',
    secondary: 'Read our story',
    secondaryHref: '#story',
    videoAlt:
      `Morning light raking across the frescoed courtyard of ${kela.name}, drifting through a carved jharokha as dust motes float in the light`,
  },
  booking: {
    title: 'Plan your stay',
    note: 'Direct bookings get our best rate — breakfast, the evening folk performance, and a discount on the heritage walk are all included.',
    confirm:
      'Request received. We hold every reservation for 48 hours and confirm personally by email within a day.',
  },
  story: {
    eyebrow: 'Since 1824',
    title: 'Two hundred years, four beats',
    intro:
      'Every haveli in Shekhawati is a family diary written in plaster and pigment. Ours begins with a cotton trader, pauses for half a century, and reopens — room by room — as the house you can sleep in tonight.',
    beats: [
      {
        year: '1824',
        title: 'The merchant builds',
        text: 'Seth Raghunath Das, a cotton trader returned from Calcutta, raises a courtyard house for his joint family on Mandawa\u2019s main bazaar road — five generations under one carved roof.',
      },
      {
        year: '1911',
        title: 'The frescoes bloom',
        text: 'Chitera painters from the Jaipur guild cover the walls in mineral pigment: peacocks and parrots, Krishna leelas — and steam trains, gramophones, and motor cars, the marvels the family had seen on their travels.',
      },
      {
        year: '1963',
        title: 'The quiet decades',
        text: 'Trade moves to the cities. The family leaves for Jaipur and Bombay; the house dozes — shutters closed, frescoes fading gently under the desert sun, watched over by a single caretaker.',
      },
      {
        year: '2019',
        title: 'The house reopens',
        text: `The great-grandchildren return. Three years of restoration — lime plaster, natural pigment, reclaimed teak — and ${kela.name} opens its twelve suites to guests.`,
      },
    ],
  },
  rooms: [
    {
      name: 'The Marwari Suite',
      price: 18500,
      size: '620 sq ft',
      imgKey: 'product-0',
      alt: 'The Marwari Suite — carved four-poster teak bed, brass lamps, and frescoed wall panels in warm morning light',
      desc: 'The family\u2019s own winter quarters: a four-poster teak bed, a private jharokha over the main courtyard, and a copper soaking tub behind a carved screen.',
      perks: ['Private courtyard jharokha', 'Four-poster teak bed', 'Copper soaking tub'],
    },
    {
      name: 'The Peacock Fresco Room',
      price: 14200,
      size: '480 sq ft',
      imgKey: 'product-1',
      alt: 'Close-up of the 1911 peacock fresco above the bedhead in the Peacock Fresco Room — ochre, marigold, and terracotta pigments',
      desc: 'You sleep inside the painting here — the 1911 peacock frescoes rise right over the bedhead, restored petal by petal over nine months.',
      perks: ['Original 1911 frescoes', 'Hand-loomed cotton bedding', 'Courtyard sit-out'],
    },
    {
      name: 'The Jharokha Suite',
      price: 15800,
      size: '540 sq ft',
      imgKey: 'product-2',
      alt: 'The carved sandstone jharokha arch of the Jharokha Suite — lattice screens throwing patterned morning light on frescoed walls',
      desc: 'A corner suite with two arched windows onto the bazaar road — watch Mandawa wake up with chai, the way the sethanis did.',
      perks: ['Dual bazaar-view jharokhas', 'Daybed in the window bay', 'Sheesham writing desk'],
    },
  ],
  pan: {
    eyebrow: 'The house, through a window',
    title: 'Look through the jharokha',
    hint: 'Scroll — the courtyard unfolds behind the arch',
    panels: [
      {
        imgKey: 'hero',
        cap: 'The main courtyard — morning light on two-hundred-year-old plaster',
        alt: `Frescoed main courtyard of ${kela.name} in morning light, arched colonnade and carved balconies`,
      },
      {
        imgKey: 'product-2',
        cap: 'The carved jharokha — where the zenana watched the courtyard, unseen',
        alt: 'Carved sandstone jharokha arch with lattice screens, patterned sunlight on frescoed walls',
      },
      {
        imgKey: 'product-1',
        cap: 'Frescoes in mineral pigment — peacocks, trains, and gods',
        alt: 'Close-up of Shekhawati frescoes — painted peacocks and floral motifs in ochre and marigold',
      },
      {
        imgKey: 'product-0',
        cap: 'The Marwari Suite — teak, brass, and hand-loomed cotton',
        alt: 'Heritage suite interior with antique wooden furniture and frescoed wall panels',
      },
      {
        imgKey: 'detail',
        cap: 'Folk music at dusk — the courtyard becomes a baithak',
        alt: 'Folk musicians performing in the haveli courtyard at dusk, seen from behind at a distance',
      },
    ],
  },
  fresco: {
    eyebrow: 'The painted walls',
    title: 'An open-air gallery you sleep inside',
    body: [
      'Shekhawati is called the world\u2019s largest open-air art gallery, and this house is one of its finest rooms. Our walls were painted between 1824 and 1911 by chitera guilds working in lime plaster and mineral pigment — ochre from the desert, indigo from the traders\u2019 ships, lamp-black from the kitchen fires.',
      'Look closely and the frescoes are a diary: alongside gods and peacocks you will find steam engines, gramophones, and gentlemen in top hats — everything the merchant family saw on the road between Calcutta and Bombay, painted home.',
    ],
    imgAlt:
      'Close-up of a Shekhawati fresco — painted peacocks and floral motifs in ochre, marigold, and terracotta on aged plaster',
    motifs: [
      {
        title: 'Peacocks & parrots',
        text: 'The monsoon birds, painted for luck above every bridal-chamber door.',
      },
      {
        title: 'Steam trains & gramophones',
        text: 'The family\u2019s travels immortalised — modernity arriving by rail and record.',
      },
      {
        title: 'Krishna leelas',
        text: 'The divine cowherd\u2019s play, in panels that run the full height of the stairwell.',
      },
    ],
    stats: [
      { value: '200+', label: 'frescoed panels' },
      { value: '11', label: 'courtyards & terraces' },
      { value: '5', label: 'generations of one family' },
    ],
  },
  experiences: {
    eyebrow: 'Beyond the walls',
    title: 'Days, the Shekhawati way',
    items: [
      {
        name: 'The Heritage Walk',
        meta: '2.5 hours · from ₹1,800 per person',
        desc: 'Dawn through Mandawa\u2019s painted lanes with our resident historian — havelis, stepwells, and the stories the frescoes won\u2019t tell. Ends with chai on our roof.',
      },
      {
        name: 'Folk Music Evenings',
        meta: 'Nightly at dusk · included in your stay',
        desc: 'Manganiyar musicians take the main courtyard as the light goes — sarangi, dholak, and songs five hundred years old. Guests sit on the diwan; the stars do the rest.',
        imgKey: 'detail',
        imgAlt: 'Folk musicians in the haveli courtyard at dusk, photographed from behind so no faces are visible',
      },
      {
        name: 'The Fresco Atelier',
        meta: '1 hour · ₹900 per person',
        desc: 'Grind pigment, mix lime plaster, and try your hand at a fresco panel with the chitera family restoring our east wing. Aprons provided; talent optional.',
      },
    ],
  },
  visit: {
    eyebrow: 'Practical',
    title: 'Finding the house',
    checkin: 'Check-in 2 pm · Check-out 11 am',
    address: `${kela.name}, Main Bazaar Road, Mandawa, Rajasthan 333704`,
    phone: '+91 1592 222 444',
    email: `stay@${kela.domain}`,
    routes: [
      { from: 'Jaipur International Airport', detail: '170 km · about 3½ hours by car' },
      { from: 'Mukundgarh railway station', detail: '18 km · 30 minutes' },
      { from: 'Delhi', detail: '270 km · about 6 hours by car' },
    ],
    note: 'Write to us for car transfers — our drivers know every painted lane in the Shekhawati.',
  },
  contact: {
    email: `stay@${kela.domain}`,
    phone: '+91 1592 222 444',
  },
  footer: {
    line: `© 2026 ${kela.name} · Mandawa, Rajasthan`,
    colophon: 'A twelve-suite heritage haveli hotel · Crafted in the Atelier',
  },
};
