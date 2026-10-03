/* ============================================================
   Kela Jewels — design-09-commerce
   Vanilla JS. Renders every text slot from window.TEMPLATE_CONTENT
   (content.js), builds nav / collections / products / filters in JS,
   and wires motion: reveals, cursor depth, magnetic headline,
   material switcher, filter morph, FLIP quick view.
   Works from file:// with zero build step.
   ============================================================ */
(function () {
  'use strict';

  var C = window.TEMPLATE_CONTENT || {};
  var root = document.documentElement;

  /* content.js defines the elegant image fallback; keep a plain one in case a
     re-serialized content.js (e.g. a customized export) dropped it, so an
     onerror never points an <img> at "undefined" */
  if (!window.__IMG_FALLBACK__) {
    window.__IMG_FALLBACK__ = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">' +
      '<rect width="800" height="1000" fill="#E6EDF0"/></svg>');
  }

  /* ---------- environment gates ---------- */
  var reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var finePointer = !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);

  /* ---------- helpers ---------- */
  function $(sel, ctx) {
    try { return (ctx || document).querySelector(sel); } catch (e) { return null; }
  }
  function $$(sel, ctx) {
    try { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  /* Structural UI labels only — never brand or product copy.
     data-content keys resolve from TEMPLATE_CONTENT first, then here. */
  var UI = {
    'nav.cta': 'Book a Viewing',
    'collections.eyebrow': 'Shop by Collection',
    'collections.title': 'Three forms, endlessly wearable',
    'featured.eyebrow': 'The Signature Piece',
    'featured.enquire': 'Enquire',
    'featured.visitAtelier': 'Visit the atelier',
    'contact.eyebrow': 'Enquiries',
    'contact.title': 'Begin the conversation',
    'filters.all': 'All',
    'form.name': 'Your name',
    'form.email': 'Email',
    'form.message': 'Message',
    'form.submit': 'Send Enquiry',
    'form.sent': 'Thank you \u2014 your enquiry has been received. We will reply within one business day.',
    'qv.material': 'Material',
    'qv.stone': 'Stone',
    'qv.enquire': 'Enquire'
  };

  function getContent(path) {
    var cur = C, i;
    var parts = String(path).split('.');
    for (i = 0; i < parts.length; i++) {
      if (cur === null || cur === undefined) { cur = undefined; break; }
      cur = cur[parts[i]];
    }
    if (cur === undefined || cur === null) cur = UI[path];
    return cur;
  }

  /* ---------- mutable state (customization writes here, never to HTML) ---------- */
  var state = {
    brand: Object.assign({}, C.brand),
    nav: Array.isArray(C.nav) ? C.nav.slice() : [],
    hero: Object.assign({}, C.hero),
    collections: Array.isArray(C.collections) ? C.collections.map(function (c) { return Object.assign({}, c); }) : [],
    products: Array.isArray(C.products) ? C.products.map(function (p) { return Object.assign({}, p); }) : [],
    contact: Object.assign({}, C.contact),
    currencyOverride: ''
  };

  function currencyOf(p) { return state.currencyOverride || p.currency || ''; }
  function formatPrice(p) {
    var n = Number(p.price) || 0;
    var grouped = n.toLocaleString ? n.toLocaleString('en-IN') : String(n);
    return currencyOf(p) + grouped;
  }

  function imgTag(src, alt, eager) {
    var attrs = 'src="' + src + '" alt="' + alt.replace(/"/g, '&quot;') + '" decoding="async" ' +
      'onerror="this.onerror=null;this.src=window.__IMG_FALLBACK__"';
    attrs += eager ? ' fetchpriority="high"' : ' loading="lazy"';
    return '<img ' + attrs + '>';
  }

  /* ============================================================
     RENDER
     ============================================================ */

  function renderStaticSlots() {
    $$('[data-brand]').forEach(function (el) {
      el.textContent = state.brand.name || '';
    });
    $$('[data-content]').forEach(function (el) {
      var v = getContent(el.getAttribute('data-content'));
      if (v !== undefined && v !== null) el.textContent = v;
    });
    // Contact link targets
    var emailEl = $('[data-href="contact.email"]');
    if (emailEl && state.contact.email) emailEl.setAttribute('href', 'mailto:' + state.contact.email);
    var phoneEl = $('[data-href="contact.phone"]');
    if (phoneEl && state.contact.phone) {
      phoneEl.setAttribute('href', 'tel:' + String(state.contact.phone).replace(/[^+\d]/g, ''));
    }
    var igEl = $('[data-href="contact.instagram"]');
    if (igEl && state.contact.instagram) igEl.setAttribute('href', state.contact.instagram);
    if (state.brand.name) document.title = state.brand.name;
  }

  var NAV_TARGETS = { Collections: '#collections', Shop: '#products', Atelier: '#craftsmanship', Contact: '#contact' };

  function renderNav() {
    [['#navLinks', false], ['#miniLinks', true], ['#footerNav', false]].forEach(function (pair) {
      var host = $(pair[0]);
      if (!host) return;
      host.innerHTML = '';
      state.nav.forEach(function (label) {
        var a = document.createElement('a');
        a.textContent = label;
        a.setAttribute('href', NAV_TARGETS[label] || ('#' + String(label).toLowerCase()));
        host.appendChild(a);
      });
    });
  }

  function renderCollections() {
    var grid = $('#collectionGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.collections.forEach(function (col, i) {
      var a = document.createElement('a');
      a.className = 'collection-card';
      a.setAttribute('href', '#products');
      a.setAttribute('aria-label', col.name + ' collection');
      a.innerHTML =
        '<div class="imgwrap">' + imgTag(col.image, col.name + ' collection') + '</div>' +
        '<div class="collection-meta">' +
        '<span class="index">0' + (i + 1) + '</span>' +
        '<span class="name"></span>' +
        '<span class="arrow" aria-hidden="true">&rarr;</span>' +
        '</div>';
      var nameEl = $('.name', a);
      if (nameEl) nameEl.textContent = col.name;
      grid.appendChild(a);
      wireImgLoad(a);
    });
  }

  /* --- demo metal data for the signature piece ---
     DEMO TREATMENT: switching metals crossfades a low-opacity grade
     overlay tinted per metal (see .metal-grade classes in styles.css).
     A production build would swap in per-metal photography here. */
  var METALS = [
    { id: 'yellow', label: '18K Gold', gradeClass: 'grade-yellow', note: 'Shown in 18K Yellow Gold', delta: 0 },
    { id: 'white', label: 'White Gold', gradeClass: 'grade-white', note: 'Shown in 18K White Gold', delta: 12000 },
    { id: 'rose', label: 'Rose Gold', gradeClass: 'grade-rose', note: 'Shown in 18K Rose Gold', delta: 6000 },
    { id: 'platinum', label: 'Platinum', gradeClass: 'grade-platinum', note: 'Shown in Platinum', delta: 45000 }
  ];
  var activeMetal = METALS[0];

  function renderFeatured() {
    var p = state.products[0];
    if (!p) return;
    var nameEl = $('[data-featured="name"]');
    if (nameEl) nameEl.textContent = p.name;
    var descEl = $('[data-featured="description"]');
    if (descEl) descEl.textContent = p.description;
    var priceEl = $('[data-featured="price"]');
    if (priceEl) priceEl.textContent = formatPrice({ price: (Number(p.price) || 0) + activeMetal.delta, currency: currencyOf(p) });
    var img = $('#featuredImg');
    if (img && img.getAttribute('src') !== p.image) {
      img.setAttribute('src', p.image);
      img.classList.remove('is-loaded');
    }
    if (img) img.setAttribute('alt', p.name + ' in ' + activeMetal.label);
    var note = $('#metalNote');
    if (note) note.textContent = activeMetal.note;
    renderMetalTabs();
  }

  function renderMetalTabs() {
    var host = $('#metalTabs');
    if (!host) return;
    host.innerHTML = '';
    METALS.forEach(function (m) {
      var b = document.createElement('button');
      b.className = 'metal-tab';
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('data-metal', m.id);
      b.setAttribute('aria-selected', m.id === activeMetal.id ? 'true' : 'false');
      b.textContent = m.label;
      b.addEventListener('click', function () { switchMetal(m.id); });
      host.appendChild(b);
    });
  }

  function switchMetal(id) {
    var next = null;
    METALS.forEach(function (m) { if (m.id === id) next = m; });
    if (!next || next.id === activeMetal.id) return;
    activeMetal = next;
    var img = $('#featuredImg'), grade = $('#metalGrade');
    var apply = function () {
      if (grade) {
        grade.className = 'metal-grade ' + next.gradeClass + ' is-active';
      }
      var tabs = $$('#metalTabs .metal-tab');
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', t.getAttribute('data-metal') === next.id ? 'true' : 'false');
      });
      renderFeatured();
      if (img) {
        img.classList.remove('is-loaded');
        // re-add after a tick so the crossfade (~600ms) reads cleanly
        setTimeout(function () { img.classList.add('is-loaded'); }, 60);
      }
    };
    if (img && !reducedMotion) {
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '0';
      setTimeout(function () { apply(); img.style.opacity = '1'; }, 300);
      setTimeout(function () { img.style.transition = ''; img.style.opacity = ''; }, 950);
    } else {
      apply();
    }
  }

  /* --- filter pills + product grid --- */

  function categories() {
    var seen = {}, out = [];
    state.products.forEach(function (p) {
      var c = p.category || 'all';
      if (!seen[c]) { seen[c] = true; out.push(c); }
    });
    return out;
  }
  function cap(s) { return String(s).charAt(0).toUpperCase() + String(s).slice(1); }

  function renderFilters() {
    var host = $('#filterPills');
    if (!host) return;
    host.innerHTML = '';
    var all = ['all'].concat(categories());
    all.forEach(function (cat, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filter-pill';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.setAttribute('data-filter', cat);
      b.textContent = cat === 'all' ? (UI['filters.all'] || 'All') : cap(cat);
      b.addEventListener('click', function () { setFilter(cat); });
      host.appendChild(b);
    });
  }

  function renderProductGrid() {
    var grid = $('#productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    state.products.forEach(function (p, i) {
      var card = document.createElement('article');
      card.className = 'product-card is-in';
      card.setAttribute('data-category', p.category || 'all');
      card.setAttribute('data-index', String(i));
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', 'Quick view: ' + p.name);
      var badge = p.badge ? '<span class="product-badge"></span>' : '';
      card.innerHTML =
        '<div class="imgwrap">' + imgTag(p.image, p.name) + '<div class="sweep-layer"></div></div>' +
        '<div class="product-info">' + badge +
        '<h3 class="product-name"></h3>' +
        '<p class="product-price"></p>' +
        '<span class="product-arrow" aria-hidden="true">&rarr;</span></div>';
      var nm = $('.product-name', card); if (nm) nm.textContent = p.name;
      var pr = $('.product-price', card); if (pr) pr.textContent = formatPrice(p);
      var bd = $('.product-badge', card); if (bd) bd.textContent = p.badge;
      card.addEventListener('click', function () { openQuickView(card, i); });
      card.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openQuickView(card, i); }
      });
      // Light sweep: once per hover (mouse) / tap (touch)
      card.addEventListener('mouseenter', function () { fireSweep(card); });
      card.addEventListener('touchstart', function () {
        card.classList.add('is-hover'); fireSweep(card);
      }, { passive: true });
      grid.appendChild(card);
      wireImgLoad(card);
    });
  }

  function fireSweep(card) {
    if (reducedMotion) return;
    card.classList.remove('sweep');
    void card.offsetWidth; /* restart the one-shot animation */
    card.classList.add('sweep');
  }

  /* Filter morph: fade + scale out (staggered), layout update,
     staggered fade + scale in. Never a hard swap. */
  var filterToken = 0;
  var activeFilter = 'all';

  function setFilter(cat) {
    if (cat === activeFilter) return;
    activeFilter = cat;
    var token = ++filterToken;
    var pills = $$('#filterPills .filter-pill');
    pills.forEach(function (pl) {
      pl.setAttribute('aria-pressed', pl.getAttribute('data-filter') === cat ? 'true' : 'false');
    });
    var cards = $$('.product-card');
    if (reducedMotion) {
      cards.forEach(function (c) {
        var show = cat === 'all' || c.getAttribute('data-category') === cat;
        c.classList.toggle('is-hidden', !show);
        c.classList.toggle('is-in', show);
      });
      return;
    }
    cards.forEach(function (c, i) {
      c.style.transitionDelay = (i * 60) + 'ms';
      c.classList.remove('is-in');
      c.classList.add('is-out');
    });
    setTimeout(function () {
      if (token !== filterToken) return;
      var visible = [];
      cards.forEach(function (c) {
        var show = cat === 'all' || c.getAttribute('data-category') === cat;
        c.classList.remove('is-out');
        c.classList.toggle('is-hidden', !show);
        if (show) { c.classList.add('is-entering'); visible.push(c); }
        else { c.classList.remove('is-in', 'is-entering'); }
      });
      var grid = $('#productGrid');
      if (grid) void grid.offsetWidth; /* commit layout before entering */
      visible.forEach(function (c, i) {
        c.style.transitionDelay = (i * 90) + 'ms';
        c.classList.remove('is-entering');
        c.classList.add('is-in');
      });
      setTimeout(function () {
        if (token !== filterToken) return;
        cards.forEach(function (c) { c.style.transitionDelay = ''; });
      }, 700 + visible.length * 90);
    }, 480);
  }

  /* ============================================================
     QUICK VIEW (FLIP)
     ============================================================ */

  var qv = { open: false, index: -1, clone: null, lastFocus: null };
  var qvPanel, qvBackdrop, qvSlot, qvImg;

  function safeRect(el) {
    try {
      if (!el || typeof el.getBoundingClientRect !== 'function') return null;
      var r = el.getBoundingClientRect();
      if (!r || r.width <= 0 || r.height <= 0) return null;
      return r;
    } catch (e) { return null; }
  }

  function initQuickView() {
    qvPanel = $('#quickview');
    qvBackdrop = $('#qvBackdrop');
    qvSlot = $('#qvMediaSlot');
    if (!qvPanel || !qvBackdrop || !qvSlot) return;
    qvImg = document.createElement('img');
    qvImg.setAttribute('alt', '');
    qvImg.setAttribute('decoding', 'async');
    qvImg.setAttribute('onerror', 'this.onerror=null;this.src=window.__IMG_FALLBACK__');
    qvSlot.appendChild(qvImg);
    wireImgLoad(qvSlot);

    var closeBtn = $('#qvClose');
    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
    qvBackdrop.addEventListener('click', closeQuickView);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && qv.open) closeQuickView();
    });
    var enq = $('#qvEnquire');
    if (enq) enq.addEventListener('click', function () { closeQuickView(); });
  }

  function fillQuickView(p) {
    var set = function (id, val) { var el = document.getElementById(id); if (el) el.textContent = val || ''; };
    set('qvCategory', cap(p.category || ''));
    set('qvName', p.name);
    set('qvDesc', p.description);
    set('qvMaterial', p.material);
    set('qvStone', p.stone);
    set('qvPrice', formatPrice(p));
    if (qvImg) {
      qvImg.classList.remove('is-loaded');
      qvImg.setAttribute('src', p.image);
      qvImg.setAttribute('alt', p.name);
    }
  }

  function panelTargetRect() {
    // Geometry of the panel's image slot once the panel is open.
    var w = Math.min(430, window.innerWidth || 430);
    var h = w * 1.25; /* aspect 4/5 */
    return { left: (window.innerWidth || w) - w, top: 0, width: w, height: h };
  }

  function openQuickView(card, index) {
    if (!qvPanel || qv.open) return;
    var p = state.products[index];
    if (!p) return;
    qv.open = true; qv.index = index;
    qv.lastFocus = document.activeElement;
    fillQuickView(p);

    qvPanel.hidden = false;
    qvBackdrop.hidden = false;
    try { qvPanel.scrollTop = 0; } catch (e) {}
    document.body.style.overflow = 'hidden';

    var img = card ? $('.imgwrap img', card) : null;
    var from = safeRect(img);
    var to = panelTargetRect();

    requestAnimationFrame(function () {
      qvBackdrop.classList.add('is-open');
      qvPanel.classList.add('is-open');
      qvPanel.setAttribute('aria-hidden', 'false');
      qvBackdrop.setAttribute('aria-hidden', 'false');
      var closeBtn = $('#qvClose');
      if (closeBtn) { try { closeBtn.focus({ preventScroll: true }); } catch (e) { try { closeBtn.focus(); } catch (e2) {} } }
    });

    if (from && !reducedMotion) {
      var clone = document.createElement('img');
      clone.className = 'qv-clone';
      clone.setAttribute('alt', '');
      try { clone.src = (img && (img.currentSrc || img.src)) || p.image; } catch (e) { clone.src = p.image; }
      clone.style.left = from.left + 'px';
      clone.style.top = from.top + 'px';
      clone.style.width = from.width + 'px';
      clone.style.height = from.height + 'px';
      document.body.appendChild(clone);
      qv.clone = clone;
      void clone.offsetWidth;
      clone.style.left = to.left + 'px';
      clone.style.top = to.top + 'px';
      clone.style.width = to.width + 'px';
      clone.style.height = to.height + 'px';
      setTimeout(function () {
        if (qv.clone === clone) {
          try { clone.parentNode.removeChild(clone); } catch (e) {}
          qv.clone = null;
        }
        if (qvImg) qvImg.classList.add('is-loaded');
      }, 620);
    } else {
      if (qvImg) {
        setTimeout(function () { qvImg.classList.add('is-loaded'); }, 60);
      }
    }
  }

  function closeQuickView() {
    if (!qvPanel || !qv.open) return;
    qv.open = false;
    var card = $('.product-card[data-index="' + qv.index + '"]');
    var img = card ? $('.imgwrap img', card) : null;
    var to = safeRect(img);
    var from = panelTargetRect();

    if (to && !reducedMotion) {
      var clone = document.createElement('img');
      clone.className = 'qv-clone';
      clone.setAttribute('alt', '');
      try { clone.src = (qvImg && (qvImg.currentSrc || qvImg.src)) || ''; } catch (e) {}
      clone.style.left = from.left + 'px';
      clone.style.top = from.top + 'px';
      clone.style.width = from.width + 'px';
      clone.style.height = from.height + 'px';
      document.body.appendChild(clone);
      void clone.offsetWidth;
      qvBackdrop.classList.remove('is-open');
      qvPanel.classList.remove('is-open');
      clone.style.left = to.left + 'px';
      clone.style.top = to.top + 'px';
      clone.style.width = to.width + 'px';
      clone.style.height = to.height + 'px';
      setTimeout(function () {
        try { clone.parentNode.removeChild(clone); } catch (e) {}
        hideQvChrome();
      }, 600);
    } else {
      qvBackdrop.classList.remove('is-open');
      qvPanel.classList.remove('is-open');
      setTimeout(hideQvChrome, reducedMotion ? 0 : 500);
    }
  }

  function hideQvChrome() {
    if (qvPanel) { qvPanel.hidden = true; qvPanel.setAttribute('aria-hidden', 'true'); }
    if (qvBackdrop) { qvBackdrop.hidden = true; qvBackdrop.setAttribute('aria-hidden', 'true'); }
    document.body.style.overflow = '';
    if (qv.lastFocus && qv.lastFocus.focus) {
      try { qv.lastFocus.focus({ preventScroll: true }); } catch (e) { try { qv.lastFocus.focus(); } catch (e2) {} }
    }
  }

  /* ============================================================
     MOTION ENGINE — restrained "Material Motion"
     Cursor depth on the hero layers + magnetic headline. Eased, and the
     frame loop sleeps once settled. The old scroll-velocity offset was
     removed: it accumulated raw wheel deltas and made the hero photo and
     copy card shiver while scrolling.
     ============================================================ */

  var depthEls = [];   // {el, depth, visible}
  var heroEl = null, heroVisible = true;
  var px = 0, py = 0, cx = 0, cy = 0;   // pointer target / smoothed
  var motionOn = !reducedMotion && finePointer;
  var tickQueued = false;

  function initMotion() {
    heroEl = $('#hero');
    if (!motionOn) return;
    /* only the hero layers follow the cursor (the pointer lives there) */
    $$('[data-depth]', heroEl || document).forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth'));
      if (isNaN(d)) return;
      depthEls.push({ el: el, depth: d });
    });

    if (heroEl && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        heroVisible = !!(entries[0] && entries[0].isIntersecting);
        if (heroVisible) requestTick();
      }, { threshold: 0 }).observe(heroEl);
      heroEl.addEventListener('pointermove', onHeroPointer, { passive: true });
      heroEl.addEventListener('pointerleave', function () { px = 0; py = 0; resetMagnetic(); requestTick(); });
    }
    splitMagnetic();
  }

  function onHeroPointer(ev) {
    if (!heroEl) return;
    var r = safeRect(heroEl);
    if (!r) return;
    var nx = ((ev.clientX - r.left) / r.width) * 2 - 1;
    var ny = ((ev.clientY - r.top) / r.height) * 2 - 1;
    px = clamp(nx, -1, 1);
    py = clamp(ny, -1, 1);
    applyMagnetic(ev.clientX, ev.clientY);
    requestTick();
  }

  function requestTick() {
    if (motionOn && !tickQueued) {
      tickQueued = true;
      requestAnimationFrame(tick);
    }
  }

  function tick() {
    tickQueued = false;
    if (!heroVisible || document.hidden) return;
    cx += (px - cx) * 0.08;
    cy += (py - cy) * 0.08;
    var settled = Math.abs(px - cx) < 0.001 && Math.abs(py - cy) < 0.001;
    if (settled) { cx = px; cy = py; }
    depthEls.forEach(function (rec) {
      rec.el.style.transform = 'translate3d(' + (cx * rec.depth).toFixed(2) + 'px,' +
        (cy * rec.depth).toFixed(2) + 'px,0)';
    });
    if (!settled) requestTick();
  }

  /* Magnetic headline: letters drift <=3px toward the cursor. */
  var magChars = [];

  function splitMagnetic() {
    var h = $('[data-magnetic]');
    if (!h) return;
    var text = h.textContent;
    h.textContent = '';
    h.setAttribute('aria-label', text);
    /* letters inside no-wrap word groups with real spaces between them —
       one inline-block per letter (and NBSP spaces) broke the headline
       mid-word: "Made to be w / orn. Built to b / e kept." */
    String(text).split(/\s+/).filter(Boolean).forEach(function (word, wi) {
      if (wi > 0) h.appendChild(document.createTextNode(' '));
      var w = document.createElement('span');
      w.className = 'word';
      w.setAttribute('aria-hidden', 'true');
      Array.from(word).forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        w.appendChild(s);
        magChars.push(s);
      });
      h.appendChild(w);
    });
  }

  function applyMagnetic(mx, my) {
    if (!magChars.length) return;
    /* read every letter box first, then write — interleaving forced a style
       recalculation per letter on every pointer move */
    var rects = magChars.map(safeRect);
    magChars.forEach(function (s, i) {
      var r = rects[i];
      if (!r) return;
      var dx = mx - (r.left + r.width / 2);
      var dy = my - (r.top + r.height / 2);
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var pull = clamp(1 - dist / 320, 0, 1) * 3; /* max 3px */
      var sx = (dx / dist * pull).toFixed(2);
      var sy = (dy / dist * pull).toFixed(2);
      s.style.transform = 'translate3d(' + sx + 'px,' + sy + 'px,0)';
    });
  }

  function resetMagnetic() {
    magChars.forEach(function (s) { s.style.transform = ''; });
  }

  /* ---------- reveals ---------- */

  function initReveals() {
    var targets = $$('.reveal-mask, .reveal-fade, [data-reveal-img]');
    if (!('IntersectionObserver' in window) || reducedMotion) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- skeleton shimmer -> fade in ---------- */

  function wireImgLoad(scope) {
    var imgs = scope ? $$('img', scope) : $$('img');
    imgs.forEach(function (img) {
      if (img.dataset.wired) return;
      img.dataset.wired = '1';
      var done = function () { img.classList.add('is-loaded'); };
      if (img.complete && img.naturalWidth > 0) done();
      else {
        img.addEventListener('load', done, { once: true });
        setTimeout(done, 6000); /* never leave a shimmer hanging */
      }
    });
  }

  /* ---------- sticky mini-nav ---------- */

  function initScroll() {
    var mini = $('#miniNav');
    var heroH = 0;
    var measure = function () {
      heroH = heroEl ? heroEl.offsetHeight : (window.innerHeight || 800);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });

    var scheduled = false;
    function onScroll() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        var y = window.scrollY || window.pageYOffset || 0;
        if (mini) {
          var show = y > heroH * 0.92;
          if (mini.classList.contains('is-visible') !== show) {
            mini.classList.toggle('is-visible', show);
            mini.setAttribute('aria-hidden', show ? 'false' : 'true');
          }
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- in-page links: smooth glide in JS ----------
     (replaces CSS scroll-behavior:smooth, which also slowed every
     programmatic scroll; instant under reduced motion) */

  function initAnchorScroll() {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = (a.getAttribute('href') || '').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      try { target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- contact form (demo: inline confirmation) ---------- */

  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var note = $('#formNote');
      var name = $('input[name="name"]', form);
      var email = $('input[name="email"]', form);
      var msg = $('textarea[name="message"]', form);
      var ok = name && email && msg &&
        name.value.trim() && email.value.trim() && msg.value.trim();
      if (!ok) {
        if (note) {
          note.textContent = 'Please complete your name, email and message.';
          note.classList.remove('is-sent');
        }
        return;
      }
      form.reset();
      if (note) {
        note.textContent = UI['form.sent'];
        note.classList.add('is-sent');
      }
    });
  }

  /* ============================================================
     CUSTOMIZATION API
     ============================================================ */

  function setVar(name, value) {
    if (typeof value === 'string' && value.trim()) {
      root.style.setProperty(name, value.trim());
    }
  }

  function applyFontPair(pair) {
    if (typeof pair !== 'string') return;
    var parts = pair.split('|');
    var display = (parts[0] || '').trim();
    var body = (parts[1] || '').trim();
    if (!display && !body) return;
    var fams = [];
    if (display) fams.push('family=' + encodeURIComponent(display).replace(/%20/g, '+') + ':ital,wght@0,400;1,400');
    if (body && body !== display) fams.push('family=' + encodeURIComponent(body).replace(/%20/g, '+') + ':wght@400;500;600');
    try {
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', 'https://fonts.googleapis.com/css2?' + fams.join('&') + '&display=swap');
      document.head.appendChild(link);
    } catch (e) {}
    if (display) root.style.setProperty('--font-display', "'" + display + "', Georgia, serif");
    if (body) root.style.setProperty('--font-body', "'" + body + "', system-ui, sans-serif");
  }

  function refreshProductViews() {
    renderFeatured();
    renderProductGrid();
    // keep collection imagery aligned when productImages are remapped
    var grid = $('#collectionGrid');
    if (grid) {
      var cards = $$('.collection-card', grid);
      cards.forEach(function (card, i) {
        var img = $('img', card);
        var p = state.products[i];
        if (img && p && img.getAttribute('src') !== p.image) {
          img.setAttribute('src', p.image);
          img.classList.remove('is-loaded');
        }
      });
    }
    wireImgLoad(document);
  }

  window.applyCustomization = function (custom) {
    try {
      if (!custom || typeof custom !== 'object') return;

      if (typeof custom.brandName === 'string' && custom.brandName.trim()) {
        state.brand.name = custom.brandName.trim();
        $$('[data-brand]').forEach(function (el) { el.textContent = state.brand.name; });
        document.title = state.brand.name;
      }

      if (typeof custom.logoText === 'string' && custom.logoText.trim()) {
        var logo = $('#siteNav .brand-mark');
        if (logo) logo.textContent = custom.logoText.trim();
      }

      if (custom.primaryColor) setVar('--color-primary', String(custom.primaryColor));
      if (custom.accentColor) setVar('--color-accent', String(custom.accentColor));

      if (custom.fontPair) applyFontPair(custom.fontPair);

      if (typeof custom.heroImage === 'string' && custom.heroImage) {
        var heroImg = $('#hero .hero-media img');
        if (heroImg) {
          heroImg.classList.remove('is-loaded');
          heroImg.setAttribute('src', custom.heroImage);
        }
      }

      if (Array.isArray(custom.productNames)) {
        custom.productNames.forEach(function (n, i) {
          if (typeof n === 'string' && n.trim() && state.products[i]) {
            state.products[i].name = n.trim();
          }
        });
        refreshProductViews();
      }

      if (custom.productImages && typeof custom.productImages === 'object') {
        Object.keys(custom.productImages).forEach(function (k) {
          var i = parseInt(k, 10);
          var url = custom.productImages[k];
          if (!isNaN(i) && state.products[i] && typeof url === 'string' && url) {
            state.products[i].image = url;
          }
        });
        refreshProductViews();
      }

      if (typeof custom.currency === 'string' && custom.currency) {
        state.currencyOverride = custom.currency;
        refreshProductViews();
      }

      if (typeof custom.contactEmail === 'string' && custom.contactEmail.trim()) {
        state.contact.email = custom.contactEmail.trim();
        var em = $('[data-href="contact.email"]');
        if (em) {
          em.textContent = state.contact.email;
          em.setAttribute('href', 'mailto:' + state.contact.email);
        }
      }

      if (typeof custom.instagramUrl === 'string' && custom.instagramUrl.trim()) {
        state.contact.instagram = custom.instagramUrl.trim();
        var ig = $('[data-href="contact.instagram"]');
        if (ig) ig.setAttribute('href', state.contact.instagram);
      }
    } catch (e) {
      /* never throw on partial / unexpected input */
    }
  };

  function applyUrlParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var pre = {};
      var b = q.get('brand'), pr = q.get('primary'), ac = q.get('accent');
      if (b) pre.brandName = b;
      if (pr) pre.primaryColor = pr;
      if (ac) pre.accentColor = ac;
      if (pre.brandName || pre.primaryColor || pre.accentColor) {
        window.applyCustomization(pre);
      }
    } catch (e) {}
  }

  /* ============================================================
     BOOT
     ============================================================ */

  function boot() {
    renderStaticSlots();
    renderNav();
    renderCollections();
    renderFilters();
    renderFeatured();
    renderProductGrid();
    initQuickView();
    initReveals();
    initMotion();
    initScroll();
    initAnchorScroll();
    initForm();
    wireImgLoad(document);
    applyUrlParams();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
