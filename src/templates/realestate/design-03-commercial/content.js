/* Kela Estates (brand from _shared/brand.js) — design-03-commercial content.
   Plain JSON-compatible object. Prices are numbers in ₹ (per sq ft / month),
   rendered through price(). All copy is real B2B leasing copy. */

import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Grade-A commercial · Hebbal, Outer Ring Road',
  },

  nav: [
    { href: '#plates', label: 'Floor Plates' },
    { href: '#spaces', label: 'Spaces' },
    { href: '#specs', label: 'Spec Sheet' },
    { href: '#location', label: 'Connectivity' },
    { href: '#contact', label: 'Contact' },
  ],

  hero: {
    eyebrow: 'Hebbal · Outer Ring Road · Bengaluru',
    title: 'Commercial space, engineered like infrastructure.',
    sub: 'Three towers, 3,40,000 sq ft of Grade-A floor plates at the junction of the Outer Ring Road and Hebbal — with a spec sheet that has nothing to hide.',
    ctaPrimary: { label: 'Book a walkthrough', href: '#contact' },
    ctaSecondary: { label: 'Download spec sheet', href: '#specs' },
    stats: [
      { value: '3,40,000', unit: 'sq ft', label: 'Total leasable area' },
      { value: '18,400', unit: 'sq ft', label: 'Typical floor plate' },
      { value: '4.2', unit: 'm', label: 'Floor-to-ceiling height' },
      { value: '1 : 750', unit: 'sq ft', label: 'Parking ratio' },
    ],
  },

  plates: {
    eyebrow: 'Floor plates',
    title: 'Read the plan.',
    body: `Every plate at ${kela.name} is drawn around an 11 m × 11 m column grid — no dead corners, no awkward cores. Scroll through the drawing and watch the plate build itself, room by room.`,
    rooms: [
      {
        id: 'lobby', label: 'Arrival Lobby',
        area: '2,450 sq ft', ceiling: '6.0 m', capacity: 'Double-height',
        x: 24, y: 24, w: 216, h: 150, card: { left: '2%', top: '5%' },
      },
      {
        id: 'work-a', label: 'Workspace A',
        area: '6,800 sq ft', ceiling: '4.2 m', capacity: '96 workstations',
        x: 264, y: 24, w: 512, h: 150, card: { left: '72%', top: '5%' },
      },
      {
        id: 'board', label: 'Boardroom',
        area: '3,120 sq ft', ceiling: '4.2 m', capacity: '24 seats',
        x: 24, y: 198, w: 280, h: 150, card: { left: '2%', top: '40%' },
      },
      {
        id: 'pods', label: 'Meeting Pods',
        area: '1,850 sq ft', ceiling: '4.2 m', capacity: '6 pods',
        x: 328, y: 198, w: 170, h: 150, card: { left: '43%', top: '40%' },
      },
      {
        id: 'work-b', label: 'Workspace B',
        area: '5,960 sq ft', ceiling: '4.2 m', capacity: '84 workstations',
        x: 522, y: 198, w: 254, h: 150, card: { left: '68%', top: '40%' },
      },
      {
        id: 'pantry', label: 'Pantry & Breakout',
        area: '2,280 sq ft', ceiling: '3.6 m', capacity: '60 covers',
        x: 24, y: 372, w: 220, h: 124, card: { left: '2%', top: '73%' },
      },
      {
        id: 'server', label: 'Server / Utility',
        area: '1,640 sq ft', ceiling: '3.6 m', capacity: '2N redundancy',
        x: 268, y: 372, w: 180, h: 124, card: { left: '36%', top: '73%' },
      },
      {
        id: 'terrace', label: 'Terrace Deck',
        area: '3,300 sq ft', ceiling: 'Open to sky', capacity: '120 standing',
        x: 472, y: 372, w: 304, h: 124, card: { left: '62%', top: '73%' },
      },
    ],
    summary: [
      { value: '3,40,000', unit: 'sq ft', label: 'Total leasable' },
      { value: '18,400', unit: 'sq ft', label: 'Typical plate' },
      { value: '4.2', unit: 'm', label: 'Clear ceiling' },
      { value: '11 × 11', unit: 'm', label: 'Column grid' },
    ],
  },

  spaces: {
    eyebrow: 'Available spaces',
    title: 'Three ways to move in.',
    body: 'Warm-shell floors, ready for CAT-A or CAT-B fit-out. Rents quoted per sq ft per month, exclusive of CAM.',
    items: [
      {
        name: 'Tower A · Floors 4–9',
        area: '18,400 sq ft plates',
        rate: 95,
        desc: 'The flagship stack. Full-floor plates with 270° glazing, private lift lobby on levels 7–9, and the fastest handover in the portfolio.',
      },
      {
        name: 'Tower B · Floors 2–6',
        area: '12,750 sq ft plates',
        rate: 88,
        desc: 'Efficient mid-rise plates for 80–150 headcounts. Dual-aspect daylight, demisable into two 6,300 sq ft suites.',
      },
      {
        name: 'The Pavilion · Ground + Mezzanine',
        area: '6,200 sq ft duplex',
        rate: 110,
        desc: 'Double-height street-front volume off the atrium — built for client-facing teams, experience centres and flagship receptions.',
      },
    ],
  },

  specs: {
    eyebrow: 'Spec sheet',
    title: 'Numbers first.',
    body: 'The full technical schedule, published the way an engineer would want it. No asterisks — every figure below is the figure in the lease.',
    rows: [
      { k: 'Typical floor plate', v: '18,400 sq ft' },
      { k: 'Floor-to-ceiling', v: '4.2 m (typical) · 6.0 m (ground)' },
      { k: 'Column grid', v: '11 m × 11 m' },
      { k: 'Floor loading', v: '4 kN / m²' },
      { k: 'Parking', v: '1 car : 750 sq ft · 3-level basement' },
      { k: 'Power backup', v: '100% · 2.2 kVA / 100 sq ft' },
      { k: 'Elevators', v: '12 passenger + 2 service' },
      { k: 'HVAC', v: 'VRF · floor-wise metering' },
      { k: 'Certification', v: 'LEED Gold (target) · IGBC' },
      { k: 'Handover', v: 'Warm shell · Q3 2027' },
    ],
    cta: { label: 'Download spec sheet', href: '#contact' },
  },

  location: {
    eyebrow: 'Connectivity',
    title: 'Hebbal is the junction.',
    body: `${kela.name} sits where the Outer Ring Road meets Hebbal — the one interchange in Bengaluru that reaches the airport, the tech corridor and the CBD without a U-turn.`,
    points: [
      { place: 'Hebbal flyover / ORR interchange', time: 'On site' },
      { place: 'Manyata Tech Park', time: '8 min' },
      { place: 'Hebbal metro (upcoming)', time: '5 min' },
      { place: 'MG Road / CBD', time: '20 min' },
      { place: 'Kempegowda International Airport', time: '35 min' },
    ],
  },

  contact: {
    eyebrow: 'Leasing',
    title: 'Book a walkthrough.',
    body: 'Ninety minutes, hard hat optional. We walk the plate you would actually occupy, open the spec sheet line by line, and put the rent on paper before you leave.',
    email: `leasing@${kela.domain}`,
    phone: '+91 80 4719 2200',
    address: `${kela.name}, Outer Ring Road, Hebbal, Bengaluru 560024`,
  },

  footer: {
    line: `${kela.name} — Grade-A commercial at Hebbal, Outer Ring Road, Bengaluru.`,
    colophon: `© 2026 ${kela.name} · A fictional showcase experience · Spec figures are illustrative`,
  },
};
