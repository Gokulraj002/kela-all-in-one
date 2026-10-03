import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Volume 04 — the burst drop' },
  nav: [
    { label: 'The Drop', href: '#products' },
    { label: 'Size Guide', href: '#guide' },
    { label: 'Restock', href: '#restock' },
  ],
  ticker: [
    'DROP 04 — LIVE NOW',
    'FREE SHIPPING OVER ₹2,000',
    'MIDNIGHT CUT-OFF',
    'NO RESTOCKS',
    '4 PIECES ONLY',
    'PAY ON DELIVERY',
  ],
  hero: {
    eyebrow: 'Volume 04 · The burst drop · 4 pieces only',
    title: 'GONE BY MIDNIGHT.',
    sub: 'Four pieces. One run. When the timer hits zero the shutters come down — no restocks, no reprints, no second chances.',
    cta: 'SHOP THE DROP',
    ctaHref: '#products',
    countdownLabel: 'Drop closes in',
    midnightNote: 'Ends tonight at midnight, local time.',
  },
  products: [
    {
      name: "Court Classic '84 Sneaker",
      price: 9999,
      msrp: 12999,
      desc: 'Full-grain leather, ink-black panels, volt lace-tag. Court silhouette, street sole.',
      badge: 'BEST SELLER',
      sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
      imgKey: 'hero',
      alt: 'Off-white and ink-black sneaker with a volt-orange tag bursting out of a shoebox, tissue paper exploding upward in hard light',
    },
    {
      name: 'Heavyweight Boxy Tee',
      price: 2499,
      msrp: 3299,
      desc: '240 GSM combed cotton, dropped shoulders, boxy cut. Pre-shrunk, garment-dyed ink black.',
      badge: '240 GSM',
      sizes: ['S', 'M', 'L', 'XL'],
      imgKey: 'product-0',
      alt: 'Flat-lay of the drop kit on bone concrete: folded ink-black tee, cargo pant and a sneaker with volt-orange laces, hard shadows',
    },
    {
      name: 'Cargo Utility Pant',
      price: 5499,
      msrp: 7299,
      desc: 'Six-pocket ripstop cargo, bar-tacked stress points, adjustable hems. Built to be lived in.',
      badge: '6 POCKETS',
      sizes: ['28', '30', '32', '34', '36'],
      imgKey: 'product-1',
      alt: 'Stack of drop shoeboxes with a volt-orange shipping label and tissue paper, hard diagonal shadows on a bone wall',
    },
    {
      name: 'Ripstop Coach Jacket',
      price: 11999,
      msrp: 14999,
      desc: 'Water-resistant ripstop shell, volt zip pulls, snap collar. The outer layer of the drop.',
      badge: 'WATER-RESISTANT',
      sizes: ['S', 'M', 'L', 'XL'],
      imgKey: 'product-2',
      alt: 'Ink-black ripstop coach jacket with volt-orange zip pull draped on a weathered bone-and-concrete urban wall, hard sunlight',
    },
  ],
  guide: {
    eyebrow: 'No exchanges on drop pieces',
    title: 'Get the size right.',
    body: 'Drop pieces are final sale — check the chart twice, buy once. Our cuts run true with a street fit: roomy where it counts, clean everywhere else.',
    rows: [
      { size: 'S', chest: '38"', length: '27"', waist: '28"' },
      { size: 'M', chest: '40"', length: '28"', waist: '30"' },
      { size: 'L', chest: '42"', length: '29"', waist: '32"' },
      { size: 'XL', chest: '44"', length: '30"', waist: '34"' },
    ],
    note: 'Sneakers run true to UK size. Between sizes? Take the larger one.',
    faqs: [
      {
        q: 'When does my order ship?',
        a: 'Drop orders pack within 48 hours and ship tracked, free over ₹2,000. Metro cities land in 2–4 days; everywhere else in 4–7.',
      },
      {
        q: 'Can I return or exchange?',
        a: 'Drop pieces are final sale — that is what keeps the run limited and the resale honest. Size swaps are possible within 7 days if your size is still in the warehouse, but we cannot promise it.',
      },
      {
        q: 'Will there be a restock?',
        a: 'No. When a piece sells out it is gone. Join the restock list below and you will hear about Volume 05 first — never about a reprint of this one.',
      },
      {
        q: 'Is pay on delivery available?',
        a: 'Yes — COD is live on every drop order, plus UPI and cards at checkout. No advance needed to lock your piece.',
      },
    ],
  },
  restock: {
    eyebrow: 'Volume 05 loading',
    title: 'MISS THIS, CATCH THE NEXT.',
    body: 'Drop 04 will not come back. Leave your email and you get the Volume 05 lookbook a full day before the public timer starts.',
    placeholder: 'you@example.com',
    cta: 'GET THE ALERT',
    success: 'You are on the list. Watch your inbox — Volume 05 lands first for you.',
    sideAlt: 'Hands pulling tissue paper from a drop box to reveal the sneakers inside, hard light and dust in the beam',
  },
  contact: {
    email: `drop@${kela.domain}`,
    phone: '+91 80 4719 0404',
    address: '04 Residency Road, Bengaluru 560025',
    hours: 'Drop desk: 10 AM – 8 PM IST',
  },
  footer: {
    line: `${kela.name} — Volume 04, the burst drop. Designed loud, shipped fast.`,
    demo: 'Demo storefront — no real orders are processed.',
    colophon: 'Set in Space Grotesk & Inter. Printed on bone, stamped in volt.',
  },
};
