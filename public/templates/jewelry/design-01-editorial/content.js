/* Kela Jewels — design-01-editorial · template content
   Every word of UI copy lives here. main.js renders the page from this
   object; nothing brand-specific is hardcoded in index.html. */

window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "Haute Joaillerie · Mumbai · Est. 1987"
  },

  nav: ["Collections", "High Jewelry", "Maison", "Contact"],

  /* Template microcopy (additive to the contract schema, kept namespaced). */
  ui: {
    navCta: "Private Viewing",
    quickViewHint: "Quick view",
    quickViewEnquire: "Enquire About This Piece",
    quickViewClose: "Close",
    menuOpen: "Open menu",
    menuClose: "Close menu"
  },

  sectionTitles: {
    collections: { eyebrow: "The Collections", title: "Three studies in light." },
    products:    { eyebrow: "High Jewelry",    title: "Pieces of the season." },
    contact:     { eyebrow: "Visit",           title: "Begin with a conversation." }
  },

  hero: {
    eyebrow: "Haute Joaillerie — Est. 1987",
    title: "Light, caught in gold.",
    subtitle: "For nearly four decades, our atelier has shaped exceptional diamonds into heirlooms — each piece designed, set and finished by hand in Mumbai.",
    ctaPrimary: "Explore the Collection",
    ctaSecondary: "Book a Private Viewing",
    caption: "N° 01 — The Rivière Cascade · fifty-two brilliant-cut diamonds"
  },

  collections: [
    { name: "The Rivière",  image: "assets/images/hero.webp" },
    { name: "The Solitaire", image: "assets/images/product-2.webp" },
    { name: "The Coupe",    image: "assets/images/product-3.webp" }
  ],

  products: [
    {
      name: "Rivière Cascade",
      price: 486500,
      currency: "₹",
      material: "18K Yellow Gold",
      stone: "52 Brilliant-Cut Diamonds",
      description: "Fifty-two brilliant-cut diamonds flow in a single unbroken line, each stone matched by hand for fire, colour and clarity — and set to move like water against the skin.",
      image: "assets/images/product-1.webp"
    },
    {
      name: "Atelier Solitaire",
      price: 234000,
      currency: "₹",
      material: "Platinum 950",
      stone: "1.02 ct Round Brilliant Diamond",
      description: "A 1.02-carat round brilliant held in a hand-cut platinum seat, raised to gather light from every angle. Cut for brilliance; set for a lifetime.",
      image: "assets/images/product-2.webp"
    },
    {
      name: "Coupe Lumière",
      price: 312750,
      currency: "₹",
      material: "18K Brushed Yellow Gold",
      stone: "Pavé Champagne Diamonds",
      description: "Sculpted from a single band of brushed gold and edged in pavé champagne diamonds — worn like late-afternoon light across the wrist.",
      image: "assets/images/product-3.webp"
    }
  ],

  craftsmanship: {
    eyebrow: "The Atelier",
    title: "Two hundred hours in a single clasp.",
    body: "Every Kela Jewels piece begins as a pencil sketch and ends under the loupe. Between the two lie some two hundred hours of sawing, filing, setting and polishing — work done at one bench, by one goldsmith, from first cut to final polish.\n\nWe cast in small batches, set every stone by hand, and finish each surface until it holds light the way silk holds shadow. Nothing leaves the atelier until it has been worn, weighed and examined as if it were our own.",
    image: "assets/images/craft.webp",
    points: [
      { n: "01", t: "Designed", d: "Each piece is sketched and modelled in our Mumbai studio before a single gram of gold is poured." },
      { n: "02", t: "Set by hand", d: "Diamonds are seated one at a time under magnification — never cast in place, never rushed." },
      { n: "03", t: "Finished", d: "Surfaces are brushed, polished and inspected under daylight before a piece earns its hallmark." }
    ]
  },

  story: {
    eyebrow: "The Maison",
    title: "A house built on light.",
    body: "Kela Jewels was founded in 1987 in a two-room workshop off Kala Ghoda, with a single bench, a secondhand loupe, and a conviction: that fine jewelry should be made slowly, by people whose names you could know.\n\nFour decades on, the workshop has become a maison — but the conviction hasn't changed. Our goldsmiths still sign the inside of every major piece. Our diamonds are still matched by eye, in daylight, the way our founder taught us. And every client is still received the way she was in 1987: with tea, with time, and with the entire atelier at her disposal.",
    image: "assets/images/product-1.webp"
  },

  contact: {
    email: "hello@kelajewels.in",
    phone: "+91 22 4890 1234",
    address: "14 Kala Ghoda, Fort, Mumbai 400001",
    instagram: "https://instagram.com/kelajewels",
    instagramLabel: "Instagram",
    form: {
      title: "Request an appointment",
      name: "Your name",
      email: "Email address",
      message: "How may we help you?",
      submit: "Send Enquiry",
      successTitle: "Thank you.",
      successBody: "Your enquiry has been received. A member of the maison will write to you within one working day."
    }
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
