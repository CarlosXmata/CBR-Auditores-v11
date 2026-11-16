// Fuente única de metadatos SEO por ruta.
// La usan dos consumidores:
//  1) la app React (src/App.jsx), para actualizar título/etiquetas al navegar;
//  2) scripts/prerender-meta.mjs, que genera el <head> estático de cada ruta en el build
//     para que los rastreadores que no ejecutan JavaScript (WhatsApp, Facebook, LinkedIn,
//     X) vean las etiquetas correctas.
// Es JavaScript plano (sin JSX) para poder importarse también desde Node.

import { news } from './content/news.js'

export const SITE_URL = 'https://www.cbrauditores.com'
export const SITE_NAME = 'CBR Auditores & Consultores'
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`
export const OG_IMAGE_ALT = 'CBR Auditores & Consultores — Orden · Cumplimiento · Confianza'

const BRAND = 'CBR Auditores & Consultores'

// Rutas estáticas conocidas. `path` es la ruta canónica (sin barra final, salvo "/").
export const staticRoutes = [
  {
    path: '/',
    title: 'CBR Auditores & Consultores | Firma de Auditoría, Contabilidad y Consultoría en RD',
    description:
      'CBR Auditores & Consultores ofrece auditoría, contabilidad empresarial, impuestos, consultoría financiera, control interno y cumplimiento Ley 155-17 para empresas y Sujetos Obligados en República Dominicana.',
    ogTitle: 'CBR Auditores & Consultores | Auditoría, Contabilidad, Impuestos y Consultoría Financiera en RD',
    ogDescription:
      'Web corporativa de CBR Auditores & Consultores: servicios profesionales, cumplimiento Ley 155-17, noticias y contacto.',
  },
  {
    path: '/servicios',
    title: `Servicios profesionales | ${BRAND}`,
    description:
      'Outsourcing estratégico, auditoría y aseguramiento, estrategia y cumplimiento fiscal, consultoría financiera corporativa, valoración de negocios y soluciones contables especializadas para empresas en República Dominicana.',
  },
  {
    path: '/quienes-somos',
    title: `Quiénes somos | ${BRAND}`,
    description:
      'Firma especializada en contabilidad, auditoría, impuestos, finanzas y consultoría empresarial para empresas, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17.',
  },
  {
    path: '/contacto',
    title: `Contacto | ${BRAND}`,
    description:
      'Solicite una consulta con CBR Auditores & Consultores. Cuéntenos qué necesita su empresa y le orientaremos sobre el servicio más adecuado.',
  },
  {
    path: '/ley-155-17',
    title: `Cumplimiento Ley 155-17 para Sujetos Obligados | ${BRAND}`,
    description:
      'Acompañamiento en la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo (LA/FT) en República Dominicana.',
  },
  {
    path: '/noticias',
    title: `Centro de actualizaciones profesionales | ${BRAND}`,
    description:
      'Información oficial de la DGII, la TSS, la Ley 155-17 y el entorno financiero dominicano, resumida con criterio empresarial y con enlace a la fuente original.',
  },
  {
    path: '/aviso-privacidad',
    title: `Aviso de privacidad | ${BRAND}`,
    description:
      'Uso responsable de la información recibida a través de los formularios de CBR Auditores & Consultores.',
  },
]

export const notFoundRoute = {
  path: '/404',
  title: `Página no encontrada | ${BRAND}`,
  description: 'Este apartado no está disponible. Puede regresar al inicio o contactar a CBR Auditores & Consultores.',
  noindex: true,
}

export function normalizePath(pathname = '/') {
  const clean = String(pathname).split(/[?#]/)[0] || '/'
  return clean.length > 1 ? clean.replace(/\/+$/, '') || '/' : clean
}

// Fichas individuales del Centro de actualizaciones (una por noticia de src/content/news.js).
export const articleRoutes = news.map(item => ({ path: `/noticias/${item.slug}`, article: item }))

// Todas las rutas indexables, en el orden del sitemap.
export const indexableRoutes = [...staticRoutes.map(route => route.path), ...articleRoutes.map(route => route.path)]

// Devuelve los metadatos de una ruta. `article` es opcional: si no se pasa, se busca por slug en src/content/news.js.
export function getRouteMeta(pathname, article) {
  const path = normalizePath(pathname)
  const found = staticRoutes.find(route => route.path === path)
  if (found) return { ...found, canonical: SITE_URL + (path === '/' ? '/' : path) }

  const item = path.startsWith('/noticias/')
    ? article || news.find(entry => entry.slug === path.split('/').pop())
    : undefined
  if (item) {
    return {
      path,
      title: `${item.title} | ${BRAND}`,
      description: item.excerpt,
      ogType: 'article',
      canonical: SITE_URL + path,
    }
  }

  // Ruta desconocida: no se indexa y no declara canonical.
  return { ...notFoundRoute, canonical: null }
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

// Lista ordenada de etiquetas <meta>/<link> de una ruta (misma definición para build y navegador).
function tagList(meta) {
  const ogTitle = meta.ogTitle || meta.title
  const ogDescription = meta.ogDescription || meta.description
  const tags = [
    { kind: 'meta', attr: 'name', key: 'description', content: meta.description },
    { kind: 'meta', attr: 'name', key: 'robots', content: meta.noindex ? 'noindex,nofollow' : 'index,follow' },
  ]
  if (meta.canonical) tags.push({ kind: 'link', rel: 'canonical', href: meta.canonical })
  tags.push(
    { kind: 'meta', attr: 'property', key: 'og:type', content: meta.ogType || 'website' },
    { kind: 'meta', attr: 'property', key: 'og:locale', content: 'es_DO' },
    { kind: 'meta', attr: 'property', key: 'og:site_name', content: SITE_NAME },
    { kind: 'meta', attr: 'property', key: 'og:title', content: ogTitle },
    { kind: 'meta', attr: 'property', key: 'og:description', content: ogDescription },
  )
  if (meta.canonical) tags.push({ kind: 'meta', attr: 'property', key: 'og:url', content: meta.canonical })
  tags.push(
    { kind: 'meta', attr: 'property', key: 'og:image', content: OG_IMAGE_URL },
    { kind: 'meta', attr: 'property', key: 'og:image:type', content: 'image/png' },
    { kind: 'meta', attr: 'property', key: 'og:image:width', content: '1200' },
    { kind: 'meta', attr: 'property', key: 'og:image:height', content: '630' },
    { kind: 'meta', attr: 'property', key: 'og:image:alt', content: OG_IMAGE_ALT },
    { kind: 'meta', attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { kind: 'meta', attr: 'name', key: 'twitter:title', content: ogTitle },
    { kind: 'meta', attr: 'name', key: 'twitter:description', content: ogDescription },
    { kind: 'meta', attr: 'name', key: 'twitter:image', content: OG_IMAGE_URL },
    { kind: 'meta', attr: 'name', key: 'twitter:image:alt', content: OG_IMAGE_ALT },
  )
  return tags
}

// HTML del bloque SEO para el build (se inserta entre <!-- seo:start --> y <!-- seo:end -->).
export function renderHeadHtml(meta) {
  const lines = [`<title>${esc(meta.title)}</title>`]
  for (const tag of tagList(meta)) {
    if (tag.kind === 'link') lines.push(`<link rel="${tag.rel}" href="${esc(tag.href)}" />`)
    else lines.push(`<meta ${tag.attr}="${tag.key}" content="${esc(tag.content)}" />`)
  }
  return lines.join('\n    ')
}

// Actualiza el <head> del documento al navegar dentro de la app (SPA).
export function applyRouteMeta(meta, doc = document) {
  doc.title = meta.title
  const head = doc.head
  const tags = tagList(meta)

  for (const tag of tags) {
    if (tag.kind === 'link') {
      let el = head.querySelector(`link[rel="${tag.rel}"]`)
      if (!el) {
        el = doc.createElement('link')
        el.setAttribute('rel', tag.rel)
        head.appendChild(el)
      }
      el.setAttribute('href', tag.href)
    } else {
      let el = head.querySelector(`meta[${tag.attr}="${tag.key}"]`)
      if (!el) {
        el = doc.createElement('meta')
        el.setAttribute(tag.attr, tag.key)
        head.appendChild(el)
      }
      el.setAttribute('content', tag.content)
    }
  }

  // Sin canonical (ruta desconocida): retirar el que hubiera quedado de la ruta anterior.
  if (!meta.canonical) head.querySelector('link[rel="canonical"]')?.remove()
  if (!meta.canonical) head.querySelector('meta[property="og:url"]')?.remove()
}
