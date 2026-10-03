/* Kela Estates (brand from _shared/brand.js) — content model. Prices are numbers in INR, rendered via price(). */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    project: `${kela.name} — Tower A`,
    location: 'Whitefield, Bengaluru',
  },
  nav: [
    { href: '#listings', label: 'Listings' },
    { href: '#plans', label: 'Floor Plans' },
    { href: '#neighbourhood', label: 'Neighbourhood' },
    { href: '#contact', label: 'Contact' },
  ],
  ticker: {
    released: 214,
    sold: 196,
    // unitsLeft derived: released - sold
    label: 'Units left in Tower A',
  },
  hero: {
    eyebrow: 'Whitefield, Bengaluru — Tower A · 24 floors',
    title: kela.name,
    sub: '214 homes stacked tight and finished clean. No wasted square feet, no vague brochures — floor, facing, and price, up front.',
    cta: 'View the listings',
    ctaHref: '#listings',
    stats: [
      { value: '₹1.18 Cr', label: 'Starting price' },
      { value: '₹9,958', label: 'Avg. per sq ft' },
      { value: '24', label: 'Floors, Tower A' },
      { value: 'Dec 2027', label: 'Handover' },
    ],
  },
  filters: {
    bhk: ['All', '2', '3'],
    facing: ['All', 'East', 'West', 'North'],
    price: [
      { id: 'all', label: 'Any price', max: Infinity },
      { id: 'u140', label: 'Under ₹1.40 Cr', max: 14000000 },
      { id: 'u180', label: 'Under ₹1.80 Cr', max: 18000000 },
    ],
  },
  /* Showcase units, floor by floor. imgKey maps to Img keys product-0..2. */
  units: [
    { code: 'A-0503', bhk: 2, area: 1185, floor: 5, facing: 'East', price: 11800000, imgKey: 'product-0', plan: 's', note: 'Garden-deck level. East light through the living wall by 8 am.' },
    { code: 'A-0902', bhk: 2, area: 1220, floor: 9, facing: 'West', price: 12400000, imgKey: 'product-1', plan: 's', note: 'Corner unit. West sunsets over the Whitefield skyline.' },
    { code: 'A-1204', bhk: 3, area: 1560, floor: 12, facing: 'East', price: 16800000, imgKey: 'product-2', plan: 'm', note: 'The workhorse 3BHK. Kitchen runs the full east wall.' },
    { code: 'A-1501', bhk: 3, area: 1610, floor: 15, facing: 'North', price: 17600000, imgKey: 'product-0', plan: 'm', note: 'North light all day — the one architects keep asking about.' },
    { code: 'A-1904', bhk: 3, area: 1745, floor: 19, facing: 'East', price: 19500000, imgKey: 'product-1', plan: 'l', note: 'Sky-deck adjacency. Sunrise clears the parapet at 6:12 am.' },
    { code: 'A-2102', bhk: 2, area: 1150, floor: 21, facing: 'West', price: 12800000, imgKey: 'product-2', plan: 's', note: 'Compact 2BHK, full-height glazing, zero corridor waste.' },
    { code: 'A-2203', bhk: 3, area: 1690, floor: 22, facing: 'East', price: 19200000, imgKey: 'product-0', plan: 'l', note: 'One floor below the crown. Double-height balcony cut.' },
    { code: 'A-2301', bhk: 2, area: 1205, floor: 23, facing: 'North', price: 13400000, imgKey: 'product-1', plan: 's', note: 'Penultimate floor. The quietest slab in the tower.' },
  ],
  plans: [
    {
      id: 's', name: 'Type S — 2BHK', area: '1,150–1,220 sq ft',
      from: 11800000, imgKey: 'product-0',
      alt: 'Apartment balcony at dusk, warm interior light spilling out, city lights beyond',
      desc: 'Two beds, two baths, one long living wall of glass. Corridor kept to 4% of carpet area.',
      specs: [['Carpet area', '1,150–1,220 sq ft'], ['Balcony', '92 sq ft'], ['Ceiling', '3.1 m'], ['Facing', 'East / West / North']],
    },
    {
      id: 'm', name: 'Type M — 3BHK', area: '1,560–1,610 sq ft',
      from: 16800000, imgKey: 'product-1',
      alt: 'Efficient modern living room with floor-to-ceiling windows in clear daylight',
      desc: 'Three beds, utility bay, kitchen on the light wall. The family default.',
      specs: [['Carpet area', '1,560–1,610 sq ft'], ['Balcony', '118 sq ft'], ['Ceiling', '3.1 m'], ['Facing', 'East / North']],
    },
    {
      id: 'l', name: 'Type L — 3BHK Sky', area: '1,690–1,745 sq ft',
      from: 19200000, imgKey: 'product-2',
      alt: 'Warm minimal kitchen in morning light, clean stone and timber surfaces',
      desc: 'Top-band 3BHK with double-height balcony cut and sky-deck access.',
      specs: [['Carpet area', '1,690–1,745 sq ft'], ['Balcony', '164 sq ft'], ['Ceiling', '3.1 m / 6.2 m cut'], ['Facing', 'East']],
    },
  ],
  neighbourhood: {
    eyebrow: 'The grid',
    title: 'Whitefield, measured.',
    intro: 'Distances are drive times at 9 am on a weekday. We measured them; we will show you the logs on a site visit.',
    rows: [
      { place: 'Whitefield Metro, Purple Line', time: '8 min', note: '1.9 km — last-mile e-rickshaw bay at gate' },
      { place: 'Forum Neighbourhood Mall', time: '6 min', note: 'Daily groceries, multiplex, clinic' },
      { place: 'ITPL / Brigade Tech Gardens', time: '12 min', note: 'The commute this tower was built for' },
      { place: 'HAL Airport (old)', time: '25 min', note: 'Via Old Airport Road, off-peak' },
      { place: 'Ekya / Deens Academy schools', time: '10 min', note: 'Two ICSE/CBSE options inside 4 km' },
      { place: 'Manipal Hospital, Whitefield', time: '9 min', note: 'Multi-speciality, 24×7 emergency' },
    ],
    bars: [
      { label: 'Connectivity', value: 92 },
      { label: 'Walkability', value: 74 },
      { label: 'Green cover', value: 68 },
    ],
  },
  contact: {
    eyebrow: 'Enquire',
    title: 'Talk numbers, not brochures.',
    address: `${kela.name} Experience Centre, ITPL Main Road, Whitefield, Bengaluru 560066`,
    phone: '+91 80 4719 2200',
    email: `hello@${kela.domain}`,
    hours: 'Open every day, 10 am – 7 pm. Site visits on the hour.',
    rera: 'RERA No. PRM/KA/RERA/1251/446/PR/2026/009314 — details at rera.karnataka.gov.in',
  },
  footer: {
    line: `${kela.name} — Tower A. Built tight, priced straight.`,
    colophon: 'Prices are indicative and exclude stamp duty, registration, and GST as applicable. Floor plans are schematic.',
  },
};
