import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Goods that give back to the ground they came from' },
  nav: [
    { label: 'Collection', href: '#products' },
    { label: 'Materials', href: '#story' },
    { label: 'Impact', href: '#impact' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'A plastic-free general store — est. 2021, Bengaluru',
    title: 'Grown, not manufactured.',
    sub: 'Everyday essentials raised from honest materials — organic cotton, bamboo, and cold-pressed botanicals — wrapped in kraft, never plastic.',
    cta: 'Walk the timeline',
    ctaHref: '#products',
    ctaSecondary: 'Our materials',
    ctaSecondaryHref: '#story',
  },
  productsIntro: {
    eyebrow: 'The collection — from seed to shelf',
    title: 'Follow the stem. Everything blooms.',
    body: 'Scroll slowly. Each product grows out of the line that raised it — the same line that runs from our partner farms to your doorstep.',
  },
  products: [
    {
      stage: 'Sown',
      name: 'Organic Cotton Tee',
      price: 1800,
      badge: 'GOTS-certified organic',
      desc: 'Cut from GOTS-certified organic cotton, grown without a drop of synthetic pesticide. Garment-dyed with pomegranate rind and iron.',
      footprint: '2,700 litres of water saved vs. conventional cotton',
      alt: 'Natural undyed organic cotton t-shirt folded on cream linen with a cotton boll, warm sunlight',
    },
    {
      stage: 'Rooted',
      name: 'Bamboo Essentials Kit',
      price: 2400,
      badge: 'FSC bamboo',
      desc: 'Toothbrush, soap dish, cotton pads and a refillable glass bottle. Bamboo regrows a metre a day — no replanting, no irrigation needed.',
      footprint: 'Replaces roughly 310 single-use plastics a year',
      alt: 'Bamboo toothbrush, soap dish, cotton pads and glass bottle arranged on a sunlit wooden tray',
    },
    {
      stage: 'Blended',
      name: 'Natural Soap Quartet',
      price: 950,
      badge: 'Cold-processed',
      desc: 'Oatmeal, charcoal, turmeric and clay — cold-processed bars with nothing you cannot pronounce and everything your skin recognises.',
      footprint: 'Zero palm oil, zero parabens, zero plastic wrap',
      alt: 'Four handmade natural soap bars of oatmeal, charcoal, turmeric and clay on kraft paper with dried lavender',
    },
    {
      stage: 'Carried',
      name: 'Recycled Tote',
      price: 1200,
      badge: '14 bottles reborn',
      desc: 'Woven from 14 reclaimed PET bottles collected off Goa\u2019s beaches. Carries 12 kg of groceries and a clear conscience.',
      footprint: '14 bottles diverted from the ocean per tote',
      alt: 'Natural-canvas recycled tote bag hanging against a sunlit cream wall with vegetables and a kraft parcel inside',
    },
  ],
  materials: {
    eyebrow: 'Material stories',
    title: 'Know what you are holding.',
    body: 'Four materials, four supply chains we can trace to the acre. Ask us anything — the farm gate is never far.',
    items: [
      {
        name: 'Organic cotton',
        text: 'Grown by 40 partner farms in Maharashtra without synthetic pesticides. Ginned, spun and stitched within 300 km of the field.',
      },
      {
        name: 'Bamboo',
        text: 'FSC-certified groves in Assam. Cut by hand, steam-treated, never bleached — a grass that behaves like hardwood.',
      },
      {
        name: 'Reclaimed PET',
        text: 'Beach-cleanup plastic from Goa\u2019s coast, flaked and rewoven into canvas tough enough for a decade of errands.',
      },
      {
        name: 'Botanical oils',
        text: 'Cold-pressed coconut, neem and shea from smallholder mills. Saponified slowly; cured for six weeks before it ships.',
      },
    ],
    imageAlt: 'Sunlit artisan refill station with glass jars of grains and botanicals, amber bottles and brass taps',
  },
  impact: {
    eyebrow: 'Our footprint, counted honestly',
    title: 'Numbers we can stand behind.',
    body: 'Audited every December by an independent third party. When a number disappoints us, we print it anyway — then fix it.',
    stats: [
      { value: 12480, suffix: ' kg', label: 'plastic kept out of landfill since 2021' },
      { value: 28300, suffix: '', label: 'native trees planted with farm partners' },
      { value: 100, suffix: ' %', label: 'of orders shipped plastic-free' },
    ],
  },
  shipping: {
    eyebrow: 'Carbon-neutral delivery',
    title: 'Kraft, twine, and a clear conscience.',
    body: 'Every parcel leaves our studio wrapped the way you saw in the film above — kraft, twine, a dried sprig. No poly mailers, ever.',
    points: [
      { name: 'Flat \u20B949 shipping', text: 'Free on orders over \u20B91,999. We consolidate parcels to cut last-mile emissions.' },
      { name: 'Carbon-neutral, always', text: 'Every delivery\u2019s footprint is measured and offset through verified reforestation.' },
      { name: 'One order, one tree', text: 'A native sapling goes into partner farmland with every parcel that leaves us.' },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 80 4719 2200',
    address: '14 Fern Lane, Indiranagar, Bengaluru 560038',
    hours: 'Studio visits: Tuesday – Saturday, 10 AM – 6 PM',
  },
  footer: {
    line: `${kela.name} — a plastic-free general store, Bengaluru.`,
    colophon: 'Set in Fraunces & Manrope. Wrapped, more or less, in kraft paper.',
  },
};
