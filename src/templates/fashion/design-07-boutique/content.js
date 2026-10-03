/* Kela Fashion (brand from _shared/brand.js) — design-07-boutique · content.js
   All editable text/data. Plain JSON-compatible object (no functions). */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Several designers. One gallery roof.',
  },

  nav: [
    { label: 'Designers', href: '#designers' },
    { label: 'The Edit', href: '#collection' },
    { label: 'Film', href: '#film' },
    { label: 'Styling', href: '#styling' },
    { label: 'Visit', href: '#visit' },
  ],

  hero: {
    eyebrow: 'Current exhibition',
    exhibition: 'The Draped Season — Anaïs Rao',
    dates: '12 Oct — 24 Nov 2026',
    title: 'Several designers. One gallery roof.',
    sub: 'Twelve creative voices hang side by side in our Kala Ghoda rooms — handloom modernists next to occasion ateliers. Walk the rails; the curator walks with you.',
    cta: 'Book a styling appointment',
    ctaSecondary: 'Browse the floor',
  },

  designers: {
    eyebrow: 'The roster',
    title: 'Designer rails',
    intro:
      'Each rail belongs to one designer — their fabrics, their fittings, their way of cutting. Scroll the rails and the names light up as their work passes the centre line.',
    list: [
      {
        name: 'Meera Krishnan',
        aesthetic: 'Handloom, worn modern',
        signature: 'Chanderi & Maheshwari sarees with engineered borders',
        philosophy: 'Weave first, silhouette second. A loom in Maheshwar sets the tempo of every drape.',
        priceLow: 18000,
        priceHigh: 45000,
      },
      {
        name: 'Dev Malik',
        aesthetic: 'Structured ease',
        signature: 'Bandhgalas & jacket-kurtas in handloom linen',
        philosophy: 'Tailoring without stiffness — a bandhgala you can sit cross-legged in.',
        priceLow: 14000,
        priceHigh: 32000,
      },
      {
        name: 'Anaïs Rao',
        aesthetic: 'The drape atelier',
        signature: 'Silk separates & organza overlays',
        philosophy: 'One uncut length of silk, folded until it finds its own architecture.',
        priceLow: 24000,
        priceHigh: 68000,
      },
      {
        name: 'Zoya Farooqui',
        aesthetic: 'Chikankari, re-cut',
        signature: 'Hand-embroidered mulmul kurtas & co-ords',
        philosophy: 'Lucknowi shadow-work, drafted on modern blocks so it moves with the body.',
        priceLow: 16000,
        priceHigh: 38000,
      },
      {
        name: 'Rhea Kapoor',
        aesthetic: 'Occasion, distilled',
        signature: 'Cocktail drape sets & column gowns',
        philosophy: 'Evening wear with the noise removed — line, light, and a fabric that behaves.',
        priceLow: 28000,
        priceHigh: 85000,
      },
      {
        name: 'Tara Menon',
        aesthetic: 'The modern heirloom',
        signature: 'Tissue lehengas & bridal-light ensembles',
        philosophy: 'Bridal pieces built to be re-worn — heirlooms that earn their keep twice.',
        priceLow: 45000,
        priceHigh: 120000,
      },
    ],
    note: 'Twelve designers hang in the rooms at any time. Six are spotlighted here; the full index is on the wall when you visit.',
  },

  collection: {
    eyebrow: 'Curated across designers',
    title: 'The edits',
    intro:
      'Capsules that cross the rails — the curator groups pieces by occasion and mood, never by trend. Every piece carries its maker’s name.',
    edits: [
      { id: 'all', label: 'All pieces' },
      { id: 'monsoon', label: 'The Monsoon Edit' },
      { id: 'handloom', label: 'Handloom Modernists' },
      { id: 'occasion', label: 'The Occasion Edit' },
    ],
    products: [
      {
        edit: 'handloom',
        name: 'Ivory Chanderi drape saree',
        designer: 'Meera Krishnan',
        fabric: 'Handwoven Chanderi silk · zari border',
        price: 24500,
        pick: true,
      },
      {
        edit: 'occasion',
        name: 'Rani organza overlay jacket',
        designer: 'Anaïs Rao',
        fabric: 'Silk organza · hand-rolled hems',
        price: 32000,
        pick: true,
      },
      {
        edit: 'monsoon',
        name: 'Sand-linen bandhgala',
        designer: 'Dev Malik',
        fabric: 'Handloom linen · horn buttons',
        price: 18500,
      },
      {
        edit: 'monsoon',
        name: 'Chikankari panel kurta',
        designer: 'Zoya Farooqui',
        fabric: 'Mulmul cotton · shadow-work embroidery',
        price: 14200,
      },
      {
        edit: 'occasion',
        name: 'Cocktail drape set',
        designer: 'Rhea Kapoor',
        fabric: 'Crepe silk · bias-cut skirt',
        price: 41000,
      },
      {
        edit: 'handloom',
        name: 'Heirloom tissue lehenga',
        designer: 'Tara Menon',
        fabric: 'Tissue silk · re-wearable construction',
        price: 78000,
        pick: true,
      },
    ],
  },

  film: {
    eyebrow: 'Atelier film',
    title: 'The Rail',
    body: 'Eight seconds along the workroom rail — silks brushing past, hands parting a garment, the camera settling on chalk marks and a pinned muslin toile. This is what the boutique sounds like when the shutters open.',
    note: 'Filmed in the Fort workroom, October 2026.',
  },

  styling: {
    eyebrow: 'Appointments',
    title: 'Styling, by appointment',
    intro:
      'A stylist, a rail cleared for you, and ninety minutes that start with conversation, not a cart. In-store or on video — WhatsApp us first and we will have the rails ready.',
    slots: [
      {
        name: 'Personal styling',
        detail: 'In-store · 60 min',
        desc: 'One stylist, one fitting room, rails pulled across designers to your brief.',
      },
      {
        name: 'Video consult',
        detail: 'Online · 30 min',
        desc: 'Walk the rails over video; pieces shipped with easy returns.',
      },
      {
        name: 'Occasion edit',
        detail: 'In-store · 90 min',
        desc: 'Weddings, festive, milestone evenings — a full look built across designers.',
      },
    ],
    cta: 'Book a styling appointment',
  },

  visit: {
    eyebrow: 'The space',
    title: 'Visit the rooms',
    address: '14 Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Tue – Sun · 11 am – 8 pm',
    note: 'Walk-ins welcome; appointments get the rails cleared. The workroom viewing window is open on Saturdays.',
  },

  contact: {
    email: `styling@${kela.domain}`,
    instagram: `@${kela.instagram}`,
  },

  footer: {
    line: `${kela.name} — a multi-designer boutique in Kala Ghoda, Mumbai.`,
    designersNote: 'Designers: we take on two new voices a season. Write to us with your lookbook.',
    press: `Press enquiries: press@${kela.domain}`,
    copyright: `© 2026 ${kela.name}. All pieces remain the copyright of their designers.`,
  },
};
