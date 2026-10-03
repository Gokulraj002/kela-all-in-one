import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');

export const content = {
  brand: { name: `${kela.name}`, tagline: 'Spend smarter, live brighter.' },
  nav: [
    { label: 'Features', href: '#features' },
    { label: 'Stories', href: '#stories' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Download', href: '#download' },
  ],
  hero: {
    eyebrow: 'The friendly money app',
    title: 'Spend smarter, live brighter.',
    sub: `${kela.name} is the money app that feels like a friend — gentle budgets, instant insights and shared wallets that make every rupee feel good. No jargon, no judgment, just brighter money days.`,
    badges: [
      { store: 'App Store', kicker: 'Download on the', icon: 'apple' },
      { store: 'Google Play', kicker: 'Get it on', icon: 'play' },
    ],
    rating: '4.9 · 120,000+ happy ratings',
    photoCaption: 'Mornings, sorted.',
    stickers: ['+₹2,400 saved this month', 'No hidden fees', '4.9 rating'],
  },
  featuresMeta: {
    eyebrow: 'Features',
    title: 'Four little superpowers.',
    lede: `Scroll on — each screen springs into the phone as its story unfolds. This is ${kela.name}, assembling itself just for you.`,
  },
  features: [
    {
      id: 'budgets',
      title: 'Smart budgets',
      desc: `${kela.name} learns how you spend and sketches a flexible budget every month. Splurge on coffee with friends? It nudges gently — never nags — and reshuffles the rest so you still hit your goals.`,
      points: ['Auto-created from your habits', 'Gentle nudges, zero shame', 'Rollover whatever you save'],
      screen: {
        ringLabel: '₹18,240',
        ringSub: 'left of ₹24,000',
        bars: [
          { label: 'Food & drink', w: 82 },
          { label: 'Fun', w: 45 },
          { label: 'Travel', w: 63 },
        ],
      },
    },
    {
      id: 'insights',
      title: 'Instant insights',
      desc: 'Every rupee, beautifully sorted the second you spend it. Spot the sneaky subscriptions, the weekend splurges and the patterns you never noticed — in plain, friendly words.',
      points: ['Real-time categorisation', 'Subscription radar', 'A weekly money snapshot'],
      screen: {
        bars: [34, 52, 44, 68, 58, 82, 64],
        pill: 'Dining out down 12% — nice!',
      },
    },
    {
      id: 'wallets',
      title: 'Shared wallets',
      desc: 'Split rent, road trips and Tuesday dosas without the awkward math. Everyone sees what is shared, what is settled, and who owes the samosas.',
      points: ['Split any bill in seconds', 'Settle up in one tap', 'Made for couples & roommates'],
      screen: {
        title: 'Goa trip',
        members: ['AK', 'RM', '+2'],
        rows: [
          { text: 'Rohan paid dinner', amt: '₹1,200' },
          { text: 'You owe Ananya', amt: '₹340' },
          { text: 'Cab split · settled', amt: '✓' },
        ],
      },
    },
    {
      id: 'rewards',
      title: 'Rewards',
      desc: `Saving streaks, smart-spend badges and cashback that actually adds up. ${kela.name} celebrates your wins — because good money habits deserve confetti.`,
      points: ['Cashback on everyday spends', 'Streaks & badges to collect', 'Redeem in one tap'],
      screen: {
        points: '2,450',
        tier: 'Gold tier — 550 pts to go',
        progress: 78,
      },
    },
  ],
  stories: {
    eyebrow: 'Wall of love',
    title: 'People are smiling about money again.',
    caption: 'Split the picnic, not the friendship — shared wallets in the wild.',
  },
  reviews: [
    {
      quote: `${kela.name} made budgeting feel like a game I actually want to win. I have saved more in three months than in the last three years.`,
      name: 'Ananya S.', role: 'Product designer · Bengaluru', stars: 5,
    },
    {
      quote: 'The shared wallet ended the “you owe me” era in our flat. Rent day is finally drama-free.',
      name: 'Rohan M.', role: 'Roommate-in-chief · Mumbai', stars: 5,
    },
    {
      quote: 'I downloaded it for the cute design and stayed for the insights. It found two subscriptions I had forgotten for a whole year.',
      name: 'Priya K.', role: 'New mom & saver · Hyderabad', stars: 5,
    },
  ],
  band: {
    title: 'Money, minus the frown.',
    body: `${kela.name} speaks human, not banker. Every screen is designed to make you feel capable — because you are.`,
    stats: [
      { value: '2M+', label: 'happy downloads' },
      { value: '4.9', label: 'average rating' },
      { value: '₹0', label: 'hidden fees, ever' },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    title: 'Up and running in minutes.',
    items: [
      { title: 'Link your accounts', desc: 'Connect your bank in under two minutes with bank-grade encryption. Read-only access, always.' },
      { title: 'Meet your money', desc: `${kela.name} sorts your spending into a clear, cheerful picture — no spreadsheets required.` },
      { title: 'Watch it grow', desc: 'Set a goal, follow gentle nudges, and celebrate every milestone with confetti.' },
    ],
  },
  pricing: {
    eyebrow: 'Pricing',
    title: 'Start free, upgrade when it clicks.',
    tiers: [
      {
        name: `${kela.name} Free`, price: 0, period: 'forever',
        blurb: 'Everything you need to start.',
        points: ['Smart budgets', 'Spending insights', '1 shared wallet'],
        cta: 'Get started',
      },
      {
        name: `${kela.name} Plus`, price: 149, period: '/month',
        blurb: 'For money on a mission.',
        points: ['Everything in Free', 'Unlimited shared wallets', 'Subscription radar', 'Priority support'],
        cta: 'Go Plus', hot: true,
      },
      {
        name: `${kela.name} Family`, price: 249, period: '/month',
        blurb: 'The whole household.',
        points: ['Everything in Plus', '5 seats included', 'Family goals', 'Kids’ pocket money'],
        cta: 'Bring the family',
      },
    ],
  },
  download: {
    title: 'Your brighter money life is one tap away.',
    sub: 'Join 2 million+ happy savers. Free forever plan, no card required, cancel anytime — though we doubt you will want to.',
    note: 'Free forever · No card required · Cancel anytime',
  },
  contact: { email: `hello@${kela.domain}`, instagram: `@${kela.instagram}` },
  footer: {
    line: `© 2026 ${kela.name} Pvt. Ltd. Made with warmth in Bengaluru.`,
    cols: [
      { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'Download', href: '#download' }] },
      { title: 'Company', links: [{ label: 'Stories', href: '#stories' }, { label: 'How it works', href: '#steps' }, { label: 'Contact', href: `mailto:hello@${kela.domain}` }] },
    ],
  },
};
