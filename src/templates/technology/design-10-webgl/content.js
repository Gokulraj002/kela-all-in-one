import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'A creative technology lab' },
  nav: [
    { href: '#hero', label: 'Intro' },
    { href: '#experiments', label: 'Experiments' },
    { href: '#notes', label: 'Lab Notes' },
    { href: '#manifesto', label: 'Manifesto' },
    { href: '#commission', label: 'Commission' },
  ],
  hero: {
    eyebrow: 'Experimental interface lab — Est. 2021',
    title: 'Interfaces from the future.',
    sub: `${kela.name} builds impossible interfaces — the ones that should not work, until they do. Scroll, and we take you through the depth field.`,
    cta: 'Enter the depth field',
    ctaHref: '#experiments',
    scrollHint: 'Scroll to dolly forward',
  },
  dolly: {
    eyebrow: 'The 3D-dolly experiment journey',
    title: 'Five experiments. One forward motion.',
    hint: 'Scroll — the camera pushes through the field',
  },
  experiments: [
    {
      index: '01',
      name: 'Depth field',
      medium: 'Spatial rendering study',
      year: '2024',
      imgKey: 'hero',
      desc: 'A field of chrome solids rendered at impossible depths. We taught the browser to think in kilometres of parallax — and it did not blink.',
    },
    {
      index: '02',
      name: 'Liquid type',
      medium: 'Fluid typography system',
      year: '2024',
      imgKey: 'product-0',
      desc: 'Headlines poured, not placed. Letterforms that flow around the cursor like metal at the melting point of attention.',
    },
    {
      index: '03',
      name: 'Gesture UI',
      medium: 'Motion-input prototype',
      year: '2025',
      imgKey: 'product-1',
      desc: 'Controls suspended in dark space, drawn from light. Reach, and the interface reaches back — no surface required.',
    },
    {
      index: '04',
      name: 'Light volumes',
      medium: 'Volumetric display research',
      year: '2025',
      imgKey: 'product-2',
      desc: 'A monolith of fractured stone and refracted light. Architecture as an interface — you do not click it, you walk through it.',
    },
    {
      index: '05',
      name: 'Prism field',
      medium: 'Our real-time refraction engine',
      year: '2026',
      imgKey: 'detail',
      desc: 'Everything the lab learned, compressed into glass. Violet in, cyan out — the engine that bends every interface we ship.',
    },
  ],
  notes: {
    eyebrow: 'From the bench',
    title: 'Lab notes',
    entries: [
      {
        date: '02.2026',
        title: 'On the speed of glass',
        body: 'Refraction is honest: light will not be hurried. So we stopped fighting the frame budget and let the prism render at its own pace — 40 milliseconds of patience for a lifetime of shimmer.',
      },
      {
        date: '11.2025',
        title: 'Gestures remember',
        body: 'In testing, users reached for the same phantom button twice before looking at their hands. The body learns an interface before the mind does. We design for the body first now.',
      },
      {
        date: '09.2025',
        title: 'The tenth layer',
        body: 'Five planes of depth were not enough, then suddenly they were. The dolly rig taught us: restraint is not fewer layers, it is knowing which five earn their place in the dark.',
      },
    ],
  },
  manifesto: {
    eyebrow: 'Why we exist',
    title: 'The screen is a rumour.',
    body: [
      `Every interface you have ever used is a flat rumour of a deeper space. ${kela.name} is the lab that tests the rumour — building prototypes that move, breathe, and refract, until the future stops feeling like a demo and starts feeling like a place.`,
      'We work for the ones who commission what does not exist yet. If your interface could be a screenshot, it does not need us. If it needs to be felt — through depth, light, and motion — that is the experiment we run.',
    ],
    quote: 'We do not decorate screens. We find the space behind them.',
    quoteBy: `The ${kela.name} bench`,
  },
  cta: {
    eyebrow: 'One experiment at a time',
    title: 'Commission an experiment.',
    body: 'Tell us the interface that should not be possible. We will build the prototype that proves you wrong — beautifully, in public.',
    cta: 'Start a commission',
    note: 'Currently booking Q1 2027',
  },
  contact: { email: `lab@${kela.domain}`, phone: '+91 80 4719 2210' },
  footer: {
    line: `${kela.name} — a creative technology lab. Interfaces from the future.`,
    colophon: 'Set in Unbounded and Inter. Rendered in CSS-3D, no WebGL was harmed.',
  },
};
