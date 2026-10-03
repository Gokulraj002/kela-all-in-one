/* Kela Jewels — design-05-gemstone · main.js
 * Renders ALL text from window.TEMPLATE_CONTENT. Vanilla JS only.
 * Motion: light sweeps, hero depth (≤15px, desktop only), magnetic headline
 * (≤3px), blur-to-sharp + image-clip reveals, gemstone
 * switcher morph (crossfade + scale + mask wipe over ONE image — never a
 * hard swap), quick view. Respects prefers-reduced-motion in CSS AND JS.
 */
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

  /* ---------- helpers ---------- */
  function $(sel, ctx) {
    try { return (ctx || document).querySelector(sel); }
    catch (e) { return null; }
  }
  function $all(sel, ctx) {
    try { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }

  var reducedMotion = false;
  var finePointer = false;
  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    finePointer = window.matchMedia('(pointer: fine)').matches;
  } catch (e) { /* safe defaults */ }

  var CONTENT = window.TEMPLATE_CONTENT || {};

  function getPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var currencySymbol = '₹';
  function fmtPrice(n) {
    var sym = currencySymbol;
    var num = Number(n);
    if (!isFinite(num)) return '';
    try { return sym + num.toLocaleString('en-IN'); }
    catch (e) { return sym + num; }
  }

  /* =====================================================================
     RENDER — static text from content
     ===================================================================== */
  function renderStatic() {
    $all('[data-content]').forEach(function (el) {
      var v = getPath(CONTENT, el.getAttribute('data-content'));
      if (v === undefined || v === null) return;
      el.textContent = String(v);
    });
    $all('[data-content-href]').forEach(function (el) {
      var v = getPath(CONTENT, el.getAttribute('data-content-href'));
      if (v === undefined || v === null) return;
      el.setAttribute('href', String(v));
    });
    /* brand initial(s) on marks */
    $all('[data-brand-initial]').forEach(function (el) {
      var name = getPath(CONTENT, 'brand.name');
      el.textContent = name ? String(name).trim().charAt(0).toUpperCase() : 'K';
    });
    /* document title follows brand */
    try {
      var bn = getPath(CONTENT, 'brand.name');
      if (bn) document.title = String(bn) + ' — The Gemstone Maison';
    } catch (e) {}
  }

  var NAV_ANCHORS = { 0: '#collections', 1: '#products', 2: '#story', 3: '#contact' };
  function renderNav() {
    var nav = Array.isArray(CONTENT.nav) ? CONTENT.nav : [];
    var host = $('#navLinks');
    var foot = $('#footerNav');
    if (!nav.length) return;
    if (host) {
      host.innerHTML = nav.map(function (label, i) {
        return '<a href="' + (NAV_ANCHORS[i] || '#hero') + '">' + esc(label) + '</a>';
      }).join('');
    }
    if (foot) {
      foot.innerHTML = nav.map(function (label, i) {
        return '<a href="' + (NAV_ANCHORS[i] || '#hero') + '">' + esc(label) + '</a>';
      }).join('');
    }
  }

  /* =====================================================================
     RENDER — collections + products
     ===================================================================== */
  function productImage(p, i) {
    return p.image || 'assets/images/product-' + ((i % 3) + 1) + '.webp';
  }

  function renderCollections() {
    var host = $('#collectionGrid');
    if (!host) return;
    var items = Array.isArray(CONTENT.collections) ? CONTENT.collections : [];
    host.innerHTML = items.map(function (c, i) {
      return '' +
      '<a class="collection-card" href="#products" data-reveal="fade" data-index="' + i + '">' +
        '<div class="img-frame sweep"><img src="' + esc(c.image || '') + '" alt="' + esc(c.name || 'Collection') + ' collection" loading="lazy" decoding="async" onload="this.classList.add(\'loaded\')" onerror="__gemmaImgErr(this)"></div>' +
        '<div class="collection-body">' +
          '<div><h3 class="collection-name">' + esc(c.name || '') + '</h3>' +
          (c.line ? '<p class="collection-line">' + esc(c.line) + '</p>' : '') + '</div>' +
          '<span class="collection-arrow" aria-hidden="true">→</span>' +
        '</div>' +
      '</a>';
    }).join('');
  }

  function renderProducts() {
    var host = $('#productGrid');
    if (!host) return;
    var items = Array.isArray(CONTENT.products) ? CONTENT.products : [];
    host.innerHTML = items.map(function (p, i) {
      var img = productImage(p, i);
      return '' +
      '<article class="product-card" tabindex="0" role="button" aria-label="Quick view: ' + esc(p.name || '') + '" data-index="' + i + '" data-reveal="fade">' +
        '<div class="img-frame sweep"><img src="' + esc(img) + '" alt="' + esc(p.name || 'Jewelry piece') + '" loading="lazy" decoding="async" onload="this.classList.add(\'loaded\')" onerror="__gemmaImgErr(this)"></div>' +
        '<div class="product-body">' +
          '<p class="product-stone">' + esc(p.stone || '') + '</p>' +
          '<h3 class="product-name">' + esc(p.name || '') + '</h3>' +
          '<p class="product-material">' + esc(p.material || '') + '</p>' +
          '<p class="product-price">' + esc(fmtPrice(p.price)) + '</p>' +
          '<span class="product-view">Quick View <span class="arr" aria-hidden="true">→</span></span>' +
        '</div>' +
      '</article>';
    }).join('');

    $all('.product-card', host).forEach(function (card) {
      card.addEventListener('click', function () { openQuickView(Number(card.getAttribute('data-index')), card); });
      card.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openQuickView(Number(card.getAttribute('data-index')), card); }
      });
    });
  }

  function renderCraft() {
    var host = $('#processList');
    if (!host) return;
    var steps = getPath(CONTENT, 'craftsmanship.steps');
    if (!Array.isArray(steps)) return;
    host.innerHTML = steps.map(function (s, i) {
      var num = ('0' + (i + 1)).slice(-2);
      return '<li data-reveal="fade"><span class="process-num">' + num + '</span>' +
             '<div><h3>' + esc(s.title || '') + '</h3><p>' + esc(s.text || '') + '</p></div></li>';
    }).join('');
  }

  function renderStats() {
    var host = $('#statsRow');
    if (!host) return;
    var stats = getPath(CONTENT, 'story.stats');
    if (!Array.isArray(stats)) return;
    host.innerHTML = stats.map(function (s) {
      return '<div class="stat" data-reveal="fade"><p class="stat-value">' + esc(s.value || '') + '</p>' +
             '<p class="stat-label">' + esc(s.label || '') + '</p></div>';
    }).join('');
  }

  /* =====================================================================
     GEMSTONE SWITCHER — morph over ONE base image
     Crossfade + scale + mask wipe. Never a hard swap.
     ===================================================================== */
  var stones = Array.isArray(CONTENT.heroStones) ? CONTENT.heroStones : [];
  var activeStone = -1;
  var activeTintLayer = 0; /* ping-pong between tintA / tintB */

  function renderSwitcher() {
    var host = $('#stoneSwitcher');
    if (!host || !stones.length) return;
    host.innerHTML = stones.map(function (s, i) {
      return '<button class="stone-btn" role="tab" data-stone="' + i + '" aria-selected="false">' + esc(s.label || s.key || '') + '</button>';
    }).join('');
    $all('.stone-btn', host).forEach(function (btn) {
      btn.addEventListener('click', function () { selectStone(Number(btn.getAttribute('data-stone'))); });
    });
  }

  function applyStoneVisual(stone, incoming, outgoing, baseImg, panel) {
    /* tint color on the incoming layer */
    incoming.style.background = 'radial-gradient(70% 60% at 50% 32%, ' + stone.tint +
      ' 0%, ' + stone.tint + ' 55%, ' + stone.tint + ' 100%)';
    /* per-stone duotone recipe */
    if (stone.key === 'diamond') {
      incoming.style.background = 'linear-gradient(160deg, ' + stone.tint + ', transparent 130%)';
    }
    incoming.style.opacity = String(stone.tintOpacity == null ? 0.5 : stone.tintOpacity);

    /* mask wipe-in on the incoming layer */
    if (!reducedMotion) {
      incoming.style.transition = 'none';
      incoming.style.clipPath = 'inset(0 100% 0 0 round 3px)';
      void incoming.offsetWidth; /* reflow */
      incoming.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1), clip-path 0.9s cubic-bezier(0.4,0,0.2,1)';
      incoming.style.clipPath = 'inset(0 0% 0 0 round 3px)';
    } else {
      incoming.style.clipPath = 'none';
    }

    /* old layer crossfades out (wipe held) */
    if (outgoing && outgoing !== incoming) {
      outgoing.style.transition = 'opacity 0.9s cubic-bezier(0.4,0,0.2,1)';
      outgoing.style.opacity = '0';
    }

    /* base image filter + gentle scale pulse */
    if (baseImg) baseImg.style.filter = stone.filter || '';
    if (panel) {
      panel.style.setProperty('--color-stone', stone.tint || '#9fb8b2');
      if (!reducedMotion) {
        panel.classList.add('morphing');
        window.setTimeout(function () { panel.classList.remove('morphing'); }, 1000);
      }
    }
  }

  function selectStone(i, instant) {
    if (!stones.length || i === activeStone) return;
    var stone = stones[i];
    if (!stone) return;

    var panel = $('#heroPanel');
    var baseImg = $('#heroBase');
    var layers = [$('#tintA'), $('#tintB')];
    var meta = $('#stoneMeta');
    var nameEl = $('#stoneName');
    var descEl = $('#stoneDesc');
    var kickerEl = $('#stoneKicker');

    activeStone = i;
    $all('.stone-btn').forEach(function (b, bi) {
      var on = bi === i;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    activeTintLayer = 1 - activeTintLayer;
    var incoming = layers[activeTintLayer];
    var outgoing = layers[1 - activeTintLayer];
    if (incoming && panel) applyStoneVisual(stone, incoming, outgoing, baseImg, panel);

    /* stone name + description fade transition */
    function swapText() {
      if (nameEl) nameEl.textContent = stone.name || '';
      if (descEl) descEl.textContent = stone.description || '';
      if (kickerEl) kickerEl.textContent = 'Now Viewing — ' + (stone.label || '');
    }
    if (meta && !reducedMotion && !instant) {
      meta.classList.add('swap');
      window.setTimeout(function () {
        swapText();
        meta.classList.remove('swap');
      }, 300);
    } else {
      swapText();
    }
  }

  /* =====================================================================
     QUICK VIEW
     ===================================================================== */
  var qvProduct = null;

  function openQuickView(i, cardEl) {
    var items = Array.isArray(CONTENT.products) ? CONTENT.products : [];
    var p = items[i];
    if (!p) return;
    qvProduct = p;

    var overlay = $('#qvOverlay');
    var panel = $('#qvPanel');
    var img = $('#qvImg');
    if (!overlay || !panel || !img) return;

    /* expand-from-position origin */
    try {
      var r = cardEl ? cardEl.getBoundingClientRect() : null;
      if (r) {
        var ox = ((r.left + r.width / 2) / window.innerWidth * 100).toFixed(1) + '%';
        var oy = ((r.top + r.height / 2) / window.innerHeight * 100).toFixed(1) + '%';
        panel.style.setProperty('--qv-ox', ox);
        panel.style.setProperty('--qv-oy', oy);
      }
    } catch (e) {}

    img.classList.remove('loaded');
    img.style.display = '';
    var frame = img.closest ? img.closest('.img-frame') : null;
    if (frame) frame.classList.remove('img-fallback', 'is-loaded');
    img.onload = function () {
      img.classList.add('loaded');
      if (frame) frame.classList.add('is-loaded');
    };
    img.src = productImage(p, i);
    img.alt = p.name || 'Jewelry piece';
    if (img.complete && img.naturalWidth > 0) {
      img.classList.add('loaded');
      if (frame) frame.classList.add('is-loaded');
    }

    var map = { qvStone: p.stone, qvName: p.name, qvMaterial: p.material, qvDesc: p.description };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = map[id] || '';
    });
    var priceEl = $('#qvPrice');
    if (priceEl) priceEl.textContent = fmtPrice(p.price);

    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.classList.add('open'); });
    });
    var closeBtn = $('#qvClose');
    if (closeBtn) closeBtn.focus();
  }

  function closeQuickView() {
    var overlay = $('#qvOverlay');
    if (!overlay || overlay.hidden) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    window.setTimeout(function () { overlay.hidden = true; }, 480);
  }

  function initQuickView() {
    var closeBtn = $('#qvClose');
    var backdrop = $('#qvBackdrop');
    var enquire = $('#qvEnquire');
    if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
    if (backdrop) backdrop.addEventListener('click', closeQuickView);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closeQuickView();
    });
    if (enquire) enquire.addEventListener('click', function () {
      var msg = $('#fMsg');
      if (msg && qvProduct) msg.value = 'I would like to enquire about the ' + (qvProduct.name || 'piece') + '.';
      closeQuickView();
      window.setTimeout(function () {
        var c = $('#contact');
        if (c) c.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }, 120);
    });
  }

  /* =====================================================================
     REVEALS — IntersectionObserver
     ===================================================================== */
  function initReveals() {
    var els = $all('[data-reveal]');
    if (!els.length) return;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* =====================================================================
     MATERIAL MOTION — cursor depth + magnetic type
     Eased toward the pointer; the frame loop sleeps once settled. The old
     scroll-velocity nudge on [data-parallax] layers was removed: velocity
     read from raw wheel deltas is noisy and made the hero panel and craft
     image shiver while scrolling.
     ===================================================================== */
  var cursorX = 0, cursorY = 0, curX = 0, curY = 0;
  var depthEls = [];
  var heroTitle = null;
  var motionOn = false;
  var heroVisible = true;
  var motionRaf = 0;

  function initMotion() {
    motionOn = !reducedMotion && finePointer;
    heroTitle = $('#heroTitle');

    var hero = $('#hero');
    depthEls = $all('[data-depth]', hero || document);

    if (!motionOn) return;

    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.target === hero) heroVisible = en.isIntersecting; });
        if (heroVisible) requestMotion();
      }).observe(hero);
    }

    /* Depth layers get per-frame transforms: keep their reveal
       opacity/filter/clip animations, but drop the transform transition so
       the 1s reveal easing never fights the motion loop. */
    depthEls.forEach(function (el) {
      try {
        el.style.transitionProperty = 'opacity, filter, clip-path';
        el.style.willChange = 'transform';
      } catch (e) {}
    });

    if (hero) {
      hero.addEventListener('mousemove', function (ev) {
        var r = hero.getBoundingClientRect();
        cursorX = ((ev.clientX - r.left) / r.width - 0.5) * 2;
        cursorY = ((ev.clientY - r.top) / r.height - 0.5) * 2;
        requestMotion();
      });
      hero.addEventListener('mouseleave', function () { cursorX = 0; cursorY = 0; requestMotion(); });
    }
  }

  function requestMotion() {
    if (motionOn && !motionRaf) motionRaf = requestAnimationFrame(motionTick);
  }

  function motionTick() {
    motionRaf = 0;
    if (!motionOn || !heroVisible) return;
    curX += (cursorX - curX) * 0.06;
    curY += (cursorY - curY) * 0.06;
    var settled = Math.abs(cursorX - curX) < 0.001 && Math.abs(cursorY - curY) < 0.001;
    if (settled) { curX = cursorX; curY = cursorY; }

    depthEls.forEach(function (el) {
      var d = parseFloat(el.getAttribute('data-depth')) || 0;
      d = Math.max(-15, Math.min(15, d));
      el.style.transform = 'translate3d(' + (curX * d).toFixed(2) + 'px,' + (curY * d).toFixed(2) + 'px,0)';
    });
    /* magnetic headline — ≤3px toward cursor, no wobble */
    if (heroTitle) {
      var mx = Math.max(-3, Math.min(3, curX * 3));
      var my = Math.max(-3, Math.min(3, curY * 3));
      heroTitle.style.translate = mx.toFixed(2) + 'px ' + my.toFixed(2) + 'px';
    }
    if (!settled) requestMotion();
  }

  /* =====================================================================
     IN-PAGE LINKS — smooth glide in JS (replaces CSS scroll-behavior:smooth,
     which also slowed every programmatic scroll; instant when reduced)
     ===================================================================== */
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

  /* =====================================================================
     NAV — scrolled state + mobile menu
     ===================================================================== */
  function initNav() {
    var nav = $('#siteNav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', (window.scrollY || 0) > 40);
      };
      window.addEventListener('scroll', rafThrottle(onScroll), { passive: true });
      onScroll();
    }
    var toggle = $('#menuToggle');
    var links = $('#navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      $all('a', links).forEach(function (a) {
        a.addEventListener('click', function () {
          links.classList.remove('open');
          toggle.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  /* =====================================================================
     CONTACT FORM — elegant demo confirmation
     ===================================================================== */
  function initForm() {
    var form = $('#contactForm');
    var confirm = $('#formConfirm');
    if (!form || !confirm) return;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = $('#fName');
      var email = $('#fEmail');
      var msg = $('#fMsg');
      var ok = true;
      [name, email, msg].forEach(function (f) {
        if (!f) return;
        var bad = !f.value || !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
        f.classList.toggle('field-error', bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      var ref = $('#confirmRef');
      if (ref) ref.textContent = 'Ref GEM-' + Math.floor(1000 + Math.random() * 9000);
      form.style.transition = 'opacity 0.4s ease';
      form.style.opacity = '0';
      window.setTimeout(function () {
        form.style.display = 'none';
        confirm.hidden = false;
        confirm.style.opacity = '0';
        requestAnimationFrame(function () {
          confirm.style.transition = 'opacity 0.6s ease';
          confirm.style.opacity = '1';
        });
      }, reducedMotion ? 0 : 380);
    });
  }

  /* =====================================================================
     CUSTOMIZATION
     ===================================================================== */
  function setVar(name, value) {
    if (value == null || value === '') return;
    try { document.documentElement.style.setProperty(name, String(value)); } catch (e) {}
  }

  function rerenderPrices() {
    var items = Array.isArray(CONTENT.products) ? CONTENT.products : [];
    $all('.product-card').forEach(function (card) {
      var i = Number(card.getAttribute('data-index'));
      var p = items[i];
      var priceEl = $('.product-price', card);
      if (p && priceEl) priceEl.textContent = fmtPrice(p.price);
    });
    if (qvProduct) {
      var qvPrice = $('#qvPrice');
      if (qvPrice) qvPrice.textContent = fmtPrice(qvProduct.price);
    }
  }

  window.applyCustomization = function (custom) {
    custom = custom || {};
    try {
      if (custom.primaryColor) setVar('--color-primary', custom.primaryColor);
      if (custom.accentColor) setVar('--color-accent', custom.accentColor);

      if (custom.fontPair && typeof custom.fontPair === 'string' && custom.fontPair.indexOf('|') > -1) {
        var parts = custom.fontPair.split('|');
        var disp = parts[0].trim(), body = parts[1].trim();
        if (disp) setVar('--font-display', "'" + disp + "', Georgia, serif");
        if (body) setVar('--font-body', "'" + body + "', Arial, sans-serif");
      }

      var brandName = custom.brandName || custom.logoText;
      if (brandName) {
        $all('[data-brand]').forEach(function (el) { el.textContent = String(brandName); });
        $all('[data-brand-initial]').forEach(function (el) {
          el.textContent = String(brandName).trim().charAt(0).toUpperCase();
        });
        try { document.title = String(brandName) + ' — The Gemstone Maison'; } catch (e) {}
      }

      if (custom.currency) {
        currencySymbol = String(custom.currency);
        rerenderPrices();
      }

      if (custom.heroImage) {
        var heroImg = $('#heroBase');
        if (heroImg) {
          heroImg.classList.remove('loaded');
          heroImg.src = String(custom.heroImage);
          heroImg.onload = function () { heroImg.classList.add('loaded'); };
        }
        var storyImg = $('.story-band img');
        if (storyImg) storyImg.src = String(custom.heroImage);
      }

      if (Array.isArray(custom.productNames)) {
        var items = Array.isArray(CONTENT.products) ? CONTENT.products : [];
        $all('.product-card').forEach(function (card) {
          var i = Number(card.getAttribute('data-index'));
          var nm = custom.productNames[i];
          if (nm && items[i]) {
            items[i].name = String(nm);
            var nEl = $('.product-name', card);
            if (nEl) nEl.textContent = String(nm);
            var img = $('img', card);
            if (img) img.alt = String(nm);
          }
        });
      }

      if (custom.productImages && typeof custom.productImages === 'object') {
        var items2 = Array.isArray(CONTENT.products) ? CONTENT.products : [];
        Object.keys(custom.productImages).forEach(function (k) {
          var i = Number(k);
          var url = custom.productImages[k];
          var card = $('.product-card[data-index="' + i + '"]');
          if (card && url && items2[i]) {
            items2[i].image = String(url);
            var img = $('img', card);
            if (img) {
              img.classList.remove('loaded');
              img.src = String(url);
              img.onload = function () { img.classList.add('loaded'); };
            }
          }
        });
      }

      if (custom.contactEmail) {
        var em = String(custom.contactEmail);
        $all('[data-content="contact.email"]').forEach(function (el) { el.textContent = em; });
        $all('[data-content-href="contact.emailHref"]').forEach(function (el) { el.setAttribute('href', 'mailto:' + em); });
      }
      if (custom.instagramUrl) {
        var ig = String(custom.instagramUrl);
        $all('[data-content-href="contact.instagram"]').forEach(function (el) { el.setAttribute('href', ig); });
      }
    } catch (e) {
      /* customization must never break the page */
    }
  };

  function applyUrlParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var custom = {};
      if (q.get('brand')) custom.brandName = q.get('brand');
      if (q.get('primary')) custom.primaryColor = q.get('primary');
      if (q.get('accent')) custom.accentColor = q.get('accent');
      if (Object.keys(custom).length) window.applyCustomization(custom);
    } catch (e) {}
  }

  /* image skeleton: mark already-cached images loaded */
  function hydrateImages() {
    $all('.img-frame img').forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('loaded');
        var f = img.closest ? img.closest('.img-frame') : null;
        if (f) f.classList.add('is-loaded');
      }
    });
    /* delegated load: covers dynamically swapped src too (customizer etc.) */
    try {
      document.addEventListener('load', function (ev) {
        var t = ev.target;
        if (t && t.tagName === 'IMG') {
          t.classList.add('loaded');
          var fr = t.closest ? t.closest('.img-frame') : null;
          if (fr) fr.classList.add('is-loaded');
        }
      }, true);
    } catch (e) {}
  }

  /* =====================================================================
     BOOT
     ===================================================================== */
  function boot() {
    renderStatic();
    renderNav();
    renderCollections();
    renderProducts();
    renderCraft();
    renderStats();
    renderSwitcher();
    selectStone(0, true);
    initQuickView();
    initReveals();
    initMotion();
    initNav();
    initAnchorScroll();
    initForm();
    hydrateImages();
    applyUrlParams();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
