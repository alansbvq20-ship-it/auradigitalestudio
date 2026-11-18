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
     capturas: alternativa a imagen/alt, varias: [{ src: "...", alt: "...", w, h }, ...] (lightbox con flechas)
     marcoPropio: true si las capturas ya traen marco de celular (no se les agrega otro)
     visibles: cuántas capturas se ven en la tarjeta (el lightbox muestra todas)
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
  },
  {
    cliente: "SICO Technologies — Sistema Integral de Coordinación Operativa",
    tipo: "App a medida",
    dispositivo: "mobile",
    marcoPropio: true, /* las capturas ya traen marco de celular y fondo transparente: no se les agrega otro */
    visibles: 3,       /* en la tarjeta se ven las 3 primeras; el lightbox suma el resto */
    desafio: "Coordinar en segundos la respuesta de los bomberos ante una emergencia: quién va, a dónde y cuánto tarda.",
    solucion: "App de despacho con interfaz para el bombero y panel para el operador: geolocalización de cada bombero en tiempo real, seguimiento de las unidades en camino, respuesta inmediata a la convocatoria, tiempo estimado de llegada, estado de la intervención y avisos segmentados por destacamento.",
    capturas: [
      { src: "img/proyectos/sico-bombero.webp", w: 360, h: 654, alt: "SICO: interfaz del bombero con su perfil, intervención activa y estadísticas" },
      { src: "img/proyectos/sico-operador.webp", w: 360, h: 647, alt: "SICO: panel del operador con la intervención en curso, personal en camino, distancia y tiempo estimado de llegada" },
      { src: "img/proyectos/sico-respuesta.webp", w: 340, h: 579, alt: "SICO: respuesta inmediata del bombero ante un aviso de emergencia" },
      { src: "img/proyectos/sico-avisos.webp", w: 340, h: 579, alt: "SICO: avisos segmentados a los bomberos" },
      { src: "img/proyectos/sico-intervencion.webp", w: 340, h: 579, alt: "SICO: estado de la intervención en curso" }
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
   (franja "Lo que viene" con lista de espera, sin opción en el formulario).
   Para reactivar Growth o Brand alcanza con ponerlos en true: no hace falta tocar nada más
   (revisá además los textos de hero, SEO y footer, que hoy hablan solo de desarrollo). */
const SERVICIOS_ACTIVOS = { Code: true, Growth: false, Brand: false };

/* ===== PRECIOS (sección "Precios") =====
   Todos los valores se editan acá. Precios en dólares (USD).
   tipoDolar:  "oficial" | "blue" | "bolsa" (MEP). Se consulta https://dolarapi.com/v1/dolares/{tipoDolar} y se usa "venta".
   cuotas:     cantidad de cuotas que se muestra bajo cada precio (precio / cuotas, redondeado hacia arriba a USD enteros).
   desde:      true = el precio se muestra como "Desde USD X".
   destacado:  true = tarjeta marcada como "Más elegido".
   entrega:    plazo estimado de entrega que se muestra en la tarjeta ("Entrega estimada: …"). Ajustalo a gusto.
   express:    extra opcional del paquete (casilla en la tarjeta): { etiqueta, usd (se suma al precio), entrega (reemplaza el plazo) }.
   incluyeTodas: texto que se muestra debajo de las tarjetas.
   mantenimiento: agregado opcional mensual (sin cuotas).
   Si la cotización no carga, se muestran solo los precios en USD. */
const PRECIOS = {
  tipoDolar: "bolsa",
  cuotas: 3,
  cartel: "Precios de lanzamiento para los primeros 10 clientes",
  incluyeTodas: "Todas las webs incluyen SEO inicial, diseño adaptado a celular y formulario de contacto.",
  paquetes: [
    {
      nombre: "Landing Page", usd: 90, desde: false, destacado: false, entrega: "2 semanas",
      express: { etiqueta: "Entrega express en 1 semana", usd: 30, entrega: "1 semana" },
      descripcion: "Web de una página para presentar tu negocio.",
      incluye: ["Web de una sola página"]
    },
    {
      nombre: "Web Institucional", usd: 190, desde: false, destacado: true, entrega: "4 semanas",
      descripcion: "Tu empresa en la web, con varias secciones.",
      incluye: ["Varias secciones", "Formulario de contacto", "Dominio configurado"]
    },
    {
      nombre: "Tienda Online", usd: 350, desde: true, destacado: false, entrega: "desde 6 semanas",
      descripcion: "Vendé tus productos online, las 24 horas.",
      incluye: ["Catálogo de productos", "Carrito y pagos con Mercado Pago", "Envíos"]
    },
    {
      nombre: "Apps a Medida", usd: 500, desde: true, destacado: false, entrega: "desde 10 semanas",
      descripcion: "Apps de turnos, gestión y más, hechas para tu negocio.",
      incluye: ["Apps de turnos, gestión y más"],
      ejemplo: { texto: "Ejemplo: SICO, coordinación operativa para bomberos", enlace: "#proyectos" }
    }
  ],
  mantenimiento: { nombre: "Abono de mantenimiento", usd: 12, periodo: "mes", descripcion: "Hosting, actualizaciones y soporte." }
};

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
    PROYECTOS.forEach((p, pi) => {
      const card = el("article", "case reveal" + (PROYECTOS.length % 2 && pi === PROYECTOS.length - 1 ? " wide" : ""));
      const shots = (p.capturas && p.capturas.length ? p.capturas : (p.imagen ? [{ src: p.imagen, alt: p.alt }] : [])).filter(s => s && s.src);
      if (shots.length) {
        const mobile = p.dispositivo === "mobile";
        const media = el("div", "media " + (mobile ? "is-mobile" : "is-desktop"));
        shots.slice(0, p.visibles || shots.length).forEach((s, n) => {
          const btn = el("button", "shot"); btn.type = "button";
          btn.setAttribute("aria-label", "Ver captura ampliada: " + (s.alt || p.cliente || ""));
          const frame = el("div", mobile ? "phone" + (p.marcoPropio ? " bare" : "") : "win");
          if (!mobile) { const bar = el("div", "bar"); bar.setAttribute("aria-hidden", "true"); bar.append(el("i"), el("i"), el("i")); frame.appendChild(bar); }
          const img = el("img"); img.src = s.src; img.alt = s.alt || "";
          if (s.w && s.h) { img.width = s.w; img.height = s.h; } else if (mobile) { img.width = 800; img.height = 1739; } else { img.width = 1600; img.height = 1000; }
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

  /* ---------- Paquete elegido: lo fija el botón de cada tarjeta de Precios y se muestra en el formulario ---------- */
  let paquete = "", expressOn = false, autoMsg = "";
  let resetExpress = () => { expressOn = false; };
  const paqueteDef = n => ((typeof PRECIOS !== "undefined" && PRECIOS.paquetes) || []).find(p => p.nombre === n);
  function paqueteTexto() {
    const d = paqueteDef(paquete);
    return paquete + (d && d.express && expressOn ? " + Entrega express" : "");
  }
  function setPaquete(nombre) {
    paquete = nombre || "";
    const n = $("c-pack-name"); if (n) n.textContent = paqueteTexto() || "A definir";
    document.querySelectorAll(".plan[data-pkg]").forEach(c => {
      const on = !!paquete && c.dataset.pkg === paquete;
      c.classList.toggle("selected", on);
      if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current");
    });
  }

  /* Modo "idea": se llega desde "¿Tenés un proyecto en mente?" -> Mensaje más alto, otro placeholder y el cursor ahí */
  const IDEA_PLACEHOLDER = "Contanos tu idea: qué hace tu negocio, qué necesitás y si tenés alguna referencia o fecha en mente.";
  const msgInicial = { ph: ($("c-msg") || {}).placeholder, rows: ($("c-msg") || {}).rows };
  function modoIdea(on) {
    const m = $("c-msg"); if (!m) return;
    m.placeholder = on ? IDEA_PLACEHOLDER : msgInicial.ph;
    m.rows = on ? 12 : msgInicial.rows;
  }
  document.querySelectorAll("[data-idea]").forEach(a => a.addEventListener("click", () => {
    resetExpress(); setPaquete("");
    const m = $("c-msg"); if (!m) return;
    if (m.value === autoMsg) m.value = "";
    modoIdea(true);
    setTimeout(() => m.focus({ preventScroll: true }), reduceMotion() ? 50 : 650);
  }));

  /* ---------- Precios: se arma desde PRECIOS y, si hay cotización, suma el equivalente en pesos ---------- */
  (function () {
    if (PRECIOS && Array.isArray(PRECIOS.paquetes) && PRECIOS.paquetes.length) document.querySelectorAll("[data-precios-link]").forEach(n => { n.hidden = false; });
    const sec = $("precios");
    if (!sec || !PRECIOS || !Array.isArray(PRECIOS.paquetes) || !PRECIOS.paquetes.length) return;
    const usd = n => Number.isInteger(n) ? String(n) : n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const ars = n => "$" + (Math.round(n / 1000) * 1000).toLocaleString("es-AR");
    const arsSpan = (valor, extra) => { const s = el("span", "ars"); s.dataset.usd = String(valor); if (extra) s.dataset.extra = extra; s.hidden = true; return s; };
    const nCuotas = PRECIOS.cuotas > 1 ? PRECIOS.cuotas : 0;
    const cuotaUsd = t => Math.ceil(t / nCuotas);          /* cuotas en USD: números enteros */
    const precioDe = p => p.usd + (p.express && expressOn ? p.express.usd : 0);
    const refreshers = [];

    /* Pesos: se pintan cuando hay cotización y se repintan si cambia un precio */
    let fxVenta = 0;
    const paintArs = () => {
      if (!fxVenta) return;
      sec.querySelectorAll(".ars").forEach(s => { s.textContent = "≈ " + ars(+s.dataset.usd * fxVenta) + (s.dataset.extra || ""); s.hidden = false; });
    };
    /* Mensaje precargado: se actualiza solo mientras nadie lo haya editado */
    const prefill = p => {
      const msg = $("c-msg"); if (!msg) return;
      const t = "Hola, quiero consultar por " + paqueteTexto() + " (" + (p.desde ? "desde " : "") + "USD " + usd(precioDe(p)) + ").\n";
      if (!msg.value.trim() || msg.value === autoMsg) { msg.value = t; autoMsg = t; }
    };
    resetExpress = () => { expressOn = false; document.querySelectorAll(".px-express-in").forEach(i => { i.checked = false; }); refreshers.forEach(r => r()); };

    /* La casilla de mantenimiento del formulario y el botón de Precios van sincronizados */
    function syncMant() {
      const c = $("c-mant"), t = $("px-mant-btn"); if (!c || !t) return;
      t.setAttribute("aria-pressed", c.checked ? "true" : "false");
      t.textContent = c.checked ? "✓ Agregado al pedido" : "Sumar al pedido";
      t.classList.toggle("ghost", !c.checked);
    }
    if ($("c-mant")) { $("c-mant").addEventListener("change", syncMant); if ($("c-form")) $("c-form").addEventListener("reset", () => setTimeout(syncMant, 0)); }

    const inc = $("px-incluye"); if (inc && PRECIOS.incluyeTodas) { inc.textContent = PRECIOS.incluyeTodas; inc.hidden = false; }
    if (PRECIOS.cartel) $("px-launch").append(el("i"), PRECIOS.cartel); else $("px-launch").hidden = true;

    const plans = $("px-plans");
    plans.dataset.count = String(PRECIOS.paquetes.length);
    PRECIOS.paquetes.forEach(p => {
      const card = el("article", "plan reveal" + (p.destacado ? " featured" : ""));
      card.dataset.pkg = p.nombre;
      { const sel = el("span", "plan-sel", "✓ Seleccionado"); sel.setAttribute("aria-hidden", "true"); card.appendChild(sel); }
      if (p.destacado) card.appendChild(el("span", "plan-badge", "Más elegido"));
      card.appendChild(el("h3", "", p.nombre));
      if (p.descripcion) card.appendChild(el("p", "plan-desc", p.descripcion));
      const price = el("div", "plan-price");
      if (p.desde) price.appendChild(el("small", "", "Desde"));
      else if (PRECIOS.paquetes.some(q => q.desde)) { const ph = el("small", "ph", "Desde"); ph.setAttribute("aria-hidden", "true"); price.appendChild(ph); }
      const priceB = el("b", "", "USD " + usd(p.usd));
      const priceArs = arsSpan(p.usd);
      price.append(priceB, priceArs);
      card.appendChild(price);
      let cuotaTxt = null, cuotaArs = null;
      if (nCuotas) {
        const c = el("p", "plan-cuotas");
        cuotaTxt = document.createTextNode(nCuotas + " cuotas " + (p.desde ? "desde " : "de ") + "USD " + usd(cuotaUsd(p.usd)) + " ");
        cuotaArs = arsSpan(cuotaUsd(p.usd));
        c.append(cuotaTxt, cuotaArs);
        card.appendChild(c);
      }
      const ul = el("ul");
      (p.incluye || []).forEach(t => ul.appendChild(el("li", "", t)));
      if (p.ejemplo) { const li = el("li", "ej"); const a = el("a", "", p.ejemplo.texto); a.href = p.ejemplo.enlace || "#proyectos"; li.appendChild(a); ul.appendChild(li); }
      card.appendChild(ul);

      /* Extra opcional (entrega express): suma al precio y cambia el plazo */
      let entregaB = null, inp = null;
      if (p.express) {
        const lab = el("label", "consent"); lab.htmlFor = "px-express-" + p.nombre.replace(/\W+/g, "");
        inp = el("input", "px-express-in"); inp.type = "checkbox"; inp.id = lab.htmlFor;
        lab.append(inp, el("span", "", p.express.etiqueta + " (+USD " + usd(p.express.usd) + ")"));
        card.appendChild(lab);
      }
      if (p.entrega) { const e = el("p", "plan-entrega", "Entrega estimada: "); entregaB = el("b", "", p.entrega); e.appendChild(entregaB); card.appendChild(e); }
      const refresh = () => {
        const t = precioDe(p);
        priceB.textContent = "USD " + usd(t); priceArs.dataset.usd = String(t);
        if (cuotaTxt) { const cu = cuotaUsd(t); cuotaTxt.nodeValue = nCuotas + " cuotas " + (p.desde ? "desde " : "de ") + "USD " + usd(cu) + " "; cuotaArs.dataset.usd = String(cu); }
        if (entregaB) entregaB.textContent = p.express && expressOn ? p.express.entrega : p.entrega;
        paintArs();
      };
      refreshers.push(refresh);
      if (inp) inp.addEventListener("change", () => {
        expressOn = inp.checked;
        if (expressOn) setPaquete(p.nombre); else setPaquete(paquete);
        refreshers.forEach(r => r());
        if (paquete === p.nombre) prefill(p);
      });

      const btn = el("a", "btn" + (p.destacado ? "" : " ghost"), "Quiero empezar");
      btn.href = "#contacto";
      btn.setAttribute("aria-label", "Quiero empezar: " + p.nombre);
      btn.addEventListener("click", e => {
        modoIdea(false);
        if (expressOn && !p.express) resetExpress();
        setPaquete(p.nombre);
        prefill(p);
        if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;   /* abrir en otra pestaña: comportamiento normal */
        e.preventDefault();
        const bajar = () => {
          const t = $("contacto");
          if (location.hash === "#contacto") { if (t) t.scrollIntoView({ behavior: reduceMotion() ? "auto" : "smooth" }); }
          else location.hash = "#contacto";
        };
        if (reduceMotion()) { bajar(); return; }               /* sin animaciones: solo queda marcada */
        card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
        setTimeout(() => card.classList.remove("flash"), 900);
        setTimeout(bajar, 650);
      });
      card.appendChild(btn);
      plans.appendChild(card);
    });

    const m = PRECIOS.mantenimiento, box = $("px-maint");
    if (m && m.usd) {
      const card = el("div", "maint reveal");
      const txt = el("div", "maint-txt");
      txt.append(el("span", "plan-opt", "Agregado opcional"), el("h3", "", m.nombre));
      if (m.descripcion) txt.appendChild(el("p", "", m.descripcion));
      const price = el("div", "plan-price");
      price.appendChild(el("b", "", "USD " + usd(m.usd) + (m.periodo ? " / " + m.periodo : "")));
      price.appendChild(arsSpan(m.usd, m.periodo ? " / " + m.periodo : ""));
      const tog = el("button", "btn ghost sm", "Sumar al pedido");
      tog.type = "button"; tog.id = "px-mant-btn"; tog.setAttribute("aria-pressed", "false");
      tog.addEventListener("click", () => { const c = $("c-mant"); if (c) { c.checked = !c.checked; syncMant(); } });
      price.appendChild(tog);
      card.append(txt, price);
      box.appendChild(card);
    } else box.hidden = true;

    sec.hidden = false;

    /* Cotización del dólar: si falla o tarda más de 5 s, quedan solo los precios en USD */
    const TIPOS = { oficial: "oficial", blue: "blue", bolsa: "bolsa (MEP)" };
    const tipo = TIPOS[PRECIOS.tipoDolar] ? PRECIOS.tipoDolar : "bolsa";
    if (typeof fetch !== "function") return;
    const ctl = typeof AbortController === "function" ? new AbortController() : null;
    const timer = setTimeout(() => { if (ctl) ctl.abort(); }, 5000);
    fetch("https://dolarapi.com/v1/dolares/" + tipo, ctl ? { signal: ctl.signal, headers: { Accept: "application/json" } } : undefined)
      .then(r => { if (!r.ok) throw new Error("http " + r.status); return r.json(); })
      .then(j => {
        const venta = +j.venta;
        if (!(venta > 0)) throw new Error("sin venta");
        fxVenta = venta;
        if (PRECIOS.mantenimiento && $("c-mant-ars")) $("c-mant-ars").textContent = ars(PRECIOS.mantenimiento.usd * venta);
        paintArs();
        let d = new Date(j.fechaActualizacion);
        if (isNaN(d)) d = new Date();
        let fecha;
        try { fecha = d.toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", day: "2-digit", month: "2-digit", year: "numeric" }); } catch (e) { fecha = d.toLocaleDateString("es-AR"); }
        $("px-fx").textContent = "Precio en pesos al dólar " + TIPOS[tipo] + " del día (cotización del " + fecha + ").";
        $("px-fx").hidden = false;
      })
      .catch(() => { /* sin cotización: solo USD */ })
      .finally(() => clearTimeout(timer));
  })();

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
  /* Growth y Brand: sus tarjetas vuelven a Servicios apenas están activos y salen de "Lo que viene" */
  (function () {
    const ext = $("servicios-extra");
    if (ext && (activo("Growth") || activo("Brand"))) ext.hidden = false;

    const band = $("lo-que-viene");
    if (!band) return;
    band.querySelectorAll("[data-soon-card]").forEach(c => { if (activo(c.dataset.servicio)) c.remove(); });
    const faltan = ["Growth", "Brand"].filter(s => !activo(s));
    if (!faltan.length) { band.hidden = true; return; }

    /* Lista de espera: el selector solo ofrece los servicios que todavía no están activos */
    if (faltan.length === 1) {
      $("wl-pick").hidden = true;
      $(faltan[0] === "Growth" ? "wl-g" : "wl-b").checked = true;
      const solo = band.querySelector(".soon-cards"); if (solo) solo.classList.add("one");
    }
    const open = $("wl-open"), form = $("wl-form"), note = $("wl-note"), btn = $("wl-submit");
    const LOCK_MS = 30000, LOCK_KEY = "aura_last_wl";
    let lockTimer = 0, memLast = 0;
    const lastSent = () => +store.get(LOCK_KEY) || memLast;
    const lockLeft = () => Math.max(0, LOCK_MS - (Date.now() - lastSent()));
    function tickLock() {
      clearTimeout(lockTimer);
      const left = lockLeft();
      if (left > 0) { btn.disabled = true; btn.textContent = "Reenviar en " + Math.ceil(left / 1000) + " s"; lockTimer = setTimeout(tickLock, 500); }
      else { btn.disabled = false; btn.textContent = "Avisarme"; }
    }
    open.addEventListener("click", () => {
      form.hidden = false; open.hidden = true; open.setAttribute("aria-expanded", "true");
      note.hidden = true;
      $("wl-mail").focus();
    });
    const setErr = (id, errId, msg) => {
      $(errId).textContent = msg;
      if (msg) $(id).setAttribute("aria-invalid", "true"); else $(id).removeAttribute("aria-invalid");
    };
    const mailMsg = v => !v ? "Escribí tu email." : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Revisá tu email: tiene que verse como nombre@dominio.com." : "";
    $("wl-mail").addEventListener("input", () => { if ($("e-wl-mail").textContent) setErr("wl-mail", "e-wl-mail", mailMsg($("wl-mail").value.trim())); });
    $("wl-priv").addEventListener("change", () => { if ($("wl-priv").checked) setErr("wl-priv", "e-wl-priv", ""); });
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (lockLeft() > 0) { tickLock(); return; }
      note.hidden = true;
      const mail = $("wl-mail").value.trim(), m = mailMsg(mail);
      setErr("wl-mail", "e-wl-mail", m);
      const okPriv = $("wl-priv").checked;
      setErr("wl-priv", "e-wl-priv", okPriv ? "" : "Tenés que aceptar la Política de Privacidad para anotarte.");
      if (m) { $("wl-mail").focus(); return; }
      if (!okPriv) { $("wl-priv").focus(); return; }
      const picked = (form.querySelector('input[name="wl-svc"]:checked') || {}).value || faltan.join(" y ");
      const subject = "Lista de espera: " + picked;
      const done = () => {
        form.hidden = true;
        note.style.color = "var(--ok)"; note.textContent = "¡Listo! Te avisamos apenas lancemos."; note.hidden = false;
        track("lista_espera", { servicio: picked });
        memLast = Date.now(); store.set(LOCK_KEY, String(memLast)); tickLock();
      };
      /* Honeypot tildado = bot: simulamos éxito sin enviar nada */
      if ($("wl-botcheck").checked) { done(); return; }
      btn.disabled = true; btn.textContent = "Enviando…";
      let sent = false;
      if (WEB3FORMS_KEY) {
        try {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "Web Aura Digital", replyto: mail, email: mail, servicio: picked, message: "Quiere enterarse primero del lanzamiento de: " + picked, botcheck: $("wl-botcheck").checked })
          });
          const j = await r.json();
          if (!j.success) throw new Error(j.message);
          sent = true;
        } catch (err) { /* se muestra el aviso de abajo */ }
      }
      if (sent) { done(); return; }
      tickLock(); if (lockLeft() <= 0) { btn.disabled = false; btn.textContent = "Avisarme"; }
      note.style.color = "var(--warn)";
      note.innerHTML = "";
      note.append("No pudimos enviarlo ahora. Probá de nuevo o escribinos a ");
      const a = el("a", "", STUDIO_EMAIL); a.href = "mailto:" + STUDIO_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent("Quiero enterarme primero del lanzamiento de: " + picked); note.appendChild(a); note.append(".");
      note.hidden = false;
    });
    tickLock();
  })();

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
    const waMsg = v => { if (!v) return ""; const d = v.replace(/\D/g, "").length; return d < 8 || d > 15 || /[^\d\s()+.-]/.test(v) ? "Revisá tu WhatsApp: solo números, con código de área (ej.: 11 2345 6789)." : ""; };
    $("c-wa").addEventListener("input", () => { if ($("e-wa").textContent) setErr("c-wa", "e-wa", waMsg($("c-wa").value.trim())); });
    function validate() {
      let first = null;
      rules.forEach(r => { const m = r.check($(r.id).value.trim()); setErr(r.id, r.err, m); if (m && !first) first = $(r.id); });
      { const m = waMsg($("c-wa").value.trim()); setErr("c-wa", "e-wa", m); if (m && !first) first = $("c-wa"); }
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
      const needs = [paqueteTexto() || "A definir"];
      const subject = "Nueva consulta web: " + name + (needs.length ? " (" + needs.join(", ") + ")" : "");
      const wapp = $("c-wa").value.trim(), mant = $("c-mant").checked;
      const mantTxt = mant ? "Sí" + (PRECIOS && PRECIOS.mantenimiento ? " (USD " + PRECIOS.mantenimiento.usd + "/mes, aprox. " + ($("c-mant-ars").textContent || "") + "/mes)" : "") : "No";
      const body = "Nombre: " + name + "\nEmail: " + mail + (wapp ? "\nWhatsApp: " + wapp : "") + "\nPaquete elegido: " + needs[0] + "\nMantenimiento mensual: " + mantTxt + "\n\n" + msg;
      note.hidden = false;
      /* Honeypot tildado = bot: simulamos éxito sin enviar nada */
      if ($("c-botcheck").checked) { note.style.color = "var(--ok)"; note.textContent = "Listo. Recibimos tu consulta."; startLock(); return; }
      if (WEB3FORMS_KEY) {
        btn.disabled = true; btn.textContent = "Enviando…";
        let sent = false;
        try {
          const r = await fetch("https://api.web3forms.com/submit", {
            method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "Web Aura Digital", replyto: mail, name, email: mail, servicios: needs.join(", "), whatsapp: wapp || "No informado", mantenimiento_mensual: mantTxt, message: body, botcheck: $("c-botcheck").checked })
          });
          const j = await r.json();
          if (!j.success) throw new Error(j.message);
          sent = true;
          note.style.color = "var(--ok)";
          note.textContent = "Listo, " + name + ". Recibimos tu consulta y te respondemos a " + mail + " en menos de 24 horas hábiles.";
          track("generate_lead", { form_id: "contacto", servicios: needs.join(", "), mantenimiento: mant ? "si" : "no" });
          track("form_submit", { form_id: "contacto" });
          form.reset(); resetExpress(); setPaquete(""); modoIdea(false);
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
