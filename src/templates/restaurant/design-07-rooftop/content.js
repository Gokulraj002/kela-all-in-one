import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A rooftop lounge above the city',
  },
  nav: [
    { label: 'The Hour', href: '#story' },
    { label: 'Sips & Plates', href: '#menu' },
    { label: 'The View', href: '#gallery' },
    { label: 'Private Skies', href: '#craft' },
  ],
  hero: {
    eyebrow: 'Rooftop lounge · Level 42, Mumbai',
    title: 'Where the city learns to glow',
    sub: `Amber pours, smoked ice, and a skyline that performs nightly. ${kela.name} is the hour the sun goes down — served every evening, five to seven.`,
    cta: 'Reserve golden hour',
    ctaHref: '#reserve',
    note: 'Walk-ins welcome at the bar · the rail is by reservation',
  },
  hour: {
    eyebrow: 'The ritual',
    title: 'The Golden Hour, nightly',
    time: '5 – 7 pm',
    body: [
      `For two hours the light does the decorating. The city drops its edges, the harbour catches fire, and everything on the bar turns to amber. We built ${kela.name} around those two hours — and around the people who refuse to miss them.`,
      'Every evening at five, the first pour goes out with a small glass of champagne for the tables along the rail. Sunset menus are priced for the hour, not the occasion. When the light goes, the night begins — but the hour belongs to you first.',
    ],
    rituals: [
      {
        title: 'First pour',
        body: 'Tables along the rail open the evening with a champagne pour, on the house, every day at five.',
      },
      {
        title: 'Sunset pricing',
        body: 'Signature sips at golden-hour prices from five to seven — the same pours, kinder numbers.',
      },
      {
        title: 'The dimming',
        body: 'At dusk the terrace lights rise as the city dims. The transition is the show; the drinks keep pace.',
      },
    ],
  },
  menu: {
    eyebrow: 'Sips & plates',
    title: 'Cocktails lead the night',
    sub: 'Eight signatures, built for altitude — bright, bitter, and unhurried. The plates are the supporting cast: small, golden, made for sharing between sips.',
  },
  cocktails: [
    { name: `${kela.name} Old Fashioned`, specs: 'Smoked bourbon · demerara · black walnut bitters', price: 1450, tag: 'Signature' },
    { name: 'Golden Hour Spritz', specs: 'Champagne · elderflower · grapefruit oils', price: 1250, tag: '5–7 ritual' },
    { name: 'Midnight Negroni', specs: 'Barrel-rested gin · campari · sweet vermouth', price: 1350 },
    { name: 'The Skylight', specs: 'Vodka · passion fruit · vanilla mist', price: 1150 },
    { name: 'Saffron Sour', specs: 'Saffron-infused gin · lemon · silk cloud', price: 1450, tag: 'Signature' },
    { name: 'Rooftop Mule', specs: 'Copper-distilled vodka · ginger · lime · torn mint', price: 1050 },
    { name: 'Ember Manhattan', specs: 'Rye · amaro · cherrywood smoke', price: 1550 },
    { name: 'Chandni Martini', specs: 'Gin · dry vermouth · jasmine rinse', price: 1350 },
  ],
  plates: [
    { name: 'Burrata & Heirloom', desc: 'Creamy burrata, heirloom tomatoes, basil, aged balsamic.', price: 950 },
    { name: 'Tuna Tartare Cones', desc: 'Sesame cones, yellowfin tartare, micro-herbs, yuzu.', price: 1150 },
    { name: 'Chocolate Fondant', desc: 'Molten dark chocolate, restrained gold dust, sea salt.', price: 850 },
    { name: 'The Golden Board', desc: 'A dusk board for the table — cheeses, charcuterie, marinated olives, warm bread. Serves two, easily four.', price: 1850 },
  ],
  view: {
    eyebrow: 'The view',
    title: 'Forty-two floors of nowhere to be',
    body: [
      'The terrace runs the full western edge of the tower — one long rail, no bad seat, the harbour opening out beneath you. At five the city is still working. By six it is performing. By seven it is yours.',
      'Come for the sunset; stay because the lights coming up across the bay are the finest nightcap in Mumbai.',
    ],
    stats: [
      { value: '42', label: 'Floors above the traffic' },
      { value: '270°', label: 'Of harbour and skyline' },
      { value: '120', label: 'Seats along the rail' },
    ],
  },
  events: {
    eyebrow: 'Private skies',
    title: 'The terrace, exclusively yours',
    body: 'Sunset buyouts, launch evenings, and celebrations with the whole bay as the backdrop. The bar, the rail, and the light — reserved for your guests.',
    items: [
      {
        title: 'Sunset Soirées',
        body: 'Twenty to sixty guests, the western rail at five, champagne on arrival and a dedicated bartender through the night.',
        price: 95000,
      },
      {
        title: 'Full Terrace Buyout',
        body: 'All one hundred and twenty seats, the bar exclusively yours, a menu written with our chef for the evening.',
        price: 450000,
      },
      {
        title: 'Golden Hour Weddings',
        body: 'Ceremonies at dusk with the harbour as witness — intimate, cinematic, and timed to the light.',
        price: 650000,
      },
    ],
    note: 'Every enquiry is answered by a person, within a day. Tell us the date — we will tell you what the light will do.',
  },
  reserve: {
    eyebrow: 'Reserve',
    title: 'Reserve golden hour',
    body: 'The rail fills first — book the hour you want and we will hold the light for you.',
    slots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
    successTitle: 'The light is held.',
    successBody: 'We have your request. A confirmation will reach you within the hour — come thirsty, leave golden.',
  },
  contact: {
    address: ['Level 42, Meridian Tower', 'Ballard Estate, Mumbai 400001'],
    phone: '+91 22 4890 1234',
    email: `reserve@${kela.domain}`,
    hours: [
      { days: 'Tuesday – Sunday', time: '5:00 PM – 1:00 AM' },
      { days: 'Golden hour', time: '5:00 PM – 7:00 PM, daily' },
      { days: 'Monday', time: 'The sky rests' },
    ],
  },
  footer: {
    line: `© 2026 ${kela.name} Rooftop Lounge, Mumbai. Please sip responsibly.`,
  },
};
