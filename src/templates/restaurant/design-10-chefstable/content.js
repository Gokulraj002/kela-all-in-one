/* Kela Kitchen (name from _shared/brand.js) — Chef's Table. All copy is playbill voice: acts, scenes,
   stage directions in mono. Prices are numbers in INR; render via price(). */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: { name: kela.name, tagline: 'A dinner in three acts' },
  nav: [
    { label: 'The Premise', href: '#story' },
    { label: 'Act I', href: '#act-1' },
    { label: 'Act II', href: '#act-2' },
    { label: 'Act III', href: '#act-3' },
    { label: 'Cast', href: '#contact' },
    { label: 'Box Office', href: '#reserve' },
  ],
  hero: {
    eyebrow: `${kela.name.toUpperCase()} · A CHEF'S TABLE · KALA GHODA, MUMBAI`,
    title: 'Dinner is theatre. You hold a front-row seat.',
    sub: 'One seating a night. Twelve guests. Nine courses performed across three acts — no menu to choose from, no fourth wall between you and the fire.',
    cta: 'Book tickets',
    ctaHref: '#reserve',
    note: 'ONE SEATING NIGHTLY · TWELVE GUESTS · CURTAIN 7:30 PM',
  },
  premise: {
    eyebrow: 'THE PREMISE',
    title: 'No menu. No choices. No intermission you can skip.',
    body: [
      `${kela.name} is not a restaurant that serves dinner. It is a stage that performs it. The kitchen is the company, the pass is the proscenium, and every plate arrives like a line delivered on cue.`,
      'The evening runs three acts and nine scenes. The cast — fourteen cooks, one sommelier, a stage manager in a waistcoat — has rehearsed each course the way actors rehearse blocking: until it looks like instinct.',
      'You do not order. You attend. And like any good performance, it is never the same twice — the menu is rewritten every fortnight, and when the run ends, the dishes are retired forever.',
    ],
    directions: [
      '[HOUSE LIGHTS DIM]',
      '[A SINGLE SPOT FINDS THE PASS]',
      '[THE CLOCHE LIFTS]',
    ],
  },
  acts: [
    {
      id: 'act-1',
      numeral: 'ACT I',
      title: 'First Light',
      direction:
        '[THE STAGE IS DARK. A SPOT FINDS A STONE SLAB. SOMETHING GREEN IS GROWING ON IT.]',
      scenes: [
        {
          label: 'Scene 1',
          name: 'The Forest Floor',
          desc: 'Wild mushrooms, roasted roots and a soil of burnt onion on dark slate, finished tableside under smoke.',
          note: 'SERVED BENEATH THE CLOCHE · PAIRING: A MINERAL WHITE, POURED LIKE A SECRET',
        },
        {
          label: 'Scene 2',
          name: 'Shell & Smoke',
          desc: 'Hand-dived scallops kissed with applewood smoke, sea herbs, a beurre the colour of candlelight.',
          note: 'THE FIRST APPLAUSE USUALLY ARRIVES HERE',
        },
        {
          label: 'Scene 3',
          name: 'The Garden, Interrupted',
          desc: 'A salad that refuses to behave — charred leaves, green strawberry, a vinaigrette with a temper.',
          note: 'EAT WITH YOUR HANDS · THE DIRECTOR INSISTS',
        },
      ],
      featured: {
        name: 'The Forest Floor',
        imgKey: 'product-0',
        alt: 'The Forest Floor — wild mushrooms, roasted roots and moss on dark slate, under a theatrical spotlight with smoke',
      },
    },
    {
      id: 'act-2',
      numeral: 'ACT II',
      title: 'The Turn',
      direction:
        '[THE LIGHTS GO AMBER. THE FIRE TAKES ITS CUE. THE ROOM SMELLS OF EMBERS.]',
      scenes: [
        {
          label: 'Scene 4',
          name: 'Ember',
          desc: 'A cut finished over live coals, glazed in its own ember jus, carved in the half-light at the pass.',
          note: 'THE LONGEST SCENE OF THE NIGHT · WORTH IT',
        },
        {
          label: 'Scene 5',
          name: 'The Cut',
          desc: 'One perfect slice, one perfect bite — the kitchen at its most disciplined and its most dangerous.',
          note: 'SILENCE, PLEASE · THIS ONE IS QUIET ON PURPOSE',
        },
        {
          label: 'Scene 6',
          name: 'Interlude: Bread & Theatre',
          desc: 'Sourdough baked at six, torn — never sliced — with smoked butter and flaky salt.',
          note: 'THE PALATE CLEANSER THAT STEALS THE ACT',
        },
      ],
      featured: {
        name: 'Ember',
        imgKey: 'product-1',
        alt: 'Ember — a fire-finished cut glazed in ember jus, smoke rising, under a theatrical spotlight',
      },
    },
    {
      id: 'act-3',
      numeral: 'ACT III',
      title: 'The Finale',
      direction:
        '[COLD LIGHT NOW. VAPOUR SPILLS OVER THE FOOTLIGHTS. THE SWEET STUFF TAKES THE STAGE.]',
      scenes: [
        {
          label: 'Scene 7',
          name: 'Nitrogen & Nectar',
          desc: 'A dessert frozen at the table in liquid nitrogen — meringue shards, dark chocolate, berries like stage jewels.',
          note: 'DO NOT BLINK · THE VAPOUR CLEARS IN SECONDS',
        },
        {
          label: 'Scene 8',
          name: 'The Encore',
          desc: 'The course the regulars write letters about. We will say no more; spoilers ruin finales.',
          note: 'ASK YOUR NEIGHBOUR AFTER · THEY WILL TELL YOU EVERYTHING',
        },
        {
          label: 'Curtain Call',
          name: 'Petit Fours',
          desc: 'A final bow in miniature: smoked caramels, saffron madeleines, espresso poured like a closing line.',
          note: '[LIGHTS UP · THE CAST TAKES ITS BOW]',
        },
      ],
      featured: {
        name: 'Nitrogen & Nectar',
        imgKey: 'product-2',
        alt: 'Nitrogen and Nectar — liquid-nitrogen dessert with vapour pouring over the plate, under a theatrical spotlight',
      },
    },
  ],
  chef: {
    eyebrow: "DIRECTOR'S NOTE",
    title: 'The chef keeps a prompt book, not a recipe book.',
    body: [
      '“Every service is a first night. The fire does not care that we did this yesterday, the fish does not know its cue, and the room — the room is a different audience every single evening.”',
      '“So we rehearse. We block every movement at the pass. We time the cloche lifts to the second. And then, at half past seven, we open the doors and let the night be live theatre — unrepeatable by design.”',
    ],
    signoff: `— THE CHEF-DIRECTOR, ${kela.name.toUpperCase()}`,
    imageAlt:
      'The chef’s hands placing a single micro-herb with tweezers under a tight spotlight, vapour rising',
  },
  cast: {
    eyebrow: 'DRAMATIS PERSONAE',
    title: 'The cast',
    note: 'Fourteen cooks, one sommelier, a stage manager in a waistcoat — and you, the audience of twelve.',
    members: [
      { role: 'Director · Chef', name: 'Arjun Mehra', note: 'Calls every service from the pass, like a conductor.' },
      { role: 'Second in Command · Sous-Chef', name: 'Kabir Anand', note: 'Runs the fire station. Feared by coals.' },
      { role: 'The Voice of Wine · Sommelier', name: 'Elena D’Souza', note: 'Pairs each act, not each course. Trust her.' },
      { role: 'Stage Manager · Maître d’', name: 'Vikram Rao', note: 'Seats the house, dims the lights, keeps the night on cue.' },
      { role: 'The Closer · Pâtissier', name: 'Anaya Iyer', note: 'Owns Act III. The vapour is her signature.' },
    ],
  },
  tickets: {
    eyebrow: 'BOX OFFICE',
    title: 'Tickets for the run',
    note: 'One seating nightly · 7:30 PM curtain (doors 7:00) · Twelve guests · The menu is rewritten every fortnight and never repeated.',
    tiers: [
      {
        name: 'Stalls',
        price: 8500,
        desc: 'The heart of the house — front-row to the pass, close enough to hear the fire.',
        perks: ['Nine courses, three acts', 'Welcome pour on arrival', 'The full performance'],
      },
      {
        name: 'Circle',
        price: 12500,
        desc: 'Elevated and intimate — the director’s preferred view of the whole stage.',
        perks: ['Everything in Stalls', 'Act-by-act wine pairing', 'A signed playbill to take home'],
      },
      {
        name: 'Royal Box',
        price: 18000,
        desc: 'A table for two behind the crimson curtain. The most unrepeatable seats in the city.',
        perks: ['Everything in Circle', 'Champagne at curtain-up', 'A course served by the chef-director'],
      },
    ],
    cta: 'Reserve seats',
    confirmed:
      '[TICKETS HELD] Your seats are being kept at the box office. A stage manager will write to confirm within the hour.',
  },
  visit: {
    address: `${kela.name}, Rampart Row, Kala Ghoda, Mumbai 400001`,
    phone: '+91 22 4890 1200',
    hours: 'One seating nightly · Doors 7:00 PM · Curtain 7:30 PM · Dark on Mondays',
  },
  footer: {
    line: `${kela.name.toUpperCase()} · A CHEF’S TABLE · Printed for this evening’s performance only.`,
    colophon: 'Nine courses · Three acts · Twelve guests · One seating nightly.',
  },
};
