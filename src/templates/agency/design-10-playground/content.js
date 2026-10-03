import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

export const content = {
  brand: {
    name: kela.name,
    tag: 'An experimental studio',
    location: 'Bengaluru / everywhere',
  },
  nav: [
    { label: 'Experiments', href: '#experiments' },
    { label: 'Proof', href: '#proof' },
    { label: 'Type toy', href: '#type' },
    { label: 'Studio', href: '#studio' },
    { label: 'Weird briefs', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Experiment no. 001 — live',
    lines: ['PLAY IS', 'THE PROOF'],
    sub: `We are ${kela.name}. Interaction is our content, curiosity is our business model. Touch the headline. It bites back.`,
    sliderLabel: 'Calm / Chaos',
    sliderMin: 'meditate',
    sliderMax: 'detonate',
    hint: 'Move your pointer. Scroll fast. Watch the letters panic.',
  },
  experiments: {
    eyebrow: 'The lab bench',
    title: 'Five sketches, zero permission slips',
    body: 'Every experiment below is running right now, in this page. No video of someone else having fun — the fun is the point. Poke them.',
    items: [
      {
        id: 'exp-1',
        index: 'E·01',
        title: 'LETTERSTORM',
        tech: 'CSS + GSAP',
        description:
          'A headline with commitment issues. Hover and the letters file for divorce; leave and they come crawling back. Couples therapy not included.',
        image: 'work-1',
        alt: 'Kinetic typography poster on a gallery wall, glowing lime and violet letterforms blurred into light streaks',
        playHint: 'Hover the storm word',
      },
      {
        id: 'exp-2',
        index: 'E·02',
        title: 'PUDDLE',
        tech: 'DOM + GSAP',
        description:
          'Seventy-two dots pretending to be water. Your cursor is the stone. Skip it across and watch the ripples argue about physics.',
        image: null,
        alt: '',
        playHint: 'Sweep your pointer across',
      },
      {
        id: 'exp-3',
        index: 'E·03',
        title: 'VELVET VELOCITY',
        tech: 'GSAP ScrollTrigger',
        description:
          'This headline reads your scrolling. Drift and it stays classy; fling and it skews like it is late for a flight. Scroll speed is the remote control.',
        image: 'work-2',
        alt: 'Interactive light installation in a dark room, visitors silhouetted before a wall of responsive lime and violet light',
        playHint: 'Scroll fast past this card',
      },
      {
        id: 'exp-4',
        index: 'E·04',
        title: 'CHARGE!',
        tech: 'CSS + GSAP',
        description:
          'Press and hold to build a charge, then let go and detonate it. The only productive use of bottled-up tension we have ever found.',
        image: 'work-3',
        alt: 'Surreal campaign artwork: a chrome sculptural form wrapped in glowing lime and violet light ribbons, dark studio',
        playHint: 'Press and hold, then release',
      },
      {
        id: 'exp-5',
        index: 'E·05',
        title: 'MAGNETIC MARQUEE',
        tech: 'GSAP',
        description:
          'A sentence on a leash. Grab it, drag it, throw it — it sulks back to center eventually. Like a cat, but typographic and less judgmental.',
        image: null,
        alt: '',
        playHint: 'Drag the sentence',
      },
    ],
  },
  proof: {
    eyebrow: 'The footnote',
    title: 'Yes, we also do it for money',
    body: 'The toys above are how we think. Below is what happens when a client pays us to think that way for them.',
    cases: [
      {
        client: 'Neon Bloom Festival',
        title: 'A ticketing site that flinched when you touched it',
        year: '2026',
        outcome: 'Sold out in 41 hours',
      },
      {
        client: 'Halcyon Watches',
        title: 'Product pages with a gravity problem',
        year: '2025',
        outcome: '3.1x longer sessions',
      },
      {
        client: 'Paper Lantern Press',
        title: 'An ebook store that reads you back',
        year: '2025',
        outcome: 'Shortlisted, Site of the Day',
      },
      {
        client: 'Orbit Athletics',
        title: 'Launch campaign you could physically wobble',
        year: '2024',
        outcome: '18M playful impressions',
      },
    ],
  },
  typeTool: {
    eyebrow: 'The type toy',
    title: 'Bend the alphabet',
    body: 'This is Unbounded, our house display face, served variable. Drag the sliders and watch the weight and width mutate live. Go on, make it unhinged. We did.',
    defaultText: 'WEIRD IS A FEATURE',
    weightLabel: 'Weight',
    widthLabel: 'Width',
    reset: 'Reset the alphabet',
  },
  studio: {
    eyebrow: 'The humans',
    title: 'Eleven people, one shared nervous system',
    body: [
      `${kela.name} is a studio of designers, creative developers, and one person whose job title is legally "vibes". We build the websites other agencies point at in meetings.`,
      'Half our week is client work. The other half is this page. You are currently looking at our R&D department, and it likes you.',
    ],
    facts: [
      { k: 'Founded', v: '2019, in a garage with great Wi-Fi' },
      { k: 'Team', v: '11 humans, 2 plants, 1 espresso machine' },
      { k: 'Awards', v: 'A shelf. The shelf is full.' },
      { k: 'Rule no. 1', v: 'If it does not react, it does not ship.' },
    ],
    image: 'detail',
    alt: 'Hands on a laptop keyboard in a dark studio, the screen glowing with abstract lime and violet light',
    caption: 'The lab, mid-experiment. Someone always has too many tabs open.',
  },
  contact: {
    eyebrow: 'Final transmission',
    title: 'Bring us something weird',
    body: 'Safe briefs bore us to actual sleep. If your project makes a normal agency nervous, it makes us lean forward. Tell us the strange part first.',
    email: `hello@${kela.domain}`,
    fields: {
      name: 'Your name',
      email: 'Your email',
      budget: 'Budget (pick your fighter)',
      brief: 'The strange part',
    },
    budgets: ['Shoestring, but spicy', 'Comfortable', 'Festival-headliner', 'Money is no object, weirdness is'],
    briefPlaceholder: 'e.g. We want a website that gets seasick…',
    submit: 'Launch the weirdness',
    note: 'We reply within 2 working days. Usually with questions. Always with enthusiasm.',
  },
  footer: {
    line: `${kela.name} — interaction is the content.`,
    colophon: 'Set in Unbounded + Space Grotesk · Built with GSAP · No pixels were harmed',
    socials: [
      { label: 'Instagram', href: `https://instagram.com/${kela.instagram}` },
      { label: 'Are.na', href: '#' },
      { label: 'Read.cv', href: '#' },
    ],
  },
};
