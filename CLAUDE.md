# Aura Digital Estudio — web

Sitio estático (GitHub Pages, rama `main`, dominio `auradigitalestudio.com` vía `CNAME`). Sin build: HTML + CSS + JS puro.
Textos en español rioplatense (vos). No inventar clientes, testimonios ni cifras: lo que falte va como `[Completar]`.

## Estructura
- `index.html` — página principal. Orden: menú, hero, números de impacto, clientes, servicios, proyectos, proceso, "Armá tu proyecto" (`#cotizador`), CTA, contacto, footer.
- `privacidad.html` — Política de Privacidad (Ley 25.326).
- `404.html` — página de error (usa rutas absolutas `/...`).
- `css/styles.css` — estilos del sitio (`css/logo.css`: logo animado del hero y ícono del menú) (sistema de diseño abajo).
- `js/app.js` — toda la lógica; se carga con `defer` en las 3 páginas y cada bloque se activa solo si existen sus elementos.
- `img/` — `logo.jpg`/`logo.webp` (con `<picture>`), `logo-mark.webp` (ícono "A" del menú), `og-image.jpg` (1200×630; los metas usan `?v=2`), `logo-cuadrado.png` (512×512, logo del JSON-LD), `icon-192.png`, `icon-512.png`.
- Raíz: `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `CNAME`.

## Sistema de diseño ("corporativo tech")
- **Paleta** (variables en `:root`): fondo azul noche `--bg #070d26`, secciones alternadas `--bg-2 #0b1438` (clase `.band.alt`), tarjetas y formularios `--card #0f1a45`, footer `--footer #050a1f`, menú `rgba(7,13,38,.85)` con desenfoque, bordes `--line` `rgba(92,200,255,.15)` / `--line-2` (más fuerte), texto `--text` y `--muted #a9b8e0` (gris azulado). Acento azul eléctrico `--accent #1e90ff` (bordes, íconos, foco, checkboxes, opciones elegidas, brillos `rgba(30,144,255,…)`); acento claro `--accent-text #5cc8ff` (links, textos destacados, hovers); botones `--btn #1565d8` (hover `--btn-hover #1a73e8`) con texto blanco, que da contraste AA (con `#1e90ff` de fondo el texto blanco no llega a 4,5:1); violeta `--violet #6a5cff` solo en detalles (fondo sutil del hero, degradado del CTA). El logo animado define sus propios colores dentro de `.hero-logo` (`css/logo.css`). `theme-color` y `theme_color` = `#1e90ff`.
- **Tipografía**: Inter (400–800). Títulos 800 con interlineado ~1.05–1.1 (h1 40–72px). Michroma solo en el nombre "AURA" del menú/footer.
- **Botones** `.btn` (rectangulares, radio 7px, sólidos cian), `.btn.ghost`, `.btn.sm`. Links con flecha `.link`.
- **Tarjetas** planas con borde fino, sin brillos. **Íconos** de línea en SVG inline (`.ico`).
- **Animaciones**: aparición al hacer scroll con la clase `.reveal` (IntersectionObserver en `app.js`, clase `js` en `<html>`), hover sutil, logo 3D (`.logo3d`/`.tilt`) que sigue al mouse. Todo se desactiva con `prefers-reduced-motion`.
- **Menú**: sticky; hamburguesa ≤900px (`#burger`, `#menu`). Las páginas internas usan `.nav.simple`.
- **Footer** en 4 columnas, igual en las 3 páginas (año con `data-year`, botón `#cookie-prefs`).
- Responsive probado a 390, 768 y 1280 px sin scroll horizontal.

## Configuración (arriba de `js/app.js`)
- `PROYECTOS`: casos de éxito (`cliente`, `tipo` ("Sistema web" / "App a medida"), `dispositivo` ("desktop" = marco de navegador 16:10, "mobile" = marco de celular), `desafio`, `solucion`, `imagen` + `alt` o `capturas: [{src, alt}]` para varias, `link` opcional). Las capturas están en `img/proyectos/`; al tocarlas se abren en un lightbox (flechas si hay varias, Escape o clic afuera cierran). Vacío = sección y links (`[data-proj-link]`) ocultos.
- `STATS`: franja de números. Valores `[Completar]` no se muestran; si no hay ninguno real, se oculta la franja.
- `CLIENTES`: logos de "Confían en nosotros" (cinta infinita al final de la página, antes del footer; archivos en `img/clientes/`). Cada logo va en una tarjeta blanca de 160×72; con `fondo: "oscuro"` la tarjeta es negra (para logos de fondo negro, como Enclave). Vacío = franja oculta.
- `SERVICIOS_ACTIVOS`: `{ Code: true, Growth: false, Brand: false }`. Hoy solo Aura Code está activo; Growth (publicidad) y Brand (redes) figuran como "Próximamente": tarjetas atenuadas con distintivo y sin link, grupos del cotizador deshabilitados (no entran al resumen ni al texto de "Solicitar cotización"), chips de Growth/Brand ocultos en el formulario y footer con "próximamente". Todo el código y el HTML de Growth y Brand sigue ahí: para reactivar un servicio ponelo en `true` (el HTML marca esos elementos con `data-servicio` / `data-soon` / `data-active-only`) y revisá los textos que hoy hablan solo de desarrollo (hero, título y meta description/Open Graph, JSON-LD con un solo servicio, footer, proceso).
- `COTIZADOR_COMPLETO`: `false` = el cotizador solo ofrece "Tipo de proyecto" (sin extras ni plazo urgente; los grupos están en el HTML con `data-cotizador-completo`). `true` los vuelve a mostrar.
- Servicios: la sección "Lo que hacemos" tiene 4 tarjetas de desarrollo (landing, sitio institucional, tienda online, app a medida). Las tarjetas de Growth y Brand siguen en el HTML dentro de `#servicios-extra` (oculto) y aparecen al activar el servicio; la nota "Próximamente" (`#soon-note`) se arma sola según `SERVICIOS_ACTIVOS`.
- `WHATSAPP_NUMBER`: mientras sea `[549XXXXXXXXXX]` el botón flotante queda oculto.
- `GA_ID`: mientras sea `[G-XXXXXXX]` no se carga Analytics ni se muestra el banner de cookies. Con ID válido, GA4 solo carga si el visitante acepta (`localStorage.aura_consent`).
- `STUDIO_EMAIL`, `WEB3FORMS_KEY`: destino del formulario (Web3Forms; si falla, opción "Abrir en mi correo").
- "Armá tu proyecto": objeto `Q` (opciones y semanas `w`). La web no muestra precios: el cliente elige opciones y pide cotización.

## Notas
- Eventos GA4: `generate_lead` y `form_submit` (formulario), `whatsapp_click`, `solicitar_cotizacion`.
- Formulario: honeypot `botcheck`, bloqueo de reenvío de 30 s (`localStorage.aura_last_send`), validación en español, checkbox de privacidad obligatorio.
- Al agregar páginas, copiar el nav simple, el footer y el botón `#wa-btn` de `privacidad.html`.
- Pendientes de contenido: buscar `[Completar]` en el proyecto.
