/* Kela Jewels — design-10-experimental
   Content + image-fallback definitions. Loaded in <head> so the fallback
   exists before any <img> begins loading. All visible copy lives here;
   main.js renders it into the page. */

(function () {
  "use strict";

  /* Elegant placeholder used if any image fails to load. */
  window.__IMG_FALLBACK__ =
    "data:image/svg+xml;utf8," +
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>" +
    "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
    "<stop offset='0' stop-color='%231B2126'/>" +
    "<stop offset='1' stop-color='%230F1214'/>" +
    "</linearGradient></defs>" +
    "<rect width='800' height='1000' fill='url(%23g)'/>" +
    "<text x='400' y='470' font-family='Georgia,serif' font-size='150' text-anchor='middle' fill='%23D9B65E' opacity='0.45'>&#9671;</text>" +
    "<text x='400' y='610' font-family='Georgia,serif' font-size='72' text-anchor='middle' fill='%23D9B65E' opacity='0.6'>K</text>" +
    "</svg>";

  window.TEMPLATE_CONTENT = {
    /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
       Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
       Static files cannot import it, so the values are copied here. */
    brand: {
      name: "Kela Jewels",
      tagline: "Jewelry as light, sculpted."
    },
    nav: ["Prism", "Pieces", "Atelier", "Contact"],
    hero: {
      eyebrow: "High Jewelry · Chapter VII",
      title: "Wear the light you bend.",
      subtitle: "Sculptural pieces in gold, black diamond and emerald — cut to fracture light, cast to hold shadow.",
      ctaPrimary: "Enter the Prism",
      ctaSecondary: "The Atelier"
    },
    collections: [
      { name: "Monolith", image: "assets/images/product-1.webp" },
      { name: "Abyss", image: "assets/images/product-2.webp" },
      { name: "Eclipse", image: "assets/images/product-3.webp" }
    ],
    products: [
      {
        name: "Monolith Ring",
        price: 210000,
        currency: "₹",
        material: "18K Blackened Gold",
        stone: "Black Diamond",
        description: "A single mass of blackened gold, split by a 1.20 ct black diamond. Architecture you can wear.",
        image: "assets/images/product-1.webp"
      },
      {
        name: "Abyss Pendant",
        price: 375000,
        currency: "₹",
        material: "18K Gold",
        stone: "Emerald",
        description: "A Colombian emerald suspended in darkness — the stone appears to float inside its own shadow.",
        image: "assets/images/product-2.webp"
      },
      {
        name: "Eclipse Drops",
        price: 145000,
        currency: "₹",
        material: "18K Gold",
        stone: "Champagne Diamond",
        description: "Two blades of champagne diamond that ignite the moment they catch the light.",
        image: "assets/images/product-3.webp"
      }
    ],
    craftsmanship: {
      eyebrow: "The Atelier",
      title: "Darkness is a material too.",
      body: "We work the way cinematographers light a scene — every Kela Jewels piece is modeled against shadow before it is cast. Blackened gold, smoked settings, stones chosen for how they behave in low light.",
      image: "assets/images/craft.webp"
    },
    story: {
      eyebrow: "The Maison",
      title: "Founded in a darkroom, not a boardroom.",
      body: "Kela Jewels began when a photographer and a goldsmith started arguing about light. Seven years later, the maison still prototypes every piece under a single spotlight in a blacked-out studio in Mumbai — because a jewel is only finished when it survives the dark.",
      image: "assets/images/hero.webp"
    },
    contact: {
      email: "hello@kelajewels.in",
      phone: "+91 22 4890 1177",
      address: "Kala Ghoda, Fort, Mumbai 400001",
      instagram: "https://instagram.com/kelajewels"
    },
    footer: {
      line: "© 2026 Kela Jewels. All rights reserved."
    }
  };
})();
