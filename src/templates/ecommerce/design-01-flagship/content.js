import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'The flagship collection',
  },
  nav: [
    { label: 'The Lineup', href: '#products' },
    { label: 'Craft', href: '#craft' },
    { label: 'Shipping & Care', href: '#care' },
  ],
  hero: {
    eyebrow: 'Flagship · Mumbai',
    title: 'Four pieces. One quiet room.',
    sub: 'Our flagship collection, hung like an exhibition. Each piece numbered, made in small batches, and shown under a single light — the way it deserves.',
    cta: 'Enter the gallery',
    ctaHref: '#products',
  },
  products: [
    {
      no: '01',
      name: 'The Sculpted Tote',
      price: 24500,
      desc: 'Full-grain leather, hand-pleated over three days and finished with a bronze clasp. Ages like a good story.',
      detail: 'Full-grain calf leather · hand-pleated · bronze clasp',
    },
    {
      no: '02',
      name: 'The Silk Twill Scarf',
      price: 8900,
      desc: 'Pure silk twill, hand-rolled edges, printed with our archive paisley in bronze on ivory.',
      detail: '100% silk twill · hand-rolled · 90 × 90 cm',
    },
    {
      no: '03',
      name: 'The Stoneware Vessel',
      price: 6400,
      desc: 'Wheel-thrown stoneware with a crackle glaze, fired in small kiln batches. No two pieces alike.',
      detail: 'Hand-thrown stoneware · crackle glaze · 22 cm',
    },
    {
      no: '04',
      name: 'The Cashmere Throw',
      price: 18200,
      desc: 'Two-ply cashmere, woven on slow looms and brushed twice for a surface like warm stone.',
      detail: '100% cashmere · slow-loom woven · 140 × 200 cm',
    },
  ],
  craft: {
    eyebrow: 'The craft',
    title: 'Made slowly, on purpose.',
    body: [
      `Every ${kela.name} piece begins as a drawing pinned to the studio wall, and ends only when the maker signs off on it. We cut leather in single hides, throw clay one vessel at a time, and weave cashmere on looms that refuse to hurry.`,
      'Batches are small — rarely more than two hundred of anything. When a piece leaves the studio, it is wrapped by hand, ribboned in bronze, and sealed with wax. That is the whole philosophy: fewer things, finished properly.',
    ],
    points: [
      { title: 'Small batches', text: 'Rarely more than two hundred of any piece.' },
      { title: 'Signed by hand', text: 'Each maker signs the work before it leaves the studio.' },
      { title: 'Materials, traceable', text: 'Full-grain leather, pure silk, hand-thrown clay, two-ply cashmere.' },
    ],
  },
  care: {
    eyebrow: 'Shipping & care',
    title: 'Looked after, door to door.',
    items: [
      {
        title: 'Complimentary shipping',
        text: 'Free insured shipping across India on every flagship piece. Dispatched in 48 hours.',
      },
      {
        title: 'The packaging ritual',
        text: 'Bone box, bronze ribbon, tissue, wax seal — every order arrives like an unveiling.',
      },
      {
        title: 'Care for life',
        text: 'Leather conditioning, silk pressing and ceramic repair guidance, free for the life of the piece.',
      },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 22 4890 4567',
    address: '14 Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Tuesday – Sunday · 11:00 AM – 8:00 PM',
  },
  footer: {
    line: `${kela.name} — the flagship collection, Mumbai.`,
    colophon: 'Set in Cormorant Garamond & Inter. Shown under one light.',
  },
};
