/* KELA JEWELS — template content contract (AURUM LAB v1)
   Exported customized versions work by replacing THIS file.
   No brand text may live in index.html — main.js renders everything from here. */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "KELA JEWELS",
    monogram: "K",
    tagline: "Jaipur · Since 1932",
    cta: "Book an Appointment"
  },

  nav: ["Collections", "High Jewelry", "Maison", "Contact"],

  hero: {
    eyebrow: "Est. 1932 — Jaipur, Rajasthan",
    title: "Four generations. One unbroken thread of gold.",
    subtitle: "From the atelier of a Jaipur court jeweler — temple necklaces, jhumkas and heirloom bangles, designed on paper and made entirely by hand, as they have been for ninety-four years.",
    ctaPrimary: "Explore the Collection",
    ctaSecondary: "The House Story",
    image: "assets/images/hero.webp",
    imageAlt: "Antique 22K gold bridal jewelry set arranged on ivory silk with faded archival papers",
    caption: "The Maharani Bridal Set — 22K temple gold, ruby and emerald"
  },

  collections: [
    {
      name: "Bridal",
      note: "Complete sets composed for the wedding day — and for the daughters who will wear them next.",
      image: "assets/images/hero.webp",
      alt: "Antique gold bridal set on ivory silk"
    },
    {
      name: "Temple",
      note: "Nagas-work necklaces and jhumkas in the devotional idiom of the South, made in Jaipur.",
      image: "assets/images/product-1.webp",
      alt: "Vintage 22K gold temple necklace, macro detail"
    },
    {
      name: "Heirloom Revival",
      note: "Lost family pieces rebuilt from memory, from a photograph, or from a single surviving fragment.",
      image: "assets/images/product-3.webp",
      alt: "Stack of hand-engraved antique gold bangles"
    }
  ],

  products: [
    {
      name: "The Maharani Bridal Set",
      price: 485000,
      currency: "₹",
      material: "22K Yellow Gold",
      stone: "Ruby · Emerald · Pearl",
      description: "The house's signature bridal composition — a temple necklace of repoussé gopurams and peacocks, paired with filigree jhumkas and a maang tikka. Made to order over eleven weeks.",
      image: "assets/images/hero.webp",
      alt: "The Maharani Bridal Set — antique gold temple necklace, jhumkas and tikka"
    },
    {
      name: "The Court Temple Necklace",
      price: 240000,
      currency: "₹",
      material: "22K Yellow Gold",
      stone: "Hand-engraved, no stones",
      description: "A revival of a 1948 house sketch: twin yalis flank a temple tower, finished in the deep antique polish the founder reserved for the court. Sits close at the collarbone.",
      image: "assets/images/product-1.webp",
      alt: "The Court Temple Necklace — vintage 22K gold temple necklace"
    },
    {
      name: "Heritage Jhumka Earrings",
      price: 68500,
      currency: "₹",
      material: "22K Yellow Gold",
      stone: "Basra-style Pearls",
      description: "Filigree domes the size of a temple bell, strung with pearl drops that move when you do. The pattern is struck from the founder's original 1936 die.",
      image: "assets/images/product-2.webp",
      alt: "Heritage Jhumka Earrings — antique gold jhumkas with pearl drops"
    },
    {
      name: "The Archive Bangle",
      price: 125000,
      currency: "₹",
      material: "22K Yellow Gold",
      stone: "Hand-engraved paisley",
      description: "Five bangles, five decades of the archive: paisley, temple frieze, lotus, peacock feather and the founder's cable edge. Worn stacked, or one at a time.",
      image: "assets/images/product-3.webp",
      alt: "The Archive Bangle — stack of hand-engraved antique gold bangles"
    }
  ],

  craftsmanship: {
    eyebrow: "Chapter III — The Making",
    title: "Ninety-four years, six disciplines.",
    body: "Nothing in the house is cast from a catalogue. Every piece travels the same bench the founder set up in 1932, through six disciplines that have not changed — only the hands have, four times over.",
    image: "assets/images/craft.webp",
    imageAlt: "Craftsman's hands working molten gold at a vintage jeweler's workbench",
    caption: "The workbench, Johari Bazaar — the same lamp since 1932",
    steps: [
      { era: "1932", title: "Design",   text: "Every commission begins as a conversation over tea — the occasion, the family, the wrist it must fit — before a single line is drawn." },
      { era: "1948", title: "Sketch",   text: "The karigar draws the piece full-scale on handmade paper, in the founder's system of temple proportions. The archive holds over two thousand such sheets." },
      { era: "1955", title: "Cast",     text: "Gold is melted in a clay crucible and cast the old way, in small pours. The metal is worked, never rushed; a necklace takes forty days at the bench." },
      { era: "1963", title: "Set",      text: "Rubies, emeralds and pearls are cut to the drawing and set entirely by hand — no wax, no glue, only the goldsmith's graver and patience." },
      { era: "1984", title: "Polish",   text: "The piece is finished in the house's deep antique polish, built up in layers so the gold glows like candlelight rather than shouting." },
      { era: "Today", title: "Hallmark", text: "BIS-hallmarked, then struck with the house peacock — the same punch the founder cut in 1932, never redrawn, never changed." }
    ]
  },

  story: {
    eyebrow: "Chapter IV — The House",
    title: "A bench, a lamp, and an unbroken line.",
    body: [
      "In 1932, in the jewellers' lane of Jaipur's Pink City, master goldsmith Seth Hukumchand set up a single wooden workbench beneath a brass lamp. He had served the court of Jaipur, and he carried its secrets into a house of his own — the temple necklace's repoussé, the jhumka's filigree dome, the bangle's hand-engraved paisley.",
      "Four generations later, the bench is still there. So is the lamp. Kela Jewels remains a family atelier: every piece is designed on paper, cast, set and polished by hand in Jaipur, finished with the house hallmark — a small peacock, struck in 1932 and never changed. Brides who wore our sets in the sixties now bring their granddaughters to choose theirs."
    ],
    pull: "Gold remembers the hand that shaped it.",
    pullAttr: "Seth Hukumchand · Founder, 1932"
  },

  contact: {
    eyebrow: "Chapter V — The Appointment",
    title: "Visit the atelier.",
    body: "Commissions and private viewings are by appointment, in Jaipur or by video call. Write to the house — a member of the family replies within two working days.",
    email: "hello@kelajewels.in",
    phone: "+91 98290 19320",
    address: "14 Johari Bazaar, Pink City, Jaipur 302003, Rajasthan, India",
    instagram: "https://instagram.com/kelajewels",
    instagramLabel: "@kelajewels"
  },

  form: {
    nameLabel: "Your name",
    contactLabel: "Email or phone",
    occasionLabel: "Occasion",
    messageLabel: "Tell us about the piece",
    messagePlaceholder: "A bridal set for a December wedding…",
    submit: "Request an Appointment",
    successTitle: "Received with thanks.",
    successBody: "Your note is with the house. A member of the family will write to you within two working days."
  },

  footer: {
    line: "© 2026 Kela Jewels · Jaipur · All rights reserved.",
    note: "BIS Hallmarked · Fourth-generation goldsmiths"
  }
};
