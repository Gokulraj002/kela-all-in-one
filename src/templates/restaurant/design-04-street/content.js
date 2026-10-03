import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: { name: kela.name, tagline: 'Street food, served screaming hot' },
  nav: [
    { label: 'Cravings', href: '#menu' },
    { label: 'Legends', href: '#story' },
    { label: 'Find the cart', href: '#visit' },
    { label: 'Order', href: '#reserve' },
  ],
  hero: {
    eyebrow: 'Mumbai night market · Open till 2 AM',
    title: ['HOT.', 'FAST.', 'GONE.'],
    sub: 'Ninety seconds from tawa to plate. Butter by the fistful, chutneys that bite back, and a dosa the size of your forearm. The chowk never sleeps — feed the craving.',
    cta: 'Order now',
    ctaHref: '#reserve',
    ctaSecondary: 'See the cravings',
    ctaSecondaryHref: '#menu',
  },
  cravings: {
    eyebrow: 'The wall',
    title: 'THE CRAVINGS WALL',
    sub: 'Six reasons to skip dinner plans. Slam your pick, quick-add it, watch the meter.',
    items: [
      {
        name: 'Mysore Masala Dosa',
        price: 120,
        spice: 3,
        legend: true,
        img: 'hero',
        desc: 'Red garlic chutney smeared edge to edge, potato masala, and the crisp you can hear from across the street.',
      },
      {
        name: 'Chole Bhature',
        price: 140,
        spice: 2,
        legend: true,
        img: 'product-0',
        desc: 'Chickpeas simmered overnight till glossy and dark, with bhature puffed to order on the flame.',
      },
      {
        name: 'Pav Bhaji',
        price: 130,
        spice: 2,
        legend: false,
        img: 'product-1',
        desc: 'Mashed on the tawa with a fistful of butter, ladi pav toasted in the drippings. Accept no substitutes.',
      },
      {
        name: 'Pani Puri · 8 pc',
        price: 80,
        spice: 4,
        legend: false,
        img: 'detail',
        desc: 'Crisp shells, five different waters, ragda and raw onion. One bite each — no survivors.',
      },
      {
        name: 'Kulfi Falooda',
        price: 110,
        spice: 1,
        legend: false,
        img: 'product-2',
        desc: 'Dense malai kulfi, Kannauj rose syrup, falooda noodles and basil seeds. The cold answer to everything hot.',
      },
      {
        name: 'The Full Chowk',
        price: 299,
        spice: 5,
        legend: false,
        img: null,
        combo: true,
        desc: 'Any three cravings off this wall plus a kulfi falooda. Built for two humans or one legend.',
      },
    ],
  },
  legends: {
    eyebrow: 'Since the last century',
    title: 'LEGENDS OF THE CHOWK',
    sub: 'Every cart has an origin story. Ours are seasoned.',
    items: [
      {
        title: 'The 2 AM Dosa',
        since: 'Est. 1998',
        img: 'hero',
        body: 'The same tawa has poured over two lakh dosas — it is older than the building behind the cart. Regulars swear the seasoning remembers every order.',
      },
      {
        title: 'Chole, Simmered Overnight',
        since: 'Est. 2004',
        img: 'product-0',
        body: 'The chole goes on the flame at midnight. Twelve hours, a fistful of anardana, and butter added at the exact minute the first customer arrives.',
      },
      {
        title: 'The Falooda That Beat the Heat',
        since: 'Est. 2011',
        img: 'product-2',
        body: 'Kulfi churned at dawn, rose syrup from Kannauj. On May afternoons the queue bends around the block and nobody minds.',
      },
    ],
  },
  locations: {
    eyebrow: 'Wheels up nightly',
    title: 'FIND THE CART',
    sub: 'Three carts, one city. Follow the steam.',
    items: [
      {
        name: 'Linking Road Corner',
        area: 'Bandra West',
        days: 'Tue – Sun',
        time: '6:00 PM – 2:00 AM',
        note: 'The original cart. Look for the longest queue.',
      },
      {
        name: 'Sea Face Spot',
        area: 'Juhu Beach',
        days: 'Daily',
        time: '5:00 PM – 1:00 AM',
        note: 'Dosa with a sea breeze. Monsoon-proof awning.',
      },
      {
        name: 'Station East Stand',
        area: 'Andheri East',
        days: 'Mon – Sat',
        time: '6:00 PM – 12:30 AM',
        note: 'The commuter cart. Fifteen-minute express lane.',
      },
    ],
  },
  order: {
    eyebrow: 'Skip the queue',
    title: 'ORDER LOUD',
    sub: 'Fire your order ahead and the tawa is already hot when you arrive.',
    combos: [
      { name: 'The Full Chowk', price: 299, desc: 'Any 3 cravings + kulfi falooda. Feeds two.' },
      { name: 'Midnight Run', price: 199, desc: '2 Mysore dosas + cutting chai. Feeds one hungry soul.' },
      { name: 'Legend Plate', price: 249, desc: 'Chole bhature + pav bhaji + pani puri. The hall of fame.' },
    ],
    steps: [
      { n: '1', title: 'Pick your cravings', desc: 'Tap quick-add on anything on the wall.' },
      { n: '2', title: 'We fire the tawa', desc: 'Your order hits the cart the second you send it.' },
      { n: '3', title: 'Grab it hot', desc: 'Ready in 15 minutes at your chosen cart.' },
    ],
    note: 'Pickup at Linking Road Corner · UPI & cash accepted',
    cta: 'Start an order',
  },
  visit: {
    address: 'Linking Road Corner, Bandra West, Mumbai 400050',
    phone: '+91 98200 12345',
    email: `order@${kela.domain}`,
  },
  footer: {
    line: `© 2026 ${kela.name} · All cravings reserved`,
    marquee: `HOT · FAST · GONE · ${kela.name.toUpperCase()} ·`,
  },
};
