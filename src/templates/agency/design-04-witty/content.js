import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('agency');

export const content = {
  brand: { name: kela.name, tagline: 'A copy-first creative agency' },
  nav: [
    { label: 'Work', href: '#work' },
    { label: "Won't-do", href: '#wontdo' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    eyebrow: `${kela.name}® — a copy-first creative agency`,
    line: 'Advertising for people who skip ads.',
    punch: 'ads.',
    cta: 'Say hello',
    ctaHref: '#contact',
    footnote: '*Yes, we see the irony. It\u2019s intentional.',
    videoAlt:
      'Studio wall of pinned headline cards drifting past — a hand pins a new card and a marker underlines the punchline',
    imageAlt: 'Studio wall covered in pinned headline cards with ink sketches and cobalt accents',
  },
  lines: {
    eyebrow: 'The lines',
    title: 'Eight sentences we\u2019d put on a billboard.',
    titlePunch: 'We have.',
    footnote: '*Line 5 got us thrown out of one pitch. Worth it.',
    deckHint: 'Scroll — the deck tosses itself',
    items: [
      {
        text: 'Nobody reads ads. People read interesting sentences.',
        punch: 'interesting sentences.',
      },
      {
        text: 'We don\u2019t do viral. We do memorable — viral with better manners.',
        punch: 'better manners.',
      },
      {
        text: 'If your tagline needs a paragraph to explain it, it\u2019s a paragraph.',
        punch: 'it\u2019s a paragraph.',
      },
      {
        text: 'Attention is rented. Memory is owned. We write deeds.',
        punch: 'We write deeds.',
      },
      {
        text: 'We\u2019ve never said \u2018synergy\u2019 in a meeting. We checked the tapes.',
        punch: 'We checked the tapes.',
      },
      {
        text: 'A billboard gets three seconds. We give it two great ones and keep one for breathing.',
        punch: 'keep one for breathing.',
      },
      {
        text: 'The logo is not the brand. The brand is what people say about you at dinner.',
        punch: 'at dinner.',
      },
      {
        text: 'Your customers aren\u2019t confused by honesty. They\u2019re exhausted by everything else.',
        punch: 'everything else.',
      },
    ],
  },
  work: {
    eyebrow: 'The work',
    title: 'Cases, with the honest footnotes.',
    intro:
      'Every case below ships with two captions: what worked, and what flopped. Other agencies show you the trophy. We\u2019ll show you the bruise too.',
    cases: [
      {
        client: 'Honest Soap Co.',
        discipline: 'Outdoor',
        title: 'The soap that admitted it was soap.',
        worked:
          'One billboard, seven words: \u201CIt\u2019s soap. It cleans things. \u20B999.\u201D Sales up 34% in a quarter.',
        flopped:
          'The CEO cried at the word \u201Cordinary\u201D. We kept it anyway. He sends us soap at Diwali now.',
        alt: 'Billboard in a city street showing an abstract minimalist campaign in ink and cobalt',
      },
      {
        client: 'Snooze Mattresses',
        discipline: 'Social',
        title: 'Ads for insomniacs, served at 3 a.m.',
        worked:
          'We told night-scrollers the truth: the phone is the problem, the mattress is the apology. Engagement peaked at 3:12 a.m.',
        flopped:
          'Our media buyer now sleeps with her phone in another room. We call it an occupational hazard.',
        alt: 'Two phones on a studio desk showing an abstract social campaign in ink and cobalt',
      },
      {
        client: 'Plain Pickles',
        discipline: 'Packaging',
        title: 'The jar that just said what it was.',
        worked:
          'Label copy: \u201CTastes like pickles.\u201D It outsold the artisanal line three-to-one.',
        flopped:
          'The founders wanted the word \u201Ccurated\u201D on the jar. We pickled that idea.',
        alt: 'Lineup of pickle jars with playful abstract ink-splatter labels',
      },
      {
        client: 'First National Boring',
        discipline: 'Brand voice',
        title: 'The bank that stopped pretending banking is fun.',
        titlePunch: 'fun.',
        worked:
          '\u201CNobody loves banking. We just do it properly.\u201D Trust scores up; the internet said \u201Cfinally.\u201D',
        flopped:
          'Compliance needed three weeks and two pots of tea to approve the word \u201Cboring\u201D. Worth every sip.',
        noImage: true,
        note: 'No photo. The photography budget went to the words, where it belonged.',
      },
    ],
  },
  wontdo: {
    eyebrow: 'The famous list',
    title: 'What we won\u2019t do.',
    intro:
      'Our competitors call this list \u201Caggressive\u201D. We call it Tuesday. Hover to cross one off — it\u2019s the most satisfying interaction on this site.',
    items: [
      {
        text: 'Write \u201Cpassionate about storytelling\u201D — on your site or ours.',
        why: 'Nobody has ever been hired for their passion for storytelling. They get hired for sales.',
      },
      {
        text: 'Use stock photos of handshakes.',
        why: 'If your brand needs a handshake photo, your brand needs a better brand.',
      },
      {
        text: 'Pitch a mascot in the first meeting.',
        why: 'Second meeting, maybe. We all have our weaknesses.',
      },
      {
        text: 'Put \u201Csynergy\u201D, \u201Cdisrupt\u201D or \u201Cleverage\u201D in a deliverable.',
        why: 'Violations are fined one snack box, payable to the studio kitchen.',
      },
      {
        text: 'Make a 40-slide deck to say what fits in one sentence.',
        why: 'This list is seven lines long. You\u2019re welcome.',
      },
      {
        text: 'Promise \u201Cviral\u201D.',
        why: 'We\u2019ll promise memorable instead — in writing, with a signature.',
      },
      {
        text: 'Ship Lorem Ipsum in a presentation.',
        why: 'We write the real words live, while you watch. It\u2019s terrifying and great.',
      },
    ],
  },
  studio: {
    eyebrow: 'The studio',
    title: 'Eleven people with strong opinions.',
    intro:
      'We\u2019re a small copy-first studio in Bengaluru. No account managers, no Chinese whispers — you talk directly to the person writing your words. We answer our own emails: fast, and honest to a fault.',
    facts: 'Est. 2019 — Bengaluru — 11 people — 0 jargon (audited)',
    detailAlt: 'Hand holding a black marker mid-stroke on cream paper, a cobalt underline beneath one word',
    detailCaption: 'Every line starts on paper. The marker is mightier than the moodboard.',
    team: [
      {
        name: 'Priya Nair',
        role: 'Founder, Chief of Sentences',
        flaw: 'Has strong opinions about the Oxford comma and weak opinions about lunch, which she voices just as loudly.',
      },
      {
        name: 'Dev Krishnan',
        role: 'Art Director',
        flaw: 'Claims he doesn\u2019t read. Then quotes your brief back to you, word for word, from memory.',
      },
      {
        name: 'Anaya Iyer',
        role: 'Strategist',
        flaw: 'Finds the one true sentence hiding in a 60-page deck. Keeps the other 59 pages \u201Cfor the paper\u201D.',
      },
      {
        name: 'Rohan Das',
        role: 'Producer',
        flaw: 'The reason anything ships on time. Accepts bribes in snack form whenever someone says \u201Csynergy\u201D.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Say hello. We reply fast.',
    promise:
      'One working day, guaranteed. If it\u2019s urgent, put URGENT in the subject line — we read subject lines, unlike some agencies we could name.',
    email: `hello@${kela.domain}`,
    emailLabel: `hello@${kela.domain}`,
    checklistTitle: 'What to include in your email:',
    checklist: [
      'What you sell, in one sentence',
      'What you want people to do about it',
      'Your timeline',
      'Your budget — or at least its neighbourhood',
    ],
    address: '14 Church Street, Bengaluru 560001',
    walkin: 'Walk-ins welcome. Bring snacks, not decks.',
  },
  footer: {
    line: `${kela.name}® — a copy-first creative agency. No jargon was harmed in the making of this site.`,
    colophon: `Set in Bricolage Grotesque & Space Mono. \u00A9 2026 ${kela.name}® — all lines reserved.`,
    tiny: 'Made with strong opinions in Bengaluru.',
  },
};
