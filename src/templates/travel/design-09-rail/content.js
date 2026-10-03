import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: {
    name: kela.name,
    line: 'Est. 1934 · Rail & Cruise',
  },
  nav: [
    { label: 'Journeys', href: '#journeys' },
    { label: 'Timetable', href: '#timetable' },
    { label: 'Berths', href: '#berths' },
    { label: 'Plan', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Rail & cruise · departures every week',
    title: kela.name,
    sub: 'Pullman trains and slow houseboats for people in no hurry at all. Brass fittings, linen sheets, and a window seat with your name on it.',
    cta: 'See departures',
    ctaHref: '#journeys',
    ticker: [
      'The Highland Mail — departs Friday',
      'The Darjeeling Breeze — departs Wednesday & Saturday',
      'Backwater Reverie — departs Tuesday & Sunday',
      'The Viaduct Crossing — departs daily',
      'Dining car menu chalked fresh each morning',
    ],
  },
  journeys: {
    eyebrow: 'The journeys',
    title: 'Four ways to go slowly.',
    lede: 'Settle into the window seat. The landscape does the travelling — you just watch it pass, mile by mile, at the speed it deserves.',
    hint: 'Scroll — the landscape moves past the window',
    items: [
      {
        name: 'The Highland Mail',
        tag: 'Pullman train',
        duration: '3 days · Fort William to Mallaig',
        price: 185000,
        blurb:
          'Our flagship. Green-and-cream Pullman cars, a dining car that still serves breakfast on silver, and three days of mist rolling off the moors.',
      },
      {
        name: 'The Darjeeling Breeze',
        tag: 'Narrow gauge',
        duration: '2 days · Siliguri to Darjeeling',
        price: 68000,
        blurb:
          'A little steam engine with a big heart, climbing through tea gardens at walking pace. The loop at Batasia is worth the whole ticket.',
      },
      {
        name: 'Backwater Reverie',
        tag: 'Houseboat cruise',
        duration: '4 nights · Alleppey to Kumarakom',
        price: 92000,
        blurb:
          'A private kettuvallam drifting the Kerala backwaters. Kingfishers for company, coconut curry for lunch, and water so still it doubles the sky.',
      },
      {
        name: 'The Viaduct Crossing',
        tag: 'Heritage steam',
        duration: '1 day · Across the great viaduct',
        price: 34500,
        blurb:
          'One perfect day: a red vintage rake crossing the stone viaduct at golden hour, windows down, the valley opening up beneath your feet.',
      },
    ],
  },
  timetable: {
    eyebrow: 'Departure board',
    title: 'The timetable.',
    note: 'All departures keep railway time. Boarding opens forty minutes before the whistle.',
    rows: [
      { route: 'The Highland Mail', day: 'Friday', duration: '3 days', from: 185000, status: 'Boarding' },
      { route: 'The Darjeeling Breeze', day: 'Wed · Sat', duration: '2 days', from: 68000, status: 'On time' },
      { route: 'Backwater Reverie', day: 'Tue · Sun', duration: '4 nights', from: 92000, status: '2 berths left' },
      { route: 'The Viaduct Crossing', day: 'Daily', duration: '1 day', from: 34500, status: 'On time' },
    ],
  },
  deck: {
    eyebrow: 'The observation car',
    quote:
      'The best seat in the house is at the very back — brass rail, open air, and the whole line unspooling behind you.',
    caption: 'The observation deck, The Highland Mail — brass fittings, morning tea, nowhere to be.',
  },
  berths: {
    eyebrow: 'Choose your berth',
    title: 'Three ways to sleep it off.',
    note: 'Every berth includes full board, linen changed daily, and a steward who remembers how you take your tea.',
    classes: [
      {
        name: 'Pullman Day Coach',
        price: 34500,
        blurb: 'Deep armchairs in green leather, wide observation windows, and the dining car three steps away.',
        perks: ['Reserved window seat', 'Full dining service', 'Morning tea in bed — well, in seat'],
      },
      {
        name: 'The Sleeping Car',
        price: 92000,
        blurb: 'A private cabin with brass fittings, a proper bed, and the gentle rocking that money cannot otherwise buy.',
        perks: ['Private cabin for two', 'Evening turndown', 'Breakfast served in your cabin'],
      },
      {
        name: 'The Observation Suite',
        price: 185000,
        blurb: 'The glass-ended carriage at the very back of the train. Your own steward, your own timetable, your own sky.',
        perks: ['Private glass observation lounge', 'Dedicated steward', 'Champagne breakfast on departure'],
      },
    ],
  },
  contact: {
    eyebrow: 'Plan your journey',
    title: 'Tell us where slowly is.',
    body: 'Write to the travel desk with the journey that caught your eye. We reply within a day, usually with a timetable attached and a strong opinion about window seats.',
    email: `travel@${kela.domain}`,
    phone: '+91 80 4719 1934',
    address: 'Platform 9 Office, Chhatrapati Terminus, Mumbai',
  },
  footer: {
    line: `${kela.name} — Rail & Cruise. Departures every week, weather permitting, mood always.`,
    colophon: 'Timetables chalked fresh each morning · All journeys keep railway time',
  },
};
