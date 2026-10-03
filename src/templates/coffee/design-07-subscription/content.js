import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

/* Kela Cafe (subscription) — content. Prices are ₹ numbers. JSON-compatible (no functions). */
export const content = {
  brand: { name: kela.name, tagline: 'Fresh coffee, on your schedule' },
  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'Build your plan', href: '#builder' },
    { label: 'Find your match', href: '#quiz' },
    { label: 'The lineup', href: '#lineup' },
    { label: 'FAQ', href: '#faq' },
  ],
  hero: {
    eyebrow: 'Coffee subscription, done properly',
    title: 'Never run out of great coffee again.',
    sub: 'Fresh-roasted beans arrive on your schedule. Pause, skip, or cancel anytime — no commitment, just coffee that shows up before you need it.',
    cta: 'Build your plan',
    ctaSecondary: 'Take the 2-minute taste quiz',
    reassurance: 'First box ships in 48 hours · Free shipping over ₹499 · Pause or cancel anytime',
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three steps to a full cupboard',
    steps: [
      { title: 'Pick your coffee', body: 'Choose a roast and grind that match your brewer. We roast every Tuesday and Friday.' },
      { title: 'Set your rhythm', body: 'Weekly, fortnightly, or monthly. Your first delivery lands within two days.' },
      { title: 'We roast and ship', body: 'Beans leave the roastery the same day they are roasted. Pause, skip, or cancel whenever.' },
    ],
  },
  builder: {
    eyebrow: 'Plan builder',
    title: 'Build your plan',
    sub: 'Five small choices. One perfect delivery.',
    ctaStart: 'Start my subscription',
    perDelivery: 'per delivery',
    firstDelivery: 'First delivery',
    summaryTitle: 'Your plan',
    reassurance: ['Pause, skip, or cancel anytime', 'Roasted the day it ships', 'Free shipping over ₹499'],
    methods: [
      { id: 'espresso', label: 'Espresso', desc: 'Fine, punchy shots' },
      { id: 'filter', label: 'Pour-over / Filter', desc: 'Clean, bright cups' },
      { id: 'press', label: 'French Press', desc: 'Full, round body' },
      { id: 'moka', label: 'Moka Pot', desc: 'Bold, stovetop style' },
    ],
    coffees: [
      { id: 'chorus', label: 'Morning Chorus Blend', desc: 'Dark chocolate · Caramel · Sweet', note: 'Crowd favourite', roast: 'Medium roast', price: 420 },
      { id: 'chikmagalur', label: 'Chikmagalur Single Origin', desc: 'Citrus · Floral · Honey', note: 'Light roast', roast: 'Light roast', price: 540 },
      { id: 'peaberry', label: 'Coorg Peaberry Reserve', desc: 'Dark chocolate · Spice · Molasses', note: 'Limited lot', roast: 'Dark roast', price: 680 },
    ],
    amounts: [
      { id: '250', label: '250 g', desc: 'For the solo ritual — about 15 cups', mult: 1 },
      { id: '500', label: '500 g', desc: 'For two, every morning — about 30 cups', mult: 1.9 },
      { id: '1000', label: '1 kg', desc: 'For the devoted — about 60 cups', mult: 3.6 },
    ],
    grinds: [
      { id: 'whole', label: 'Whole Bean', desc: 'Stays fresher, longer' },
      { id: 'fine', label: 'Espresso', desc: 'Fine grind' },
      { id: 'medium', label: 'Filter', desc: 'Medium grind' },
      { id: 'coarse', label: 'French Press', desc: 'Coarse grind' },
    ],
    frequencies: [
      { id: 'weekly', label: 'Every week', desc: 'Never miss a morning', discount: 0, tag: 'Most flexible' },
      { id: 'fortnightly', label: 'Every 2 weeks', desc: 'The steady rhythm', discount: 0.05, tag: 'Save 5%' },
      { id: 'monthly', label: 'Every month', desc: 'The slow stock-up', discount: 0.1, tag: 'Save 10%' },
    ],
    success: {
      title: 'You are on the list.',
      body: 'Your first box is being prepared. We will confirm the delivery slot by email before it ships.',
    },
  },
  quiz: {
    eyebrow: 'Taste quiz',
    title: 'Find your match in two minutes',
    sub: 'Three questions. One bag we would bet on.',
    questions: [
      { q: 'How do you take your coffee?', options: ['Black, no distractions', 'With milk', 'Espresso-based, always'] },
      { q: 'Which of these sounds best?', options: ['Bright and fruity', 'Chocolatey and comforting', 'Bold and intense'] },
      { q: 'How many cups a day?', options: ['One slow cup', 'Two, like clockwork', 'Three or more'] },
    ],
    results: [
      { coffee: 'Chikmagalur Single Origin', why: 'You like it bright and deliberate. A washed light roast with citrus and honey notes, built for slow black cups.' },
      { coffee: 'Morning Chorus Blend', why: 'You like comfort in a cup. A chocolatey medium roast that holds up beautifully with milk.' },
      { coffee: 'Coorg Peaberry Reserve', why: 'You like it bold. A dark, intense peaberry lot that cuts through milk and mornings alike.' },
    ],
    apply: 'Use this in my plan',
    retake: 'Retake the quiz',
  },
  lineup: {
    eyebrow: 'The lineup',
    title: 'What you can subscribe to',
    sub: 'Three roasts, always fresh, always on rotation. Every plan starts here.',
  },
  proof: {
    eyebrow: 'Proof',
    title: 'Kitchens that never run dry',
    items: [
      { quote: 'The box arrives like clockwork and the beans are still warm some weeks. I have stopped thinking about coffee shopping entirely.', name: 'Meera K.', place: 'Bengaluru' },
      { quote: 'Paused for a month when I travelled, resumed in two taps. This is how every subscription should behave.', name: 'Arjun S.', place: 'Mumbai' },
      { quote: 'Took the quiz, got the Peaberry, never looked back. My French press has never been happier.', name: 'Divya R.', place: 'Pune' },
    ],
  },
  faq: {
    eyebrow: 'The fine print, in large print',
    title: 'Pause. Skip. Cancel. Really.',
    items: [
      { q: 'Can I really cancel anytime?', a: 'Yes. No lock-in, no exit fee, no phone call. Pause, skip a delivery, or cancel from your account in under a minute.' },
      { q: 'How fresh is the coffee?', a: 'We roast every Tuesday and Friday and ship the same day. Your bag is typically under 72 hours off roast when it reaches you.' },
      { q: 'What if I travel?', a: 'Skip any delivery or pause the whole plan. Your rhythm waits for you — nothing ships while you are away.' },
      { q: 'Do you ship to my city?', a: 'We ship across India. Shipping is free on orders over ₹499; a flat ₹49 applies below that.' },
      { q: 'Whole bean or ground?', a: 'Whole bean stays fresher longer, but we will grind to your brewer — espresso, filter, or French press — right before shipping.' },
      { q: 'Can I gift a subscription?', a: 'Yes. Choose any plan, add a gift note at checkout, and we will include a tasting card in every box.' },
    ],
  },
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 98200 12345',
    hours: 'Roastery: Tue–Sat, 8am–6pm',
  },
  footer: {
    line: `© 2026 ${kela.name} Co. Roasted in Bengaluru, shipped across India.`,
    gifting: 'Gifting a plan? Add a note at checkout — every box ships with a tasting card.',
  },
};
