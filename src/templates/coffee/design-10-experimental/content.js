import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Taste the unrepeatable' },
  nav: {
    protocol: 'EXP. SERIES 09 — ONGOING',
    links: [
      { label: 'The Experiment', href: '#hero' },
      { label: 'The Protocol', href: '#experiment' },
      { label: 'Sensory', href: '#sensory' },
      { label: 'Sessions', href: '#sessions' },
      { label: 'Manifesto', href: '#manifesto' },
    ],
    book: 'Book a session',
  },
  hero: {
    eyebrow: `${kela.name} · Est. for the curious`,
    title: 'Taste the unrepeatable',
    sub: 'Every batch is an experiment. Every cup is a result. We brew coffee the way laboratories run trials — under pressure, in glass, and slightly on fire.',
    cta: 'Book a session',
    secondary: 'Read the protocol',
  },
  experiment: {
    eyebrow: 'The experiment · Current series',
    title: 'Four methods. Zero routine.',
    sub: 'Select a method to inspect its protocol. Temperature, time and ratio are not suggestions — they are the experiment.',
    methods: [
      {
        id: 'siphon', name: 'Siphon', code: 'M-01', batch: 'BATCH 047',
        img: 'hero', alt: 'Glass siphon brewer with vapor rising in dark lab light',
        temp: '94°C', time: '2:40', ratio: '1:15',
        desc: 'Vacuum pressure drags 94-degree water through the grounds and holds it there, suspended, until release. The result is impossibly clean — coffee with the sediment of doubt removed.',
        rings: [
          { label: 'Body', v: 0.55 },
          { label: 'Acidity', v: 0.9 },
          { label: 'Sweetness', v: 0.6 },
          { label: 'Texture', v: 0.95 },
        ],
        note: 'Tastes like lightning in a teacup.',
      },
      {
        id: 'nitro', name: 'Nitro', code: 'M-02', batch: 'BATCH 048',
        img: 'product-0', alt: 'Nitro cold brew cascading down a tall glass against black',
        temp: '4°C', time: '18:00', ratio: '1:10',
        desc: 'Eighteen hours of cold steeping, then charged with nitrogen and poured under pressure. The cascade is not decoration — it is texture being built in front of you.',
        rings: [
          { label: 'Body', v: 0.95 },
          { label: 'Acidity', v: 0.35 },
          { label: 'Sweetness', v: 0.7 },
          { label: 'Texture', v: 1.0 },
        ],
        note: 'Tastes like velvet that decided to be coffee.',
      },
      {
        id: 'cascara', name: 'Cascara', code: 'M-03', batch: 'BATCH 049',
        img: 'product-1', alt: 'Tasting flight of three coffees in small glasses on black slate',
        temp: '88°C', time: '4:00', ratio: '1:18',
        desc: 'Not the seed — the fruit. Dried coffee cherry steeped like tea, served sparkling over ice. The part of the harvest the industry used to throw away, now the strangest thing on the menu.',
        rings: [
          { label: 'Body', v: 0.4 },
          { label: 'Acidity', v: 0.75 },
          { label: 'Sweetness', v: 0.85 },
          { label: 'Texture', v: 0.5 },
        ],
        note: 'Tastes like the cherry finally getting its say.',
      },
      {
        id: 'fermentation', name: 'Fermentation', code: 'M-04', batch: 'BATCH 050',
        img: 'product-2', alt: 'Extreme macro of dark roasted beans with vapor, persimmon side light',
        temp: '21°C', time: '96:00', ratio: '1:14',
        desc: 'Ninety-six hours of controlled anaerobic fermentation before the roast — yeast, pressure, and patience rewriting the bean from the inside. Funky is a technical term here.',
        rings: [
          { label: 'Body', v: 0.8 },
          { label: 'Acidity', v: 0.85 },
          { label: 'Sweetness', v: 0.55 },
          { label: 'Texture', v: 0.7 },
        ],
        note: 'Tastes like the lab got excited and forgot to stop.',
      },
    ],
    menuTitle: 'The current experiment menu',
    menu: [
      { name: 'Siphon Ritual', batch: 'B-047', desc: 'Vacuum-brewed single origin, served in glass', price: 420 },
      { name: 'Nitro Cascade', batch: 'B-048', desc: '18-hour cold brew, nitrogen-charged, on tap', price: 380 },
      { name: 'Cascara Tonic', batch: 'B-049', desc: 'Sparkling cascara over ice, orange oils', price: 340 },
      { name: 'Ferment Flight', batch: 'B-050', desc: 'Three pours of the anaerobic series, side by side', price: 520 },
    ],
  },
  sensory: {
    eyebrow: 'Sensory language',
    title: 'We describe flavour the way it arrives',
    cards: [
      { label: 'As colour', title: 'Persimmon & ash', body: 'Our naturals land in persimmon — saturated, warm, almost too bright. Our washed lots are ash and bone: pale, precise, gone before you name them.' },
      { label: 'As texture', title: 'Silk, static, velvet', body: 'Siphon is silk pulled tight. Nitro is velvet with weight. The ferment series is static — a pleasant electricity on the tongue that refuses to sit still.' },
      { label: 'As sound', title: 'First crack, amplified', body: 'Every roast is recorded. First crack at 196°C sounds like distant applause; we play it back in the lab while you taste, so the cup has a soundtrack.' },
    ],
    img: 'detail', alt: 'Abstract marbled latte art from above, persimmon rim light',
    caption: 'Fig. 09 — Milk meeting espresso at 62°C. Unrepeatable by definition.',
  },
  sessions: {
    eyebrow: 'Sessions · Booking-first',
    title: 'Book a seat at the bench',
    sub: 'Ninety minutes, six cups, one very opinionated guide. Sessions run Thursday to Sunday. First-timers welcome — curiosity is the only prerequisite.',
    types: [
      { id: 'flight', name: 'Guided Flight', dur: '45 min · 4 pours', desc: 'The fastest route through the current series. Four methods, one bench, zero small talk required.', price: 1200 },
      { id: 'dive', name: 'Deep Dive', dur: '90 min · 6 pours', desc: 'Brew alongside us. You will pull a siphon shot yourself, and you will be graded kindly.', price: 2400 },
      { id: 'dark', name: 'After Dark', dur: '2 hrs · 8 pours', desc: 'Friday nights only. The ferment series, low light, loud opinions. Not for the caffeine-cautious.', price: 3500 },
    ],
    slots: ['10:00', '12:30', '15:00', '17:30', '19:00'],
    steps: ['Session', 'Date & time', 'Confirm'],
    nameLabel: 'Your name', emailLabel: 'Email', confirm: 'Confirm booking', back: 'Back',
    successTitle: 'Seat reserved.',
    successBody: 'A confirmation is on its way to your inbox with the bench number and the pre-session reading (three paragraphs, we promise).',
    faqTitle: 'First-timer protocol',
    faq: [
      { q: 'Do I need to know anything about coffee?', a: 'No. Half our regulars arrived knowing only that they liked it. Curiosity outranks expertise at every session.' },
      { q: 'Will the caffeine be… a lot?', a: 'Six tasting pours is roughly two regular cups, spaced over 90 minutes with palate cleansers. The After Dark session is the exception — pace yourself.' },
      { q: 'Can I buy the beans I taste?', a: 'Every session ends at the retail shelf with the exact lots you drank, roasted within the week. Most people leave with two bags.' },
    ],
  },
  manifesto: {
    lines: ['Coffee is not a beverage.', 'It is a controlled accident.', 'We run the lab so you can taste the lightning.'],
    sign: `— The ${kela.name} protocol, v9.3`,
  },
  contact: {
    email: `bench@${kela.domain}`,
    instagram: `@${kela.instagram}`,
    address: '9 Residency Road, Bengaluru',
    hours: 'Thu–Sun · 10:00–22:00',
  },
  footer: {
    fragment: 'Taste the unrepeatable.',
    line: `© 2026 ${kela.name}`,
    credits: 'All batches logged · Nothing repeated',
  },
};
