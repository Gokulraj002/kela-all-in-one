import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

export const content = {
  brand: {
    name: kela.name,
    short: 'K/S',
    location: 'Bengaluru · Remote-first',
    email: `hello@${kela.domain}`,
    phone: '+91 80 4719 2200',
    hours: 'Mon–Fri · 10:00–18:00 IST',
    founded: '2017',
    size: '24 people',
  },
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Digital product agency — since 2017',
    title: 'We ship products that move the metric.',
    sub: `${kela.name} is a 24-person product agency for founders, CTOs, and investors. No manifestos, no mood boards for mood boards\u2019 sake. We research, design, build, and measure — and we put the numbers first.`,
    cta: 'Book an audit',
    ctaHref: '#contact',
    secondaryCta: 'See the work',
    secondaryHref: '#work',
    videoAlt:
      'A stylus sketching product wireframes on a tablet, then the camera pulls back to a desk of devices lighting up with product interfaces',
  },
  outcomes: {
    eyebrow: 'Outcomes, not adjectives',
    title: 'Measured across 42 shipped products.',
    note: 'Trailing 24 months. Figures are client-reported, pre/post engagement.',
    metrics: [
      { value: 42, prefix: '', suffix: '', decimals: 0, label: 'Products shipped to production' },
      { value: 212, prefix: '+', suffix: '%', decimals: 0, label: 'Average conversion lift' },
      { value: 4.8, prefix: '', suffix: '', decimals: 1, label: 'Average app store rating' },
      { value: 94, prefix: '', suffix: '%', decimals: 0, label: 'Clients who return for phase two' },
    ],
  },
  work: {
    eyebrow: 'Selected case studies',
    title: 'Every row is a bet that paid off.',
    note: 'Scroll — each spec sheet opens on its own.',
    cases: [
      {
        num: '01',
        client: 'Meridian Bank',
        sector: 'Fintech · Onboarding',
        year: '2025',
        headline: '+212% onboarding completion',
        summary:
          'Meridian\u2019s signup flow lost 7 in 10 applicants. We rebuilt it in six weeks: 14 screens down to 5, progressive KYC, and one measurable goal per screen. Completion went from 28% to 87%.',
        metrics: [
          { value: 212, prefix: '+', suffix: '%', decimals: 0, label: 'Completion rate lift' },
          { value: 31, prefix: '', suffix: 's', decimals: 0, label: 'Median time to funded account' },
          { value: 5, prefix: '', suffix: '', decimals: 0, label: 'Screens, down from 14' },
        ],
        timeline: '6 weeks',
        stack: 'React Native · Design system',
        imgKey: 'work-1',
        alt: 'Two smartphones showing abstract onboarding app screens with progress indicators',
      },
      {
        num: '02',
        client: 'Cadence',
        sector: 'Health · iOS & Android',
        year: '2024',
        headline: '3.1 \u2192 4.8 store rating',
        summary:
          'A great product buried under a 3.1-star rating. We audited 4,000 reviews, fixed the top 11 crash-adjacent UX paths, and rebuilt the home screen around one action. Rating recovered in 90 days; retention followed.',
        metrics: [
          { value: 4.8, prefix: '', suffix: '', decimals: 1, label: 'Rating after 90 days' },
          { value: 11, prefix: '', suffix: '', decimals: 0, label: 'UX crash paths fixed' },
          { value: 38, prefix: '+', suffix: '%', decimals: 0, label: 'Day-30 retention lift' },
        ],
        timeline: '10 weeks',
        stack: 'Flutter · Analytics rebuild',
        imgKey: 'detail',
        alt: 'A stylus sketching wireframes on a tablet, screen glowing blue',
      },
      {
        num: '03',
        client: 'Freightline',
        sector: 'Logistics · Web platform',
        year: '2024',
        headline: '\u221234% support tickets',
        summary:
          'Dispatchers were filing 3,000 tickets a month just to understand the dashboard. We redesigned the ops console around exceptions-first triage. Ticket volume fell a third; average resolution time fell with it.',
        metrics: [
          { value: 34, prefix: '\u2212', suffix: '%', decimals: 0, label: 'Monthly ticket volume' },
          { value: 2.4, prefix: '', suffix: '×', decimals: 1, label: 'Faster triage per dispatcher' },
          { value: 12, prefix: '', suffix: '', decimals: 0, label: 'Weeks, design to deploy' },
        ],
        timeline: '12 weeks',
        stack: 'React · Data-viz system',
        imgKey: 'work-2',
        alt: 'Close-up of an analytics dashboard with abstract charts on a monitor',
      },
      {
        num: '04',
        client: 'Bloom',
        sector: 'E-commerce · Checkout',
        year: '2023',
        headline: '+48% checkout conversion',
        summary:
          'Cart abandonment sat at 81%. We ran 6 experiment sprints on a single hypothesis — friction, not price — and rebuilt checkout as a two-step flow with guest-first entry. Paying customers up 48% on the same traffic.',
        metrics: [
          { value: 48, prefix: '+', suffix: '%', decimals: 0, label: 'Checkout conversion' },
          { value: 81, prefix: '', suffix: '%', decimals: 0, label: 'Old abandonment rate' },
          { value: 6, prefix: '', suffix: '', decimals: 0, label: 'Experiment sprints' },
        ],
        timeline: '8 weeks',
        stack: 'Headless commerce · A/B platform',
        imgKey: 'work-3',
        alt: 'Design system components laid out on a table beside a tablet',
      },
      {
        num: '05',
        client: 'Northwind',
        sector: 'SaaS · 0 \u2192 1 MVP',
        year: '2023',
        headline: '40k users in 90 days',
        summary:
          'A Series A team with a pitch deck and no product. Eight weeks from first wireframe to private beta; forty thousand users in the first quarter. The design system we built now serves their 60-person team.',
        metrics: [
          { value: 40, prefix: '', suffix: 'k', decimals: 0, label: 'Users in first 90 days' },
          { value: 8, prefix: '', suffix: '', decimals: 0, label: 'Weeks to private beta' },
          { value: 120, prefix: '', suffix: '', decimals: 0, label: 'Components in the system' },
        ],
        timeline: '8 weeks',
        stack: 'Next.js · Native mobile',
        imgKey: 'hero',
        alt: 'Device lineup on a studio desk showing product interfaces',
      },
      {
        num: '06',
        client: 'Axis',
        sector: 'Travel · Booking flow',
        year: '2022',
        headline: '\u221252% booking drop-off',
        summary:
          'Axis\u2019s funnel leaked hardest at payment. We instrumented every step, found the trust gap, and rebuilt the payment screen with verification-first copy and progressive disclosure. Drop-off halved in one quarter.',
        metrics: [
          { value: 52, prefix: '\u2212', suffix: '%', decimals: 0, label: 'Payment drop-off' },
          { value: 19, prefix: '+', suffix: '%', decimals: 0, label: 'Revenue per session' },
          { value: 1, prefix: '', suffix: '', decimals: 0, label: 'Quarter to results' },
        ],
        timeline: '9 weeks',
        stack: 'Design audit · iOS rebuild',
        imgKey: 'work-1',
        alt: 'Smartphones showing abstract travel app screens in a clean presentation',
      },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Four disciplines. One scoreboard.',
    cells: [
      {
        num: 'C1',
        name: 'Research',
        proof: '14-day audits, 40+ user interviews, analytics forensics.',
        items: ['Product audits', 'User interviews', 'Analytics forensics', 'Opportunity scoring'],
      },
      {
        num: 'C2',
        name: 'Design',
        proof: 'Interfaces designed to be built — and to be measured.',
        items: ['UX & interaction', 'Design systems', 'Prototyping', 'Motion spec'],
      },
      {
        num: 'C3',
        name: 'Build',
        proof: 'Production code, not handoff decks. We ship it.',
        items: ['Web & mobile apps', 'Design-system code', 'Integrations', 'QA & release'],
      },
      {
        num: 'C4',
        name: 'Measure',
        proof: 'Every engagement ends with a number we can defend.',
        items: ['Experiment design', 'A/B testing', 'Funnel instrumentation', 'Outcome reporting'],
      },
    ],
  },
  process: {
    eyebrow: 'Process',
    title: 'Four sprints. No black box.',
    note: 'Fixed scope, fixed calendar. You see the metric move or we say so early.',
    sprints: [
      {
        num: 'S0',
        name: 'Audit sprint',
        time: 'Weeks 1–2',
        desc: 'We tear the product apart: analytics, 20 user sessions, a heuristic pass, and a scored opportunity list. You get a readout with the three bets worth making.',
        deliverables: ['Metric baseline', 'Opportunity scorecard', 'Fixed-scope proposal'],
      },
      {
        num: 'S1',
        name: 'Design sprint',
        time: 'Weeks 3–4',
        desc: 'Hypotheses become testable prototypes. Two buildable directions, five user tests, one decision — recorded, with the numbers.',
        deliverables: ['Tested prototypes', 'Design system draft', 'Build-ready specs'],
      },
      {
        num: 'S2',
        name: 'Build sprint',
        time: 'Weeks 5–8',
        desc: 'Production code with weekly demos against the baseline metric. Instrumentation ships with the feature, not after it.',
        deliverables: ['Shipped release', 'Instrumentation', 'QA report'],
      },
      {
        num: 'S3',
        name: 'Measure sprint',
        time: 'Weeks 9–10',
        desc: 'Two weeks of live data against the baseline. Win, learn, or kill — then a phase-two plan priced to the results.',
        deliverables: ['Outcome report', 'Experiment log', 'Phase-two plan'],
      },
    ],
  },
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'What clients say when the numbers land.',
    quotes: [
      {
        text: 'They told us in week two which screens were losing us money. By week ten the number had moved exactly as they predicted.',
        name: 'Rhea Kapoor',
        role: 'CPO, Meridian Bank',
      },
      {
        text: 'The rare agency that argues with your roadmap using data and wins the argument.',
        name: 'Daniel Osei',
        role: 'Founder, Northwind',
      },
      {
        text: 'Our support team felt the redesign before the dashboard did. Tickets fell off a cliff.',
        name: 'Meera Iyer',
        role: 'VP Operations, Freightline',
      },
    ],
  },
  contact: {
    eyebrow: 'Product audit',
    title: 'Book an audit. Two weeks, one number.',
    body: 'We take on four audits a month. Tell us the product and the metric that matters — we reply within two business days with a fixed-scope plan.',
    email: `hello@${kela.domain}`,
    phone: '+91 80 4719 2200',
    address: '14 Residency Road, Bengaluru 560025',
    budgets: ['Under ₹10L', '₹10–25L', '₹25–60L', '₹60L+'],
    formNote: 'Submitting opens your email app with the brief pre-filled — no dead forms, no waiting on a ticket queue.',
  },
  footer: {
    line: `${kela.name} — a digital product agency. Systems thinking, metrics first.`,
    colophon: 'Bengaluru · Remote-first · Est. 2017 — Sora + Inter, set in systems.',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'X', href: 'https://x.com/' },
      { label: 'Dribbble', href: 'https://dribbble.com/' },
    ],
  },
};
