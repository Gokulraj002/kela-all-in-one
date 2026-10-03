import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('hotel');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'A private estate on the shoreline' },
  nav: [
    { label: 'The Collection', href: '#collection' },
    { label: 'Signature Villas', href: '#villas' },
    { label: 'Private Staff', href: '#staff' },
    { label: 'Occasions', href: '#occasions' },
  ],
  hero: {
    eyebrow: 'A private estate · On the water',
    title: `${kela.name}`,
    sub: 'Nine private villas along one shoreline. Fully staffed, entirely secluded, and — for the length of your stay — entirely yours.',
    cta: 'Enquire privately',
    ctaHref: '#enquire',
    secondary: 'Tour the estate',
    secondaryHref: '#collection',
  },
  /* The nine villas in map order, gate → beach. index i ↔ productName(i, …). */
  villas: [
    { name: 'The Gatehouse', note: 'The arrival suite, set above the estate gates', sleeps: 2, rate: 38000 },
    { name: 'Villa Frangipani', note: 'A garden villa wrapped in frangipani', sleeps: 4, rate: 52000 },
    { name: 'The Teak House', note: 'Timber pavilions gathered around a courtyard pool', sleeps: 6, rate: 68000 },
    { name: 'Villa Banyan', note: 'Set beneath the estate’s oldest banyan tree', sleeps: 4, rate: 58000 },
    { name: 'The Main Villa', note: 'The estate’s grand residence — pool, pavilion, lawns', sleeps: 8, rate: 120000 },
    { name: 'The Infinity House', note: 'Built around a horizon-edge infinity pool', sleeps: 6, rate: 95000 },
    { name: 'Villa Casuarina', note: 'Quiet and dune-sheltered, by the west lawn', sleeps: 4, rate: 54000 },
    { name: 'The Deck House', note: 'Sunset-facing decks above the shoreline path', sleeps: 6, rate: 72000 },
    { name: 'Villa Tide', note: 'Beachfront — the sea at the foot of the steps', sleeps: 8, rate: 110000 },
  ],
  /* Deep dives reference villas by index into the collection above. */
  signatures: [
    {
      index: 4,
      imgKey: 'product-0',
      eyebrow: 'Signature · I',
      rooms: '4 bedrooms · 8 guests',
      pool: '25-metre private pool & living pavilion',
      detail:
        'The Main Villa is the estate’s grand residence: a columned living pavilion opening onto lawns that run to the water, a 25-metre pool, and staff quarters discreetly out of sight. It is the villa returning guests ask for by name.',
      amenities: ['Living pavilion for twelve', 'Private 25-metre pool', 'Chef’s kitchen & cellar', 'Dedicated butler & house team'],
    },
    {
      index: 5,
      imgKey: 'product-1',
      eyebrow: 'Signature · II',
      rooms: '3 bedrooms · 6 guests',
      pool: 'Horizon-edge infinity pool',
      detail:
        'The Infinity House is built around a single gesture — a pool that pours into the horizon. Bedrooms open straight onto the water’s edge; evenings end at the pool’s far corner, where the estate’s sunsets arrive first.',
      amenities: ['Horizon-edge infinity pool', 'Sunset terrace & fire pit', 'Outdoor rain showers', 'Dedicated chef on call'],
    },
    {
      index: 8,
      imgKey: 'product-2',
      eyebrow: 'Signature · III',
      rooms: '4 bedrooms · 8 guests',
      pool: 'Beachfront plunge pool & private deck',
      detail:
        'Villa Tide stands where the estate meets the sea. A private path descends from the deck to the sand; dinners are served at a single long table facing the water, lit only by candles and the last of the light.',
      amenities: ['Private beach path', 'Candlelit dining terrace', 'Beachfront plunge pool', 'Dedicated butler & boatman'],
    },
  ],
  compare: {
    eyebrow: 'Compared, discreetly',
    title: 'Three signatures, side by side',
    rows: [
      { label: 'Bedrooms', values: ['4 bedrooms', '3 bedrooms', '4 bedrooms'] },
      { label: 'Sleeps', values: ['8 guests', '6 guests', '8 guests'] },
      { label: 'Private pool', values: ['25-metre pool', 'Infinity edge', 'Beach plunge pool'] },
      { label: 'Signature moment', values: ['Pavilion evenings', 'Sunset corner', 'Dinners by the sea'] },
    ],
  },
  staff: {
    eyebrow: 'The private staff',
    title: 'An estate that runs itself around you',
    intro:
      'Every villa arrives with its own people — never shared, never hurried. You will know them by first name within a day; you will not notice them at all unless you need them.',
    members: [
      {
        role: 'Private Chef',
        detail:
          'Menus are built around your table, not a restaurant’s. The chef shops each morning, cooks to your hours, and plates wherever you happen to be sitting — pavilion, pool edge, or beach.',
      },
      {
        role: 'Butler',
        detail:
          'One point of contact for the whole stay: unpacking, pressing, reservations beyond the gates, and the hundred small things that never become your problem.',
      },
      {
        role: 'Chauffeur',
        detail:
          'The estate’s cars and drivers are at your disposal — airport transfers, dinners in town, or a slow drive along the coast with no destination at all.',
      },
    ],
  },
  occasions: {
    eyebrow: 'Occasions',
    title: 'The estate, for the days that matter',
    intro:
      'Whole-estate buyouts for weddings and retreats. Nine villas, one shoreline, and a team that has done this quietly, many times, for many years.',
    cards: [
      {
        title: 'Weddings',
        detail:
          'Up to 120 guests across the estate; ceremonies on the west lawn, dinners by the water. A dedicated events team, and nine villas for the wedding party.',
      },
      {
        title: 'Retreats',
        detail:
          'Leadership offsites and private gatherings, with pavilions for sessions, the beach for mornings, and every meal handled in-house.',
      },
    ],
    note: 'Buyouts are planned a season ahead. Tell us the occasion — we will tell you honestly whether the estate is right for it.',
  },
  enquire: {
    eyebrow: 'Enquire',
    title: 'Begin with a conversation',
    intro:
      'No booking engine, no instant confirmation. Tell us when, who, and which villa caught your eye — a member of the estate team replies personally, usually within a day.',
    fields: {
      name: 'Full name',
      email: 'Email',
      arrival: 'Arrival',
      departure: 'Departure',
      guests: 'Guests',
      villa: 'Villa of interest',
      notes: 'Anything we should know — occasions, celebrations, quiet requests',
      submit: 'Send enquiry',
      sentTitle: 'Received, with thanks',
      sentBody:
        'Your enquiry is with the estate team. Expect a personal reply within one day — never an automated confirmation.',
      nights: 'nights',
      estimateLabel: 'Indicative estimate',
      estimateNote: 'From-rates only. Your final proposal is prepared personally, on enquiry.',
      anyVilla: 'Not sure yet — advise me',
    },
  },
  visit: {
    email: `stay@${kela.domain}`,
    phone: '+91 98450 12345',
    address: `${kela.name}, Shoreline Road, Coastal District`,
  },
  footer: {
    line: `© 2026 ${kela.name}. A private estate.`,
    colophon: 'Nine villas · one shoreline · staffed in full',
  },
};
