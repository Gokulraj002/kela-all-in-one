import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A rustic trattoria — the table is always big enough',
  },
  nav: [
    { label: 'Our Story', href: '#story' },
    { label: 'The Dishes', href: '#dishes' },
    { label: 'Menu', href: '#menu' },
    { label: 'Pasta', href: '#craft' },
    { label: 'Visit', href: '#visit' },
  ],
  phone: '+91 22 4567 8910',
  hero: {
    eyebrow: 'Trattoria · Mumbai · Est. 1998',
    title: ['Come hungry.', 'Leave family.'],
    sub: 'Hand-torn pasta, a wood-fired oven, and a table that never empties — the way Nonna Elba always served it.',
    cta: 'Book the big table',
    ctaHref: '#visit',
    ctaSecondary: 'Read the chalkboard',
    ctaSecondaryHref: '#menu',
  },
  story: {
    eyebrow: 'Our story',
    title: 'It started with Nonna Elba and a pot that never cooled',
    body: [
      'In 1998, Elba Ferraro arrived in Mumbai with two suitcases, a wooden rolling pin, and her mother\u2019s rag\u00f9 recipe written on the back of a train ticket. She cooked the way she had always cooked — slowly, generously, and for more people than the table could hold.',
      'Twenty-eight years later, the pot still simmers from noon to night. Her grandchildren roll the sfoglia every morning at seven. And every plate that leaves our kitchen still carries her rule: nobody leaves this table hungry.',
    ],
    quote: 'A recipe is just a list. The love is in how long you let it simmer.',
    quoteBy: 'Nonna Elba Ferraro, founder',
  },
  dishes: {
    eyebrow: 'The dishes',
    title: 'Spin the table',
    sub: 'Six plates that built our name. Scroll, and the lazy susan turns — whatever lands on top is tonight\u2019s suggestion.',
    items: [
      {
        name: 'Pappardelle al Rag\u00f9 della Nonna',
        price: 620,
        img: 'product-0',
        desc: 'Hand-torn ribbons folded through a six-hour rag\u00f9 of beef, pork and a whisper of nutmeg.',
        note: 'Nonna Elba\u2019s rag\u00f9 — the pot never cools before noon',
      },
      {
        name: 'Margherita al Forno',
        price: 540,
        img: 'product-1',
        desc: 'Leopard-spotted crust, San Marzano tomatoes, fior di latte, basil from our window boxes.',
        note: 'Fired at 450\u00b0C in the wood oven',
      },
      {
        name: 'Tiramis\u00f9 della Casa',
        price: 380,
        img: 'product-2',
        desc: 'Espresso-soaked savoiardi under a mascarpone cloud, cocoa dusted at the table.',
        note: 'Elba\u2019s recipe, measured to the gram',
      },
      {
        name: 'Sfoglia Fatta a Mano',
        price: 560,
        img: 'detail',
        desc: 'Fresh sheets rolled every morning at seven — flour, eggs, and patience. Tossed in brown butter and sage.',
        note: 'Rolled by hand, never by machine',
      },
      {
        name: 'Rag\u00f9 di Cinghiale',
        price: 690,
        img: 'product-0',
        desc: 'Wild-boar rag\u00f9 slow-braised with juniper and red wine, folded through pappardelle.',
        note: 'A winter-table favourite',
      },
      {
        name: 'Affogato al Caff\u00e8',
        price: 320,
        img: 'product-2',
        desc: 'Vanilla-bean gelato drowned in a double shot of our house espresso.',
        note: 'The proper end to lunch',
      },
    ],
  },
  menu: {
    eyebrow: 'The chalkboard',
    title: 'Tonight, in chalk',
    sub: 'Our menu changes with the market and Nonna\u2019s mood. This is what\u2019s on the board this week.',
    groups: [
      {
        name: 'Per Cominciare',
        items: [
          { name: 'Bruschetta al Pomodoro', price: 320, note: 'grilled sourdough, basil oil' },
          { name: 'Polpette al Sugo', price: 420, note: 'Elba\u2019s meatballs, torn basil' },
          { name: 'Tagliere della Casa', price: 680, note: 'cured meats, cheeses, olives — for the table' },
        ],
      },
      {
        name: 'Primi',
        items: [
          { name: 'Pappardelle al Rag\u00f9 della Nonna', price: 620, note: 'six-hour rag\u00f9' },
          { name: 'Spaghetti Cacio e Pepe', price: 540, note: 'pecorino, cracked pepper' },
          { name: 'Sfoglia Fatta a Mano', price: 560, note: 'brown butter, sage' },
          { name: 'Rag\u00f9 di Cinghiale', price: 690, note: 'juniper, red wine' },
        ],
      },
      {
        name: 'Dal Forno',
        items: [
          { name: 'Margherita al Forno', price: 540, note: '450\u00b0C wood oven' },
          { name: 'Diavola', price: 590, note: 'spicy salami, honey' },
          { name: 'Quattro Formaggi', price: 620, note: 'gorgonzola, taleggio, fontina' },
        ],
      },
      {
        name: 'Dolci',
        items: [
          { name: 'Tiramis\u00f9 della Casa', price: 380, note: 'cocoa dusted at the table' },
          { name: 'Panna Cotta al Forno', price: 340, note: 'baked, with macerated figs' },
          { name: 'Affogato al Caff\u00e8', price: 320, note: 'double espresso, vanilla bean' },
        ],
      },
    ],
  },
  craft: {
    eyebrow: 'Handmade, daily',
    title: 'The pasta is never bought',
    body: [
      'Every morning at seven, before the ovens are lit, our sfogline dust the big wooden table with flour and roll the day\u2019s pasta by hand. No machines, no shortcuts — the rolling pin Elba carried from Italy in 1998 still does most of the work.',
      'You can taste the difference in the rag\u00f9: a rough, hand-torn edge holds sauce the way smooth factory pasta never will.',
    ],
    notes: [
      {
        title: 'The flour',
        text: 'Stone-milled "00" from a single mill in Emilia-Romagna, shipped to us every month.',
      },
      {
        title: 'The eggs',
        text: 'One hundred yolks a day, from free-range hens in Lonavala. Nothing else goes in.',
      },
      {
        title: 'The hands',
        text: 'Three generations of sfogline. The youngest, Mira, is nineteen and already faster than her grandmother.',
      },
    ],
  },
  sunday: {
    eyebrow: 'Every Sunday, 12 to 4',
    title: 'La Tavola della Domenica',
    body: `One long table, one fixed price, and food that keeps arriving until you surrender. Sundays at ${kela.name} are served family-style — the way Elba insisted every Sunday should be.`,
    price: 1450,
    priceNote: 'per person, family-style',
    courses: [
      'Antipasti at the table — bruschetta, olives, cured meats',
      'Two primi to share — rag\u00f9 della nonna and sfoglia of the day',
      'A roast from the wood oven with rosemary potatoes',
      'Dolci — tiramis\u00f9 and affogato, bottomless espresso',
    ],
  },
  visit: {
    eyebrow: 'Visit us',
    title: 'The big table is waiting',
    address: '42, Kala Ghoda Lane, Fort, Mumbai 400001',
    phone: '+91 22 4567 8910',
    email: `tavola@${kela.domain}`,
    hours: [
      { days: 'Tue – Sun', time: '12:00 – 3:30 · 7:00 – 11:30' },
      { days: 'Monday', time: 'Closed — the pot rests' },
      { days: 'Sunday table', time: '12:00 – 4:00, family-style' },
    ],
    cta: 'Book the big table',
  },
  footer: {
    line: `\u00a9 2026 ${kela.name}. Mangia bene, ridi spesso.`,
    colophon: 'Set in Fraunces & Karla · Baked at 450\u00b0C',
  },
};
