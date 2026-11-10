# Aura Digital Estudio — web

Sitio estático (GitHub Pages, rama `main`, dominio `auradigitalestudio.com` vía `CNAME`). Sin build: HTML + CSS + JS puro.
Diseño: tema oscuro neón cian/violeta; fuentes Michroma, Space Grotesk y JetBrains Mono. Textos en español rioplatense (vos).

## Estructura
- `index.html` — página principal (hero con logo 3D, servicios, proyectos, cotizador, proceso, contacto).
- `privacidad.html` — Política de Privacidad (Ley 25.326).
- `404.html` — página de error (usa rutas absolutas `/...`).
- `css/styles.css` — todos los estilos.
- `js/app.js` — toda la lógica; se carga con `defer` en las 3 páginas y cada bloque se activa solo si existen sus elementos.
- `img/` — `logo.jpg`/`logo.webp` (usados con `<picture>`), `og-image.jpg` (1200×630), `icon-192.png`, `icon-512.png`.
- Raíz: `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `CNAME`.

## Configuración (arriba de `js/app.js`)
- `PROYECTOS`: array del portfolio. Vacío = la sección y su link del menú se ocultan. Hay un ejemplo comentado.
- `WHATSAPP_NUMBER`: mientras sea `[549XXXXXXXXXX]` el botón flotante queda oculto.
- `GA_ID`: mientras sea `[G-XXXXXXX]` no se carga Analytics ni se muestra el banner de cookies. Con ID válido, GA4 solo carga si el visitante acepta (`localStorage.aura_consent`).
- `STUDIO_EMAIL`, `WEB3FORMS_KEY`: destino del formulario (Web3Forms; si falla, opción "Abrir en mi correo").
- Precios del cotizador: objeto `Q` (USD).

## Notas
- Eventos GA4: `generate_lead` y `form_submit` (formulario), `whatsapp_click`, `enviar_cotizacion`.
- Formulario: honeypot `botcheck`, bloqueo de reenvío de 30 s (`localStorage.aura_last_send`), validación en español, checkbox de privacidad obligatorio.
- Si agregás páginas, copiá el footer (año con `data-year`, email, link a privacidad, botón `#cookie-prefs`) y el botón `#wa-btn`.
- Pendientes de contenido: buscar `[Completar]` en el proyecto.
