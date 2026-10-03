/* Kela Jewels — design-06-future · content contract
   All visible text renders from this file. The platform exporter replaces
   this file to produce customized versions — keep the schema intact. */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "Jewellery from the near future."
  },

  nav: ["Collections", "Pieces", "Atelier", "Story", "Contact"],
  navCta: "Book an appointment",

  hero: {
    eyebrow: "N°06 — The future, cast in platinum",
    title: "Shadow, engineered into light.",
    subtitle: "Kela Jewels is a maison of the near future — platinum, titanium and lab-grown diamonds, cut by algorithm and finished by hand. Pieces built for the decades ahead.",
    ctaPrimary: "Explore the pieces",
    ctaSecondary: "Visit the atelier",
    meta: "Platinum 950 · Lab-grown diamonds · Made in Mumbai"
  },

  collectionsHeading: {
    eyebrow: "The Collections",
    title: "Three studies in darkness"
  },

  collections: [
    { name: "Monolith",    note: "Single-stone statements", image: "assets/images/hero.webp" },
    { name: "Vector",      note: "Sculpted in motion",      image: "assets/images/product-1.webp" },
    { name: "Singularity", note: "Points of pure light",    image: "assets/images/product-2.webp" }
  ],

  productsHeading: {
    eyebrow: "High Jewellery",
    title: "The pieces"
  },

  products: [
    {
      name: "Monolith Ring",
        price: 284500,
        currency: "₹",
        material: "Platinum 950",
        stone: "1.2 ct lab-grown diamond",
        description: "A single uninterrupted band of platinum rises to hold one flawless stone — architecture you can wear.",
        image: "assets/images/hero.webp"
      },
      {
        name: "Vector Cuff",
        price: 196000,
        currency: "₹",
        material: "Sterling silver",
        stone: "Brushed & mirror finish",
        description: "Sculpted silver in one gesture of motion. Brushed by hand, polished to a liquid edge.",
        image: "assets/images/product-1.webp"
      },
      {
        name: "Singularity Stud",
        price: 68500,
        currency: "₹",
        material: "Platinum 950",
        stone: "0.5 ct lab-grown diamond",
        description: "One point of light, engineered to outshine everything around it.",
        image: "assets/images/product-2.webp"
      },
      {
        name: "Event Horizon Chain",
        price: 142000,
        currency: "₹",
        material: "Sterling silver",
        stone: "Hand-finished links",
        description: "A chain drawn to the finest possible gauge — it disappears against the skin, then catches the light.",
        image: "assets/images/product-3.webp"
      }
  ],

  craftsmanship: {
    eyebrow: "The Atelier",
    title: "Computed. Cast. Finished by hand.",
    body: "Every Kela Jewels piece begins as mathematics — parametric models resolved to a tenth of a millimetre. It is cast in platinum or silver, then handed to master finishers who spend up to forty hours bringing each surface from raw to mirror. The future, made slowly.",
    image: "assets/images/craft.webp",
    steps: [
      "Parametric CAD — resolved to 0.1 mm",
      "Precision casting in platinum & silver",
      "Up to 40 hours of hand-finishing"
    ]
  },

  story: {
    eyebrow: "The Maison",
    title: "We did not inherit tradition. We engineered it.",
    body: "Kela Jewels was founded on a single conviction — that fine jewellery had stopped looking forward. While the old houses mined the past, we built a laboratory: optical scanners, parametric design, and a bench of finishers who treat every micron as a moral question.\n\nThe result is jewellery with no nostalgia in it. Dark where others are bright. Precise where others are decorative. Made for the people who will own the next fifty years.",
    image: "assets/images/product-2.webp",
    caption: "The Singularity Stud — 0.5 ct, platinum 950"
  },

  contact: {
    eyebrow: "Private Viewings",
    title: "The atelier",
    email: "hello@kelajewels.in",
    phone: "+91 98200 12345",
    address: "14 Kala Ghoda, Fort, Mumbai 400001",
    instagram: "https://instagram.com/kelajewels",
    instagramLabel: "@kelajewels"
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
