import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');
const kelaSlug = kela.domain.split('.')[0];

export const content = {
  brand: { name: `${kela.name}`, tagline: 'The deploy pipeline for teams who ship daily.' },
  nav: [
    { label: 'Docs', href: '#quickstart' },
    { label: 'API', href: '#api' },
    { label: 'Changelog', href: '#changelog' },
    { label: 'Pricing', href: '#cta' },
  ],
  github: { label: 'Star on GitHub', stars: '24.8k', href: '#cta' },
  hero: {
    eyebrow: 'v2.4 — now with one-command rollbacks',
    title: 'From commit to production in 43 seconds.',
    sub: `${kela.name} is the deploy pipeline for teams who ship daily. Previews for every PR, edge deploys with zero config, and rollbacks that take one command — not one incident review.`,
    ctaPrimary: 'Start shipping',
    ctaPrimaryHref: '#quickstart',
    ctaSecondary: 'Read the docs',
    ctaSecondaryHref: '#quickstart',
    terminal: {
      title: 'terminal — zsh',
      cmd: `npm i -g ${kelaSlug}`,
      lines: [
        { text: 'added 42 packages in 1.2s', tone: 'dim' },
        { text: `${kelaSlug} init`, tone: 'cmd' },
        { text: 'linked repo acme/web → project acme-web', tone: 'ok' },
        { text: 'detected Next.js 14 · node 20 · pnpm', tone: 'ok' },
        { text: 'preview environment provisioned', tone: 'ok' },
        { text: `run \`${kelaSlug} deploy\` to ship it`, tone: 'dim' },
      ],
    },
    stats: [
      { value: '4.2M', label: 'deploys / month' },
      { value: '99.99%', label: 'platform uptime' },
      { value: '34', label: 'edge regions' },
    ],
  },
  quickstart: {
    eyebrow: 'Quickstart',
    title: 'Live in three commands.',
    body: 'No dashboard spelunking, no YAML archaeology. Install the CLI, link your repo, deploy. Most teams ship their first preview in under five minutes.',
    toc: ['Install the CLI', 'Link your repo', 'Deploy'],
    steps: [
      {
        id: 'install',
        num: '01',
        title: 'Install the CLI',
        body: 'One package, zero dependencies, works on macOS, Linux, and Windows. Ships its own updater — you will never think about it again.',
        code: [`npm i -g ${kelaSlug}`, '# or, via homebrew', `brew install ${kelaSlug}/tap/${kelaSlug}`],
      },
      {
        id: 'link',
        num: '02',
        title: 'Link your repo',
        body: `${kela.name} detects your framework, runtime, and package manager, then provisions a preview environment scoped to your branch.`,
        code: [`${kelaSlug} init`, '# detected: Next.js 14 · node 20', '# preview env ready'],
      },
      {
        id: 'deploy',
        num: '03',
        title: 'Deploy',
        body: 'Push to main or run the command. Atomic deploys, instant cache invalidation, and a URL you can share before the build finishes.',
        code: [`${kelaSlug} deploy --prod`, '# ✓ live in 41s', `# https://acme-web.${kela.domain}`],
      },
    ],
  },
  typer: {
    eyebrow: 'The workflow',
    title: 'Scroll. Watch the CLI work.',
    hint: 'Keep scrolling — each command types itself',
    steps: [
      {
        cmd: `${kelaSlug} preview`,
        output: ['→ build finished in 38s · 214 files', `✓ live: https://pr-482.${kela.domain}`],
        panel: {
          kicker: 'Previews',
          title: 'Instant previews',
          body: 'Every pull request gets its own production-grade URL. Share it with design, break it in QA, merge with confidence.',
          imgKey: 'product-0',
          alt: 'Monitor glowing in a dark room with blurred code on screen',
        },
      },
      {
        cmd: `${kelaSlug} deploy --edge`,
        output: ['→ pushing to 34 regions · 0 config', '✓ deployed in 41s — cache warm'],
        panel: {
          kicker: 'Deploys',
          title: 'Edge deploys',
          body: 'Atomic deploys to 34 regions with zero configuration. Instant invalidation, instant rollback window, boring in the best way.',
          imgKey: 'product-1',
          alt: 'Developer at a desk with glowing monitors, seen from behind',
        },
      },
      {
        cmd: `${kelaSlug} logs --tail`,
        output: ['200 GET  /api/checkout   12ms', '200 POST /api/orders     31ms', '✓ streaming production logs…'],
        panel: {
          kicker: 'Observability',
          title: 'Logs that find you first',
          body: 'Tail production logs, trace every request end to end, and get alerted before your users notice anything is wrong.',
          imgKey: 'product-2',
          alt: 'Server rack LEDs glowing green and amber in the dark',
        },
      },
      {
        cmd: `${kelaSlug} rollback`,
        output: ['→ rolling back to build #1182', '✓ live in 6s — zero downtime'],
        panel: {
          kicker: 'Rollbacks',
          title: 'One-command rollbacks',
          body: 'Bad deploy? One command returns you to the last good build. Six seconds, zero downtime, zero incident review.',
          imgKey: 'detail',
          alt: 'Extreme macro of a single backlit keycap glowing green',
        },
      },
    ],
  },
  api: {
    eyebrow: 'API reference',
    title: 'Everything the CLI does, over HTTPS.',
    body: 'A REST API with the same primitives as the dashboard and the CLI. Token auth, idempotent writes, webhooks for every event.',
    endpoints: [
      { method: 'GET', path: '/v1/deploys', desc: 'List deploys for a project, newest first' },
      { method: 'POST', path: '/v1/deploys', desc: 'Trigger a deploy from a branch or commit' },
      { method: 'GET', path: '/v1/deploys/{id}', desc: 'Get build status, logs, and artifacts' },
      { method: 'POST', path: '/v1/rollbacks', desc: 'Roll back to any previous build' },
      { method: 'GET', path: '/v1/logs', desc: 'Stream production logs in real time' },
      { method: 'DELETE', path: '/v1/projects/{id}', desc: 'Delete a project and its environments' },
    ],
    note: 'Full reference with 40+ endpoints in the docs →',
  },
  changelog: {
    eyebrow: 'Changelog',
    title: 'Shipped recently.',
    entries: [
      {
        version: 'v2.4.0',
        date: 'Sep 28, 2026',
        tag: 'minor',
        items: [
          `One-command rollbacks: \`${kelaSlug} rollback\` returns any project to its last good build in seconds.`,
          'Preview environments now support monorepos with per-package URLs.',
          'Edge cache purge is 3× faster across all 34 regions.',
        ],
      },
      {
        version: 'v2.3.2',
        date: 'Sep 12, 2026',
        tag: 'patch',
        items: [
          'Fixed a cache-invalidation race on multi-region deploys.',
          `\`${kelaSlug} logs --tail\` latency reduced by 40%.`,
        ],
      },
      {
        version: 'v2.3.0',
        date: 'Aug 30, 2026',
        tag: 'minor',
        items: [
          'Observability is GA: request tracing, log drains, and alerting webhooks.',
          `New \`${kelaSlug} env\` commands for managing preview environment variables.`,
        ],
      },
    ],
  },
  cta: {
    eyebrow: 'Get started',
    title: 'Your next deploy is one command away.',
    code: `npm i -g ${kelaSlug}`,
    button: 'Start shipping free',
    note: 'Free for personal projects. No credit card required.',
  },
  footer: {
    tagline: 'The deploy pipeline for teams who ship daily.',
    cols: [
      { title: 'Product', links: ['Docs', 'API reference', 'Changelog', 'Pricing', 'Status'] },
      { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press kit'] },
      { title: 'Resources', links: ['Support', 'Security', 'Templates', 'Community'] },
      { title: 'Legal', links: ['Privacy', 'Terms', 'DPA'] },
    ],
    contact: { email: `hello@${kela.domain}`, github: `github.com/${kelaSlug}` },
    line: `© 2026 ${kela.name}, Inc. All systems operational.`,
  },
};
