import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

/* Kela Studio (agency) — design-09-indie content. All text lives here for the lab's
   Customize panel. First-person throughout; no lorem ipsum, ever. */
export const content = {
  brand: kela.name,

  nav: {
    links: [
      { label: 'Work', href: '#work' },
      { label: 'How I work', href: '#how' },
      { label: 'Notes', href: '#notes' },
      { label: 'About', href: '#about' },
    ],
    cta: { label: 'Say hello', href: '#contact' },
  },

  hero: {
    eyebrow: 'Independent designer — brands & websites',
    name: 'June',
    heading: "I'm June. I make warm, hand-finished brands and websites.",
    statement:
      'No agency, no account managers, no handoffs into the void. When you write to me, I answer. When you hire me, you get me — at my desk, coffee going cold, doing the work myself.',
    availability: 'Now booking — January 2027',
    primaryCta: { label: 'Say hello', href: '#contact' },
    secondaryCta: { label: 'See the work', href: '#work' },
    portraitAlt: 'My desk on a quiet morning — open notebook, coffee steaming, proofs in the light',
    portraitCaption: 'My desk, most mornings.',
    loopAlt: 'Morning light raking across my home-studio desk while I write in my notebook',
  },

  work: {
    eyebrow: 'Selected work',
    heading: 'A few things I made, and what they taught me.',
    intro:
      "I keep my client list short on purpose. Here's a small, honest selection — each one made by hand, each one changed how I work a little.",
    projects: [
      {
        id: 'maple-thread',
        name: 'Maple & Thread',
        kind: 'Brand identity',
        year: '2026',
        note: 'A weaving studio run by two sisters.',
        learned:
          'I learned that a brand can whisper and still be heard. We kept the palette to undyed wool and rust, and their first collection sold out in a week.',
        alt: 'Brand identity flat-lay for a weaving studio — stationery and packaging in wool and rust tones',
      },
      {
        id: 'fern-hollow',
        name: 'Fern Hollow Bakery',
        kind: 'Website',
        year: '2025',
        note: 'A neighborhood bakery that runs on regulars.',
        learned:
          "I learned to design for the 7am phone order, not the awards jury. Big type, the day's menu first, nothing clever — and their regulars noticed.",
        alt: 'Bakery website shown on a laptop in a cozy home studio, warm morning light',
      },
      {
        id: 'copperline',
        name: 'Copperline Roasters',
        kind: 'Packaging & identity',
        year: '2025',
        note: 'Three friends, one roaster, very strong opinions.',
        learned:
          'I learned that compromise is a design tool. The label they all fought over is the one customers keep photographing.',
        alt: 'Printed packaging and identity proofs held in hands, warm daylight',
      },
      {
        id: 'reading-room',
        name: 'The Reading Room',
        kind: 'Website',
        year: '2024',
        note: 'An independent bookshop with a cat named Plot.',
        learned:
          'I learned a website can smell like paper if you write the words right. Their events page now fills the shop every Thursday.',
        alt: 'Website design on a laptop screen, books and tea nearby in soft light',
      },
      {
        id: 'hale-co',
        name: 'Hale & Co. Ceramics',
        kind: 'Brand & website',
        year: '2024',
        note: 'A potter who signs every single piece.',
        learned:
          "I learned to leave fingerprints in. Her maker's mark became the logo — the wobble stayed in the wordmark on purpose.",
        alt: 'Ceramics brand identity spread — cards and stationery in earthy tones',
      },
      {
        id: 'wildseed',
        name: 'Wildseed Farm',
        kind: 'Identity & website',
        year: '2023',
        note: 'A farm stand, a CSA, and big plans.',
        learned:
          'My first farm client taught me seasonality. A brand that changes with the harvest is a brand people come back to.',
        alt: 'Farm brand stationery flat-lay on linen, natural daylight',
      },
    ],
  },

  how: {
    eyebrow: 'How I work',
    heading: "One designer. The whole way through.",
    intro:
      "Working with me is deliberately simple. You'll always know where your project stands, and you'll always be talking to the person doing the work.",
    steps: [
      {
        title: 'We talk.',
        body: 'A real call, thirty minutes, no deck. I ask too many questions and take notes by hand. If we\'re not a fit, I\'ll tell you — and point you to someone who is.',
      },
      {
        title: 'I disappear (politely).',
        body: 'Two to four quiet weeks of sketching, writing, and designing. You get short updates along the way — never radio silence, never a surprise reveal.',
      },
      {
        title: 'We finish together.',
        body: 'We review, we refine, we launch. Then I hand over every file with a guide written in plain English, so you never need me again — though I hope you call.',
      },
    ],
    doList: {
      title: 'What you can expect',
      items: [
        'One project at a time — you are never in a queue',
        'Honest timelines: three to six weeks for most projects',
        'Every file handed over, with a plain-English guide',
        "I'll tell you when an idea isn't worth your money",
      ],
    },
    dontList: {
      title: 'What I won\'t do',
      items: [
        'No rush jobs — good work needs its mornings',
        'No pitch decks or unpaid spec work',
        'No jargon, no upsells, no retainers you don\'t need',
        "I won't pretend to be an agency — it's just me, and that's the point",
      ],
    },
    availability:
      "I'm taking on two projects for January 2027. If yours is one of them, write to me — I reply to everything myself, usually within a day.",
  },

  notes: {
    eyebrow: 'Notes',
    heading: 'Things I\'ve been thinking about.',
    intro: 'Short essays from the desk. Slow reads, written slowly.',
    entries: [
      {
        id: 'note-blogs',
        date: 'March 2026',
        title: "On designing for people who don't read design blogs",
        keyLine: 'Most of my clients have never heard of a grid system. They have heard of rent.',
        paragraphs: [
          "The bakery owner didn't care about my type scale. She cared that her 7am regulars could read the day's menu with one thumb, in the rain, waiting for a bus. That brief taught me more than any case study.",
          'So I stopped designing for the people who might judge the work, and started designing for the people who would use it. The work got better. The clients got happier. The awards juries, as it turns out, noticed anyway.',
          'If you ever hire a designer, ask them who they imagine holding the finished thing. The answer will tell you everything.',
        ],
        margin: 'My clients hire taste they can trust, not vocabulary they can\'t pronounce.',
        marginAfter: 0,
        marginSide: 'right',
        marginPhoto: true,
        marginPhotoAlt: 'My sketchbook open on the desk — logo sketches, ink marks, a pencil resting on the page',
      },
      {
        id: 'note-sketchbook',
        date: 'January 2026',
        title: "What my sketchbook knows that my laptop doesn't",
        keyLine: 'Ugly first drafts are a feature, not a bug.',
        paragraphs: [
          "Every project starts in the same battered notebook. The first pages are always terrible — crooked letters, half ideas, a coffee ring that has become, honestly, part of the process.",
          "But something happens around page three. The hand loosens. The ideas stop performing and start talking. I have never had that happen in a software tool, and I've stopped expecting it to.",
          'The sketchbook is where the work is allowed to be bad. Everything good I make is downstream of that permission.',
        ],
        margin: 'If it looks finished too early, I throw it away and start over by hand.',
        marginAfter: 1,
        marginSide: 'left',
      },
      {
        id: 'note-slow',
        date: 'November 2025',
        title: 'A small defense of slowing down',
        keyLine: 'Fast is a feature. So is finished.',
        paragraphs: [
          "I take on one project at a time. Clients sometimes ask if that's slow, and I tell them the truth: yes. Deliberately. Your brand deserves more than the gaps between other people's deadlines.",
          'Slow means I notice things. The way your regulars talk about you. The word you use instead of the industry word. The detail that becomes the whole identity.',
          "The world will sell you speed. I'll sell you attention. So far, attention has a better track record.",
        ],
        margin: 'One project at a time, always. It is the whole business model.',
        marginAfter: 1,
        marginSide: 'right',
      },
    ],
  },

  about: {
    eyebrow: 'About',
    heading: 'Me, the desk, and the dog.',
    paragraphs: [
      "I'm June — an independent designer working from a small, plant-crowded studio where the morning light does most of the decorating. For the last nine years I've made brands and websites for people building things by hand: bakers, potters, farmers, booksellers.",
      "I do everything myself: the strategy calls, the sketches, the type, the code, the launch-day nerves. I like it that way. It means there's exactly one person to blame, and exactly one person who'll answer your email at 9pm before a launch.",
      'Off the desk: I walk the long way to the post office, I keep a sourdough starter named Doughbi-Wan, and I am supervised at all times by Biscuit, a terrier mix asleep under the desk as I type this.',
    ],
    facts: [
      { label: 'Based in', value: 'Portland, Oregon — working worldwide' },
      { label: 'Experience', value: '9 years, all of them independent' },
      { label: 'Currently', value: 'Booking January 2027' },
      { label: 'Supervisor', value: 'Biscuit (terrier mix, asleep)' },
    ],
    imageAlt: 'Detail of my desk — open sketchbook, pencil, paint swatches in morning light',
  },

  contact: {
    eyebrow: 'Contact',
    heading: "Let's make something good.",
    body: 'The fastest way to reach me is email. Tell me what you\'re making and when you need it — I\'ll write back personally, not a template, not an assistant.',
    email: `hello@${kela.domain}`,
    emailLabel: `hello@${kela.domain}`,
    calendar: 'Prefer to talk it through? Grab a 30-minute intro call — no pitch, just a conversation.',
    calendarLabel: 'Book an intro call',
    calendarHref: '#contact',
    promise: 'I reply to everything myself, usually within a day.',
  },

  footer: {
    line: 'Made slowly, by hand.',
    socials: [
      { label: 'Instagram', href: `https://instagram.com/${kela.instagram}` },
      { label: 'Pinterest', href: 'https://pinterest.com' },
      { label: 'Read.cv', href: 'https://read.cv' },
    ],
  },
};
