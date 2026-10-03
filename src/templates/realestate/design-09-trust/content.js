import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Honest homes on Tumkur Road.',
  },
  nav: [
    { label: 'Homes', href: '#homes' },
    { label: 'Cost Breakup', href: '#pricing' },
    { label: 'Progress', href: '#progress' },
    { label: 'Voices', href: '#voices' },
  ],
  cta: { label: 'See the cost breakup', href: '#pricing' },
  hero: {
    eyebrow: 'Affordable housing · Tumkur Road, Bengaluru',
    title: 'A home that does not hide its math.',
    sub: '2 BHK homes from ₹42.5 lakh, with every rupee accounted for — land, construction, approvals, and our margin, on the table.',
    badges: ['RERA approved', 'No hidden charges', 'Handover from Dec 2027'],
  },
  homes: {
    eyebrow: 'The homes',
    title: 'Two plans. One honest price per square foot.',
    note: 'Every home in Sahaj Enclave II is sold at the same all-in rate: ₹4,250 per sqft. The plan changes what you get; the price never changes what you pay for.',
    items: [
      {
        name: '2 BHK — Corner Sunlight',
        imgKey: 'product-0',
        area: '1,000 sqft',
        config: '2 bed · 2 bath · east facing',
        price: 4250000,
        status: 'Booking open',
        alt: 'Sunlit 2BHK living room with simple wooden furniture and daylight through sheer curtains',
      },
      {
        name: '1 BHK — The Starter',
        imgKey: 'hero',
        area: '680 sqft',
        config: '1 bed · 1 bath · park facing',
        price: 2890000,
        status: 'Booking open',
        alt: 'Sahaj Enclave II apartment block in bright daylight, brick base and white upper floors',
      },
    ],
  },
  pricing: {
    eyebrow: 'Transparent pricing',
    title: 'Where every rupee goes.',
    intro:
      `This is the full cost sheet of a ${kela.name} home — the same one we hand you before you pay a booking amount. Scroll, and we will build it line by line.`,
    lines: [
      {
        name: 'Land',
        amount: 950,
        note: 'Tumkur Road plot, purchased 2023. Registered value — not inflated, not “market adjusted”.',
      },
      {
        name: 'Construction',
        amount: 1650,
        note: 'RCC frame, brick walls, standard finishes. Contractor bills are published every quarter.',
      },
      {
        name: 'Approvals & statutory',
        amount: 420,
        note: 'BBMP, BWSSB, BESCOM, fire NOC. Receipts on file; ask and we will show them.',
      },
      {
        name: 'Amenities & common areas',
        amount: 480,
        note: 'Courtyard, play area, STP, solar water heating, lift. Shared by all 216 homes.',
      },
      {
        name: 'Our margin',
        amount: 750,
        note: 'The only line that is ours. Fixed before we sell the first flat — it never moves.',
      },
    ],
    perSqft: 4250,
    footnote:
      'Stamp duty and registration are extra, at actuals. We will tell you the exact number before you sign — not after.',
    seal: 'No hidden charges',
  },
  progress: {
    eyebrow: 'Construction updates',
    title: 'Proof, not promises.',
    intro:
      'Photographed on the 1st of every month, published by the 5th. This is the site on 1 October 2026.',
    overall: 62,
    overallLabel: '62% complete',
    milestones: [
      { when: 'Mar 2025', what: 'Foundation & excavation', done: true },
      { when: 'Sep 2025', what: 'Structure — 3 of 7 floors cast', done: true },
      { when: 'Apr 2026', what: 'Structure topped out', done: true },
      { when: 'Oct 2026', what: 'Brickwork & plastering in progress', done: false, current: true },
      { when: 'Mid 2027', what: 'Finishes, plumbing & electrical', done: false },
      { when: 'Dec 2027', what: 'Handover begins', done: false },
    ],
    quality: {
      title: 'The details we are proud of',
      body: 'Solid wooden main doors with brass fittings, vitrified tile flooring, and solar water heating on every terrace — specified in the agreement, not in a brochure.',
    },
  },
  film: {
    eyebrow: 'The handover film',
    title: 'This is what the math is for.',
    caption:
      `Hands, a key, a doorway — then a sunlit room with a child’s drawing on the wall. Every ${kela.name} home is built toward this ten seconds.`,
  },
  voices: {
    eyebrow: 'Resident voices',
    title: 'Ask the people who already live in one.',
    intro:
      'Sahaj Enclave, our first project, was handed over in 2023. These are its residents — in their words, unscripted.',
    quotes: [
      {
        text: 'They showed us the cost sheet before we paid the booking amount. In ten years of house-hunting, nobody had ever done that.',
        name: 'Meera & Santosh Kulkarni',
        detail: '2 BHK owners, Sahaj Enclave · since 2023',
      },
      {
        text: 'The site engineer answered my father’s questions for an hour, in Kannada, without rushing him once. That is when we decided.',
        name: 'Prakash Gowda',
        detail: '1 BHK owner, Sahaj Enclave · since 2023',
      },
      {
        text: 'Three years in, the STP works, the lift works, and the maintenance accounts are still published every quarter. It is exactly what they said it would be.',
        name: 'Anitha Rao',
        detail: '2 BHK owner, Sahaj Enclave · since 2023',
      },
    ],
  },
  contact: {
    eyebrow: 'Visit the site',
    title: 'Come see the ledger in person.',
    address: 'Sahaj Enclave II, Tumkur Road, Near 8th Mile, Bengaluru 560073',
    phone: '+91 80 4719 2200',
    email: `hello@${kela.domain}`,
    hours: 'Site office open every day, 10 am – 6 pm',
    rera: 'RERA No. PRM/KA/RERA/1251/446/PR/2025/003812',
  },
  footer: {
    line: `${kela.name} — honest homes on Tumkur Road.`,
    colophon: 'Prices at ₹4,250 per sqft, all-in. Stamp duty & registration at actuals.',
  },
};
