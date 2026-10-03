/* The ten industries. Kept apart from the design registry so pages that only
   list industries (home) don't download all 90 design records. */
export const CATEGORIES = [
  { slug: 'jewelry',    num: '01', name: 'Jewelry',         tagline: 'High jewelry, bridal and heirloom houses', status: 'live' },
  { slug: 'coffee',     num: '02', name: 'Coffee & Café',   tagline: 'Roasteries, cafés and coffee rituals',    status: 'live' },
  { slug: 'ecommerce',  num: '03', name: 'E-Commerce',      tagline: 'Editorial to experimental storefronts',  status: 'live' },
  { slug: 'fashion',    num: '04', name: 'Saree & Fashion', tagline: 'Editorial fashion and textile stories',   status: 'live' },
  { slug: 'technology', num: '05', name: 'IT & Technology', tagline: 'SaaS, AI and infrastructure, precisely', status: 'live' },
  { slug: 'agency',     num: '06', name: 'Creative Agency',  tagline: 'Studios with kinetic intent',             status: 'live' },
  { slug: 'hotel',      num: '07', name: 'Hotel & Resort',  tagline: 'Stays told cinematically',                status: 'live' },
  { slug: 'restaurant', num: '08', name: 'Restaurant',      tagline: 'Fine dining to street food',              status: 'live' },
  { slug: 'realestate', num: '09', name: 'Real Estate',     tagline: 'Residences with architectural calm',      status: 'live' },
  { slug: 'travel',     num: '10', name: 'Travel & Tourism',tagline: 'Destinations, large-scale',               status: 'live' },
];
