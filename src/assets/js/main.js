/* Frémont Plomberie Services — JS vanilla minimal, chargé en defer.
   Chaque module est indépendant et se désactive si son élément n'existe pas. */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mesure sans cookie : tel:, formulaire, WhatsApp ---------- */
  const track = (name, props = {}) => {
    try {
      if (window.plausible) window.plausible(name, { props });
      else if (window.umami && typeof window.umami.track === "function") window.umami.track(name, props);
    } catch (_) {}
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-track]");
    if (!a) return;
    const kind = a.dataset.track;
    if (kind === "call") track("Appel", { emplacement: a.dataset.trackWhere || "" });
    else if (kind === "whatsapp") track("WhatsApp");
    else if (kind === "review") track("Avis Google");
  });

  /* ---------- Bandeau démo ---------- */
  const demo = $("#demo-banner");
  if (demo) {
    try { if (sessionStorage.getItem("demo-hidden") === "1") demo.classList.add("is-hidden"); } catch (_) {}
    $("[data-demo-close]", demo)?.addEventListener("click", () => {
      demo.classList.add("is-hidden");
      try { sessionStorage.setItem("demo-hidden", "1"); } catch (_) {}
    });
  }

  /* ---------- Header : opaque au scroll (sentinelle, pas d'écouteur scroll) ---------- */
  const header = $("#header");
  if (header && header.classList.contains("header--transparent")) {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
    document.body.prepend(sentinel);
    new IntersectionObserver(([en]) => header.classList.toggle("is-scrolled", !en.isIntersecting), { threshold: 0 }).observe(sentinel);
  }

  /* ---------- Sous-menus desktop ---------- */
  $$("[data-submenu]").forEach((btn) => {
    const item = btn.closest(".nav__item");
    const close = () => { item.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      $$(".nav__item.is-open").forEach((o) => { if (o !== item) { o.classList.remove("is-open"); $("[data-submenu]", o).setAttribute("aria-expanded", "false"); } });
    });
    document.addEventListener("click", (e) => { if (!item.contains(e.target)) close(); });
    item.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); btn.focus(); } });
  });

  /* ---------- Menu mobile (focus piégé, Échap, scroll verrouillé) ---------- */
  const menu = $("#menu");
  const openBtn = $("[data-menu-open]");
  if (menu && openBtn) {
    const closeBtn = $("[data-menu-close]", menu);
    const focusables = () => $$("a[href], button:not([disabled])", menu).filter((el) => el.offsetParent !== null);
    let lastFocus = null;
    const open = () => {
      lastFocus = document.activeElement;
      menu.hidden = false;
      document.body.classList.add("menu-open");
      openBtn.setAttribute("aria-expanded", "true");
      requestAnimationFrame(() => {
        menu.classList.add("is-open");
        // le bouton n'est focalisable qu'une fois visible
        setTimeout(() => closeBtn.focus(), 40);
      });
    };
    const close = () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      openBtn.setAttribute("aria-expanded", "false");
      const done = () => { menu.hidden = true; };
      reduced ? done() : setTimeout(done, 250);
      (lastFocus || openBtn).focus();
    };
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) close(); });
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") return;
      if (e.key !== "Tab") return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    $$("a[href]", menu).forEach((a) => a.addEventListener("click", close));
  }

  /* ---------- Révélations au scroll (une seule fois) ---------- */
  const revealEls = $$(".reveal, .reveal-lines, [data-steps]");
  if (revealEls.length) {
    if (reduced || !("IntersectionObserver" in window)) revealEls.forEach((el) => el.classList.add("is-visible"));
    else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
      }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- FAQ : animation d'ouverture des <details> ---------- */
  $$(".faq__item").forEach((d) => {
    if (d.open) d.classList.add("is-open");
    const summary = $("summary", d);
    summary.addEventListener("click", (e) => {
      if (reduced) return; // comportement natif
      e.preventDefault();
      if (d.open) {
        d.classList.remove("is-open");
        setTimeout(() => { d.open = false; }, 240);
      } else {
        d.open = true;
        requestAnimationFrame(() => d.classList.add("is-open"));
        if (d.name) $$(`details[name="${d.name}"]`).forEach((o) => { if (o !== d && o.open) { o.classList.remove("is-open"); setTimeout(() => { o.open = false; }, 240); } });
      }
    });
    d.addEventListener("toggle", () => { if (d.open && !d.classList.contains("is-open")) d.classList.add("is-open"); });
  });

  /* ---------- Slider avant/après ---------- */
  $$("[data-ba]").forEach((ba) => {
    const range = $(".ba__range", ba);
    const update = () => {
      const v = Number(range.value);
      ba.style.setProperty("--pos", v + "%");
      range.setAttribute("aria-valuetext", `Avant ${v} %, après ${100 - v} %`);
    };
    range.addEventListener("input", update);
    update();
  });

  /* ---------- Carrousel de réalisations ---------- */
  $$("[data-carousel]").forEach((c) => {
    const track = $("[data-track-el]", c);
    const slides = $$(".ba-carousel__slide", track);
    const status = $("[data-carousel-status]", c);
    const go = (dir) => {
      const w = slides[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 0);
      track.scrollBy({ left: dir * w, behavior: reduced ? "auto" : "smooth" });
    };
    $("[data-carousel-prev]", c).addEventListener("click", () => go(-1));
    $("[data-carousel-next]", c).addEventListener("click", () => go(1));
    const refresh = () => {
      const w = slides[0].getBoundingClientRect().width + 24;
      const i = Math.min(slides.length, Math.round(track.scrollLeft / w) + 1);
      if (status) status.textContent = `${i} / ${slides.length}`;
    };
    track.addEventListener("scroll", () => requestAnimationFrame(refresh), { passive: true });
  });

  /* ---------- Formulaire de devis en 3 écrans ---------- */
  const form = $("[data-form-devis]");
  if (form) {
    const steps = $$(".form-devis__step", form);
    const bars = $$(".progress span", form);
    const label = $("[data-progress-label]", form);
    const status = $("[data-status]", form);
    let current = 0;

    // Pré-remplissage depuis l'URL (?besoin=slug&commune=Ville)
    try {
      const p = new URLSearchParams(location.search);
      const besoin = p.get("besoin");
      if (besoin) { const r = $(`#besoin-${CSS.escape(besoin)}`, form); if (r) r.checked = true; }
      const commune = p.get("commune");
      if (commune) { const c = $("#commune", form); if (c) c.value = commune; }
    } catch (_) {}

    const show = (i, focus = true) => {
      current = i;
      steps.forEach((s, k) => { s.hidden = k !== i; });
      bars.forEach((b, k) => { b.classList.toggle("is-done", k < i); b.classList.toggle("is-current", k === i); });
      if (label) label.textContent = `Étape ${i + 1} sur 3`;
      if (focus) $("h3", steps[i])?.setAttribute("tabindex", "-1"), $("h3", steps[i])?.focus();
      status.textContent = "";
    };

    const setError = (field, on) => {
      field.classList.toggle("has-error", on);
      $$("input, textarea", field).forEach((el) => { if (el.type !== "hidden") el.setAttribute("aria-invalid", on ? "true" : "false"); });
    };

    const validateStep = (i) => {
      let ok = true, firstBad = null;
      $$("[data-field]", steps[i]).forEach((field) => {
        const inputs = $$("input, textarea", field).filter((el) => el.type !== "hidden");
        let valid = true;
        const radios = inputs.filter((el) => el.type === "radio");
        if (radios.length) valid = radios.some((r) => r.checked) || !radios.some((r) => r.required);
        else inputs.forEach((el) => { if (!el.checkValidity()) valid = false; });
        setError(field, !valid);
        if (!valid) { ok = false; firstBad = firstBad || inputs[0]; }
      });
      if (!ok) { status.textContent = "Merci de corriger les champs signalés."; firstBad?.focus(); }
      return ok;
    };

    $$("[data-next]", form).forEach((b) => b.addEventListener("click", () => { if (validateStep(current)) show(current + 1); }));
    $$("[data-prev]", form).forEach((b) => b.addEventListener("click", () => show(current - 1)));
    $$("[data-field] input, [data-field] textarea", form).forEach((el) => el.addEventListener("input", () => setError(el.closest("[data-field]"), false)));

    form.addEventListener("submit", (e) => {
      // Honeypot
      const hp = $("input[name='site_web']", form);
      if (hp && hp.value) { e.preventDefault(); return; }
      if (!validateStep(current)) { e.preventDefault(); return; }
      const btn = $("[data-submit]", form);
      btn.setAttribute("aria-busy", "true"); btn.disabled = true;
      track("Devis envoyé", { besoin: form.besoin?.value || "", urgence: form.urgence?.value || "" });
      if (form.dataset.formspreeMissing !== undefined) {
        // Mode maquette : pas d'envoi réel, on simule la redirection
        e.preventDefault();
        setTimeout(() => { location.href = form.dataset.merci || "/merci/"; }, 400);
      }
    });

    show(0, false);
  }

  /* ---------- Barre mobile : masquée quand le formulaire est visible ---------- */
  const bar = $("#mobile-bar");
  if (bar && form && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => bar.classList.toggle("is-hidden", en.isIntersecting), { threshold: 0.2 }).observe(form);
  }
})();
