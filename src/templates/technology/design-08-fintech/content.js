import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');
const kelaSlug = kela.domain.split('.')[0];

export const content = {
  brand: { name: `${kela.name}`, tagline: 'Payments infrastructure for the internet' },
  nav: [
    { label: 'Products', href: '#products' },
    { label: 'Developers', href: '#developers' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Company', href: '#company' },
  ],
  hero: {
    eyebrow: 'Payments infrastructure for the internet',
    title: 'Money, moved precisely.',
    sub: 'One API to accept payments, keep double-entry ledgers, pay out globally, and stop fraud before it clears — reconciled to the cent, in real time.',
    cta: 'Get API keys',
    ctaHref: '#cta',
    docs: 'Read the docs',
    docsHref: '#developers',
    chips: [
      { value: '$2.1M', label: 'moved in the last hour' },
      { value: '142ms', label: 'median API latency' },
      { value: '99.99%', label: 'uptime · trailing 90 days' },
    ],
  },
  products: [
    {
      name: 'Payments API',
      endpoint: 'POST /v1/payments',
      desc: 'Accept cards, bank debits, and wallets in 135 currencies with a single integration. Idempotent by design — retry safely, charge once.',
      metrics: [
        { value: 48, prefix: '$', suffix: 'B', decimals: 0, label: 'processed in 2025' },
        { value: 99.9, prefix: '', suffix: '%', decimals: 1, label: 'authorization rate' },
      ],
    },
    {
      name: 'Ledgers',
      endpoint: 'POST /v1/ledger_entries',
      desc: 'Immutable double-entry accounting as a service. Every cent traceable from authorization to settlement — auditors get read-only keys.',
      metrics: [
        { value: 2.4, prefix: '', suffix: 'B', decimals: 1, label: 'entries posted' },
        { value: 40, prefix: '', suffix: 'ms', decimals: 0, label: 'median post latency' },
      ],
    },
    {
      name: 'Payouts',
      endpoint: 'POST /v1/payouts',
      desc: 'Pay sellers, drivers, and suppliers in their local currency. Same-day rails in 40+ markets, automatic FX at mid-market plus 0.4%.',
      metrics: [
        { value: 135, prefix: '', suffix: '', decimals: 0, label: 'settlement currencies' },
        { value: 99.99, prefix: '', suffix: '%', decimals: 2, label: 'on-time payout rate' },
      ],
    },
    {
      name: 'Fraud prevention',
      endpoint: 'POST /v1/fraud_scores',
      desc: 'Machine-learned risk scoring on every transaction, trained on $48B of network volume. Decline the fraud, keep the customer.',
      metrics: [
        { value: 31, prefix: '', suffix: '%', decimals: 0, label: 'fraud loss reduction' },
        { value: 120, prefix: '', suffix: 'ms', decimals: 0, label: 'median decision time' },
      ],
    },
    {
      name: 'Balances',
      endpoint: 'GET /v1/balances',
      desc: 'Real-time balances across every currency and banking partner, one endpoint. Treasury visibility without the spreadsheets.',
      metrics: [
        { value: 45, prefix: '', suffix: '+', decimals: 0, label: 'banking partners' },
        { value: 24, prefix: '', suffix: '/7', decimals: 0, label: 'settlement coverage' },
      ],
    },
  ],
  developers: {
    eyebrow: 'Developers',
    title: 'One call to move money.',
    body: 'Drop in the SDK, create a payment, and let the ledger, reconciliation, and settlement happen underneath. Webhooks keep your systems in lockstep.',
    sdk: `npm i @${kelaSlug}/node`,
  },
  gallery: {
    eyebrow: 'In the field',
    title: 'Where the money moves.',
    captions: [
      'Institutional-grade rails, built for banks and marketplaces alike.',
      'One card, one API — from authorization to settlement.',
      'Operating in financial districts across 40+ markets.',
    ],
  },
  metrics: {
    eyebrow: 'Scale, in numbers',
    title: 'The ledger never sleeps.',
    items: [
      { value: 48, prefix: '$', suffix: 'B', decimals: 0, label: 'Processed annually' },
      { value: 99.99, prefix: '', suffix: '%', decimals: 2, label: 'Platform uptime, trailing 12 months' },
      { value: 135, prefix: '', suffix: '', decimals: 0, label: 'Currencies settled' },
    ],
  },
  company: {
    eyebrow: 'Compliance',
    title: 'Regulated where it counts.',
    body: `Money movement is a trust business. ${kela.name} maintains the certifications, licenses, and audits your compliance team will ask for — before they ask.`,
    badges: ['PCI DSS Level 1', 'SOC 2 Type II', 'ISO/IEC 27001', 'PSD2 · SCA ready', '3-D Secure 2', 'FCA authorized'],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Start free. Scale precisely.',
    body: 'No setup fees, no monthly minimums. You pay when money moves — and every plan includes ledgers, webhooks, and 24/7 human support.',
    tiers: [
      {
        name: 'Starter',
        price: 0,
        per: 'per month',
        note: 'For side projects finding product-market fit.',
        rate: '2.9% + 30¢ per successful charge',
        features: ['Payments API + test mode', 'Ledgers with 13 months history', '135 currencies', 'Community support'],
        cta: 'Start building',
      },
      {
        name: 'Growth',
        price: 0,
        per: 'per month',
        note: 'For companies moving real volume.',
        rate: '2.7% + 25¢ per successful charge',
        features: ['Everything in Starter', 'Payouts + Fraud prevention', '99.99% uptime SLA', 'Dedicated Slack channel'],
        cta: 'Talk to sales',
        featured: true,
      },
      {
        name: 'Scale',
        price: 0,
        per: 'per month',
        note: 'Custom economics for platforms and banks.',
        rate: 'Interchange-plus pricing, volume discounts',
        features: ['Everything in Growth', 'Custom settlement schedules', 'Read-only auditor keys', 'Dedicated success engineer'],
        cta: 'Contact us',
      },
    ],
  },
  cta: {
    eyebrow: 'Get started',
    title: 'Your first payment in five minutes.',
    body: 'Sandbox keys are free, instant, and come preloaded with test cards. Move to production when you are ready — the same code, no rewrites.',
    cta: 'Get API keys',
    ctaHref: '#hero',
    secondary: `sales@${kela.domain}`,
  },
  contact: { email: `hello@${kela.domain}`, phone: '+1 (415) 555-0132' },
  footer: {
    line: `© 2026 ${kela.name}, Inc. All rights reserved.`,
    colophon: `${kela.name} is a financial technology company, not a bank. Banking services provided by partner banks.`,
    columns: [
      { title: 'Products', links: ['Payments API', 'Ledgers', 'Payouts', 'Fraud prevention', 'Balances'] },
      { title: 'Developers', links: ['Documentation', 'API reference', 'SDKs', 'Changelog', 'Status'] },
      { title: 'Company', links: ['About', 'Careers', 'Press', 'Security', 'Contact'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'Licenses', 'Cookies'] },
    ],
  },
};
