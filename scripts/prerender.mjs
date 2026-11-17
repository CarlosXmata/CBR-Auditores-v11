// Prerenderizado de metadatos. Se ejecuta después de `vite build`.
// Para cada ruta indexable escribe un HTML con su <title>, description, canonical,
// Open Graph y Twitter propios (la app React sigue montándose igual en el cliente),
// y genera dist/sitemap.xml a partir de las mismas rutas. Fuente: src/seo.js.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { absoluteUrl, allIndexablePaths, metaFor, NOT_FOUND } from '../src/seo.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const escapeAttr = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender: no se encontró ${label} en dist/index.html`)
  return html.replace(pattern, replacement)
}

function render(meta, { canonical, robots }) {
  const title = escapeAttr(meta.title)
  const description = escapeAttr(meta.description)
  let html = template
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`, '<title>')
  html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`, 'description')
  html = replaceOnce(html, /<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${robots}" />`, 'robots')
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`, 'canonical')
  html = replaceOnce(html, /<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${meta.type || 'website'}" />`, 'og:type')
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`, 'og:url')
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`, 'og:title')
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`, 'og:description')
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`, 'twitter:title')
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`, 'twitter:description')
  return html
}

const written = []
for (const path of allIndexablePaths()) {
  const meta = metaFor(path)
  const html = render(meta, { canonical: absoluteUrl(path), robots: 'index, follow' })
  // "/" -> index.html ; "/servicios" -> servicios.html ; "/noticias/x" -> noticias/x.html (cleanUrls en Vercel)
  const file = path === '/' ? join(dist, 'index.html') : join(dist, `${path.slice(1)}.html`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html)
  written.push(path)
}

// Plantilla para rutas desconocidas (Vercel la sirve con estado 404): noindex y sin canonical.
const notFound = render(NOT_FOUND, { canonical: absoluteUrl('/'), robots: 'noindex, follow' })
  .replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
  .replace(/\s*<meta property="og:url" content="[^"]*" \/>/, '')
writeFileSync(join(dist, '404.html'), notFound)

const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...written.map(path => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${today}</lastmod><priority>${metaFor(path).priority}</priority></url>`),
  '</urlset>',
  '',
].join('\n')
writeFileSync(join(dist, 'sitemap.xml'), sitemap)

console.log(`prerender: ${written.length} rutas con metadatos propios, 404.html y sitemap.xml`)
