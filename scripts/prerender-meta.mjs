// Postbuild: genera un index.html por ruta con el <head> SEO correcto (título, descripción,
// canonical, Open Graph y Twitter) para que los rastreadores que no ejecutan JavaScript
// lo vean sin necesidad de renderizado en servidor ni dependencias adicionales.
//
// Parte de dist/index.html (salida de Vite) y reemplaza el bloque delimitado por
// <!-- seo:start --> ... <!-- seo:end -->. El cuerpo sigue siendo el de la app (React la
// monta en el navegador). También crea dist/404.html (con noindex) que Vercel sirve con
// estado HTTP 404 para rutas inexistentes, una ficha por noticia (src/content/news.js)
// y dist/sitemap.xml con todas las rutas indexables.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { SITE_URL, indexableRoutes, notFoundRoute, getRouteMeta, renderHeadHtml } = await import(
  pathToFileURL(join(root, 'src', 'seo.js')).href
)

const START = '<!-- seo:start -->'
const END = '<!-- seo:end -->'

const template = await readFile(join(dist, 'index.html'), 'utf8')
const start = template.indexOf(START)
const end = template.indexOf(END)
if (start === -1 || end === -1 || end < start) {
  console.error(`prerender-meta: no se encontraron los marcadores ${START} / ${END} en dist/index.html`)
  process.exit(1)
}

function build(meta) {
  const block = `${START}\n    ${renderHeadHtml(meta)}\n    ${END}`
  return template.slice(0, start) + block + template.slice(end + END.length)
}

const written = []

// 7 páginas principales + una ficha por noticia.
for (const path of indexableRoutes) {
  const meta = getRouteMeta(path)
  if (!meta.canonical) throw new Error(`prerender-meta: la ruta ${path} no tiene metadatos`)
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path.slice(1), 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, build(meta), 'utf8')
  written.push(path === '/' ? 'index.html' : `${path.slice(1)}/index.html`)
}

await writeFile(join(dist, '404.html'), build({ ...notFoundRoute, canonical: null }), 'utf8')
written.push('404.html')

// Sitemap generado a partir de las mismas rutas (reemplaza la copia de public/).
const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexableRoutes.map(path => `  <url><loc>${SITE_URL}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8')

console.log(`prerender-meta: ${written.length} archivos HTML con head por ruta y sitemap.xml con ${indexableRoutes.length} URL`)
for (const name of written) console.log(`  dist/${name}`)
