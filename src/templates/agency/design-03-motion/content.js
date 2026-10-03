import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

/* Kela Studio (agency) — all editable copy and data. JSON-compatible, no functions. */

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Motion & design film studio',
    location: 'Los Angeles — working worldwide',
    founded: '2014',
    crew: '24 directors, designers & finishers under one roof',
  },

  nav: [
    { label: 'Films', href: '#films' },
    { label: 'Directors', href: '#directors' },
    { label: 'Contact', href: '#contact' },
  ],
  reelCta: { label: 'Watch the reel', href: '#reel' },

  hero: {
    eyebrow: 'Motion & design film studio — est. 2014',
    title: 'WE MAKE MOVING IMAGES.',
    sub: 'Title sequences, brand films, idents and CGI for studios, streamers and brands that need the first ten seconds to land.',
    cta: 'Watch the reel',
    ctaHref: '#reel',
    secondaryCta: 'Request a treatment',
    secondaryCtaHref: '#contact',
    meta: ['24 fps', '4K finish', 'Dolby Vision'],
  },

  reel: {
    eyebrow: 'Showreel — 2026 cut',
    title: 'THE REEL',
    note: 'Scroll to scrub the cut. Five films, ten seconds each, no filler.',
  },

  films: [
    {
      title: 'EMBER HOURS',
      client: 'Solstice Airways',
      director: 'Adaeze Okafor',
      year: '2025',
      runtime: '2:40',
      discipline: 'Brand film',
      imgKey: 'work-1',
      alt: 'Amber light streaks sweeping across black — title-design still from Ember Hours',
      logline: 'A brand film about the hour before takeoff, told entirely in light.',
    },
    {
      title: 'THE LONG SIGNAL',
      client: 'Halcyon Pictures',
      director: 'Marco Reyes',
      year: '2024',
      runtime: '1:15',
      discipline: 'Title sequence',
      imgKey: 'work-2',
      alt: 'Liquid chrome forms in black space lit amber — CGI frame from The Long Signal',
      logline: 'Main titles for the limited series — type built from signal interference.',
    },
    {
      title: 'CHROME GARDEN',
      client: 'Pulse Network',
      director: 'Yuki Tanaka',
      year: '2025',
      runtime: '0:20',
      discipline: 'Ident',
      imgKey: 'work-3',
      alt: 'Cinema camera silhouetted against a glowing monitor on a dark set — behind the scenes of Chrome Garden',
      logline: 'A twenty-second ident grown from liquid metal and glass.',
    },
    {
      title: 'PAPER STORMS',
      client: 'Atlas Publishing',
      director: 'Adaeze Okafor',
      year: '2023',
      runtime: '3:05',
      discipline: 'Brand film',
      imgKey: 'detail',
      alt: 'Grading monitor glowing amber in a dark edit suite — finishing Paper Storms',
      logline: 'Three minutes on the life of a book, from pulp to shelf.',
    },
    {
      title: 'NIGHT FREQUENCY',
      client: 'Volt Records',
      director: 'Marco Reyes',
      year: '2024',
      runtime: '1:48',
      discipline: 'Idents & packaging',
      imgKey: 'hero',
      alt: 'Projector beam cutting through haze in a dark studio — still from Night Frequency',
      logline: 'A channel package tuned to after-midnight.',
    },
  ],

  capabilities: [
    { name: 'Title Design', text: 'Main titles and end crawls that survive the skip button.' },
    { name: '2D Animation', text: 'Cel, cut-out and vector systems with a human hand in them.' },
    { name: '3D & CGI', text: 'Look-dev to final render — metal, glass, smoke, weather.' },
    { name: 'Brand Films', text: 'Sixty seconds to three minutes, built for the big screen and the small one.' },
    { name: 'Idents & Packaging', text: 'Channel idents, stings and broadcast toolkits that hold a schedule together.' },
    { name: 'Finishing & Grade', text: 'Online, conform and Dolby Vision HDR grade — in-house, signed off in the suite.' },
  ],

  directors: [
    { name: 'Adaeze Okafor', role: 'Director — Title Design', note: 'Type as cinematography. Twelve main-title sequences and counting.' },
    { name: 'Marco Reyes', role: 'Director — Live Action & CGI', note: 'Shoots the plates, then builds entire worlds around them.' },
    { name: 'Yuki Tanaka', role: 'Director — 3D & Idents', note: 'Procedural systems and impossible materials, on impossible deadlines.' },
    { name: 'Priya Nair', role: 'Design Director', note: 'Owns the boards-to-screen pipeline and the studio’s type shelf.' },
  ],

  kit: 'In-house: 4K cinema cameras, a motion-control rig, a full CGI farm and DaVinci suites with Dolby Vision mastering. We shoot, animate and finish under one roof — nothing leaves the building until the grade is signed off.',

  process: [
    { name: 'Treatment', text: 'A written, boarded response within five working days. Frames and references, not adjectives — a plan you can hold.' },
    { name: 'Design', text: 'Style frames, type tests and animatics. You approve pictures, not promises.' },
    { name: 'Production', text: 'Shoot, animate, simulate. Weekly cuts on one shared timeline, no surprises in week six.' },
    { name: 'Delivery', text: 'Online, grade, mix and masters for broadcast, cinema and social — every ratio, one sign-off.' },
  ],

  contact: {
    eyebrow: 'New business',
    title: 'REQUEST A TREATMENT',
    text: 'Tell us the film you need. A director replies within two working days — with thoughts, not a rate card.',
    email: `hello@${kela.domain}`,
    phone: '+1 323 555 0148',
    projectTypes: ['Title sequence', 'Brand film', 'Ident / packaging', 'CGI / VFX', 'Something else'],
    budgetBands: ['Under $25k', '$25–75k', '$75–200k', '$200k+'],
    submit: 'Send the brief',
    sentNote: 'Your brief is ready in your email app — hit send and a director will reply within two working days.',
  },

  footer: {
    line: `© 2026 ${kela.name}. All films are the property of their respective clients.`,
    colophon: 'Set in Anton & Manrope · Cut at 24 fps',
  },
};
