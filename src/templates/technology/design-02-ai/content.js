import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');
const kelaSlug = kela.domain.split('.')[0];
const kelaClass = kela.name.replace(/\s+/g, '');

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'Frontier intelligence, engineered for production',
  },
  nav: [
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Models', href: '#models' },
    { label: 'Research', href: '#research' },
  ],
  hero: {
    eyebrow: `${kela.name} 1 · Now generally available`,
    title: 'Intelligence, engineered.',
    sub: 'The frontier model family built for production: a two-million-token context window, tool use that actually works, and latency your users will never notice.',
    ctaPrimary: 'Start building',
    ctaPrimaryHref: '#contact',
    ctaSecondary: 'Read the research',
    ctaSecondaryHref: '#research',
    meta: [
      { k: 'Context', v: '2M tokens' },
      { k: 'Latency', v: '140ms TTFT' },
      { k: 'Uptime', v: '99.99% SLA' },
    ],
  },
  pulse: {
    eyebrow: 'Under the hood',
    title: 'One architecture, four instincts.',
    body: 'Scroll through the network. Every node that lights is a capability waking up inside the same model — reasoning, perception, action, and adaptation, wired together.',
    hint: 'Scroll — the pulse travels with you',
  },
  capabilities: [
    {
      id: 'reasoning',
      title: 'Reasoning',
      tag: 'Chain-of-thought at scale',
      desc: `${kela.name} 1 works through multi-step problems the way your best engineer does — decomposing, checking its own work, and showing every step. 94.2 on GPQA Diamond, 89.1 on SWE-bench Verified.`,
      stat: { value: '94.2', label: 'GPQA Diamond' },
    },
    {
      id: 'vision',
      title: 'Vision',
      tag: 'Sees what you see',
      desc: 'Native multimodal understanding across images, documents, charts, and video frames. Hand it a 400-page technical manual or a dense operations dashboard — it reads both like a specialist.',
      stat: { value: '400+', label: 'Pages per document' },
    },
    {
      id: 'agents',
      title: 'Agents',
      tag: 'Does the work, not just the talking',
      desc: `${kela.name} 1 plans, calls your tools, recovers from failures, and finishes the job — with a full audit trail of every action it took and why it took it.`,
      stat: { value: '40h', label: 'Longest verified run' },
    },
    {
      id: 'tuning',
      title: 'Fine-tuning',
      tag: 'Your model, your domain',
      desc: `Distill ${kela.name} 1 into a model that speaks your industry\u2019s language. Upload evals, set the bar, and ship a custom variant in hours. Your data never trains our models.`,
      stat: { value: '0', label: 'Data retained' },
    },
  ],
  models: {
    eyebrow: 'The lineup',
    title: 'Pick your weight class.',
    body: 'Three models, one API. Every tier gets the full context window of its class, tool use, and our eval harness — you only trade speed for depth.',
    items: [
      {
        id: 'pro',
        name: `${kela.name} 1 Pro`,
        badge: 'Flagship',
        desc: 'For the hardest problems: deep research, sprawling codebases, agentic workflows that run for hours.',
        context: '2M tokens',
        output: '128K output',
        modes: 'Text · Vision · Audio',
        input: 120,
        outputPrice: 480,
        unit: 'per 1M tokens',
        featured: true,
      },
      {
        id: 'flash',
        name: `${kela.name} 1 Flash`,
        badge: 'Workhorse',
        desc: 'The everyday engine — 3\u00D7 faster than Pro at a fraction of the cost. Tuned for chat, RAG, and high-volume automation.',
        context: '1M tokens',
        output: '64K output',
        modes: 'Text · Vision',
        input: 30,
        outputPrice: 120,
        unit: 'per 1M tokens',
        featured: false,
      },
      {
        id: 'nano',
        name: `${kela.name} 1 Nano`,
        badge: 'Edge',
        desc: 'Distilled for the edge: runs on-device and in-region with sub-second responses for classification, extraction, and guardrails.',
        context: '128K tokens',
        output: '16K output',
        modes: 'Text',
        input: 6,
        outputPrice: 24,
        unit: 'per 1M tokens',
        featured: false,
      },
    ],
  },
  metrics: {
    eyebrow: 'In production',
    items: [
      { target: 2, decimals: 0, suffix: 'M', label: 'token context window' },
      { target: 140, decimals: 0, suffix: 'ms', label: 'median time to first token' },
      { target: 99.99, decimals: 2, suffix: '%', label: 'uptime SLA, trailing year' },
      { target: 4200, decimals: 0, suffix: '+', label: `teams building on ${kela.name}` },
    ],
  },
  research: {
    eyebrow: 'From the lab',
    title: 'Research notes.',
    body: `We publish what we learn. The papers below are the reason ${kela.name} 1 behaves the way it does in production.`,
    papers: [
      {
        title: `${kela.name} 1: A Frontier Model Family for Long-Horizon Work`,
        venue: 'Technical Report',
        year: '2026',
        abstract:
          'How we trained a 2M-context model to stay coherent across forty-hour agentic runs — the architecture, the data curation, and the eval suite we built to prove it.',
      },
      {
        title: 'Verifiable Reasoning: Teaching Models to Show Their Work',
        venue: 'NeurIPS',
        year: '2026',
        abstract:
          'A training recipe that rewards checkable reasoning traces, cutting hallucinations on math and code benchmarks by sixty-one percent.',
      },
      {
        title: 'Distillation at Scale: Nano Without the Compromise',
        venue: 'ICLR',
        year: '2026',
        abstract:
          `Compressing a frontier model forty-fold while keeping ninety-seven percent of benchmark performance — the method behind ${kela.name} 1 Nano.`,
      },
    ],
  },
  cta: {
    eyebrow: 'Get started',
    title: 'Start building.',
    body: 'Your first million tokens are on us. Ship something tonight.',
    primary: 'Get an API key',
    primaryHref: '#contact',
    secondary: 'Talk to sales',
    code: [
      `$ pip install ${kelaSlug}`,
      `from ${kelaSlug} import ${kelaClass}`,
      '',
      `client = ${kelaClass}(api_key="k_live_\u2026")`,
      'answer = client.complete(',
      '    "Summarize the failure modes in this log.",',
      `    model="${kelaSlug}-1-flash",`,
      ')',
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    sales: `sales@${kela.domain}`,
    address: 'Pier 9, Suite 240 · San Francisco',
  },
  footer: {
    line: `\u00A9 2026 ${kela.name}, Inc.`,
    colophon: 'Designed in the dark. Built for the light.',
  },
};
