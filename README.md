# CBR Auditores & Consultores — Web Corporativa

Sitio web corporativo desarrollado con React + Vite para CBR Auditores & Consultores.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
```

El build ejecuta `vite build` y después `scripts/prerender-meta.mjs`, que genera un `index.html`
por ruta con su título, descripción, canonical y Open Graph (visibles para WhatsApp, LinkedIn,
Facebook y otros rastreadores que no ejecutan JavaScript): las 7 páginas principales, una ficha por
noticia de `src/content/news.js`, un `404.html` y el `sitemap.xml`. Los textos SEO de cada página se
editan en `src/seo.js`; las noticias, en `src/content/news.js`.

Dominio oficial y canónico: `https://www.cbrauditores.com` (el dominio sin `www` redirige a él).

La carpeta de salida es:

```bash
dist
```

## Deploy en Vercel

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Secciones

- Inicio
- Servicios
- Nosotros
- Contacto
- Centro de actualizaciones profesionales
- Ley 155-17
- Aviso de privacidad
