import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

export const content = {
  brand: { name: kela.name, tagline: 'A portfolio-first creative studio' },
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Latest work — Kaveri Ceramics · 2026',
    title: 'Kaveri Ceramics',
    outcome: { value: 212, prefix: '+', suffix: '%', decimals: 0, label: 'retail revenue in year one' },
    sub: 'Identity, packaging and art direction for a 40-year-old tableware house — relaunched, restocked, and sold out twice.',
    cta: 'Start a project',
    ctaHref: '#contact',
    secondaryCta: 'Browse the work',
    secondaryHref: '#work',
    videoAlt: `Slow dolly across the ${kela.name} pin-up wall as a hand straightens a print`,
    heroAlt: `Daylight studio wall dense with pinned ${kela.name} campaign prints in paper, ink and signal red`,
    scrollHint: 'Scroll — the work index',
    meta: [
      { k: 'Client', v: 'Kaveri Ceramics' },
      { k: 'Year', v: '2026' },
      { k: 'Scope', v: 'Identity · Packaging · Art direction' },
    ],
  },
  work: {
    eyebrow: 'Selected work',
    title: 'Work that worked.',
    lede: 'Twelve recent engagements, measured the way our clients measure them — in revenue, users and sellouts. Filter by discipline; scroll and the index keeps pace.',
  },
  filters: [
    { id: 'all', label: 'All' },
    { id: 'identity', label: 'Identity' },
    { id: 'campaign', label: 'Campaign' },
    { id: 'digital', label: 'Digital' },
    { id: 'art', label: 'Art Direction' },
  ],
  cases: [
    {
      client: 'Kaveri Ceramics', title: 'Kaveri Ceramics', sector: 'Homeware retail', year: '2026',
      discipline: 'identity', scope: 'Identity system, packaging, art direction', budget: '₹60L–1.5Cr',
      outcome: { value: 212, prefix: '+', suffix: '%', decimals: 0, label: 'retail revenue in year one' },
      imgKey: 'work-1', imgAlt: 'Brand identity mockup stack — letterpress stationery, cards and signage for Kaveri Ceramics',
    },
    {
      client: 'Paperplane Press', title: 'Paperplane Press', sector: 'Independent publishing', year: '2025',
      discipline: 'identity', scope: 'Identity, editorial system', budget: '₹25–60L',
      outcome: { value: 3, prefix: '', suffix: '×', decimals: 0, label: 'wholesale accounts in 18 months' },
      imgKey: 'work-1', imgAlt: 'Identity mockups for Paperplane Press — stationery and print system in daylight',
    },
    {
      client: 'Solstice Hotels', title: 'Solstice Hotels', sector: 'Boutique hospitality', year: '2024',
      discipline: 'identity', scope: 'Identity, wayfinding, print', budget: '₹60L–1.5Cr',
      outcome: { value: 92, prefix: '', suffix: '%', decimals: 0, label: 'of bookings now direct' },
      imgKey: 'work-1', imgAlt: 'Solstice Hotels identity mockups — signage and printed collateral on a studio table',
    },
    {
      client: 'Monsoon Radio', title: 'Monsoon Radio', sector: 'Music streaming', year: '2025',
      discipline: 'campaign', scope: 'Launch campaign, OOH, film', budget: '₹1.5Cr+',
      outcome: { value: 1.8, prefix: '', suffix: 'M', decimals: 1, label: 'streams in launch month' },
      imgKey: 'work-2', imgAlt: 'Street poster for the Monsoon Radio launch campaign pasted on a city wall in daylight',
    },
    {
      client: 'Terra Cycles', title: 'Terra Cycles', sector: 'Urban mobility', year: '2026',
      discipline: 'campaign', scope: 'Brand campaign, retail, film', budget: '₹60L–1.5Cr',
      outcome: { value: 40, prefix: '', suffix: 'K', decimals: 0, label: 'test rides booked' },
      imgKey: 'work-2', imgAlt: 'Terra Cycles campaign poster in situ on a city wall, wheatpaste texture in daylight',
    },
    {
      client: 'Dakshin Tiffins', title: 'Dakshin Tiffins', sector: 'Food & beverage', year: '2024',
      discipline: 'campaign', scope: 'Launch campaign, packaging', budget: '₹25–60L',
      outcome: { value: 22, prefix: '', suffix: '', decimals: 0, label: 'outlets opened in 9 months' },
      imgKey: 'work-2', imgAlt: 'Dakshin Tiffins launch poster on a street wall, bold ink and signal-red graphics',
    },
    {
      client: 'Ledgerly', title: 'Ledgerly', sector: 'Fintech SaaS', year: '2025',
      discipline: 'digital', scope: 'Product design, design system', budget: '₹60L–1.5Cr',
      outcome: { value: 38, prefix: '+', suffix: '%', decimals: 0, label: 'activation lift after redesign' },
      imgKey: 'work-3', imgAlt: 'Ledgerly product screens across laptop, tablet and phone in a daylight studio',
    },
    {
      client: 'Wayfare', title: 'Wayfare', sector: 'Travel tech', year: '2026',
      discipline: 'digital', scope: 'App redesign, motion, web', budget: '₹25–60L',
      outcome: { value: 2.4, prefix: '', suffix: '×', decimals: 1, label: 'booking conversion' },
      imgKey: 'work-3', imgAlt: 'Wayfare app interface on a device lineup, clean studio light, blurred UI',
    },
    {
      client: 'Gramsetu', title: 'Gramsetu', sector: 'Rural commerce', year: '2024',
      discipline: 'digital', scope: 'Product, identity, field research', budget: '₹25–60L',
      outcome: { value: 1, prefix: '', suffix: 'M', decimals: 0, label: 'users in the first year' },
      imgKey: 'work-3', imgAlt: 'Gramsetu product screens on phones and a laptop, daylight studio photography',
    },
    {
      client: 'Aarohana Festival', title: 'Aarohana Festival', sector: 'Culture & live', year: '2025',
      discipline: 'art', scope: 'Festival identity, campaign, print', budget: '₹25–60L',
      outcome: { value: 11, prefix: '', suffix: '', decimals: 0, label: 'days to sell out' },
      imgKey: 'detail', imgAlt: 'Hands pinning Aarohana Festival campaign prints on the studio crit wall',
    },
    {
      client: 'Fieldnotes India', title: 'Fieldnotes India', sector: 'Outdoor retail', year: '2023',
      discipline: 'art', scope: 'Seasonal campaigns, lookbook', budget: '₹25–60L',
      outcome: { value: 168, prefix: '+', suffix: '%', decimals: 0, label: 'D2C revenue in one season' },
      imgKey: 'detail', imgAlt: 'Studio hands arranging Fieldnotes India lookbook prints, shallow depth of field',
    },
    {
      client: 'House of Indigo', title: 'House of Indigo', sector: 'Textiles', year: '2023',
      discipline: 'art', scope: 'Brand world, print, trade', budget: 'Under ₹25L',
      outcome: { value: 14, prefix: '', suffix: '', decimals: 0, label: 'export markets served' },
      imgKey: 'detail', imgAlt: 'Printed brand-world sheets for House of Indigo pinned during a studio crit',
    },
  ],
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Five things, done properly.',
    lede: 'We don’t do everything. We do these five — and every claim below carries a number.',
    items: [
      { title: 'Brand Identity', proof: '48 identities shipped since 2014 — 31 still in the market, unchanged.' },
      { title: 'Campaigns', proof: 'Launches and retail pushes across OOH, print, film and social. ₹120Cr+ in tracked client revenue.' },
      { title: 'Digital Product', proof: 'Apps and sites people finish using. Six products rated 4.5/5 or higher.' },
      { title: 'Art Direction', proof: 'Seasonal brand worlds for retail and culture. Three international design awards since 2024.' },
      { title: 'Motion & Film', proof: 'Brand films and title sequences — from 15-second cutdowns to festival selections.' },
    ],
  },
  clients: {
    eyebrow: 'Clients',
    title: 'In good company.',
    note: 'Selected from 60+ client relationships since 2014.',
    names: [
      'Kaveri Ceramics', 'Monsoon Radio', 'Terra Cycles', 'Ledgerly', 'Wayfare',
      'Solstice Hotels', 'Aarohana Festival', 'Paperplane Press', 'Fieldnotes India',
      'Gramsetu', 'Dakshin Tiffins', 'House of Indigo',
    ],
  },
  studio: {
    eyebrow: 'The studio',
    title: 'Small on purpose.',
    body: [
      `${kela.name} is 28 designers, strategists and makers in Mumbai and Bengaluru. We take on twelve projects a year — never more — so every client gets the principals, not the B-team.`,
      'Founded in 2014 and independent since day one. No holding company, no timesheet theatre: just the work, measured.',
    ],
    facts: [
      { k: 'Founded', v: '2014' },
      { k: 'People', v: '28' },
      { k: 'Studios', v: 'Mumbai · Bengaluru' },
      { k: 'Ownership', v: 'Independent' },
    ],
    imgAlt: `Hands pinning fresh campaign prints on the ${kela.name} crit wall, shallow depth of field`,
    caption: 'Tuesday crit — every project on the wall, every week.',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Start a project.',
    lede: 'Tell us what you’re building and what it needs to do. We reply within two working days — with questions, not a deck.',
    email: `hello@${kela.domain}`,
    phone: '+91 22 4890 5566',
    addresses: [
      { city: 'Mumbai', lines: '4th Floor, Kala Ghoda, Fort, Mumbai 400001' },
      { city: 'Bengaluru', lines: '80 Feet Road, Indiranagar, Bengaluru 560038' },
    ],
    projectTypes: ['Brand identity', 'Campaign', 'Digital product', 'Art direction', 'Something else'],
    budgetBands: ['Under ₹25L', '₹25–60L', '₹60L–1.5Cr', '₹1.5Cr+'],
    formNote: 'Prefer email? Write to us directly — the same humans read both.',
    sentNote: 'Opening your email app with everything pre-filled — we reply within two working days.',
  },
  footer: {
    line: `${kela.name} — a portfolio-first creative studio.`,
    colophon: `© 2026 ${kela.name} · Set in Archivo & Inter · All work shown with client permission.`,
    socials: [
      { label: 'Instagram', href: `https://instagram.com/${kela.instagram}` },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Behance', href: 'https://behance.net' },
    ],
  },
};
