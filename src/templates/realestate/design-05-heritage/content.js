import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    short: kela.name,
    est: '2018',
    tagline: 'Restorers of old Bengaluru',
  },
  nav: [
    { label: 'Restorations', href: '#restorations' },
    { label: 'Before & After', href: '#compare' },
    { label: 'Craft', href: '#craft' },
    { label: 'The Ritual', href: '#ritual' },
    { label: 'Journal', href: '#journal' },
    { label: 'Enquire', href: '#enquire' },
  ],
  hero: {
    eyebrow: 'Heritage restoration · Malleshwaram, Bengaluru · Est. 2018',
    title: 'Old walls, kept honestly.',
    sub: 'We restore Bengaluru\u2019s century-old homes the slow way \u2014 lime mortar, reclaimed teak, hand-cast brass \u2014 so the next hundred years begin on honest foundations.',
    cta: 'Walk the restorations',
    ctaHref: '#restorations',
    ledgerNote: 'Seventeen houses returned to lime and light · Six commissions a year · No cement, ever',
  },
  restorations: {
    eyebrow: 'The restorations',
    title: 'Houses we have given back their century.',
    sub: 'Each project is a full conservation restoration \u2014 structure, plaster, joinery, fittings \u2014 documented course by course and handed over with a maintenance ledger.',
    projects: [
      {
        imgKey: 'product-0',
        name: 'The Srinivasa Nilaya',
        location: '8th Cross, Malleshwaram',
        built: 1908,
        restored: 2025,
        price: 64000000,
        desc: 'A Chettiar courtyard house stripped of forty years of cement and emulsion, brought back to lime and light. Its Athangudi tiles were lifted, cleaned, and relaid by hand.',
      },
      {
        imgKey: 'product-1',
        name: 'The Doraiswamy House',
        location: 'Basavanagudi',
        built: 1931,
        restored: 2023,
        price: 52000000,
        desc: 'An art-deco corner house whose teak staircase had been painted shut. Rebuilt from salvaged Burma teak, pegged \u2014 never screwed \u2014 and re-oiled to a candle glow.',
      },
      {
        imgKey: 'product-2',
        name: 'The Athreya Villa',
        location: 'Chamarajpet',
        built: 1922,
        restored: 2024,
        price: 47500000,
        desc: 'A planter\u2019s bungalow with carved pillars and a collapsing Madras terrace. The roof was relaid on new teak rafters; the limewash went on in three coats, as it should.',
      },
    ],
  },
  compare: {
    eyebrow: 'Before & after',
    title: 'Scroll through a restoration.',
    sub: 'Three chapters from the same houses \u2014 drag of the scroll wipes the archival record into the restored present. Sepia is how we found them; color is how we left them.',
    chapters: [
      {
        num: 'I',
        imgKey: 'hero',
        title: 'The Facade',
        before: '1902',
        after: '2026',
        alt: 'Restored heritage facade in late-afternoon sun, carved stone and warm light',
        caption:
          'Three monsoons of neglect had taken the plaster and half the roof. We repointed every stone in lime, relaid the Madras terrace, and washed the walls in three coats of limewash.',
      },
      {
        num: 'II',
        imgKey: 'product-0',
        title: 'The Colonnade',
        before: '1931',
        after: '2026',
        alt: 'Restored colonnade with carved stone pillars and limewash walls in warm daylight',
        caption:
          'Cement had suffocated these arches for decades. Hacked back to brick and re-rendered in surkhi-lime, the colonnade breathes again \u2014 and the shadows fell back into place.',
      },
      {
        num: 'III',
        imgKey: 'product-2',
        title: 'The Interiors',
        before: '1922',
        after: '2026',
        alt: 'Restored heritage interior with carved wooden pillars in warm lamplight',
        caption:
          'Paint had hidden the carved teak for two generations. Stripped with heat, never chemicals; every pillar re-oiled, every joint re-pegged, every lamp re-hung in brass.',
      },
    ],
  },
  craft: {
    eyebrow: 'Craft & materials',
    title: 'The material library.',
    sub: 'Four materials, no substitutes. If a house was built with it, the house is repaired with it.',
    materials: [
      {
        num: 'I',
        name: 'Surkhi-lime mortar',
        origin: 'Slaked on site, Malleshwaram',
        text: 'Slaked lime, burnt-brick surkhi, jaggery and kadukkai \u2014 no cement, ever. It flexes with the seasons, breathes out monsoon damp, and heals its own hairline cracks.',
      },
      {
        num: 'II',
        name: 'Reclaimed Burma teak',
        origin: 'Salvaged across old Bengaluru',
        text: 'Recovered from homes that could not be saved and seasoned for decades already. Joined with wooden pegs and wedges \u2014 never nails, never screws.',
      },
      {
        num: 'III',
        name: 'Hand-cast brass',
        origin: 'Poured in Peenya foundries',
        text: 'Hinges, knockers, lamp brackets \u2014 cast from wax patterns taken off the house\u2019s own originals, so a 1920s fitting returns as a 1920s fitting.',
      },
      {
        num: 'IV',
        name: 'Matched stone',
        origin: 'Cut by hand, Sira quarries',
        text: 'Grey granite and sandstone cut to the profile of whatever the house surrendered. New stone is tooled to read as kin, never as counterfeit.',
      },
    ],
    craftsmenTitle: 'The hands.',
    craftsmenSub: 'No faces on this page by their request \u2014 the work is the portrait.',
    craftsmen: [
      {
        name: 'Muthu Kannan',
        craft: 'Master mason · lime & stone',
        years: '34 years at the trowel',
        note: 'Reads a wall the way others read letters. His repointing is invisible \u2014 which is precisely the point.',
      },
      {
        name: 'Gowri Shankar',
        craft: 'Teak joiner',
        years: '28 years at the bench',
        note: 'Can tell Burma teak from plantation teak by smell. Has rebuilt eleven staircases without a single screw.',
      },
      {
        name: 'Abdul Rehman',
        craft: 'Brass caster',
        years: '41 years at the furnace',
        note: 'Casts from the originals\u2019 own patterns, so the knocker a grandmother lifted still lifts the same.',
      },
    ],
  },
  ritual: {
    eyebrow: 'The ritual · a ten-second film',
    title: 'Hands first.',
    body: 'Every restoration begins the same way: a trowel, a bucket of lime, and patience. This is the unit of our work \u2014 everything after it is arithmetic.',
    filmCaption: 'Hands of restoration \u2014 lime repointing at the Srinivasa Nilaya, late afternoon.',
    filmNote: 'Filmed on site · loops gently',
  },
  journal: {
    eyebrow: 'The journal',
    title: 'Notes from the scaffold.',
    entries: [
      {
        date: '14 August 2026',
        title: 'Why we will not use cement',
        excerpt:
          'Cement traps moisture and cooks old brick from the inside. Lime lets a wall exhale. The argument is a century old; the evidence is on every facade we have opened.',
      },
      {
        date: '2 July 2026',
        title: 'The door that remembered its house',
        excerpt:
          'A teak door sold off in 1987 surfaced in a Shivajinagar salvage yard \u2014 still carrying the Srinivasa Nilaya\u2019s hinge marks. It is home now, and it fits like it never left.',
      },
      {
        date: '19 May 2026',
        title: 'Reading a monsoon in the plaster',
        excerpt:
          'Cracks are diaries. A diagonal at the lintel, a map along the plinth \u2014 before we touch a wall, we read what the rain has been writing on it for fifty years.',
      },
    ],
  },
  enquire: {
    eyebrow: 'Enquire',
    title: 'Commission a restoration.',
    body: 'We take on six houses a year, and we choose them slowly. Write to us with photographs and a little of your house\u2019s history \u2014 the older the story, the better we listen.',
    address: 'No. 42, 11th Cross, Malleshwaram, Bengaluru 560 003',
    phone: '+91 80 4123 8890',
    email: `namaste@${kela.domain}`,
    hours: 'Studio visits · Saturdays, 10 to 1, by appointment',
    cta: 'Request a viewing',
  },
  footer: {
    line: `${kela.name} \u2014 restorers of old Bengaluru.`,
    colophon: 'Set in Playfair Display & Manrope · Limewash, oxblood & brass · Est. 2018',
  },
};
