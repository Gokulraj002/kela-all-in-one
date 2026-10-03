import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: { name: kela.name, tagline: 'Cloud kitchen. 30-minute promise.' },
  nav: [
    { label: 'The Lineup', href: '#lineup' },
    { label: 'How it works', href: '#how' },
    { label: 'Deals', href: '#deals' },
    { label: 'Zones', href: '#coverage' },
  ],
  trackLabel: 'Track order',
  trackHref: '#how',
  hero: {
    eyebrow: 'Cloud kitchen · Bengaluru',
    titleA: 'HUNGRY?',
    titleB: 'FOOD AT SPEED.',
    sub: 'Fired to order, sealed with steam, at your door in 30 minutes flat. No dining room. No waiting. Just heat.',
    cta: 'Order now — 30 min',
    ctaHref: '#order',
    timerLabel: 'Avg. doorstep time right now',
    timerStart: '27:41',
    chips: ['No delivery fee over ₹499', 'Live kitchen cam', 'Hot-or-free'],
  },
  lineup: {
    eyebrow: 'The lineup',
    title: 'Three lanes. Zero waiting.',
    sub: 'Scroll and watch each lane fire. Every dish travels kitchen → rider → door.',
    lanes: [
      {
        id: 'biryani',
        name: 'Biryani Lane',
        imgKey: 'product-0',
        note: 'Dum sealed at 6 AM, every day',
        dishes: [
          { name: 'Hyderabadi Dum Biryani', price: 249, desc: 'Seeraga samba rice, saffron, mirchi ka salan.', eta: '28 min', tag: 'Best seller' },
          { name: 'Chicken 65 Biryani', price: 269, desc: 'Fiery 65 tossed through fragrant dum rice.', eta: '32 min', tag: 'Extra heat' },
          { name: 'Subz Dum Biryani', price: 199, desc: 'Charred veg, browned onions, mint raita.', eta: '24 min', tag: 'Veg' },
        ],
      },
      {
        id: 'burger',
        name: 'Burger Lane',
        imgKey: 'product-1',
        note: 'Smashed to order, never pressed twice',
        dishes: [
          { name: 'Double Smash Stack', price: 219, desc: 'Two smashed patties, molten cheddar, pickles.', eta: '26 min', tag: 'Best seller' },
          { name: 'Peri-Peri Crunch', price: 189, desc: 'Flame-grilled fillet, peri mayo, slaw.', eta: '25 min', tag: 'Spicy' },
          { name: 'Paneer Zinger', price: 179, desc: 'Crisp paneer, chipotle mayo, brioche.', eta: '22 min', tag: 'Veg' },
        ],
      },
      {
        id: 'dessert',
        name: 'Dessert Lane',
        imgKey: 'product-2',
        note: 'Baked at 4 PM, gone by 9',
        dishes: [
          { name: 'Molten Box Cake', price: 149, desc: 'Dark chocolate lava sealed in a hot box.', eta: '20 min', tag: 'Best seller' },
          { name: 'Biscoff Cheesecake Cup', price: 129, desc: 'No-bake cheesecake, burnt-caramel crumb.', eta: '18 min', tag: 'New' },
          { name: 'Gulab Jamun Cheesecake', price: 139, desc: 'Jamun-soaked base, cardamom cream.', eta: '18 min', tag: 'Fusion' },
        ],
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Tap. Fired. Doorbell.',
    sub: `Watch a real ${kela.name} order move through the kitchen — this is the pass, live.`,
    filmAlt: 'Hands folding a delivery box at speed, steam bursting as the lid closes, sticker slapped on, box sliding into a delivery bag',
    steps: [
      { n: '01', title: 'You tap', body: 'Order confirmed in under 10 seconds. The kitchen fires before you put the phone down.' },
      { n: '02', title: 'Kitchen fires', body: 'Avg 12 minutes on the flame. Your box is sealed with steam and stickered HOT.' },
      { n: '03', title: 'Rider at your door', body: 'Live-tracked every minute. 28 minutes average, hot-or-free on the promise.' },
    ],
  },
  deals: {
    eyebrow: 'Combos & deals',
    title: 'Flags worth chasing.',
    sub: 'Stacked, sealed, and priced to share. Limited boxes per drop.',
    combos: [
      { name: 'The Family Hotbox', price: 799, was: 940, desc: '2 biryanis + 2 burgers + 4 drinks + molten box cake.', flag: 'Save ₹141', tag: 'Feeds 4' },
      { name: 'Midnight Duo', price: 349, was: 418, desc: 'Any 2 burgers + peri fries + 2 molten cups. 10 PM – 2 AM.', flag: 'Late-night only', tag: 'Feeds 2' },
      { name: 'Party of Five', price: 1299, was: 1545, desc: '5 mains of your pick + 5 desserts + party fries.', flag: 'Save ₹246', tag: 'Feeds 5' },
    ],
    note: 'Deals refresh every Monday at 11 AM. When the flag drops, it is gone.',
  },
  coverage: {
    eyebrow: 'Coverage',
    title: 'We ride these streets.',
    sub: '12 kitchens across Bengaluru. If your pin is in the zone, we are already moving.',
    zones: [
      { name: 'Indiranagar', time: '22 min' },
      { name: 'Koramangala', time: '24 min' },
      { name: 'HSR Layout', time: '21 min' },
      { name: 'Whitefield', time: '29 min' },
      { name: 'JP Nagar', time: '25 min' },
      { name: 'Marathahalli', time: '26 min' },
      { name: 'Bellandur', time: '23 min' },
      { name: 'BTM Layout', time: '24 min' },
      { name: 'Electronic City', time: '30 min' },
      { name: 'Hebbal', time: '27 min' },
    ],
    note: 'Outside the zone? New kitchens drop monthly — join the waitlist below.',
  },
  order: {
    eyebrow: 'Order',
    title: 'Your food is already late.',
    sub: 'Kidding. Mostly. Tap below and the kitchen fires in 90 seconds.',
    cta: 'Order now — 30 min',
    ctaHref: '#order',
    promise: 'Hot-or-free: if we miss 30 minutes, dessert is on us.',
  },
  footer: {
    address: `${kela.name} HQ, 100 Ft Road, Indiranagar, Bengaluru 560038`,
    phone: '+91 80471 22030',
    email: `hello@${kela.domain}`,
    hours: 'Open daily 11 AM – 2 AM',
    columns: [
      { title: 'Order', links: ['The Lineup', 'Combos & deals', 'Track order', 'Gift cards'] },
      { title: 'Company', links: ['Our kitchens', 'Careers', 'Franchise', 'Press'] },
      { title: 'Support', links: ['Help center', 'Refund policy', 'Allergen info', 'Contact'] },
    ],
    line: `© 2026 ${kela.name} Foods Pvt. Ltd. All rights reserved. FSSAI Lic. No. 11223998000142.`,
  },
};
