/* Kela Jewels — design-10-experimental · main.js
   Vanilla JS. Renders all text from window.TEMPLATE_CONTENT, drives the
   pinned scenes, parallax, reveals, quick view and live customization.
   Every DOM lookup is guarded; every measurement is guarded. */

(function () {
  "use strict";

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

  /* content.js defines the elegant image fallback; keep a plain one in case a
     re-serialized content.js (e.g. a customized export) dropped it, so an
     onerror never points an <img> at "undefined" */
  if (!window.__IMG_FALLBACK__) {
    window.__IMG_FALLBACK__ = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000' viewBox='0 0 800 1000'>" +
      "<rect width='800' height='1000' fill='#15191C'/></svg>");
  }
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TOUCH = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  var FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(s, r) { try { return (r || document).querySelector(s); } catch (e) { return null; } }
  function $all(s, r) { try { return Array.prototype.slice.call((r || document).querySelectorAll(s)); } catch (e) { return []; } }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---------- UI chrome strings (not brand/product content) ---------- */
  var UI = {
    collectionsEyebrow: "The Collections",
    collectionsTitle: "Three studies in shadow",
    productsEyebrow: "The Pieces",
    productsTitle: "Cut to fracture light",
    productsNote: "Each piece is made to order in our Mumbai atelier. Click a piece for a closer study.",
    contactEyebrow: "Private Viewings",
    contactTitle: "Begin the conversation",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Request Viewing",
    confirmEyebrow: "Received",
    navCta: "Private Viewing",
    qvEyebrow: "Quick Study",
    qvMaterial: "Material",
    qvStone: "Stone",
    qvPrice: "Price",
    qvEnquire: "Enquire",
    process: [
      ["I", "Modelled against shadow before a single gram is cast"],
      ["II", "Blackened gold, smoked settings, stones chosen for low light"],
      ["III", "Finished under one spotlight in a blacked-out studio"]
    ],
    prismLines: [
      "A mass of blackened gold, split by a single black diamond.",
      "An emerald floating inside its own shadow.",
      "Champagne diamond, ignited by a shaft of light."
    ],
    detailLabels: { email: "Email", phone: "Phone", address: "Atelier", instagram: "Instagram" }
  };

  function resolvePath(path) {
    var parts = String(path).split(".");
    var node = C;
    for (var i = 0; i < parts.length; i++) {
      if (node && typeof node === "object" && parts[i] in node) node = node[parts[i]];
      else { node = undefined; break; }
    }
    if (typeof node === "string") return node;
    if (UI && parts.length === 1 && typeof UI[parts[0]] === "string") return UI[parts[0]];
    return "";
  }

  function money(p) {
    var cur = (p && p.currency) || "₹";
    var n = Number(p && p.price) || 0;
    try { return cur + n.toLocaleString("en-IN"); }
    catch (e) { return cur + n; }
  }

  /* local mutable copies so customization can re-render */
  var products = Array.isArray(C.products) ? C.products.map(function (p) { return Object.assign({}, p); }) : [];
  var collections = Array.isArray(C.collections) ? C.collections.slice() : [];
  var brandName = (C.brand && C.brand.name) || "Kela Jewels";

  function setBrand(name) {
    brandName = String(name || "Kela Jewels");
    $all("[data-brand]").forEach(function (el) { el.textContent = brandName; });
    try { document.title = brandName; } catch (e) {}
  }

  /* ---------- static slots ---------- */
  function renderStatic() {
    $all("[data-content]").forEach(function (el) {
      var v = resolvePath(el.getAttribute("data-content"));
      if (el.tagName === "IMG") { if (v) el.setAttribute("src", v); }
      else el.textContent = v;
    });
    var tag = $("[data-brand-tagline]");
    if (tag && C.brand && C.brand.tagline) tag.textContent = "\u201C" + C.brand.tagline + "\u201D";
    var cta = $("#navCta");
    if (cta) cta.textContent = UI.navCta;
    setBrand(brandName);
  }

  /* ---------- nav ---------- */
  var NAV_TARGETS = { Prism: "#hero", Pieces: "#products", Atelier: "#craftsmanship", Contact: "#contact" };
  function renderNav() {
    var nav = $("#navLinks");
    if (nav && Array.isArray(C.nav)) {
      nav.innerHTML = C.nav.map(function (label) {
        var href = NAV_TARGETS[label] || "#";
        return '<a href="' + esc(href) + '">' + esc(label) + "</a>";
      }).join("");
    }
    var fn = $("#footerNav");
    if (fn && Array.isArray(C.nav)) {
      fn.innerHTML = C.nav.map(function (label) {
        var href = NAV_TARGETS[label] || "#";
        return '<a href="' + esc(href) + '">' + esc(label) + "</a>";
      }).join("");
    }
  }

  /* ---------- collections ---------- */
  function renderCollections() {
    var grid = $("#collectionsGrid");
    if (!grid) return;
    grid.innerHTML = collections.map(function (c, i) {
      var num = ("0" + (i + 1)).slice(-2);
      return (
        '<a class="col-card reveal-clip" href="#products" aria-label="' + esc(c.name) + ' collection">' +
          '<div class="imgwrap"><img src="' + esc(c.image) + '" alt="' + esc(c.name) + ' collection piece" loading="lazy" decoding="async" ' +
          'onerror="this.onerror=null;this.src=window.__IMG_FALLBACK__"></div>' +
          '<div class="col-meta"><span class="col-num">' + num + '</span>' +
          '<span class="col-name">' + esc(c.name) + '</span>' +
          '<span class="col-arrow" aria-hidden="true">&rarr;</span></div>' +
        "</a>"
      );
    }).join("");
  }

  /* ---------- products ---------- */
  var productCards = [];
  function renderProducts() {
    var grid = $("#productsGrid");
    if (!grid) return;
    grid.innerHTML = products.map(function (p, i) {
      return (
        '<div class="p-card reveal" data-index="' + i + '" tabindex="0" role="button" ' +
             'aria-label="Quick view: ' + esc(p.name) + '">' +
          '<div class="imgwrap"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + " — " + esc(p.stone) + '" loading="lazy" decoding="async" ' +
          'onerror="this.onerror=null;this.src=window.__IMG_FALLBACK__"></div>' +
          (i === 0 ? '<span class="light-study" aria-hidden="true"></span>' : "") +
          '<span class="sweep" aria-hidden="true"></span>' +
          '<div class="p-meta"><div class="p-row">' +
            '<span class="p-name">' + esc(p.name) + '</span>' +
            '<span class="p-arrow" aria-hidden="true">&nearr;</span>' +
          "</div>" +
          '<p class="p-price">' + esc(money(p)) + '</p>' +
          '<p class="p-stone">' + esc(p.stone || "") + "</p></div>" +
        "</div>"
      );
    }).join("");
    productCards = $all(".p-card", grid);
    productCards.forEach(function (card, i) {
      card.addEventListener("click", function () { openQuickView(i); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openQuickView(i); }
      });
      if (i === 0 && FINE_POINTER && !REDUCED) bindLightStudy(card);
    });
    bindImgWraps(grid);
    observeReveals(grid);
  }

  /* ---------- prism study panels ---------- */
  function renderPrism() {
    var holder = $("#prismPanels");
    if (!holder) return;
    holder.innerHTML = products.map(function (p, i) {
      var line = (UI.prismLines[i] !== undefined) ? UI.prismLines[i] : "";
      var num = ("0" + (i + 1)).slice(-2);
      return (
        '<div class="prism-panel" style="z-index:' + (i + 1) + '">' +
          '<div class="imgwrap"><img data-prism-img="' + i + '" src="' + esc(p.image) + '" alt="' + esc(p.name) + ' in dramatic light" loading="lazy" decoding="async" ' +
          'onerror="this.onerror=null;this.src=window.__IMG_FALLBACK__"></div>' +
          '<div class="prism-caption">' +
            '<span class="prism-index">Study ' + num + " / 03</span>" +
            '<h3 class="prism-name">' + esc(p.name) + "</h3>" +
            '<p class="prism-line">' + esc(line) + "</p>" +
          "</div>" +
        "</div>"
      );
    }).join("");
    bindImgWraps(holder);
    requestFrame(); /* re-apply the scrubbed panel state at the current scroll */
  }

  /* ---------- process + contact + footer ---------- */
  function renderProcess() {
    var ol = $("#processList");
    if (!ol) return;
    ol.innerHTML = UI.process.map(function (s) {
      return '<li><span class="step">' + esc(s[0]) + '</span><span class="step-text">' + esc(s[1]) + "</span></li>";
    }).join("");
  }

  function renderContact() {
    var dl = $("#contactDetails");
    var c = C.contact || {};
    if (dl) {
      var rows = [];
      if (c.email) rows.push(["email", '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a>"]);
      if (c.phone) rows.push(["phone", '<a href="tel:' + esc(c.phone.replace(/[^+\d]/g, "")) + '">' + esc(c.phone) + "</a>"]);
      if (c.address) rows.push(["address", esc(c.address)]);
      if (c.instagram) rows.push(["instagram", '<a href="' + esc(c.instagram) + '" target="_blank" rel="noopener">kelajewels</a>']);
      dl.innerHTML = rows.map(function (r) {
        return "<div><dt>" + esc(UI.detailLabels[r[0]] || r[0]) + "</dt><dd>" + r[1] + "</dd></div>";
      }).join("");
    }
    ["formName", "formEmail", "formMessage", "formSubmit"].forEach(function (k) {
      var el = document.querySelector('[data-content="' + k + '"]');
      if (el) el.textContent = UI[k] || "";
    });
  }

  /* ---------- image skeleton: fade in on load ---------- */
  function bindImgWraps(root) {
    $all(".imgwrap", root || document).forEach(function (wrap) {
      var img = $("img", wrap);
      if (!img || wrap.dataset.bound) return;
      wrap.dataset.bound = "1";
      var done = function () { wrap.classList.add("is-loaded"); };
      if (img.complete && img.naturalWidth > 0) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });
  }

  /* ---------- reveals ---------- */
  var revealObserver = null;
  function splitWords(el, forHero) {
    var text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    var words = String(text).split(/\s+/).filter(Boolean);
    words.forEach(function (w, wi) {
      var wl = document.createElement("span");
      wl.className = "wl";
      wl.setAttribute("aria-hidden", "true");
      var inner = document.createElement("span");
      inner.className = "wi";
      inner.style.transitionDelay = (wi * 70) + "ms";
      if (forHero) {
        Array.prototype.forEach.call(w, function (ch) {
          var m = document.createElement("span");
          m.className = "ml";
          m.textContent = ch;
          inner.appendChild(m);
        });
      } else {
        inner.textContent = w;
      }
      wl.appendChild(inner);
      el.appendChild(wl);
      el.appendChild(document.createTextNode(" "));
    });
  }

  function observeReveals(root) {
    if (!("IntersectionObserver" in window)) {
      $all(".reveal,.reveal-clip,.reveal-lines,.hero-title", root || document).forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            revealObserver.unobserve(en.target);
          }
        });
      }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    }
    var clipped = [];
    $all(".reveal,.reveal-clip,.reveal-lines", root || document).forEach(function (el) {
      if (el.classList.contains("reveal-lines") && !el.dataset.split) {
        el.dataset.split = "1";
        splitWords(el, false);
      }
      /* .reveal-clip starts behind a fully-closed clip-path, and Chrome's
         IntersectionObserver clips a target by its own clip-path — it never
         reported as intersecting, so the collection cards and the
         craft/story images stayed blank. Watched by layout box instead. */
      if (el.classList.contains("reveal-clip")) {
        if (!el.dataset.watched) { el.dataset.watched = "1"; clipped.push(el); }
      } else {
        revealObserver.observe(el);
      }
    });
    watchLayoutBox(clipped, function (el) { el.classList.add("in-view"); });
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
        window.removeEventListener("scroll", queue);
        window.removeEventListener("resize", queue);
      }
    }
    function queue() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(check);
    }
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();
  }

  /* ---------- chapter indicator ---------- */
  function initChapters() {
    var aside = $("#chapters");
    if (!aside) return;
    var defs = [
      { label: "Prism", target: "#hero" },
      { label: "Pieces", target: "#products" },
      { label: "Atelier", target: "#craftsmanship" },
      { label: "Contact", target: "#contact" }
    ];
    var btns = defs.map(function (d) {
      var b = document.createElement("button");
      b.className = "chapter";
      b.type = "button";
      b.innerHTML = "<span>" + esc(d.label) + '</span><span class="tick"></span>';
      b.addEventListener("click", function () {
        var t = $(d.target);
        if (t) {
          try { t.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); }
          catch (e) { t.scrollIntoView(); }
        }
      });
      aside.appendChild(b);
      return b;
    });
    if (!("IntersectionObserver" in window)) {
      if (btns[0]) btns[0].classList.add("active");
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var idx = defs.findIndex(function (d) { return ("#" + (en.target.id || "")) === d.target; });
        btns.forEach(function (b, i) { b.classList.toggle("active", i === idx); });
      });
    }, { rootMargin: "-42% 0px -52% 0px" });
    defs.forEach(function (d) {
      var t = $(d.target);
      if (t) obs.observe(t);
    });
  }

  /* ---------- in-page links: smooth glide in JS ----------
     (replaces CSS scroll-behavior:smooth, which also slowed every
     programmatic scroll; instant under reduced motion) */
  function initAnchorScroll() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = (a.getAttribute("href") || "").slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      try { target.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "start" }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- nav scrolled state ---------- */
  function initNav() {
    var nav = $("#siteNav");
    if (!nav) return;
    var onScroll = function () {
      try { nav.classList.toggle("scrolled", window.scrollY > 40); } catch (e) {}
    };
    window.addEventListener("scroll", rafThrottle(onScroll), { passive: true });
    onScroll();
  }

  /* ---------- motion engine (gated by reduced motion) ----------
     One requestAnimationFrame per changed frame — it runs while scrolling
     or while the pointer easing settles, and sleeps when idle. Every value
     is a pure function of scroll position or eased pointer position, all
     layout reads happen before any style write, and identical styles are
     never re-written. The old scroll-velocity skew and ±24px velocity
     offset were removed: velocity read from raw wheel deltas is noisy and
     made the craft/story images shake and shear while scrolling. */
  var mouse = { x: 0, y: 0, active: false };
  var depthEls = [], speedEls = [], magLetters = [];
  var hero = null;
  var frameQueued = false, motionReady = false;

  function cacheMotionEls() {
    depthEls = $all("[data-depth]").map(function (el) { return { el: el, f: parseFloat(el.getAttribute("data-depth")) || 0.5, x: 0, y: 0 }; });
    speedEls = $all("[data-speed]").filter(function (el) { return el.id !== "heroMedia"; }).map(function (el) {
      return { el: el, speed: parseFloat(el.getAttribute("data-speed")) || 0.06, y: 0 };
    });
    hero = { pin: $("#heroPin"), media: $("#heroMedia"), img: $("#heroImg"), copy: $("#heroCopy"), cue: $("#scrollCue") };
  }

  /* write a style only when its value actually changes */
  function setStyle(el, prop, value) {
    if (!el) return;
    var memo = el.__styleMemo || (el.__styleMemo = {});
    if (memo[prop] === value) return;
    memo[prop] = value;
    el.style[prop] = value;
  }

  function requestFrame() {
    if (!motionReady || frameQueued) return;
    frameQueued = true;
    requestAnimationFrame(frame);
  }

  function initPointer() {
    if (!FINE_POINTER || REDUCED) return;
    window.addEventListener("pointermove", function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
      requestFrame();
    }, { passive: true });
  }

  function initMagnetic() {
    var title = $("#heroTitle");
    if (!title || REDUCED) return;
    /* word/letter split drives the masked reveal on all pointers;
       the magnetic pull itself only binds on fine pointers */
    splitWords(title, true);
    if (FINE_POINTER) {
      magLetters = $all(".ml", title).map(function (el) { return { el: el, x: 0, y: 0 }; });
    }
    /* masked reveal for the hero title */
    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (ens) {
        ens.forEach(function (en) {
          if (en.isIntersecting) { title.classList.add("in-view"); o.disconnect(); }
        });
      }, { threshold: 0.3 });
      o.observe(title);
    } else title.classList.add("in-view");
  }

  function bindLightStudy(card) {
    var sheen = $(".light-study", card);
    if (!sheen) return;
    card.addEventListener("pointermove", function (e) {
      try {
        var r = card.getBoundingClientRect();
        if (!r || r.width < 2) return;
        sheen.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(2) + "%");
        sheen.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(2) + "%");
      } catch (err) {}
    }, { passive: true });
  }

  function frame() {
    frameQueued = false;
    try {
      var vh = window.innerHeight || 800, vw = window.innerWidth || 1200;
      var pointer = mouse.active && FINE_POINTER;

      /* ---- read phase: every measurement before any write ---- */
      var heroRect = hero.pin ? hero.pin.getBoundingClientRect() : null;
      var heroRange = hero.pin ? Math.max(1, hero.pin.offsetHeight - vh) : 1;
      var prismPin = $("#prismPin");
      var prismRect = prismPin ? prismPin.getBoundingClientRect() : null;
      var prismRange = prismPin ? Math.max(1, prismPin.offsetHeight - vh) : 1;
      var speedRects = speedEls.map(function (s) { return s.el.getBoundingClientRect(); });
      var depthRects = pointer ? depthEls.map(function (d) { return d.el.getBoundingClientRect(); }) : null;
      var letterRects = pointer && magLetters.length ? magLetters.map(function (L) { return L.el.getBoundingClientRect(); }) : null;
      var easing = false;

      /* ---- write phase ---- */
      /* pinned hero: media drifts, photo eases out of its zoom, copy lifts and
         fades across the whole pinned stretch (scrubbed by scroll) */
      if (heroRect && heroRect.bottom > -100 && heroRect.top < vh + 100) {
        var p = clamp(-heroRect.top / heroRange, 0, 1);
        setStyle(hero.media, "transform", "translate3d(0," + (p * 70).toFixed(1) + "px,0)");
        setStyle(hero.img, "transform", "scale(" + (1.12 - p * 0.08).toFixed(3) + ")");
        setStyle(hero.copy, "transform", "translate3d(0," + (-p * 150).toFixed(1) + "px,0)");
        setStyle(hero.copy, "opacity", clamp(1 - p, 0, 1).toFixed(2));
        setStyle(hero.cue, "opacity", clamp(1 - p * 3, 0, 1).toFixed(2));
      }

      /* prism study: each covered panel recedes and dims as the next slides over */
      if (prismRect && prismRect.bottom > -100 && prismRect.top < vh + 100) {
        var pp = clamp(-prismRect.top / prismRange, 0, 1);
        var panels = $all(".prism-panel", prismPin);
        panels.forEach(function (panel, k) {
          if (k >= panels.length - 1) return;
          var cov = clamp(pp * (panels.length - 1) - k, 0, 1);
          setStyle(panel, "transform", "scale(" + (1 - 0.04 * cov).toFixed(4) + ")");
          setStyle(panel, "filter", "brightness(" + (1 - 0.32 * cov).toFixed(3) + ")");
        });
      }

      /* parallax by position only (our own offset is removed from the
         measurement, so it never feeds back into itself) */
      speedEls.forEach(function (s, i) {
        var r = speedRects[i];
        if (r.bottom < -300 || r.top > vh + 300) return;
        var mid = r.top - s.y + r.height / 2;
        s.y = clamp((mid - vh / 2) * s.speed, -140, 140);
        setStyle(s.el, "transform", "translate3d(0," + s.y.toFixed(1) + "px,0)");
      });

      /* cursor depth 5–15px (`translate` composes with the pinned-scene transform) */
      if (depthRects) {
        depthEls.forEach(function (d, i) {
          var r = depthRects[i];
          if (r.bottom < 0 || r.top > vh) return;
          var cx = r.left - d.x + r.width / 2, cy = r.top - d.y + r.height / 2;
          var tx = clamp((mouse.x - cx) / (vw / 2), -1, 1) * 15 * d.f;
          var ty = clamp((mouse.y - cy) / (vh / 2), -1, 1) * 15 * d.f;
          d.x = lerp(d.x, tx, 0.06); d.y = lerp(d.y, ty, 0.06);
          if (Math.abs(tx - d.x) > 0.05 || Math.abs(ty - d.y) > 0.05) easing = true;
          setStyle(d.el, "translate", d.x.toFixed(1) + "px " + d.y.toFixed(1) + "px");
        });
      }

      /* magnetic hero letters ≤3px toward the cursor */
      if (letterRects) {
        magLetters.forEach(function (L, i) {
          var r = letterRects[i];
          if (!r || r.width === 0) return;
          var cx = r.left - L.x + r.width / 2, cy = r.top - L.y + r.height / 2;
          var dx = mouse.x - cx, dy = mouse.y - cy;
          var dist = Math.sqrt(dx * dx + dy * dy) || 1;
          var pull = clamp(1 - dist / 170, 0, 1);
          var tx = (dx / dist) * 3 * pull, ty = (dy / dist) * 3 * pull;
          L.x = lerp(L.x, tx, 0.12); L.y = lerp(L.y, ty, 0.12);
          if (Math.abs(tx - L.x) > 0.02 || Math.abs(ty - L.y) > 0.02) easing = true;
          setStyle(L.el, "transform", "translate(" + L.x.toFixed(2) + "px," + L.y.toFixed(2) + "px)");
        });
      }

      if (easing) requestFrame();
    } catch (e) {}
  }

  function initMotion() {
    if (REDUCED) return;
    cacheMotionEls();
    motionReady = true;
    initPointer();
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame);
    requestFrame();
  }

  /* ---------- quick view (FLIP) ---------- */
  var qvOpen = false, lastFocus = null;

  function qvEls() {
    return {
      qv: $("#quickView"), panel: $("#qvPanel"), backdrop: $("#qvBackdrop"),
      close: $("#qvClose"), img: $("#qvImg"), imgwrap: $(".qv-imgwrap"),
      eyebrow: $("#qvEyebrow"), name: $("#qvName"), desc: $("#qvDesc"),
      mat: $("#qvMaterial"), stone: $("#qvStone"), price: $("#qvPrice"),
      matLabel: $("#qvMatLabel"), stoneLabel: $("#qvStoneLabel"), priceLabel: $("#qvPriceLabel"),
      enquire: $("#qvEnquire")
    };
  }

  function openQuickView(i) {
    var p = products[i];
    var E = qvEls();
    if (!p || !E.qv || !E.panel) return;
    try {
      lastFocus = document.activeElement;
      if (E.eyebrow) E.eyebrow.textContent = UI.qvEyebrow;
      if (E.name) E.name.textContent = p.name || "";
      if (E.desc) E.desc.textContent = p.description || "";
      if (E.matLabel) E.matLabel.textContent = UI.qvMaterial;
      if (E.stoneLabel) E.stoneLabel.textContent = UI.qvStone;
      if (E.priceLabel) E.priceLabel.textContent = UI.qvPrice;
      if (E.mat) E.mat.textContent = p.material || "";
      if (E.stone) E.stone.textContent = p.stone || "";
      if (E.price) { E.price.textContent = money(p); E.price.classList.add("qv-price"); }
      if (E.enquire) E.enquire.textContent = UI.qvEnquire;
      if (E.img) { E.img.alt = (p.name || "Product") + " — " + (p.stone || ""); }

      E.qv.classList.add("open");
      E.qv.setAttribute("aria-hidden", "false");
      qvOpen = true;
      document.body.style.overflow = "hidden";

      var fromRect = null, fromSrc = p.image;
      try {
        var card = productCards[i];
        var cimg = card ? card.querySelector("img") : null;
        if (cimg) {
          var r = cimg.getBoundingClientRect();
          if (r && r.width > 2 && r.height > 2) { fromRect = r; fromSrc = cimg.currentSrc || cimg.src || p.image; }
        }
      } catch (e) { fromRect = null; }

      if (E.img) {
        if (E.imgwrap) E.imgwrap.classList.remove("is-loaded");
        E.img.src = p.image || "";
        var markLoaded = function () { if (E.imgwrap) E.imgwrap.classList.add("is-loaded"); };
        if (E.img.complete && E.img.naturalWidth > 0) markLoaded();
        else E.img.addEventListener("load", markLoaded, { once: true });
      }

      /* FLIP: clone the card image into the panel's image slot */
      try {
        var slot = E.imgwrap;
        var slotRect = slot ? slot.getBoundingClientRect() : null;
        if (fromRect && slotRect && slotRect.width > 2) {
          var clone = document.createElement("div");
          clone.className = "flip-clone";
          clone.style.backgroundImage = 'url("' + String(fromSrc).replace(/"/g, "") + '")';
          clone.style.left = fromRect.left + "px";
          clone.style.top = fromRect.top + "px";
          clone.style.width = fromRect.width + "px";
          clone.style.height = fromRect.height + "px";
          document.body.appendChild(clone);
          var dx = slotRect.left - fromRect.left, dy = slotRect.top - fromRect.top;
          var sx = slotRect.width / fromRect.width, sy = slotRect.height / fromRect.height;
          var anim = clone.animate(
            [{ transform: "translate(0px,0px) scale(1,1)" },
             { transform: "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")" }],
            { duration: 650, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" }
          );
          var done = function () { try { clone.remove(); } catch (e) {} };
          if (anim && anim.onfinish !== undefined) anim.onfinish = done;
          else setTimeout(done, 700);
        }
      } catch (e) {}

      if (E.close && E.close.focus) { try { E.close.focus(); } catch (e) {} }
    } catch (e) {}
  }

  function closeQuickView() {
    var E = qvEls();
    if (!qvOpen || !E.qv) return;
    try {
      var card = null, cardRect = null;
      try {
        var name = E.name ? E.name.textContent : "";
        for (var i = 0; i < productCards.length; i++) {
          var nm = productCards[i].querySelector(".p-name");
          if (nm && nm.textContent === name) { card = productCards[i]; break; }
        }
        var cimg = card ? card.querySelector("img") : null;
        if (cimg) {
          var r = cimg.getBoundingClientRect();
          if (r && r.width > 2) cardRect = r;
        }
      } catch (e) {}

      var finish = function () {
        E.qv.classList.remove("open");
        E.qv.setAttribute("aria-hidden", "true");
        qvOpen = false;
        document.body.style.overflow = "";
        if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      };

      try {
        var slot = E.imgwrap;
        var slotRect = slot ? slot.getBoundingClientRect() : null;
        if (cardRect && slotRect && slotRect.width > 2 && E.img && E.img.src) {
          var clone = document.createElement("div");
          clone.className = "flip-clone";
          clone.style.backgroundImage = 'url("' + String(E.img.currentSrc || E.img.src).replace(/"/g, "") + '")';
          clone.style.left = slotRect.left + "px";
          clone.style.top = slotRect.top + "px";
          clone.style.width = slotRect.width + "px";
          clone.style.height = slotRect.height + "px";
          document.body.appendChild(clone);
          var dx = cardRect.left - slotRect.left, dy = cardRect.top - slotRect.top;
          var sx = cardRect.width / slotRect.width, sy = cardRect.height / slotRect.height;
          finish();
          var anim = clone.animate(
            [{ transform: "translate(0px,0px) scale(1,1)" },
             { transform: "translate(" + dx + "px," + dy + "px) scale(" + sx + "," + sy + ")" }],
            { duration: 550, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" }
          );
          var done = function () { try { clone.remove(); } catch (e) {} };
          if (anim && anim.onfinish !== undefined) anim.onfinish = done;
          else setTimeout(done, 600);
          return;
        }
      } catch (e) {}
      finish();
    } catch (e) {}
  }

  function initQuickView() {
    var E = qvEls();
    if (!E.qv) return;
    if (E.backdrop) E.backdrop.addEventListener("click", closeQuickView);
    if (E.close) E.close.addEventListener("click", closeQuickView);
    if (E.enquire) E.enquire.addEventListener("click", closeQuickView);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && qvOpen) closeQuickView();
    });
  }

  /* ---------- contact form ---------- */
  function initForm() {
    var form = $("#contactForm"), confirm = $("#formConfirm");
    if (!form || !confirm) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      try {
        var name = $("#fName"), email = $("#fEmail"), msg = $("#fMsg");
        var ok = name && name.value.trim() && email && email.value.trim() && msg && msg.value.trim();
        if (!ok) {
          [name, email, msg].forEach(function (f) {
            if (f && !f.value.trim()) f.style.borderBottomColor = "var(--color-accent)";
          });
          return;
        }
        confirm.innerHTML =
          '<p class="eyebrow">' + esc(UI.confirmEyebrow) + "</p>" +
          "<p>" + esc("Thank you" + (name.value.trim() ? ", " + name.value.trim().split(" ")[0] : "") +
            " — your request has been received. The atelier replies to private viewings within two days.") + "</p>";
        confirm.hidden = false;
        form.style.display = "none";
        confirm.classList.add("in-view");
      } catch (err) {}
    });
  }

  /* ---------- live customization ---------- */
  window.applyCustomization = function (custom) {
    try {
      if (!custom || typeof custom !== "object") return;
      var root = document.documentElement;

      if (typeof custom.brandName === "string" && custom.brandName.trim()) {
        try { setBrand(custom.brandName.trim()); } catch (e) {}
      }
      if (typeof custom.logoText === "string" && custom.logoText.trim()) {
        try {
          var mark = $("#brandMark");
          if (mark) mark.textContent = custom.logoText.trim();
        } catch (e) {}
      }
      if (typeof custom.primaryColor === "string" && custom.primaryColor.trim()) {
        try { root.style.setProperty("--color-primary", custom.primaryColor.trim()); } catch (e) {}
      }
      if (typeof custom.accentColor === "string" && custom.accentColor.trim()) {
        try { root.style.setProperty("--color-accent", custom.accentColor.trim()); } catch (e) {}
      }
      if (typeof custom.fontPair === "string" && custom.fontPair.indexOf("|") !== -1) {
        try {
          var parts = custom.fontPair.split("|");
          var disp = parts[0].trim(), body = parts[1].trim();
          if (disp && body) {
            var old = document.getElementById("custom-font-link");
            if (old && old.parentNode) old.parentNode.removeChild(old);
            var link = document.createElement("link");
            link.id = "custom-font-link";
            link.rel = "stylesheet";
            link.href = "https://fonts.googleapis.com/css2?family=" +
              encodeURIComponent(disp).replace(/%20/g, "+") + ":wght@300..700&family=" +
              encodeURIComponent(body).replace(/%20/g, "+") + ":wght@300..700&display=swap";
            document.head.appendChild(link);
            root.style.setProperty("--font-display", "'" + disp.replace(/'/g, "") + "',Georgia,serif");
            root.style.setProperty("--font-body", "'" + body.replace(/'/g, "") + "',system-ui,sans-serif");
          }
        } catch (e) {}
      }
      if (typeof custom.heroImage === "string" && custom.heroImage.indexOf("data:image") === 0) {
        try { var hi = $("#heroImg"); if (hi) hi.src = custom.heroImage; } catch (e) {}
      }
      if (Array.isArray(custom.productNames)) {
        try {
          custom.productNames.forEach(function (n, i) {
            if (typeof n === "string" && n.trim() && products[i]) products[i].name = n.trim();
          });
          renderProducts();
          renderPrism();
          if (REDUCED) { /* static re-render needs no motion restart */ }
        } catch (e) {}
      }
      if (custom.productImages && typeof custom.productImages === "object") {
        try {
          Object.keys(custom.productImages).forEach(function (k) {
            var i = parseInt(k, 10);
            var v = custom.productImages[k];
            if (!isNaN(i) && products[i] && typeof v === "string" && v.indexOf("data:image") === 0) {
              products[i].image = v;
            }
          });
          renderProducts();
          renderPrism();
        } catch (e) {}
      }
      if (typeof custom.currency === "string" && custom.currency.trim()) {
        try {
          products.forEach(function (p) { p.currency = custom.currency.trim(); });
          renderProducts();
          var qv = $("#qvPrice");
          if (qvOpen && qv) { /* price refreshes on next open */ }
        } catch (e) {}
      }
      if (typeof custom.contactEmail === "string" && custom.contactEmail.trim()) {
        try {
          if (!C.contact) C.contact = {};
          C.contact.email = custom.contactEmail.trim();
          renderContact();
        } catch (e) {}
      }
      if (typeof custom.instagramUrl === "string" && custom.instagramUrl.trim()) {
        try {
          if (!C.contact) C.contact = {};
          C.contact.instagram = custom.instagramUrl.trim();
          renderContact();
        } catch (e) {}
      }
    } catch (e) { /* never throw */ }
  };

  function applyUrlParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var patch = {};
      if (q.get("brand")) patch.brandName = q.get("brand");
      if (q.get("primary")) patch.primaryColor = q.get("primary");
      if (q.get("accent")) patch.accentColor = q.get("accent");
      if (Object.keys(patch).length) window.applyCustomization(patch);
    } catch (e) {}
  }

  /* ---------- boot ---------- */
  function boot() {
    try { renderStatic(); } catch (e) {}
    try { renderNav(); } catch (e) {}
    try { renderCollections(); } catch (e) {}
    try { renderProducts(); } catch (e) {}
    try { renderPrism(); } catch (e) {}
    try { renderProcess(); } catch (e) {}
    try { renderContact(); } catch (e) {}
    try { bindImgWraps(document); } catch (e) {}
    try { observeReveals(document); } catch (e) {}
    try { initChapters(); } catch (e) {}
    try { initNav(); } catch (e) {}
    try { initAnchorScroll(); } catch (e) {}
    try { initQuickView(); } catch (e) {}
    try { initForm(); } catch (e) {}
    try { initMagnetic(); } catch (e) {}
    try { initMotion(); } catch (e) {}
    try { applyUrlParams(); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
