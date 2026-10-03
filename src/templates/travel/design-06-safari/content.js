import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: { name: kela.name, tag: 'Savanna Safaris' },
  nav: [
    { label: 'Safaris', href: '#safaris' },
    { label: 'Field Notes', href: '#story' },
    { label: 'Guides', href: '#guides' },
    { label: 'Plan', href: '#contact' },
  ],
  cta: { label: 'Book a drive', href: '#contact' },
  ticker: [
    'Leopard sighted — Tala Gate, Ranthambore · 17:42',
    'Lion pride, fourteen strong — Fig Tree Ridge · 06:20',
    'Crossing building — Mara River · 11:05',
    'Fresh tiger pugmarks — Zone 3 · 05:55',
    'Giraffe tower at the salt lick · 18:12',
    'Elephant herd, sixty plus — Talek · 07:10',
  ],
  hero: {
    eyebrow: 'Savanna safaris · Kenya & Rajasthan',
    titleA: kela.name.split(' ')[0].toUpperCase(),
    titleB: kela.name.split(' ').slice(1).join(' ').toUpperCase(),
    sub: 'Six guests to a jeep. Three drives a day. No loud engines, no radio chatter, no shortcuts — we track the wild the slow way, and wait until it lets you in.',
    cta: 'Plan your safari',
    ctaHref: '#contact',
    note: 'Next departure — First Light Drive, tomorrow 05:40',
  },
  safaris: {
    eyebrow: "The day's drives",
    title: 'One day. Three chances.',
    intro:
      'Scroll — the sky moves with you. Dawn to dusk, the way a real day on the plains runs: three drives, each leaving at the hour the animals do.',
    chapters: [
      { time: '05:40', name: 'First Light', caption: 'The hour the predators clock out.' },
      { time: '12:15', name: 'The Long Middle', caption: 'The hour the patient get paid.' },
      { time: '18:50', name: 'Thunder Hour', caption: 'The hour the plains catch fire.' },
    ],
    items: [
      {
        name: 'The First Light Drive',
        price: 18500,
        blurb:
          "We leave in the dark so we arrive with the light. Lions on the move, hyenas heading home, and the grass still holding last night's cold. Coffee from a flask; silence as standard.",
        duration: '4 hours · back by 10',
        tag: 'Dawn',
        time: '05:40',
      },
      {
        name: 'The Long Day',
        price: 24000,
        blurb:
          "Midday is when the amateurs nap. We don't. Leopards in the riverine shade, elephants at the water, and a tracker who reads dust like print. Lunch under an acacia; the jeep roof becomes a hide.",
        duration: '8 hours · full day',
        tag: 'Midday',
        time: '12:15',
      },
      {
        name: 'Thunder Hour',
        price: 21500,
        blurb:
          "The sky goes amber and everything wakes up. Herds on the move, owls warming up, and if the light is kind, a hunt. We drive back by spotlight — the day's last chapter, told in headlights.",
        duration: '5 hours · back after dark',
        tag: 'Dusk',
        time: '18:50',
      },
    ],
  },
  grounds: [
    {
      place: 'Masai Mara, Kenya',
      note: 'The crossing — two million hooves, one river.',
    },
    {
      place: 'Ranthambore, Rajasthan',
      note: 'Eye level with the stripes. No fences between.',
    },
    {
      place: 'Amboseli, Kenya',
      note: 'One tree, one giraffe, one enormous sun.',
    },
  ],
  story: {
    eyebrow: 'Field notes',
    title: 'Patience is the price of admission.',
    body: [
      'A safari is not a tour. It is an apprenticeship in waiting. Our naturalists do not chase sightings — they read them: a bent blade of grass, a francolin’s alarm call, dust hanging wrong in the light.',
      'We run six guests to a jeep, never twelve. Engines cut at sightings. Radios stay off. If the leopard doesn’t show, the leopard doesn’t show — and the morning was still worth it.',
    ],
    stats: [
      { n: '14', label: 'seasons tracking' },
      { n: '6', label: 'guests per jeep, max' },
      { n: '2', label: 'continents, one standard' },
    ],
    quote: {
      text: 'The bush rewards the ones who sit still.',
      name: 'Kiptoo Oduya',
      role: 'Head Naturalist',
    },
  },
  guides: {
    eyebrow: 'The guides',
    title: 'Naturalists, not drivers.',
    intro:
      'Every drive is led by a career tracker. They decide the route each morning based on last night’s signs — not a fixed circuit.',
    list: [
      {
        name: 'Kiptoo Oduya',
        initials: 'KO',
        role: 'Head Naturalist · Mara',
        detail:
          'Fourteen seasons. Reads elephant herds like weather. Will stop the jeep for a dung beetle if the story is good.',
        drives: '2,300+ drives',
      },
      {
        name: 'Meera Rathore',
        initials: 'MR',
        role: 'Tiger Tracker · Ranthambore',
        detail:
          'Ten seasons. Knows three tigresses by their walk. Her rule: the forest decides, we suggest.',
        drives: '1,800+ drives',
      },
      {
        name: 'Jabu Nkosi',
        initials: 'JN',
        role: 'River & Birding · Mara',
        detail:
          'Twelve seasons. Four hundred birds by call alone. Crossings are his office; patience is his uniform.',
        drives: '2,100+ drives',
      },
    ],
  },
  contact: {
    eyebrow: 'Plan',
    title: 'The wild keeps office hours. We don’t.',
    body: 'Tell us when you can travel and how long you can wait. We’ll match you to the season, the reserve and the guide — then hold your seats with a 20% deposit.',
    email: `hello@${kela.domain}`,
    phone: '+91 98200 11223',
    bases: 'Bengaluru · Nairobi · Sawai Madhopur',
    departs: 'Drives daily — 05:40 · 12:15 · 18:50',
  },
  footer: {
    line: `${kela.name} — savanna safaris, run slow.`,
    colophon: `© 2026 ${kela.name} · Crafted at walking pace`,
  },
};
