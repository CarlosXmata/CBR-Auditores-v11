// Candidatos editoriales desde los canales RSS oficiales (DGII, TSS, Ministerio de Trabajo, SIMV).
//
//   npm run news:feeds                    últimas 6 entradas por fuente
//   npm run news:feeds -- --limit 10      otra cantidad
//   npm run news:feeds -- --out <dir>     otra carpeta para news-report/candidatos.md
//
// Solo lee los canales RSS que cada organismo publica para eso, una petición por fuente.
// No rastrea páginas, no copia artículos y NO publica nada: la lista sirve para elegir qué resumir.
// Cada candidato elegido se redacta y verifica a mano según MANTENIMIENTO_NOTICIAS.md.
// La Superintendencia de Bancos y el Banco Central no ofrecen RSS: se revisan en su web.
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { news } from '../src/content/news.js'

const TIMEOUT_MS = 20000
const USER_AGENT = 'Mozilla/5.0 (compatible; feed-reader/1.0)'

const FEEDS = [
  {
    name: 'DGII',
    url: 'https://dgii.gov.do/noticias/_layouts/15/listfeed.aspx?List=7b9c1d99-efcb-455a-83de-3e1b1617bbf9&View=ea44a33f-c6a7-47c5-85bf-b5ad42e1c485',
    // El RSS de SharePoint enlaza a un formulario interno que pide autenticación; la página pública
    // es /noticias/Paginas/<nombre>.aspx y el título legible va dentro de la descripción.
    adapt: item => {
      const title = textOf(item.description.match(/<b>Title:<\/b>\s*([^<]+)/i)?.[1]) || item.title
      return { ...item, title, link: `https://dgii.gov.do/noticias/Paginas/${encodeURIComponent(item.title)}.aspx` }
    },
  },
  { name: 'TSS', url: 'https://tss.gob.do/noticias/feed/' },
  { name: 'Ministerio de Trabajo', url: 'https://mt.gob.do/feed/' },
  { name: 'SIMV', url: 'https://simv.gob.do/feed/' },
]

const args = process.argv.slice(2)
const option = (name, fallback) => {
  const index = args.indexOf(name)
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback
}
const limit = Math.max(1, Number.parseInt(option('--limit', '6'), 10) || 6)
const outDir = resolve(option('--out', 'news-report'))

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
function textOf(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim()
}

function field(block, tag) {
  return block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))?.[1] ?? ''
}

function parseRss(xml) {
  return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(([, block]) => ({
    title: textOf(field(block, 'title')),
    link: textOf(field(block, 'link')),
    pubDate: textOf(field(block, 'pubDate')),
    description: field(block, 'description').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1'),
  }))
}

// Quita los parámetros de seguimiento (utm_*) que algunos canales añaden a sus enlaces.
function cleanLink(link) {
  try {
    const url = new URL(link)
    ;[...url.searchParams.keys()].filter(key => key.startsWith('utm_')).forEach(key => url.searchParams.delete(key))
    return url.toString()
  } catch {
    return link
  }
}

function isoDay(pubDate) {
  const date = new Date(pubDate)
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10)
}

const known = new Set(news.map(item => decodeURI(item.sourceUrl).toLowerCase()))
const isKnown = link => {
  try { return known.has(decodeURI(link).toLowerCase()) } catch { return false }
}

async function readFeed(feed) {
  const response = await fetch(feed.url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.5' },
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const items = parseRss(await response.text()).map(item => (feed.adapt ? feed.adapt(item) : item))
  return items
    .map(item => ({ title: item.title, link: cleanLink(item.link), date: isoDay(item.pubDate), published: isKnown(cleanLink(item.link)) }))
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

async function main() {
  const sections = []
  console.log(`Candidatos editoriales desde RSS oficiales (máximo ${limit} por fuente)\n`)
  for (const feed of FEEDS) {
    try {
      const items = await readFeed(feed)
      console.log(`${feed.name}`)
      items.forEach(item => console.log(`  ${item.date || 'sin fecha'}  ${item.published ? '[ya publicada] ' : ''}${item.title}\n              ${item.link}`))
      console.log('')
      sections.push({ feed, items })
    } catch (error) {
      const reason = error.name === 'TimeoutError' ? 'tiempo agotado' : error.message
      console.log(`${feed.name}: no se pudo leer el canal (${reason}).\n`)
      sections.push({ feed, error: reason })
    }
  }

  const lines = ['# Candidatos editoriales', '', `Generado: ${new Date().toISOString()}`, '']
  lines.push('Lista de trabajo, no contenido publicado. Antes de incluir una entrada en `src/content/news.js`:', '')
  lines.push('1. Abrir el enlace oficial y leer la publicación completa.', '2. Redactar título, resumen y relevancia propios (sin copiar el texto).', '3. Registrar la fecha de publicación oficial y la fecha de verificación.', '4. Ejecutar `npm run news:check` y `npm run build`.', '')
  sections.forEach(({ feed, items, error }) => {
    lines.push(`## ${feed.name}`, '')
    if (error) { lines.push(`No se pudo leer el canal (${error}). Revisar a mano.`, ''); return }
    if (!items.length) { lines.push('Sin entradas.', ''); return }
    items.forEach(item => lines.push(`- ${item.date || 'sin fecha'} · ${item.title}${item.published ? ' · **ya publicada**' : ''}  \n  ${item.link}`))
    lines.push('')
  })
  lines.push('Sin RSS (revisar en su web): Superintendencia de Bancos (https://sb.gob.do/prensa/) y Banco Central.', '')

  await mkdir(outDir, { recursive: true })
  await writeFile(resolve(outDir, 'candidatos.md'), lines.join('\n'), 'utf8')
  console.log(`Lista guardada en ${resolve(outDir, 'candidatos.md')}. No se ha modificado ningún contenido.`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
