/* Kela Jewels — design-03-bridal · template content
   All visible copy lives here. main.js renders it into index.html.
   Replace this file to re-skin the template for another brand. */

window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "Maison de Joaillerie — Est. 1998"
  },

  nav: ["Collections", "The Pieces", "Maison", "Contact"],
  navCta: "Book an Appointment",

  hero: {
    eyebrow: "The Bridal Collection — 2026",
    title: "Love, cast in light",
    subtitle: "Heirloom engagement rings and wedding bands, hand-finished in our atelier for the day — and the decades — that follow.",
    ctaPrimary: "Explore the Collection",
    ctaSecondary: "Our Craft",
    featuredLabel: "Featured — Vow Solitaire",
    materialLabel: "Rose Gold",
    materialNote: "Demo treatment — simulated metal finishes."
  },

  materials: ["18K Gold", "White Gold", "Rose Gold", "Platinum"],

  collectionsEyebrow: "The Maison",
  collectionsTitle: "Three ways to say forever",
  collectionsSub: "Begin with the silhouette that feels like yours.",
  collections: [
    { name: "Engagement", tagline: "Solitaires, halos & pavé", image: "assets/images/product-1.webp" },
    { name: "Wedding Bands", tagline: "A promise, encircled", image: "assets/images/product-2.webp" },
    { name: "Heirlooms", tagline: "Earrings for the aisle", image: "assets/images/product-3.webp" }
  ],

  productsEyebrow: "Signature Pieces",
  productsTitle: "Worn once, kept always",
  productsSub: "Select a piece to view it in detail.",
  products: [
    {
      name: "Vow Solitaire",
      price: 264900,
      currency: "₹",
      material: "18K Rose Gold",
      stone: "1.20 ct Solitaire Diamond",
      description: "A single brilliant-cut diamond held aloft on a whisper of pavé. The Vow is cut for morning light — the hour most proposals are made.",
      image: "assets/images/product-1.webp"
    },
    {
      name: "Promise Band",
      price: 112400,
      currency: "₹",
      material: "18K White Gold",
      stone: "Pavé Diamond Band",
      description: "Two bands of white gold lean into one another, set with a river of pavé diamonds. Made to be exchanged, and never taken off.",
      image: "assets/images/product-2.webp"
    },
    {
      name: "Blossom Earrings",
      price: 148600,
      currency: "₹",
      material: "18K Rose Gold",
      stone: "Pear-cut Diamonds",
      description: "Pear-cut diamonds fall like petals from a pavé stem. Blossom catches candlelight the way it catches morning — softly, completely.",
      image: "assets/images/product-3.webp"
    }
  ],

  tryLook: {
    eyebrow: "Interactive Atelier",
    title: "Try the look",
    body: "Place your own photograph in our styling frame and see how a bridal portrait sits beside an Kela Jewels piece.",
    dropLabel: "Drop your image here",
    dropHint: "or browse your files — PNG, JPG, JPEG, WEBP",
    note: "Concept demo — illustrative preview, not AI try-on.",
    sideCopy: "Your photograph never leaves this page. It appears only inside the frame above, so you can imagine the mood of your bridal portrait alongside our pieces."
  },

  craftsmanship: {
    eyebrow: "The Atelier",
    title: "Two hundred and fourteen quiet steps",
    body: "Every Kela Jewels piece passes through two hundred and fourteen quiet steps before it is allowed to leave the bench. No shortcuts, no noise — only hands, loupes, and patience.",
    image: "assets/images/craft.webp",
    steps: [
      { title: "Selection", text: "Each diamond is chosen under north light, matched for fire before it is ever set." },
      { title: "Setting", text: "Stones are seated by a single master setter, never passed between hands." },
      { title: "Polishing", text: "The final polish is done by hand, in silence, until the metal holds the room." }
    ],
    sign: "— The Kela Jewels Atelier"
  },

  story: {
    eyebrow: "Maison Kela",
    title: "Since 1998, one promise",
    body: [
      "Kela Jewels began with a single bench in Bengaluru and a stubborn belief: that a wedding ring should be made slowly, by people who know your name.",
      "Twenty-seven years later the bench has become an atelier, but the belief has not moved. Every piece is still designed, set and polished under one roof — and every bride is still received as the first."
    ],
    image: "assets/images/hero.webp",
    quote: "Jewelry should outlive the occasion — it should outlive us all.",
    quoteBy: "— Founder, Kela Jewels"
  },

  contactEyebrow: "Begin",
  contactTitle: "Your appointment awaits",
  contactSub: "Private viewings at our Bengaluru salon, or a conversation to begin.",
  contact: {
    email: "hello@kelajewels.in",
    phone: "+91 80 4719 2600",
    address: "14, Residency Road, Bengaluru 560025",
    instagram: "@kelajewels",
    instagramLabel: "@kelajewels",
    instagramUrl: "https://instagram.com/kelajewels"
  },
  contactFormTitle: "Request a private viewing",
  formLabels: {
    name: "Full name",
    email: "Email",
    date: "Preferred date",
    message: "A note for our consultant",
    submit: "Request Appointment",
    fine: "A demonstration form — no details are sent anywhere.",
    confirmTitle: "Thank you.",
    confirmBody: "Our bridal consultant will write to you within one business day."
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
