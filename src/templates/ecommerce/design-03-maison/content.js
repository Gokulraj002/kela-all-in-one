import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Atelier of quiet luxury' },
  nav: [
    { label: 'Collection', href: '#products' },
    { label: 'Atelier', href: '#story' },
    { label: 'Concierge', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Nº 03 — The Winter Salon',
    title: 'Silence, tailored.',
    sub: 'Four pieces. One winter salon. Nothing is shown until it is ready to be seen.',
    cta: 'Enter the Collection',
    ctaHref: '#products',
    ctaSecondary: 'The Atelier',
    ctaSecondaryHref: '#story',
    hint: 'Scroll — the veil lifts',
  },
  products: [
    {
      name: 'Nuit Silk Gown',
      price: 86000,
      desc: 'Hand-rolled mulberry silk, cut on the bias. Drapes like dusk and holds like a secret.',
      note: 'Nº 01 — The Gown',
    },
    {
      name: 'Héritage Watch',
      price: 145000,
      desc: 'Calibre 72, champagne indices on a smoked dial. Thirty-eight hours of reserve, a lifetime of evenings.',
      note: 'Nº 02 — The Instrument',
    },
    {
      name: 'Caviar Leather Clutch',
      price: 58000,
      desc: 'Grained calfskin with a hand-set champagne clasp. Carries the essentials and nothing else.',
      note: 'Nº 03 — The Companion',
    },
    {
      name: 'Ambre Parfum',
      price: 19500,
      desc: 'Smoked amber, black oud, a trace of vanilla. Fifty millilitres, worn close.',
      note: 'Nº 04 — The Scent',
    },
  ],
  spreads: [
    {
      eyebrow: 'The Collection — I',
      caption: 'Revealed first, because everything else is measured against it.',
      products: [0],
    },
    {
      eyebrow: 'The Collection — II',
      caption: 'Instruments of the evening, unveiled as a pair.',
      products: [1, 2],
    },
    {
      eyebrow: 'The Collection — III',
      caption: 'The last thing they remember.',
      products: [3],
    },
  ],
  story: {
    eyebrow: 'The Atelier',
    title: 'An atelier, not a store.',
    body: [
      `${kela.name} keeps a single salon and a single atelier. The gowns are cut in-house, the watches are regulated by one watchmaker, and the parfum is blended in batches of two hundred. We make few things, slowly, and we stand behind every one of them.`,
      'Nothing here is seasonal. A piece leaves the salon only when the maison is certain it will outlive the evening it was bought for.',
    ],
    quote: '“Luxury is the absence of noise — in the room, in the cloth, in the gesture.”',
    quoteBy: 'The founder’s notebook, first page',
    figureCaption: 'Ambre Parfum, still life — the atelier table at midnight',
  },
  promise: [
    { title: 'Private courier', text: 'Delivered by hand, in unmarked packaging, at an hour of your choosing.' },
    { title: 'Certified authenticity', text: 'Every piece is registered to its owner and carries the maison’s seal.' },
    { title: 'Lifetime care', text: 'Silk, leather and movements are serviced by the atelier, forever.' },
  ],
  contact: {
    eyebrow: 'Concierge',
    title: 'At your service, privately.',
    body: 'Appointments are held in the salon or over a private call. Tell us the occasion; we will bring the pieces.',
    email: `concierge@${kela.domain}`,
    phone: '+91 22 4890 7788',
    address: '14 Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Tuesday – Sunday · 11 AM – 8 PM · By appointment',
    cta: 'Write to the concierge',
  },
  footer: {
    line: `${kela.name} — atelier of quiet luxury, Fort, Mumbai.`,
    colophon: 'Set in Cormorant Garamond & Manrope. Printed, more or less, in champagne on near-black.',
  },
};
