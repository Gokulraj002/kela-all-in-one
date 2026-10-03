import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: { name: kela.name },

  nav: [
    { label: 'Deals', href: '#destinations' },
    { label: 'Night Train', href: '#story' },
    { label: 'Crew & Bunks', href: '#gallery' },
    { label: 'Plan it', href: '#visit' },
  ],

  hero: {
    eyebrow: 'Backpacking trips · dorm beds · sleeper trains',
    title: 'GO FAR. SPEND LITTLE.',
    sub: "Real routes, honest prices, zero fine print. We run small-group backpacking trips across India — dorm bunks, sleeper berths and dhaba dinners, planned by people who actually travel this way.",
    cta: 'Deal me in',
    ctaHref: '#destinations',
    secondary: 'How it works',
    secondaryHref: '#visit',
    priceNote: 'Every trip priced all-in, from ₹5,499. What you see is what you pay.',
  },

  routes: {
    eyebrow: 'The deal board',
    title: 'TICKETS. NOT BROCHURES.',
    intro:
      'Four tickets on the board right now. The price printed is the price you pay — transport, stays, a trip lead and most meals. Scroll on and watch the board deal you in, one stamped ticket at a time.',
    hint: 'Keep scrolling — the board deals you in',
    items: [
      {
        name: 'Hampi Slow Week',
        price: 5499,
        blurb:
          'Six slow days among the boulders: sunrise climbs, coracle rides on the Tungabhadra, cliff-jumping at Sanapur lake and nights in a riverside guesthouse dorm. The trip that turns "someday" people into travelers.',
        duration: '6 days',
        tag: 'Easiest first trip',
        group: 'Max 14',
      },
      {
        name: 'Kerala Backwater Drift',
        price: 7499,
        blurb:
          'Dawn canoe rides through the Alleppey canals, a night in a Fort Kochi hostel, fish curry with a family in Kumarakom and one very lazy houseboat afternoon. Green, wet and completely unhurried.',
        duration: '5 days',
        tag: 'Monsoon-proof',
        group: 'Max 12',
      },
      {
        name: 'Manali–Leh Overland',
        price: 12999,
        blurb:
          'The classic high road: two days over the great passes, dhabas at Sarchu and Pang, then Leh on foot — monasteries, maggi points and a hostel rooftop with the whole range for company.',
        duration: '9 days',
        tag: 'The big one',
        group: 'Max 14',
      },
      {
        name: 'Spiti Circuit',
        price: 11499,
        blurb:
          'Kaza to Kibber to Langza: the highest villages in the world, a night under the clearest sky you have ever seen, monastery guest stays and roads that make you respect the mountains properly.',
        duration: '8 days',
        tag: 'Remote and raw',
        group: 'Max 10',
      },
    ],
  },

  story: {
    eyebrow: 'The journeys film',
    title: 'HALF THE TRIP IS THE TRAIN.',
    body: [
      'Ask any backpacker and they will tell you: the trip starts the night before, on a sleeper berth, sharing dinner with strangers who are going your way.',
      'We build our routes around those in-between hours — the night trains, the shared jeeps, the 4 am tea stalls — because that is where a trip turns into a story you keep telling.',
    ],
    rituals: [
      {
        title: 'Berth-32 diplomacy',
        text: 'Overnight trains are our moving hostels. We block whole bays so the crew travels together and the card games start by 9 pm.',
      },
      {
        title: 'Dhaba arithmetic',
        text: 'A full thali at a highway dhaba costs less than your airport coffee. We eat where the truck drivers eat, because they know.',
      },
      {
        title: 'Strangers to crew',
        text: 'Every trip mixes solo travelers on purpose. Day one is introductions; by day three someone is planning the next trip in the group chat.',
      },
    ],
    filmNote: 'Shot from a real sleeper berth, somewhere past midnight.',
  },

  crew: {
    eyebrow: 'Crew finder',
    title: 'NEVER GO SOLO (UNLESS YOU WANT TO).',
    intro:
      'Traveling alone but not lonely? These departures have open bunks and crews forming right now. Drop us a line and we will slot you in.',
    cta: 'Claim a bunk',
    ctaHref: '#visit',
    items: [
      {
        route: 'Hampi Slow Week',
        dates: '14–19 Nov',
        spots: 4,
        note: 'Three solos and a pair from Pune already in.',
      },
      {
        route: 'Spiti Circuit',
        dates: '02–09 Dec',
        spots: 2,
        note: 'Last two bunks. Winter Spiti is not for the soft-hearted.',
      },
      {
        route: 'Kerala Backwater Drift',
        dates: '09–13 Jan',
        spots: 6,
        note: 'New year, new crew. A great first trip.',
      },
    ],
    bunksTitle: 'BUNKS WE RATE.',
    bunksIntro: 'Hostels we have actually slept in and would send our own friends to. Prices are per dorm bed, per night.',
    perNight: 'per night',
    hostels: [
      {
        name: 'The Cliffside Dorm',
        city: 'Varkala',
        price: 349,
        note: 'Hammocks over the cliff, sunrise yoga, and a dog named Biscuit who runs the place.',
      },
      {
        name: 'Old Delhi Haveli Hostel',
        city: 'Delhi',
        price: 299,
        note: 'A 120-year-old haveli, rooftop breakfasts, and the metro two minutes from the door.',
      },
      {
        name: 'Pine & Post Hostel',
        city: 'Manali',
        price: 399,
        note: 'Wood stove in the common room, hot water that actually works, and trailheads uphill.',
      },
    ],
  },

  visit: {
    eyebrow: 'Plan it',
    title: 'HOW IT WORKS.',
    steps: [
      {
        title: 'Pick a ticket',
        text: 'Choose your route above. The price you see covers transport, stays, a trip lead and most meals.',
      },
      {
        title: 'Ping us',
        text: 'Message or call. No forms, no "our team will reach out in 48 hours". A human replies, usually within the hour.',
      },
      {
        title: 'Show up',
        text: 'Pack a 40-litre bag and meet the crew at the start point. We handle everything from the first chai onward.',
      },
    ],
    contactTitle: 'Talk to a human',
    email: `hello@${kela.domain}`,
    phone: '+91 98450 12345',
    address: '14 Rest House Road, Bengaluru 560001',
    note: 'Trips run October to March. Groups capped at 14. Solo travelers welcome on every departure.',
  },

  footer: {
    line: `${kela.name} — go far, spend little.`,
    colophon: 'Prices honest since 2019 · Made for the dorm-bunk generation',
  },
};
