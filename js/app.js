/* ============================================================
   Aura Digital Estudio — js/app.js
   Se carga en todas las páginas (index, privacidad, 404): cada bloque
   comprueba que existan sus elementos antes de ejecutarse.
   ============================================================ */

/* ===== PROYECTOS (Portfolio) =====
   Si el array está vacío, la sección "Proyectos" y su link del menú no se muestran.
   Para agregar un proyecto, copiá el ejemplo comentado, sacale las // y completalo:
     servicio: "Code" | "Growth" | "Brand"
     imagen:   ruta a una imagen (recomendado 1280×800, .webp o .jpg) dentro de img/
     link:     URL del proyecto o caso (opcional)
*/
const PROYECTOS = [
  // {
  //   cliente: "[Completar] Nombre del cliente",
  //   servicio: "Code",
  //   resultado: "[Completar] Una línea con el resultado real, ej.: sitio nuevo en 4 semanas",
  //   imagen: "img/proyectos/cliente.webp",
  //   alt: "[Completar] Captura del sitio de Cliente",
  //   link: "https://www.ejemplo.com"
  // },
];

/* ===== CONFIGURACIÓN =====
   STUDIO_EMAIL:    adónde llegan las consultas.
   WEB3FORMS_KEY:   access key de web3forms.com. Sin key (o si el envío falla),
                    se ofrece enviar el mensaje desde el correo del cliente.
   WHATSAPP_NUMBER: formato internacional sin "+" ni espacios (ej.: 5491122334455).
                    Mientras diga [549XXXXXXXXXX] el botón de WhatsApp queda oculto.
   GA_ID:           ID de medición de Google Analytics 4 (ej.: G-AB12CD34EF).
                    Mientras diga [G-XXXXXXX] no se carga Analytics ni se muestra el banner de cookies. */
const STUDIO_EMAIL = "sistemas@auradigitalestudio.com";
const WEB3FORMS_KEY = "f3c9fb31-5fa3-41f8-85c4-c8fa948c1529";
const WHATSAPP_NUMBER = "[549XXXXXXXXXX]";
const WHATSAPP_TEXT = "Hola Aura, quiero consultar por un proyecto";
const GA_ID = "[G-XXXXXXX]";

