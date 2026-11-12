/* ============================================================
   Aura Digital Estudio — js/app.js
   Se carga en todas las páginas (index, privacidad, 404): cada bloque
   comprueba que existan sus elementos antes de ejecutarse.
   ============================================================ */

/* ===== PROYECTOS (Portfolio) =====
   Si el array está vacío, la sección "Proyectos" y su link del menú no se muestran.
   Para agregar un proyecto, copiá el ejemplo comentado, sacale las // y completalo:
     tipo:     etiqueta del tipo de proyecto (ej.: "Sistema web", "App a medida"); si falta se usa servicio: "Code" | "Growth" | "Brand"
     dispositivo: "desktop" (captura de escritorio, marco de navegador) o "mobile" (celular)
     imagen:   ruta a una captura (.webp o .jpg) dentro de img/proyectos/ + alt: su descripción
     capturas: alternativa a imagen/alt, varias: [{ src: "...", alt: "..." }, ...] (lightbox con flechas)
     desafio / solucion: una frase cada uno
     link:     URL del proyecto o caso (opcional)
*/
const PROYECTOS = [
  {
    cliente: "Somos Roverano — Sistema de Recursos Humanos",
    tipo: "Sistema web",
    dispositivo: "desktop",
    desafio: "Gestionar recibos de sueldo, vacaciones, licencias y firma digital de los empleados.",
    solucion: "Plataforma web con panel de administración, seguimiento de conformidad de recibos y validación de identidad.",
    imagen: "img/proyectos/somos-roverano-oscuro.jpg",
    alt: "Panel de administración de Somos Roverano: empleados activos, recibos pendientes de conformidad, vacaciones, licencias e identidad"
  },
  {
    cliente: "NEXO Roverano — CRM comercial",
    tipo: "Sistema web",
    dispositivo: "desktop",
    desafio: "Hacer seguimiento de clientes y oportunidades de venta.",
    solucion: "Tablero con pipeline, embudo de conversión, alertas de clientes inactivos, tickets y stock.",
    imagen: "img/proyectos/nexo-roverano-tablero-oscuro.jpg",
    alt: "Tablero comercial de NEXO Roverano con leads, tasa de conversión, tickets y alertas de clientes sin comprar"
  },
  {
    cliente: "SOS Baterías — Centro de operaciones",
    tipo: "Sistema web",
    dispositivo: "desktop",
    desafio: "Coordinar los móviles de auxilio y los turnos del día.",
    solucion: "Panel en tiempo real con estado de cada móvil, agenda visual y alertas de atrasos.",
    imagen: "img/proyectos/sos-baterias-operaciones.jpg",
    alt: "Centro de operaciones de SOS Baterías con el estado de cada móvil y los servicios del día"
  },
  {
    cliente: "Enclave Reserva — Tienda y gestión de pedidos",
    tipo: "App a medida",
    dispositivo: "mobile",
    desafio: "Vender vinos online y administrar pedidos y cobros desde el celular.",
    solucion: "App de gestión con catálogo, pedidos, ventas y apertura/pausa de la tienda.",
    /* Varias capturas: se muestran lado a lado y el lightbox permite pasar de una a otra */
    capturas: [
      { src: "img/proyectos/enclave-productos-800.jpg", alt: "App de Enclave Reserva en el celular: catálogo de productos con precios" },
      { src: "img/proyectos/enclave-pedidos-800.jpg", alt: "App de Enclave Reserva en el celular: pedidos por catálogo y particulares" },
      { src: "img/proyectos/enclave-ventas-800.jpg", alt: "App de Enclave Reserva en el celular: resumen de ventas y cobros" }
    ]
  }
];

/* ===== NÚMEROS DE IMPACTO =====
   Franja de cifras bajo el hero. Se muestran solo las que tengan un valor real:
   mientras el valor diga [Completar] se oculta, y si ninguna está completa se oculta toda la franja.
   Ej.: { valor: "+25", etiqueta: "Proyectos entregados" }  */
const STATS = [
  { valor: "[Completar]", etiqueta: "Proyectos entregados" },
  { valor: "[Completar]", etiqueta: "Años de experiencia" },
  { valor: "[Completar]", etiqueta: "Clientes" },
  { valor: "[Completar]", etiqueta: "Satisfacción de clientes" }
];

/* ===== CLIENTES ("Confían en nosotros") =====
   Logos de clientes reales (con su permiso). Vacío = la franja no se muestra.
   Ej.: { nombre: "Cliente", logo: "img/clientes/cliente.svg", link: "https://www.ejemplo.com" } (link opcional) */
