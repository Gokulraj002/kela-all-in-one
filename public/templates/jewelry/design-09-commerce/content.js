/* ============================================================
   Kela Jewels — design-09-commerce
   Content layer. Loaded in <head> so main.js can render
   every text slot from window.TEMPLATE_CONTENT.
   Edit this file to change copy, prices, images and links —
   no HTML edits required.
   ============================================================ */
(function () {
  'use strict';

  /* Elegant image fallback: soft pearl/sage gradient with a diamond
     glyph and the brand initial. Used via
     onerror="this.onerror=null;this.src=window.__IMG_FALLBACK__" */
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#F4F5F3"/>' +
    '<stop offset="0.55" stop-color="#DCE8EE"/>' +
    '<stop offset="1" stop-color="#C9D5CE"/>' +
    '</linearGradient></defs>' +
    '<rect width="800" height="1000" fill="url(#g)"/>' +
    '<text x="400" y="468" font-family="Georgia,serif" font-size="110" text-anchor="middle" fill="#7E5E1B" opacity="0.85">\u25C7</text>' +
    '<text x="400" y="580" font-family="Georgia,serif" font-size="76" text-anchor="middle" fill="#1E3A4D" opacity="0.7">K</text>' +
    '</svg>';
  window.__IMG_FALLBACK__ = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

  window.TEMPLATE_CONTENT = {
    /* Kela brand (name, email @kelajewels.in, instagram kelajewels, monogram "K").
       Source of truth: src/templates/_shared/brand.js → KELA.verticals.jewelry.
       Static files cannot import it, so the values are copied here. */
    brand: {
      name: 'Kela Jewels',
      tagline: 'Fine jewelry for every day \u2014 and for forever.'
    },
    nav: ['Collections', 'Shop', 'Atelier', 'Contact'],
    hero: {
      eyebrow: 'The Everyday Fine Jewelry Maison',
      title: 'Made to be worn. Built to be kept.',
      subtitle: 'Solid gold, natural diamonds, honest prices. Designed in our atelier, delivered to your door.',
      ctaPrimary: 'Shop the Collection',
      ctaSecondary: 'Our Craft'
    },
    collections: [
      { name: 'Rings', image: 'assets/images/product-1.webp' },
      { name: 'Necklaces', image: 'assets/images/product-2.webp' },
      { name: 'Earrings', image: 'assets/images/product-3.webp' }
    ],
    products: [
      {
        name: 'Aria Solitaire Ring',
        price: 184500,
        currency: '\u20B9',
        material: '18K Yellow Gold',
        stone: 'Diamond',
        description: 'A brilliant-cut 0.70 ct solitaire on a whisper-thin band \u2014 our signature, cut for maximum fire.',
        image: 'assets/images/product-1.webp',
        category: 'rings',
        badge: 'Signature'
      },
      {
        name: 'Rivi\u00E8re Pendant',
        price: 245000,
        currency: '\u20B9',
        material: '18K Yellow Gold',
        stone: 'Diamond',
        description: 'Fourteen hand-matched brilliant diamonds on a fluid line that rests exactly at the collarbone.',
        image: 'assets/images/product-2.webp',
        category: 'necklaces'
      },
      {
        name: 'Cascade Drops',
        price: 98500,
        currency: '\u20B9',
        material: '18K Yellow Gold',
        stone: 'Diamond',
        description: 'Articulated drops that catch the light with every turn of the head. Featherlight, endlessly wearable.',
        image: 'assets/images/product-3.webp',
        category: 'earrings'
      }
    ],
    craftsmanship: {
      eyebrow: 'The Atelier',
      title: 'One hundred and twelve steps. Zero shortcuts.',
      body: "Every Kela Jewels piece begins as a hand-carved wax, cast in small batches, then finished by a single goldsmith who signs the inside of the band. We don't chase seasons \u2014 we perfect forms.",
      image: 'assets/images/craft.webp'
    },
    story: {
      eyebrow: 'The Maison',
      title: 'Fine jewelry without the theater.',
      body: 'We started Kela Jewels with a simple frustration: fine jewelry that demanded a special occasion. So we made pieces in solid gold and natural diamonds at prices that made sense \u2014 designed for Monday mornings as much as wedding days. A decade on, more than forty thousand clients wear our work every single day.',
      image: 'assets/images/hero.webp'
    },
    contact: {
      email: 'hello@kelajewels.in',
      phone: '+91 80 4719 2200',
      address: '14 Residency Road, Bengaluru 560025',
      instagram: 'https://instagram.com/kelajewels'
    },
    footer: {
      line: '\u00A9 2026 Kela Jewels All rights reserved.'
    }
  };
})();
