// Metadatos por ruta. Fuente única para la web (actualización en el navegador)
// y para scripts/prerender.mjs (HTML estático por ruta en el build).
import { news } from './content/news.js'

export const SITE_URL = 'https://www.cbrauditores.com'
export const SITE_NAME = 'CBR Auditores & Consultores'
export const OG_IMAGE = '/og-cbr.png'
export const OG_IMAGE_ALT = 'CBR Auditores & Consultores: auditoría, contabilidad, impuestos y Ley 155-17 en República Dominicana'

export const routes = {
  '/': {
    title: 'Auditoría, Contabilidad e Impuestos en RD | CBR Auditores',
    description: 'Firma dominicana de auditoría, contabilidad, impuestos y cumplimiento de la Ley 155-17. Trato directo con los socios. Solicite una consulta.',
    priority: '1.0',
  },
  '/servicios': {
    title: 'Servicios | CBR Auditores & Consultores',
    description: 'Outsourcing contable, auditoría, cumplimiento fiscal, consultoría financiera, valoración de negocios y soluciones contables en República Dominicana.',
    priority: '0.9',
  },
  '/quienes-somos': {
    title: 'Nosotros | CBR Auditores & Consultores',
    description: 'Firma de contabilidad, auditoría, impuestos y consultoría para empresas, emprendedores, profesionales y Sujetos Obligados en República Dominicana.',
    priority: '0.8',
  },
  '/ley-155-17': {
    title: 'Cumplimiento Ley 155-17 | CBR Auditores & Consultores',
    description: 'Manual de prevención, matriz de riesgos, debida diligencia y evaluación independiente para Sujetos Obligados por la Ley 155-17 en RD.',
    priority: '0.8',
  },
  '/noticias': {
    title: 'Actualizaciones DGII, TSS y Ley 155-17 | CBR Auditores',
    description: 'Información oficial de DGII, TSS, Superintendencia de Bancos y Ley 155-17, resumida con criterio empresarial y enlazada a su fuente oficial.',
    priority: '0.7',
  },
  '/contacto': {
    title: 'Contacto | CBR Auditores & Consultores',
    description: 'Solicite una consulta con CBR Auditores & Consultores por formulario, WhatsApp, teléfono o correo.',
    priority: '0.8',
  },
  '/aviso-privacidad': {
    title: 'Aviso de privacidad | CBR Auditores & Consultores',
    description: 'Uso responsable de la información recibida a través de los formularios de CBR Auditores & Consultores.',
    priority: '0.3',
  },
}

export const NOT_FOUND = {
  title: 'Página no encontrada | CBR Auditores & Consultores',
  description: routes['/'].description,
}

export function metaFor(pathname) {
  if (routes[pathname]) return { ...routes[pathname], path: pathname, indexable: true }
  if (pathname.startsWith('/noticias/')) {
    const item = news.find(entry => entry.slug === pathname.split('/').pop())
    if (item) {
      return {
        title: `${item.title} | ${SITE_NAME}`,
        description: item.excerpt,
        path: `/noticias/${item.slug}`,
        priority: '0.6',
        type: 'article',
        indexable: true,
      }
    }
  }
  return { ...NOT_FOUND, path: pathname, indexable: false }
}

export function allIndexablePaths() {
  return [...Object.keys(routes), ...news.map(item => `/noticias/${item.slug}`)]
}

export const absoluteUrl = path => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
