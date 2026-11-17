// Verificación del Centro de Actualizaciones Profesionales y de las fuentes oficiales citadas.
//
//   npm run news:check                 informe en consola + news-report/news-check.{json,md}
//   npm run news:check -- --out <dir>  otra carpeta para el informe
//
// Qué revisa:
//   1. Los datos de src/content/news.js: campos obligatorios, fechas ISO, slugs únicos, tipo de publicación
//      y antigüedad de la última verificación manual (verifiedAt).
//   2. Cada enlace oficial (sourceUrl de las publicaciones y LAW_SOURCES de src/config/site.js):
//      HEAD y, si el servidor no lo admite o falla, GET; sigue redirecciones; tiempo límite por petición.
//
// Cómo clasifica cada enlace:
//   ok               respuesta 2xx (con o sin redirección)
//   revision-manual  403 o 429: el sitio rechaza peticiones automáticas; no se marca como roto
//   roto             401, 404, 410 u otro 4xx
//   url-invalida     la dirección no es una URL https absoluta válida: error de datos, no se hace ninguna petición
//   error-servidor   5xx tras un reintento
//   sin-respuesta    tiempo agotado, DNS o TLS
//
// No modifica contenido, no publica nada y no despliega. Sale con código 1 si hay enlaces rotos,
// errores de servidor, enlaces sin respuesta o datos inválidos; la revisión manual no hace fallar.
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { news } from '../src/content/news.js'
import { LAW_SOURCES } from '../src/config/site.js'

const TIMEOUT_MS = 15000
const PAUSE_SAME_HOST_MS = 800
const STALE_AFTER_DAYS = 120
// Identificador genérico: no se envía ningún dato del proyecto ni de personas.
const USER_AGENT = 'Mozilla/5.0 (compatible; link-check/1.0)'

const args = process.argv.slice(2)
const outIndex = args.indexOf('--out')
const outDir = resolve(outIndex >= 0 && args[outIndex + 1] ? args[outIndex + 1] : 'news-report')

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const today = new Date()

function isValidIsoDate(value) {
  if (!ISO_DATE.test(value ?? '')) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

// Una URL es válida si es absoluta, usa https y tiene host. Un prefijo como «https://» no basta:
// `new URL('https://')` lanza una excepción. Se valida antes de consultar nada.
export function isValidHttpsUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname !== ''
  } catch {
    return false
  }
}

function daysSince(iso) {
  return Math.floor((today - new Date(`${iso}T00:00:00Z`)) / 86400000)
}

// ---------- 1. Datos ----------
export function checkData(items = news, sources = LAW_SOURCES) {
  const errors = []
  const warnings = []
  const slugs = new Set()

  items.forEach((item, index) => {
    const at = item.slug ? `«${item.slug}»` : `publicación ${index + 1}`
    for (const field of ['slug', 'type', 'title', 'excerpt', 'relevance', 'category', 'sourceName', 'sourceUrl', 'verifiedAt']) {
      if (typeof item[field] !== 'string' || !item[field].trim()) errors.push(`${at}: falta el campo ${field}.`)
    }
    if (!Array.isArray(item.summary) || item.summary.length === 0 || item.summary.some(p => typeof p !== 'string' || !p.trim())) {
      errors.push(`${at}: summary debe ser una lista de párrafos propios.`)
    }
    if (item.slug && !SLUG.test(item.slug)) errors.push(`${at}: el slug solo admite minúsculas, números y guiones.`)
    if (slugs.has(item.slug)) errors.push(`${at}: slug repetido.`)
    slugs.add(item.slug)

    if (!['noticia', 'recurso'].includes(item.type)) errors.push(`${at}: type debe ser 'noticia' o 'recurso'.`)
    if (item.type === 'noticia') {
      if (!isValidIsoDate(item.publishedAt)) errors.push(`${at}: una noticia necesita publishedAt con fecha ISO (AAAA-MM-DD).`)
      else if (daysSince(item.publishedAt) < 0) errors.push(`${at}: publishedAt está en el futuro.`)
    }
    if (item.type === 'recurso' && item.publishedAt) warnings.push(`${at}: un recurso permanente no lleva publishedAt; se mostrará como «Recurso permanente».`)

    if (item.sourceUrl && !isValidHttpsUrl(item.sourceUrl)) errors.push(`${at}: sourceUrl no es una URL https válida: «${item.sourceUrl}».`)
    if (item.verifiedAt) {
      if (!isValidIsoDate(item.verifiedAt)) errors.push(`${at}: verifiedAt debe ser una fecha ISO (AAAA-MM-DD).`)
      else if (daysSince(item.verifiedAt) < 0) errors.push(`${at}: verifiedAt está en el futuro.`)
      else if (daysSince(item.verifiedAt) > STALE_AFTER_DAYS) warnings.push(`${at}: la última verificación manual fue hace ${daysSince(item.verifiedAt)} días.`)
    }
  })

  Object.entries(sources).forEach(([key, source]) => {
    if (!isValidHttpsUrl(source?.url)) errors.push(`LAW_SOURCES.${key}: url no es una URL https válida: «${source?.url}».`)
  })

  return { errors, warnings }
}

