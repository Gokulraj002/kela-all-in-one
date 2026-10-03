import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('ecommerce');

export const content = {
  brand: { name: kela.name, tagline: 'Precision gadgets, engineered' },
  nav: [
    { label: 'Lineup', href: '#products' },
    { label: 'Specs', href: '#specs' },
    { label: 'Support', href: '#support' },
  ],
  hero: {
    eyebrow: 'TECH GADGETS — 04 UNITS',
    title: 'Engineered, not decorated.',
    sub: 'Four instruments, measured to the millimetre. Every spec published, every claim bench-tested. No adjectives without numbers.',
    cta: 'View the lineup',
    ctaHref: '#products',
    ctaSecondary: 'Compare specs',
    ctaSecondaryHref: '#specs',
    readout: `${kela.name.toUpperCase()} // FIELD UNIT 06`,
    scrollHint: 'SCROLL — INITIATE SCAN',
  },
  products: [
    {
      tag: 'HP-01',
      name: 'Aria Wireless Headphones',
      price: 14999,
      badge: 'FLAGSHIP',
      desc: 'Closed-back over-ears with 40mm bio-cellulose drivers, tuned flat in an anechoic chamber.',
      callout: { x: 68, y: 44, lines: ['40MM DRIVER', 'ANC \u221242DB'] },
      specs: [
        ['Driver', '40mm bio-cellulose'],
        ['Cancellation', 'Hybrid ANC \u221242dB'],
        ['Battery', '60h (ANC on)'],
        ['Codec', 'LDAC \u00B7 AAC \u00B7 SBC'],
      ],
    },
    {
      tag: 'SW-02',
      name: 'Pulse Smart Watch',
      price: 11499,
      badge: 'NEW',
      desc: 'Titanium case, sapphire glass, and a sensor array that samples 200 times a second.',
      callout: { x: 62, y: 50, lines: ['1.85\u2033 AMOLED', '14-DAY CELL'] },
      specs: [
        ['Display', '1.85\u2033 AMOLED'],
        ['Battery', '14 days typical'],
        ['Sensors', 'HR \u00B7 SpO2 \u00B7 ECG'],
        ['Rating', '5ATM + IP68'],
      ],
    },
    {
      tag: 'CH-03',
      name: 'Volt 65W GaN Charger',
      price: 3299,
      badge: 'BEST VALUE',
      desc: 'Gallium-nitride power stage in a 108g shell. Charges a laptop at full tilt, cool to the touch.',
      callout: { x: 70, y: 38, lines: ['GAN-II 65W', '2C + 1A PORTS'] },
      specs: [
        ['Output', '65W GaN-II'],
        ['Ports', '2\u00D7 USB-C + 1\u00D7 USB-A'],
        ['Weight', '108g'],
        ['Protocol', 'PD 3.1 \u00B7 QC 5'],
      ],
    },
    {
      tag: 'KB-04',
      name: 'Orbit Mechanical Keyboard',
      price: 9799,
      badge: 'LIMITED',
      desc: 'Gasket-mounted 75% board, factory-lubed linear switches, machined aluminium frame.',
      callout: { x: 64, y: 46, lines: ['GASKET MOUNT', 'TRI-MODE LINK'] },
      specs: [
        ['Layout', '75% \u00B7 84 keys'],
        ['Switches', 'Linear \u00B7 hot-swap'],
        ['Link', '2.4G \u00B7 BT 5.1 \u00B7 USB-C'],
        ['Frame', 'CNC aluminium'],
      ],
    },
  ],
  scan: {
    eyebrow: '01 — THE LINEUP',
    title: 'Four units. One scan.',
    body: 'Drag the scroll. The scan-line reads each unit in turn — HUD callouts lock on, the readout panel publishes its sheet.',
  },
  compare: {
    eyebrow: '02 — SPEC MATRIX',
    title: 'Every number, side by side.',
    note: 'Bench-tested in-house. Figures are median of 30 runs.',
    rows: [
      { label: 'Power / Drive', values: ['40mm drivers', 'Helio S1 chip', '65W GaN-II', '84-key matrix'] },
      { label: 'Battery', values: ['60h play', '14 days', '\u2014', '4000mAh \u00B7 200h'] },
      { label: 'Connectivity', values: ['BT 5.4 \u00B7 LDAC', 'BT 5.3 \u00B7 GPS', 'PD 3.1 \u00B7 QC 5', '2.4G \u00B7 BT \u00B7 USB-C'] },
      { label: 'Build', values: ['Alu + protein leather', 'Titanium \u00B7 sapphire', 'GaN \u00B7 PC shell', 'CNC aluminium'] },
      { label: 'Rating', values: ['IPX4', '5ATM \u00B7 IP68', '\u2014', 'IPX0 (desk)'] },
      { label: 'In the box', values: ['Case \u00B7 3 cables', '2 straps \u00B7 dock', '1.5m C\u2013C cable', 'Keycap puller'] },
    ],
  },
  support: {
    eyebrow: '03 — SUPPORT',
    title: 'Covered like lab equipment.',
    items: [
      {
        title: '2-YEAR WARRANTY',
        body: 'Every unit ships with a two-year, no-quibble warranty. One RMA form, prepaid label, 72-hour turnaround.',
      },
      {
        title: '7-DAY REPLACEMENT',
        body: 'Dead on arrival or changed your mind \u2014 seven days, doorstep pickup, full refund or instant replacement.',
      },
      {
        title: 'ENGINEER SUPPORT',
        body: 'Real engineers on chat, 10:00\u201318:00 IST, six days a week. Median first response: 4 minutes.',
      },
    ],
  },
  cart: {
    title: 'CART',
    empty: 'Cart is empty. The scan awaits.',
    checkout: 'Checkout (demo)',
    demoNote: 'Demo store \u2014 no real checkout, no payment taken.',
  },
  contact: {
    email: `support@${kela.domain}`,
    phone: '+91 80 4719 2200',
    address: '44 Residency Road, Bengaluru 560025',
  },
  footer: {
    line: `${kela.name} \u2014 precision gadgets, engineered in Bengaluru.`,
    colophon: 'Set in Space Grotesk & IBM Plex Mono. Specs verified on the bench.',
  },
};