const CLIENTES = [
  { nombre: "Lebloc", logo: "img/clientes/lebloc.png" },
  { nombre: "Roverano", logo: "img/clientes/roverano.png" },
  { nombre: "SBVQ", logo: "img/clientes/sbvq.jpg" },
  { nombre: "Enclave", logo: "img/clientes/enclave.jpeg" }
];

/* ===== SERVICIOS ACTIVOS =====
   Qué servicios se ofrecen hoy. Los que están en false se muestran como "Próximamente"
   (tarjeta atenuada, grupo del cotizador deshabilitado, sin opción en el formulario).
   Para reactivar Growth o Brand alcanza con ponerlos en true: no hace falta tocar nada más
   (revisá además los textos de hero, SEO y footer, que hoy hablan solo de desarrollo). */
const SERVICIOS_ACTIVOS = { Code: true, Growth: false, Brand: false };

/* Cotizador: con false solo se elige el tipo de proyecto (sin extras ni plazo urgente).
   Poné true para volver a mostrar los extras (SEO, blog, multilenguaje, integraciones) y el plazo. */
const COTIZADOR_COMPLETO = false;

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

  /* ---------- Proyectos (casos de éxito) ---------- */
  const SERV = { Code: "Aura Code", Growth: "Aura Growth", Brand: "Aura Brand" };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const safeUrl = u => u && !/^\s*(javascript|data|vbscript):/i.test(u);
  /* ---------- Lightbox de capturas: abre en grande, flechas, Escape y clic afuera cierran ---------- */
  const lightbox = (function () {
    let box, img, cap, count, prev, next, closeBtn, items = [], i = 0, opener = null;
    function build() {
      box = el("div", "lb"); box.hidden = true;
      box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Captura ampliada");
      const fig = el("figure", "lb-fig");
      img = el("img"); cap = el("figcaption", "lb-cap");
      fig.appendChild(img); fig.appendChild(cap);
      const mk = (cls, label, svg) => { const b = el("button", cls); b.type = "button"; b.setAttribute("aria-label", label); b.innerHTML = svg; return b; };
      closeBtn = mk("lb-btn lb-close", "Cerrar", '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>');
      prev = mk("lb-btn lb-prev", "Captura anterior", '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>');
      next = mk("lb-btn lb-next", "Captura siguiente", '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>');
      count = el("span", "lb-count");
      box.append(fig, closeBtn, prev, next, count);
      document.body.appendChild(box);
      box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("lb-fig")) close(); });
      closeBtn.addEventListener("click", close);
      prev.addEventListener("click", () => go(-1));
      next.addEventListener("click", () => go(1));
      document.addEventListener("keydown", e => {
        if (box.hidden) return;
        if (e.key === "Escape") { e.preventDefault(); close(); }
        else if (e.key === "ArrowLeft" && items.length > 1) go(-1);
        else if (e.key === "ArrowRight" && items.length > 1) go(1);
        else if (e.key === "Tab") { /* el foco queda dentro del diálogo */
          const f = [closeBtn, prev, next].filter(b => !b.hidden);
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          else if (!box.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        }
      });
    }
    function show() {
      const it = items[i];
      img.src = it.src; img.alt = it.alt || "";
      cap.textContent = it.alt || "";
      const many = items.length > 1;
      prev.hidden = next.hidden = count.hidden = !many;
      count.textContent = (i + 1) + " / " + items.length;
    }
    function go(d) { i = (i + d + items.length) % items.length; show(); }
    function open(list, idx, from) {
      if (!box) build();
      items = list; i = idx; opener = from || null;
      show(); box.hidden = false;
      document.documentElement.classList.add("lb-open");
      closeBtn.focus();
    }
    function close() {
      box.hidden = true; img.removeAttribute("src");
      document.documentElement.classList.remove("lb-open");
      if (opener && document.contains(opener)) opener.focus();
    }
    return { open };
  })();

  /* ---------- Proyectos (se oculta si PROYECTOS está vacío) ---------- */
  const projSection = $("proyectos");
  if (projSection && Array.isArray(PROYECTOS) && PROYECTOS.length) {
    const grid = $("proj-grid");
    const lupa = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5"/></svg>';
    PROYECTOS.forEach(p => {
      const card = el("article", "case reveal");
      const shots = (p.capturas && p.capturas.length ? p.capturas : (p.imagen ? [{ src: p.imagen, alt: p.alt }] : [])).filter(s => s && s.src);
      if (shots.length) {
        const mobile = p.dispositivo === "mobile";
        const media = el("div", "media " + (mobile ? "is-mobile" : "is-desktop"));
        shots.forEach((s, n) => {
          const btn = el("button", "shot"); btn.type = "button";
          btn.setAttribute("aria-label", "Ver captura ampliada: " + (s.alt || p.cliente || ""));
          const frame = el("div", mobile ? "phone" : "win");
          if (!mobile) { const bar = el("div", "bar"); bar.setAttribute("aria-hidden", "true"); bar.append(el("i"), el("i"), el("i")); frame.appendChild(bar); }
          const img = el("img"); img.src = s.src; img.alt = s.alt || "";
          if (mobile) { img.width = 800; img.height = 1739; } else { img.width = 1600; img.height = 1000; }
          img.loading = "lazy"; img.decoding = "async";
          frame.appendChild(img); btn.appendChild(frame);
          const z = el("span", "zoom"); z.setAttribute("aria-hidden", "true"); z.innerHTML = lupa + "<b>Ver captura</b>"; btn.appendChild(z);
          btn.addEventListener("click", () => lightbox.open(shots, n, btn));
          media.appendChild(btn);
        });
        if (shots.length > 1) { const m = el("span", "more", shots.length + " capturas"); m.setAttribute("aria-hidden", "true"); media.appendChild(m); }
        card.appendChild(media);
      }
      const body = el("div", "body");
      body.appendChild(el("span", "tag", p.tipo || SERV[p.servicio] || p.servicio || ""));
      body.appendChild(el("h3", "", p.cliente || ""));
      const dl = el("dl");
      [["Desafío", p.desafio], ["Solución", p.solucion || p.resultado]].forEach(r => {
        if (!r[1]) return;
        const d = el("div"); d.appendChild(el("dt", "", r[0])); d.appendChild(el("dd", "", r[1])); dl.appendChild(d);
      });
      body.appendChild(dl);
      if (safeUrl(p.link)) {
        const a = el("a", "link", "Ver proyecto");
        a.href = p.link;
        if (/^https?:/i.test(p.link)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
        a.setAttribute("aria-label", "Ver proyecto de " + (p.cliente || ""));
        body.appendChild(a);
      }
      card.appendChild(body);
      grid.appendChild(card);
    });
    projSection.hidden = false;
    document.querySelectorAll("[data-proj-link]").forEach(n => { n.hidden = false; });
  }

  /* ---------- Números de impacto (se oculta si no hay valores reales) ---------- */
  const isDone = v => v && !/\[completar\]/i.test(v);
  const statsOk = Array.isArray(STATS) ? STATS.filter(s => isDone(s.valor)) : [];
  if ($("numeros") && statsOk.length) {
    const ul = $("stats-list");
    statsOk.forEach(s => { const li = el("li", "reveal"); li.appendChild(el("b", "", s.valor)); li.appendChild(el("span", "", s.etiqueta || "")); ul.appendChild(li); });
    $("numeros").hidden = false;
  }

  /* ---------- Clientes (se oculta si CLIENTES está vacío) ---------- */
  if ($("clientes") && Array.isArray(CLIENTES) && CLIENTES.length) {
    const ul = $("clients-list");
    const make = (c, clone) => {
      const li = el("li");
      const img = el("img"); img.src = c.logo; img.alt = clone ? "" : (c.nombre || ""); img.width = 72; img.height = 72; img.decoding = "async";
      if (safeUrl(c.link)) { const a = el("a"); a.href = c.link; a.target = "_blank"; a.rel = "noopener noreferrer"; if (clone) a.tabIndex = -1; a.appendChild(img); li.appendChild(a); }
      else li.appendChild(img);
      if (clone) { li.setAttribute("aria-hidden", "true"); li.dataset.clone = "1"; }
      return li;
    };
    const base = CLIENTES.filter(c => c.logo);
    base.forEach(c => ul.appendChild(make(c, false)));
    if (ul.children.length) {
      $("clientes").hidden = false;
      /* Cinta infinita: se repite la lista hasta cubrir el ancho y se duplica el bloque para que el loop no deje huecos */
      const unit = 72 + 56, vw = Math.max(window.innerWidth, ul.parentNode.clientWidth, 1200);
      const k = Math.max(1, Math.ceil(vw / (base.length * unit)));
      const total = base.length * k * 2;
      for (let i = base.length; i < total; i++) ul.appendChild(make(base[i % base.length], true));
      ul.style.setProperty("--dur", Math.round(base.length * k * unit / 45) + "s");
    }
  }

  /* ---------- Menú hamburguesa ---------- */
  const burger = $("burger"), menu = $("menu");
  if (burger && menu) {
    const setMenu = open => {
      menu.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); burger.focus(); } });
    matchMedia("(min-width: 901px)").addEventListener("change", e => { if (e.matches) setMenu(false); });
  }

  /* ---------- Aparición suave al hacer scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (!("IntersectionObserver" in window) || reduceMotion()) revealEls.forEach(n => n.classList.add("in"));
    else {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(n => io.observe(n));
    }
  }


  /* ---------- Servicios "Próximamente" (ver SERVICIOS_ACTIVOS arriba) ----------
     El HTML ya viene en estado "próximamente"; acá se reactiva lo que esté en true. */
  const activo = s => SERVICIOS_ACTIVOS[s] === true;
  document.querySelectorAll("[data-servicio]").forEach(n => {
    if (!activo(n.dataset.servicio)) return;
    n.classList.remove("soon");
    n.querySelectorAll("[data-soon]").forEach(x => x.remove());
    if (n.hasAttribute("data-active-only")) n.hidden = false;
    n.querySelectorAll("[data-active-only]").forEach(x => { x.hidden = false; });
  });
  if (COTIZADOR_COMPLETO) document.querySelectorAll("[data-cotizador-completo]").forEach(n => { n.hidden = false; });
  /* Growth y Brand: el bloque de tarjetas aparece solo si alguno está activo; la nota "Próximamente" lista los que faltan */
  (function () {
    const ext = $("servicios-extra"), nota = $("soon-note");
    if (ext && (activo("Growth") || activo("Brand"))) ext.hidden = false;
    if (nota) {
      const faltan = [];
      if (!activo("Growth")) faltan.push("Aura Growth (publicidad en Meta)");
      if (!activo("Brand")) faltan.push("Aura Brand (redes sociales)");
      if (faltan.length) nota.textContent = "Próximamente: " + faltan.join(" y ") + "."; else nota.hidden = true;
    }
  })();

  /* ---------- Armá tu proyecto (solicitud de cotización, sin precios) ----------
     w = semanas de trabajo estimadas; el plazo urgente reduce las semanas un 30%.
     Los grupos growth y brand quedan preparados: con SERVICIOS_ACTIVOS en true se habilitan. */
  const Q = {
    site: [
      { id: "none", name: "No necesito sitio", note: "Solo marketing o redes", w: 0 },
      { id: "landing", name: "Landing page", note: "1 página de conversión", w: 2, chip: "c-landing" },
      { id: "corp", name: "Sitio institucional", note: "Hasta 5 secciones", w: 4, chip: "c-sitio" },
      { id: "ecom", name: "Tienda online", note: "E-commerce con pagos y envíos", w: 6, chip: "c-tienda" },
      { id: "app", name: "App a medida", note: "Usuarios, panel, lógica a medida", w: 10, chip: "c-app" }
    ],
    extras: [
      { id: "seo", name: "SEO inicial", note: "Estructura, metadatos, velocidad", w: 0 },
      { id: "blog", name: "Blog autogestionable", note: "Panel para publicar", w: 1 },
      { id: "lang", name: "Multilenguaje", note: "Español + inglés", w: 1 },
      { id: "integ", name: "Integraciones", note: "CRM, WhatsApp, pasarelas", w: 1 }
    ],
    growth: [
      { id: "g0", name: "Sin pauta", note: "" },
      { id: "g1", name: "Un canal", note: "Meta Ads o Google Ads" },
      { id: "g2", name: "Meta + Google", note: "Embudo completo y reportes" }
    ],
    brand: [
      { id: "b0", name: "Sin gestión de redes", note: "" },
      { id: "b1", name: "Esencial", note: "8 piezas al mes · 1 red" },
      { id: "b2", name: "Pro", note: "16 piezas + reels · 2 redes" }
    ],
    time: [
      { id: "std", name: "Estándar", note: "Plazo recomendado" },
      { id: "fast", name: "Urgente", note: "Prioridad en agenda" }
    ]
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let quoteText = "";
  if ($("q-form")) {
    const opt = (group, o, type, checked, off) => {
      const id = "q-" + group + "-" + o.id;
      return '<div class="opt"><input type="' + type + '" name="q-' + group + '" id="' + id + '" value="' + o.id + '"' + (checked ? " checked" : "") + (off ? " disabled" : "") + '><label for="' + id + '">' + esc(o.name) + (o.note ? "<small>" + esc(o.note) + "</small>" : "") + "</label></div>";
    };
    /* "No necesito sitio" solo tiene sentido si hay otro servicio activo */
    const sites = Q.site.filter(o => o.id !== "none" || activo("Growth") || activo("Brand"));
    $("q-site").innerHTML = sites.map(o => opt("site", o, "radio", o.id === "corp")).join("");
    $("q-extras").innerHTML = Q.extras.map(o => opt("extras", o, "checkbox", COTIZADOR_COMPLETO && o.id === "seo")).join("");
    $("q-growth").innerHTML = Q.growth.map(o => opt("growth", o, "radio", o.id === (activo("Growth") ? "g1" : "g0"), !activo("Growth"))).join("");
    $("q-brand").innerHTML = Q.brand.map(o => opt("brand", o, "radio", o.id === "b0", !activo("Brand"))).join("");
    $("q-time").innerHTML = Q.time.map(o => opt("time", o, "radio", o.id === "std")).join("");
    const pick = (g, list) => list.find(o => o.id === (document.querySelector('input[name="q-' + g + '"]:checked') || {}).value);
    const quote = () => {
      const site = pick("site", Q.site), gr = pick("growth", Q.growth), br = pick("brand", Q.brand), t = pick("time", Q.time);
      const hasSite = site.id !== "none";
      /* Extras y plazo solo aplican si se eligió un sitio */
      document.querySelectorAll("#q-extras input").forEach(i => { i.disabled = !hasSite; if (!hasSite) i.checked = false; });
      document.querySelectorAll("#q-time input").forEach(i => { i.disabled = !hasSite; });
      const exOn = COTIZADOR_COMPLETO && hasSite ? Q.extras.filter(o => $("q-extras-" + o.id).checked) : [];
      let w = site.w;
      exOn.forEach(o => { w += o.w; });
      const weeks = COTIZADOR_COMPLETO && hasSite && t.id === "fast" ? Math.max(1, Math.ceil(w * 0.7)) : w;
      const lines = [];
      if (hasSite) lines.push(["Aura Code", site.name]);
      exOn.forEach(o => lines.push(["Extra", o.name]));
      if (activo("Growth") && gr.id !== "g0") lines.push(["Aura Growth", gr.name]);
      if (activo("Brand") && br.id !== "b0") lines.push(["Aura Brand", "Redes " + br.name]);
      if (COTIZADOR_COMPLETO && hasSite) lines.push(["Plazo", t.name]);
      $("q-lines").innerHTML = lines.length ? lines.map(l => "<div><dt>" + esc(l[0]) + "</dt><dd>" + esc(l[1]) + "</dd></div>").join("") : "<div><dd>Elegí al menos una opción.</dd></div>";
      const weeksTxt = weeks + (weeks === 1 ? " semana" : " semanas");
      $("q-weeks").textContent = weeks ? "Entrega estimada del sitio: " + weeksTxt + "." : "";
      const nothing = !lines.some(l => l[0] === "Aura Code" || l[0] === "Aura Growth" || l[0] === "Aura Brand");
      $("q-send").disabled = nothing;
      quoteText = nothing ? "" : "Solicitud de cotización:\n" + lines.map(l => "• " + l[0] + ": " + l[1]).join("\n") + (weeks ? "\nEntrega estimada: " + weeksTxt : "");
      quote.site = site;
    };
    $("q-form").addEventListener("change", quote); quote();
    $("q-send").addEventListener("click", () => {
      track("solicitar_cotizacion", { opciones: quoteText.split("\n").length - 1 });
      $("c-msg").value = quoteText + "\n\nComentarios: ";
      document.querySelectorAll(".chips input").forEach(i => { i.checked = false; });
      if (quote.site && quote.site.chip) $(quote.site.chip).checked = true;
      if (activo("Growth") && quoteText.includes("Aura Growth")) $("c-growth").checked = true;
      if (activo("Brand") && quoteText.includes("Aura Brand")) $("c-brand").checked = true;
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
      const needs = [...document.querySelectorAll(".chips input:checked")].map(i => i.value);
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
