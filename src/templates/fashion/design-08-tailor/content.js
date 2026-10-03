/* Kela Fashion (brand from _shared/brand.js) — Bespoke Tailoring · content.js
   Plain JSON-compatible object. All editable text, prices (numbers, ₹),
   cloth data, fitting steps, and contact live here. */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Bespoke tailoring — cut by hand, measured twice',
    est: 'Est. 1962 · Kala Ghoda, Mumbai',
  },
  nav: [
    { label: 'The Process', href: '#story' },
    { label: 'Wardrobe', href: '#products' },
    { label: 'Cloth Library', href: '#gallery' },
    { label: 'Fittings', href: '#fittings' },
  ],
  hero: {
    eyebrow: 'Bespoke menswear house · Mumbai',
    title: 'Cut once. Cut right.',
    sub: 'Bandhgalas, sherwanis and bespoke suits — drafted on paper, cut by hand, fitted three times over. Nothing here is standard issue.',
    cta: 'Book a fitting',
    ctaNote: 'In-store · home visit · video consult',
    caption: 'Master tailor chalking a charcoal bandhgala · stand no. 4',
    tapeNote: 'every garment measured in centimetres',
  },
  process: {
    eyebrow: 'The making',
    title: 'Five measures of a garment',
    lede: 'Scroll: the tape unrolls, and each stage of the make is chalked in as it passes.',
    stages: [
      {
        name: 'Measure',
        cm: 32,
        title: 'Thirty-two points',
        body: 'Chest, shoulder, posture, stance — thirty-two measurements taken over forty-five minutes, plus how you stand and how you move.',
      },
      {
        name: 'Cut',
        cm: 64,
        title: 'The paper, then the cloth',
        body: 'Your pattern is drafted fresh on brown paper — no block sizes — and the cloth is cut with shears, chalk lines and nerve.',
      },
      {
        name: 'Stitch',
        cm: 104,
        title: 'Forty hours of handwork',
        body: 'Full floating canvas, hand-padded lapels, hand-set collars. One tailor owns your garment from basted fitting to buttonhole.',
      },
      {
        name: 'Press',
        cm: 132,
        title: 'Steam and patience',
        body: 'Every seam is pressed open with steam and a wooden clapper before it is stitched shut. Shape is pressed in, never glued.',
      },
      {
        name: 'Fit',
        cm: 152,
        title: 'Three visits. Zero compromise.',
        body: 'Measure, basted trial, final fitting. The garment leaves only when the mirror stops arguing.',
      },
    ],
  },
  wardrobe: {
    eyebrow: 'The wardrobe',
    title: 'Cloth first, then silhouette',
    lede: 'Starting prices, stated plainly. Final price follows your cloth and your handwork.',
    items: [
      {
        name: 'The Bandhgala',
        fabric: 'Charcoal worsted · 260 GSM',
        price: 35000,
        desc: 'The house signature — closed collar, hand-padded chest, horn buttons.',
        alt: 'Indian man wearing a charcoal bandhgala suit in a north-lit tailoring studio',
      },
      {
        name: 'The Sherwani',
        fabric: 'Ivory silk · zari embroidery',
        price: 85000,
        desc: 'Wedding-morning ivory, hand-set buttons, embroidery matched at the seams.',
        alt: 'Macro of an ivory sherwani placket with hand-stitched buttons and gold zari embroidery',
      },
      {
        name: 'The Bespoke Suit',
        fabric: "Client's choice of cloth",
        price: 65000,
        desc: 'Two-piece or three, full canvas, forty hours of handwork in every seam.',
        alt: 'Macro of a needle pulling oxblood thread through charcoal suiting beside chalk stitch lines',
      },
    ],
  },
  cloths: {
    eyebrow: 'The cloth library',
    title: 'Two hundred bolts, six you will ask about',
    lede: 'Mill, weight and composition — the numbers behind the drape.',
    imageAlt: 'Rolls of suiting fabric in charcoal, ecru, oxblood and navy standing in mahogany cubbies',
    filters: ['All', 'Wool', 'Silk', 'Linen'],
    items: [
      { name: 'Charcoal Worsted', mill: 'Raymond Wool · India', spec: '260 GSM · 100% wool', kind: 'Wool', price: 4500, swatch: '#2E2C27' },
      { name: 'Ivory Sherwani Silk', mill: 'Siyaram Silk Mills · Mumbai', spec: '180 GSM · silk', kind: 'Silk', price: 6800, swatch: '#EFE8D8' },
      { name: 'Ink-Navy Barathea', mill: 'Vardhman · Punjab', spec: '300 GSM · wool barathea', kind: 'Wool', price: 5200, swatch: '#232A3A' },
      { name: 'Oxblood Suiting', mill: 'Arvind Mills · Ahmedabad', spec: '240 GSM · wool blend', kind: 'Wool', price: 4800, swatch: '#7A2A26' },
      { name: 'Ecru Linen', mill: 'Linen Club · Bihar', spec: '200 GSM · pure linen', kind: 'Linen', price: 3900, swatch: '#DCD3BC' },
      { name: 'Camel Flannel', mill: 'Bannari Amman · Coimbatore', spec: '280 GSM · wool flannel', kind: 'Wool', price: 5600, swatch: '#A98A5B' },
    ],
  },
  fittings: {
    eyebrow: 'The fitting book',
    title: 'Three visits',
    lede: 'Every commission passes through the same three appointments. Bring the shoes you will wear.',
    visits: [
      {
        name: 'Visit One — The Measure',
        when: 'Day 0 · 45 minutes',
        body: 'Thirty-two measurements, a posture study, and cloth selection. Your paper pattern is drafted the same week.',
        checklist: ['Measurements recorded in the ledger', 'Cloth and lining chosen', 'Occasion date locked'],
      },
      {
        name: 'Visit Two — The Basted Trial',
        when: 'Week 3 · 30 minutes',
        body: 'The garment arrives basted in white thread — shape first, finish later. Every correction is marked in chalk, on you.',
        checklist: ['Basted shell tried on', 'Sleeve and hem lengths marked', 'Collar and shoulder corrected'],
      },
      {
        name: 'Visit Three — The Final Fit',
        when: 'Week 5–6 · 20 minutes',
        body: 'Finished, pressed and buttonholed. Final tweaks are turned around in forty-eight hours — then it is yours.',
        checklist: ['Finished garment pressed', 'Buttonholes cut by hand', 'Ledger signed off'],
      },
    ],
  },
  film: {
    eyebrow: 'The craft film',
    title: 'Needle & Steam',
    body: 'Eight seconds in the atelier — needle through worsted, shears along chalk, steam rising in window light. It loops, the way the work does.',
    caption: 'Needle & Steam · scrubbed by scroll · charcoal & brass grade',
    alt: 'Macro of a needle pulling thread through suiting cloth, shears on chalk lines, steam rising in window light',
  },
  booking: {
    eyebrow: 'Appointments',
    title: 'Book a fitting',
    lede: 'Order six to eight weeks before the wedding. Everything else, we can hurry.',
    modes: [
      { name: 'In-store', desc: 'Kala Ghoda atelier · Tue–Sat, 10:30–19:30' },
      { name: 'Home visit', desc: 'Mumbai & Delhi · master tailor at your door' },
      { name: 'Video consult', desc: 'Measurements guided over a call, cloth couriered' },
    ],
    slots: ['Tue · 11:00', 'Tue · 16:30', 'Wed · 10:30', 'Thu · 12:00', 'Fri · 17:00', 'Sat · 11:30'],
    slotNote: 'Choose a slot — we confirm within the hour.',
    cta: 'Request this fitting',
  },
  testimonials: [
    { quote: 'My sherwani was cut to how I actually stand. Three months later, people still ask.', name: 'Aditya Malhotra', role: 'Groom · Udaipur' },
    { quote: 'Boardroom suits that made my off-the-rack years look like a costume.', name: 'Rohan Shetty', role: 'Founder · Mumbai' },
    { quote: 'Four bandhgalas, one tailor, zero alterations after delivery.', name: 'Kabir Anand', role: 'Wedding party of four · Delhi' },
  ],
  contact: {
    email: `hello@${kela.domain}`,
    phone: '+91 98200 12345',
    instagram: `@${kela.instagram}`,
    address: '14 Rampart Row, Kala Ghoda, Mumbai 400001',
    hours: 'Tue–Sat · 10:30–19:30',
  },
  footer: {
    ledger: 'Fitting ledger no. 4,118 closed this season. Every entry signed by the cutter.',
    mills: 'Cloth: Raymond · Siyaram · Arvind · Vardhman · Bannari Amman · Linen Club',
    care: 'Brush after wearing. Rest a day between wears. Press with steam, never dry heat.',
    line: `© 2026 ${kela.name} · Cut by hand in Mumbai`,
  },
};
