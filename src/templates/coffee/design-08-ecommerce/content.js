import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('coffee');

/* Kela Cafe (shop) — content. Prices are ₹ numbers. JSON-compatible (no functions). */
export const content = {
  brand: { name: kela.name, tagline: 'Beans, gear, and gifts — everything coffee' },
  nav: {
    categories: [
      { id: 'beans', label: 'Beans' },
      { id: 'equipment', label: 'Equipment' },
      { id: 'gifts', label: 'Gifts' },
      { id: 'subscriptions', label: 'Subscriptions' },
    ],
  },
  hero: {
    eyebrow: 'The Festival Roast Edit',
    title: 'Single origins, up to 20% off.',
    sub: 'Six estate lots, roasted this week. When the shelf empties, it empties.',
    cta: 'Shop bestsellers',
    ctaSecondary: 'Browse the full shelf',
    note: 'Free shipping over ₹499 · Roasted-to-order',
  },
  categories: {
    eyebrow: 'Departments',
    title: 'Shop by category',
    tiles: [
      { id: 'beans', title: 'Beans', desc: 'Single origins and blends', img: 'product-1', alt: 'A premium coffee bag on a white studio background' },
      { id: 'equipment', title: 'Equipment', desc: 'Grinders, drippers, kits', img: 'product-2', alt: 'A stainless steel home coffee grinder on white' },
      { id: 'gifts', title: 'Gifts', desc: 'Boxed sets and flights', img: 'hero', alt: 'A styled shelf of coffee products' },
      { id: 'subscriptions', title: 'Subscriptions', desc: 'Never run dry', img: null, alt: '' },
    ],
  },
  filters: {
    title: 'The shelf',
    roast: ['Light', 'Medium', 'Dark'],
    tastes: ['Chocolate', 'Citrus', 'Berry', 'Floral', 'Nutty', 'Bold'],
    origins: ['Chikmagalur', 'Coorg', 'Araku', 'Malabar Coast', 'Multi-origin'],
    prices: [
      { id: 'under600', label: 'Under ₹600', test: 'lt600' },
      { id: '600to1500', label: '₹600 – ₹1,500', test: 'mid' },
      { id: 'over1500', label: 'Over ₹1,500', test: 'gt1500' },
    ],
    sorts: [
      { id: 'featured', label: 'Featured' },
      { id: 'low', label: 'Price: low to high' },
      { id: 'high', label: 'Price: high to low' },
      { id: 'rating', label: 'Top rated' },
    ],
    clear: 'Clear all',
    results: 'products',
  },
  products: [
    { id: 'p01', name: 'Chikmagalur Washed', price: 540, category: 'beans', roast: 'Light', origin: 'Chikmagalur', process: 'Washed', tastes: ['Citrus', 'Floral'], rating: 4.8, badge: 'Bestseller', img: 'product-1', pos: 'center 40%' },
    { id: 'p02', name: 'Coorg Peaberry Reserve', price: 680, category: 'beans', roast: 'Dark', origin: 'Coorg', process: 'Natural', tastes: ['Chocolate', 'Bold'], rating: 4.9, badge: 'Limited', img: 'product-1', pos: 'center 60%' },
    { id: 'p03', name: 'Araku Valley Natural', price: 620, category: 'beans', roast: 'Medium', origin: 'Araku', process: 'Natural', tastes: ['Berry', 'Chocolate'], rating: 4.7, badge: '', img: 'product-1', pos: 'center 30%' },
    { id: 'p04', name: 'Baba Budangiri Estate', price: 590, category: 'beans', roast: 'Medium', origin: 'Chikmagalur', process: 'Washed', tastes: ['Nutty', 'Citrus'], rating: 4.6, badge: '', img: 'product-1', pos: 'center 50%' },
    { id: 'p05', name: 'Monsooned Malabar AA', price: 720, category: 'beans', roast: 'Dark', origin: 'Malabar Coast', process: 'Monsooned', tastes: ['Bold', 'Nutty'], rating: 4.8, badge: 'Roaster pick', img: 'product-1', pos: 'center 70%' },
    { id: 'p06', name: 'Morning Chorus Blend', price: 480, category: 'beans', roast: 'Medium', origin: 'Multi-origin', process: 'Washed', tastes: ['Chocolate', 'Nutty'], rating: 4.9, badge: 'Bestseller', img: 'product-1', pos: 'center 45%' },
    { id: 'p07', name: 'Burr Grinder Pro', price: 8900, category: 'equipment', roast: '', origin: '', process: '', tastes: [], rating: 4.7, badge: 'New', img: 'product-2', pos: 'center 40%' },
    { id: 'p08', name: 'Pour-Over Starter Kit', price: 2400, category: 'equipment', roast: '', origin: '', process: '', tastes: [], rating: 4.8, badge: '', img: 'product-2', pos: 'center 55%' },
    { id: 'p09', name: 'Ceramic Dripper Set', price: 1150, category: 'equipment', roast: '', origin: '', process: '', tastes: [], rating: 4.6, badge: '', img: 'product-2', pos: 'center 65%' },
    { id: 'p10', name: "Roaster's Gift Box", price: 1499, category: 'gifts', roast: '', origin: 'Multi-origin', process: '', tastes: ['Chocolate'], rating: 4.9, badge: 'Gifted most', img: 'hero', pos: 'center 35%' },
    { id: 'p11', name: 'Taster Flight Trio', price: 999, category: 'gifts', roast: 'Medium', origin: 'Multi-origin', process: 'Mixed', tastes: ['Berry', 'Floral', 'Citrus'], rating: 4.8, badge: '', img: 'hero', pos: 'center 55%' },
    { id: 'p12', name: `${kela.name} Monthly`, price: 1260, category: 'subscriptions', roast: 'Medium', origin: 'Rotating', process: '', tastes: ['Chocolate', 'Nutty'], rating: 5.0, badge: 'Save 10%', img: 'hero', pos: 'center 45%' },
  ],
  reviews: {
    eyebrow: 'Reviews',
    title: 'Loved by home brewers',
    items: [
      { quote: 'Ordered Tuesday morning, roasted Tuesday, brewing Friday. The freshness date on the bag says it all.', name: 'Rohan M.', product: 'Chikmagalur Washed' },
      { quote: 'The grinder dialled in in two shots. My pour-overs finally taste like the café down the road.', name: 'Sana F.', product: 'Burr Grinder Pro' },
      { quote: 'Sent the gift box to my father. He called before I had even hung up — the tasting card was a lovely touch.', name: 'Vikram T.', product: "Roaster's Gift Box" },
    ],
  },
  guides: {
    eyebrow: 'Brew guides',
    title: 'Buy once, brew right',
    items: [
      { title: 'The grinder picker', body: 'Blade vs burr, and which grind setting your brewer actually wants. Two minutes, no jargon.' },
      { title: 'Brew method matcher', body: 'Answer three questions and we will pair your taste with a method — and the exact recipe.' },
      { title: 'Freshness, decoded', body: 'Roast dates, degassing, and why the bag matters more than the brand on it.' },
    ],
  },
  assurances: [
    { title: 'Roasted this week', body: 'Every bag ships with its roast date printed.' },
    { title: 'Free shipping over ₹499', body: 'Flat ₹49 below that, anywhere in India.' },
    { title: '30-day returns', body: 'Unopened bags, no questions asked.' },
  ],
  contact: { email: `shelf@${kela.domain}`, phone: '+91 80471 22334', address: '14 Roastery Lane, Indiranagar, Bengaluru' },
  footer: {
    line: `© 2026 ${kela.name} Co. All rights reserved.`,
    shipping: 'Ships in 24–48 hours · Free shipping over ₹499 · 30-day returns on unopened bags',
  },
};
