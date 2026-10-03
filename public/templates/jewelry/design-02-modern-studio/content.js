/* ============================================================
   Kela Jewels — design-02-modern-studio
   Template content contract. The platform shell customises the
   template by replacing this file — no brand text lives in HTML.
   ============================================================ */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "Jewellery, reduced to its essentials.",
    cta: "Enquire"
  },

  nav: ["Collections", "High Jewelry", "Maison", "Contact"],

  hero: {
    eyebrow: "N°02 — The Modern Studio",
    title: "Geometry, worn.",
    subtitle: "Platinum, rock crystal and white gold, shaped into precise architectural forms. Kela Jewels designs jewellery stripped of everything but structure.",
    ctaPrimary: "View the collection",
    ctaSecondary: "Our craft",
    image: "assets/images/hero.webp",
    imageAlt: "Geometric white-gold pendant necklace arranged in a precise line on cool white stone",
    caption: "Prism line — rock crystal set in platinum"
  },

  collections: [
    { name: "Prism",    note: "Light, faceted",        image: "assets/images/product-2.webp", alt: "Faceted rock-crystal prism pendant on a fine chain" },
    { name: "Monolith", note: "Weight, brushed",       image: "assets/images/product-1.webp", alt: "Wide geometric white gold band ring with brushed finish" },
    { name: "Axis",     note: "Structure, hexagonal",   image: "assets/images/product-3.webp", alt: "Pair of geometric platinum hexagonal stud earrings" }
  ],
  collectionsHead: { eyebrow: "Collections", title: "Three studies in form." },

  productsHead: { eyebrow: "High jewelry", title: "The current pieces." },

  products: [
    {
      name: "Monolith Band",
      price: 184500,
      currency: "₹",
      material: "18K white gold",
      stone: "Brushed finish, no stone",
      description: "A wide band faceted into eleven planes and finished by hand. Worn as a single statement, it returns light in flat, deliberate sheets.",
      image: "assets/images/product-1.webp",
      alt: "Wide geometric white gold band ring with brushed finish"
    },
    {
      name: "Prism Pendant",
      price: 96800,
      currency: "₹",
      material: "Fine platinum chain",
      stone: "Rock crystal",
      description: "A hand-cut rock-crystal prism suspended from a fine platinum chain. Every facet is cut to throw light, not to hold it.",
      image: "assets/images/product-2.webp",
      alt: "Faceted rock-crystal prism pendant on a fine silver chain"
    },
    {
      name: "Axis Studs",
      price: 128000,
      currency: "₹",
      material: "Platinum",
      stone: "Architectural hexagonal form",
      description: "A pair of hexagonal studs built like small structures — open frames, polished edges, engineered to sit exactly level on the ear.",
      image: "assets/images/product-3.webp",
      alt: "Pair of geometric platinum hexagonal stud earrings"
    }
  ],

  craftsmanship: {
    eyebrow: "Craftsmanship",
    title: "Measured to a tenth of a millimetre.",
    body: "Every Kela Jewels piece begins as a drawing on grid paper and ends on a white bench, measured with calipers before it is ever polished. We cast in small batches, finish entirely by hand, and reject anything that does not sit perfectly true.",
    steps: [
      { n: "01", title: "Drawn",    text: "Each form is drafted to scale before a single gram of metal is poured." },
      { n: "02", title: "Cast",     text: "Small batches in platinum and white gold, cast and annealed in-house." },
      { n: "03", title: "Finished", text: "Brushed or mirror-polished by hand, then measured — twice." }
    ],
    image: "assets/images/craft.webp",
    imageAlt: "Precision calipers measuring a platinum ring blank on a white workbench"
  },

  story: {
    eyebrow: "The maison",
    title: "Kela Jewels began with a ruler and a stone.",
    quote: "Proportion first. Ornament never.",
    body: [
      "The studio was founded on a simple observation: most jewellery decorates, very little of it is designed. Kela Jewels treats each piece as a small piece of architecture — every angle considered, every surface given a reason to exist.",
      "White metals, clear stones, and lines that do not apologise. Nothing is added for effect; nothing essential is ever removed."
    ]
  },

  contact: {
    eyebrow: "Contact",
    title: "Begin with a conversation.",
    labels: { email: "Email", phone: "Telephone", address: "Atelier" },
    email: "hello@kelajewels.in",
    phone: "+91 80 4172 8800",
    address: "14 Lavelle Road, Bengaluru 560001",
    instagram: "https://instagram.com/kelajewels",
    instagramLabel: "@kelajewels",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Send enquiry",
    confirmTitle: "Thank you.",
    confirmBody: "Your enquiry has been received. The studio responds within two working days."
  },

  footer: {
    line: "© 2026 Kela Jewels — All rights reserved."
  },

  ui: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    quickViewCta: "Enquire about this piece",
    quickViewClose: "Close",
    viewPiece: "View",
    priceFrom: "Price on request"
  }
};
