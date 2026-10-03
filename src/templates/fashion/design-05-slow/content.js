/* Kela Fashion (brand from _shared/brand.js) — design-05-slow content. Plain data; all copy editable via content.js. */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: { name: kela.name, tagline: 'Grown, not made. Natural-dyed handloom.' },
  nav: ['Dye Journey', 'Collection', 'Makers', 'The Vat', 'Our Footprint'],
  hero: {
    eyebrow: 'A slow-fashion journal — est. 2019',
    title: 'Grown, not made.',
    sub: 'Natural-dyed handloom from Bagru, Kutch and Kanchipuram. Dyed with roots, bark and leaf — made slowly, worn for decades.',
    cta: 'Shop consciously',
    caption: 'Indigo handloom in a Kutch cotton field, first light',
  },
  journey: {
    eyebrow: 'Chapter one — colour',
    title: 'The dye journey',
    body: 'Four colourways, one living vat system. Follow each band from plant to cloth — days counted, water accounted, nothing hidden.',
    bands: [
      {
        key: 'indigo',
        name: 'Indigo Vat',
        source: 'Indigofera tinctoria',
        swatch: '#2E4763',
        shade: 'Deep sea blue',
        days: '12 days · 6 dips',
        water: '9 L per metre',
        notes:
          'The vat lives. Fermented leaf, reduced and patient — yarn enters green and breathes itself blue in the air. Six dips for the depth we promise.',
      },
      {
        key: 'madder',
        name: 'Madder Root',
        source: 'Rubia cordifolia',
        swatch: '#9C4F2A',
        shade: 'Rust red',
        days: '9 days · root boil',
        water: '11 L per metre',
        notes:
          'Dug, dried and boiled slow — madder gives the rust we are named for. Iron mordant deepens it; patience decides the shade, not chemistry.',
      },
      {
        key: 'turmeric',
        name: 'Turmeric',
        source: 'Curcuma longa',
        swatch: '#C08A2D',
        shade: 'Harvest gold',
        days: '4 days · root dye',
        water: '6 L per metre',
        notes:
          'Fresh turmeric from the farm rows behind our Kutch shed. A bright, honest gold that asks to be reworn, remended and loved long.',
      },
      {
        key: 'undyed',
        name: 'Undyed Kora',
        source: 'No dye at all',
        swatch: '#D8C9A3',
        shade: 'Raw cotton',
        days: '0 days · unbleached',
        water: '0 L added',
        notes:
          'The colour of restraint. Unbleached kora cotton, exactly as the boll gave it — our quietest colourway and our most honest one.',
      },
    ],
  },
  products: [
    {
      name: 'Neel Saree', price: 9800, dye: 'Indigo · 6 dips',
      fabric: 'Handloom cotton', days: '34 days', maker: 'Lakshmi, Kanchipuram',
      desc: 'Six-dip indigo handloom saree with a kora border, woven over five weeks.',
      cost: { materials: 2100, wages: 5600, dye: 900, studio: 1200 },
    },
    {
      name: 'Manjistha Kurta Set', price: 6400, dye: 'Madder root',
      fabric: 'Handloom cotton', days: '21 days', maker: 'Meera, Kutch',
      desc: 'Rust-red madder kurta with hand-spun yarn, cut roomy and true.',
      cost: { materials: 1500, wages: 3600, dye: 600, studio: 700 },
    },
    {
      name: 'Bagru Wrap Dress', price: 7500, dye: 'Indigo dabu',
      fabric: 'Handloom cotton', days: '26 days', maker: 'Ramji Bhai, Bagru',
      desc: 'Mud-resist dabu block print from Bagru, dyed indigo after printing.',
      cost: { materials: 1800, wages: 4300, dye: 800, studio: 600 },
    },
    {
      name: 'Haldi Dupatta', price: 2900, dye: 'Turmeric',
      fabric: 'Mulmul cotton', days: '9 days', maker: 'Meera, Kutch',
      desc: 'Harvest-gold turmeric dupatta — featherlight, sun-cured, unhurried.',
      cost: { materials: 700, wages: 1600, dye: 300, studio: 300 },
    },
    {
      name: 'Dabu Block Shirt', price: 3800, dye: 'Indigo dabu',
      fabric: 'Handloom cotton', days: '14 days', maker: 'Yusuf, Bagru',
      desc: 'Hand-carved block motifs pressed one by one; no two shirts match.',
      cost: { materials: 900, wages: 2200, dye: 400, studio: 300 },
    },
    {
      name: 'Kora Undyed Tunic', price: 4200, dye: 'Undyed',
      fabric: 'Raw kora cotton', days: '16 days', maker: 'Lakshmi, Kanchipuram',
      desc: 'Unbleached, undyed, unhurried — the quietest piece we make.',
      cost: { materials: 1000, wages: 2500, dye: 0, studio: 700 },
    },
    {
      name: 'Ajrakh Scarf', price: 1850, dye: 'Madder + indigo',
      fabric: 'Handloom cotton', days: '11 days', maker: 'Ramji Bhai, Bagru',
      desc: 'Two-vat ajrakh rhythm — madder rust over indigo, sixteen stages.',
      cost: { materials: 450, wages: 1050, dye: 200, studio: 150 },
    },
    {
      name: 'Mend & Repair Kit', price: 950, dye: 'All dyes',
      fabric: 'Sashiko kit', days: 'Made to mend',
      maker: `${kela.name} studio, Kutch`,
      desc: 'Threads, needles and a visible-mending guide — wear it for decades.',
      cost: { materials: 350, wages: 400, dye: 0, studio: 200 },
    },
  ],
  artisans: [
    {
      name: 'Ramji Bhai',
      role: 'Indigo dyer · Bagru, Rajasthan',
      img: 'product-0',
      quote: 'The vat knows when you hurry. I do not hurry.',
      wage: '₹1,400 per day · paid weekly',
    },
    {
      name: 'Lakshmi',
      role: 'Handloom weaver · Kanchipuram',
      img: 'product-1',
      quote: 'Thirty-four days on one saree. You can feel every one.',
      wage: '₹1,650 per day · paid weekly',
    },
    {
      name: 'Meera',
      role: 'Natural dye master · Kutch',
      img: 'product-2',
      quote: 'Madder, turmeric, rind — the field is our colour chart.',
      wage: '₹1,300 per day · paid weekly',
    },
  ],
  craft: {
    eyebrow: 'Chapter two — hands',
    title: 'The Vat',
    body: 'Ten seconds inside our dye shed: yarn into the indigo vat, the lift as green turns blue, a block pressed, skeins swaying to dry. No narration — the work speaks.',
    caption: 'Indigo vat, madder skeins, block print — Bagru dye shed',
  },
  impact: {
    eyebrow: 'Chapter three — account',
    title: 'Our footprint, stated plainly',
    body: 'No leaf icons, no vague claims. Just the numbers we are willing to be asked about.',
    stats: [
      { value: 214, suffix: '', label: 'Artisan families paid fairly' },
      { value: 38000, suffix: '', label: 'Litres of water saved this year' },
      { value: 11, suffix: '', label: 'Natural dye sources, all traceable' },
      { value: 62, suffix: '%', label: 'Of every rupee reaches the makers' },
    ],
    cta: 'Shop consciously',
    note: 'Free repairs for life. Take-back programme for every garment.',
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 98250 00000',
    address: `${kela.name} Studio, Bhujodi, Kutch, Gujarat`,
    hours: 'Tue–Sun · 10am–6pm IST',
  },
  footer: {
    line: `© 2026 ${kela.name}. Dyed slow, worn long.`,
    links: ['Impact report', 'Repair booking', 'Take-back programme', 'Instagram'],
  },
};
