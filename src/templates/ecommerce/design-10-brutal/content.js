import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Workwear inventory unit' },
  nav: [
    { label: 'Stock', href: '#products' },
    { label: 'Shipping', href: '#shipping' },
    { label: 'Fine Print', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Inventory unit 10 — Est. 2026',
    title: 'Stock. Not stories.',
    sub: 'Four lines of workwear. Struck-through prices. 24-hour dispatch. This is the whole store — nothing else to scroll past.',
    cta: 'Check the ledger',
    ctaHref: '#products',
    note: 'Loop: Unit 10 conveyor, shift B. Parcels move, prices drop.',
  },
  ticker: [
    'Flat ₹149 shipping',
    'Dispatch in 24h',
    'Sale prices live',
    "4 products. That's the whole store",
    'No restocks announced',
    'Built for work',
  ],
  products: [
    {
      name: 'Utility Work Jacket',
      sku: 'KS-JKT-01',
      price: 4800,
      sale: 4100,
      sizes: 'S–XXL',
      stock: 42,
      desc: '12oz canvas. Triple-stitched. Does not care about fashion.',
    },
    {
      name: 'Steel-Toe Boots',
      sku: 'KS-BTS-02',
      price: 7200,
      sale: 6400,
      sizes: 'UK 6–11',
      stock: 27,
      desc: 'Steel toe. Oil-resistant sole. Drop things on them.',
    },
    {
      name: 'Canvas Tool Roll',
      sku: 'KS-TRL-03',
      price: 1900,
      sale: 1500,
      sizes: 'One size',
      stock: 118,
      desc: '18oz waxed canvas. 10 pockets. Roll it. Tie it. Go.',
    },
    {
      name: 'Heavyweight Hoodie',
      sku: 'KS-HDD-04',
      price: 3400,
      sale: 2900,
      sizes: 'M–XXL',
      stock: 63,
      desc: '480 GSM fleece. Boxy. Built for cold warehouses.',
    },
  ],
  ledger: {
    eyebrow: 'The ledger',
    title: 'Four lines. Live count.',
    note: 'Scroll fast — the ledger shuffles. Every shuffle strikes the price down. Sorting re-cuts the table. Nothing here eases.',
  },
  visual: {
    eyebrow: 'Stock check',
    title: 'Photographed, not rendered.',
    frames: [
      { sku: 'KS-JKT-01', label: 'Utility Work Jacket — in frame' },
      { sku: 'KS-BTS-02', label: 'Steel-Toe Boots — in frame' },
      { sku: 'KS-TRL-03 / KS-HDD-04', label: 'Crated units — sealed stock' },
      { sku: 'SCAN-ALL', label: 'Barcode macro — every unit scanned' },
    ],
  },
  shipping: {
    eyebrow: 'Shipping manifest',
    title: 'No-BS shipping.',
    lines: [
      { term: 'Cut-off', text: '18:00 IST — order by 6 PM, ships the same day.' },
      { term: 'Dispatch', text: '24 hours. No excuses, no "processing" black hole.' },
      { term: 'Flat rate', text: '₹149. One rate. Everywhere in India.' },
      { term: 'Free shipping', text: 'Orders over ₹5000. Automatically. No code.' },
      { term: 'Returns', text: '7 days. Unworn. No questions, no forms in triplicate.' },
      { term: 'Tracking', text: 'Live. Barcode scanned at every hand-off.' },
    ],
  },
  contact: {
    email: `crew@${kela.domain}`,
    phone: '+91 80 4719 2210',
    address: 'Unit 10, Plot 44, Peenya Industrial Area, Bengaluru 560058',
    hours: 'Mon–Sat, 09:00–18:00 IST',
  },
  footer: {
    line: `© 2026 ${kela.name} — workwear inventory unit.`,
    colophon: 'Set in Archivo + Space Mono. No decoration was harmed.',
  },
};
