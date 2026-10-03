/* ============================================================
   Kela Jewels — design-07-quiet-luxury · main.js
   Vanilla JS. Motion language: simple fades only (no parallax,
   no magnetic type, no velocity effects — restraint is the point).
   ============================================================ */
(function () {
  'use strict';

  /* scroll handlers run at most once per frame */
  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; fn(); });
    };
  }

  var C = window.TEMPLATE_CONTENT || {};
  var doc = document;
  var root = doc.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- helpers ---------- */

  function get(path) {
    try {
      return path.split('.').reduce(function (o, k) {
        return (o && typeof o === 'object' && k in o) ? o[k] : undefined;
      }, C);
    } catch (e) { return undefined; }
  }

  function text(el, value) {
    if (el && typeof value === 'string') el.textContent = value;
  }

  var currency = '₹';
  var currencyCustomized = false; // once the platform sets a currency, keep it
  function money(n) {
    try { return currency + ' ' + Number(n).toLocaleString('en-IN'); }
    catch (e) { return currency + ' ' + n; }
  }

  /* ---------- 1 · render text content from content.js ---------- */

  function renderContent() {
    // brand slots (nav, footer, signature)
    var brandName = get('brand.name') || 'Kela Jewels';
    doc.querySelectorAll('[data-brand]').forEach(function (el) {
      // signature slot keeps its em-dash prefix in HTML; brand name set via JS-built node
      if (el.tagName === 'SPAN' && el.parentElement && el.parentElement.classList.contains('signature')) {
        el.textContent = 'Maison ' + brandName.charAt(0) + brandName.slice(1).toLowerCase();
      } else {
        el.textContent = brandName;
      }
    });
    try { doc.title = brandName + ' — Quiet Fine Jewellery'; } catch (e) {}

    // dotted-path slots
    doc.querySelectorAll('[data-content]').forEach(function (el) {
      text(el, get(el.getAttribute('data-content')));
    });

    // multi-paragraph slots (body copy with \n\n)
    doc.querySelectorAll('[data-content-paras]').forEach(function (el) {
      var v = get(el.getAttribute('data-content-paras'));
      if (typeof v !== 'string') return;
      el.innerHTML = '';
      v.split(/\n\s*\n/).forEach(function (para) {
        var p = doc.createElement('p');
        p.textContent = para.trim();
        el.appendChild(p);
      });
    });

    // nav (header + mobile + footer) from nav array, mapped to section order
    var sections = ['#collections', '#products', '#story', '#contact'];
    var nav = Array.isArray(C.nav) ? C.nav : [];
    var headerNav = doc.querySelector('.nav-links[data-build="nav"]');
    var mobileNav = doc.getElementById('navMobile');
    var footerNav = doc.querySelector('.footer-nav[data-build="nav"]');
    [headerNav, mobileNav, footerNav].forEach(function (navEl) {
      if (!navEl) return;
      navEl.innerHTML = '';
      nav.forEach(function (label, i) {
        var a = doc.createElement('a');
        a.href = sections[i] || '#';
        a.textContent = label;
        navEl.appendChild(a);
      });
    });

    // section eyebrows derived from nav labels (collections / pieces)
    doc.querySelectorAll('[data-build="secLabel"]').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-sec'), 10);
      if (nav[i]) el.textContent = nav[i];
    });

    // contact details
    var email = get('contact.email'), phone = get('contact.phone'),
        insta = get('contact.instagram');
    doc.querySelectorAll('[data-contact-email]').forEach(function (el) {
      if (!email) return;
      if (el.tagName === 'A') { el.href = 'mailto:' + email; el.textContent = email; }
      else text(el, email);
    });
    doc.querySelectorAll('[data-contact-phone]').forEach(function (el) {
      if (!phone) return;
      if (el.tagName === 'A') {
        el.href = 'tel:' + phone.replace(/[^+\d]/g, '');
        el.textContent = phone;
      } else text(el, phone);
    });
    doc.querySelectorAll('[data-contact-instagram]').forEach(function (el) {
      if (!insta) return;
      el.href = insta;
      var handle = insta.replace(/\/$/, '').split('/').pop();
      // keep the arrow span if present
      var arrow = el.querySelector('.arrow');
      el.textContent = '@' + handle + ' ';
      if (arrow) el.appendChild(arrow); else { var s = doc.createElement('span'); s.className = 'arrow'; s.setAttribute('aria-hidden','true'); s.textContent = '→'; el.appendChild(s); }
    });

    buildCollections();
    buildProducts();
    refreshPrices();
  }

  /* ---------- 2 · build collections + products ---------- */

  function buildCollections() {
    var grid = doc.querySelector('[data-build="collections"]');
    if (!grid || !Array.isArray(C.collections)) return;
    grid.innerHTML = '';
    C.collections.slice(0, 3).forEach(function (col, i) {
      var card = doc.createElement('article');
      card.className = 'collection-card reveal';
      card.style.setProperty('--d', (i * 120) + 'ms');

      var shell = doc.createElement('div');
      shell.className = 'img-shell ratio-4x5';
      var img = doc.createElement('img');
      img.setAttribute('data-img', '');
      img.src = col.image || '';
      img.setAttribute('data-colimg', col.image || '');
      img.alt = (col.name || 'Collection') + ' — signature piece';
      img.loading = 'lazy';
      img.decoding = 'async';
      shell.appendChild(img);

      var h = doc.createElement('h3');
      h.className = 'collection-name';
      h.textContent = col.name || '';

      var link = doc.createElement('a');
      link.className = 'collection-link';
      link.href = '#products';
      link.innerHTML = 'Explore <span class="arrow" aria-hidden="true">→</span>';

      card.appendChild(shell); card.appendChild(h); card.appendChild(link);
      grid.appendChild(card);
      enhanceImg(img);
    });
  }

  function buildProducts() {
    var list = doc.querySelector('[data-build="products"]');
    if (!list || !Array.isArray(C.products)) return;
    list.innerHTML = '';
    C.products.slice(0, 4).forEach(function (p, i) {
      var art = doc.createElement('article');
      art.className = 'piece reveal';
      art.style.setProperty('--d', (i * 100) + 'ms');
      art.setAttribute('data-product', String(i));

      var media = doc.createElement('div');
      media.className = 'piece-media img-shell ratio-4x5';
      var img = doc.createElement('img');
      img.setAttribute('data-img', '');
      img.src = p.image || '';
      img.alt = p.name || 'Jewellery piece';
      img.loading = 'lazy';
      img.decoding = 'async';
      media.appendChild(img);

      var info = doc.createElement('div');
      info.className = 'piece-info';

      var idx = doc.createElement('span');
      idx.className = 'piece-index';
      idx.textContent = 'N° ' + (i + 1);

      var name = doc.createElement('h3');
      name.className = 'piece-name';
      name.setAttribute('data-pname', String(i));
      name.textContent = p.name || '';

      var desc = doc.createElement('p');
      desc.className = 'piece-desc';
      desc.textContent = p.description || '';

      var meta = doc.createElement('dl');
      meta.className = 'piece-meta';
      [['Material', p.material], ['Stone', p.stone]].forEach(function (row) {
        if (!row[1]) return;
        var div = doc.createElement('div');
        var dt = doc.createElement('dt'); dt.textContent = row[0];
        var dd = doc.createElement('dd'); dd.textContent = row[1];
        div.appendChild(dt); div.appendChild(dd); meta.appendChild(div);
      });

      var price = doc.createElement('p');
      price.className = 'piece-price';
      price.setAttribute('data-price', String(i));

      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-text qv-open';
      btn.innerHTML = 'Quick view <span class="arrow" aria-hidden="true">→</span>';

      info.appendChild(idx); info.appendChild(name); info.appendChild(desc);
      info.appendChild(meta); info.appendChild(price); info.appendChild(btn);
      art.appendChild(media); art.appendChild(info);
      list.appendChild(art);
      enhanceImg(img);

      art.addEventListener('click', function () { openQV(i, img); });
    });
  }

  function refreshPrices() {
    if (!Array.isArray(C.products)) return;
    if (!currencyCustomized) {
      C.products.forEach(function (p, i) {
        if (p.currency) currency = p.currency;
      });
    }
    doc.querySelectorAll('[data-price]').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-price'), 10);
      var p = C.products[i];
      if (p) el.textContent = money(p.price);
    });
  }

  /* ---------- 3 · images: skeleton + elegant fallback ---------- */

  function enhanceImg(img) {
    if (!img || img.dataset.enhanced) return;
    img.dataset.enhanced = '1';
    var shell = img.closest('.img-shell');
    var brand = ((get('brand.name') || 'K').trim().charAt(0) || 'K').toUpperCase();

    function loaded() { if (shell) shell.classList.add('is-loaded'); }
    if (img.complete && img.naturalWidth > 0) loaded();
    else img.addEventListener('load', loaded);

    img.addEventListener('error', function () {
      if (img.dataset.fbk) return;
      img.dataset.fbk = '1';
      var ph = doc.createElement('div');
      ph.className = 'img-fallback';
      ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', img.alt || 'Jewellery image');
      var s = doc.createElement('span');
      s.textContent = brand;
      ph.appendChild(s);
      if (shell) shell.classList.add('is-loaded');
      try { img.replaceWith(ph); } catch (e) {}
    });
  }

  function initImages() {
    doc.querySelectorAll('img[data-img]').forEach(enhanceImg);
  }

  /* ---------- 4 · reveals (fade only) ---------- */

  function initReveals() {
    var els = doc.querySelectorAll('.reveal');
    els.forEach(function (el) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.setProperty('--d', d + 'ms');
    });
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 5 · quick view (soft morph, no hard swap) ---------- */

  var qv, qvMedia, qvMediaImg, qvName, qvDesc, qvMeta, qvPrice, qvEyebrow;

  function buildQV() {
    qv = doc.createElement('div');
    qv.className = 'qv';
    qv.setAttribute('aria-hidden', 'true');
    qv.innerHTML =
      '<div class="qv-backdrop" data-qv-close></div>' +
      '<div class="qv-panel" role="dialog" aria-modal="true" aria-label="Product quick view">' +
        '<button class="qv-close" data-qv-close aria-label="Close">✕</button>' +
        '<div class="qv-media"><div class="img-shell"><img data-img alt=""></div></div>' +
        '<div class="qv-info">' +
          '<p class="qv-eyebrow"></p>' +
          '<h3 class="qv-name"></h3>' +
          '<p class="qv-desc"></p>' +
          '<dl class="qv-meta"></dl>' +
          '<p class="qv-price"></p>' +
          '<a class="btn-text qv-cta" href="#contact">Enquire about this piece <span class="arrow" aria-hidden="true">→</span></a>' +
        '</div>' +
      '</div>';
    doc.body.appendChild(qv);
    qvMedia = qv.querySelector('.qv-media .img-shell');
    qvMediaImg = qv.querySelector('.qv-media img');
    qvEyebrow = qv.querySelector('.qv-eyebrow');
    qvName = qv.querySelector('.qv-name');
    qvDesc = qv.querySelector('.qv-desc');
    qvMeta = qv.querySelector('.qv-meta');
    qvPrice = qv.querySelector('.qv-price');
    enhanceImg(qvMediaImg);

    qv.querySelectorAll('[data-qv-close]').forEach(function (el) {
      el.addEventListener('click', closeQV);
    });
    qv.querySelector('.qv-cta').addEventListener('click', closeQV);
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && qv.classList.contains('open')) closeQV();
    });
  }

  function openQV(i, srcImg) {
    var p = (C.products || [])[i];
    if (!p || !qv) return;
    qvEyebrow.textContent = 'N° ' + (i + 1) + ' — Quick view';
    qvName.textContent = p.name || '';
    qvDesc.textContent = p.description || '';
    qvMeta.innerHTML = '';
    [['Material', p.material], ['Stone', p.stone]].forEach(function (row) {
      if (!row[1]) return;
      var div = doc.createElement('div');
      var dt = doc.createElement('dt'); dt.textContent = row[0];
      var dd = doc.createElement('dd'); dd.textContent = row[1];
      div.appendChild(dt); div.appendChild(dd); qvMeta.appendChild(div);
    });
    qvPrice.textContent = money(p.price);
    qvMediaImg.alt = p.name || 'Jewellery piece';
    if (qvMediaImg.dataset.fbk) { /* keep prior fallback state clean */ delete qvMediaImg.dataset.fbk; }
    qvMediaImg.src = p.image || '';

    qv.classList.add('open');
    qv.setAttribute('aria-hidden', 'false');
    doc.body.style.overflow = 'hidden';
    qvMediaImg.style.opacity = '0';

    var reveal = function () { qvMediaImg.style.opacity = '1'; };

    if (reduced || !srcImg) { reveal(); return; }
    try {
      var r = srcImg.getBoundingClientRect();
      var t = qvMedia.getBoundingClientRect();
      if (r.width < 4 || t.width < 4) { reveal(); return; }
      var ghost = srcImg.cloneNode();
      ghost.removeAttribute('data-img');
      var gs = ghost.style;
      /* FLIP on the compositor: the ghost sits at the panel's box and starts
         transformed back onto the card, then glides home (transform only —
         animating left/top/width/height re-laid-out the page every frame). */
      gs.cssText += ';position:fixed;left:' + t.left + 'px;top:' + t.top + 'px;width:' + t.width +
        'px;height:' + t.height + 'px;margin:0;z-index:120;pointer-events:none;object-fit:cover;border-radius:2px;' +
        'transform-origin:0 0;will-change:transform;transform:translate3d(' + (r.left - t.left) + 'px,' + (r.top - t.top) + 'px,0) scale(' +
        (r.width / t.width) + ',' + (r.height / t.height) + ');';
      doc.body.appendChild(ghost);
      var landed = false;
      var land = function () {
        if (landed) return; landed = true;
        if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
        reveal();
      };
      ghost.addEventListener('transitionend', land);
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        gs.transition = 'transform .65s cubic-bezier(0.22,0.61,0.36,1)';
        gs.transform = 'none';
      }); });
      setTimeout(land, 900); // safety
    } catch (e) { reveal(); }
  }

  function closeQV() {
    if (!qv) return;
    qv.classList.remove('open');
    qv.setAttribute('aria-hidden', 'true');
    doc.body.style.overflow = '';
  }

  /* ---------- 6 · nav: scroll state + mobile menu ---------- */

  function initNav() {
    var nav = doc.getElementById('siteNav');
    var toggle = doc.getElementById('navToggle');
    var mobile = doc.getElementById('navMobile');
    if (!nav) return;

    var onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', rafThrottle(onScroll), { passive: true });
    onScroll();

    if (toggle && mobile) {
      toggle.addEventListener('click', function () {
        var open = mobile.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      mobile.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          mobile.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  /* ---------- 6b · in-page links: smooth glide in JS ----------
     (replaces CSS scroll-behavior:smooth, which also slowed every
     programmatic scroll; instant under reduced motion) */

  function initAnchorScroll() {
    doc.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = (a.getAttribute('href') || '').slice(1);
      var target = id ? doc.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      try { target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- 7 · contact form (demo confirmation) ---------- */

  function initForm() {
    var form = doc.getElementById('contact-form');
    var ok = doc.getElementById('form-success');
    if (!form || !ok) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      ok.hidden = false;
      // restart the gentle fade even under reduced motion the class is harmless
      ok.classList.add('show');
    });
  }

  /* ---------- 8 · applyCustomization (platform contract) ---------- */

  function setVar(name, value) {
    try { root.style.setProperty(name, value); } catch (e) {}
  }

  window.applyCustomization = function (custom) {
    custom = (custom && typeof custom === 'object') ? custom : {};
    try {
      if (custom.primaryColor && typeof custom.primaryColor === 'string')
        setVar('--color-primary', custom.primaryColor);
      if (custom.accentColor && typeof custom.accentColor === 'string')
        setVar('--color-accent', custom.accentColor);

      var name = custom.brandName || custom.logoText;
      if (name && typeof name === 'string') {
        doc.querySelectorAll('[data-brand]').forEach(function (el) {
          if (el.tagName === 'SPAN' && el.parentElement && el.parentElement.classList.contains('signature')) {
            el.textContent = 'Maison ' + name;
          } else {
            el.textContent = name;
          }
        });
        try { doc.title = name + ' — Quiet Fine Jewellery'; } catch (e) {}
        // refresh image fallbacks' initial
        var initial = (name.trim().charAt(0) || 'K').toUpperCase();
        doc.querySelectorAll('.img-fallback span').forEach(function (s) { s.textContent = initial; });
      }

      if (custom.fontPair && typeof custom.fontPair === 'string') {
        var parts = custom.fontPair.split('|').map(function (s) { return s.trim(); });
        if (parts[0] && parts[1]) {
          var href = 'https://fonts.googleapis.com/css2?family=' +
            encodeURIComponent(parts[0]).replace(/%20/g, '+') + ':wght@400;500;600&family=' +
            encodeURIComponent(parts[1]).replace(/%20/g, '+') + ':wght@400;500;600&display=swap';
          var link = doc.getElementById('custom-fonts');
          if (!link) {
            link = doc.createElement('link');
            link.id = 'custom-fonts';
            link.rel = 'stylesheet';
            doc.head.appendChild(link);
          }
          link.href = href;
          setVar('--font-display', "'" + parts[0] + "', Georgia, serif");
          setVar('--font-body', "'" + parts[1] + "', -apple-system, 'Segoe UI', sans-serif");
        }
      }

      if (custom.heroImage && typeof custom.heroImage === 'string') {
        var heroImg = doc.querySelector('#hero .hero-media img');
        if (heroImg) { delete heroImg.dataset.fbk; heroImg.src = custom.heroImage; }
      }

      if (custom.currency && typeof custom.currency === 'string') {
        currency = custom.currency;
        currencyCustomized = true;
        refreshPrices();
      }

      if (custom.contactEmail && typeof custom.contactEmail === 'string') {
        doc.querySelectorAll('[data-contact-email]').forEach(function (el) {
          if (el.tagName === 'A') { el.href = 'mailto:' + custom.contactEmail; el.textContent = custom.contactEmail; }
          else el.textContent = custom.contactEmail;
        });
      }

      if (custom.instagramUrl && typeof custom.instagramUrl === 'string') {
        doc.querySelectorAll('[data-contact-instagram]').forEach(function (el) {
          el.href = custom.instagramUrl;
          var handle = custom.instagramUrl.replace(/\/$/, '').split('/').pop();
          var arrow = el.querySelector('.arrow');
          el.textContent = '@' + handle + ' ';
          if (arrow) el.appendChild(arrow);
        });
      }

      if (Array.isArray(custom.productNames)) {
        custom.productNames.forEach(function (n, i) {
          if (typeof n !== 'string' || !n) return;
          var p = (C.products || [])[i];
          if (p) p.name = n;
          doc.querySelectorAll('[data-pname="' + i + '"]').forEach(function (el) { el.textContent = n; });
        });
      }

      if (custom.productImages && typeof custom.productImages === 'object') {
        Object.keys(custom.productImages).forEach(function (k) {
          var i = parseInt(k, 10);
          var src = custom.productImages[k];
          if (isNaN(i) || typeof src !== 'string' || !src) return;
          var p = (C.products || [])[i];
          var oldSrc = p ? p.image : null;
          if (p) p.image = src;
          var card = doc.querySelector('[data-product="' + i + '"] img');
          if (card) { delete card.dataset.fbk; card.src = src; }
          // collection cards reuse product imagery — keep them in sync
          if (oldSrc) {
            doc.querySelectorAll('img[data-colimg]').forEach(function (im) {
              if (im.getAttribute('data-colimg') === oldSrc) { delete im.dataset.fbk; im.src = src; }
            });
          }
        });
      }
    } catch (e) { /* customization must never throw */ }
  };

  function initQueryParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var init = {};
      if (q.get('brand')) init.brandName = q.get('brand');
      if (q.get('primary')) init.primaryColor = q.get('primary');
      if (q.get('accent')) init.accentColor = q.get('accent');
      if (init.brandName || init.primaryColor || init.accentColor)
        window.applyCustomization(init);
    } catch (e) {}
  }

  /* ---------- boot ---------- */

  function boot() {
    renderContent();
    buildQV();
    initImages();
    initReveals();
    initNav();
    initAnchorScroll();
    initForm();
    initQueryParams();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
