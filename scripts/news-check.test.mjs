// Pruebas mínimas del verificador de noticias: npm test
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildReport, checkData, isValidHttpsUrl } from './news-check.mjs'

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