// ---------- 2. Enlaces ----------
export function collectLinks(items = news, sources = LAW_SOURCES) {
  const links = new Map()
  const add = (url, origin) => {
    if (!links.has(url)) links.set(url, [])
    links.get(url).push(origin)
  }
  items.forEach(item => add(String(item.sourceUrl ?? ''), `/noticias/${item.slug}`))
  Object.entries(sources).forEach(([key, source]) => add(String(source?.url ?? ''), `/ley-155-17 (${key})`))
  return [...links.entries()].map(([url, usedIn]) => ({ url, usedIn }))
}

async function request(url, method) {
  const response = await fetch(url, {
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8' },
  })
  // No se descarga el cuerpo completo: basta con el estado.
  if (response.body) await response.body.cancel().catch(() => {})
  return response
}

export function classify(status) {
  if (status >= 200 && status < 300) return 'ok'
  if (status === 403 || status === 429) return 'revision-manual'
  if (status >= 500) return 'error-servidor'
  return 'roto'
}

async function attempt(url, method) {
  try {
    return { response: await request(url, method) }
  } catch (error) {
    const detail = error.name === 'TimeoutError' ? `tiempo agotado (${TIMEOUT_MS / 1000} s)` : (error.cause?.code || error.message)
    return { response: null, error: detail }
  }
}

export async function checkLink(url) {
  const started = Date.now()
  let { response, error } = await attempt(url, 'HEAD')
  // Hay servidores que no admiten HEAD o lo rechazan: cualquier respuesta distinta de 2xx se confirma con GET.
  if (!response || classify(response.status) !== 'ok') ({ response, error } = await attempt(url, 'GET'))
  // Un 5xx o un fallo de red puede ser pasajero: un único reintento tras una pausa.
  if (!response || classify(response.status) === 'error-servidor') {
    await pause(3000)
    ;({ response, error } = await attempt(url, 'GET'))
  }

  const ms = Date.now() - started
  if (!response) return { status: null, verdict: 'sin-respuesta', detail: error, ms }
  const redirected = response.url && response.url !== url
  return {
    status: response.status,
    verdict: classify(response.status),
    finalUrl: redirected ? response.url : undefined,
    detail: redirected ? 'redirige a otra dirección' : undefined,
    ms,
  }
}

const pause = ms => new Promise(done => setTimeout(done, ms))

export async function checkLinks(links) {
  const lastHit = new Map()
  const results = []
  // De uno en uno y con pausa por dominio: nada de peticiones en ráfaga a sitios oficiales.
  for (const link of links) {
    if (!isValidHttpsUrl(link.url)) {
      // Error de datos: se registra y se sigue. No se envía ninguna petición.
      results.push({ ...link, status: null, verdict: 'url-invalida', detail: 'no es una URL https válida; no se consultó' })
      console.log(`  ${label('url-invalida').padEnd(16)} ${'—'.padEnd(4)} ${link.url || '(vacía)'}`)
      continue
    }
    const host = new URL(link.url).host
    const wait = PAUSE_SAME_HOST_MS - (Date.now() - (lastHit.get(host) ?? 0))
    if (wait > 0) await pause(wait)
    const result = await checkLink(link.url)
    lastHit.set(host, Date.now())
    results.push({ ...link, ...result })
    const code = result.status ?? '—'
    console.log(`  ${label(result.verdict).padEnd(16)} ${String(code).padEnd(4)} ${link.url}`)
  }
  return results
}

// ---------- Informe ----------
const LABELS = {
  ok: 'OK',
  'revision-manual': 'REVISIÓN MANUAL',
  roto: 'ROTO',
  'error-servidor': 'ERROR SERVIDOR',
  'sin-respuesta': 'SIN RESPUESTA',
  'url-invalida': 'URL INVÁLIDA',
}
const label = verdict => LABELS[verdict] ?? verdict

