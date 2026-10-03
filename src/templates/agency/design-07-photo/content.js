import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

/* Kela Studio (agency) — content. All editable copy lives here; no functions. */
export const content = {
  brand: {
    name: kela.name,
    tagline: 'A photography studio',
    est: 'Est. 2016',
    city: 'Bengaluru',
  },
  nav: [
    { label: 'Series', href: '#series' },
    { label: 'Commissions', href: '#commissions' },
    { label: 'Process', href: '#process' },
    { label: 'Studio', href: '#studio' },
  ],
  hero: {
    eyebrow: 'A photography studio · Est. 2016',
    title: 'The image is the argument',
    sub: 'Campaign, editorial and documentary photography. Shot on film, finished by hand.',
    cta: 'Book a shoot',
    ctaHref: '#contact',
    frameNote: 'Nocturnes · frame 01',
  },
  series: [
    {
      id: 'nocturnes',
      num: '01',
      title: 'Nocturnes',
      note: 'Portraits in available darkness. Nothing staged; everything waited for.',
      frames: [
        {
          key: 's1a',
          caption: 'She turned toward the window. The room went quiet.',
          tech: 'f/1.8 · 1/125 · pushed two stops',
          alt: "Cinematic chiaroscuro portrait of a woman's face half-lit by window light against a dark charcoal backdrop",
        },
        {
          key: 's1b',
          caption: "His father's Leica. Still loaded, still trusted.",
          tech: 'f/2 · 1/60 · HP5',
          alt: "Weathered hands of an old craftsman holding a film camera in dramatic side light",
        },
        {
          key: 's1c',
          caption: 'Doorway, 6:47pm. He waited for the spill.',
          tech: 'f/1.4 · 1/250 · available light',
          alt: 'A young man silhouetted against a bright doorway in a dark room, face half-lit',
        },
      ],
    },
    {
      id: 'form',
      num: '02',
      title: 'Form',
      note: 'Fashion editorials reduced to cloth, bone and a single light.',
      frames: [
        {
          key: 's2a',
          caption: 'Concrete studio, one overhead spot. Nothing else on.',
          tech: 'f/8 · 1/200 · gridded strobe',
          alt: 'Model in sculptural dark clothing under a single overhead spotlight in a concrete studio',
        },
        {
          key: 's2b',
          caption: 'Silk against the beam. Second take held.',
          tech: 'f/2.8 · 1/125',
          alt: 'Close-up of flowing dark silk catching a beam of warm light',
        },
        {
          key: 's2c',
          caption: 'The coat held the shape. We followed it.',
          tech: 'f/4 · 1/100',
          alt: 'Full-length figure in a long dark coat walking through an empty concrete gallery',
        },
      ],
    },
    {
      id: 'concrete-light',
      num: '03',
      title: 'Concrete / Light',
      note: 'Buildings photographed the way we photograph people: patiently.',
      frames: [
        {
          key: 's3a',
          caption: 'The shaft arrived at noon. We were already there.',
          tech: 'f/11 · 1/30 · tripod',
          alt: 'Vast brutalist concrete hall with a diagonal shaft of daylight and a tiny human silhouette',
        },
        {
          key: 's3b',
          caption: 'Seven turns down. The light at the bottom.',
          tech: 'f/8 · 2s · long exposure',
          alt: 'Spiral concrete staircase descending into darkness with a warm light at the bottom',
        },
        {
          key: 's3c',
          caption: 'One lit window, dusk. Waited an hour for it.',
          tech: 'f/5.6 · 1/15',
          alt: 'Weathered stone facade at dusk with a single lit window glowing',
        },
      ],
    },
    {
      id: 'after-rain',
      num: '04',
      title: 'After Rain',
      note: 'The city, ten minutes after the rain stops. Nobody performs.',
      frames: [
        {
          key: 's4a',
          caption: 'Rain stopped. The street kept the shine.',
          tech: 'f/2 · 1/60 · 35mm',
          alt: 'Rain-slicked night street with a lone figure under a streetlamp, reflections on wet asphalt',
        },
        {
          key: 's4b',
          caption: 'Last bus. One passenger.',
          tech: 'f/1.8 · 1/125 · rain on the lens',
          alt: 'Empty night bus stop with one seated figure under a humming fluorescent tube',
        },
        {
          key: 's4c',
          caption: 'Change under a bare bulb.',
          tech: 'f/2.8 · 1/80 · night market',
          alt: "Market vendor's hands exchanging change under a single bare bulb at night",
        },
      ],
    },
  ],
  commissions: [
    {
      client: 'Vesper & Co.',
      title: 'Autumn campaign',
      year: '2025',
      usage: 'Print + OOH · 12 frames',
      note: 'Shot across three mornings in one house.',
      thumb: 's2a',
      thumbAlt: 'Fashion editorial frame from the Vesper and Co. autumn campaign',
    },
    {
      client: 'Meridian Hotels',
      title: 'The quiet stay',
      year: '2025',
      usage: 'Editorial + web · 20 frames',
      note: 'Interiors at dawn, no staging, no people posed.',
      thumb: 's3a',
      thumbAlt: 'Architectural interior frame from the Meridian Hotels commission',
    },
    {
      client: 'Studio K',
      title: 'Objects, winter',
      year: '2024',
      usage: 'Lookbook · 9 frames',
      note: 'One table, one window, nine objects.',
      thumb: 's4c',
      thumbAlt: 'Still-life frame from the Studio K winter lookbook',
    },
    {
      client: 'Quarterly Journal',
      title: 'Cover story',
      year: '2024',
      usage: 'Print · 6 frames',
      note: 'Portraits of the makers, in their own rooms.',
      thumb: 's1a',
      thumbAlt: 'Portrait frame from the Quarterly Journal cover story',
    },
  ],
  process: [
    {
      step: '01',
      title: 'Brief',
      text: 'Tell us what the image must do — sell, explain, remember. We ask the rude questions early.',
    },
    {
      step: '02',
      title: 'Shoot',
      text: 'Available light first, always. Film for portraits, digital for volume. No shot lists longer than the day.',
    },
    {
      step: '03',
      title: 'Edit',
      text: 'Contact sheets, not carousels. You see everything worth seeing, graded once, honestly.',
    },
    {
      step: '04',
      title: 'Deliver',
      text: 'Finals in print and screen grades, licensed for the usage you booked. Archive kept for five years.',
    },
  ],
  studio: {
    eyebrow: 'The studio',
    title: 'Three photographers. One darkroom.',
    text: `${kela.name} is small on purpose. Every shoot is led by a partner, every print passes through our own darkroom before it leaves.`,
    photographers: [
      { name: 'A. Rao', role: 'Founder · portraits', note: 'Shoots people the way others shoot rooms: patiently.' },
      { name: 'M. Iyer', role: 'Editorial · interiors', note: 'Finds the one hour a building tells the truth.' },
      { name: 'D. Nair', role: 'Documentary', note: 'Gone before you notice the camera. Back with the frame.' },
    ],
    darkroom: {
      caption: 'The darkroom never closed.',
      text: 'B&W developed in-house. C-41 twice a week. Prints on fibre, toned by hand.',
      alt: 'Strips of 35mm film negatives held over a dim light table, sprocket holes glowing',
    },
  },
  contact: {
    eyebrow: 'Booking',
    title: 'Start with a date.',
    text: 'Tell us when, where, and what the images must do. We reply within two working days.',
    email: `shoots@${kela.domain}`,
    phone: '+91 80 4719 2200',
    fields: {
      name: 'Your name',
      email: 'Email',
      date: 'Shoot date',
      usage: 'Usage',
      usageOptions: ['Campaign', 'Editorial', 'Portrait', 'Interiors', 'Other'],
      budget: 'Budget band',
      budgetOptions: ['Under ₹1L', '₹1–3L', '₹3–8L', '₹8L+'],
      notes: 'The brief, in a few lines',
      submit: 'Send inquiry',
      hint: 'Opens your mail app with the inquiry composed — nothing is sent automatically.',
    },
  },
  footer: {
    line: 'Shot on film. Delivered digital.',
    colophon: `${kela.name} · Bengaluru · Est. 2016`,
  },
};
