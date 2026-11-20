// Pruebas mínimas del verificador de noticias: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildReport, checkData, classify, isValidHttpsUrl } from './news-check.mjs'

const valid = {
  slug: 'prueba',
  type: 'recurso',
  title: 'Título',
  excerpt: 'Resumen corto.',
  summary: ['Párrafo propio.'],
  relevance: 'Importa.',
  category: 'DGII',
  sourceName: 'Organismo',
  sourceUrl: 'https://example.gov.do/ruta?x=1',
  verifiedAt: '2026-11-17',
}

test('isValidHttpsUrl acepta https absolutas y rechaza el resto', () => {
  assert.equal(isValidHttpsUrl('https://example.gov.do/a%20b.aspx'), true)
  for (const bad of ['https://', 'https://:80', 'https://exa mple.com', 'http://example.com', 'ftp://example.com', '/relativa', 'example.com', '', '   ', undefined, null, 42]) {
    assert.equal(isValidHttpsUrl(bad), false, `debería rechazar ${String(bad)}`)
  }
})

test('checkData exige título de 60 y descripción de 160 caracteres para buscadores', () => {
  const long = { ...valid, title: 'x'.repeat(50), excerpt: 'y'.repeat(161) }
  assert.equal(checkData([long], {}).errors.length, 2)
  assert.deepEqual(checkData([{ ...long, seoTitle: 'Corto', seoDescription: 'Corta.' }], {}).errors, [])
})

test('checkData registra la URL inválida como error sin lanzar excepción', () => {
  const { errors } = checkData([{ ...valid, sourceUrl: 'https://' }], { ley: { url: 'https://' } })
  assert.ok(errors.some(e => e.includes('sourceUrl no es una URL https válida')))
  assert.ok(errors.some(e => e.includes('LAW_SOURCES.ley')))
})

test('buildReport no consulta URL inválidas, no se detiene y mantiene los enlaces válidos', async () => {
  const calls = []
  const realFetch = globalThis.fetch
  globalThis.fetch = async url => {
    calls.push(String(url))
    return { status: 200, url: String(url), body: null }
  }
  try {
    const report = await buildReport(
      [{ ...valid, slug: 'mala', sourceUrl: 'https://' }, { ...valid, slug: 'buena' }],
      { ley: { url: 'https://:80' } },
    )
    assert.equal(report.ok, false)
    assert.equal(report.summary['url-invalida'], 2)
    assert.equal(report.summary.ok, 1)
    assert.deepEqual(calls, ['https://example.gov.do/ruta?x=1'])
    assert.ok(report.data.errors.length >= 2)
    // El informe es serializable (JSON) para el artefacto.
    assert.doesNotThrow(() => JSON.stringify(report))
  } finally {
    globalThis.fetch = realFetch
  }
})

test('classify: 401, 403 y 429 requieren revisión manual (no se marcan como rotos)', () => {
  for (const status of [401, 403, 429]) assert.equal(classify(status), 'revision-manual', `código ${status}`)
})

test('classify: 404 y 410 siguen siendo roto', () => {
  for (const status of [404, 410]) assert.equal(classify(status), 'roto', `código ${status}`)
})

test('classify: 2xx es ok y 5xx es error-servidor', () => {
  for (const status of [200, 204, 299]) assert.equal(classify(status), 'ok', `código ${status}`)
  for (const status of [500, 502, 503, 599]) assert.equal(classify(status), 'error-servidor', `código ${status}`)
})
