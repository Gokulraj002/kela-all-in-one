import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

export const content = {
  brand: { name: kela.name, tagline: 'Specialty coffee roastery' },
  nav: {
    shop: [
      { label: 'Single Origins', cat: 'single' },
      { label: 'Blends', cat: 'blend' },
      { label: 'Decaf', cat: 'decaf' },
    ],
    wholesale: 'Wholesale',
    bag: 'Bag',
  },
  hero: {
    eyebrow: 'Roast day — every Tuesday',
    title: 'Roasted this week. Shipped at peak.',
    sub: 'Single origins and house blends, roasted in 12kg batches and sealed within hours. Every bag carries its roast date — freshness you can verify, not a promise you have to take.',
    cta: 'Shop the lineup',
    ctaHref: '#products',
    cta2: 'Wholesale',
    cta2Href: '#wholesale',
    schedule: [
      { day: 'Tuesday', note: 'Roast day — all origins' },
      { day: 'Wednesday', note: 'Dispatch, pan-India' },
      { day: 'Friday', note: 'Wholesale drops' },
    ],
  },
  roastFilters: [
    { id: 'all', label: 'All roasts' },
    { id: 'light', label: 'Light' },
    { id: 'medium', label: 'Medium' },
    { id: 'dark', label: 'Dark' },
  ],
  lineup: [
    {
      name: 'Yirgacheffe',
      origin: 'Ethiopia', altitude: '1,800m', process: 'Washed',
      roast: 2, roastLabel: 'Light–Medium',
      notes: ['Apricot', 'Jasmine', 'Bergamot'],
      price: 520, weight: '250g', roasted: 'Tue', category: 'single',
      desc: 'Floral and tea-like; the filter drinker\u2019s benchmark.',
    },
    {
      name: 'Chikmagalur Estate',
      origin: 'India', altitude: '1,200m', process: 'Natural',
      roast: 3, roastLabel: 'Medium',
      notes: ['Dark Chocolate', 'Jaggery', 'Orange Peel'],
      price: 460, weight: '250g', roasted: 'Tue', category: 'single',
      desc: 'Our home estate lot — sweet, full, endlessly drinkable.',
    },
    {
      name: 'Huila Reserve',
      origin: 'Colombia', altitude: '1,750m', process: 'Honey',
      roast: 4, roastLabel: 'Medium–Dark',
      notes: ['Caramel', 'Red Cherry', 'Cocoa'],
      price: 540, weight: '250g', roasted: 'Tue', category: 'single',
      desc: 'Built for espresso; syrupy with a long caramel finish.',
    },
    {
      name: 'Ember Blend',
      origin: 'India + Colombia', altitude: 'Blend', process: 'Washed / Natural',
      roast: 5, roastLabel: 'Dark',
      notes: ['Molasses', 'Smoke', 'Dark Chocolate'],
      price: 440, weight: '250g', roasted: 'Tue', category: 'blend',
      desc: 'The house workhorse — milk drinks and moka pots.',
    },
    {
      name: 'Monsoon Malabar AA',
      origin: 'India', altitude: '1,100m', process: 'Monsooned',
      roast: 4, roastLabel: 'Medium–Dark',
      notes: ['Spice', 'Walnut', 'Tobacco'],
      price: 490, weight: '250g', roasted: 'Tue', category: 'single',
      desc: 'Exposed to monsoon winds; low acidity, heavy body.',
    },
    {
      name: 'Decaf Huila',
      origin: 'Colombia', altitude: '1,750m', process: 'EA Sugarcane',
      roast: 3, roastLabel: 'Medium',
      notes: ['Milk Chocolate', 'Graham', 'Citrus'],
      price: 500, weight: '250g', roasted: 'Tue', category: 'decaf',
      desc: 'Decaffeinated with sugarcane ethyl acetate — no compromise.',
    },
  ],
  timeline: {
    eyebrow: 'Bean to bag',
    title: 'The roast journey.',
    stages: [
      { title: 'Cherry', text: 'Ripe cherries from partner farms at 1,100–1,800m, picked in the dry season.' },
      { title: 'Process', text: 'Washed, honey, natural, or monsooned — each lot processed for its character.' },
      { title: 'Roast', text: 'Tuesdays, 12kg batches. Every curve logged, every drop timed.' },
      { title: 'Rest', text: '48 hours of degassing. Coffee roasted yesterday is not ready yet.' },
      { title: 'Bag', text: 'Sealed with the roast date printed like a batch number. Then dispatched.' },
    ],
  },
  origins: {
    eyebrow: 'Origins',
    title: 'Three farms. One roastery.',
    regions: [
      {
        id: 'ethiopia', region: 'Yirgacheffe, Ethiopia',
        farm: 'Konga washing station', altitude: '1,800–2,200m',
        varietal: 'Heirloom', process: 'Washed',
        note: 'Floral lots from smallholder farmers, delivered fresh to the station daily.',
      },
      {
        id: 'colombia', region: 'Huila, Colombia',
        farm: 'Finca La Palma', altitude: '1,750m',
        varietal: 'Caturra, Castillo', process: 'Honey',
        note: 'A family farm we have bought from for six harvests running.',
      },
      {
        id: 'chikmagalur', region: 'Chikmagalur, India',
        farm: 'Ratnagiri Estate', altitude: '1,200m',
        varietal: 'Selection 795', process: 'Natural',
        note: 'Shade-grown under silver oak; our longest relationship.',
      },
      {
        id: 'roastery', region: `${kela.name} Roastery, Bengaluru`,
        farm: '12kg drum roaster', altitude: '920m',
        varietal: '—', process: 'Roasted Tuesdays',
        note: 'Where every lot above lands, and every bag below leaves.',
      },
    ],
  },
  wholesale: {
    eyebrow: 'Wholesale',
    title: 'Roast for your bar.',
    text: 'Cafés, offices, and restaurants — fresh roast on a standing order, dialled in for your menu and your machine.',
    tiers: [
      { name: 'Starter', volume: '10 kg / month', price: 'from \u20B9480 / kg', perks: ['Standing Tuesday roast', 'Grind profiles for your menu'] },
      { name: 'House', volume: '40 kg / month', price: 'from \u20B9440 / kg', perks: ['Priority roast scheduling', 'Free barista training, quarterly'] },
      { name: 'Partner', volume: '120 kg / month', price: 'from \u20B9400 / kg', perks: ['Custom blend development', 'Dedicated roast curve + QC'] },
    ],
    formTitle: 'Request a wholesale quote',
    success: 'Thanks — our wholesale desk replies within one working day.',
  },
  brewGuides: {
    eyebrow: 'Brew guides',
    title: 'Recipes per coffee.',
    guides: [
      { coffee: 'Yirgacheffe', method: 'V60', ratio: '1:16', grind: 'Medium-fine', temp: '94\u00B0C', time: '2:45', note: 'Bloom 45s, then two slow pours. Expect jasmine in the aroma.' },
      { coffee: 'Ember Blend', method: 'French Press', ratio: '1:14', grind: 'Coarse', temp: '96\u00B0C', time: '4:00', note: 'Break the crust at 4 minutes, skim, and pour. Built for milk.' },
      { coffee: 'Huila Reserve', method: 'Espresso', ratio: '1:2', grind: 'Fine', temp: '93\u00B0C', time: '0:28', note: '18g in, 36g out. Caramel shot with a red-cherry tail.' },
    ],
  },
  footer: {
    retail: { title: 'Retail', lines: ['Roast day: Tuesday', 'Dispatch: Wednesday', 'Pan-India shipping'] },
    wholesale: { title: 'Wholesale', lines: ['Standing orders', 'Barista training', 'Custom blends'] },
    line: `${kela.name} — specialty coffee roastery, Bengaluru.`,
  },
};
