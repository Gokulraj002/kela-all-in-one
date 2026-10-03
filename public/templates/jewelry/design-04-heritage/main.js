/* ============================================================
   KELA JEWELS · design-04-heritage · main.js
   Vanilla JS. Renders ALL text from window.TEMPLATE_CONTENT.
   Every selector is guarded — no console errors, ever.
   ============================================================ */
(function () {
  'use strict';

  var CONTENT = (typeof window !== 'undefined' && window.TEMPLATE_CONTENT) || {};
  var NAV_ANCHORS = ['#collections', '#products', '#story', '#contact'];

  var state = {
    currency: '₹',
    brandName: getPath(CONTENT, 'brand.name') || 'KELA JEWELS',
    monogram: getPath(CONTENT, 'brand.monogram') || 'K',
    products: Array.isArray(CONTENT.products) ? CONTENT.products.slice() : []
  };
  state.products.forEach(function (p) {
    if (!p.currency) p.currency = state.currency;
  });

  var REDUCED = hasMatchMedia() && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE_POINTER = hasMatchMedia() && window.matchMedia('(pointer: fine)').matches;

  /* ---------------- tiny helpers ---------------- */

  function hasMatchMedia() {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function';
  }

  function $(sel, root) {
    try { return (root || document).querySelector(sel); }
    catch (e) { return null; }
  }

  function $all(sel, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }

  function getPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function setText(el, value) {
    if (el && value != null) el.textContent = String(value);
  }

  function formatPrice(p) {
    var n = Number(p.price) || 0;
    var grouped;
    try { grouped = new Intl.NumberFormat('en-IN').format(n); }
    catch (e) { grouped = String(n); }
    return (p.currency || state.currency) + grouped;
  }

  /* ---------------- render: text from content ---------------- */

  function renderText() {
    $all('[data-content]').forEach(function (el) {
      var v = getPath(CONTENT, el.getAttribute('data-content'));
      if (v == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.value = String(v);
      else setText(el, v);
    });
    $all('[data-content-ph]').forEach(function (el) {
      var v = getPath(CONTENT, el.getAttribute('data-content-ph'));
      if (v != null) el.setAttribute('placeholder', String(v));
    });
    // link hrefs derived from content
    $all('[data-href]').forEach(function (el) {
      var kind = el.getAttribute('data-href');
      var val = getPath(CONTENT, el.getAttribute('data-content'));
      if (val == null) return;
      if (kind === 'tel') el.setAttribute('href', 'tel:' + String(val).replace(/[^+\d]/g, ''));
      else if (kind === 'mailto') el.setAttribute('href', 'mailto:' + String(val).trim());
      else if (kind === 'url') {
        var url = getPath(CONTENT, el.getAttribute('data-urlkey'));
        if (url) el.setAttribute('href', String(url));
      }
    });
    // image sources derived from content
    $all('img[data-img]').forEach(function (img) {
      var src = getPath(CONTENT, img.getAttribute('data-img'));
      if (src && img.getAttribute('src') !== src) img.setAttribute('src', String(src));
      var alt = getPath(CONTENT, img.getAttribute('data-imgalt'));
      if (alt) img.setAttribute('alt', String(alt));
    });
    var title = getPath(CONTENT, 'brand.name');
    var tagline = getPath(CONTENT, 'brand.tagline');
    if (title && typeof document !== 'undefined') {
      document.title = title + (tagline ? ' — ' + tagline : '');
    }
  }

  /* ---------------- builders ---------------- */

  function buildNav() {
    var items = Array.isArray(CONTENT.nav) ? CONTENT.nav : [];
    $all('[data-build="nav"]').forEach(function (ul) {
      ul.innerHTML = '';
      items.forEach(function (label, i) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.textContent = String(label);
        a.setAttribute('href', NAV_ANCHORS[i] || '#');
        li.appendChild(a);
        ul.appendChild(li);
      });
    });
  }

  function buildCollections() {
    var host = $('[data-build="collections"]');
    if (!host) return;
    host.innerHTML = '';
    var items = Array.isArray(CONTENT.collections) ? CONTENT.collections : [];
    items.forEach(function (c, i) {
      var a = document.createElement('a');
      a.className = 'collection-card fade-up';
      a.setAttribute('href', '#products');
      a.style.transitionDelay = (i * 110) + 'ms';

      var media = document.createElement('span');
      media.className = 'imgwrap imgwrap-portrait';
      var img = document.createElement('img');
      img.setAttribute('src', c.image || '');
      img.setAttribute('alt', c.alt || c.name || '');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      wireImage(img);
      media.appendChild(img);

      var meta = document.createElement('span');
      meta.className = 'collection-meta';
      var nm = document.createElement('span');
      nm.className = 'collection-name';
      nm.textContent = c.name || '';
      var arrow = document.createElement('span');
      arrow.className = 'collection-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      meta.appendChild(nm);
      meta.appendChild(arrow);

      var note = document.createElement('span');
      note.className = 'collection-note';
      note.textContent = c.note || '';

      a.appendChild(media);
      a.appendChild(meta);
      a.appendChild(note);
      host.appendChild(a);
    });
  }

  function buildProducts() {
    var host = $('[data-build="products"]');
    if (!host) return;
    host.innerHTML = '';
    state.products.forEach(function (p, i) {
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'product-card fade-up';
      card.style.transitionDelay = (i * 110) + 'ms';
      card.setAttribute('aria-label', (p.name || 'Piece') + ' — view details');
      card.setAttribute('data-index', String(i));

      var media = document.createElement('span');
      media.className = 'product-media';
      var wrap = document.createElement('span');
      wrap.className = 'imgwrap imgwrap-portrait';
      var img = document.createElement('img');
      img.setAttribute('src', p.image || '');
      img.setAttribute('alt', p.alt || p.name || '');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      wireImage(img);
      wrap.appendChild(img);
      var sweep = document.createElement('span');
      sweep.className = 'sweep';
      sweep.setAttribute('aria-hidden', 'true');
      media.appendChild(wrap);
      media.appendChild(sweep);

      var info = document.createElement('span');
      info.className = 'product-info';
      var name = document.createElement('span');
      name.className = 'product-name';
      name.textContent = p.name || '';
      var mat = document.createElement('span');
      mat.className = 'product-material';
      mat.textContent = p.material || '';
      var price = document.createElement('span');
      price.className = 'product-price';
      price.textContent = formatPrice(p);
      info.appendChild(name);
      info.appendChild(mat);
      info.appendChild(price);

      card.appendChild(media);
      card.appendChild(info);
      card.addEventListener('click', function () { openQuickView(i); });
      host.appendChild(card);
    });
  }

  function buildTimeline() {
    var host = $('[data-build="timeline"]');
    if (!host) return;
    host.innerHTML = '';
    var steps = getPath(CONTENT, 'craftsmanship.steps');
    if (!Array.isArray(steps)) return;
    steps.forEach(function (s) {
      var li = document.createElement('div');
      li.className = 'timeline-step';
      li.setAttribute('role', 'listitem');
      var era = document.createElement('p');
      era.className = 'timeline-era';
      era.textContent = s.era || '';
      var t = document.createElement('h3');
      t.className = 'timeline-title';
      t.textContent = s.title || '';
      var txt = document.createElement('p');
      txt.className = 'timeline-text';
      txt.textContent = s.text || '';
      li.appendChild(era);
      li.appendChild(t);
      li.appendChild(txt);
      host.appendChild(li);
    });
  }

  function buildStory() {
    var host = $('[data-build="storyBody"]');
    if (!host) return;
    host.innerHTML = '';
    var paras = getPath(CONTENT, 'story.body');
    if (!Array.isArray(paras)) return;
    paras.forEach(function (para) {
      var p = document.createElement('p');
      p.textContent = String(para);
      host.appendChild(p);
    });
  }

  /* ---------------- images: skeleton + elegant fallback ---------------- */

  function wireImage(img) {
    if (!img) return;
    var wrap = img.closest ? img.closest('.imgwrap') : null;
    function done() { if (wrap) wrap.classList.add('is-loaded'); }
    function fail() {
      if (!wrap) return;
      wrap.classList.add('is-loaded');
      var fb = document.createElement('div');
      fb.className = 'img-fallback';
      fb.setAttribute('aria-hidden', 'true');
      fb.textContent = state.monogram;
      try { img.remove(); } catch (e) { /* noop */ }
      wrap.appendChild(fb);
    }
    if (img.complete && img.naturalWidth > 0) { done(); return; }
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', fail, { once: true });
  }

  function wireAllImages() {
    $all('.imgwrap img').forEach(wireImage);
  }

  /* ---------------- reveals ---------------- */

  function initReveals() {
    var targets = $all('.fade-up, .curtain-mask, .page-reveal');
    if (!targets.length) return;
    if (REDUCED || typeof IntersectionObserver === 'undefined') {
      targets.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    function onEnter(entries, observer) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          observer.unobserve(en.target);
        }
      });
    }
    var io = new IntersectionObserver(onEnter, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    /* curtains open as soon as any part of the plate is on screen — at 18%
       the hero plate stayed behind a page-coloured curtain on first paint */
    var curtains = new IntersectionObserver(onEnter, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    targets.forEach(function (el) {
      if (el.classList.contains('page-reveal')) return;
      (el.classList.contains('curtain-mask') ? curtains : io).observe(el);
    });
    /* .page-reveal starts behind a fully-closed clip-path, and Chrome's
       IntersectionObserver clips a target by its own clip-path — it never
       reported as intersecting, so the pull quote stayed blank. It is
       watched by its layout box instead. */
    watchLayoutBox($all('.page-reveal'), function (el) { el.classList.add('in-view'); });
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
      var vh = window.innerHeight || document.documentElement.clientHeight || 800;
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

  /* ---------------- material motion ---------------- */

  function initMotion() {
    if (REDUCED || !FINE_POINTER) return;

    // magnetic headline — words drift ≤3px toward the cursor
    var h1 = $('.hero-title[data-magnetic]');
    if (h1 && h1.textContent.trim()) {
      var words = h1.textContent.trim().split(/\s+/);
      h1.setAttribute('aria-label', h1.textContent.trim());
      h1.innerHTML = '';
      var spans = words.map(function (w) {
        var s = document.createElement('span');
        s.textContent = w;
        s.style.display = 'inline-block';
        s.style.willChange = 'transform';
        s.setAttribute('aria-hidden', 'true');
        h1.appendChild(s);
        h1.appendChild(document.createTextNode(' '));
        return s;
      });

      var hero = $('#hero');
      if (hero) {
        var mx = 0, my = 0, cx = 0, cy = 0, raf = null;
        hero.addEventListener('mousemove', function (e) {
          var r = hero.getBoundingClientRect();
          mx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
          my = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
          if (!raf) raf = requestAnimationFrame(tick);
        });
        hero.addEventListener('mouseleave', function () {
          mx = 0; my = 0;
          if (!raf) raf = requestAnimationFrame(tick);
        });
        function tick() {
          raf = null;
          cx += (mx - cx) * 0.12;
          cy += (my - cy) * 0.12;
          /* settle exactly on the target (snapping to 0 when the pointer
             rested inside the hero made the words jump) */
          var settled = Math.abs(mx - cx) <= 0.001 && Math.abs(my - cy) <= 0.001;
          if (settled) { cx = mx; cy = my; }
          spans.forEach(function (s, i) {
            var phase = 1 - (i / Math.max(spans.length, 1)) * 0.4;
            s.style.transform = 'translate(' + (cx * 6 * phase).toFixed(2) + 'px,' + (cy * 6 * phase).toFixed(2) + 'px)';
          });
          if (!settled) raf = requestAnimationFrame(tick);
        }
      }
    }

    // cursor depth on the hero plate + caption. (The scroll-velocity offset
    // on the figure was removed: it accumulated raw wheel deltas and made
    // the hero plate jolt and shiver while scrolling.)
    var depthWrap = $('[data-depth-wrap]');
    var layers = $all('[data-depth]');
    if (depthWrap && layers.length) {
      var tx = 0, ty = 0, px = 0, py = 0, draf = null;
      depthWrap.addEventListener('mousemove', function (e) {
        var r = depthWrap.getBoundingClientRect();
        tx = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
        ty = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
        if (!draf) draf = requestAnimationFrame(dtick);
      });
      depthWrap.addEventListener('mouseleave', function () {
        tx = 0; ty = 0;
        if (!draf) draf = requestAnimationFrame(dtick);
      });
      function dtick() {
        draf = null;
        px += (tx - px) * 0.08;
        py += (ty - py) * 0.08;
        var settled = Math.abs(tx - px) <= 0.0005 && Math.abs(ty - py) <= 0.0005;
        if (settled) { px = tx; py = ty; }
        layers.forEach(function (el) {
          var d = parseFloat(el.getAttribute('data-depth')) || 8;
          el.style.transform = 'translate3d(' + (px * d * 2).toFixed(2) + 'px,' + (py * d * 2).toFixed(2) + 'px,0)';
        });
        if (!settled) draf = requestAnimationFrame(dtick);
      }
    }
  }

  /* ---------------- quick view ---------------- */

  var qvState = { open: false, lastFocus: null };

  function qvEls() {
    return {
      panel: $('#qvPanel'),
      backdrop: $('#qvBackdrop'),
      close: $('#qvClose'),
      img: $('#qvImage'),
      name: $('#qvName'),
      price: $('#qvPrice'),
      material: $('#qvMaterial'),
      stone: $('#qvStone'),
      desc: $('#qvDesc')
    };
  }

  function openQuickView(i) {
    var p = state.products[i];
    var els = qvEls();
    if (!p || !els.panel || !els.backdrop) return;

    setText(els.name, p.name);
    setText(els.price, formatPrice(p));
    setText(els.material, p.material);
    setText(els.stone, p.stone);
    setText(els.desc, p.description);
    if (els.img) {
      els.img.setAttribute('src', p.image || '');
      els.img.setAttribute('alt', p.alt || p.name || '');
      var w = els.img.closest ? els.img.closest('.imgwrap') : null;
      if (w) w.classList.remove('is-loaded');
      wireImage(els.img);
    }

    qvState.lastFocus = document.activeElement;
    els.panel.hidden = false;
    els.backdrop.hidden = false;
    document.body.style.overflow = 'hidden';

    // morph: a travelling plate grows from the card's position into the panel
    var card = $all('.product-card')[i];
    var thumb = card ? $('img', card) : null;
    var ghost = null;
    if (!REDUCED && thumb && els.img) {
      try {
        var r = thumb.getBoundingClientRect();
        ghost = document.createElement('div');
        ghost.className = 'qv-ghost';
        ghost.style.backgroundImage = 'url("' + (p.image || '') + '")';
        ghost.style.top = r.top + 'px';
        ghost.style.left = r.left + 'px';
        ghost.style.width = r.width + 'px';
        ghost.style.height = r.height + 'px';
        document.body.appendChild(ghost);
      } catch (e) { ghost = null; }
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        els.panel.classList.add('open');
        els.backdrop.classList.add('open');
        if (ghost && els.img) {
          try {
            var t = els.img.getBoundingClientRect();
            ghost.style.top = t.top + 'px';
            ghost.style.left = t.left + 'px';
            ghost.style.width = t.width + 'px';
            ghost.style.height = t.height + 'px';
            ghost.style.opacity = '0';
            setTimeout(function () {
              try { ghost.remove(); } catch (e) { /* noop */ }
            }, 750);
          } catch (e) {
            try { ghost.remove(); } catch (e2) { /* noop */ }
          }
        }
      });
    });

    qvState.open = true;
    qvState.lastOpened = i;
    if (els.close) els.close.focus();
  }

  function closeQuickView() {
    var els = qvEls();
    if (!els.panel || !els.backdrop || !qvState.open) return;
    els.panel.classList.remove('open');
    els.backdrop.classList.remove('open');
    qvState.open = false;
    setTimeout(function () {
      els.panel.hidden = true;
      els.backdrop.hidden = true;
      document.body.style.overflow = '';
      if (qvState.lastFocus && qvState.lastFocus.focus) {
        try { qvState.lastFocus.focus(); } catch (e) { /* noop */ }
      }
    }, REDUCED ? 0 : 680);
  }

  function initQuickView() {
    var els = qvEls();
    if (els.close) els.close.addEventListener('click', closeQuickView);
    if (els.backdrop) els.backdrop.addEventListener('click', closeQuickView);
    var cta = $('#qvCta');
    if (cta) cta.addEventListener('click', closeQuickView);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && qvState.open) closeQuickView();
    });
  }

  /* ---------------- in-page links: smooth glide in JS ----------------
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
      try { target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------------- contact form (demo) ---------------- */

  function initForm() {
    var form = $('#contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fName');
      var contact = $('#fContact');
      var ok = true;
      [name, contact].forEach(function (f) {
        if (f && !f.value.trim()) {
          ok = false;
          f.style.borderBottomColor = 'var(--color-accent)';
          f.addEventListener('input', function h() {
            f.style.borderBottomColor = '';
            f.removeEventListener('input', h);
          });
        }
      });
      if (!ok) return;
      var t = getPath(CONTENT, 'form.successTitle') || 'Received with thanks.';
      var b = getPath(CONTENT, 'form.successBody') || '';
      form.innerHTML =
        '<div class="form-success" role="status">' +
        '<span class="seal" aria-hidden="true">' + escapeHtml(state.monogram) + '</span>' +
        '<h3>' + escapeHtml(t) + '</h3>' +
        '<p>' + escapeHtml(b) + '</p>' +
        '</div>';
    });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------------- customization ---------------- */

  function setVar(name, value) {
    try {
      if (document.documentElement && document.documentElement.style) {
        document.documentElement.style.setProperty(name, value);
      }
    } catch (e) { /* noop */ }
  }

  function themePulse() {
    try {
      var root = document.documentElement;
      if (!root || !root.classList) return;
      root.classList.add('theming');
      setTimeout(function () { root.classList.remove('theming'); }, 750);
    } catch (e) { /* noop */ }
  }

  function injectFontPair(pair) {
    try {
      var parts = String(pair).split('|');
      var display = (parts[0] || '').trim();
      var body = (parts[1] || '').trim();
      if (!display && !body) return;
      if (display) setVar('--font-display', "'" + display + "', Georgia, serif");
      if (body) setVar('--font-body', "'" + body + "', 'Helvetica Neue', Arial, sans-serif");
      var fam = [];
      if (display) fam.push('family=' + encodeURIComponent(display).replace(/%20/g, '+') + ':wght@400;700');
      if (body) fam.push('family=' + encodeURIComponent(body).replace(/%20/g, '+') + ':wght@400;500;600');
      if (!fam.length) return;
      var link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', 'https://fonts.googleapis.com/css2?' + fam.join('&') + '&display=swap');
      var head = document.head || $('head');
      if (head) head.appendChild(link);
    } catch (e) { /* noop */ }
  }

  function refreshPrices() {
    $all('.product-card').forEach(function (card) {
      var i = parseInt(card.getAttribute('data-index'), 10);
      var priceEl = $('.product-price', card);
      if (!isNaN(i) && state.products[i] && priceEl) {
        setText(priceEl, formatPrice(state.products[i]));
      }
    });
    var els = qvEls();
    if (qvState.open && els.price && qvState.lastOpened != null && state.products[qvState.lastOpened]) {
      setText(els.price, formatPrice(state.products[qvState.lastOpened]));
    }
  }

  window.applyCustomization = function (custom) {
    try {
      custom = custom || {};
      var changed = false;

      if (custom.primaryColor) { setVar('--color-primary', String(custom.primaryColor)); changed = true; }
      if (custom.accentColor) { setVar('--color-accent', String(custom.accentColor)); changed = true; }

      if (custom.fontPair) { injectFontPair(custom.fontPair); changed = true; }

      if (custom.brandName) {
        state.brandName = String(custom.brandName);
        $all('[data-content="brand.name"]').forEach(function (el) { setText(el, state.brandName); });
        try { document.title = state.brandName + ' — ' + (getPath(CONTENT, 'brand.tagline') || ''); } catch (e) {}
        renderFooterLine();
      }

      if (custom.logoText) {
        state.monogram = String(custom.logoText).charAt(0).toUpperCase() || state.monogram;
        $all('[data-content="brand.monogram"]').forEach(function (el) { setText(el, state.monogram); });
        $all('.img-fallback').forEach(function (el) { setText(el, state.monogram); });
      }

      if (custom.currency) {
        state.currency = String(custom.currency);
        state.products.forEach(function (p) { p.currency = state.currency; });
        refreshPrices();
      }

      if (custom.heroImage) {
        var heroImg = $('#heroImage');
        if (heroImg) {
          var w = heroImg.closest ? heroImg.closest('.imgwrap') : null;
          if (w) w.classList.remove('is-loaded');
          heroImg.setAttribute('src', String(custom.heroImage));
          wireImage(heroImg);
        }
      }

      if (custom.contactEmail) {
        var em = String(custom.contactEmail);
        $all('[data-content="contact.email"]').forEach(function (el) {
          setText(el, em);
          if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + em.trim());
        });
      }

      if (custom.instagramUrl) {
        var ig = String(custom.instagramUrl);
        $all('[data-urlkey="contact.instagram"]').forEach(function (el) {
          el.setAttribute('href', ig);
        });
      }

      if (Array.isArray(custom.productNames)) {
        custom.productNames.forEach(function (nm, i) {
          if (nm == null || !state.products[i]) return;
          state.products[i].name = String(nm);
          var card = $all('.product-card')[i];
          var nameEl = card ? $('.product-name', card) : null;
          if (nameEl) setText(nameEl, state.products[i].name);
        });
      }

      if (custom.productImages && typeof custom.productImages === 'object') {
        Object.keys(custom.productImages).forEach(function (k) {
          var i = parseInt(k, 10);
          var url = custom.productImages[k];
          if (isNaN(i) || !url || !state.products[i]) return;
          state.products[i].image = String(url);
          var card = $all('.product-card')[i];
          var img = card ? $('img', card) : null;
          if (img) {
            var w = img.closest ? img.closest('.imgwrap') : null;
            if (w) w.classList.remove('is-loaded');
            img.setAttribute('src', String(url));
            wireImage(img);
          }
        });
      }

      if (changed) themePulse();
      return true;
    } catch (e) {
      return false; // never throw on partial input
    }
  };

  function renderFooterLine() {
    var line = getPath(CONTENT, 'footer.line');
    if (!line) return;
    var original = getPath(CONTENT, 'brand.name') || '';
    var out = original && state.brandName !== original
      ? String(line).split(original).join(state.brandName)
      : String(line);
    $all('[data-content="footer.line"]').forEach(function (el) { setText(el, out); });
  }

  function applyUrlParams() {
    try {
      var search = (typeof window !== 'undefined' && window.location && window.location.search) || '';
      if (!search) return;
      var q = new URLSearchParams(search);
      var custom = {};
      if (q.get('brand')) custom.brandName = q.get('brand');
      if (q.get('primary')) custom.primaryColor = q.get('primary');
      if (q.get('accent')) custom.accentColor = q.get('accent');
      if (Object.keys(custom).length) window.applyCustomization(custom);
    } catch (e) { /* file:// safe */ }
  }

  /* ---------------- init ---------------- */

  function init() {
    renderText();
    buildNav();
    buildCollections();
    buildProducts();
    buildTimeline();
    buildStory();
    wireAllImages();
    initReveals();
    initMotion();
    initQuickView();
    initForm();
    initAnchorScroll();
    applyUrlParams();
  }

  if (typeof document !== 'undefined' && document.addEventListener) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();
