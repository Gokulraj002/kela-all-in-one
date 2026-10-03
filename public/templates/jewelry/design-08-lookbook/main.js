/* ============================================================
   Kela Jewels — design-08-lookbook · main.js
   Vanilla JS. Motion language: editorial — crop reveals,
   light sweeps, subtle scroll-linked hero parallax,
   whisper-quiet magnetic type. All disabled under
   prefers-reduced-motion.
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
  var finePointer = window.matchMedia('(pointer: fine)').matches;

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

  /* ---------- 1 · render content ---------- */

  function renderContent() {
    var brandName = get('brand.name') || 'Kela Jewels';
    doc.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = brandName; });
    try { doc.title = brandName + ' — N°1 The Gilded Hour'; } catch (e) {}

    doc.querySelectorAll('[data-content]').forEach(function (el) {
      text(el, get(el.getAttribute('data-content')));
    });

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

    var sections = ['#collections', '#products', '#story', '#contact'];
    var nav = Array.isArray(C.nav) ? C.nav : [];
    [doc.querySelector('.nav-links[data-build="nav"]'),
     doc.getElementById('navMobile'),
     doc.querySelector('.footer-nav[data-build="nav"]')].forEach(function (navEl) {
      if (!navEl) return;
      navEl.innerHTML = '';
      nav.forEach(function (label, i) {
        var a = doc.createElement('a');
        a.href = sections[i] || '#';
        a.textContent = label;
        navEl.appendChild(a);
      });
    });

    doc.querySelectorAll('[data-build="secLabel"]').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-sec'), 10);
      if (nav[i]) el.textContent = nav[i];
    });

    var email = get('contact.email'), phone = get('contact.phone'), insta = get('contact.instagram');
    doc.querySelectorAll('[data-contact-email]').forEach(function (el) {
      if (!email) return;
      if (el.tagName === 'A') { el.href = 'mailto:' + email; el.textContent = email; }
      else text(el, email);
    });
    doc.querySelectorAll('[data-contact-phone]').forEach(function (el) {
      if (!phone) return;
      if (el.tagName === 'A') { el.href = 'tel:' + phone.replace(/[^+\d]/g, ''); el.textContent = phone; }
      else text(el, phone);
    });
    doc.querySelectorAll('[data-contact-instagram]').forEach(function (el) {
      if (!insta) return;
      el.href = insta;
      var handle = insta.replace(/\/$/, '').split('/').pop();
      var arrow = el.querySelector('.arrow');
      el.textContent = '@' + handle + ' ';
      if (arrow) el.appendChild(arrow);
    });

    buildCollections();
    buildProducts();
    buildPairRow();
    refreshPrices();
  }

  /* ---------- 2 · build sections ---------- */

  function buildCollections() {
    var strip = doc.querySelector('[data-build="collections"]');
    if (!strip || !Array.isArray(C.collections)) return;
    strip.innerHTML = '';
    C.collections.slice(0, 3).forEach(function (col, i) {
      var card = doc.createElement('article');
      card.className = 'strip-card reveal-crop';
      card.style.setProperty('--d', (i * 140) + 'ms');

      var shell = doc.createElement('div');
      shell.className = 'img-shell ratio-3x4';
      var img = doc.createElement('img');
      img.setAttribute('data-img', '');
      img.src = col.image || '';
      img.setAttribute('data-colimg', col.image || '');
      img.alt = (col.name || 'Look') + ' — editorial photograph';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      shell.appendChild(img);

      var num = doc.createElement('span');
      num.className = 'strip-num';
      num.textContent = 'Look ' + (i + 1) + ' / 03';

      var h = doc.createElement('h3');
      h.className = 'strip-name';
      h.textContent = col.name || '';

      var link = doc.createElement('a');
      link.className = 'strip-link';
      link.href = '#products';
      link.innerHTML = 'Explore the pieces <span class="arrow" aria-hidden="true">→</span>';

      card.appendChild(shell); card.appendChild(num); card.appendChild(h); card.appendChild(link);
      strip.appendChild(card);
      enhanceImg(img);
    });
  }

  function buildProducts() {
    var grid = doc.querySelector('[data-build="products"]');
    if (!grid || !Array.isArray(C.products)) return;
    grid.innerHTML = '';
    C.products.slice(0, 4).forEach(function (p, i) {
      var card = doc.createElement('article');
      card.className = 'look-card reveal-scale';
      card.style.setProperty('--d', (i * 130) + 'ms');
      card.setAttribute('data-product', String(i));

      var shell = doc.createElement('div');
      shell.className = 'img-shell ratio-3x4';
      var img = doc.createElement('img');
      img.setAttribute('data-img', '');
      img.src = p.image || '';
      img.alt = p.name || 'Jewellery piece';
      img.loading = 'lazy';
      img.decoding = 'async';
      shell.appendChild(img);

      var meta = doc.createElement('div');
      meta.className = 'look-meta';
      var num = doc.createElement('span');
      num.className = 'look-num';
      num.textContent = '0' + (i + 1);
      var name = doc.createElement('h3');
      name.className = 'look-name';
      name.setAttribute('data-pname', String(i));
      name.textContent = p.name || '';
      meta.appendChild(num); meta.appendChild(name);

      var price = doc.createElement('p');
      price.className = 'look-price';
      price.setAttribute('data-price', String(i));

      var arrow = doc.createElement('span');
      arrow.className = 'look-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';

      card.appendChild(shell); card.appendChild(meta); card.appendChild(price); card.appendChild(arrow);
      grid.appendChild(card);
      enhanceImg(img);

      card.addEventListener('click', function () { openQV(i, img); });
      // touch: tap shows the same hover state
      card.addEventListener('touchstart', function () { card.classList.add('tapped'); }, { passive: true });
    });
  }

  function buildPairRow() {
    var row = doc.querySelector('[data-build="pair"]');
    if (!row || !Array.isArray(C.products)) return;
    row.innerHTML = '';
    var caption = doc.getElementById('pairCaption');
    C.products.slice(0, 3).forEach(function (p, i) {
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'pair-btn' + (i === 0 ? ' active' : '');
      var im = doc.createElement('img');
      im.src = p.image || '';
      im.alt = '';
      im.loading = 'lazy';
      im.decoding = 'async';
      var lb = doc.createElement('span');
      lb.textContent = p.name || '';
      b.appendChild(im); b.appendChild(lb);
      b.addEventListener('click', function () {
        row.querySelectorAll('.pair-btn').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        if (caption) caption.textContent = 'Paired with ' + (p.name || '') + ' — ' + money(p.price);
      });
      row.appendChild(b);
    });
    if (caption && C.products[0]) caption.textContent = 'Paired with ' + C.products[0].name + ' — ' + money(C.products[0].price);
  }

  function refreshPrices() {
    if (!Array.isArray(C.products)) return;
    if (!currencyCustomized) {
      C.products.forEach(function (p) { if (p.currency) currency = p.currency; });
    }
    doc.querySelectorAll('[data-price]').forEach(function (el) {
      var i = parseInt(el.getAttribute('data-price'), 10);
      var p = C.products[i];
      if (p) el.textContent = money(p.price);
    });
    var caption = doc.getElementById('pairCaption');
    var active = doc.querySelector('.pair-btn.active span:last-child');
    if (caption && active && C.products.length) {
      var idx = Array.prototype.indexOf.call(doc.querySelectorAll('.pair-btn'), doc.querySelector('.pair-btn.active'));
      var p = C.products[Math.max(0, idx)];
      if (p) caption.textContent = 'Paired with ' + p.name + ' — ' + money(p.price);
    }
  }

  /* ---------- 3 · images ---------- */

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

  /* ---------- 4 · reveals ---------- */

  function initReveals() {
    var els = doc.querySelectorAll('.reveal, .reveal-crop, .reveal-scale');
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    /* .reveal-crop starts behind a fully-closed clip-path, and Chrome's
       IntersectionObserver clips a target by its own clip-path — it never
       reported as intersecting, so the whole look strip and the atelier
       photo stayed blank. Those are watched by their layout box instead. */
    var crops = [];
    els.forEach(function (el) {
      if (el.classList.contains('reveal-crop')) crops.push(el);
      else io.observe(el);
    });
    watchLayoutBox(crops, function (el) { el.classList.add('in'); });
  }

  /* Reveal trigger for clip-path-hidden elements: reads the layout box
     (clip-path never affects it) once per frame while scrolling, then
     unhooks itself when every element has been shown. Read-only. */
  function watchLayoutBox(nodes, onShow) {
    var pending = nodes.slice();
    if (!pending.length) return;
    var queued = false;
    function check() {
      queued = false;
      var vh = window.innerHeight || doc.documentElement.clientHeight || 800;
      pending = pending.filter(function (node) {
        var r = node.getBoundingClientRect();
        var show = r.width > 0 && r.top < vh * 0.9 && r.bottom > 0;
        if (show) onShow(node);
        return !show;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', queue);
        window.removeEventListener('resize', queue);
      }
    }
    function queue() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(check);
    }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    queue();
  }

  /* ---------- 5 · hero parallax (subtle) ----------
     A pure function of scroll position, applied once per scrolled frame.
     The old scroll-velocity nudge was removed: velocity read from raw
     wheel deltas is noisy and made the cover photo shiver while
     scrolling — and its rAF loop ran forever, even when idle. */

  function initHeroMotion() {
    if (reduced) return;
    var hero = doc.getElementById('hero');
    var img = doc.getElementById('heroImg');
    if (!hero || !img) return;
    var queued = false, last = '';

    function render() {
      queued = false;
      var y = window.scrollY || 0;
      if (y > hero.offsetHeight + 200) return; /* cover is off screen */
      var t = 'translate3d(0,' + Math.min(y * 0.07, 70).toFixed(1) + 'px,0)';
      if (t !== last) { img.style.transform = t; last = t; }
    }
    function queue() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(render);
    }
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    queue();
  }

  /* ---------- 6 · magnetic type (≤3px, hero title only) ---------- */

  function initMagnetic() {
    if (reduced || !finePointer) return;
    var el = doc.querySelector('[data-magnetic]');
    if (!el) return;
    var original = el.textContent;
    el.setAttribute('aria-label', original);
    el.textContent = '';
    original.split(' ').forEach(function (word, wi, arr) {
      var w = doc.createElement('span');
      w.style.display = 'inline-block';
      w.style.whiteSpace = 'nowrap';
      word.split('').forEach(function (ch) {
        var s = doc.createElement('span');
        s.className = 'ml';
        s.textContent = ch;
        w.appendChild(s);
      });
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(doc.createTextNode(' '));
    });
    var letters = el.querySelectorAll('.ml');
    var hero = doc.getElementById('hero');
    var zone = hero || el;
    /* eased in JS, one write per frame while it moves (a CSS transition
       restarted on every mousemove fought the pointer) */
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    function frame() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (Math.abs(tx - cx) < 0.02 && Math.abs(ty - cy) < 0.02) { cx = tx; cy = ty; running = false; }
      var t = (cx || cy) ? 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)' : '';
      letters.forEach(function (s) { s.style.transform = t; });
      if (running) requestAnimationFrame(frame);
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
    zone.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      if (!r.width) return;
      var dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      var dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      tx = Math.max(-1, Math.min(1, dx)) * 3;
      ty = Math.max(-1, Math.min(1, dy)) * 3;
      kick();
    }, { passive: true });
    zone.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
  }

  /* ---------- 7 · look strip: arrows + drag ---------- */

  function initStrip() {
    var strip = doc.getElementById('lookStrip');
    if (!strip) return;
    var prev = doc.getElementById('stripPrev');
    var next = doc.getElementById('stripNext');
    function step() {
      var card = strip.querySelector('.strip-card');
      return card ? card.getBoundingClientRect().width + 32 : 320;
    }
    if (prev) prev.addEventListener('click', function () { strip.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }); });
    if (next) next.addEventListener('click', function () { strip.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }); });

    // drag-to-scroll (desktop)
    var down = false, startX = 0, startL = 0;
    strip.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') { down = true; startX = e.clientX; startL = strip.scrollLeft; strip.classList.add('dragging'); }
    });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      strip.scrollLeft = startL - (e.clientX - startX);
    });
    window.addEventListener('pointerup', function () { down = false; strip.classList.remove('dragging'); });
  }

  /* ---------- 8 · try the look (concept demo) ---------- */

  function initTryOn() {
    var dz = doc.getElementById('dropzone');
    var fi = doc.getElementById('tryFile');
    var img = doc.getElementById('tryImg');
    var empty = doc.getElementById('tryEmpty');
    if (!dz || !fi || !img) return;

    function handleFile(f) {
      if (!f || !f.type || f.type.indexOf('image/') !== 0) return;
      try {
        var rd = new FileReader();
        rd.onload = function () {
          try {
            delete img.dataset.fbk;
            img.hidden = false;
            img.src = rd.result;
            if (empty) empty.style.display = 'none';
            var shell = img.closest('.img-shell');
            if (shell) { shell.classList.remove('is-loaded'); }
            enhanceImg(img);
          } catch (e) {}
        };
        rd.readAsDataURL(f);
      } catch (e) {}
    }

    dz.addEventListener('click', function () { fi.click(); });
    dz.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fi.click(); }
    });
    fi.addEventListener('change', function () { handleFile(fi.files && fi.files[0]); });
    ['dragenter', 'dragover'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add('dragover'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove('dragover'); });
    });
    dz.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) handleFile(dt.files[0]);
    });
  }

  /* ---------- 9 · quick view ---------- */

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
          '<a class="qv-cta" href="#contact">Enquire about this piece <span class="arrow" aria-hidden="true">→</span></a>' +
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
    try { delete qvMediaImg.dataset.fbk; } catch (e) {}
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
        'px;height:' + t.height + 'px;margin:0;z-index:120;pointer-events:none;object-fit:cover;' +
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
      setTimeout(land, 900);
    } catch (e) { reveal(); }
  }

  function closeQV() {
    if (!qv) return;
    qv.classList.remove('open');
    qv.setAttribute('aria-hidden', 'true');
    doc.body.style.overflow = '';
  }

  /* ---------- 9b · in-page links: smooth glide in JS ----------
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

  /* ---------- 10 · nav + form ---------- */

  function initNav() {
    var nav = doc.getElementById('siteNav');
    var toggle = doc.getElementById('navToggle');
    var mobile = doc.getElementById('navMobile');
    if (!nav) return;
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
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

  function initForm() {
    var form = doc.getElementById('contact-form');
    var ok = doc.getElementById('form-success');
    if (!form || !ok) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      ok.hidden = false;
      ok.classList.add('show');
    });
  }

  /* ---------- 11 · applyCustomization (platform contract) ---------- */

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
        doc.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = name; });
        try { doc.title = name + ' — N°1 The Gilded Hour'; } catch (e) {}
        var initial = (name.trim().charAt(0) || 'K').toUpperCase();
        doc.querySelectorAll('.img-fallback span').forEach(function (s) { s.textContent = initial; });
        var mono = doc.querySelector('.try-mono[data-brand]');
        if (mono) mono.textContent = name;
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
        var heroImg = doc.getElementById('heroImg');
        if (heroImg) { try { delete heroImg.dataset.fbk; } catch (e) {} heroImg.src = custom.heroImage; }
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
          var pairBtn = doc.querySelectorAll('.pair-btn')[i];
          if (pairBtn) {
            var lb = pairBtn.querySelector('span:last-child');
            if (lb) lb.textContent = n;
          }
        });
        refreshPrices();
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
          if (card) { try { delete card.dataset.fbk; } catch (e) {} card.src = src; }
          var pairImgs = doc.querySelectorAll('.pair-btn img');
          if (pairImgs[i]) pairImgs[i].src = src;
          // the look strip reuses product imagery — keep it in sync
          if (oldSrc) {
            doc.querySelectorAll('img[data-colimg]').forEach(function (im) {
              if (im.getAttribute('data-colimg') === oldSrc) { try { delete im.dataset.fbk; } catch (e) {} im.src = src; }
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
    initHeroMotion();
    initMagnetic();
    initStrip();
    initTryOn();
    initNav();
    initAnchorScroll();
    initForm();
    initQueryParams();
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();

})();