function toMarkdown(report) {
  const lines = []
  lines.push('# Verificación del Centro de Actualizaciones', '')
  lines.push(`Fecha: ${report.checkedAt}`, '')
  lines.push(`Resultado: **${report.ok ? 'sin problemas que bloqueen' : 'hay problemas que revisar'}**`, '')
  lines.push('## Datos de `src/content/news.js`', '')
  lines.push(`${report.data.items} publicaciones (${report.data.noticias} noticias, ${report.data.recursos} recursos permanentes).`, '')
  if (report.data.errors.length) lines.push('Errores:', '', ...report.data.errors.map(e => `- ${e}`), '')
  if (report.data.warnings.length) lines.push('Avisos:', '', ...report.data.warnings.map(w => `- ${w}`), '')
  if (!report.data.errors.length && !report.data.warnings.length) lines.push('Sin errores ni avisos.', '')
  lines.push('## Enlaces oficiales', '')
  lines.push('| Estado | Código | Enlace | Dónde se usa | Detalle |', '| --- | --- | --- | --- | --- |')
  report.links.forEach(link => {
    const detail = [link.detail, link.finalUrl].filter(Boolean).join(': ')
    lines.push(`| ${label(link.verdict)} | ${link.status ?? '—'} | ${link.url} | ${link.usedIn.join(', ')} | ${detail || ''} |`)
  })
  lines.push('')
  if (report.links.some(link => link.verdict === 'revision-manual')) {
    lines.push('«Revisión manual»: el sitio respondió 403 o 429 a una petición automática. Abra el enlace en un navegador; si carga, actualice `verifiedAt`.', '')
  }
  lines.push('Este informe no modifica contenido ni despliega. Las correcciones se hacen a mano siguiendo MANTENIMIENTO_NOTICIAS.md.', '')
  return lines.join('\n')
}

// Construye el informe completo. Nunca lanza por una URL mal formada: la registra como error de datos.
export async function buildReport(items = news, sources = LAW_SOURCES) {
  const data = checkData(items, sources)
  console.log(`Datos: ${items.length} publicaciones, ${data.errors.length} errores, ${data.warnings.length} avisos.`)
  data.errors.forEach(e => console.log(`  ERROR  ${e}`))
  data.warnings.forEach(w => console.log(`  AVISO  ${w}`))

  const links = collectLinks(items, sources)
  console.log(`\nEnlaces oficiales (${links.length}):`)
  const results = await checkLinks(links)

  const blocking = results.filter(link => ['roto', 'error-servidor', 'sin-respuesta', 'url-invalida'].includes(link.verdict))
  return {
    checkedAt: today.toISOString(),
    ok: data.errors.length === 0 && blocking.length === 0,
    data: {
      items: items.length,
      noticias: items.filter(item => item.type === 'noticia').length,
      recursos: items.filter(item => item.type === 'recurso').length,
      errors: data.errors,
      warnings: data.warnings,
    },
    summary: Object.fromEntries(Object.keys(LABELS).map(key => [key, results.filter(link => link.verdict === key).length])),
    links: results,
  }
}

async function main() {
  console.log('Centro de Actualizaciones: verificación de datos y enlaces\n')
  const report = await buildReport()

  await mkdir(outDir, { recursive: true })
  const markdown = toMarkdown(report)
  await writeFile(resolve(outDir, 'news-check.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8')
  await writeFile(resolve(outDir, 'news-check.md'), markdown, 'utf8')
  if (process.env.GITHUB_STEP_SUMMARY) await writeFile(process.env.GITHUB_STEP_SUMMARY, markdown, { flag: 'a' })

  const s = report.summary
  console.log(`\nResumen: ${s.ok} ok · ${s['revision-manual']} revisión manual · ${s.roto} rotos · ${s['error-servidor']} error de servidor · ${s['sin-respuesta']} sin respuesta · ${s['url-invalida']} URL inválidas`)
  console.log(`Informe: ${resolve(outDir, 'news-check.md')}`)
  if (!report.ok) {
    console.log('\nHay problemas que revisar. Nada se ha modificado.')
    process.exitCode = 1
  }
}

// Se ejecuta solo como comando; importado (por ejemplo, en una prueba) expone sus funciones sin ejecutar main.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error)
    process.exitCode = 1
  })
}
