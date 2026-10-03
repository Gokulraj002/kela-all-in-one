import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A brand identity studio. Rigorous, considered, enduring.',
    est: 'Est. 2012 — Mumbai & Bengaluru',
  },
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Brand identity studio — Est. 2012',
    title: 'Brands, built to last.',
    sub: `We are ${kela.name}, an identity practice for companies that mean it. We take you through naming, mark-making and rollout with the same care we take over a single letterform — because a brand should outlive its brief.`,
    cta: 'Book a discovery call',
    ctaHref: '#contact',
    secondaryCta: 'See the method',
    secondaryCtaHref: '#process',
    videoAlt:
      'Extreme macro of a brass-nibbed pen sketching a letterform, pulling back across logo iteration sheets to rest on a chosen mark circled in ochre',
  },
  work: {
    eyebrow: 'Selected identities',
    title: 'Five marks, five businesses changed.',
    intro:
      'Every identity below is shown the way we ship it: the construction, the system in use, and the guidelines that keep it alive long after we leave.',
    cases: [
      {
        id: 'terra-thyme',
        client: 'Terra & Thyme',
        sector: 'Spice merchant — Jaipur',
        year: '2024',
        scope: 'Full rebrand: naming audit, mark, packaging system',
        timeline: '14 weeks',
        deliverables: ['Wordmark + monogram', 'Packaging architecture', '120-page guidelines', 'Launch art direction'],
        blurb:
          'A third-generation spice house whose packaging had drifted into forty disconnected labels. We rebuilt one family mark and a packaging grammar that now stretches across 60 SKUs — revenue from retail channels up 38% in the first year.',
      },
      {
        id: 'northline',
        client: 'Northline Rail',
        sector: 'Regional transit authority',
        year: '2023',
        scope: 'Identity, wayfinding and signage program',
        timeline: '26 weeks',
        deliverables: ['Wayfinding typeface', 'Signage standards manual', 'Station rollouts, 14 stations', 'Staff training kit'],
        blurb:
          'A regional rail network with five conflicting sign systems. We designed one wayfinding language — tested at platform scale, at night, in the rain — and rolled it across fourteen stations without a single service-day delay.',
      },
      {
        id: 'aurelia',
        client: 'Aurelia Press',
        sector: 'Independent book publisher — Kolkata',
        year: '2024',
        scope: 'Mark, cover system, edition standards',
        timeline: '12 weeks',
        deliverables: ['Publisher mark + colophon', 'Cover design system', 'Spine grammar', 'Print production guide'],
        blurb:
          'An independent press whose books looked like forty different publishers. One mark, one spine grammar, and a cover system built on the publisher\u2019s own archive of woodcut prints — three titles longlisted for design prizes since.',
      },
      {
        id: 'kaveri',
        client: 'Kaveri Bank',
        sector: 'Regional banking — Coimbatore',
        year: '2022',
        scope: 'Naming strategy, identity, branch rollout',
        timeline: '32 weeks',
        deliverables: ['Name architecture', 'Identity + motion mark', 'Branch interior standards', 'Staff onboarding film script'],
        blurb:
          'A 90-year-old bank with a logo nobody under forty trusted. We kept the name the town already loved, rebuilt everything around it, and ran the rollout in live branches — customer satisfaction scores rose 21 points in eighteen months.',
      },
      {
        id: 'studio-clay',
        client: 'Studio Clay',
        sector: 'Ceramics workshop — Bengaluru',
        year: '2025',
        scope: 'Mark, packaging, stamps and seals',
        timeline: '10 weeks',
        deliverables: ['Hand-drawn mark', 'Packaging + wrap system', 'Maker\u2019s stamp set', 'Studio signage'],
        blurb:
          'A two-person ceramics studio selling out every kiln firing. We gave them an identity as handmade as the work — drawn with the same brushes, stamped into every box, impossible to mistake for anything mass-produced.',
      },
    ],
  },
  process: {
    eyebrow: 'The method',
    title: 'Process is the product.',
    intro:
      'Anyone can draw a mark. The difference is what the mark stands on. Our four-phase method means you always know where we are, what you get, and why it costs what it costs.',
    phases: [
      {
        id: 'discover',
        num: '01',
        name: 'Discover',
        duration: 'Weeks 1–3',
        text: 'We interview founders, customers, and the people who pack the boxes. We audit every touchpoint you already have — the good, the broken, the accidental — and map where the brand actually lives versus where you think it does.',
        outputs: ['Stakeholder interviews', 'Touchpoint audit', 'Competitive landscape', 'Brand brief, signed'],
      },
      {
        id: 'define',
        num: '02',
        name: 'Define',
        duration: 'Weeks 4–6',
        text: 'Strategy before sketching. We define the positioning, the naming criteria, and the creative platform — a single sentence the whole identity must answer to. You sign off before a single mark is drawn.',
        outputs: ['Positioning statement', 'Naming criteria + shortlists', 'Creative platform', 'Creative brief, signed'],
      },
      {
        id: 'design',
        num: '03',
        name: 'Design',
        duration: 'Weeks 7–12',
        text: 'Three territories, presented as finished systems — not logos on a page, but packaging on a shelf, signage on a wall, the app icon on a phone. We test at real sizes, in real contexts, with real people.',
        outputs: ['Three territories', 'System mockups in situ', 'Construction grids', 'Chosen identity, signed'],
      },
      {
        id: 'deliver',
        num: '04',
        name: 'Deliver',
        duration: 'Weeks 13–16',
        text: 'Guidelines written for humans, files organised for handover, rollout sequenced by impact. We stay through launch and train your team to run the system — because the best identity is the one you can use without us.',
        outputs: ['Brand guidelines book', 'Master artwork + fonts', 'Rollout sequence', 'Team training session'],
      },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Four disciplines, one standard.',
    intro:
      'We do fewer things than most agencies, on purpose. Each engagement is led by a principal and staffed by people who have done this work for a decade.',
    items: [
      {
        name: 'Naming',
        text: 'Linguistic and legal groundwork first — names that clear trademark, survive translation, and still mean something at 3am in a shipping manifest.',
        proof: '120+ names cleared and launched since 2012.',
      },
      {
        name: 'Identity',
        text: 'Marks, monograms, typefaces and colour built as systems, not ornaments — drawn on construction grids, tested from favicon to facade.',
        proof: 'Every mark shipped with full construction documentation.',
      },
      {
        name: 'Guidelines',
        text: 'Rulebooks people actually read: written in plain language, shown in real examples, organised so a new designer is fluent in a day.',
        proof: 'Average guideline book: 140 pages, zero jargon tolerance.',
      },
      {
        name: 'Rollout',
        text: 'Sequenced launches across packaging, signage, digital and print — phased so the business never stops while the brand changes around it.',
        proof: 'Largest rollout: 14 stations, 0 service days lost.',
      },
    ],
  },
  studio: {
    eyebrow: 'The studio',
    title: 'Small on purpose.',
    philosophy:
      `${kela.name} has been eleven people for six years, and we intend to stay that way. Every engagement is led by one of the three principals — the people who pitch are the people who draw. We take four identity projects a year. The rest of the time we spend on research: type, signage, and the long history of marks that refused to die.`,
    facts: [
      { label: 'Founded', value: '2012' },
      { label: 'Principals', value: '3' },
      { label: 'Identities shipped', value: '87' },
      { label: 'Cities', value: 'Mumbai & Bengaluru' },
    ],
    principals: [
      { name: 'Anaya Deshpande', role: 'Principal — Strategy', note: 'Brand strategy and naming. Previously led identity programs for two national banks.' },
      { name: 'Kabir Rao', role: 'Principal — Design', note: 'Letterforms, marks and type. Draws every final mark himself, by hand first.' },
      { name: 'Sara Thomas', role: 'Principal — Rollout', note: 'Guidelines and implementation. Runs the part of the project most studios hand off.' },
    ],
  },
  contact: {
    eyebrow: 'Start a project',
    title: 'Book a discovery call.',
    text: 'Forty-five minutes, no pitch deck. Bring the problem as you see it — we\u2019ll tell you honestly whether an identity project is the answer, and what it should cost.',
    email: `hello@${kela.domain}`,
    phone: '+91 22 4890 4412',
    address: '204 Kala Ghoda, Fort, Mumbai 400001',
    hours: 'Studio hours: Monday–Friday, 9:30–18:00 IST',
    budgets: ['Under ₹10L', '₹10–25L', '₹25–50L', '₹50L+'],
    formLabels: {
      name: 'Your name',
      email: 'Email',
      company: 'Company',
      budget: 'Budget band',
      message: 'What are you building?',
      submit: 'Request the call',
      note: 'We reply within two working days. This form opens your email client — nothing is sent without you.',
    },
  },
  footer: {
    line: `${kela.name} — a brand identity studio, Mumbai & Bengaluru.`,
    colophon: 'Set in Instrument Serif & Inter. Printed, more or less, on bone paper.',
    socials: [
      { label: 'Instagram', href: `https://instagram.com/${kela.instagram}` },
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Behance', href: 'https://behance.net' },
    ],
  },
};
