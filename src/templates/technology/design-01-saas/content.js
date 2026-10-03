import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'The revenue operating system' },
  nav: [
    { label: 'Product', href: '#platform' },
    { label: 'Solutions', href: '#customers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Docs', href: '#footer' },
  ],
  hero: {
    eyebrow: `New · ${kela.name} Forecasting 2.0 is live`,
    titleStart: 'Run your entire revenue engine',
    titleAccent: 'from one place.',
    sub: `${kela.name} unifies your pipeline, billing, and forecasts in a single calm dashboard — so every team works from the same numbers, every quarter.`,
    ctaPrimary: 'Start free trial',
    ctaPrimaryHref: '#contact',
    ctaSecondary: 'Watch the demo',
    ctaSecondaryHref: '#platform',
  },
  logos: {
    label: 'Trusted by revenue teams at',
    marks: ['VANTIA', 'correlate', 'HELMSTEAD', 'arcline', 'OSPREY', 'kilter'],
  },
  tour: {
    eyebrow: 'The platform',
    title: 'One dashboard. Four jobs, done.',
    sub: `Scroll to tour the four workflows ${kela.name} replaces — each one lives on the same live data.`,
    steps: [
      {
        id: 'pipeline',
        title: 'Pipeline analytics',
        body: 'See every deal in one live view — stage conversion, velocity, and coverage update as your team works. No exports, no stale snapshots.',
        points: ['Live stage conversion & velocity', 'Coverage tracking by segment', 'One-click board-ready views'],
        dot: { top: '30%', left: '24%' },
      },
      {
        id: 'forecast',
        title: 'Forecasting',
        body: `${kela.name} models commit, upside, and risk from live activity, so your forecast narrows to a number you can defend in the boardroom.`,
        points: ['Commit / upside / risk scenarios', 'Accuracy improves every quarter', 'Variance alerts before surprises'],
        dot: { top: '58%', left: '56%' },
      },
      {
        id: 'billing',
        title: 'Billing automation',
        body: 'Quotes become invoices, dunning, and reconciliation automatically. Revenue collects itself while your team stays focused on selling.',
        points: ['Quotes to cash, automated', 'Smart dunning & retries', 'Real-time revenue recognition'],
        dot: { top: '30%', left: '82%' },
      },
      {
        id: 'integrations',
        title: 'Integrations',
        body: `Native connections to your CRM, ERP, and data warehouse. Set up in an afternoon — ${kela.name} meets your systems where they are.`,
        points: ['40+ native connectors', 'Two-way CRM sync', 'Open API & webhooks'],
        dot: { top: '82%', left: '44%' },
      },
    ],
  },
  metrics: {
    eyebrow: 'By the numbers',
    title: 'The quiet infrastructure behind loud quarters.',
    items: [
      { target: 99.99, decimals: 2, prefix: '', suffix: '%', label: 'Uptime SLA, trailing 12 months' },
      { target: 4200, decimals: 0, prefix: '', suffix: '+', label: `Companies run on ${kela.name}` },
      { target: 12, decimals: 0, prefix: '$', suffix: 'B', label: 'Processed annually through billing' },
    ],
  },
  testimonial: {
    eyebrow: 'Customers',
    quote:
      `We replaced four tools with ${kela.name}. Our forecast accuracy went from hopeful to exact — the board noticed before we did.`,
    name: 'Maya Chen',
    role: 'CFO, Arcline',
    initials: 'MC',
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Start small. Scale without switching.',
    sub: 'Every plan includes unlimited dashboards, SSO, and live support from a real revenue team.',
    toggle: { monthly: 'Monthly', annual: 'Annual · save 20%' },
    tiers: [
      {
        name: 'Starter',
        monthly: 49,
        annual: 39,
        blurb: 'For young teams getting their first real pipeline.',
        features: ['Up to 10 seats', 'Pipeline analytics', 'Core integrations', 'Email support'],
      },
      {
        name: 'Growth',
        monthly: 149,
        annual: 119,
        blurb: 'For teams calling the quarter and meaning it.',
        features: ['Unlimited seats', 'Forecasting & scenarios', 'Billing automation', '40+ integrations', 'Priority support'],
        highlight: true,
      },
      {
        name: 'Enterprise',
        monthly: null,
        annual: null,
        blurb: 'For complex orgs with serious compliance needs.',
        features: ['Custom data residency', 'Dedicated success manager', 'SOC 2 & audit support', '99.99% uptime SLA'],
      },
    ],
    footnote: 'Prices per seat, per month. Switch or cancel anytime.',
  },
  cta: {
    eyebrow: 'Get started',
    title: 'Ready to run on one number?',
    sub: 'Join 4,200+ finance and revenue teams. Set up in an afternoon, live in a week.',
    cta: 'Start free trial',
    note: 'Free 14-day trial · No credit card required',
  },
  contact: { email: `sales@${kela.domain}`, phone: '+1 (415) 555-0132' },
  footer: {
    line: `© 2026 ${kela.name}, Inc. All rights reserved.`,
    cols: [
      { title: 'Product', links: ['Platform tour', 'Forecasting', 'Billing', 'Integrations', 'Changelog'] },
      { title: 'Solutions', links: ['For RevOps', 'For Finance', 'For Founders', 'Customers'] },
      { title: 'Resources', links: ['Documentation', 'API reference', 'Blog', 'Status'] },
      { title: 'Company', links: ['About', 'Careers', 'Security', 'Contact'] },
    ],
  },
};
