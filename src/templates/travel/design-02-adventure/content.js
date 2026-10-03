import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: { name: kela.name },

  nav: [
    { label: 'Treks', href: '#destinations' },
    { label: 'Ethos', href: '#story' },
    { label: 'Departures', href: '#visit' },
    { label: 'Basecamp', href: '#contact' },
  ],

  hero: {
    eyebrow: 'Expedition trekking co. — on the trail since 2011',
    title: 'GO HIGH. STAY RAW.',
    sub: 'Small teams, real mountains, no bus windows. Fourteen years of walking people into the thin air — and walking them back down grinning.',
    cta: 'Book a seat',
    ctaHref: '#visit',
    secondary: 'See the treks',
    secondaryHref: '#destinations',
    meter: { label: 'Highest camp', value: '5,364M' },
  },

  treks: {
    eyebrow: 'The roster',
    title: 'FOUR LINES UP.',
    intro:
      'Scroll. The altimeter climbs with you. Each trek passes through the checkpoint gate — sharp, full-color, one at a time. When the air gets thin, so does the noise.',
    meterStart: 2800,
    meterEnd: 5364,
    items: [
      {
        name: 'Torres del Paine — The W',
        price: 210000,
        blurb:
          'Five days of Patagonian wind doing its best to peel you off the trail. Granite towers, grey glaciers, and campsites where the tents argue all night. You will earn every photograph.',
        duration: '11 days',
        altitude: 2850,
        tag: 'Storm light',
        group: 'Max 10',
      },
      {
        name: 'Kanchenjunga North Base Camp',
        price: 185000,
        blurb:
          'The quiet giant. Three weeks into Nepal\u2019s far east where the trail belongs to yaks, porters, and almost nobody else. Pangpema at 5,143m is the loneliest great view on Earth.',
        duration: '21 days',
        altitude: 5143,
        tag: 'Remote',
        group: 'Max 8',
      },
      {
        name: 'Markha Valley Circuit',
        price: 92000,
        blurb:
          'Ladakh\u2019s high desert in nine days: barley villages, a 5,265m pass crossed before the wind wakes up, and nights in homestays where the butter tea never stops. The best first 5,000er there is.',
        duration: '9 days',
        altitude: 5265,
        tag: 'High desert',
        group: 'Max 12',
      },
      {
        name: 'Everest Base Camp Traverse',
        price: 145000,
        blurb:
          'The classic, done properly: slow acclimatization, rest days that are actually rest, and a summit morning at Kala Patthar before the crowds. Sixteen days to stand at 5,364m and mean it.',
        duration: '16 days',
        altitude: 5364,
        tag: 'The classic',
        group: 'Max 12',
      },
    ],
  },

  story: {
    eyebrow: 'Expedition ethos',
    title: "WE DON'T DO BUS WINDOWS.",
    body: [
      `${kela.name} started in 2011 with one secondhand jeep, three borrowed tents, and a stubborn belief: a trek should be walked, not toured. Fourteen years later the jeep is gone, the belief isn\u2019t.`,
      'Every departure is led by certified mountain guides who grew up on these trails — Sherpa, Ladakhi, and Patagonian leads, not fly-in contractors. Groups stay small enough that the guide knows your pace by day two. Porters carry fair loads, get fair pay, and eat with the team. Weather days are built into every itinerary, because mountains don\u2019t care about your return flight.',
      'We run four routes a year. Not forty. The ones we know stone by stone.',
    ],
    stats: [
      { value: '14', label: 'years on the trail' },
      { value: '6,200+', label: 'trekkers walked in' },
      { value: '5,364M', label: 'highest camp' },
      { value: '0', label: 'shortcuts taken' },
    ],
  },

  departures: {
    eyebrow: 'Expedition calendar',
    title: 'PICK YOUR WINDOW.',
    note: 'Seats are capped by group size — when a row says two seats, it means two. Deposits lock your place; the balance is due 60 days out.',
    rows: [
      { date: 'Mar 14', trek: 'Markha Valley Circuit', days: '9 days', seats: '4 seats', status: 'open' },
      { date: 'Apr 02', trek: 'Everest Base Camp Traverse', days: '16 days', seats: '2 seats', status: 'filling' },
      { date: 'Apr 19', trek: 'Everest Base Camp Traverse', days: '16 days', seats: 'Waitlist', status: 'waitlist' },
      { date: 'Oct 09', trek: 'Kanchenjunga North Base Camp', days: '21 days', seats: '6 seats', status: 'open' },
      { date: 'Nov 21', trek: 'Torres del Paine — The W', days: '11 days', seats: '3 seats', status: 'filling' },
    ],
  },

  gear: {
    eyebrow: 'Kit list',
    title: 'PACK LIKE YOU MEAN IT.',
    note: 'Everything below is mandatory above 4,000m. We check at basecamp briefing — no exceptions, no drama.',
    items: [
      'Broken-in boots, ankle height, waterproof',
      'Down jacket rated to −15°C',
      'Four-season sleeping bag',
      'Headlamp + spare batteries',
      'Two 1L bottles or hydration bladder',
      'Sunscreen SPF 50 + glacier glasses',
      'Personal first-aid + altitude meds',
      'Trekking poles (your knees will thank you)',
    ],
  },

  contact: {
    eyebrow: 'Basecamp',
    title: 'TALK TO A HUMAN.',
    body: 'We answer within 24 hours. Usually faster — unless the whole office is above 4,000m, in which case, fair enough.',
    address: '44, 3rd Cross, Koramangala, Bengaluru 560034',
    phone: '+91 98450 22110',
    email: `trail@${kela.domain}`,
    hours: 'Mon–Sat, 9:30–18:30 IST',
  },

  footer: {
    line: `${kela.name} — walk far, pack light, leave nothing.`,
    colophon: 'Set in Anton & Inter. Printed on recycled pixels.',
  },
};
