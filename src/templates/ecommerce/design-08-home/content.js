import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

/* Kela Store home (brand from _shared/brand.js) — all editable copy, products and section data. */
export const content = {
  brand: { name: kela.name, tagline: 'Furniture & homeware for slow mornings' },
  nav: [
    { label: 'Rooms', href: '#products' },
    { label: 'Materials', href: '#craft' },
    { label: 'Guides', href: '#gallery' },
    { label: 'Delivery', href: '#contact' },
  ],
  hero: {
    eyebrow: 'The autumn collection — made to be lived with',
    title: 'A home that holds you.',
    sub: 'Four honest pieces — linen, clay, wool and oak — staged in the rooms they were made for. Scroll to drift through the room; every piece you meet is yours to take home.',
    cta: 'Step inside the room',
    ctaHref: '#products',
    ctaSecondary: 'Our materials',
    ctaSecondaryHref: '#craft',
  },
  /* imgKey maps to the platform upload keys: product-0 → product-1.jpg,
     product-1 → product-2.jpg, product-2 → product-3.jpg, detail → detail.jpg */
  products: [
    {
      name: 'Linen Armchair',
      price: 42000,
      badge: 'Bestseller',
      desc: 'Deep-seated and softening with every year. Belgian flax over a solid oak frame — the chair every room gathers around.',
      material: 'Belgian linen · solid oak',
      imgKey: 'product-0',
      room: 'The gathering room',
    },
    {
      name: 'Stoneware Dinner Set',
      price: 8600,
      badge: 'Hand-thrown',
      desc: 'Sixteen pieces, each one a little different. High-fired stoneware in cream and clay — glazed inside, raw outside.',
      material: 'Fired clay · food-safe glaze',
      imgKey: 'detail',
      room: 'The sunlit kitchen',
    },
    {
      name: 'Wool Area Rug',
      price: 19500,
      badge: 'Hand-loomed',
      desc: 'Three metres of undyed wool, loomed the slow way. Warm underfoot, and quiet under everything.',
      material: 'Undyed wool · cotton warp',
      imgKey: 'product-1',
      room: 'The restful bedroom',
    },
    {
      name: 'Oak Side Table',
      price: 14200,
      badge: 'Solid oak',
      desc: 'One plank, four legs, no shortcuts. Holds the lamp, the book and the evening tea.',
      material: 'Solid oak · natural oil',
      imgKey: 'product-2',
      room: 'Everywhere, honestly',
    },
  ],
  /* Dolly visit order through the living-room scene (product indices). */
  dolly: [0, 2, 3, 1],
  hotspots: {
    0: { x: 13, y: 50 },
    2: { x: 50, y: 80 },
    3: { x: 84, y: 58 },
    1: { x: 62, y: 36 },
  },
  materials: [
    {
      name: 'Belgian Linen',
      tone: 'Natural flax',
      story:
        'Woven from long-staple flax and washed soft before it ever meets a chair. It wrinkles beautifully and ages like a good letter.',
      products: 'Linen Armchair',
    },
    {
      name: 'Fired Clay',
      tone: 'Terracotta & cream',
      story:
        'Thrown by hand in small batches and fired high for strength. Every piece carries the maker\u2019s fingerprints — we think that\u2019s the point.',
      products: 'Stoneware Dinner Set',
    },
    {
      name: 'Hand-loomed Wool',
      tone: 'Undyed taupe',
      story:
        'Undyed wool from a single highland flock, loomed over three weeks. The colour is the sheep\u2019s; we only tidy it up.',
      products: 'Wool Area Rug',
    },
    {
      name: 'Solid Oak',
      tone: 'Honeyed grain',
      story:
        'FSC-certified oak, joined with wedged tenons and finished in natural oil. It will outlive the trends and probably you.',
      products: 'Oak Side Table · Linen Armchair frame',
    },
  ],
  guides: [
    {
      title: 'The Restful Bedroom',
      imgKey: 'product-1',
      alt: 'Sunlit bedroom vignette with an oak platform bed and a hand-loomed wool area rug beneath it',
      body: 'Keep the palette quiet and the textures loud. Layer wool underfoot and linen where you sleep; the room does the resting for you.',
      product: 2,
    },
    {
      title: 'The Sunlit Kitchen',
      imgKey: 'product-2',
      alt: 'Warm kitchen detail with open oak shelves of stoneware and a small oak side table in the morning light',
      body: 'Keep stoneware where the morning light lands. Open shelves turn the everyday — the bowl, the cup — into the decoration.',
      product: 1,
    },
    {
      title: 'The Gathering Room',
      imgKey: 'hero',
      alt: 'Styled living room in warm sunlight with a linen armchair, wool rug, oak side table and stoneware on the sideboard',
      body: 'One deep chair, one low table, room for the dog. Everything within reach of the evening light.',
      product: 0,
    },
  ],
  delivery: {
    eyebrow: 'Delivery & care',
    title: 'Brought in gently, kept for decades.',
    items: [
      {
        title: 'White-glove delivery',
        text: 'Two people, soft blankets, placed exactly where you want it. Packaging taken away with us.',
      },
      {
        title: '30-day home trial',
        text: 'Live with it for a month. If the chair doesn\u2019t earn its corner, we collect it free.',
      },
      {
        title: '5-year craft warranty',
        text: 'Joints, weaves and glazes — covered. If our making fails, our workshop fixes it.',
      },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 80 4890 5678',
    address: '22, 4th Cross, Indiranagar, Bengaluru 560038',
    hours: 'Tue – Sun · 10 AM – 8 PM',
    note: 'Our studio is a converted printing press — come for the furniture, stay for the light.',
  },
  footer: {
    line: `${kela.name} — furniture & homeware for slow mornings.`,
    colophon: 'Set in Fraunces & Manrope. A demo storefront — nothing here is really for sale.',
  },
};
