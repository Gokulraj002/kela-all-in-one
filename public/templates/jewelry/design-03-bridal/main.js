/* ============================================================
   Kela Jewels — design-03-bridal · main.js
   Vanilla JS. Renders all copy from window.TEMPLATE_CONTENT.
   Soft Romantic Motion: reveals, depth, magnetic type,
   light sweeps, quick view, material
   switcher, try-the-look demo.
   ============================================================ */
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

  /* ---------- helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function getContent() {
    return (window.TEMPLATE_CONTENT && typeof window.TEMPLATE_CONTENT === "object")
      ? window.TEMPLATE_CONTENT
      : {};
  }
  var C = getContent();

  function resolve(path, obj) {
    if (!path) return undefined;
    var parts = String(path).split(".");
    var cur = obj || C;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null || typeof cur !== "object") return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  var state = { currency: "₹" };

  function fmtPrice(value) {
    var n = Number(value);
    if (!isFinite(n)) return "";
    try {
      return state.currency + new Intl.NumberFormat("en-IN").format(n);
    } catch (e) {
      return state.currency + n;
    }
  }

  function brandInitial() {
    var name = resolve("brand.name") || "Kela Jewels";
    return name.trim().charAt(0) || "É";
  }

  /* ---------- image fallback + skeleton ---------- */
  function armImage(img) {
    if (!img || img.__armed) return;
    img.__armed = true;
    var shell = img.closest(".img-shell");

    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      var ph = document.createElement("div");
      ph.className = "img-fallback";
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", img.getAttribute("alt") || brandInitial());
      var s = document.createElement("span");
      s.setAttribute("aria-hidden", "true");
      s.textContent = brandInitial();
      ph.appendChild(s);
      if (shell) shell.classList.add("loaded");
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    });

    var markLoaded = function () { if (shell) shell.classList.add("loaded"); };
    img.addEventListener("load", markLoaded);
    if (img.complete && img.naturalWidth > 0) markLoaded();
  }

  function armAllImages(root) {
    $$("img", root).forEach(armImage);
  }

  /* ---------- static text from content ---------- */
  function applyStaticText() {
    $$("[data-content]").forEach(function (el) {
      var val = resolve(el.getAttribute("data-content"));
      if (typeof val === "string") el.textContent = val;
    });
  }

  /* ---------- nav ---------- */
  var NAV_TARGETS = ["#collections", "#products", "#story", "#contact"];
  function buildNav() {
    var labels = resolve("nav");
    if (!Array.isArray(labels)) labels = [];
    var ul = $("#navList");
    var foot = $("#footList");
    if (ul) {
      ul.innerHTML = "";
      labels.forEach(function (label, i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = NAV_TARGETS[i] || "#";
        a.textContent = label;
        li.appendChild(a);
        ul.appendChild(li);
      });
    }
    if (foot) {
      foot.innerHTML = "";
      labels.forEach(function (label, i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = NAV_TARGETS[i] || "#";
        a.textContent = label;
        li.appendChild(a);
        foot.appendChild(li);
      });
    }
  }

  /* ---------- collections ---------- */
  function buildCollections() {
    var grid = $("#collectionGrid");
    if (!grid) return;
    var items = resolve("collections");
    if (!Array.isArray(items)) items = [];
    grid.innerHTML = "";
    items.forEach(function (item, i) {
      var card = document.createElement("article");
      card.className = "coll-item rv";

      var fig = document.createElement("figure");
      fig.className = "img-shell sweep";
      var img = document.createElement("img");
      img.src = item.image || "";
      img.alt = (item.name || "Collection") + " — Kela Jewels bridal jewelry";
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);

      var cap = document.createElement("div");
      cap.className = "coll-cap";
      var num = document.createElement("span");
      num.className = "coll-num";
      num.textContent = "0" + (i + 1);
      var name = document.createElement("h3");
      name.className = "coll-name";
      name.textContent = item.name || "";
      var tag = document.createElement("span");
      tag.className = "coll-tag";
      tag.textContent = item.tagline || "";
      cap.appendChild(num);
      cap.appendChild(name);
      cap.appendChild(tag);

      card.appendChild(fig);
      card.appendChild(cap);
      grid.appendChild(card);
    });
  }

  /* ---------- products ---------- */
  function buildProducts() {
    var list = $("#productList");
    if (!list) return;
    var items = resolve("products");
    if (!Array.isArray(items)) items = [];
    list.innerHTML = "";
    items.forEach(function (p, i) {
      var row = document.createElement("article");
      row.className = "product-row rv";
      row.setAttribute("tabindex", "0");
      row.setAttribute("role", "button");
      row.setAttribute("aria-label", "View " + (p.name || "piece"));

      var media = document.createElement("div");
      media.className = "p-media img-shell sweep";
      var img = document.createElement("img");
      img.src = p.image || "";
      img.alt = (p.name || "Piece") + " — Kela Jewels";
      img.loading = "lazy";
      img.decoding = "async";
      media.appendChild(img);

      var info = document.createElement("div");
      info.className = "p-info";
      var idx = document.createElement("p");
      idx.className = "p-index";
      idx.textContent = "N°" + (i + 1);
      var name = document.createElement("h3");
      name.className = "p-name display";
      name.textContent = p.name || "";
      var desc = document.createElement("p");
      desc.className = "p-desc";
      desc.textContent = p.description || "";
      var specs = document.createElement("div");
      specs.className = "p-specs";
      [p.material, p.stone].forEach(function (s) {
        if (!s) return;
        var sp = document.createElement("span");
        sp.textContent = s;
        specs.appendChild(sp);
      });
      var price = document.createElement("p");
      price.className = "p-price";
      price.textContent = fmtPrice(p.price);
      var view = document.createElement("span");
      view.className = "p-view";
      var vt = document.createElement("span");
      vt.textContent = "View piece";
      var arr = document.createElement("span");
      arr.className = "arr";
      arr.setAttribute("aria-hidden", "true");
      arr.textContent = "→";
      view.appendChild(vt);
      view.appendChild(arr);

      info.appendChild(idx);
      info.appendChild(name);
      info.appendChild(desc);
      info.appendChild(specs);
      info.appendChild(price);
      info.appendChild(view);

      row.appendChild(media);
      row.appendChild(info);
      row.__product = p;
      row.__index = i;

      var open = function () { openQuickView(p, i, media); };
      row.addEventListener("click", open);
      row.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      list.appendChild(row);
    });
  }

  /* ---------- craftsmanship / story ---------- */
  function buildCraft() {
    var steps = $("#craftSteps");
    if (steps) {
      var arr = resolve("craftsmanship.steps");
      if (!Array.isArray(arr)) arr = [];
      steps.innerHTML = "";
      arr.forEach(function (s) {
        var li = document.createElement("li");
        var h = document.createElement("h4");
        h.textContent = s.title || "";
        var p = document.createElement("p");
        p.textContent = s.text || "";
        li.appendChild(h);
        li.appendChild(p);
        steps.appendChild(li);
      });
    }
  }

  function buildStory() {
    var body = $("#storyBody");
    if (body) {
      var paras = resolve("story.body");
      if (!Array.isArray(paras)) paras = [];
      body.innerHTML = "";
      paras.forEach(function (t) {
        var p = document.createElement("p");
        p.className = "body-copy";
        p.textContent = t;
        body.appendChild(p);
      });
    }
  }

  /* ---------- contact ---------- */
  function buildContact() {
    var dl = $("#contactDetails");
    var contact = resolve("contact") || {};
    if (dl) {
      dl.innerHTML = "";
      var rows = [
        ["Email", contact.email, "mailto:" + contact.email],
        ["Phone", contact.phone, "tel:" + String(contact.phone || "").replace(/\s+/g, "")],
        ["Salon", contact.address, null]
      ];
      rows.forEach(function (r) {
        if (!r[1]) return;
        var wrap = document.createElement("div");
        var dt = document.createElement("dt");
        dt.textContent = r[0];
        var dd = document.createElement("dd");
        if (r[2]) {
          var a = document.createElement("a");
          a.href = r[2];
          a.textContent = r[1];
          dd.appendChild(a);
        } else {
          dd.textContent = r[1];
        }
        wrap.appendChild(dt);
        wrap.appendChild(dd);
        dl.appendChild(wrap);
      });
    }
    var insta = $("#instaLink");
    if (insta && contact.instagramUrl) insta.href = contact.instagramUrl;
  }

  /* ---------- reveals ---------- */
  function initReveals() {
    var els = $$(".rv, .reveal-crop");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el, i) {
      el.style.transitionDelay = Math.min((i % 4) * 90, 270) + "ms";
      io.observe(el);
    });
  }

  /* ---------- motion: depth + magnetic type ----------
     Cursor-driven and eased; the loop sleeps once settled. The old
     scroll-velocity offset on the hero photo was removed: velocity read
     from raw wheel deltas is noisy and made the hero shiver while
     scrolling (and it snapped back to 0 when it settled). */
  var fine = window.matchMedia("(pointer: fine)").matches;
  var reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  function motionOK() { return fine && !reducedMQ.matches; }

  function initMotion() {
    if (!motionOK()) return;
    var heroMedia = $(".hero-media");
    var depthEls = $$("[data-depth]").filter(function (el) { return el !== heroMedia; });
    var title = $("#heroTitle");
    var mx = 0, my = 0, cx = 0, cy = 0;
    var rafId = null;

    window.addEventListener("mousemove", function (e) {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    function frame() {
      rafId = null;
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;

      var i, el, d;
      for (i = 0; i < depthEls.length; i++) {
        el = depthEls[i];
        d = parseFloat(el.getAttribute("data-depth")) || 0;
        el.style.setProperty("--dx", (cx * d * 14).toFixed(2) + "px");
        el.style.setProperty("--dy", (cy * d * 14).toFixed(2) + "px");
      }
      if (title) {
        title.style.setProperty("--mx", (cx * 3).toFixed(2) + "px");
        title.style.setProperty("--my", (cy * 3).toFixed(2) + "px");
      }
      if (heroMedia) {
        heroMedia.style.transform = "translate3d(" + (cx * 0.35 * 14).toFixed(2) + "px," +
          (cy * 0.35 * 14).toFixed(2) + "px,0)";
      }

      if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) {
        rafId = requestAnimationFrame(frame);
      }
    }

    function kick() { if (rafId === null) rafId = requestAnimationFrame(frame); }
    window.addEventListener("mousemove", kick, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      else kick();
    });
    kick();

    reducedMQ.addEventListener("change", function () {
      if (reducedMQ.matches && rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    });
  }

  /* ---------- material switcher ---------- */
  var METAL_FILTERS = {
    "18K Gold":  "sepia(.38) saturate(1.25) hue-rotate(-12deg) brightness(1.03) contrast(1.02)",
    "White Gold":"saturate(.72) brightness(1.07) contrast(1.04) hue-rotate(8deg)",
    "Rose Gold": "saturate(1.06) brightness(1.0)",
    "Platinum":  "saturate(.5) brightness(1.12) contrast(1.06)"
  };
  var METAL_DOTS = {
    "18K Gold": "var(--metal-gold)",
    "White Gold": "var(--metal-white)",
    "Rose Gold": "var(--metal-rose)",
    "Platinum": "var(--metal-platinum)"
  };

  function initMaterialSwitcher() {
    var stage = $("#materialStage");
    var base = $("#materialImg");
    var ghost = $("#materialGhost");
    var btns = $("#materialBtns");
    var label = $("#materialName");
    var dot = $(".mat-dot");
    if (!stage || !base || !btns) return;

    var mats = resolve("materials");
    if (!Array.isArray(mats) || !mats.length) mats = Object.keys(METAL_FILTERS);
    btns.innerHTML = "";

    var current = mats.indexOf(resolve("hero.materialLabel"));
    if (current < 0) current = mats.indexOf("Rose Gold");
    if (current < 0) current = 0;

    function paint(metal) {
      if (dot) dot.style.background = METAL_DOTS[metal] || "var(--metal-rose)";
    }

    function select(metal, btn) {
      if (!METAL_FILTERS[metal]) return;
      $$(".mat-btn", btns).forEach(function (b) { b.classList.remove("active"); });
      if (btn) btn.classList.add("active");

      ghost.style.filter = METAL_FILTERS[metal];
      stage.classList.add("morphing");
      stage.classList.add("morph");

      if (label) {
        label.parentElement.classList.add("swap");
        setTimeout(function () {
          label.textContent = metal;
          paint(metal);
          label.parentElement.classList.remove("swap");
        }, 320);
      } else {
        paint(metal);
      }

      setTimeout(function () {
        base.style.filter = METAL_FILTERS[metal];
        stage.classList.remove("morph");
        stage.classList.remove("morphing");
      }, reducedMQ.matches ? 60 : 760);
    }

    mats.forEach(function (metal, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "mat-btn";
      b.setAttribute("data-metal", metal);
      var dotI = document.createElement("i");
      dotI.setAttribute("aria-hidden", "true");
      var t = document.createElement("span");
      t.textContent = metal;
      b.appendChild(dotI);
      b.appendChild(t);
      b.addEventListener("click", function () { select(metal, b); });
      btns.appendChild(b);
      if (i === current) {
        b.classList.add("active");
        base.style.filter = METAL_FILTERS[metal] || "";
        ghost.style.filter = METAL_FILTERS[metal] || "";
        if (label) label.textContent = metal;
        paint(metal);
      }
    });
  }

  /* ---------- quick view ---------- */
  var qvOpen = false;

  function openQuickView(p, index, sourceMedia) {
    var qv = $("#quickView");
    var fly = $("#qvFly");
    var slot = $("#qvMediaSlot");
    if (!qv || !slot) return;

    $("#qvIndex").textContent = "N°" + (index + 1);
    $("#qvName").textContent = p.name || "";
    $("#qvDesc").textContent = p.description || "";
    $("#qvMaterial").textContent = p.material || "—";
    $("#qvStone").textContent = p.stone || "—";
    $("#qvPrice").textContent = fmtPrice(p.price);

    slot.innerHTML = "";
    var ph = document.createElement("div");
    ph.className = "img-shell";
    ph.style.cssText = "position:absolute;inset:0;";
    var img = document.createElement("img");
    img.src = p.image || "";
    img.alt = (p.name || "Piece") + " — Kela Jewels";
    ph.appendChild(img);
    slot.style.position = "relative";
    slot.appendChild(ph);
    armImage(img);

    qv.classList.add("open");
    qv.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    qvOpen = true;

    if (fly && sourceMedia && !reducedMQ.matches) {
      var r = sourceMedia.getBoundingClientRect();
      var target = slot.getBoundingClientRect();
      fly.src = p.image || "";
      fly.alt = "";
      fly.style.left = r.left + "px";
      fly.style.top = r.top + "px";
      fly.style.width = r.width + "px";
      fly.style.height = r.height + "px";
      fly.style.opacity = "1";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var t2 = slot.getBoundingClientRect();
          fly.style.left = t2.left + "px";
          fly.style.top = t2.top + "px";
          fly.style.width = t2.width + "px";
          fly.style.height = t2.height + "px";
        });
      });
      setTimeout(function () { fly.style.opacity = "0"; }, 850);
    }

    var closeBtn = $("#qvClose");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeQuickView() {
    var qv = $("#quickView");
    var fly = $("#qvFly");
    if (!qv || !qvOpen) return;
    qv.classList.remove("open");
    qv.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (fly) fly.style.opacity = "0";
    qvOpen = false;
  }

  function initQuickView() {
    var closeBtn = $("#qvClose");
    var backdrop = $("#qvBackdrop");
    var fly = $("#qvFly");
    if (fly) fly.addEventListener("error", function () { fly.style.opacity = "0"; });
    if (closeBtn) closeBtn.addEventListener("click", closeQuickView);
    if (backdrop) backdrop.addEventListener("click", closeQuickView);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && qvOpen) closeQuickView();
    });
    var cta = $("#qvCta");
    if (cta) cta.addEventListener("click", closeQuickView);
  }

  /* ---------- try the look ---------- */
  var ACCEPTED = ["image/png", "image/jpeg", "image/webp"];

  function initTryLook() {
    var dz = $("#dropzone");
    var input = $("#tryFile");
    if (!dz || !input) return;
    var empty = $("#dzEmpty");
    var prev = $("#dzPreview");
    var img = $("#tryImg");
    var nameEl = $("#tryName");
    var dimsEl = $("#tryDims");

    function openPicker() { input.click(); }
    dz.addEventListener("click", function (e) {
      if (e.target.closest("#tryReplace") || e.target.closest("#tryRemove")) return;
      if (prev.hidden) openPicker();
    });
    dz.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && prev.hidden) { e.preventDefault(); openPicker(); }
    });

    ["dragenter", "dragover"].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.add("dragging"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      dz.addEventListener(ev, function (e) { e.preventDefault(); dz.classList.remove("dragging"); });
    });
    dz.addEventListener("drop", function (e) {
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) handleFile(f);
    });
    input.addEventListener("change", function () {
      if (input.files && input.files[0]) handleFile(input.files[0]);
      input.value = "";
    });

    function handleFile(file) {
      var okType = ACCEPTED.indexOf(file.type) !== -1 ||
        /\.(png|jpe?g|webp)$/i.test(file.name || "");
      if (!okType) {
        dz.classList.add("dragging");
        setTimeout(function () { dz.classList.remove("dragging"); }, 600);
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        img.onload = function () {
          empty.hidden = true;
          prev.hidden = false;
          nameEl.textContent = file.name || "Your photograph";
          dimsEl.textContent = img.naturalWidth + " × " + img.naturalHeight + " px";
          dz.setAttribute("aria-label", "Your uploaded photograph. Replace or remove it below.");
        };
        img.onerror = function () {
          empty.hidden = false;
          prev.hidden = true;
        };
        img.src = reader.result;
        img.alt = "Your uploaded photograph in the Kela Jewels styling frame";
      };
      reader.readAsDataURL(file);
    }

    var replaceBtn = $("#tryReplace");
    var removeBtn = $("#tryRemove");
    if (replaceBtn) replaceBtn.addEventListener("click", function (e) { e.stopPropagation(); openPicker(); });
    if (removeBtn) removeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      img.removeAttribute("src");
      empty.hidden = false;
      prev.hidden = true;
      dz.setAttribute("aria-label", "Upload a photo");
    });
  }

  /* ---------- contact form (demo) ---------- */
  function initForm() {
    var form = $("#contactForm");
    var confirm = $("#formConfirm");
    if (!form || !confirm) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = $("#fName");
      var emailEl = $("#fEmail");
      var name = nameEl && nameEl.value.trim();
      var email = emailEl && emailEl.value.trim();
      if (!name || !email || (emailEl && !emailEl.checkValidity())) {
        if (!name && nameEl) nameEl.focus();
        else if (emailEl) emailEl.focus();
        return;
      }
      var body = $("#confirmBody");
      var template = resolve("formLabels.confirmBody") || "Our bridal consultant will write to you within one business day.";
      if (body) body.textContent = "Dear " + name + " — " + template.charAt(0).toLowerCase() + template.slice(1);
      form.hidden = true;
      confirm.hidden = false;
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
      try { target.scrollIntoView({ behavior: reducedMQ.matches ? "auto" : "smooth", block: "start" }); }
      catch (err) { target.scrollIntoView(); }
    });
  }

  /* ---------- nav behaviour ---------- */
  function initNav() {
    var nav = $("#siteNav");
    var toggle = $("#navToggle");
    var links = $(".nav-links");
    if (nav) {
      var navScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 24); };
      window.addEventListener("scroll", rafThrottle(navScroll), { passive: true });
      navScroll();
    }
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---------- applyCustomization ---------- */
  function setVar(name, value) {
    if (typeof value === "string" && value.trim()) {
      document.documentElement.style.setProperty(name, value.trim());
    }
  }

  function refreshProductPrices() {
    var items = resolve("products");
    if (!Array.isArray(items)) return;
    var rows = $$(".product-row");
    rows.forEach(function (row, i) {
      if (!items[i]) return;
      if (typeof items[i].price === "number") {
        var priceEl = $(".p-price", row);
        if (priceEl) priceEl.textContent = fmtPrice(items[i].price);
      }
      if (typeof items[i].name === "string") {
        var nameEl = $(".p-name", row);
        if (nameEl) nameEl.textContent = items[i].name;
      }
      if (typeof items[i].image === "string" && items[i].image) {
        var img = $("img", row);
        if (img) { img.src = items[i].image; armImage(img); }
      }
    });
  }

  function applyBrandName(name) {
    if (typeof name !== "string" || !name.trim()) return;
    $$('[data-content="brand.name"]').forEach(function (el) { el.textContent = name; });
    C.brand = C.brand || {};
    C.brand.name = name;
    document.title = name + " — Bridal Fine Jewelry";
  }

  window.applyCustomization = function (custom) {
    if (!custom || typeof custom !== "object") return;
    try {
      setVar("--color-primary", custom.primaryColor);
      setVar("--color-accent", custom.accentColor);

      if (typeof custom.fontPair === "string" && custom.fontPair.indexOf("|") !== -1) {
        var parts = custom.fontPair.split("|");
        var d = parts[0].trim(), b = parts[1].trim();
        if (d) {
          setVar("--font-display", '"' + d + '", Georgia, serif');
          var link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(d).replace(/%20/g, "+") + ":wght@400;500;600&display=swap";
          document.head.appendChild(link);
        }
        if (b) {
          setVar("--font-body", '"' + b + '", "Helvetica Neue", Arial, sans-serif');
          var link2 = document.createElement("link");
          link2.rel = "stylesheet";
          link2.href = "https://fonts.googleapis.com/css2?family=" + encodeURIComponent(b).replace(/%20/g, "+") + ":wght@300;400;500;600&display=swap";
          document.head.appendChild(link2);
        }
      }

      if (typeof custom.brandName === "string") applyBrandName(custom.brandName);
      if (typeof custom.logoText === "string") applyBrandName(custom.logoText);

      if (typeof custom.heroImage === "string" && custom.heroImage.indexOf("data:") === 0) {
        var heroImg = $(".hero-shell img");
        if (heroImg) {
          heroImg.style.opacity = "0";
          setTimeout(function () {
            heroImg.src = custom.heroImage;
            armImage(heroImg);
            heroImg.style.opacity = "";
          }, 350);
        }
      }

      if (typeof custom.currency === "string" && custom.currency.trim()) {
        state.currency = custom.currency.trim();
        refreshProductPrices();
      }

      if (typeof custom.contactEmail === "string" && custom.contactEmail.trim()) {
        C.contact = C.contact || {};
        C.contact.email = custom.contactEmail.trim();
        buildContact();
      }
      if (typeof custom.instagramUrl === "string" && custom.instagramUrl.trim()) {
        var insta = $("#instaLink");
        if (insta) insta.href = custom.instagramUrl.trim();
      }

      if (Array.isArray(custom.productNames)) {
        C.products = C.products || [];
        custom.productNames.forEach(function (n, i) {
          if (typeof n === "string" && n.trim() && C.products[i]) C.products[i].name = n.trim();
        });
        refreshProductPrices();
      }
      if (custom.productImages && typeof custom.productImages === "object") {
        C.products = C.products || [];
        Object.keys(custom.productImages).forEach(function (k) {
          var i = parseInt(k, 10);
          var url = custom.productImages[k];
          if (!isNaN(i) && C.products[i] && typeof url === "string" && url.indexOf("data:") === 0) {
            C.products[i].image = url;
          }
        });
        refreshProductPrices();
      }
    } catch (err) {
      /* never throw on partial input */
    }
  };

  function applyURLParams() {
    try {
      var q = new URLSearchParams(window.location.search);
      var preset = {};
      if (q.get("brand")) preset.brandName = q.get("brand");
      if (q.get("primary")) preset.primaryColor = "#" + String(q.get("primary")).replace(/^#+/, "");
      if (q.get("accent")) preset.accentColor = "#" + String(q.get("accent")).replace(/^#+/, "");
      if (Object.keys(preset).length) window.applyCustomization(preset);
    } catch (e) { /* file:// without query — ignore */ }
  }

  /* ---------- boot ---------- */
  function boot() {
    if (typeof state !== "undefined" && C.products && C.products[0] && C.products[0].currency) {
      state.currency = C.products[0].currency;
    }
    applyStaticText();
    buildNav();
    buildCollections();
    buildProducts();
    buildCraft();
    buildStory();
    buildContact();
    armAllImages(document);
    initReveals();
    initMotion();
    initMaterialSwitcher();
    initQuickView();
    initTryLook();
    initForm();
    initNav();
    initAnchorScroll();
    applyURLParams();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