(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  /* ---------- Año del footer ---------- */
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Analytics (GA4) + banner de cookies ---------- */
  const GA_ON = /^G-[A-Z0-9]{6,}$/i.test(GA_ID);
  let gaLoaded = false;
  function loadGA() {
    if (!GA_ON || gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
  }
  /* Evento a Analytics: solo se envía si el visitante aceptó y GA está activo */
  function track(name, params) {
    if (GA_ON && gaLoaded && typeof window.gtag === "function") window.gtag("event", name, params || {});
  }
  function removeGA() {
    window["ga-disable-" + GA_ID] = true;
    document.cookie.split(";").forEach(c => {
      const n = c.split("=")[0].trim();
      if (n === "_ga" || n.indexOf("_ga_") === 0) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + location.hostname;
      }
    });
  }
  let banner = null;
  function setCookieOffset() {
    document.documentElement.style.setProperty("--cookie-h", banner ? banner.offsetHeight + "px" : "0px");
  }
  function closeBanner() {
    if (banner) { banner.remove(); banner = null; }
    setCookieOffset();
  }
  function choose(value) {
    const wasLoaded = gaLoaded;
    store.set("aura_consent", value);
    closeBanner();
    if (value === "granted") { window["ga-disable-" + GA_ID] = false; loadGA(); }
    else if (wasLoaded) removeGA();
  }
  function showBanner() {
    if (banner) return;
    banner = document.createElement("div");
    banner.className = "cookie";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Aviso de cookies");
    banner.innerHTML =
      '<div class="wrap"><p>Usamos cookies de Google Analytics para medir cómo se usa el sitio y mejorarlo. ' +
      'Solo se activan si las aceptás. Más información en la <a href="' + (document.body.dataset.root || "") + 'privacidad.html">Política de Privacidad</a>.</p>' +
      '<div class="row"><button type="button" class="btn ghost" data-c="denied">Rechazar</button>' +
      '<button type="button" class="btn" data-c="granted">Aceptar</button></div></div>';
    banner.addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b) choose(b.dataset.c); });
    document.body.appendChild(banner);
    setCookieOffset();
  }
  if (GA_ON) {
    const prefs = $("cookie-prefs");
    if (prefs) { prefs.hidden = false; prefs.addEventListener("click", showBanner); }
    const c = store.get("aura_consent");
    if (c === "granted") loadGA();
    else if (c !== "denied") showBanner();
    addEventListener("resize", setCookieOffset);
  }

  /* ---------- Botón flotante de WhatsApp ---------- */
  const wa = $("wa-btn");
  if (wa) {
    const num = String(WHATSAPP_NUMBER).replace(/[\s+\-()]/g, "");
    if (/^\d{10,15}$/.test(num)) {
      wa.href = "https://wa.me/" + num + "?text=" + encodeURIComponent(WHATSAPP_TEXT).replace(/%2C/g, ",");
      wa.hidden = false;
      document.body.classList.add("has-wa");
      wa.addEventListener("click", () => track("whatsapp_click", { link_url: wa.href }));
    }
  }

  /* ---------- Proyectos ---------- */
  const SERV = { Code: "Aura Code", Growth: "Aura Growth", Brand: "Aura Brand" };
  const projSection = $("proyectos");
  if (projSection && Array.isArray(PROYECTOS) && PROYECTOS.length) {
    const grid = $("proj-grid");
    const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
    PROYECTOS.forEach(p => {
      const card = el("article", "proj");
      if (p.imagen) {
        const img = el("img");
        img.src = p.imagen; img.alt = p.alt || ""; img.width = 640; img.height = 400;
        img.loading = "lazy"; img.decoding = "async";
        card.appendChild(img);
      }
      const body = el("div", "body");
      body.appendChild(el("span", "pill", SERV[p.servicio] || p.servicio || ""));
      body.appendChild(el("h3", "", p.cliente || ""));
      body.appendChild(el("p", "", p.resultado || ""));
      if (p.link && !/^\s*(javascript|data|vbscript):/i.test(p.link)) {
        const a = el("a", "more", "Ver proyecto");
        a.href = p.link;
        if (/^https?:/i.test(p.link)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        a.setAttribute("aria-label", "Ver proyecto de " + (p.cliente || ""));
        body.appendChild(a);
      }
      card.appendChild(body);
      grid.appendChild(card);
    });
    projSection.hidden = false;
    const navItem = $("nav-proyectos");
    if (navItem) navItem.hidden = false;
  }

  /* ---------- Logo 3D: sigue al mouse; sin mouse se balancea solo ---------- */
  if ($("logo3d")) (function () {
    const stage = $("logo3d"), tilt = $("tilt"), MAX = 16;
    if (reduceMotion()) { tilt.classList.remove("idle"); return; }
    let raf = 0, back = 0;
    function move(e) {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        tilt.classList.remove("idle"); tilt.classList.add("live");
        tilt.style.setProperty("--ry", (x * MAX * 2).toFixed(2) + "deg");
        tilt.style.setProperty("--rx", (-y * MAX * 2).toFixed(2) + "deg");
        tilt.style.setProperty("--gx", ((x + .5) * 100).toFixed(1) + "%");
        tilt.style.setProperty("--gy", ((y + .5) * 100).toFixed(1) + "%");
        tilt.style.setProperty("--go", "1");
      });
    }
    function leave() {
      cancelAnimationFrame(raf);
      tilt.classList.remove("live");
      tilt.style.setProperty("--rx", "0deg"); tilt.style.setProperty("--ry", "0deg"); tilt.style.setProperty("--go", "0");
      clearTimeout(back); back = setTimeout(() => tilt.classList.add("idle"), 700);
    }
    stage.addEventListener("pointermove", e => { if (e.pointerType === "mouse") { clearTimeout(back); move(e); } });
    stage.addEventListener("pointerleave", leave);
  })();

  /* ---------- Calculadora de ROAS ---------- */
  const ars = n => "$ " + Math.round(n).toLocaleString("es-AR");
  if ($("r-inv")) {
    const num = id => Math.max(0, +$(id).value || 0);
    const roas = () => {
      const inv = num("r-inv"), ven = num("r-ven"), tic = num("r-tic"), mar = Math.min(100, num("r-mar")) / 100;
      const rev = ven * tic, r = inv ? rev / inv : 0, cpa = ven ? inv / ven : 0, be = mar ? 1 / mar : 0;
      $("o-roas").textContent = inv ? r.toFixed(2) + "x" : "—";
      $("o-cpa").textContent = ven ? ars(cpa) : "—";
      $("o-be").textContent = mar ? be.toFixed(2) + "x" : "—";
      const v = $("o-verdict"), s = v.querySelector("span");
      if (!inv || !mar) { v.dataset.s = ""; s.textContent = "Completá inversión y margen para ver el resultado."; return; }
      const profit = rev * mar - inv;
      if (r >= be * 1.3) { v.dataset.s = "ok"; s.textContent = "Rentable: ganancia bruta estimada de " + ars(profit) + "."; }
      else if (r >= be) { v.dataset.s = "warn"; s.textContent = "En equilibrio: margen ajustado de " + ars(profit) + ". Hay espacio para optimizar."; }
      else { v.dataset.s = "bad"; s.textContent = "Bajo el mínimo: la campaña pierde " + ars(-profit) + ". Revisá segmentación o ticket."; }
    };
    ["r-inv", "r-ven", "r-tic", "r-mar"].forEach(id => $(id).addEventListener("input", roas)); roas();
  }

  /* ---------- Generador de UTM ---------- */
  if ($("u-url")) {
    const slug = t => t.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_").replace(/[^a-z0-9_\-]/g, "");
    const utm = () => {
      const m = $("u-msg"), s = m.querySelector("span");
      let raw = $("u-url").value.trim();
      if (!raw) { $("u-out").textContent = ""; m.dataset.s = ""; s.textContent = "Pegá la dirección de tu página, por ejemplo auradigitalestudio.com/promo"; return; }
      if (!/^https?:\/\//i.test(raw)) raw = "https://" + raw;
      let u; try { u = new URL(raw); if (!u.hostname.includes(".")) throw 0; } catch (e) { $("u-out").textContent = ""; m.dataset.s = "bad"; s.textContent = "Esa dirección no parece válida. Revisá que tenga el dominio completo, por ejemplo tusitio.com"; return; }
      u.searchParams.set("utm_source", $("u-src").value);
      u.searchParams.set("utm_medium", $("u-med").value);
      const c = slug($("u-camp").value); if (c) u.searchParams.set("utm_campaign", c); else u.searchParams.delete("utm_campaign");
      $("u-out").textContent = u.toString(); m.dataset.s = "ok"; s.textContent = "Los espacios se convierten en guiones bajos y todo pasa a minúsculas.";
    };
    ["u-url", "u-src", "u-med", "u-camp"].forEach(id => $(id).addEventListener("input", utm)); utm();
    $("u-copy").addEventListener("click", () => {
      const t = $("u-out").textContent, b = $("u-copy");
      navigator.clipboard.writeText(t).then(() => { b.textContent = "Copiado"; setTimeout(() => b.textContent = "Copiar", 1600); })
        .catch(() => { const r = document.createRange(); r.selectNodeContents($("u-out")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); b.textContent = "Seleccionado"; });
    });
  }

  /* ---------- Cotizador ---------- */
  /* Precios de referencia en USD: editalos a gusto.
     site/extras: min y max (rango) y w (semanas de trabajo). growth/brand: m (USD por mes).
     time.k: multiplicador del precio del proyecto; el plazo urgente reduce las semanas un 30%. */
  const Q = {
    site: [
      { id: "none", name: "No necesito sitio", note: "Solo marketing o redes", min: 0, max: 0, w: 0 },
      { id: "landing", name: "Landing page", note: "1 página de conversión", min: 400, max: 700, w: 2 },
      { id: "corp", name: "Sitio corporativo", note: "Hasta 6 secciones", min: 900, max: 1500, w: 4 },
      { id: "ecom", name: "E-commerce", note: "Tienda con pagos y envíos", min: 1600, max: 2800, w: 6 },
      { id: "app", name: "Aplicación web", note: "Usuarios, panel, lógica a medida", min: 3000, max: 6000, w: 10 }
    ],
    extras: [
      { id: "seo", name: "SEO inicial", note: "Estructura, metadatos, velocidad", min: 150, max: 250, w: 0 },
      { id: "blog", name: "Blog autogestionable", note: "Panel para publicar", min: 200, max: 350, w: 1 },
      { id: "lang", name: "Multilenguaje", note: "Español + inglés", min: 250, max: 400, w: 1 },
      { id: "integ", name: "Integraciones", note: "CRM, WhatsApp, pasarelas", min: 200, max: 500, w: 1 }
    ],
    growth: [
      { id: "g0", name: "Sin pauta", note: "", m: 0 },
      { id: "g1", name: "Un canal", note: "Meta Ads o Google Ads", m: 300 },
      { id: "g2", name: "Meta + Google", note: "Embudo completo y reportes", m: 550 }
    ],
    brand: [
      { id: "b0", name: "Sin gestión de redes", note: "", m: 0 },
      { id: "b1", name: "Esencial", note: "8 piezas al mes · 1 red", m: 250 },
      { id: "b2", name: "Pro", note: "16 piezas + reels · 2 redes", m: 480 }
    ],
    time: [
      { id: "std", name: "Estándar", note: "Plazo recomendado", k: 1 },
      { id: "fast", name: "Urgente", note: "Prioridad en agenda · +25%", k: 1.25 }
    ]
  };
  const num2 = n => Math.round(n).toLocaleString("es-AR");
  const usd = n => "USD " + num2(n);
  const range = (a, b) => usd(a) + " – " + num2(b);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let quoteText = "";
  if ($("q-form")) {
    const opt = (group, o, type, checked) => {
      const id = "q-" + group + "-" + o.id;
      const price = o.min != null ? (o.max ? range(o.min, o.max) : "") : (o.m ? usd(o.m) + "/mes" : "");
      return '<div class="opt"><input type="' + type + '" name="q-' + group + '" id="' + id + '" value="' + o.id + '"' + (checked ? " checked" : "") + '><label for="' + id + '">' + esc(o.name) + (o.note ? "<small>" + esc(o.note) + "</small>" : "") + (price ? "<em>" + price + "</em>" : "") + "</label></div>";
    };
    $("q-site").innerHTML = Q.site.map(o => opt("site", o, "radio", o.id === "corp")).join("");
    $("q-extras").innerHTML = Q.extras.map(o => opt("extras", o, "checkbox", o.id === "seo")).join("");
    $("q-growth").innerHTML = Q.growth.map(o => opt("growth", o, "radio", o.id === "g1")).join("");
    $("q-brand").innerHTML = Q.brand.map(o => opt("brand", o, "radio", o.id === "b0")).join("");
    $("q-time").innerHTML = Q.time.map(o => opt("time", o, "radio", o.id === "std")).join("");
    const pick = (g, list) => list.find(o => o.id === (document.querySelector('input[name="q-' + g + '"]:checked') || {}).value);
    const quote = () => {
      const site = pick("site", Q.site), gr = pick("growth", Q.growth), br = pick("brand", Q.brand), t = pick("time", Q.time);
      const hasSite = site.id !== "none";
      /* Extras y plazo solo aplican si se eligió un sitio */
      document.querySelectorAll("#q-extras input").forEach(i => { i.disabled = !hasSite; if (!hasSite) i.checked = false; });
      document.querySelectorAll("#q-time input").forEach(i => { i.disabled = !hasSite; });
      const exOn = hasSite ? Q.extras.filter(o => $("q-extras-" + o.id).checked) : [];
      let min = site.min, max = site.max, w = site.w;
      exOn.forEach(o => { min += o.min; max += o.max; w += o.w; });
      const k = hasSite ? t.k : 1;
      min = Math.round(min * k); max = Math.round(max * k);
      const weeks = hasSite && t.id === "fast" ? Math.max(1, Math.ceil(w * 0.7)) : w;
      const month = gr.m + br.m;
      $("q-once").textContent = max ? range(min, max) : "—";
      $("q-month").textContent = month ? usd(month) + " / mes" : "—";
      const lines = [];
      if (hasSite) lines.push(["Aura Code", site.name]);
      exOn.forEach(o => lines.push(["Extra", o.name]));
      if (gr.m) lines.push(["Aura Growth", gr.name]);
      if (br.m) lines.push(["Aura Brand", "Redes " + br.name]);
      if (hasSite) lines.push(["Plazo", t.name]);
      $("q-lines").innerHTML = lines.map(l => "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>").join("");
      const weeksTxt = weeks + (weeks === 1 ? " semana" : " semanas");
      $("q-weeks").textContent = weeks ? "Entrega estimada del sitio: " + weeksTxt + "." : "";
      const nothing = !max && !month;
      $("q-send").disabled = nothing;
      quoteText = nothing ? "" : "Cotización desde la web:\n" + lines.map(l => "• " + l[0] + ": " + l[1]).join("\n") +
        (max ? "\nProyecto estimado: " + range(min, max) : "") + (month ? "\nMensual estimado: " + usd(month) : "") + (weeks ? "\nEntrega estimada: " + weeksTxt : "");
    };
    $("q-form").addEventListener("change", quote); quote();
    $("q-send").addEventListener("click", () => {
      track("enviar_cotizacion", { proyecto: $("q-once").textContent, mensual: $("q-month").textContent });
      $("c-msg").value = quoteText + "\n\nComentarios: ";
      const map = { "Aura Code": "c-code", "Aura Growth": "c-growth", "Aura Brand": "c-brand" };
      ["c-code", "c-growth", "c-brand"].forEach(id => $(id).checked = false);
      Object.keys(map).forEach(k => { if (quoteText.includes(k)) $(map[k]).checked = true; });
      $("e-msg").textContent = ""; $("c-msg").removeAttribute("aria-invalid");
      $("contacto").scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" });
      setTimeout(() => $("c-name").focus({ preventScroll: true }), 500);
    });
  }

  /* ---------- Formulario de contacto ---------- */
  if ($("c-form")) {
    const LOCK_MS = 30000, LOCK_KEY = "aura_last_send";
    const form = $("c-form"), btn = $("c-submit"), note = $("c-note");
    $("c-addr").textContent = STUDIO_EMAIL;
    let lastBody = "", lockTimer = 0;

    function showFallback(subject, body) {
      lastBody = body;
      $("c-mailto").href = "mailto:" + STUDIO_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      $("c-fallback").hidden = false;
    }
    $("c-copy").addEventListener("click", () => {
      const b = $("c-copy");
      navigator.clipboard.writeText(STUDIO_EMAIL + "\n\n" + lastBody).then(() => { b.textContent = "Copiado"; setTimeout(() => b.textContent = "Copiar mensaje", 1600); })
        .catch(() => { $("c-msg").select(); b.textContent = "Seleccionado en el formulario"; });
    });

    /* Bloqueo de reenvío: 30 s después de un envío exitoso (sobrevive a recargas) */
    let memLast = 0;
    const lastSent = () => +store.get(LOCK_KEY) || memLast;
    function lockLeft() { return Math.max(0, LOCK_MS - (Date.now() - lastSent())); }
    function tickLock() {
      clearTimeout(lockTimer);
      const left = lockLeft();
      if (left > 0) {
        btn.disabled = true;
        btn.textContent = "Podés reenviar en " + Math.ceil(left / 1000) + " s";
        lockTimer = setTimeout(tickLock, 500);
      } else { btn.disabled = false; btn.textContent = "Enviar consulta"; }
    }
    function startLock() { memLast = Date.now(); store.set(LOCK_KEY, String(memLast)); tickLock(); }
    tickLock();

    /* Validación */
    const rules = [
      { id: "c-name", err: "e-name", check: v => !v ? "Escribí tu nombre." : v.length < 2 ? "Tu nombre es muy corto." : "" },
      { id: "c-mail", err: "e-mail", check: v => !v ? "Escribí tu email." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Revisá tu email: tiene que verse como nombre@dominio.com." : "" },
      { id: "c-msg", err: "e-msg", check: v => !v ? "Contanos en qué te podemos ayudar." : v.length < 10 ? "Contanos un poco más (mínimo 10 caracteres)." : "" }
    ];
    function setErr(id, errId, msg) {
      $(errId).textContent = msg;
      if (msg) $(id).setAttribute("aria-invalid", "true"); else $(id).removeAttribute("aria-invalid");
    }
    rules.forEach(r => $(r.id).addEventListener("input", () => { if ($(r.err).textContent) setErr(r.id, r.err, r.check($(r.id).value.trim())); }));
    $("c-priv").addEventListener("change", () => { if ($("c-priv").checked) setErr("c-priv", "e-priv", ""); });
    function validate() {
      let first = null;
      rules.forEach(r => { const m = r.check($(r.id).value.trim()); setErr(r.id, r.err, m); if (m && !first) first = $(r.id); });
      if (!$("c-priv").checked) { setErr("c-priv", "e-priv", "Tenés que aceptar la Política de Privacidad para enviar tu consulta."); if (!first) first = $("c-priv"); }
      else setErr("c-priv", "e-priv", "");
      if (first) first.focus();
      return !first;
    }

    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (lockLeft() > 0) { tickLock(); return; }
      note.hidden = true; $("c-fallback").hidden = true;
      if (!validate()) return;
      const name = $("c-name").value.trim(), mail = $("c-mail").value.trim(), msg = $("c-msg").value.trim();
      const needs = ["c-code", "c-growth", "c-brand"].filter(id => $(id).checked).map(id => "Aura " + $(id).value);
      const subject = "Nueva consulta web: " + name + (needs.length ? " (" + needs.join(", ") + ")" : "");
      const body = "Nombre: " + name + "\nEmail: " + mail + "\nNecesita: " + (needs.join(", ") || "Sin especificar") + "\n\n" + msg;
      note.hidden = false;
      /* Honeypot tildado = bot: simulamos éxito sin enviar nada */
      if ($("c-botcheck").checked) { note.style.color = "var(--ok)"; note.textContent = "Listo. Recibimos tu consulta."; startLock(); return; }
      if (WEB3FORMS_KEY) {
        btn.disabled = true; btn.textContent = "Enviando…";
        let sent = false;
        try {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "Web Aura Digital", replyto: mail, name, email: mail, servicios: needs.join(", "), message: msg, botcheck: $("c-botcheck").checked })
          });
          const j = await r.json();
          if (!j.success) throw new Error(j.message);
          sent = true;
          note.style.color = "var(--ok)";
          note.textContent = "Listo, " + name + ". Recibimos tu consulta y te respondemos a " + mail + " en menos de 24 horas hábiles.";
          track("generate_lead", { form_id: "contacto", servicios: needs.join(", ") });
          track("form_submit", { form_id: "contacto" });
          form.reset();
        } catch (err) {
          note.style.color = "var(--warn)"; note.textContent = "No pudimos enviar el formulario desde acá.";
        }
        if (sent) startLock(); else { btn.disabled = false; btn.textContent = "Enviar consulta"; showFallback(subject, body); }
        return;
      }
      note.style.color = "var(--muted)"; note.textContent = "Último paso, " + name + ":";
      showFallback(subject, body);
    });
  }
})();
