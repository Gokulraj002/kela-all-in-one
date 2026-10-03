import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('fashion');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'Conceptual fashion atelier · Mumbai',
    since: 'Est. 2019',
  },
  nav: ['Manifesto', 'Collection', 'Looks', 'Process', 'Viewings'],
  hero: {
    eyebrow: `${kela.name.toUpperCase()} · SS27 · "THE UNSTITCHED SHOW"`,
    title: 'Beautiful is boring.',
    sub: 'Five looks, one thread, zero apologies. Deconstructed garments tested to destruction and rebuilt for the few who collect them.',
    cta: 'Request a viewing',
    cta2: 'Read the manifesto',
  },
  manifesto: {
    label: 'THE CONCEPT · SS27',
    fragments: [
      {
        strike: 'seam',
        text: 'We unpicked the seam to find out what a garment believes in.',
      },
      {
        strike: 'Silhouette',
        text: 'Silhouette is a rumour. Structure is the argument.',
      },
      {
        strike: 'Finished',
        text: 'Nothing here is finished. Finished is a retail concept.',
      },
    ],
    colophon: 'Shown once, on a black steel runway, to 120 guests and one wind machine.',
  },
  collection: {
    label: 'THE STITCHED COLLECTION',
    note: 'One crimson thread. Five looks. Scroll to pull it through.',
    looks: [
      {
        no: '01',
        name: 'Unstitched Saree',
        fabric: 'Torn organza · bone & black · raw edges',
        code: 'KF-27-01',
        price: 145000,
        img: 'hero',
        alt: 'Model in a sculptural deconstructed saree of torn bone and black organza, crimson thread running through it, under a single hard spotlight',
      },
      {
        no: '02',
        name: 'Wind Drape',
        fabric: 'Bonded mesh · suspended mid-motion',
        code: 'KF-27-02',
        price: 98000,
        img: 'product-0',
        alt: 'Deconstructed drape look of black and bone fabric suspended mid-motion on a dark runway, one crimson ribbon caught in the movement',
      },
      {
        no: '03',
        name: 'Crimson Cut',
        fabric: 'Exaggerated bandhgala · crimson panel',
        code: 'KF-27-03',
        price: 186000,
        img: 'product-1',
        alt: 'Avant-garde black bandhgala with impossibly wide asymmetric shoulders and a diagonal crimson panel, on a steel runway',
      },
      {
        no: '04',
        name: 'Backstage Toile',
        fabric: 'Deconstructed muslin · dresser’s hands',
        code: 'KF-27-04',
        price: 74000,
        img: 'product-2',
        alt: 'Backstage before the show: a dresser’s hands adjusting a deconstructed black garment on a model, motion blur, concrete walls in shadow',
      },
      {
        no: '05',
        name: 'Burnt Seam Study',
        fabric: 'Burnt mesh · acid-dyed · basting stitch',
        code: 'KF-27-05',
        price: 52000,
        img: 'detail',
        alt: 'Macro of burnt and bonded black mesh over acid-dyed fabric, a single crimson basting stitch looping across raw edges',
      },
    ],
  },
  looks: {
    label: 'RUNNING ORDER',
    title: 'The show, numbered.',
    rows: [
      { no: '01', name: 'Unstitched Saree', fabric: 'Torn organza', code: 'KF-27-01', price: 145000 },
      { no: '02', name: 'Wind Drape', fabric: 'Bonded mesh', code: 'KF-27-02', price: 98000 },
      { no: '03', name: 'Crimson Cut', fabric: 'Exaggerated bandhgala', code: 'KF-27-03', price: 186000 },
      { no: '04', name: 'Backstage Toile', fabric: 'Deconstructed muslin', code: 'KF-27-04', price: 74000 },
      { no: '05', name: 'Burnt Seam Study', fabric: 'Burnt mesh', code: 'KF-27-05', price: 52000 },
    ],
    note: 'Prices are atelier commissions, ex-Mumbai. Each look is made once, to one body.',
  },
  process: {
    label: 'PROCESS · DESTRUCTION NOTES',
    title: 'Tested to destruction.',
    body: 'Every fabric is pushed until it fails — burnt, bonded, acid-dyed, torn — then the failure is tailored into the garment. Click a material to read its story.',
    materials: [
      {
        name: 'Burnt Mesh',
        story: 'Nylon mesh held over open flame until the hexagons collapse. What survives the burn becomes the panel — the garment remembers the fire.',
        code: 'MAT-01',
      },
      {
        name: 'Bonded Organza',
        story: 'Three layers of torn organza fused with heat-set adhesive, then ripped apart while still warm. The bond is the seam; the rip is the decoration.',
        code: 'MAT-02',
      },
      {
        name: 'Acid-Dyed Silk',
        story: 'Silk dipped in pigment baths until the fibre eats itself. Colours that should not exist — bruised ink, rusted bone — held with a fixative whisper.',
        code: 'MAT-03',
      },
      {
        name: 'Black Latex',
        story: 'Sheet latex, talc-dusted and panel-cut like leather. It creaks. It shines where it should not. It is worn exactly once before it decides otherwise.',
        code: 'MAT-04',
      },
      {
        name: 'Raw-Edge Cotton',
        story: 'Handloom cotton, warp left hanging off the selvedge. The fringe is not a trim — it is the loom refusing to be cut.',
        code: 'MAT-05',
      },
    ],
    journal: [
      { week: 'W01', note: 'Burnt the first mesh. Kept the holes.' },
      { week: 'W04', note: 'The bandhgala shoulder needed to be impossible. Made it impossible.' },
      { week: 'W07', note: 'Wind machine test: the organza held, the ribbon did not. Kept the ribbon.' },
      { week: 'W11', note: 'Show day. 120 guests. The thread stayed in.' },
    ],
  },
  viewing: {
    label: 'PRIVATE VIEWINGS',
    title: 'Request a viewing.',
    body: 'The collection is not sold. It is shown — privately, one guest at a time, in the atelier or on video. Tell us which look stopped you.',
    steps: [
      { no: '01', name: 'Consult', desc: 'Thirty minutes. Your body, your occasion, your nerve. We listen.' },
      { no: '02', name: 'Toile', desc: 'A first build in muslin, fitted on you or your dress form.' },
      { no: '03', name: 'Fittings', desc: 'Two fittings minimum. The crimson thread goes in last.' },
    ],
    form: {
      nameLabel: 'Name',
      emailLabel: 'Email',
      cityLabel: 'City',
      noteLabel: 'Which look stopped you?',
      submit: 'Send the request',
      done: 'Received. The atelier replies within two days — usually with a time, always with intent.',
    },
  },
  contact: {
    email: `atelier@${kela.domain}`,
    phone: '+91 22 4890 2019',
    address: `${kela.name} · 3rd floor, Kala Ghoda, Fort, Mumbai 400001`,
    hours: 'By appointment · Tue – Sat',
    instagram: `@${kela.instagram}`,
  },
  footer: {
    fragment: 'Nothing here is finished.',
    line: `© 2026 ${kela.name} · Conceptual fashion atelier, Mumbai`,
    credits: [
      'SS27 "The Unstitched Show" · 120 guests · one wind machine',
      'Photography — in-house, hard light only',
      'The crimson thread is one continuous length.',
    ],
  },
};
