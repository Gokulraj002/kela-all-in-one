/* Kela Estates (brand from _shared/brand.js) — design-04-plots · content (plain data, JSON-compatible) */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    line: 'Plotted legacies · Devanahalli, Bengaluru North',
  },
  nav: [
    { label: 'The Land', href: '#land' },
    { label: 'Masterplan', href: '#masterplan' },
    { label: 'Collections', href: '#collections' },
    { label: 'Why Land', href: '#legacy' },
  ],
  hero: {
    eyebrow: 'Devanahalli · Bengaluru North',
    title: 'Ground worth holding.',
    sub: '214 surveyed plots across 68 acres of avenue, lake and meadow — drawn for the generation after next.',
    cta: 'Enquire',
    ctaHref: '#enquire',
    stats: [
      { value: '68', unit: 'acres', label: 'of surveyed estate' },
      { value: '214', unit: 'plots', label: 'clear-titled & RERA registered' },
      { value: '3', unit: 'acre', label: 'central lake' },
      { value: '2,400', unit: 'trees', label: 'native, planted & growing' },
    ],
  },
  land: {
    eyebrow: 'The land',
    title: 'Before it was a plan, it was a field.',
    body: [
      `${kela.name} began as sixty-eight acres of Devanahalli farmland — red soil, a seasonal lake, and a tree line older than the airport road. We walked it for a year before we drew a single line.`,
      'The masterplan follows the ground, not the other way around. The lake stays where the water always gathered. The avenues follow the old cart tracks. Every plot boundary is pegged, surveyed, and recorded before a single sale is made.',
      'This is land bought slowly and sold honestly — the kind of ground your grandchildren will argue over, fondly.',
    ],
    facts: [
      { k: 'Soil', v: 'Red loam, tested for bearing' },
      { k: 'Water', v: 'Lake-fed, 4 recharge wells' },
      { k: 'Title', v: 'Single survey, zero litigation' },
    ],
  },
  film: {
    eyebrow: 'The grid from above',
    title: 'Ten seconds over the avenues.',
    caption: 'Golden hour over the estate — the road grid, the green avenues, the lake catching the last of the light.',
  },
  masterplan: {
    eyebrow: 'Masterplan',
    title: 'Three altitudes, one estate.',
    intro: 'Scroll down and the survey map carries you in — from the full estate, to a sector, to a single surveyed plot. Each highlighted plot is real, pegged, and priced.',
    stages: ['I · The Estate', 'II · The Sector', 'III · The Plot'],
    plots: [
      { no: 'A-07', sector: 'Northgate Meadows', dims: '30 × 50 ft', area: '1,500 sq.ft', facing: 'East · avenue', price: 7850000 },
      { no: 'B-14', sector: 'Lakeview Rows', dims: '40 × 60 ft', area: '2,400 sq.ft', facing: 'North · lake glimpse', price: 12800000 },
      { no: 'C-03', sector: 'Boulevard Greens', dims: '50 × 80 ft', area: '4,000 sq.ft', facing: 'West · boulevard', price: 18400000 },
      { no: 'M-21', sector: 'Meadow Quarter', dims: '60 × 100 ft', area: '6,000 sq.ft', facing: 'South · meadow', price: 25900000 },
    ],
  },
  collections: {
    eyebrow: 'Plot collections',
    title: 'Choose your ground.',
    items: [
      {
        name: 'The Avenue Rows',
        imgKey: 'product-0',
        alt: 'Tree-lined avenue inside the development at golden hour, rain trees arching over a quiet road',
        desc: 'Thirty-foot avenues of rain trees, plots set back behind green verges. For morning walkers and evening sitters.',
        dims: '30 × 50 ft · 1,500 sq.ft',
        facing: 'East-facing avenue plots',
        price: 7200000,
      },
      {
        name: 'The Lake Edge',
        imgKey: 'product-1',
        alt: 'Still lake edge with landscaped banks at sunset, stone and grass edging, young trees along the bank',
        desc: 'The estate’s quiet crown — plots a short walk from the water, with the sunset doing the landscaping.',
        dims: '40 × 60 ft · 2,400 sq.ft',
        facing: 'North-facing, lake glimpse',
        price: 12800000,
      },
      {
        name: 'The Meadow Quarter',
        imgKey: 'product-2',
        alt: 'Open meadow with young trees in soft morning mist, dew on tall grass, golden light',
        desc: 'Wide-open plots on the estate’s western meadow. Build low, plant deep, watch the mist burn off.',
        dims: '50 × 80 ft · 4,000 sq.ft',
        facing: 'South-facing meadow plots',
        price: 18400000,
      },
    ],
  },
  legacy: {
    eyebrow: 'Why land',
    title: 'Buildings age. Ground compounds.',
    reasons: [
      {
        title: 'The oldest asset class',
        text: 'Devanahalli North has compounded steadily for a decade, anchored by the airport corridor and the STRR. Land here is bought by people who read twenty-year horizons, not quarterly reports.',
      },
      {
        title: 'Water at the centre',
        text: 'A three-acre lake, desilted and bunded, with four recharge wells. The estate’s water table is monitored quarterly and published — because a plot without water is just a rumour of a plot.',
      },
      {
        title: 'Surveyed to the inch',
        text: 'Every boundary is pegged in your presence, surveyed by licensed surveyors, and recorded with the sub-registrar. RERA registered, single survey number, zero litigation history.',
      },
      {
        title: 'Planted for the next generation',
        text: '2,400 native trees — neem, tamarind, rain tree, jamun — are already in the ground and under a five-year maintenance covenant. Your plot arrives with shade already growing.',
      },
    ],
  },
  enquire: {
    eyebrow: 'Enquire',
    title: 'Walk the land before you decide.',
    text: 'Site visits run every morning at 8 and every evening at 4, from the Northgate experience centre. Come see the pegs, the lake, and the soil — then talk numbers.',
    email: `hello@${kela.domain}`,
    phone: '+91 98450 12345',
    address: `${kela.name} Experience Centre, SH-104, Devanahalli, Bengaluru North 562110`,
    hours: 'Site visits · 8:00 AM & 4:00 PM daily',
  },
  footer: {
    line: `${kela.name} — plotted legacies, Devanahalli.`,
    colophon: 'RERA No. PRM/KA/RERA/1251/446/PR/2026/008214 · Prices exclusive of registration & stamp duty · Images are artistic impressions of the estate',
  },
};
