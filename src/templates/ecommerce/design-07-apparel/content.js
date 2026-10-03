import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'A wardrobe, edited.' },
  nav: [
    { label: 'Lookbook', href: '#products' },
    { label: 'Atelier', href: '#story' },
    { label: 'Size & Shipping', href: '#craft' },
  ],
  hero: {
    eyebrow: 'Autumn — Winter 2026 · Folio Nº 07',
    title: 'Four pieces. No noise.',
    sub: 'A lookbook, not a catalogue. Every piece cut in our Kala Ghoda atelier, made to be worn for decades and repaired for longer.',
    cta: 'Open the lookbook',
    ctaHref: '#products',
    ctaSecondary: 'The atelier story',
    ctaSecondaryHref: '#story',
  },
  /* Four folio pages. tag: { product: index into products, x/y in % } */
  looks: [
    {
      folio: '01',
      title: 'The Cut',
      quote: 'Elegance is refusal — of everything that does not earn its place.',
      cite: 'The atelier notebook, p. 14',
      imgKey: 'product-0',
      alt: 'Model wearing a tailored warm-gray wool blazer with an oxblood pocket square, dark studio backdrop',
      tags: [
        { product: 0, x: 58, y: 42, label: 'The look' },
        { product: 1, x: 30, y: 78, label: 'Worn beneath' },
      ],
    },
    {
      folio: '02',
      title: 'The Cloth',
      quote: 'Cloth remembers the hands that cut it.',
      cite: 'Master tailor’s rule, framed above the cutting table',
      imgKey: 'product-1',
      alt: 'Extreme close-up of pleated silk fabric in warm gray tones with an oxblood thread along one seam',
      tags: [{ product: 1, x: 62, y: 55, label: 'The silk' }],
    },
    {
      folio: '03',
      title: 'The Rack',
      quote: 'A wardrobe is a life, edited.',
      cite: 'Said at every fitting since 2019',
      imgKey: 'product-2',
      alt: 'Tailor’s garment rack holding wool blazers in gray, ink and oxblood in a sunlit atelier',
      tags: [
        { product: 2, x: 24, y: 34, label: 'On the rail' },
        { product: 0, x: 72, y: 52, label: 'Center rail' },
      ],
    },
    {
      folio: '04',
      title: 'The Hand',
      quote: 'Nine hours. One lapel. No shortcuts.',
      cite: 'Time card, blazer Nº 0412',
      imgKey: 'detail',
      alt: 'Tailor’s hands stitching an ink wool lapel with oxblood thread, brass thimble',
      tags: [{ product: 3, x: 55, y: 48, label: 'Finished by hand' }],
    },
  ],
  products: [
    {
      name: 'Tailored Wool Blazer',
      price: 16500,
      desc: 'Single-breasted, half-canvassed. Italian wool twill, genuine horn buttons.',
      fabric: '100% wool · 260 gsm',
      badge: 'Signature',
      imgKey: 'product-0',
      alt: 'Tailored warm-gray wool blazer look',
    },
    {
      name: 'Pleated Silk Skirt',
      price: 9800,
      desc: 'Knife pleats cut on the bias. Mulberry silk with an ink cupro lining.',
      fabric: '100% mulberry silk',
      badge: 'New',
      imgKey: 'product-1',
      alt: 'Pleated silk fabric in warm gray',
    },
    {
      name: 'Linen Overshirt',
      price: 6200,
      desc: 'Garment-dyed European flax. Cut roomy, wears softer every season.',
      fabric: '100% European flax',
      badge: null,
      imgKey: 'product-2',
      alt: 'Atelier garment rack with tailored pieces',
    },
    {
      name: 'Leather Loafers',
      price: 12400,
      desc: 'Full-grain leather, hand-stitched apron. Resoleable, guaranteed for life.',
      fabric: 'Full-grain leather',
      badge: 'Atelier made',
      imgKey: 'detail',
      alt: 'Hand-stitching detail on dark wool with oxblood thread',
    },
  ],
  sections: {
    index: {
      eyebrow: 'The index',
      title: 'Four pieces. Nothing else on the rail.',
      body: 'We make few things, slowly. Each piece below appears in the folio above — add it to your bag straight from the look, or from here.',
    },
    story: {
      eyebrow: 'The atelier',
      title: 'Eleven tailors. One cutting table. No seasons we don’t believe in.',
      body: [
        `${kela.name} began in 2019 above a frame shop in Kala Ghoda with a secondhand Juki, a cutting table, and a rule: never make anything we wouldn’t wear ourselves, every day, for ten years.`,
        'Six years on, the atelier is eleven tailors strong. We cut to order in small runs, keep every pattern on file, and repair anything we have ever sold — free, for life. That is the whole business model.',
      ],
      quote: '“Fast fashion asks what you’ll wear next month. We ask what you’ll wear in 2036.”',
      cite: 'Meher Kapoor — Founder & master tailor',
      stats: [
        { value: '11', label: 'Tailors in the atelier' },
        { value: '9 hrs', label: 'Handwork in every blazer' },
        { value: '2019', label: 'Cutting since' },
      ],
    },
    craft: {
      eyebrow: 'Size & shipping',
      title: 'Measured twice, cut once.',
      fitNote:
        'Our block runs true to size with a tailored — not tight — shoulder. Between sizes, take the larger for blazers and the smaller for skirts. Every order includes free alterations within 30 days.',
      sizes: [
        { size: 'XS', chest: '32', waist: '26', shoulder: '16.0' },
        { size: 'S', chest: '34', waist: '28', shoulder: '16.5' },
        { size: 'M', chest: '36', waist: '30', shoulder: '17.0' },
        { size: 'L', chest: '38', waist: '32', shoulder: '17.5' },
        { size: 'XL', chest: '40', waist: '34', shoulder: '18.0' },
      ],
      shipping: [
        { title: 'Dispatch', text: 'Cut-to-order pieces leave Kala Ghoda within 5 working days; ready pieces within 48 hours.' },
        { title: 'Delivery', text: 'Free across India on orders over ₹5,000. 5–7 working days, tracked door to door.' },
        { title: 'Returns', text: '30 days, unworn, no questions. Return shipping is on us.' },
        { title: 'Repairs', text: 'Lifetime repairs on everything we sell. Seams, buttons, soles — write to us.' },
      ],
    },
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 22 4890 2468',
    address: '14 Ropewalk Lane, Kala Ghoda, Mumbai 400001',
    hours: 'Tue – Sun · 11 AM – 8 PM',
  },
  footer: {
    line: `${kela.name} — a wardrobe, edited. Kala Ghoda, Mumbai.`,
    colophon: 'Set in Bodoni Moda & Inter. Bound, more or less, on warm gray.',
  },
};
