/* Kela Jewels — Quiet Luxury · editable content
   Every word of brand copy lives here. The platform customizer / exporter
   replaces this file to re-skin the template — nothing brand-specific is
   hardcoded in index.html. Prices are numbers; currency renders via main.js. */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "Quiet pieces, made to be kept."
  },

  nav: ["Collections", "Pieces", "Maison", "Contact"],

  hero: {
    eyebrow: "Maison de joaillerie · Est. 2016",
    title: "Quiet pieces, made to be kept.",
    subtitle: "Small editions in brushed gold, pearl and stone. Designed slowly in our Bengaluru atelier — made to be worn every day, and kept for decades.",
    ctaPrimary: "Explore the pieces",
    ctaSecondary: "Our craft"
  },

  collections: [
    { name: "Rings",     image: "assets/images/product-1.webp" },
    { name: "Pearls",    image: "assets/images/product-2.webp" },
    { name: "Necklaces", image: "assets/images/product-3.webp" }
  ],

  products: [
    {
      name: "Aurel Band",
      price: 48500,
      currency: "₹",
      material: "18K Brushed Yellow Gold",
      stone: "",
      description: "A slim band in softly brushed gold. No ornament, no noise — the ring you will never take off.",
      image: "assets/images/product-1.webp"
    },
    {
      name: "Perle Drops",
      price: 36000,
      currency: "₹",
      material: "18K Yellow Gold",
      stone: "Freshwater Pearl",
      description: "Two freshwater pearls on fine gold hooks. Weightless, luminous, quietly certain.",
      image: "assets/images/product-2.webp"
    },
    {
      name: "Sage Pendant",
      price: 52500,
      currency: "₹",
      material: "18K Yellow Gold",
      stone: "Green Onyx",
      description: "A single oval stone on a hairline chain. Colour, kept to a whisper.",
      image: "assets/images/product-3.webp"
    }
  ],

  craftsmanship: {
    eyebrow: "Savoir-faire",
    title: "Made slowly, by hand.",
    body: "Every Kela Jewels piece begins as a sketch and a conversation. Gold is alloyed in-house, shaped by hand, and finished to a soft, low lustre — never a mirror shine.\n\nStones are chosen one at a time, set under the loupe, and checked against daylight before a piece is allowed to leave the bench. We make very little. We make it properly.",
    image: "assets/images/craft.webp"
  },

  story: {
    eyebrow: "The maison",
    title: "We make very little, very carefully.",
    body: "Kela Jewels began in 2016 with a single workbench, a refusal to hurry, and a belief that jewellery should whisper.\n\nTen years on, the atelier is still small on purpose. Each edition is numbered. Each piece is made to be worn daily and handed down — quiet luxury, in the truest sense.",
    image: "assets/images/hero.webp"
  },

  contact: {
    email: "hello@kelajewels.in",
    phone: "+91 80 4719 2200",
    address: "14 Residency Road, Bengaluru 560025",
    instagram: "https://instagram.com/kelajewels"
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
