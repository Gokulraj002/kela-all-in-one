import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('travel');

export const content = {
  brand: {
    name: kela.name,
    descriptor: 'Heritage Journeys',
    est: 'Est. MMXVI',
  },
  nav: [
    { label: 'The Eras', href: '#destinations' },
    { label: 'The Film', href: '#gallery' },
    { label: 'Field Notes', href: '#story' },
    { label: 'Guides', href: '#craft' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'Heritage journeys · South Asia',
    title: 'Walk the old roads.',
    sub: 'Small-group journeys through four thousand years of carved stone — led by working scholars, paced like a good book, and never more than eight travellers at a time.',
    cta: 'Descend through the eras',
    ctaHref: '#destinations',
    secondary: 'Plan your journey',
    secondaryHref: '#visit',
  },
  eras: {
    eyebrow: 'The excavation',
    title: 'Four strata of stone',
    intro:
      `Every ${kela.name} journey is organised like a dig. We begin at the surface, in the living present, and peel back one era at a time until we reach bedrock. Scroll — the strata move with you.`,
    hint: 'Keep scrolling to excavate',
    items: [
      {
        numeral: 'I',
        name: 'Ancient',
        period: '300 BCE – 1200 CE',
        note: 'Bedrock. Temples raised by dynasties whose names the stone still remembers.',
        journey: 0,
      },
      {
        numeral: 'II',
        name: 'Medieval',
        period: '1200 – 1750 CE',
        note: 'Forts, courts and caravanserais — power carved into ridgelines.',
        journey: 1,
      },
      {
        numeral: 'III',
        name: 'Colonial',
        period: '1750 – 1947',
        note: 'Railways, cantonments and port cities — an empire written in brick and steam.',
        journey: 2,
      },
      {
        numeral: 'IV',
        name: 'Living',
        period: '1947 – today',
        note: 'The surface. Rituals, crafts and kitchens that never stopped.',
        journey: 3,
      },
    ],
  },
  journeys: [
    {
      name: 'Hampi: City of Victory',
      era: 'Ancient',
      tag: 'Archaeological',
      duration: '7 days · October – February',
      price: 68000,
      blurb:
        'Seven days among the boulders and bazaars of Vijayanagara — the stone chariot at dawn, the great platform at dusk, and an epigraphist who can read the walls aloud.',
    },
    {
      name: 'The Rajput Circuit',
      era: 'Medieval',
      tag: 'Forts & Palaces',
      duration: '9 days · November – March',
      price: 84000,
      blurb:
        'Nine days from Amber to Jaisalmer by way of Chittorgarh — ramparts, stepwells and a historian who knows which gate the elephants used.',
    },
    {
      name: 'The Coromandel Mail',
      era: 'Colonial',
      tag: 'Rail Heritage',
      duration: '6 days · December – February',
      price: 56000,
      blurb:
        'Six days along the old trunk line — colonial stations, hill cantonments and a night aboard a restored 1920s saloon carriage.',
    },
    {
      name: 'The Temple Towns',
      era: 'Living',
      tag: 'Living Traditions',
      duration: '5 days · Year-round',
      price: 42000,
      blurb:
        'Five days where the past never left — dawn rituals, bronze-casters’ lanes and kitchen tables with families who have cooked for pilgrims for generations.',
    },
  ],
  film: {
    eyebrow: 'Interlude',
    title: 'Morning Rite',
    body: 'Ten seconds inside a sandstone courtyard as the day begins — incense smoke, shafts of light across carved pillars, a doorway glowing from within. This is the pace we travel at.',
    caption:
      'Plate III — A courtyard wakes. Sandstone, smoke, first light. Scroll to play the ten seconds.',
  },
  journal: {
    eyebrow: 'The monograph',
    title: 'Field notes',
    intro:
      'Dispatches from the road — written by our guides, printed like they mean it.',
    entries: [
      {
        title: 'Reading a gopuram',
        date: 'Margazhi · Madurai',
        excerpt:
          'A temple tower is a census in stone. Every tier lists who paid, who prayed and who carved — if you know where to look, and our epigraphists do.',
      },
      {
        title: 'The grammar of stone',
        date: 'Kartik · Hampi',
        excerpt:
          'Vijayanagara masons worked to a canon as strict as poetry. Once you learn the metre, you can date a wall the way you date a verse.',
      },
      {
        title: 'What the guides carry',
        date: 'Year-round · Everywhere',
        excerpt:
          'Notebooks, mostly. Rubbings, measurements, the phone numbers of temple priests. Knowledge you can only get by standing in the same spot for twenty years.',
      },
    ],
  },
  guides: {
    eyebrow: 'The guides',
    title: 'Scholars, not shepherds',
    intro:
      `Every ${kela.name} group travels with a working researcher — someone who has published on the very ground you are standing on.`,
    items: [
      {
        initials: 'MK',
        name: 'Dr. Meera Krishnan',
        field: 'Art & architecture historian',
        bio: 'Twenty years documenting Chola bronze workshops; leads our temple-town journeys and still gets excited by a good corbel.',
      },
      {
        initials: 'AR',
        name: 'Arjun Rathore',
        field: 'Medieval historian',
        bio: 'Writes on Rajput court culture and leads the fort circuit. Knows every stepwell between Jaipur and Jaisalmer by name.',
      },
      {
        initials: 'NR',
        name: 'Nandini Rao',
        field: 'Anthropologist of craft',
        bio: 'Studies living craft lineages and travels with weavers’ and bronze-casters’ families. Fluent in three kinds of loom.',
      },
    ],
  },
  visit: {
    eyebrow: 'Plan your journey',
    title: 'Small groups, slow days',
    intro:
      'Eight travellers, one scholar, no queues. Tell us which stratum calls to you.',
    facts: [
      { label: 'Group size', value: 'Never more than 8' },
      { label: 'Season', value: 'October – March' },
      { label: 'Pace', value: 'One site a day, properly' },
      { label: 'Includes', value: 'Scholar-guide, stays, all entries' },
    ],
    address: '14 Temple Street, Malleswaram, Bengaluru 560003',
    phone: '+91 98450 12345',
    email: `journeys@${kela.domain}`,
    note: 'Write to us — a person replies, usually Meera.',
  },
  contact: {
    eyebrow: 'Correspondence',
    title: 'Begin with a letter.',
    body: 'Tell us which era you dream in. We reply within two working days with dates, availability and a reading list.',
    cta: 'Write to us',
  },
  footer: {
    line: `${kela.name} — heritage journeys, printed and walked.`,
    colophon: 'Set in Fraunces & Spectral · Strata I–IV · MMXXVI',
  },
};
