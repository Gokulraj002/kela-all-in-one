import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');
const kelaSlug = kela.domain.split('.')[0];

export const content = {
  brand: { name: `${kela.name}`, tagline: 'The open framework, built in the open' },
  nav: [
    { label: 'Docs', href: '#craft' },
    { label: 'Showcase', href: '#gallery' },
    { label: 'Blog', href: '#story' },
  ],
  github: { stars: '48.2k', forks: '6.1k' },

  hero: {
    eyebrow: 'v4.2 "Willow" is out · MIT licensed',
    title: 'Build together.',
    sub: `${kela.name} is the open-source framework maintained by a community of 2,140 contributors. Every commit, review, and docs fix is public — the roadmap is written by the people who use it.`,
    starCta: 'Star',
    forkCta: 'Fork',
  },

  wall: {
    eyebrow: 'The community wall',
    title: 'Every commit adds a face.',
    body: 'Scroll and watch the year fill in. Each tile is a contributor who shipped this quarter — from one-line docs fixes to core rewrites. Keep scrolling until the mosaic is complete.',
    commits: 12480,
    commitLabel: 'commits this quarter',
    legend: [
      { swatch: 'purple', label: 'Core & reviews' },
      { swatch: 'green', label: 'Plugins & docs' },
      { swatch: 'paper', label: 'First-time contributors' },
    ],
    hint: 'Scroll — the wall fills with you',
  },

  features: {
    eyebrow: `Why ${kela.name}`,
    title: 'Open down to the license.',
    items: [
      {
        title: 'MIT licensed',
        body: 'Use it anywhere — commercial, personal, embedded. No CLA theatrics, no dual-license traps. The license is one paragraph and it stays that way.',
        caption: 'One paragraph. Forever.',
      },
      {
        title: 'Plugin ecosystem',
        body: '1,900 community plugins and counting. The core stays small by design; everything extra ships as a reviewed, versioned plugin anyone can publish.',
        caption: '1,900 plugins and counting.',
      },
      {
        title: 'First-class docs',
        body: 'Docs are a release gate, not an afterthought. Every PR needs docs, every release gets a migration guide, and the docs site is translated by volunteers.',
        caption: 'Docs are a release gate.',
      },
    ],
  },

  showcase: {
    eyebrow: 'Community showcase',
    title: `Built with ${kela.name}.`,
    body: `A few of the 12,000+ projects shipping on ${kela.name} this year — from indie side projects to production systems.`,
    projects: [
      {
        name: 'Ferncast',
        desc: `A podcast CMS that turned its whole editor into ${kela.name} plugins. 40k downloads a month.`,
        stars: '3.2k',
        tags: ['CMS', 'Plugins'],
        tone: 'purple',
      },
      {
        name: 'Driftline',
        desc: `Realtime transit maps for 12 cities, rendered on the ${kela.name} component grid.`,
        stars: '5.8k',
        tags: ['Maps', 'Realtime'],
        tone: 'green',
      },
      {
        name: 'Loamplight',
        desc: `A cozy lo-fi streaming studio built in a weekend at ${kela.name} Conf.`,
        stars: '1.9k',
        tags: ['Media', 'Weekend build'],
        tone: 'paper',
      },
    ],
    moreCta: 'Browse all 12,000+',
  },

  stats: {
    eyebrow: `${kela.name}, by the numbers`,
    items: [
      { value: 48200, display: '48,200', label: 'GitHub stars' },
      { value: 2140, display: '2,140', label: 'Contributors' },
      { value: 940, display: '940', suffix: 'k', label: 'Weekly downloads' },
    ],
  },

  docs: {
    eyebrow: 'Docs teaser',
    title: 'Hello, world. For real this time.',
    body: 'The fastest way to feel the whole thing: scaffold an app, start the dev server, and open your first pull request before lunch.',
    steps: [
      { cmd: `npm create ${kelaSlug}@latest my-app`, note: 'Scaffold in seconds' },
      { cmd: 'cd my-app && npm run dev', note: 'Hot reload, zero config' },
      { cmd: 'git push && open a PR', note: 'We review within 48 hours' },
    ],
    cta: 'Read the docs',
  },

  cta: {
    eyebrow: 'Join 2,140 builders',
    title: 'Star us on GitHub.',
    body: 'A star is a vote for the open web. A pull request is even better — good first issues are labeled and waiting.',
    starCta: 'Star on GitHub',
  },

  contact: { email: `hello@${kela.domain}` },

  footer: {
    line: `${kela.name} is a community project. MIT licensed — forever.`,
    colophon: 'Built in the open · Released monthly · Reviewed by humans',
    columns: [
      { head: 'Project', links: ['Docs', 'Changelog', 'Roadmap', 'Releases'] },
      { head: 'Community', links: ['Contributors', 'Code of conduct', `${kela.name} Conf`, 'Discord'] },
      { head: 'More', links: ['Blog', 'Brand kit', 'Security', 'Sponsors'] },
    ],
  },
};
