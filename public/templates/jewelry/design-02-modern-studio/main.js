/* ============================================================
   Kela Jewels — design-02-modern-studio
   Vanilla JS. All text renders from window.TEMPLATE_CONTENT.
   Motion: vertical-crop reveals, hero depth, magnetic headline,
   scroll-linked figure drift, light sweep (CSS), product quick view.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Guards & helpers ---------- */
  var content = window.TEMPLATE_CONTENT || {};
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function setText(el, txt) { if (el && txt != null) el.textContent = txt; }
  function on(el, evt, fn) { if (el) el.addEventListener(evt, fn); }

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isTouch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  var state = {
    currency: "₹",
    brandName: (content.brand && content.brand.name) || "Kela Jewels"
  };

  /* ---------- Price ---------- */
  function formatPrice(n) {
    if (n == null || isNaN(Number(n))) return (content.ui && content.ui.priceFrom) || "Price on request";
    try {
      return state.currency + new Intl.NumberFormat("en-IN").format(Number(n));
    } catch (e) {
      return state.currency + Number(n).toLocaleString();
    }
  }

  /* ---------- Image loading: pearl shimmer + elegant fallback ---------- */
  function brandInitial() { return (state.brandName || "K").charAt(0).toUpperCase(); }

  function imageFallback(frame) {
    if (!frame || frame.dataset.fbk) return;
    frame.dataset.fbk = "1";
    frame.classList.add("loaded");
    frame.classList.remove("shimmer");
    var img = frame.querySelector("img");
    if (img) img.style.display = "none";
    var fb = document.createElement("div");
    fb.className = "img-fallback";
    var s = document.createElement("span");
    var i = document.createElement("i");
    i.textContent = brandInitial();
    s.appendChild(i);
    fb.appendChild(s);
    frame.appendChild(fb);
  }

  function wireImage(img) {
    if (!img) return;
    var frame = img.closest("[data-frame]") || img.parentElement;
    function ready() {
      img.classList.add("ready");
      if (frame) { frame.classList.add("loaded"); frame.classList.remove("shimmer"); }
    }
    if (img.complete && img.naturalWidth > 0) { ready(); return; }
    on(img, "load", ready);
    on(img, "error", function () { imageFallback(frame); });
  }

  function setFrameImage(frame, src, alt) {
    if (!frame) return;
    var img = frame.querySelector("img");
    if (!img) return;
    /* Same image already in the markup (e.g. the preloaded hero): keep it —
       resetting would flash the shimmer over a picture that is already there. */
    if (img.getAttribute("src") === src && !frame.dataset.fbk) {
      if (alt != null) img.alt = alt;
      wireImage(img);
      return;
    }
    delete frame.dataset.fbk;
    var old = frame.querySelector(".img-fallback");
    if (old) old.remove();
    img.style.display = "";
    img.classList.remove("ready");
    frame.classList.add("shimmer");
    frame.classList.remove("loaded");
    if (alt != null) img.alt = alt;
    wireImage(img);
    img.src = src;
  }

  /* ---------- Render: nav / hero ---------- */
  var NAV_TARGETS = ["#collections", "#products", "#story", "#contact"];

  function renderNav() {
    var names = $$(".brand-name");
    names.forEach(function (el) { setText(el, state.brandName); });
    var links = $(".nav-links");
    if (links && Array.isArray(content.nav)) {
      links.innerHTML = "";
      content.nav.forEach(function (label, i) {
        var a = document.createElement("a");
        a.href = NAV_TARGETS[i] || "#";
        a.textContent = label;
        links.appendChild(a);
      });
    }
    var mobile = $(".nav-mobile");
    if (mobile && Array.isArray(content.nav)) {
      mobile.innerHTML = "";
      content.nav.forEach(function (label, i) {
        var a = document.createElement("a");
        a.href = NAV_TARGETS[i] || "#";
        a.textContent = label;
        mobile.appendChild(a);
      });
    }
    var cta = $(".nav-cta");
    if (cta) {
      setText(cta, (content.brand && content.brand.cta) || "Enquire");
      var arr = document.createElement("span");
      arr.className = "arr";
      arr.setAttribute("aria-hidden", "true");
      arr.textContent = "→";
      cta.appendChild(arr);
    }
    var toggle = $(".nav-toggle");
    if (toggle) toggle.setAttribute("aria-label", (content.ui && content.ui.menuOpen) || "Open menu");
  }

  function splitMagnetic(el) {
    if (!el || !el.textContent) return [];
    var text = el.textContent;
    el.setAttribute("aria-label", text);
    el.textContent = "";
    var letters = [];
    /* letters live inside no-wrap word groups with real spaces between the
       groups: single-letter inline-blocks let lines break anywhere (the full
       stop of "Geometry, worn." wrapped onto a line of its own) */
    text.split(/\n/).forEach(function (line, li) {
      if (li > 0) el.appendChild(document.createElement("br"));
      line.split(/\s+/).filter(Boolean).forEach(function (word, wi) {
        if (wi > 0) el.appendChild(document.createTextNode(" "));
        var w = document.createElement("span");
        w.className = "mw";
        w.setAttribute("aria-hidden", "true");
        Array.from(word).forEach(function (ch) {
          var sp = document.createElement("span");
          sp.className = "ml";
          sp.textContent = ch;
          w.appendChild(sp);
          letters.push(sp);
        });
        el.appendChild(w);
      });
    });
    return letters;
  }

  function renderHero() {
    var h = content.hero || {};
    setText($(".hero-eyebrow"), h.eyebrow);
    var title = $("#heroTitle");
    if (title) {
      title.textContent = h.title || "";
      heroLetters = splitMagnetic(title);
    }
    setText($(".hero-sub"), h.subtitle);
    var p = $(".hero-cta-primary");
    if (p) {
      p.innerHTML = "";
      p.appendChild(document.createTextNode(h.ctaPrimary || ""));
      var a1 = document.createElement("span");
      a1.className = "arr"; a1.setAttribute("aria-hidden", "true"); a1.textContent = "→";
      p.appendChild(a1);
    }
    var s = $(".hero-cta-secondary");
    if (s) {
      s.innerHTML = "";
      s.appendChild(document.createTextNode(h.ctaSecondary || ""));
      var a2 = document.createElement("span");
      a2.className = "arr"; a2.setAttribute("aria-hidden", "true"); a2.textContent = "→";
      s.appendChild(a2);
    }
    var frame = $("[data-frame]", $("#hero") || document);
    var img = $(".hero-img");
    if (img && h.image) {
      setFrameImage(frame, h.image, h.imageAlt || "");
    } else if (img) { wireImage(img); }
    setText($(".hero-caption"), h.caption);
  }

  /* ---------- Render: collections ---------- */
  function renderCollections() {
    var head = content.collectionsHead || {};
    var heads = $$("#collections .section-head");
    if (heads[0]) {
      setText($(".eyebrow", heads[0]), head.eyebrow);
      setText($(".section-title", heads[0]), head.title);
    }
    var grid = $(".collections-grid");
    if (!grid || !Array.isArray(content.collections)) return;
    grid.innerHTML = "";
    content.collections.forEach(function (c, i) {
      var card = document.createElement("a");
      card.className = "collection-card reveal";
      card.href = "#products";
      card.style.transitionDelay = (i * 0.12) + "s";
      var fig = document.createElement("figure");
      fig.className = "collection-figure";
      var frame = document.createElement("div");
      frame.className = "img-frame shimmer";
      frame.setAttribute("data-frame", "");
      var img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = c.alt || c.name || "";
      frame.appendChild(img);
      fig.appendChild(frame);
      var meta = document.createElement("div");
      meta.className = "collection-meta";
      var left = document.createElement("div");
      var idx = document.createElement("div");
      idx.className = "collection-index";
      idx.textContent = "0" + (i + 1);
      var nm = document.createElement("div");
      nm.className = "collection-name";
      nm.textContent = c.name || "";
      left.appendChild(idx); left.appendChild(nm);
      var note = document.createElement("div");
      note.className = "collection-note";
      note.textContent = c.note || "";
      meta.appendChild(left); meta.appendChild(note);
      card.appendChild(fig); card.appendChild(meta);
      grid.appendChild(card);
      setFrameImage(frame, c.image, c.alt || c.name || "");
    });
  }

  /* ---------- Render: products ---------- */
  function renderProducts() {
    var head = content.productsHead || {};
    var heads = $$("#products .section-head");
    if (heads[0]) {
      setText($(".eyebrow", heads[0]), head.eyebrow);
      setText($(".section-title", heads[0]), head.title);
    }
    var list = $(".product-list");
    if (!list || !Array.isArray(content.products)) return;
    list.innerHTML = "";
    content.products.forEach(function (prod, i) {
      var row = document.createElement("article");
      row.className = "product-row reveal" + (i % 2 === 1 ? " flip" : "");
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      row.setAttribute("aria-label", (prod.name || "Product") + " — " + ((content.ui && content.ui.viewPiece) || "View"));
      row.dataset.index = i;

      var fig = document.createElement("figure");
      fig.className = "product-figure";
      var frame = document.createElement("div");
      frame.className = "img-frame shimmer";
      frame.setAttribute("data-frame", "");
      var img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = prod.alt || prod.name || "";
      frame.appendChild(img);
      fig.appendChild(frame);

      var info = document.createElement("div");
      info.className = "product-info";
      var idx = document.createElement("div");
      idx.className = "product-index";
      idx.textContent = "0" + (i + 1);
      var nm = document.createElement("h3");
      nm.className = "product-name";
      nm.textContent = prod.name || "";
      var desc = document.createElement("p");
      desc.className = "product-desc";
      desc.textContent = prod.description || "";
      var specs = document.createElement("p");
      specs.className = "product-specs";
      var parts = [];
      if (prod.material) parts.push(prod.material);
      if (prod.stone) parts.push(prod.stone);
      parts.forEach(function (t, k) {
        var sp = document.createElement("span");
        sp.textContent = t;
        specs.appendChild(sp);
      });
      var price = document.createElement("p");
      price.className = "product-price";
      price.dataset.price = prod.price;
      price.textContent = formatPrice(prod.price);
      var ctaRow = document.createElement("div");
      ctaRow.className = "product-cta-row";
      var view = document.createElement("span");
      view.className = "product-view";
      view.appendChild(document.createTextNode(((content.ui && content.ui.viewPiece) || "View") + " "));
      var ar = document.createElement("span");
      ar.className = "arr"; ar.setAttribute("aria-hidden", "true"); ar.textContent = "→";
      view.appendChild(ar);
      ctaRow.appendChild(view);

      info.appendChild(idx); info.appendChild(nm); info.appendChild(desc);
      info.appendChild(specs); info.appendChild(price); info.appendChild(ctaRow);
      row.appendChild(fig); row.appendChild(info);
      list.appendChild(row);
      setFrameImage(frame, prod.image, prod.alt || prod.name || "");
    });
  }

  /* ---------- Render: craftsmanship / story / contact / footer ---------- */
  function renderCraft() {
    var c = content.craftsmanship || {};
    var copy = $(".craft-copy");
    if (copy) {
      setText($(".eyebrow", copy), c.eyebrow);
      setText($(".section-title", copy), c.title);
      setText($(".body-copy", copy), c.body);
    }
    var steps = $(".craft-steps");
    if (steps && Array.isArray(c.steps)) {
      steps.innerHTML = "";
      c.steps.forEach(function (st, i) {
        var li = document.createElement("li");
        li.className = "reveal";
        li.style.transitionDelay = (i * 0.1) + "s";
        var n = document.createElement("span");
        n.className = "step-n"; n.textContent = st.n || "";
        var body = document.createElement("div");
        var t = document.createElement("div");
        t.className = "step-title"; t.textContent = st.title || "";
        var tx = document.createElement("div");
        tx.className = "step-text"; tx.textContent = st.text || "";
        body.appendChild(t); body.appendChild(tx);
        li.appendChild(n); li.appendChild(body);
        steps.appendChild(li);
      });
    }
    var frame = $("[data-frame]", $("#craftsmanship") || document);
    var img = $(".craft-img");
    if (img && c.image) setFrameImage(frame, c.image, c.imageAlt || "");
    else if (img) wireImage(img);
  }

  function renderStory() {
    var s = content.story || {};
    var inner = $(".story-inner");
    if (!inner) return;
    setText($(".eyebrow", inner), s.eyebrow);
    setText($(".story-title", inner), s.title);
    setText($(".story-quote", inner), s.quote ? "\u201C" + s.quote + "\u201D" : "");
    var body = $(".story-body", inner);
    if (body && Array.isArray(s.body)) {
      body.innerHTML = "";
      s.body.forEach(function (para, i) {
        var p = document.createElement("p");
        p.className = "reveal";
        p.style.transitionDelay = (i * 0.12) + "s";
        p.textContent = para;
        body.appendChild(p);
      });
    }
  }

  function renderContact() {
    var c = content.contact || {};
    var info = $(".contact-info");
    if (info) {
      setText($(".eyebrow", info), c.eyebrow);
      setText($(".section-title", info), c.title);
      var dl = $(".contact-details", info);
      if (dl) {
        dl.innerHTML = "";
        var labels = c.labels || {};
        var rows = [
          { k: "email", label: labels.email || "Email", href: c.email ? "mailto:" + c.email : null, text: c.email },
          { k: "phone", label: labels.phone || "Telephone", href: c.phone ? "tel:" + c.phone.replace(/[^+\d]/g, "") : null, text: c.phone },
          { k: "address", label: labels.address || "Atelier", href: null, text: c.address }
        ];
        rows.forEach(function (r) {
          if (!r.text) return;
          var wrap = document.createElement("div");
          var dt = document.createElement("dt"); dt.textContent = r.label;
          var dd = document.createElement("dd");
          if (r.href) { var a = document.createElement("a"); a.href = r.href; a.textContent = r.text; dd.appendChild(a); }
          else dd.textContent = r.text;
          wrap.appendChild(dt); wrap.appendChild(dd);
          dl.appendChild(wrap);
        });
      }
      var ig = $(".instagram-link", info);
      if (ig) {
        ig.innerHTML = "";
        ig.href = c.instagram || "#";
        ig.appendChild(document.createTextNode(c.instagramLabel || "Instagram"));
        var ar = document.createElement("span");
        ar.className = "arr"; ar.setAttribute("aria-hidden", "true"); ar.textContent = "↗";
        ig.appendChild(ar);
      }
    }
    var form = $(".contact-form");
    if (form) {
      var fields = $$(".field", form);
      var fl = [c.formName, c.formEmail, c.formMessage];
      fields.forEach(function (f, i) { setText($("label", f), fl[i] || ""); });
      var btn = $("button[type=submit]", form);
      if (btn) {
        btn.innerHTML = "";
        btn.appendChild(document.createTextNode(c.formSubmit || "Send"));
        var a2 = document.createElement("span");
        a2.className = "arr"; a2.setAttribute("aria-hidden", "true"); a2.textContent = "→";
        btn.appendChild(a2);
      }
    }
    var conf = $(".form-confirm");
    if (conf) {
      setText($("h3", conf), c.confirmTitle);
      setText($("p", conf), c.confirmBody);
    }
  }

  function renderFooter() {
    var f = content.footer || {};
    setText($(".footer-line"), f.line);
    setText($(".tagline", $("#siteFooter") || document), (content.brand && content.brand.tagline) || "");
    var nav = $(".footer-nav");
    if (nav && Array.isArray(content.nav)) {
      nav.innerHTML = "";
      content.nav.forEach(function (label, i) {
        var a = document.createElement("a");
        a.href = NAV_TARGETS[i] || "#";
        a.textContent = label;
        nav.appendChild(a);
      });
    }
    var names = $$("#siteFooter .brand-name");
    names.forEach(function (el) { setText(el, state.brandName); });
  }

  function renderAll() {
    renderNav();
    renderHero();
    renderCollections();
    renderProducts();
    renderCraft();
    renderStory();
    renderContact();
    renderFooter();
    if (state.brandName) document.title = state.brandName + " — Modern Jewellery Studio";
    initReveals();
  }

  /* ---------- Reveals (vertical crop + soft scale via IntersectionObserver) ---------- */
  var revealObserver = null;
  function initReveals() {
    var els = $$(".reveal, .reveal-crop");
    if (prefersReduced) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Hero depth + magnetic headline ----------
     Cursor depth is eased and the figure drifts with scroll position (a pure
     function of scrollY, so it tracks the page exactly). The old
     scroll-velocity "settle" was removed: velocity read from raw wheel
     deltas is noisy and made the hero figure shiver while scrolling.
     The loop only runs while something is still easing. */
  var heroLetters = [];
  var heroVisible = true;
  var mouseTX = 0.5, mouseTY = 0.5, mouseX = 0.5, mouseY = 0.5;
  var mouseInside = false, mouseVX = 0, mouseVY = 0;
  var rafRunning = false;

  function motionTick() {
    rafRunning = false;
    if (!heroVisible) return;
    var hero = $("#hero");
    if (!hero) return;

    // ease mouse toward target
    mouseX += (mouseTX - mouseX) * 0.08;
    mouseY += (mouseTY - mouseY) * 0.08;
    var drift = Math.min(60, (window.scrollY || 0) * 0.05);

    // read phase: letter boxes before any style write (no layout thrash)
    var rects = mouseInside ? heroLetters.map(function (sp) { return sp.getBoundingClientRect(); }) : null;

    // write phase — depth layers: 5–15px (+ scroll drift on the figure)
    $$("[data-depth]", hero).forEach(function (el) {
      var d = parseFloat(el.getAttribute("data-depth")) || 8;
      var tx = (mouseX - 0.5) * d;
      var ty = (mouseY - 0.5) * d + (el.classList.contains("hero-figure") ? drift : 0);
      el.style.transform = "translate3d(" + tx.toFixed(2) + "px," + ty.toFixed(2) + "px,0)";
    });

    // magnetic headline letters (≤3px) toward the pointer
    if (rects) {
      heroLetters.forEach(function (sp, i) {
        var r = rects[i];
        if (!r.width) return;
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = mouseVX - cx, dy = mouseVY - cy;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var strength = 3 * Math.exp(-dist / 320);
        var sx = (dx / dist) * strength, sy2 = (dy / dist) * strength;
        sp.style.transform = "translate3d(" + sx.toFixed(2) + "px," + sy2.toFixed(2) + "px,0)";
      });
    }

    if (Math.abs(mouseTX - mouseX) > 0.0005 || Math.abs(mouseTY - mouseY) > 0.0005) scheduleMotion();
  }

  function scheduleMotion() {
    if (!rafRunning && !prefersReduced && !isTouch && heroVisible) {
      rafRunning = true;
      requestAnimationFrame(motionTick);
    }
  }

  function initMotion() {
    var hero = $("#hero");
    if (!hero || prefersReduced || isTouch) return;
    if (!("IntersectionObserver" in window)) return;
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        heroVisible = e.isIntersecting;
        if (heroVisible) scheduleMotion();
      });
    }, { threshold: 0 }).observe(hero);

    on(hero, "mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mouseTX = Math.max(0, Math.min(1, (e.clientX - r.left) / (r.width || 1)));
      mouseTY = Math.max(0, Math.min(1, (e.clientY - r.top) / (r.height || 1)));
      mouseVX = e.clientX; mouseVY = e.clientY;
      mouseInside = true;
      scheduleMotion();
    });
    on(hero, "mouseleave", function () {
      mouseTX = 0.5; mouseTY = 0.5;
      mouseInside = false;
      heroLetters.forEach(function (sp) { sp.style.transform = ""; });
      scheduleMotion();
    });
    on(window, "scroll", scheduleMotion, { passive: true });
    scheduleMotion();
  }

  /* ---------- Quick view (image expands from its position into a panel) ---------- */
  var qvState = { open: false, sourceRow: null, lastFocus: null };

  function qvEls() {
    return {
      root: $("#quickView"),
      ghost: $(".qv-ghost"),
      ghostImg: $(".qv-ghost img"),
      panel: $(".qv-panel"),
      slotFrame: $(".qv-media [data-frame]"),
      slotImg: $(".qv-img")
    };
  }

  function fillQv(prod, i) {
    var ui = content.ui || {};
    setText($(".qv-eyebrow"), ((content.productsHead || {}).eyebrow) || "");
    setText($("#qvName"), prod.name);
    setText($(".qv-desc"), prod.description);
    var specs = $(".qv-specs");
    if (specs) {
      specs.innerHTML = "";
      [["Material", prod.material], ["Stone", prod.stone]].forEach(function (pair) {
        if (!pair[1]) return;
        var wrap = document.createElement("div");
        var dt = document.createElement("dt"); dt.textContent = pair[0];
        var dd = document.createElement("dd"); dd.textContent = pair[1];
        wrap.appendChild(dt); wrap.appendChild(dd);
        specs.appendChild(wrap);
      });
    }
    var price = $(".qv-price");
    if (price) { price.dataset.price = prod.price; price.textContent = formatPrice(prod.price); }
    var cta = $(".qv-cta");
    if (cta) setText(cta, ui.quickViewCta || "Enquire");
    var close = $(".qv-close");
    if (close) close.setAttribute("aria-label", ui.quickViewClose || "Close");
  }

  function ghostTo(rect, instant) {
    var g = qvEls();
    if (!g.ghost) return;
    g.ghost.style.transition = instant ? "none" : "";
    g.ghost.style.opacity = "1";
    g.ghost.style.left = rect.left + "px";
    g.ghost.style.top = rect.top + "px";
    g.ghost.style.width = rect.width + "px";
    g.ghost.style.height = rect.height + "px";
  }

  function openQv(row) {
    var g = qvEls();
    if (!g.root || !g.panel) return;
    var i = parseInt(row.dataset.index, 10);
    var prod = (content.products || [])[i];
    if (!prod) return;

    qvState.open = true;
    qvState.sourceRow = row;
    qvState.lastFocus = document.activeElement;

    fillQv(prod, i);
    var frame = $(".product-figure .img-frame", row);
    var srcRect = frame ? frame.getBoundingClientRect() : { left: 0, top: 0, width: 300, height: 375 };
    var gimg = g.ghostImg;
    if (gimg) { gimg.src = prod.image || ""; gimg.alt = prod.alt || prod.name || ""; }

    // place panel image (kept under the ghost until the move completes)
    if (g.slotFrame) setFrameImage(g.slotFrame, prod.image, prod.alt || prod.name || "");

    g.root.hidden = false;
    // measure the final slot position with the panel laid out but transition paused
    g.root.classList.add("measuring");
    g.panel.style.transition = "none";
    g.panel.style.transform = "none";
    var slotRect = g.slotFrame ? g.slotFrame.getBoundingClientRect() : srcRect;
    g.panel.style.transition = "";
    g.panel.style.transform = "";
    g.root.classList.remove("measuring");

    g.root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (prefersReduced) {
      if (g.ghost) g.ghost.style.opacity = "0";
      g.root.classList.add("open");
      var c1 = $(".qv-close"); if (c1) c1.focus();
      return;
    }

    ghostTo(srcRect, true);
    // force layout, then animate panel in + ghost to slot
    void g.root.offsetWidth;
    g.root.classList.add("open");
    requestAnimationFrame(function () {
      ghostTo(slotRect, false);
    });
    var ghost = g.ghost;
    function onArrive(e) {
      if (e && e.propertyName && e.propertyName !== "left" && e.propertyName !== "top" && e.propertyName !== "width" && e.propertyName !== "height") return;
      ghost.removeEventListener("transitionend", onArrive);
      ghost.style.opacity = "0";
    }
    if (ghost) {
      ghost.addEventListener("transitionend", onArrive);
      setTimeout(function () { ghost.removeEventListener("transitionend", onArrive); ghost.style.opacity = "0"; }, 900);
    }
    var c2 = $(".qv-close"); if (c2) c2.focus();
  }

  function closeQv() {
    var g = qvEls();
    if (!g.root || !qvState.open) return;
    qvState.open = false;
    document.body.style.overflow = "";

    function finish() {
      g.root.classList.remove("open");
      g.root.hidden = true;
      g.root.setAttribute("aria-hidden", "true");
      if (qvState.lastFocus && qvState.lastFocus.focus) qvState.lastFocus.focus();
      qvState.sourceRow = null;
    }

    if (prefersReduced) { finish(); return; }

    var row = qvState.sourceRow;
    var frame = row ? $(".product-figure .img-frame", row) : null;
    var dst = frame ? frame.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    var slot = g.slotFrame ? g.slotFrame.getBoundingClientRect() : dst;
    ghostTo(slot, true);
    void g.root.offsetWidth;
    g.root.classList.remove("open");
    requestAnimationFrame(function () { ghostTo(dst, false); });
    var ghost = g.ghost;
    setTimeout(function () {
      if (ghost) ghost.style.opacity = "0";
      finish();
    }, 700);
  }

  function initQuickView() {
    var list = $(".product-list");
    if (!list) return;
    on(list, "click", function (e) {
      var row = e.target.closest ? e.target.closest(".product-row") : null;
      if (row) openQv(row);
    });
    on(list, "keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var row = e.target.closest ? e.target.closest(".product-row") : null;
      if (row && e.target === row) { e.preventDefault(); openQv(row); }
    });
    var g = qvEls();
    $$("[data-qv-close]", g.root || document).forEach(function (b) { on(b, "click", closeQv); });
    on(document, "keydown", function (e) { if (e.key === "Escape" && qvState.open) closeQv(); });
    var cta = $(".qv-cta");
    on(cta, "click", function () {
      var i = qvState.sourceRow ? parseInt(qvState.sourceRow.dataset.index, 10) : 0;
      var prod = (content.products || [])[i];
      closeQv();
      var msg = $("textarea[name=message]");
      if (msg && prod) msg.value = "I would like to enquire about the " + (prod.name || "piece") + ".";
      var contact = $("#contact");
      if (contact) setTimeout(function () { contact.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" }); }, 80);
    });
  }

  /* ---------- In-page links: smooth glide in JS ----------
     (replaces CSS scroll-behavior:smooth, which also slowed every
     programmatic scroll; instant under reduced motion) */
  function initAnchorScroll() {
    on(document, "click", function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = (a.getAttribute("href") || "").slice(1);
      var target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      try { target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- Mobile nav ---------- */
  function initNav() {
    var toggle = $(".nav-toggle");
    var mobile = $(".nav-mobile");
    if (!toggle || !mobile) return;
    on(toggle, "click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", (!open ? (content.ui && content.ui.menuClose) : (content.ui && content.ui.menuOpen)) || "Menu");
      mobile.hidden = open;
    });
    on(mobile, "click", function (e) {
      if (e.target && e.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      }
    });
  }

  /* ---------- Contact form (demo with elegant confirmation) ---------- */
  function initForm() {
    var form = $(".contact-form");
    var conf = $(".form-confirm");
    if (!form || !conf) return;
    on(form, "submit", function (e) {
      e.preventDefault();
      var name = $("input[name=name]", form);
      var email = $("input[name=email]", form);
      var ok = true;
      [name, email].forEach(function (f) {
        if (!f) return;
        var bad = !f.value || !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.style.borderBottomColor = bad ? "var(--color-error)" : "";
        if (bad) ok = false;
      });
      if (!ok) return;
      form.classList.add("fading");
      setTimeout(function () {
        form.style.display = "none";
        conf.hidden = false;
        if (!prefersReduced) {
          conf.style.opacity = "0";
          requestAnimationFrame(function () {
            conf.style.transition = "opacity 0.8s ease";
            conf.style.opacity = "1";
          });
        }
      }, prefersReduced ? 0 : 600);
    });
  }

  /* ---------- applyCustomization (platform contract) ---------- */
  function refreshPrices() {
    $$(".product-price").forEach(function (el) {
      el.textContent = formatPrice(el.dataset.price);
    });
    var qp = $(".qv-price");
    if (qp && qp.dataset.price != null) qp.textContent = formatPrice(qp.dataset.price);
  }

  function applyFontPair(pair) {
    if (typeof pair !== "string") return;
    var parts = pair.split("|").map(function (s) { return s.trim(); }).filter(Boolean);
    if (!parts.length) return;
    var fam = parts.map(function (n) { return "family=" + encodeURIComponent(n).replace(/%20/g, "+") + ":wght@300;400;500"; }).join("&");
    var link = document.getElementById("custom-fonts");
    if (!link) {
      link = document.createElement("link");
      link.id = "custom-fonts";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = "https://fonts.googleapis.com/css2?" + fam + "&display=swap";
    var root = document.documentElement.style;
    root.setProperty("--font-display", '"' + parts[0] + '", serif');
    if (parts[1]) root.setProperty("--font-body", '"' + parts[1] + '", sans-serif');
  }

  window.applyCustomization = function (custom) {
    if (!custom || typeof custom !== "object") return;
    var root = document.documentElement.style;
    var html = document.documentElement;
    html.classList.add("is-theming");

    try {
      if (custom.primaryColor) root.setProperty("--color-primary", String(custom.primaryColor));
      if (custom.accentColor) root.setProperty("--color-accent", String(custom.accentColor));
      if (custom.fontPair) applyFontPair(custom.fontPair);

      if (custom.brandName) {
        var old = state.brandName;
        state.brandName = String(custom.brandName);
        renderNav();
        renderFooter();
        var fl = $(".footer-line");
        if (fl && old && fl.textContent.indexOf(old) !== -1) {
          fl.textContent = fl.textContent.split(old).join(state.brandName);
        }
        document.title = state.brandName + " — Modern Jewellery Studio";
      }
      if (custom.logoText) {
        $$(".site-nav .brand-name").forEach(function (el) { el.textContent = String(custom.logoText); });
      }
      if (custom.heroImage) {
        var frame = $("[data-frame]", $("#hero") || document);
        if (frame) setFrameImage(frame, String(custom.heroImage), ($(".hero-img") || {}).alt || "");
      }
      if (custom.currency) {
        state.currency = String(custom.currency);
        refreshPrices();
      }
      if (custom.contactEmail) {
        var c = content.contact || {};
        c.email = String(custom.contactEmail);
        renderContact();
      }
      if (custom.instagramUrl) {
        var c2 = content.contact || {};
        c2.instagram = String(custom.instagramUrl);
        renderContact();
      }
      if (Array.isArray(custom.productNames)) {
        custom.productNames.forEach(function (nm, i) {
          if (content.products && content.products[i] && nm) content.products[i].name = String(nm);
        });
        renderProducts();
        initReveals();
      }
      if (custom.productImages && typeof custom.productImages === "object") {
        Object.keys(custom.productImages).forEach(function (k) {
          var idx = -1;
          if (/^\d+$/.test(k)) idx = parseInt(k, 10);
          else {
            var m = /^product-(\d+)$/.exec(k);
            if (m) idx = parseInt(m[1], 10) - 1;
          }
          if (idx >= 0 && content.products && content.products[idx]) {
            content.products[idx].image = String(custom.productImages[k]);
          }
        });
        renderProducts();
        initReveals();
      }
    } finally {
      setTimeout(function () { html.classList.remove("is-theming"); }, 750);
    }
  };

  function applyUrlParams() {
    var q = {};
    try {
      var sp = new URLSearchParams(window.location.search);
      ["brand", "primary", "accent"].forEach(function (k) {
        var v = sp.get(k);
        if (v) q[k] = v;
      });
    } catch (e) { return; }
    if (!q.brand && !q.primary && !q.accent) return;
    window.applyCustomization({
      brandName: q.brand,
      primaryColor: q.primary,
      accentColor: q.accent
    });
  }

  /* ---------- Init ---------- */
  function init() {
    // hero + craft images in static markup get wired during render
    renderAll();
    initMotion();
    initQuickView();
    initNav();
    initAnchorScroll();
    initForm();
    applyUrlParams();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
