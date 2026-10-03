/* Kela Estates (brand from _shared/brand.js) — design-07-smart content (JSON-compatible, no functions) */
import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('realestate');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Smart homes, quietly',
    location: 'Bengaluru',
  },
  nav: [
    { href: '#day', label: 'The Day' },
    { href: '#features', label: 'Features' },
    { href: '#plans', label: 'Floor Plans' },
    { href: '#visit', label: 'Visit' },
  ],
  hero: {
    eyebrow: 'Smart residences · Whitefield, Bengaluru',
    title: 'The house that reads the light.',
    sub: `${kela.name} residences tune themselves to the sun — blinds, climate, light and security moving through the day so you never touch a switch. Technology you feel, never see.`,
    cta: 'Book a private tour',
    ctaHref: '#visit',
    note: 'Watch the house wake — ten seconds, every morning.',
  },
  day: {
    eyebrow: 'A day in the house',
    title: 'Scroll through twenty-four hours.',
    sub: 'One room, one day. Drag the light from 06:00 to 22:00 and watch the house respond — the grade shifts, the systems wake, the mood follows.',
    hint: 'Scroll — the day moves with you',
    phases: [
      {
        id: 'dawn',
        time: '06:00',
        name: 'Dawn',
        system: 'Blinds',
        title: 'Blinds rise with the sun.',
        text: 'Sheers lift in sequence as the sky brightens — the bedroom first, the kitchen last. No alarms; the room itself is the wake-up call.',
      },
      {
        id: 'day',
        time: '12:00',
        name: 'Day',
        system: 'Climate',
        title: 'Climate follows the shade.',
        text: 'Fresh-air cycles and solar shading track the sun across the glass all afternoon. The house holds 24 degrees without a sound.',
      },
      {
        id: 'dusk',
        time: '18:30',
        name: 'Dusk',
        system: 'Lighting',
        title: 'Light learns the evening.',
        text: 'Scenes fade from work-white to candle-amber as the evening deepens. The cove line along the ceiling does the talking.',
      },
      {
        id: 'night',
        time: '22:00',
        name: 'Night',
        system: 'Security',
        title: 'The house keeps watch.',
        text: 'Perimeter locks, low night lighting on the path, silent monitoring from one dial by the door. Sleep; it has the night shift.',
      },
    ],
  },
  features: {
    eyebrow: 'Quiet competence',
    title: 'Everything handled. Nothing shown off.',
    sub: 'Four systems, one dial. The technology lives in the walls, not on the counter.',
    items: [
      {
        title: 'Living light',
        text: 'Circadian cove lighting across every room. Colour temperature drifts with the sun — cool and clear by day, amber after dusk.',
        spec: '2200–6500K full-spectrum',
      },
      {
        title: 'Silent climate',
        text: 'Zoned air and solar shading work as one system. Rooms pre-cool before you arrive and hold temperature within half a degree.',
        spec: '±0.5° zone control',
      },
      {
        title: 'One-dial control',
        text: 'A single brushed dial by the door — or the app, if you prefer. Scenes, locks, climate, light. No wall of switches, no manual to read.',
        spec: 'Local-first, no cloud needed',
      },
      {
        title: 'Always watching, never staring',
        text: 'Perimeter sensing, entry logs and night lighting that wakes only for movement. Your data stays in the house.',
        spec: 'On-device processing',
      },
    ],
  },
  plans: {
    eyebrow: 'Residences',
    title: 'Three ways to live the day.',
    sub: `Every ${kela.name} residence ships with the full system — blinds, climate, lighting scenes and security — tuned to its orientation and floor.`,
    cta: 'Request the full plan set',
    residences: [
      {
        name: 'The Dawn 2',
        type: '2 BHK smart residence',
        area: '1,245 sq.ft',
        facing: 'East-facing',
        floor: 'Levels 4–11',
        price: 24800000,
        image: 'product-0',
        note: 'Morning light in the kitchen by design.',
      },
      {
        name: 'The Meridian 3',
        type: '3 BHK smart residence',
        area: '1,780 sq.ft',
        facing: 'North-East facing',
        floor: 'Levels 6–18',
        price: 36900000,
        image: 'product-1',
        note: 'The full day-cycle suite, corner glass.',
      },
      {
        name: 'The Zenith 4',
        type: '4 BHK sky residence',
        area: '2,640 sq.ft',
        facing: '360° terrace',
        floor: 'Levels 20–24',
        price: 58500000,
        image: 'product-2',
        note: 'Dusk over the city, every evening.',
      },
    ],
  },
  visit: {
    eyebrow: 'Experience it',
    title: 'Come watch the house wake.',
    text: 'The experience centre runs the full day-cycle on loop — dawn to night in twelve minutes. Private tours daily, 10:00 to 19:00.',
    address: `${kela.name} Experience Centre, ITPL Main Road, Whitefield, Bengaluru 560066`,
    phone: '+91 80 4719 2200',
    email: `hello@${kela.domain}`,
    cta: 'Book a private tour',
  },
  footer: {
    line: `${kela.name} — smart homes, quietly. Whitefield, Bengaluru.`,
    colophon: `RERA No. PRM/KA/RERA/1251/446/2026 · Prices inclusive of the full ${kela.name} system`,
  },
};
