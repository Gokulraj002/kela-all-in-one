/* Kela Jewels — Lookbook · editable content
   Every word of brand copy lives here. The platform customizer / exporter
   replaces this file to re-skin the template — nothing brand-specific is
   hardcoded in index.html. Prices are numbers; currency renders via main.js. */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "N°1 — The Gilded Hour"
  },

  nav: ["Looks", "Pieces", "Maison", "Contact"],

  hero: {
    eyebrow: "N°1 — The Gilded Hour · Autumn 2026",
    title: "Wear the golden hour.",
    subtitle: "Twelve looks in gold, rose and pearl — photographed in a single evening, made to be lived in.",
    ctaPrimary: "View the looks",
    ctaSecondary: "Book a viewing"
  },

  collections: [
    { name: "The Gilded",   image: "assets/images/product-1.webp" },
    { name: "The Sculpted", image: "assets/images/product-2.webp" },
    { name: "The Layered",  image: "assets/images/product-3.webp" }
  ],

  products: [
    {
      name: "Gilded Cuff",
      price: 185000,
      currency: "₹",
      material: "18K Yellow Gold",
      stone: "",
      description: "A sculptural cuff, hammered by hand and polished to a liquid shine. Worn alone, it is the whole outfit.",
      image: "assets/images/product-1.webp"
    },
    {
      name: "Rosé Solitaire",
      price: 240000,
      currency: "₹",
      material: "18K Rose Gold",
      stone: "Morganite",
      description: "A rose-cut morganite held low in warm rose gold — the colour of the hour itself.",
      image: "assets/images/product-2.webp"
    },
    {
      name: "Heure Sautoir",
      price: 98000,
      currency: "₹",
      material: "18K Yellow Gold",
      stone: "Freshwater Pearl",
      description: "Three hairline chains — gold, gold, pearl — worn as one long line down the collarbone.",
      image: "assets/images/product-3.webp"
    }
  ],

  craftsmanship: {
    eyebrow: "The atelier",
    title: "One evening's light, a month of work.",
    body: "Each piece in this issue was hammered, filed and set by hand in our Bengaluru atelier. We photograph at dusk because that is when gold tells the truth.\n\nNothing here is cast in haste. A cuff takes eleven days. A setting takes as long as it takes.",
    image: "assets/images/craft.webp"
  },

  story: {
    eyebrow: "The maison",
    title: "An ode to the hour before dark.",
    body: "Kela Jewels began with a simple observation: jewellery looks its best in the last light of the day. So we design for that light — warm golds, rose stones, pearls that hold a glow.\n\nThis is our first issue. Twelve looks, one evening, no retouching of the metal. What you see is what the bench made.",
    image: "assets/images/hero.webp"
  },

  contact: {
    email: "hello@kelajewels.in",
    phone: "+91 80 4719 2210",
    address: "7 Walton Road, Bengaluru 560001",
    instagram: "https://instagram.com/kelajewels"
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
