/* ============================================================
   Kela Jewels · design-01-editorial · main.js
   Vanilla JS. Renders all copy from window.TEMPLATE_CONTENT,
   cinematic reveals, cursor depth + magnetic type, quick view,
   and the window.applyCustomization contract.
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

  /* ---------- environment ---------- */
  var REDUCED = false;
  var FINE_POINTER = false;
  try {
    REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    FINE_POINTER = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  } catch (e) { /* matchMedia unavailable — stay conservative */ }

  var MOTION = !REDUCED && FINE_POINTER;

  /* ---------- tiny helpers ---------- */
  function $(sel, ctx) {
    try { return (ctx || document).querySelector(sel); }
    catch (e) { return null; }
  }
  function $all(sel, ctx) {
    try { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function getPath(obj, path) {
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== 'object') return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* Runtime state the customizer can mutate. */
  var state = {
    currency: (C.products && C.products[0] && C.products[0].currency) || '₹',
    brandName: (C.brand && C.brand.name) || 'Kela Jewels',
    brandInitial: 'K'
  };

  function brandInitialOf(name) {
    var s = String(name || '').trim();
    return s ? s.charAt(0).toUpperCase() : 'K';
  }

  function formatPrice(n) {
    var num = Number(n);
    if (!isFinite(num)) return '';
    return state.currency + num.toLocaleString('en-IN');
  }

  /* ---------- image armour: skeleton -> loaded, or elegant fallback ---------- */
  function armImage(img) {
    if (!img) return;
    var shell = img.closest('.img-shell');
    function onLoad() {
      if (shell) { shell.classList.add('is-loaded'); shell.classList.remove('is-broken'); }
    }
    function onErr() { window.__tplImgErr && window.__tplImgErr(img); }
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onErr);
    if (img.complete && img.naturalWidth > 0) onLoad();
  }

  /* Global fallback called from inline onerror attributes as well. */
  window.__tplImgErr = function (img) {
    if (!img || img.dataset.tplBroken) return;
    img.dataset.tplBroken = '1';
    var shell = img.closest ? img.closest('.img-shell') : null;
    if (shell) { shell.classList.add('is-broken'); shell.classList.remove('is-loaded'); }
  };

  /* ---------- content binding ---------- */
  function bindStaticText() {
    $all('[data-content]').forEach(function (node) {
      var val = getPath(C, node.getAttribute('data-content'));
      if (typeof val !== 'string') return;
      if (node.getAttribute('data-content').indexOf('craftsmanship.body') === 0 ||
          node.getAttribute('data-content').indexOf('story.body') === 0) {
        node.innerHTML = '';
        val.split(/\n\n+/).forEach(function (para) {
          var p = document.createElement('p');
          p.textContent = para;
          node.appendChild(p);
        });
      } else {
        node.textContent = val;
      }
    });
  }

  function setBrandInitials() {
    $all('.js-brand-initial').forEach(function (node) {
      node.textContent = state.brandInitial;
    });
  }

  /* ---------- nav ---------- */
  var NAV_TARGETS = ['#collections', '#products', '#story', '#contact'];

  function renderNav() {
    var labels = Array.isArray(C.nav) ? C.nav : [];
    var hosts = [$('#navLinks'), $('#mobileNavLinks'), $('#footerNav')];
    hosts.forEach(function (host, hi) {
      if (!host) return;
      host.innerHTML = '';
      labels.forEach(function (label, i) {
        var a = document.createElement('a');
        a.href = NAV_TARGETS[i] || '#';
        a.textContent = label;
        if (hi === 1) {
          a.addEventListener('click', function () { setMobileMenu(false); });
        }
        host.appendChild(a);
      });
    });
    var cta = $('#navCta');
    if (cta && C.ui && C.ui.navCta) cta.textContent = C.ui.navCta;
  }

  function setMobileMenu(open) {
    var menu = $('#mobileMenu');
    var toggle = $('#navToggle');
    if (!menu || !toggle) return;
    menu.classList.toggle('open', !!open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? (C.ui && C.ui.menuClose) || 'Close menu'
                                           : (C.ui && C.ui.menuOpen) || 'Open menu');
    document.body.classList.toggle('locked', !!open || qv.open);
  }

  /* ---------- hero ---------- */
  function buildHeroTitle() {
    var h1 = $('#heroTitle');
    if (!h1) return;
    var text = getPath(C, 'hero.title') || h1.textContent || '';
    h1.setAttribute('aria-label', text);
    h1.innerHTML = '';
    /* Split into words -> letter spans for magnetic type. */
    text.split(' ').forEach(function (word, wi, arr) {
      var w = document.createElement('span');
      w.className = 'mag-word';
      w.style.whiteSpace = 'nowrap';
      word.split('').forEach(function (ch) {
        var s = document.createElement('span');
        s.className = 'mag';
        s.setAttribute('aria-hidden', 'true');
        s.textContent = ch;
        w.appendChild(s);
      });
      h1.appendChild(w);
      if (wi < arr.length - 1) h1.appendChild(document.createTextNode(' '));
    });
  }

  function buildHeroCtas() {
    var p = $('#heroCtaPrimary'), s = $('#heroCtaSecondary');
    if (p && C.hero) p.textContent = C.hero.ctaPrimary || '';
    if (s && C.hero) s.textContent = C.hero.ctaSecondary || '';
  }

  /* ---------- collections ---------- */
  function renderCollections() {
    var grid = $('#collectionsGrid');
    if (!grid || !Array.isArray(C.collections)) return;
    grid.innerHTML = '';
    C.collections.forEach(function (col, i) {
      var a = document.createElement('a');
      a.className = 'collection-card rv';
      a.href = '#products';
      a.style.setProperty('--rv-delay', (i * 140) + 'ms');

      var fig = document.createElement('figure');
      fig.className = 'img-shell collection-media rv-blur';
      fig.style.margin = '0';

      var ph = document.createElement('span');
      ph.className = 'img-ph js-brand-initial';
      ph.setAttribute('aria-hidden', 'true');
      ph.textContent = state.brandInitial;

      var img = document.createElement('img');
      img.src = col.image || '';
      img.alt = col.name ? (col.name + ' — Kela Jewels collection') : 'Collection';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.setAttribute('onerror', 'window.__tplImgErr&&window.__tplImgErr(this)');

      fig.appendChild(ph); fig.appendChild(img);

      var name = document.createElement('h3');
      name.className = 'collection-name';
      var idx = document.createElement('span');
      idx.className = 'collection-index';
      idx.textContent = '0' + (i + 1);
      var label = document.createElement('span');
      label.textContent = col.name || '';
      var arrow = document.createElement('span');
      arrow.className = 'c-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      name.appendChild(idx); name.appendChild(label); name.appendChild(arrow);

      a.appendChild(fig); a.appendChild(name);
      grid.appendChild(a);
      armImage(img);
    });
  }

  /* ---------- products ---------- */
  var productRows = [];

  function productByIndex(i) {
    return (C.products && C.products[i]) || null;
  }

  function renderProducts() {
    var list = $('#productList');
    if (!list || !Array.isArray(C.products)) return;
    list.innerHTML = '';
    productRows = [];
    C.products.forEach(function (p, i) {
      var row = document.createElement('article');
      row.className = 'product-row rv' + (i % 2 === 1 ? ' flip' : '');
      row.style.setProperty('--rv-delay', (i * 120) + 'ms');
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', (p.name || 'Product') + ' — quick view');

      var media = document.createElement('div');
      media.className = 'img-shell product-media rv-blur';

      var ph = document.createElement('span');
      ph.className = 'img-ph js-brand-initial';
      ph.setAttribute('aria-hidden', 'true');
      ph.textContent = state.brandInitial;

      var img = document.createElement('img');
      img.src = p.image || '';
      img.alt = (p.name || 'Product') + ' — high jewelry by Kela Jewels';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.setAttribute('onerror', 'window.__tplImgErr&&window.__tplImgErr(this)');

      var sweep = document.createElement('span');
      sweep.className = 'sweep';
      sweep.setAttribute('aria-hidden', 'true');

      var hint = document.createElement('span');
      hint.className = 'qv-hint';
      hint.textContent = (C.ui && C.ui.quickViewHint) || 'Quick view';

      media.appendChild(ph); media.appendChild(img);
      media.appendChild(sweep); media.appendChild(hint);

      var info = document.createElement('div');
      info.className = 'product-info';

      var index = document.createElement('p');
      index.className = 'product-index';
      index.textContent = 'N° 0' + (i + 1);

      var name = document.createElement('h3');
      name.className = 'product-name js-product-name';
      name.textContent = p.name || '';

      var spec = document.createElement('p');
      spec.className = 'product-spec js-product-spec';
      spec.textContent = [p.material, p.stone].filter(Boolean).join(' · ');

      var desc = document.createElement('p');
      desc.className = 'product-desc js-product-desc';
      desc.textContent = p.description || '';

      var price = document.createElement('p');
      price.className = 'product-price js-product-price';
      price.textContent = formatPrice(p.price);

      var open = document.createElement('button');
      open.className = 'product-open';
      open.type = 'button';
      open.setAttribute('tabindex', '-1');
      var openLabel = document.createElement('span');
      openLabel.textContent = (C.ui && C.ui.quickViewHint) || 'Quick view';
      var arr = document.createElement('span');
      arr.className = 'arr';
      arr.setAttribute('aria-hidden', 'true');
      arr.textContent = '→';
      open.appendChild(openLabel); open.appendChild(arr);

      info.appendChild(index); info.appendChild(name); info.appendChild(spec);
      info.appendChild(desc); info.appendChild(price); info.appendChild(open);

      row.appendChild(media); row.appendChild(info);
      list.appendChild(row);
      productRows.push(row);
      armImage(img);

      (function (idx) {
        function activate(e) {
          if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
          if (e.type === 'keydown') e.preventDefault();
          openQuickView(idx);
        }
        row.addEventListener('click', activate);
        row.addEventListener('keydown', activate);
      })(i);
    });
  }

  /* ---------- craftsmanship points ---------- */
  function renderCraftPoints() {
    var host = $('#craftPoints');
    if (!host || !C.craftsmanship || !Array.isArray(C.craftsmanship.points)) return;
    host.innerHTML = '';
    C.craftsmanship.points.forEach(function (pt, i) {
      var li = document.createElement('li');
      li.className = 'rv';
      li.style.setProperty('--rv-delay', (i * 120 + 300) + 'ms');
      var n = document.createElement('span');
      n.className = 'cp-n'; n.textContent = pt.n || '';
      var body = document.createElement('div');
      var t = document.createElement('p');
      t.className = 'cp-t'; t.textContent = pt.t || '';
      var d = document.createElement('p');
      d.className = 'cp-d'; d.textContent = pt.d || '';
      body.appendChild(t); body.appendChild(d);
      li.appendChild(n); li.appendChild(body);
      host.appendChild(li);
    });
  }

  /* ---------- contact ---------- */
  function renderContact() {
    var c = C.contact || {};
    var email = $('#contactEmail');
    if (email && c.email) { email.textContent = c.email; email.href = 'mailto:' + c.email; }
    var phone = $('#contactPhone');
    if (phone && c.phone) phone.textContent = c.phone;
    var addr = $('#contactAddress');
    if (addr && c.address) addr.textContent = c.address;
    var ig = $('#contactInstagram');
    if (ig && c.instagram) ig.href = c.instagram;
    var submit = $('#formSubmit');
    if (submit && c.form && c.form.submit) submit.textContent = c.form.submit;
  }

  /* ---------- reveals ---------- */
  function initReveals() {
    /* NOTE: .rv-blur / .wipe / .eyebrow / .sec-title must be observed too —
       they carry their own is-visible-gated animations. */
    var els = $all('.rv, .rv-blur, .wipe, .eyebrow, .sec-title');
    els.forEach(function (node) {
      var d = node.getAttribute('data-delay');
      if (d) node.style.setProperty('--rv-delay', d + 'ms');
    });
    function revealMissed() {
      /* safety net: never leave in-view content hidden if IO misfires */
      var vh = window.innerHeight || 800;
      els.forEach(function (node) {
        if (node.classList.contains('is-visible')) return;
        try {
          var r = node.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > -40) node.classList.add('is-visible');
        } catch (e) { node.classList.add('is-visible'); }
      });
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (node) { node.classList.add('is-visible'); });
      return;
    }
    /* .wipe starts behind a fully-closed clip-path, and Chrome's
       IntersectionObserver clips a target by its own clip-path — a closed
       curtain never reports as intersecting, so the craft/story photos
       stayed blank. Curtains are watched by their layout box instead. */
    var wipes = els.filter(function (node) { return node.classList.contains('wipe'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (node) { if (wipes.indexOf(node) === -1) io.observe(node); });
    watchLayoutBox(wipes, function (node) { node.classList.add('is-visible'); });
    setTimeout(revealMissed, 4000);
    window.addEventListener('load', function () { setTimeout(revealMissed, 2200); });
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

  /* ---------- word-mask headline reveals (new) ---------- */
  function initWordMasks() {
    $all('.sec-title').forEach(function (el) {
      if (el.querySelector('.wi')) return; /* already split */
      var text = (el.textContent || '').trim();
      if (!text) return;
      el.setAttribute('aria-label', text);
      el.textContent = '';
      var words = text.split(/\s+/);
      words.forEach(function (word, i) {
        var w = document.createElement('span');
        w.className = 'w';
        w.setAttribute('aria-hidden', 'true');
        var wi = document.createElement('span');
        wi.className = 'wi';
        wi.style.transitionDelay = (i * 55) + 'ms';
        wi.textContent = word;
        w.appendChild(wi);
        el.appendChild(w);
        if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
      });
    });
  }

  /* ---------- inner image drift: photo glides inside its frame on scroll ---------- */
  function initDrift() {
    if (REDUCED) return;
    var shells = $all('.drift');
    if (!shells.length || !('requestAnimationFrame' in window)) return;
    var ticking = false;
    function update() {
      ticking = false;
      var vh = window.innerHeight || 800;
      /* read every box first, then write — no forced layout between shells */
      var rects = shells.map(function (shell) { return shell.getBoundingClientRect(); });
      shells.forEach(function (shell, i) {
        var img = shell.querySelector('img');
        var r = rects[i];
        if (!img || r.bottom < -240 || r.top > vh + 240) return;
        var prog = clamp((r.top + r.height / 2 - vh / 2) / vh, -0.6, 0.6);
        /* compositor-only: -6.9% centres the 116%-tall photo, ±6% keeps the
           frame covered (object-position used to repaint it every frame) */
        img.style.transform = 'translate3d(0,' + (-6.9 - (prog / 0.6) * 6).toFixed(2) + '%,0)';
      });
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  function initHeroCurtain() {
    var media = $('.hero-media');
    if (!media) return;
    function reveal() { media.classList.add('is-visible'); }
    if (REDUCED) { reveal(); return; }
    if (document.readyState === 'complete') {
      setTimeout(reveal, 250);
    } else {
      window.addEventListener('load', function () { setTimeout(reveal, 250); });
      setTimeout(reveal, 3500); /* safety net */
    }
  }

  /* ---------- material motion: cursor depth + magnetic type ----------
     (The old scroll-velocity offset was removed: it was computed from raw,
     irregular wheel/trackpad deltas, so the hero layers shivered up and down
     while scrolling. Cursor depth is eased and only runs while it moves.) */
  var motion = {
    mx: 0, my: 0, tmx: 0, tmy: 0,     /* cursor, -0.5..0.5 */
    running: false,
    heroVisible: true,
    layers: [],
    magChars: []
  };

  function initMotion() {
    motion.layers = $all('[data-depth]');
    motion.magChars = $all('#heroTitle .mag');

    if (!MOTION || !motion.layers.length) return;

    var hero = $('#hero');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        motion.heroVisible = entries[0].isIntersecting;
        pumpMotion();
      }, { threshold: 0 }).observe(hero);
    }

    window.addEventListener('mousemove', function (e) {
      motion.tmx = e.clientX / window.innerWidth - 0.5;
      motion.tmy = e.clientY / window.innerHeight - 0.5;
      motion.cx = e.clientX; motion.cy = e.clientY;
      pumpMotion();
    }, { passive: true });

    pumpMotion();
  }

  function pumpMotion() {
    if (motion.running || !motion.heroVisible) return;
    motion.running = true;
    requestAnimationFrame(motionFrame);
  }

  function motionFrame() {
    /* ease cursor toward its target */
    motion.mx += (motion.tmx - motion.mx) * 0.055;
    motion.my += (motion.tmy - motion.my) * 0.055;

    var i, layer, d;
    /* read phase: every letter box before any style write (no layout thrash) */
    var chars = motion.magChars;
    var rects = null;
    if (chars.length && typeof motion.cx === 'number') {
      rects = [];
      for (i = 0; i < chars.length; i++) rects.push(chars[i].getBoundingClientRect());
    }

    /* write phase */
    for (i = 0; i < motion.layers.length; i++) {
      layer = motion.layers[i];
      d = parseFloat(layer.getAttribute('data-depth')) || 10;
      d = clamp(d, 0, 15);
      layer.style.transform =
        'translate3d(' + (motion.mx * d).toFixed(2) + 'px,' +
        (motion.my * d).toFixed(2) + 'px,0)';
    }

    /* magnetic headline letters: drift ≤3px toward the cursor */
    if (rects) {
      for (i = 0; i < chars.length; i++) {
        var r = rects[i];
        if (!r.width) continue;
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = motion.cx - cx, dy = motion.cy - cy;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var pull = clamp(140 / dist, 0, 1); /* only near the type */
        var sx = clamp(dx * 0.02 * pull, -3, 3);
        var sy = clamp(dy * 0.02 * pull, -3, 3);
        chars[i].style.transform = 'translate3d(' + sx.toFixed(2) + 'px,' + sy.toFixed(2) + 'px,0)';
      }
    }

    var settled =
      Math.abs(motion.tmx - motion.mx) < 0.0006 &&
      Math.abs(motion.tmy - motion.my) < 0.0006;

    if (!settled && motion.heroVisible) {
      requestAnimationFrame(motionFrame);
    } else {
      motion.running = false;
      /* leave layers at rest; clear magnetic offsets */
      for (i = 0; i < chars.length; i++) chars[i].style.transform = '';
    }
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
      try { target.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- nav scroll state ---------- */
  function initNavScroll() {
    var nav = $('#siteNav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('scrolled', (window.scrollY || 0) > 24);
    }
    window.addEventListener('scroll', rafThrottle(onScroll), { passive: true });
    onScroll();
  }

  /* ---------- quick view (shared-element expansion) ---------- */
  var qv = { open: false, idx: -1 };

  function qvEls() {
    return {
      overlay: $('#qvOverlay'),
      panel: $('#qvPanel'),
      backdrop: $('#qvBackdrop'),
      close: $('#qvClose'),
      media: $('#qvMedia'),
      img: $('#qvImg'),
      info: $('#qvInfo'),
      index: $('#qvIndex'),
      name: $('#qvName'),
      spec: $('#qvSpec'),
      desc: $('#qvDesc'),
      price: $('#qvPrice'),
      enquire: $('#qvEnquire')
    };
  }

  function openQuickView(idx) {
    var p = productByIndex(idx);
    var row = productRows[idx];
    if (!p || !row) return;
    var E = qvEls();
    if (!E.overlay || !E.media || !E.img) return;

    qv.open = true; qv.idx = idx;

    if (E.index) E.index.textContent = 'N° 0' + (idx + 1);
    if (E.name) E.name.textContent = p.name || '';
    if (E.spec) E.spec.textContent = [p.material, p.stone].filter(Boolean).join(' · ');
    if (E.desc) E.desc.textContent = p.description || '';
    if (E.price) E.price.textContent = formatPrice(p.price);
    if (E.enquire) E.enquire.textContent = (C.ui && C.ui.quickViewEnquire) || 'Enquire About This Piece';
    E.img.alt = (p.name || 'Product') + ' — high jewelry by Kela Jewels';

    var cardImg = row.querySelector('img');
    var startRect = cardImg ? cardImg.getBoundingClientRect()
                            : row.getBoundingClientRect();

    E.overlay.classList.add('open');
    E.overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
    E.info && E.info.classList && E.overlay.classList.remove('ready');

    /* Real panel image loads underneath; ghost flies over it. */
    E.img.style.opacity = '0';
    E.img.removeAttribute('src');
    E.img.src = p.image || '';
    armImage(E.img);

    function targetRect() { return E.media.getBoundingClientRect(); }

    function finishOpen() {
      E.img.style.opacity = '';
      E.overlay.classList.add('ready');
      var ghost = $('.qv-ghost');
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
      if (E.close) E.close.focus();
    }

    if (REDUCED) { finishOpen(); return; }

    var t = targetRect();
    var ghost = document.createElement('img');
    ghost.className = 'qv-ghost';
    ghost.src = (cardImg && cardImg.currentSrc) || p.image || '';
    ghost.alt = '';
    ghost.style.left = startRect.left + 'px';
    ghost.style.top = startRect.top + 'px';
    ghost.style.width = startRect.width + 'px';
    ghost.style.height = startRect.height + 'px';
    document.body.appendChild(ghost);

    var dx = t.left - startRect.left;
    var dy = t.top - startRect.top;
    var sx = t.width / Math.max(1, startRect.width);
    var sy = t.height / Math.max(1, startRect.height);

    /* Force layout, then fly. */
    void ghost.offsetWidth;
    requestAnimationFrame(function () {
      ghost.style.transform =
        'translate3d(' + dx + 'px,' + dy + 'px,0) scale(' + sx + ',' + sy + ')';
    });

    var done = false;
    ghost.addEventListener('transitionend', function handler() {
      if (done) return; done = true;
      ghost.removeEventListener('transitionend', handler);
      finishOpen();
    });
    setTimeout(function () { if (!done) { done = true; finishOpen(); } }, 900);
  }

  function closeQuickView() {
    var E = qvEls();
    if (!E.overlay || !qv.open) return;
    qv.open = false;

    function finishClose() {
      E.overlay.classList.remove('open');
      E.overlay.classList.remove('ready');
      E.overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('locked');
      var ghost = $('.qv-ghost');
      if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
    }

    if (REDUCED) { finishClose(); return; }

    var row = productRows[qv.idx];
    var cardImg = row ? row.querySelector('img') : null;
    var endRect = cardImg ? cardImg.getBoundingClientRect()
                          : (row ? row.getBoundingClientRect() : null);
    var startRect = E.media.getBoundingClientRect();

    if (!endRect) { finishClose(); return; }

    E.img.style.opacity = '0';
    E.overlay.classList.remove('ready');

    var ghost = document.createElement('img');
    ghost.className = 'qv-ghost';
    var closeProduct = productByIndex(qv.idx);
    ghost.src = E.img.currentSrc || E.img.getAttribute('src') || (closeProduct && closeProduct.image) || '';
    if (!ghost.src) { finishClose(); return; }
    ghost.alt = '';
    ghost.style.left = startRect.left + 'px';
    ghost.style.top = startRect.top + 'px';
    ghost.style.width = startRect.width + 'px';
    ghost.style.height = startRect.height + 'px';
    document.body.appendChild(ghost);

    var dx = endRect.left - startRect.left;
    var dy = endRect.top - startRect.top;
    var sx = endRect.width / Math.max(1, startRect.width);
    var sy = endRect.height / Math.max(1, startRect.height);

    void ghost.offsetWidth;
    requestAnimationFrame(function () {
      ghost.style.transform =
        'translate3d(' + dx + 'px,' + dy + 'px,0) scale(' + sx + ',' + sy + ')';
    });

    var done = false;
    function handler() {
      if (done) return; done = true;
      ghost.removeEventListener('transitionend', handler);
      finishClose();
    }
    ghost.addEventListener('transitionend', handler);
    setTimeout(handler, 900);
  }

  function initQuickView() {
    var E = qvEls();
    if (!E.overlay) return;
    if (E.backdrop) E.backdrop.addEventListener('click', closeQuickView);
    if (E.close) {
      E.close.addEventListener('click', closeQuickView);
      if (C.ui && C.ui.quickViewClose) E.close.setAttribute('aria-label', C.ui.quickViewClose);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && qv.open) closeQuickView();
    });
    if (E.enquire) {
      E.enquire.addEventListener('click', function () {
        var p = productByIndex(qv.idx);
        closeQuickView();
        var msg = $('#fieldMessage');
        if (msg && p && p.name) {
          msg.value = 'I would like to enquire about the ' + p.name + '.';
        }
        var contact = $('#contact');
        if (contact) {
          setTimeout(function () {
            contact.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
          }, 120);
        }
      });
    }
  }

  /* ---------- contact form (demo) ---------- */
  function initForm() {
    var form = $('#contactForm');
    var success = $('#formSuccess');
    if (!form || !success) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#fieldName'), email = $('#fieldEmail');
      var ok = true;
      [name, email].forEach(function (f) {
        if (!f) return;
        var bad = !f.value || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
        f.style.borderBottomColor = bad ? 'var(--color-error)' : '';
        if (bad) ok = false;
      });
      if (!ok) return;
      form.style.display = 'none';
      success.hidden = false;
      success.style.opacity = '0';
      requestAnimationFrame(function () {
        success.style.transition = 'opacity 0.8s ease';
        success.style.opacity = '1';
      });
    });
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    document.title = state.brandName + ' — Haute Joaillerie';
  }

  /* ============================================================
     window.applyCustomization — the platform contract.
     Partial / empty input must never throw.
     ============================================================ */
  function setVar(name, value) {
    try { document.documentElement.style.setProperty(name, value); }
    catch (e) { /* ignore */ }
  }

  function setFontLink(display, body) {
    var link = $('#font-link');
    if (!link) return;
    function fam(name) {
      return 'family=' + encodeURIComponent(name).replace(/%20/g, '+') +
             ':ital,wght@0,400;0,500;0,600;1,400;1,500';
    }
    link.href = 'https://fonts.googleapis.com/css2?' +
                fam(display) + '&' + fam(body) + '&display=swap';
  }

  function refreshPrices() {
    $all('.js-product-price').forEach(function (node, i) {
      var p = productByIndex(i);
      if (p) node.textContent = formatPrice(p.price);
    });
    var E = qvEls();
    if (E.price && qv.open) {
      var p = productByIndex(qv.idx);
      if (p) E.price.textContent = formatPrice(p.price);
    }
  }

  function crossfadeImage(img, src) {
    if (!img || !src || img.getAttribute('src') === src) return;
    var shell = img.closest('.img-shell');
    if (shell) shell.classList.remove('is-loaded');
    img.style.opacity = '0';
    setTimeout(function () {
      /* clear the inline fade once the new photo is in — previously the
         inline opacity:0 stayed forever and the customized image never showed */
      function show() {
        img.removeEventListener('load', show);
        img.style.opacity = '';
      }
      img.addEventListener('load', show);
      delete img.dataset.tplBroken;
      img.removeAttribute('src');
      img.src = src;
      armImage(img);
      if (img.complete && img.naturalWidth > 0) show();
    }, 60);
  }

  window.applyCustomization = function (custom) {
    try {
      if (!custom || typeof custom !== 'object') return;

      /* Colours -> tokens (smooth via CSS transitions). */
      if (typeof custom.primaryColor === 'string' && custom.primaryColor.trim()) {
        setVar('--color-primary', custom.primaryColor.trim());
        setVar('--color-text', custom.primaryColor.trim());
      }
      if (typeof custom.accentColor === 'string' && custom.accentColor.trim()) {
        setVar('--color-accent', custom.accentColor.trim());
      }

      /* Fonts: "Display|Body". */
      if (typeof custom.fontPair === 'string' && custom.fontPair.indexOf('|') > -1) {
        var parts = custom.fontPair.split('|');
        var display = parts[0].trim(), body = parts[1].trim();
        if (display && body) {
          setVar('--font-display', "'" + display + "', Georgia, serif");
          setVar('--font-body', "'" + body + "', -apple-system, sans-serif");
          setFontLink(display, body);
        }
      }

      /* Brand text. */
      var brandChanged = false;
      if (typeof custom.brandName === 'string' && custom.brandName.trim()) {
        state.brandName = custom.brandName.trim();
        brandChanged = true;
      }
      if (typeof custom.logoText === 'string' && custom.logoText.trim()) {
        state.brandName = custom.logoText.trim();
        brandChanged = true;
      }
      if (brandChanged) {
        state.brandInitial = brandInitialOf(state.brandName);
        $all('[data-content="brand.name"]').forEach(function (n) { n.textContent = state.brandName; });
        setBrandInitials();
        renderFooter();
      }

      /* Hero image. */
      if (typeof custom.heroImage === 'string' && custom.heroImage) {
        var heroImg = $('#heroImg');
        if (heroImg) crossfadeImage(heroImg, custom.heroImage);
      }

      /* Currency. */
      if (typeof custom.currency === 'string' && custom.currency.trim()) {
        state.currency = custom.currency.trim();
        refreshPrices();
      }

      /* Contact. */
      if (typeof custom.contactEmail === 'string' && custom.contactEmail.trim()) {
        var em = $('#contactEmail');
        if (em) { em.textContent = custom.contactEmail.trim(); em.href = 'mailto:' + custom.contactEmail.trim(); }
      }
      if (typeof custom.instagramUrl === 'string' && custom.instagramUrl.trim()) {
        var ig = $('#contactInstagram');
        if (ig) ig.href = custom.instagramUrl.trim();
      }

      /* Product names. */
      if (Array.isArray(custom.productNames)) {
        custom.productNames.forEach(function (nm, i) {
          if (typeof nm !== 'string' || !nm.trim()) return;
          var p = productByIndex(i);
          if (!p) return;
          p.name = nm.trim();
          var row = productRows[i];
          if (row) {
            var n = row.querySelector('.js-product-name');
            if (n) n.textContent = p.name;
            var im = row.querySelector('img');
            if (im) im.alt = p.name + ' — high jewelry by ' + state.brandName;
            row.setAttribute('aria-label', p.name + ' — quick view');
          }
        });
        if (qv.open) {
          var qp = productByIndex(qv.idx), E = qvEls();
          if (qp && E.name) E.name.textContent = qp.name || '';
        }
      }

      /* Product images: map index -> dataURL. */
      if (custom.productImages && typeof custom.productImages === 'object') {
        Object.keys(custom.productImages).forEach(function (k) {
          var i = parseInt(k, 10);
          var src = custom.productImages[k];
          if (!isFinite(i) || typeof src !== 'string' || !src) return;
          var p = productByIndex(i);
          if (!p) return;
          p.image = src;
          var row = productRows[i];
          if (row) {
            var im = row.querySelector('img');
            if (im) crossfadeImage(im, src);
          }
        });
      }
    } catch (err) {
      /* Never throw on partial/empty input. */
      if (window.console && console.warn) console.warn('applyCustomization:', err);
    }
  };

  /* URLSearchParams: brand / primary / accent (works over file://). */
  function applyUrlParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var custom = {};
      if (q.get('brand')) custom.brandName = q.get('brand');
      if (q.get('primary')) custom.primaryColor = q.get('primary');
      if (q.get('accent')) custom.accentColor = q.get('accent');
      if (Object.keys(custom).length) window.applyCustomization(custom);
    } catch (e) { /* ignore */ }
  }

  /* ---------- boot ---------- */
  function boot() {
    state.brandInitial = brandInitialOf(state.brandName);

    /* Static images present in the initial HTML. */
    $all('img').forEach(armImage);

    bindStaticText();
    setBrandInitials();
    renderNav();
    buildHeroTitle();
    buildHeroCtas();
    renderCollections();
    renderProducts();
    renderCraftPoints();
    renderContact();
    renderFooter();

    initReveals();
    initWordMasks();
    initHeroCurtain();
    initMotion();
    initDrift();
    initNavScroll();
    initAnchorScroll();
    initQuickView();
    initForm();

    var toggle = $('#navToggle');
    if (toggle) toggle.addEventListener('click', function () {
      setMobileMenu(!$('#mobileMenu').classList.contains('open'));
    });

    applyUrlParams();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
