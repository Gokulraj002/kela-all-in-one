import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'A coffee documentary in five chapters' },
  nav: [
    { label: 'Prologue', href: '#hero' },
    { label: 'The Story', href: '#story' },
    { label: 'The People', href: '#people' },
    { label: 'Taste the Story', href: '#lots' },
    { label: 'Field Notes', href: '#glossary' },
  ],
  hero: {
    eyebrow: 'A documentary in five chapters · Chikmagalur, Karnataka',
    title: kela.name,
    sub: 'One bean. Five chapters. Twelve pairs of hands. Follow a single harvest from the misted highlands of the Western Ghats to the cup on your table — and meet the people who carry it there.',
    cta: 'Begin the journey',
    scrollHint: 'Scroll to read',
  },
  chapters: [
    {
      id: 'origin', num: '01', label: 'Chapter One', title: 'The Highlands',
      img: 'hero', alt: 'Terraced coffee estate in the Western Ghats at dawn, mist over the hills',
      caption: 'Plate 01 — The Aldur valley, Chikmagalur, 5:40 am, first light.',
      tint: 'rgba(214, 178, 106, 0.10)',
      body: [
        'Coffee in India grows in the shade. Under silver-oak and jackfruit canopies, at altitudes where the air turns cool by four in the afternoon, the arabica bushes of the Baba Budan hills have been fruiting for nearly 350 years — since the Sufi saint Baba Budan smuggled seven beans out of Yemen and planted them here.',
        'The estate you are looking at sits between 1,100 and 1,600 metres. The soil is red laterite, the rainfall is generous, and the harvest — when it comes — is picked entirely by hand, one ripe cherry at a time.',
      ],
      quote: { text: 'The mountain decides the flavour. We only listen.', by: 'Ravi Gowda, third-generation grower' },
      data: [
        { k: 'Altitude', v: '1,100–1,600 m' },
        { k: 'Varietal', v: 'SLN 9 · Cauvery' },
        { k: 'Canopy', v: 'Two-tier shade' },
      ],
    },
    {
      id: 'harvest', num: '02', label: 'Chapter Two', title: 'The Harvest',
      img: 'product-0', alt: 'A picker\u2019s weathered hands selecting ripe red coffee cherries into a woven basket',
      caption: 'Plate 02 — Selective picking, week three of harvest.',
      tint: 'rgba(74, 93, 58, 0.12)',
      body: [
        'A coffee branch ripens unevenly. Green, yellow, red — sometimes all three on a single stem. Machines cannot tell them apart, which is why the finest coffee on earth is still harvested the oldest way: by a human hand, making a thousand small decisions a day.',
        'A skilled picker harvests 40 to 60 kilos of cherry in a day and leaves the unripe fruit for the next pass. It takes roughly 2,000 hand-picked cherries to fill one 250-gram bag of roasted coffee.',
      ],
      quote: { text: 'My grandmother taught my mother. My mother taught me. The branch teaches all of us.', by: 'Devamma, picker for 22 seasons' },
      data: [
        { k: 'Picking', v: 'Selective, by hand' },
        { k: 'Season', v: 'Nov – Feb' },
        { k: 'Cherries per bag', v: '~2,000' },
      ],
    },
    {
      id: 'process', num: '03', label: 'Chapter Three', title: 'The Process',
      img: 'product-1', alt: 'Coffee parchment drying on raised beds under the midday sun',
      caption: 'Plate 03 — Raised drying beds, day nine of a natural process.',
      tint: 'rgba(138, 109, 59, 0.12)',
      body: [
        'Once picked, the cherry must be processed within hours — this is where coffee\u2019s flavour is truly written. The same cherry, handled three different ways, becomes three different coffees. Choose a method below and watch the flavour shift.',
        'After processing, the parchment rests on raised beds for 12 to 21 days, raked every hour under the sun, until the moisture settles at precisely 11 percent.',
      ],
      quote: { text: 'Processing is translation. The farm writes a poem; we choose the language.', by: 'Ananya Rao, Q-grader, Bengaluru' },
      data: [
        { k: 'Drying', v: '12–21 days' },
        { k: 'Moisture target', v: '11%' },
        { k: 'Resting', v: '30 days' },
      ],
    },
    {
      id: 'roast', num: '04', label: 'Chapter Four', title: 'The Roast',
      img: 'product-2', alt: 'Freshly roasted coffee beans tumbling in a vintage roaster drum',
      caption: 'Plate 04 — First crack, batch no. 214.',
      tint: 'rgba(90, 52, 30, 0.16)',
      body: [
        'Green coffee smells of grass and hay. It holds no promise of the cup — until heat rewrites it. Inside the drum, the bean climbs past 200\u00b0C: sugars caramelise, acids sharpen then soften, and at first crack the bean audibly exhales and doubles in volume.',
        'Our roast is deliberately light of hand — dropped at 204\u00b0C, twelve seconds after first crack — so the highland character survives the fire. Darker would be easier. Easier is not the point.',
      ],
      quote: { text: 'Roasting is the only chapter you cannot undo. So you listen harder.', by: 'Kabir Shah, roastmaster' },
      data: [
        { k: 'Drop temp', v: '204\u00b0C' },
        { k: 'Development', v: '1:12 post-crack' },
        { k: 'Batch size', v: '12 kg' },
      ],
    },
    {
      id: 'people', num: '05', label: 'Chapter Five', title: 'The People',
      img: 'detail', alt: 'A woven basket brimming with freshly picked red coffee cherries',
      caption: 'Plate 05 — The morning\u2019s first pick, weighed and logged.',
      tint: 'rgba(74, 93, 58, 0.14)',
      body: [
        'Twelve pairs of hands touch your coffee before you do: the picker, the sorter, the pulper, the raker, the miller, the grader, the roaster, the cupper, the packer, the barista — and the two that grew it all, sun and rain.',
        'This chapter has no single protagonist. It has a village. Scroll on to meet three of them, in their own words.',
      ],
      quote: { text: 'People ask what makes the coffee special. It is not the mountain. It is the mornings.', by: 'Joseph D\u2019Souza, estate manager, Coorg' },
      data: [
        { k: 'Hands per bag', v: '12 pairs' },
        { k: 'Estate families', v: '140' },
        { k: 'Avg. tenure', v: '18 years' },
      ],
    },
  ],
  processDiagram: {
    eyebrow: 'Interactive · Chapter Three, continued',
    title: 'Three ways to translate a cherry',
    methods: [
      {
        id: 'washed', name: 'Washed', tag: 'Batch W-12 · 36-hour ferment',
        desc: 'The cherry\u2019s fruit is pulped away within six hours of picking, then the parchment ferments in clean water for 36 hours before drying. What remains is clarity: the varietal speaking without an accent.',
        bars: [
          { label: 'Acidity', v: 0.85 },
          { label: 'Body', v: 0.4 },
          { label: 'Sweetness', v: 0.55 },
          { label: 'Clarity', v: 0.95 },
        ],
        notes: 'Jasmine · Green apple · Black tea',
      },
      {
        id: 'natural', name: 'Natural', tag: 'Batch N-07 · 21-day sun dry',
        desc: 'The whole cherry dries intact on raised beds for three weeks, the fruit\u2019s sugars slowly migrating into the seed. The result is the wildest of the three — winey, heavy, unmistakable.',
        bars: [
          { label: 'Acidity', v: 0.5 },
          { label: 'Body', v: 0.9 },
          { label: 'Sweetness', v: 0.85 },
          { label: 'Clarity', v: 0.45 },
        ],
        notes: 'Blueberry · Dark chocolate · Red wine',
      },
      {
        id: 'honey', name: 'Honey', tag: 'Batch H-03 · 14-day mucilage dry',
        desc: 'Pulped but not washed — the sticky mucilage (the \u201choney\u201d) stays on the parchment through drying. A middle path: the sweetness of a natural with the cleanliness of a washed cup.',
        bars: [
          { label: 'Acidity', v: 0.65 },
          { label: 'Body', v: 0.65 },
          { label: 'Sweetness', v: 0.8 },
          { label: 'Clarity', v: 0.7 },
        ],
        notes: 'Apricot · Brown sugar · Orange zest',
      },
    ],
  },
  people: {
    eyebrow: 'The protagonists',
    title: 'The hands behind the harvest',
    farmers: [
      {
        name: 'Devamma', role: 'Picker · 22 seasons · Aldur',
        quote: 'I can tell ripeness by weight, without looking. The red ones sit heavier in the palm. After twenty-two years, my hands decide before my eyes do.',
        detail: 'Picks 55 kg on a good day. Her basket has her mother\u2019s initials burned into the rim.',
      },
      {
        name: 'Ravi Gowda', role: 'Grower · Third generation · Chikmagalur',
        quote: 'My grandfather planted these bushes in 1962. I prune them the way he taught my father — a little ruthless, he used to say, like editing.',
        detail: 'Manages 18 acres under two-tier shade. Cup score last harvest: 87.5.',
      },
      {
        name: 'Joseph D\u2019Souza', role: 'Estate manager · Coorg',
        quote: 'A good manager is invisible during harvest. If the pickers, the water, and the weather are all where they should be, I have done my job.',
        detail: 'Oversees 140 estate families across two valleys. Keeps a rain diary going back 31 years.',
      },
    ],
  },
  lots: {
    eyebrow: 'Taste the story',
    title: 'Three lots from this harvest',
    sub: 'The narrative ends in your cup. Each lot is roasted in 12-kilo batches and shipped within 48 hours of roast.',
    items: [
      { name: 'Aldur Washed', origin: 'Chikmagalur · 1,450 m', process: 'Washed · 36-hr ferment', notes: 'Jasmine, green apple, black tea', price: 520, img: 'product-0', alt: 'Ripe red cherries being picked by hand' },
      { name: 'Valley Natural', origin: 'Coorg · 1,180 m', process: 'Natural · 21-day sun', notes: 'Blueberry, dark chocolate, red wine', price: 560, img: 'product-1', alt: 'Coffee drying on raised beds in the sun' },
      { name: 'Honey Reserve', origin: 'Baba Budan · 1,600 m', process: 'Honey · 14-day dry', notes: 'Apricot, brown sugar, orange zest', price: 640, img: 'product-2', alt: 'Freshly roasted beans in the roaster drum' },
    ],
    unit: '250 g · whole bean',
    cta: 'Order this lot',
  },
  glossary: {
    eyebrow: 'Field notes',
    title: 'A short glossary, for the curious',
    terms: [
      { term: 'First crack', def: 'The audible pop, around 196\u00b0C, when steam pressure splits the bean. The roastmaster\u2019s true starting gun.' },
      { term: 'Parchment', def: 'The papery husk around the bean after pulping. Coffee dries and rests in this protective jacket.' },
      { term: 'Q-grader', def: 'A certified coffee taster, calibrated like an instrument. Fewer than 8,000 exist worldwide.' },
      { term: 'Mucilage', def: 'The sweet, sticky fruit layer clinging to the bean — the \u201choney\u201d in honey process.' },
      { term: 'Two-tier shade', def: 'Coffee grown beneath two canopy layers, a traditional Indian practice that slows ripening and deepens flavour.' },
    ],
  },
  epilogue: {
    eyebrow: 'Epilogue',
    title: 'Join the journey',
    body: 'One letter a month: harvest reports from the valley, first access to micro-lots, and the occasional recipe from our roastmaster\u2019s notebook. No noise — we are farmers at heart.',
    placeholder: 'Your email address',
    button: 'Subscribe',
    success: 'Welcome to the valley. Your first letter arrives with the next harvest report.',
    note: 'Read by 12,000 coffee lovers · Unsubscribe anytime',
  },
  contact: {
    email: `letters@${kela.domain}`,
    instagram: `@${kela.instagram}`,
    address: 'Aldur Valley, Chikmagalur, Karnataka',
  },
  footer: {
    line: `\u00a9 2026 ${kela.name} · A documentary project`,
    credits: 'Photography on location · Set in Cormorant Garamond & Instrument Sans',
  },
};
