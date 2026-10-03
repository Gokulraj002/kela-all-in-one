import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('restaurant');

export const content = {
  brand: {
    name: kela.name,
    tagline: 'A working farm & kitchen',
    est: 'Est. 2019 · 14 acres',
  },
  nav: [
    { label: 'Our Farm', href: '#story' },
    { label: 'The Seasons', href: '#seasons' },
    { label: 'Today\u2019s Harvest', href: '#menu' },
    { label: 'Supper Club', href: '#reserve' },
    { label: 'Visit', href: '#visit' },
  ],
  hero: {
    eyebrow: 'A working farm & kitchen · Kanakapura Road, Bengaluru',
    title: 'Dinner starts in the dirt.',
    sub: 'Everything on your plate was pulled, picked, or plucked on our fourteen acres — most of it this morning. The menu follows the seasons; the seasons answer to nobody.',
    cta: 'See today\u2019s menu',
    ctaHref: '#menu',
    secondary: 'Meet the growers',
    secondaryHref: '#story',
    note: 'Breakfast from the field, lunch under the neem tree, dinner in the barn.',
  },
  story: {
    eyebrow: 'Our farm',
    title: 'Fourteen acres, nine growers, zero shortcuts.',
    body: [
      `${kela.name} began in 2019 with a leased patch of red earth and a stubborn idea: a restaurant should know the name of every field its food comes from. Six years on, the kitchen sits in the middle of the farm, and the walk from row to plate is about ninety seconds.`,
      'We grow without synthetic fertiliser, compost everything the kitchen sends back, and plant by the season, not the menu. When the last tomato is gone, the tomato dishes go with it — that is the whole point.',
    ],
    growers: [
      {
        name: 'Meera Krishnan',
        role: 'Head grower · Vegetables',
        rows: 'Rows 1–12',
        quote: 'I plant what I like to eat. If a crop bores me in the field, it will bore you on the plate.',
      },
      {
        name: 'Ravi Gowda',
        role: 'Orchard & bees',
        rows: 'The guava line, forty hives',
        quote: 'The bees decide the fruit calendar. I just take notes and keep the ladders steady.',
      },
      {
        name: 'Lakshmi Devi',
        role: 'Greens & herbs',
        rows: 'The shade houses',
        quote: 'Greens picked at dawn and greens picked at noon are two different vegetables. We pick at dawn.',
      },
    ],
    panel: {
      title: 'From the farm notebook',
      lines: [
        'Soil pH this week: 6.4 — the carrots are sweet.',
        'Rain expected Thursday; the barn dinner moves under cover.',
        'Row 7 tomatoes finished yesterday. They will be missed.',
      ],
    },
  },
  seasons: {
    eyebrow: 'The seasons',
    title: 'Turn the dial. The menu turns with it.',
    intro:
      'Our kitchen writes four menus a year, not one. Scroll and the season dial turns — spring, summer, autumn, winter — and the dishes below change with it, the way the farm does. No dish survives its season.',
    list: [
      {
        id: 'spring',
        label: 'Spring',
        months: 'Feb – Mar',
        fieldNote: 'First greens, shy strawberries, the soil waking up.',
        dishes: [
          { name: 'Heirloom Tomato & Basil Plate', price: 520, desc: 'Three colours of tomato, torn basil, cold-pressed groundnut oil.', note: 'Row 7 · picked this morning' },
          { name: 'Spring Onion & Potato Soup', price: 380, desc: 'Charred spring onions, farm cream, chive oil.', note: 'Rows 3–4 · yesterday\u2019s dig' },
          { name: 'Green Garlic & Pea Pulao', price: 640, desc: 'Hand-pounded green garlic, sweet peas, ghee from the Gir cows.', note: 'Shade house · cut at dawn' },
          { name: 'Strawberry & Cream Panna Cotta', price: 450, desc: 'First berries of the year, barely set cream, basil sugar.', note: 'Berry beds · this week only' },
        ],
      },
      {
        id: 'summer',
        label: 'Summer',
        months: 'Apr – Jun',
        fieldNote: 'Mangoes, long hot afternoons, the well working overtime.',
        dishes: [
          { name: 'Fire-Roasted Corn, Burnt Butter', price: 350, desc: 'Corn roasted in its husk over mango wood, burnt butter, lime.', note: 'Row 9 · today\u2019s pick' },
          { name: 'Mango & Burrata, Basil Oil', price: 620, desc: 'Alphonso from the old tree, torn burrata, basil oil, sea salt.', note: 'The old mango tree · ripe now' },
          { name: 'Okra, Crushed Peanut, Tamarind', price: 420, desc: 'Crisp okra, roasted peanut, tamarind glaze, curry leaf.', note: 'Row 11 · picked young' },
          { name: 'Watermelon Granita, Lime Leaf', price: 380, desc: 'Shaved ice of farm watermelon, kaffir lime, a pinch of salt.', note: 'Melon patch · peak week' },
        ],
      },
      {
        id: 'autumn',
        label: 'Autumn',
        months: 'Jul – Sep',
        fieldNote: 'Monsoon greens, the roast oven earns its keep.',
        dishes: [
          { name: 'Farm Roast Chicken & Vegetables', price: 880, desc: 'Free-range bird, carrots, parsnips and potatoes from the same soil.', note: 'Rows 5–8 · this morning\u2019s dig' },
          { name: 'Pumpkin & Sage Ravioli', price: 720, desc: 'Hand-rolled pasta, roasted pumpkin, fried sage, brown butter.', note: 'Row 10 · cured two weeks' },
          { name: 'Beetroot & Goat Cheese Tart', price: 560, desc: 'Slow-roasted beets, whipped goat cheese, walnut, honey.', note: 'Row 6 · pulled Tuesday' },
          { name: 'Apple & Blackberry Crumble', price: 480, desc: 'Orchard apples, hedgerow blackberries, oat crumble, cream.', note: 'The orchard · last of the crop' },
        ],
      },
      {
        id: 'winter',
        label: 'Winter',
        months: 'Oct – Jan',
        fieldNote: 'Root season. The soil pays back everything we put in.',
        dishes: [
          { name: 'Carrot & Coriander Soup', price: 360, desc: 'The famous carrots, toasted coriander seed, farm cream.', note: 'Row 2 · pulled at dawn' },
          { name: 'Root Vegetable Stew, Barley', price: 610, desc: 'Twelve roots, pearl barley, thyme, a slow afternoon.', note: 'Rows 2–6 · today\u2019s dig' },
          { name: 'Wilted Greens Gratin', price: 590, desc: 'Shade-house greens, garlic cream, sourdough crumb.', note: 'Shade house · cut at dawn' },
          { name: 'Rustic Berry Galette', price: 540, desc: 'Blackberries and raspberries in a rough rye crust, barely sweet.', note: 'Berry beds · winter flush' },
        ],
      },
    ],
  },
  harvest: {
    eyebrow: 'Today\u2019s harvest',
    title: 'On the board today.',
    intro:
      'Written on the barn chalkboard every morning at seven, after the first walk of the fields. When a dish sells out, it is crossed off — the farm only grew so much.',
    plates: [
      {
        key: 'product-0',
        name: 'Heirloom Tomato & Basil Plate',
        price: 520,
        desc: 'Three colours of tomato, torn basil, cold-pressed groundnut oil. The dish that started the restaurant.',
        note: 'Row 7 · picked this morning',
        imgAlt: 'Heirloom tomato salad with basil and burrata on a cream plate',
      },
      {
        key: 'product-1',
        name: 'Farm Roast Chicken',
        price: 880,
        desc: 'Free-range bird roasted over mango wood, with whatever the rows gave up today — carrots, parsnips, charred greens.',
        note: 'Rows 5–8 · serves two, generously',
        imgAlt: 'Whole roast chicken with farm vegetables in a roasting pan',
      },
      {
        key: 'product-2',
        name: 'Rustic Berry Galette',
        price: 540,
        desc: 'Blackberries and raspberries in a rough rye crust. Made at noon, gone by nine most days.',
        note: 'Berry beds · baked today',
        imgAlt: 'Rustic berry galette with blackberries and raspberries',
      },
    ],
    board: [
      { item: 'Carrot & coriander soup', price: 360 },
      { item: 'Greens gratin, sourdough crumb', price: 590 },
      { item: 'Wood-fired flatbread, garlic greens', price: 320 },
      { item: 'Filter coffee, jaggery, farm milk', price: 180 },
    ],
    footnote: 'Everything vegetarian is marked on the board. Everything is honest.',
  },
  club: {
    eyebrow: 'Supper club',
    title: 'One long table, in the barn, every second Friday.',
    body: [
      'Once a fortnight we push the barn doors open, lay one long table down the middle, and cook whatever the farm is most proud of that week. Five courses, no choices, no menu in advance — the growers decide on Thursday.',
      'Forty seats. The farmers eat with you. Seconds are encouraged; silence during the galette is traditional.',
    ],
    price: 1850,
    priceNote: 'per person · five courses · farmers eat free (they grew it)',
    dates: [
      { day: 'Friday', date: '9 October 2026', note: 'Root cellar menu — carrots take the lead' },
      { day: 'Friday', date: '23 October 2026', note: 'Orchard evening — guava, mango pickle, smoke' },
      { day: 'Friday', date: '6 November 2026', note: 'First winter greens — the shade houses show off' },
    ],
    cta: 'Book the next table',
  },
  visit: {
    eyebrow: 'Visit',
    title: 'Come hungry. Leave with soil on your shoes.',
    address: `${kela.name}, Survey No. 41, Kanakapura Road, Bengaluru 560062`,
    phone: '+91 98450 12345',
    email: `hello@${kela.domain}`,
    hours: [
      { days: 'Tue – Sun', time: 'Kitchen 11:00 – 22:30' },
      { days: 'Daily', time: 'Farm shop 8:00 – 18:00' },
      { days: 'Monday', time: 'Kitchen rests · farm walks only' },
    ],
    note: 'Farm walks at 7:00 every morning, free with breakfast. Wear shoes you don\u2019t mind.',
  },
  footer: {
    line: `© 2026 ${kela.name} · Grown & cooked in Bengaluru`,
    credit: 'No air miles were harmed in the making of this menu.',
  },
};
