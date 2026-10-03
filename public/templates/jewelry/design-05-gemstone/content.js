/* Kela Jewels — design-05-gemstone · content contract.
 * Exported/customized builds replace this file; keep ALL brand text here. */
window.TEMPLATE_CONTENT = {
  /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
     Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
     Static files cannot import it, so the values are copied here. */
  brand: {
    name: "Kela Jewels",
    tagline: "The Gemstone Maison — colour, cut for a lifetime of light."
  },

  nav: ["Collections", "High Jewelry", "Maison", "Contact"],
  navCta: "Book an Appointment",

  hero: {
    eyebrow: "The Gemstone Maison — Est. 2011",
    title: "Light, Kept in Colour",
    subtitle: "Kela Jewels is a contemporary maison devoted to coloured gemstones — emeralds from Zambia, rubies from Mozambique, sapphires from Ceylon — cut and set by hand in our Mumbai atelier.",
    ctaPrimary: "Explore High Jewelry",
    ctaSecondary: "Book a Viewing"
  },

  /* Hero gemstone switcher — order defines the DIAMOND / EMERALD / RUBY / SAPPHIRE tabs. */
  heroStones: [
    {
      key: "diamond",
      label: "DIAMOND",
      name: "The Origin",
      tint: "#dfe9ec",
      tintOpacity: 0.10,
      glow: "rgba(230,238,242,0.55)",
      filter: "saturate(1) brightness(1.02) hue-rotate(0deg)",
      description: "A 1.5-carat colourless solitaire, cut for maximum fire. The stone every Kela Jewels journey begins with — pure light, nothing added."
    },
    {
      key: "emerald",
      label: "EMERALD",
      name: "The Signature",
      tint: "#1d7a5f",
      tintOpacity: 0.52,
      glow: "rgba(46,180,130,0.60)",
      filter: "saturate(1.12) brightness(0.99) hue-rotate(-14deg)",
      description: "Zambian emerald, 3.2 carats, minor oil only. Our signature stone — deep forest green with the soft glow collectors call jardin light."
    },
    {
      key: "ruby",
      label: "RUBY",
      name: "The Flame",
      tint: "#b02434",
      tintOpacity: 0.52,
      glow: "rgba(226,74,84,0.60)",
      filter: "saturate(1.14) brightness(0.99) hue-rotate(148deg)",
      description: "Mozambican ruby, 2.8 carats, pigeon-blood saturation. A stone with a pulse — cut to hold its fire under any light."
    },
    {
      key: "sapphire",
      label: "SAPPHIRE",
      name: "The Depth",
      tint: "#2b5fa8",
      tintOpacity: 0.52,
      glow: "rgba(88,140,220,0.60)",
      filter: "saturate(1.12) brightness(1.0) hue-rotate(196deg)",
      description: "Ceylon sapphire, 4.1 carats, cornflower blue. Cool, precise, endlessly deep — the quietest statement in the maison."
    }
  ],

  sections: {
    collections: {
      eyebrow: "The Collections",
      title: "Three stones, one obsession",
      sub: "Each Kela Jewels collection begins at the source — and ends on the hand."
    },
    products: {
      eyebrow: "High Jewelry",
      title: "Pieces of the season",
      sub: "One-of-one stones, set once, never repeated."
    },
    contact: {
      eyebrow: "Private Viewings",
      title: "Begin with a conversation",
      sub: "Our concierge arranges private viewings at the Mumbai maison, and virtual appointments worldwide."
    }
  },

  collections: [
    { name: "Emeralds", image: "assets/images/product-1.webp",
      line: "Zambian rough, cut in-house" },
    { name: "Rubies", image: "assets/images/product-2.webp",
      line: "Mozambican fire, halo-set" },
    { name: "Sapphires", image: "assets/images/product-3.webp",
      line: "Ceylon blue, cool and deep" }
  ],

  products: [
    {
      name: "The Verdant Pendant",
      price: 620000, currency: "₹",
      material: "18K White Gold",
      stone: "Zambian Emerald · 3.2 ct",
      description: "A pear-cut Zambian emerald ringed by brilliant diamonds, suspended from a fine white-gold chain. Minor oil only; cut in our Mumbai atelier for depth rather than flash.",
      image: "assets/images/product-1.webp"
    },
    {
      name: "Sangria Ring",
      price: 485000, currency: "₹",
      material: "18K White Gold",
      stone: "Mozambican Ruby · 2.8 ct",
      description: "An oval pigeon-blood ruby held in a pavé diamond halo. The stone is cut shallow and wide so its fire reaches the edge of the finger.",
      image: "assets/images/product-2.webp"
    },
    {
      name: "Ceylon Drop Earrings",
      price: 340000, currency: "₹",
      material: "18K White Gold",
      stone: "Ceylon Sapphire · 4.1 ct pair",
      description: "Matched pear-cut Ceylon sapphires in cornflower blue, each framed by diamond halos and finished with a diamond cluster stud. Cool light, endlessly deep.",
      image: "assets/images/product-3.webp"
    },
    {
      name: "Lumière Solitaire",
      price: 550000, currency: "₹",
      material: "Platinum 950",
      stone: "Colourless Diamond · 1.5 ct",
      description: "The house solitaire: a 1.5-carat brilliant in a knife-edge platinum setting, engineered so nothing stands between the eye and the stone.",
      image: "assets/images/hero.webp"
    }
  ],

  craftsmanship: {
    eyebrow: "The Atelier",
    title: "From rough to radiance",
    body: "Every Kela Jewels stone travels the same road: chosen at the source, cut under one roof, and set by a single goldsmith from first sketch to final polish. Fourteen pairs of hands, one standard — if a stone does not move us, it does not leave the atelier.",
    image: "assets/images/craft.webp",
    steps: [
      { title: "Sourcing", text: "Bought direct at mine and cutting-house level in Zambia, Mozambique and Sri Lanka. Every stone over one carat arrives with independent certification." },
      { title: "Cutting", text: "Precision faceting in our Mumbai atelier. Coloured stones are cut for colour depth first, brilliance second — the opposite of commercial cutting." },
      { title: "Setting", text: "Hand-set by master goldsmiths, one piece per bench. Pavé is laid under magnification; solitaires are seated to the tenth of a millimetre." },
      { title: "Polishing", text: "A final forty-eight hours: polish, inspection under north light, certification, and a last look by the founder before the piece is named." }
    ]
  },

  story: {
    eyebrow: "The Maison",
    title: "Born of a single emerald",
    body: "Kela Jewels began in 2011 when our founder, gemologist Meera Kothari, refused to sell a Zambian emerald she had bought for a client — and built a maison around it instead. Fifteen years on, we remain deliberately small: three stones, one atelier, and a waiting list for pieces that take months to make. We do not chase trends. We chase the moment a rough stone first catches the light.",
    quote: "A diamond is admired. A coloured stone is remembered.",
    quoteBy: "— Meera Kothari, Founder",
    image: "assets/images/hero.webp",
    stats: [
      { value: "2011", label: "Maison founded" },
      { value: "38", label: "Mine partnerships" },
      { value: "12", label: "Master cutters" },
      { value: "1", label: "Atelier, Mumbai" }
    ]
  },

  contact: {
    email: "hello@kelajewels.in",
    emailHref: "mailto:hello@kelajewels.in",
    phone: "+91 22 4890 2200",
    phoneHref: "tel:+912248902200",
    address: "Kela Jewels, 3rd Floor, Zaveri House, Kala Ghoda, Fort, Mumbai 400001",
    instagram: "https://instagram.com/kelajewels",
    instagramLabel: "@kelajewels"
  },

  footer: {
    line: "© 2026 Kela Jewels. All rights reserved."
  }
};
