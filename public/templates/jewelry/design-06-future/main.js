/* ============================================================
   Kela Jewels · design-06-future · main.js
   Vanilla JS. Renders ALL text from window.TEMPLATE_CONTENT.
   Guards every selector — zero console errors is the bar.
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

  var win = (typeof window !== 'undefined') ? window : {};
  var doc = (typeof document !== 'undefined') ? document : null;
  var content = win.TEMPLATE_CONTENT || {};

  var reducedMotion = !!(win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var hasIO = (typeof IntersectionObserver !== 'undefined');
  var hasRAF = (typeof win.requestAnimationFrame === 'function');
  var raf = hasRAF ? win.requestAnimationFrame.bind(win) : function (fn) { return setTimeout(fn, 16); };

  /* ---------- tiny helpers ---------- */
  function $(sel, root) {
    try { return (root || doc).querySelector(sel); } catch (e) { return null; }
  }
  function $all(sel, root) {
    try { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function path(obj, dotted) {
    var parts = String(dotted).split('.'), cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  function setText(elm, val) { if (elm && val != null) elm.textContent = String(val); }
  function formatINR(n) {
    n = Math.round(Number(n) || 0);
    var s = String(n);
    var last3 = s.slice(-3), rest = s.slice(0, -3);
    if (rest) return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
    return last3;
  }
  function priceOf(p) { return (p.currency || contentCurrency() || '₹') + ' ' + formatINR(p.price); }
  function contentCurrency() {
    var items = path(content, 'products');
    return (items && items[0] && items[0].currency) || '₹';
  }
  function brandInitial() {
    var name = path(content, 'brand.name') || 'K';
    return String(name).trim().charAt(0).toUpperCase() || 'K';
  }

  /* Keep references to rendered product nodes for applyCustomization */
  var productNodes = [];
  var heroImgEl = null;

  /* ---------- render ---------- */
  function renderDataContent() {
    if (!doc) return;
    $all('[data-content]').forEach(function (elm) {
      var key = elm.getAttribute('data-content');
      if (!key) return;
      if (key === 'brand.initial') { setText(elm, brandInitial()); return; }
      var val = path(content, key);
      if (val == null) return;
      setText(elm, val);
      var hrefKind = elm.getAttribute('data-href');
      if (elm.tagName === 'A' && hrefKind) applyHref(elm, hrefKind, val);
    });
    if (doc.documentElement) doc.documentElement.setAttribute('data-brand-initial', brandInitial());
    var name = path(content, 'brand.name');
    if (name) doc.title = name + ' — ' + (path(content, 'brand.tagline') || '');
  }

  function applyHref(a, kind, val) {
    if (!a) return;
    if (kind === 'tel') a.setAttribute('href', 'tel:' + String(val).replace(/[^+\d]/g, ''));
    else if (kind === 'mailto') a.setAttribute('href', 'mailto:' + String(val).trim());
    else if (kind.indexOf('url:') === 0) {
      var u = path(content, kind.slice(4));
      if (u) a.setAttribute('href', u);
    }
  }

  var NAV_TARGETS = { collections: 'collections', pieces: 'products', atelier: 'craftsmanship', story: 'story', contact: 'contact' };
  function renderNav() {
    var links = content.nav || [];
    var holders = [$ ('#nav-links'), $('#mobile-links'), $('#footer-nav')].filter(Boolean);
    if (!holders.length) return;
    holders.forEach(function (holder, hi) {
      holder.innerHTML = '';
      links.forEach(function (label) {
        var slug = String(label).toLowerCase().replace(/[^a-z]+/g, '');
        var target = NAV_TARGETS[slug] || slug;
        var a = doc.createElement('a');
        a.href = '#' + target;
        a.textContent = label;
        if (hi === 1) a.addEventListener('click', closeMobileMenu);
        holder.appendChild(a);
      });
    });
    var cta = $('.nav-cta');
    if (cta && content.navCta) setText(cta, content.navCta);
  }

  function skeletonWrap(img) {
    var wrap = doc.createElement('div');
    wrap.className = 'img-wrap';
    wrap.appendChild(img);
    return wrap;
  }

  /* dark skeleton shimmer until each image loads. A failed image swaps to the
     brand-initial fallback (JS-built cards have no inline onerror, so a
     broken product photo used to show alt text over an empty frame). */
  function initSkeletons() {
    $all('.img-wrap img').forEach(function (img) {
      var wrap = img.parentNode;
      if (!wrap || !wrap.classList || !wrap.classList.contains('img-wrap')) return;
      function done() { wrap.classList.add('loaded'); }
      function fail() {
        done();
        if (win.__kelaImgFallback) win.__kelaImgFallback(img);
      }
      if (img.complete) {
        if (img.naturalWidth > 0) done();
        else if (img.getAttribute('src')) fail();
      } else {
        img.addEventListener('load', done);
        img.addEventListener('error', fail);
      }
    });
  }

  function renderCollections() {
    var grid = $('#collections-grid');
    if (!grid) return;
    var items = path(content, 'collections') || [];
    grid.innerHTML = '';
    items.forEach(function (c, i) {
      var card = doc.createElement('a');
      card.className = 'collection-card reveal reveal-d' + (i % 3);
      card.href = '#products';
      var img = doc.createElement('img');
      img.src = c.image || '';
      img.alt = (c.name || 'Collection') + ' — ' + (path(content, 'brand.name') || '');
      img.loading = 'lazy';
      img.decoding = 'async';
      var veil = doc.createElement('div'); veil.className = 'card-veil';
      var meta = doc.createElement('div'); meta.className = 'collection-meta';
      var left = doc.createElement('div');
      var nm = doc.createElement('div'); nm.className = 'collection-name'; nm.textContent = c.name || '';
      var note = doc.createElement('div'); note.className = 'collection-note'; note.textContent = c.note || '';
      left.appendChild(nm); left.appendChild(note);
      var idx = doc.createElement('div'); idx.className = 'collection-index'; idx.textContent = '0' + (i + 1);
      meta.appendChild(left); meta.appendChild(idx);
      card.appendChild(skeletonWrap(img));
      card.appendChild(veil); card.appendChild(meta);
      grid.appendChild(card);
    });
  }

  function renderProducts() {
    var grid = $('#products-grid');
    if (!grid) return;
    var items = path(content, 'products') || [];
    grid.innerHTML = '';
    productNodes = [];
    items.forEach(function (p, i) {
      var card = doc.createElement('button');
      card.type = 'button';
      card.className = 'product-card reveal reveal-d' + (i % 4);
      card.setAttribute('aria-label', 'Quick view: ' + (p.name || 'piece'));
      var img = doc.createElement('img');
      img.src = p.image || '';
      img.alt = (p.name || 'Piece') + ' — ' + (p.material || '') + ' ' + (p.stone || '');
      img.loading = 'lazy';
      img.decoding = 'async';
      var wrap = skeletonWrap(img);
      var info = doc.createElement('div'); info.className = 'product-info';
      var nm = doc.createElement('div'); nm.className = 'product-name'; nm.textContent = p.name || '';
      var specs = doc.createElement('div'); specs.className = 'product-specs micro';
      specs.textContent = [p.material, p.stone].filter(Boolean).join(' · ');
      var row = doc.createElement('div'); row.className = 'product-row';
      var pr = doc.createElement('div'); pr.className = 'product-price'; pr.textContent = priceOf(p);
      var vw = doc.createElement('span'); vw.className = 'product-view';
      vw.innerHTML = 'Quick view <i>→</i>';
      row.appendChild(pr); row.appendChild(vw);
      info.appendChild(nm); info.appendChild(specs); info.appendChild(row);
      card.appendChild(wrap); card.appendChild(info);
      (function (index) {
        card.addEventListener('click', function () { openQuickView(index); });
        card.addEventListener('touchstart', function () {
          card.classList.add('tapped');
          setTimeout(function () { card.classList.remove('tapped'); }, 1300);
        }, { passive: true });
      })(i);
      grid.appendChild(card);
      productNodes.push({ card: card, nameEl: nm, specsEl: specs, priceEl: pr, imgEl: img });
    });
  }

  function renderCraft() {
    var steps = $('#craft-steps');
    if (steps) {
      var list = path(content, 'craftsmanship.steps') || [];
      steps.innerHTML = '';
      list.forEach(function (s, i) {
        var li = doc.createElement('li');
        li.className = 'reveal reveal-d' + (i % 3);
        var n = doc.createElement('span'); n.className = 'step-n'; n.textContent = '0' + (i + 1);
        var t = doc.createElement('span'); t.textContent = s;
        li.appendChild(n); li.appendChild(t);
        steps.appendChild(li);
      });
    }
    var img = $('[data-craft-img]');
    var src = path(content, 'craftsmanship.image');
    if (img && src) { img.src = src; }
  }

  function renderStory() {
    var body = $('#story-body');
    if (body) {
      var text = path(content, 'story.body') || '';
      body.innerHTML = '';
      String(text).split(/\n\n+/).forEach(function (para) {
        if (!para.trim()) return;
        var p = doc.createElement('p');
        p.textContent = para.trim();
        body.appendChild(p);
      });
    }
    var img = $('[data-story-img]');
    var src = path(content, 'story.image');
    if (img && src) img.src = src;
  }

  /* ---------- reveals: vertical-crop + soft-scale ---------- */
  function initReveals() {
    var els = $all('.reveal');
    if (!els.length) return;
    if (!hasIO || reducedMotion) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- layered scroll parallax ----------
     A pure function of scroll position, applied once per frame. It writes the
     separate `translate` property so it composes with the reveal's
     `transform` — the reveal's 1.1s transform transition used to chase every
     parallax write (laggy wobble). The old velocity boost and per-scroll
     will-change toggling were removed: noisy wheel deltas made the viewer
     shiver, and toggling will-change rebuilt layers mid-scroll. */
  function initParallax() {
    var layers = $all('[data-parallax]');
    if (!layers.length || reducedMotion || !hasRAF) return;
    var queued = false;
    function render() {
      queued = false;
      var vh = win.innerHeight || 800;
      var rects = layers.map(function (elm) { return elm.getBoundingClientRect(); });
      layers.forEach(function (elm, i) {
        var r = rects[i];
        if (r.bottom < -200 || r.top > vh + 200) return; /* pause offscreen work */
        var f = parseFloat(elm.getAttribute('data-parallax')) || 0.06;
        var applied = parseFloat(elm.getAttribute('data-py')) || 0;
        /* measure from the layout position (minus our own offset) so the
           result never feeds back into itself */
        var center = r.top - applied + r.height / 2;
        var t = Math.max(-40, Math.min(40, (center - vh / 2) * f));
        elm.setAttribute('data-py', t.toFixed(1));
        elm.style.translate = '0 ' + t.toFixed(1) + 'px';
      });
    }
    function queue() { if (!queued) { queued = true; raf(render); } }
    win.addEventListener('scroll', queue, { passive: true });
    win.addEventListener('resize', queue);
    queue();
  }

  /* ---------- magnetic headline (≤3px) ---------- */
  function initMagnetic() {
    var title = $('#hero-title');
    if (!title || reducedMotion) return;
    var text = title.textContent;
    title.setAttribute('aria-label', text);
    title.innerHTML = '';
    /* letters inside no-wrap word groups with real spaces between them —
       one inline-block per letter (and NBSP spaces) broke the headline
       mid-word: "Shadow, engine / ered into light." */
    String(text).split(/\s+/).filter(Boolean).forEach(function (word, wi) {
      if (wi > 0) title.appendChild(doc.createTextNode(' '));
      var w = doc.createElement('span');
      w.className = 'cw';
      w.setAttribute('aria-hidden', 'true');
      Array.from(word).forEach(function (ch) {
        var s = doc.createElement('span');
        s.className = 'ch';
        s.textContent = ch;
        w.appendChild(s);
      });
      title.appendChild(w);
    });
    var chars = $all('.ch', title);
    var hero = $('#hero');
    if (!hero) return;
    /* eased in JS, one write per frame while it moves (a CSS transition
       restarted on every mousemove fought the pointer) */
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var weights = chars.map(function (c, i) { return 1 - Math.abs(i / chars.length - 0.5) * 0.6; });
    function frame() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (Math.abs(tx - cx) < 0.005 && Math.abs(ty - cy) < 0.005) { cx = tx; cy = ty; running = false; }
      chars.forEach(function (c, i) {
        var w = weights[i];
        c.style.transform = (cx || cy) ? 'translate3d(' + (cx * 3 * w).toFixed(2) + 'px,' + (cy * 3 * w).toFixed(2) + 'px,0)' : '';
      });
      if (running) requestAnimationFrame(frame);
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
    hero.addEventListener('mousemove', function (ev) {
      var r = title.getBoundingClientRect();
      var mx = r.left + r.width / 2, my = r.top + r.height / 2;
      tx = Math.max(-1, Math.min(1, (ev.clientX - mx) / (r.width / 2 || 1)));
      ty = Math.max(-1, Math.min(1, (ev.clientY - my) / (r.height / 2 || 1)));
      kick();
    }, { passive: true });
    hero.addEventListener('mouseleave', function () { tx = 0; ty = 0; kick(); });
  }

  /* ---------- 360° concept viewer ---------- */
  function initViewer() {
    var frame = $('#viewer-frame'), base = $('#viewer-base'),
        sheen = $('#viewer-sheen'), glow = $('#viewer-glow'),
        hint = $('#viewer-hint'), angleEl = $('#viewer-angle'),
        viewer = $('#viewer-360');
    if (!frame || !base) return;
    heroImgEl = base;

    var MIN = -75, MAX = 75;
    var angle = 0, velocity = 0, dragging = false, startX = 0, startAngle = 0;
    var lastInteract = 0, visible = true, rafId = 0, interacted = false;

    var lastFilter = '', lastLabel = '';
    function apply() {
      var p = (angle - MIN) / (MAX - MIN); /* 0..1 */
      if (base) {
        base.style.transform = 'perspective(900px) rotateY(' + (angle * 0.05).toFixed(2) +
          'deg) translateX(' + (angle / MAX * 8).toFixed(1) + 'px) scale(1.06)';
        /* filter/text only when they actually change — the idle drift runs
           every frame and each filter write repaints the photo */
        var f = 'brightness(' + (1 + (angle / MAX) * 0.06).toFixed(3) + ')';
        if (f !== lastFilter) { base.style.filter = f; lastFilter = f; }
      }
      if (frame) frame.style.setProperty('--sheen-p', p.toFixed(3));
      if (glow) glow.style.transform = 'translateX(' + (-(angle / MAX) * 7).toFixed(1) + 'px)';
      var label = String(Math.round(angle - MIN)).padStart(3, '0') + '°';
      if (angleEl && label !== lastLabel) { angleEl.textContent = label; lastLabel = label; }
    }

    function loop(t) {
      rafId = 0;
      if (dragging) return; /* during drag, pointermove drives apply() directly */
      var idle = !reducedMotion && visible && (Date.now() - lastInteract > 5000);
      if (idle) {
        /* idle studio drift — killed entirely under reduced motion */
        angle += (10 * Math.sin((t || 0) / 2600) - angle) * 0.02;
        apply();
        rafId = raf(loop);
      } else if (Math.abs(velocity) > 0.02 && !reducedMotion) {
        angle += velocity; velocity *= 0.94;
        if (angle < MIN) { angle = MIN; velocity = 0; }
        if (angle > MAX) { angle = MAX; velocity = 0; }
        apply();
        rafId = raf(loop);
      }
      /* otherwise: settle — loop stops, no offscreen work */
    }
    function kick() { if (!rafId) rafId = raf(loop); }

    frame.addEventListener('pointerdown', function (ev) {
      dragging = true; startX = ev.clientX; startAngle = angle; velocity = 0;
      lastInteract = Date.now();
      try { frame.setPointerCapture(ev.pointerId); } catch (e) {}
      if (!interacted && hint) { interacted = true; hint.classList.add('gone'); }
      ev.preventDefault();
    });
    frame.addEventListener('pointermove', function (ev) {
      if (!dragging) return;
      var dx = ev.clientX - startX;
      var next = startAngle + dx * 0.28;
      velocity = (next - angle) * 0.5;
      angle = Math.max(MIN, Math.min(MAX, next));
      lastInteract = Date.now();
      apply();
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false; lastInteract = Date.now();
      kick();
    }
    frame.addEventListener('pointerup', endDrag);
    frame.addEventListener('pointercancel', endDrag);

    if (hasIO && viewer) {
      new IntersectionObserver(function (entries) {
        visible = !!(entries[0] && entries[0].isIntersecting);
        if (visible) kick();
      }, { threshold: 0.05 }).observe(viewer);
    }
    apply();
    kick();
  }

  /* ---------- quick view ---------- */
  var qvIndex = -1;
  function openQuickView(i) {
    var items = path(content, 'products') || [];
    var p = items[i];
    var backdrop = $('#qv-backdrop'), panel = $('#qv-panel');
    if (!p || !backdrop || !panel) return;
    qvIndex = i;
    setText($('#qv-name'), p.name);
    setText($('#qv-specs'), [p.material, p.stone].filter(Boolean).join('  ·  '));
    setText($('#qv-desc'), p.description);
    setText($('#qv-price'), priceOf(p));
    var img = $('#qv-img');
    if (img) {
      img.removeAttribute('data-fbk');
      img.src = p.image || '';
      img.alt = (p.name || 'Piece') + ' — quick view';
      var wrap = img.closest ? img.closest('.img-wrap') : null;
      if (wrap) {
        wrap.classList.remove('loaded');
        if (img.complete && img.naturalWidth > 0) wrap.classList.add('loaded');
        else img.addEventListener('load', function h() { wrap.classList.add('loaded'); img.removeEventListener('load', h); });
      }
    }
    backdrop.hidden = false;
    /* expand-from-card morph: origin the panel's scale at the clicked card */
    try {
      var card = productNodes[i] && productNodes[i].card;
      if (card && card.getBoundingClientRect && panel.getBoundingClientRect) {
        var cr = card.getBoundingClientRect(), pr = panel.getBoundingClientRect();
        if (pr.width > 0 && pr.height > 0) {
          var ox = ((cr.left + cr.width / 2 - pr.left) / pr.width * 100).toFixed(1);
          var oy = ((cr.top + cr.height / 2 - pr.top) / pr.height * 100).toFixed(1);
          panel.style.transformOrigin =
            Math.max(0, Math.min(100, ox)) + '% ' + Math.max(0, Math.min(100, oy)) + '%';
        }
      }
    } catch (e) {}
    raf(function () { backdrop.classList.add('open'); });
    var close = $('#qv-close');
    if (close) close.focus();
    if (doc.body) doc.body.style.overflow = 'hidden';
  }
  function closeQuickView() {
    var backdrop = $('#qv-backdrop');
    if (!backdrop || backdrop.hidden) return;
    backdrop.classList.remove('open');
    setTimeout(function () { backdrop.hidden = true; }, 520);
    qvIndex = -1;
    if (doc.body) doc.body.style.overflow = '';
  }
  function initQuickView() {
    var backdrop = $('#qv-backdrop'), panel = $('#qv-panel'), close = $('#qv-close');
    if (!backdrop) return;
    if (close) close.addEventListener('click', closeQuickView);
    backdrop.addEventListener('click', function (ev) { if (ev.target === backdrop) closeQuickView(); });
    var cta = $('#qv-cta');
    if (cta) cta.addEventListener('click', closeQuickView);
    doc.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closeQuickView();
    });
  }

  /* ---------- in-page links: smooth glide in JS ----------
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
      try { target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- nav / menu / form ---------- */
  function initChrome() {
    var nav = $('#site-nav');
    function onScroll() {
      if (nav) nav.classList.toggle('scrolled', (win.pageYOffset || 0) > 24);
    }
    win.addEventListener('scroll', rafThrottle(onScroll), { passive: true });
    onScroll();

    var toggle = $('#nav-toggle'), menu = $('#mobile-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      });
    }

    var form = $('#contact-form'), confirm = $('#form-confirm');
    if (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        form.style.transition = 'opacity 0.5s ease';
        form.style.opacity = '0';
        setTimeout(function () {
          form.hidden = true;
          if (confirm) {
            confirm.hidden = false;
            confirm.style.opacity = '0';
            confirm.style.transition = 'opacity 0.8s ease';
            raf(function () { confirm.style.opacity = '1'; });
          }
        }, 500);
      });
    }
  }
  function closeMobileMenu() {
    var menu = $('#mobile-menu'), toggle = $('#nav-toggle');
    if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  /* ---------- customization contract ---------- */
  function fontsURL(display, body) {
    function fam(n) { return 'family=' + encodeURIComponent(n).replace(/%20/g, '+') + ':wght@300;400;500;600'; }
    return 'https://fonts.googleapis.com/css2?' + fam(display) + '&' + fam(body) + '&display=swap';
  }

  win.applyCustomization = function (custom) {
    custom = custom || {};
    if (!doc) return;
    var root = doc.documentElement;
    var changed = false;

    function pulse() {
      if (!doc.body || reducedMotion) return;
      doc.body.classList.add('customizing');
      setTimeout(function () { if (doc.body) doc.body.classList.remove('customizing'); }, 900);
    }

    if (custom.primaryColor && root) { root.style.setProperty('--color-primary', custom.primaryColor); changed = true; }
    if (custom.accentColor && root) { root.style.setProperty('--color-accent', custom.accentColor); changed = true; }

    if (custom.fontPair && typeof custom.fontPair === 'string' && custom.fontPair.indexOf('|') > -1) {
      var parts = custom.fontPair.split('|');
      var display = parts[0].trim(), bodyF = parts[1].trim();
      if (display && bodyF && root) {
        root.style.setProperty('--font-display', '"' + display + '", Georgia, serif');
        root.style.setProperty('--font-body', '"' + bodyF + '", "Helvetica Neue", Arial, sans-serif');
        var link = $('#fonts-link');
        if (link) link.setAttribute('href', fontsURL(display, bodyF));
        changed = true;
      }
    }

    if (custom.brandName) {
      content.brand = content.brand || {};
      content.brand.name = String(custom.brandName);
      renderDataContent(); renderNav();
      changed = true;
    }
    if (custom.logoText) {
      var logo = $('.brand-name');
      if (logo) setText(logo, custom.logoText);
      changed = true;
    }
    if (custom.heroImage && heroImgEl) {
      heroImgEl.removeAttribute('data-fbk');
      heroImgEl.src = custom.heroImage;
      changed = true;
    }
    if (custom.currency) {
      var items = path(content, 'products') || [];
      items.forEach(function (p) { p.currency = String(custom.currency); });
      productNodes.forEach(function (pn, i) { if (pn.priceEl && items[i]) setText(pn.priceEl, priceOf(items[i])); });
      var qp = $('#qv-price');
      if (qp && qvIndex > -1 && items[qvIndex]) setText(qp, priceOf(items[qvIndex]));
      changed = true;
    }
    if (custom.contactEmail) {
      content.contact = content.contact || {};
      content.contact.email = String(custom.contactEmail);
      renderDataContent(); changed = true;
    }
    if (custom.instagramUrl) {
      content.contact = content.contact || {};
      content.contact.instagram = String(custom.instagramUrl);
      renderDataContent(); changed = true;
    }
    if (Array.isArray(custom.productNames)) {
      var pitems = path(content, 'products') || [];
      custom.productNames.forEach(function (nm, i) {
        if (nm != null && pitems[i]) {
          pitems[i].name = String(nm);
          if (productNodes[i]) {
            setText(productNodes[i].nameEl, pitems[i].name);
            productNodes[i].card.setAttribute('aria-label', 'Quick view: ' + pitems[i].name);
          }
        }
      });
      changed = true;
    }
    if (custom.productImages && typeof custom.productImages === 'object') {
      var qitems = path(content, 'products') || [];
      Object.keys(custom.productImages).forEach(function (k) {
        var i = parseInt(k, 10);
        var url = custom.productImages[k];
        if (!isNaN(i) && url && qitems[i] && productNodes[i]) {
          qitems[i].image = String(url);
          var im = productNodes[i].imgEl;
          if (im) { im.removeAttribute('data-fbk'); im.src = qitems[i].image; }
        }
      });
      changed = true;
    }

    if (changed) pulse();
  };

  function applyURLParams() {
    try {
      if (!win.location || !win.location.search) return;
      var q = new win.URLSearchParams(win.location.search);
      var c = {};
      if (q.get('brand')) c.brandName = q.get('brand');
      if (q.get('primary')) c.primaryColor = q.get('primary');
      if (q.get('accent')) c.accentColor = q.get('accent');
      if (c.brandName || c.primaryColor || c.accentColor) win.applyCustomization(c);
    } catch (e) { /* URLSearchParams unavailable — ignore */ }
  }

  /* ---------- init ---------- */
  function init() {
    renderDataContent();
    renderNav();
    renderCollections();
    renderProducts();
    renderCraft();
    renderStory();
    initSkeletons();
    initReveals();
    initParallax();
    initMagnetic();
    initViewer();
    initQuickView();
    initChrome();
    initAnchorScroll();
    applyURLParams();
  }

  if (doc) {
    if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', init);
    else init();
  }
})();
