/* Kela Fashion (brand from _shared/brand.js) — content. Plain data; edit freely. Prices in INR numbers. */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Pure silk, poured like light',
    est: 'Est. 1998 — Kanchipuram',
  },
  nav: [
    { label: 'Collection', href: '#collection' },
    { label: 'Provenance', href: '#provenance' },
    { label: 'Drape', href: '#drape' },
    { label: 'Salon', href: '#salon' },
  ],
  hero: {
    eyebrow: 'Kanchipuram · Pure Mulberry Silk',
    title: 'Silk, poured like light.',
    sub: 'A maison for those who buy silk the way collectors buy art — one numbered loom run at a time.',
    cta: 'Shop the collection',
    zariCount: 1200,
    zariCaption: 'zari threads in every border, counted by hand',
  },
  philosophy: {
    eyebrow: 'The Philosophy',
    title: 'Silence is the aesthetic.',
    lines: [
      'We make four sarees a year. Each is woven from Grade-6A mulberry silk, edged with tested pure zari, and numbered the way editions of prints are numbered.',
      'No seasons. No sales. No noise. When a loom run is gone, it is gone — and the loom is restrung for the next.',
    ],
    stats: [
      { value: '22', unit: 'momme', label: 'silk density, every warp' },
      { value: '40', unit: 'pieces', label: 'maximum per loom run' },
      { value: '21', unit: 'days', label: 'on the loom, per saree' },
    ],
  },
  collection: {
    eyebrow: 'The Collection',
    title: 'Three silks. Nothing else.',
    sub: 'Museum spacing, on purpose. One piece per room, one room per scroll.',
    drapeCaption: 'Scroll to pour the silk.',
  },
  products: [
    {
      name: 'Chandrika',
      price: 48500,
      fabric: 'Champagne mulberry silk · 22 momme',
      zari: '4-ply pure zari, lab-tested',
      length: '6.3 m, blouse piece included',
      run: 'Loom run 07 of 40',
      imgKey: 'product-0',
      alt: 'Champagne silk pouring over hands in frozen motion, zari threads glinting',
      note: 'Our first silk. The one collectors ask for by name.',
    },
    {
      name: 'Swarnarekha',
      price: 56000,
      fabric: 'Antique-gold brocade silk · 24 momme',
      zari: '4-ply pure zari, lab-tested',
      length: '6.3 m, blouse piece included',
      run: 'Loom run 18 of 40',
      imgKey: 'product-1',
      alt: 'Gold zari brocade border and pallu in low light, intricate temple motifs',
      note: 'A heavier hand. Woven for winter weddings and old money.',
    },
    {
      name: 'Rajeshwari',
      price: 44800,
      fabric: 'Moonlight ivory silk · 20 momme',
      zari: '4-ply pure zari, lab-tested',
      length: '6.3 m, blouse piece included',
      run: 'Loom run 29 of 40',
      imgKey: 'product-2',
      alt: 'Folded ivory silk sarees stacked on black marble, sheen tracing the folds',
      note: 'The quietest silk we have ever woven. Almost no zari at all.',
    },
  ],
  provenance: {
    eyebrow: 'Provenance',
    title: 'Proof, not adjectives.',
    cards: [
      {
        title: 'The cluster',
        body: 'Woven in Kanchipuram, Tamil Nadu — on wooden pit looms that have been in the same sheds for three generations.',
      },
      {
        title: 'The silk',
        body: 'Grade-6A mulberry silk, 22–24 momme. Every warp is weighed before it is dyed; light warps never reach the loom.',
      },
      {
        title: 'The zari',
        body: 'Pure zari — silver wire gilded with gold, 4-ply. Every batch is lab-tested for metal content before weaving begins.',
      },
      {
        title: 'The mark',
        body: 'Every saree ships with its Silk Mark tag and a numbered certificate. Silk Mark O-204198. Verifiable, always.',
      },
    ],
    imgAlt: 'Extreme macro of mulberry silk weave, individual threads luminous with champagne sheen',
  },
  drape: {
    eyebrow: 'The Ritual of Draping',
    title: 'Worn slowly.',
    sub: 'A note on wearing 22 momme. Take your time — the silk will wait.',
    steps: [
      {
        num: '01',
        title: 'The tuck',
        body: 'Pleat to the right, tuck deep. Heavy silk holds its own line — do not fight it, let it fall.',
      },
      {
        num: '02',
        title: 'The pleats',
        body: 'Five pleats, no more. Each the width of your palm. The zari should land exactly at the ankle.',
      },
      {
        num: '03',
        title: 'The pallu',
        body: 'Over the left shoulder, long. In the evening, let the border catch the light — that is what it was woven for.',
      },
    ],
  },
  salon: {
    eyebrow: 'The Private Circle',
    title: 'Enter the salon.',
    body: 'Loom runs are announced to the private circle first — and most never reach the public page. Leave an address; we write rarely, and only when there is silk to show.',
    placeholder: 'Your email address',
    button: 'Request entry',
    done: 'Noted. The next loom run will find you first.',
  },
  contact: {
    email: `salon@${kela.domain}`,
    instagram: `https://instagram.com/${kela.instagram}`,
    whatsapp: `https://wa.me/919840012345?text=${encodeURIComponent(`Hello ${kela.name}`)}`,
    address: '14, Silk Weavers Lane, Kanchipuram',
    hours: 'By appointment, Tuesday to Sunday',
  },
  footer: {
    line: `${kela.name} — pure silk, poured like light.`,
    legal: `© 2026 ${kela.name}. All silks numbered. All zari tested.`,
  },
};
