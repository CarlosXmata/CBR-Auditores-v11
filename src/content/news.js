// Centro de Actualizaciones Profesionales.
// Criterio editorial y proceso de publicación: MANTENIMIENTO_NOTICIAS.md.
// Lo leen la web (src/pages), el SEO (src/seo.js), el prerenderizado (scripts/prerender-meta.mjs)
// y la verificación de enlaces (scripts/news-check.mjs).
//
// Campos de cada publicación:
//   slug        identificador de la URL /noticias/<slug>
//   type        'noticia' (fechada, con publishedAt) o 'recurso' (guía o canal permanente, sin fecha de publicación)
//   title       titular propio, fiel a la fuente
//   excerpt     una frase para listados y metadatos
//   summary     resumen propio (párrafos), sin copiar la fuente
//   relevance   por qué importa a las empresas
//   cbrNote     (opcional) cómo puede orientar CBR, sin prometer resultados
//   category    DGII, TSS, Fiscal, Regulatorio, Prevención LA/FT…
//   sourceName  organismo emisor
//   sourceUrl   enlace oficial a la publicación original
//   publishedAt fecha ISO de la publicación oficial (solo en 'noticia')
//   verifiedAt  fecha ISO de la última verificación manual del enlace y del contenido

export const news = [
  {
    slug: 'dgii-acompanamiento-facturacion-electronica-sin-multas',
    type: 'noticia',
    title: 'DGII mantendrá el acompañamiento para la Facturación Electrónica sin aplicar, por el momento, multas ni bloqueos',
    excerpt: 'La DGII llamó a los contribuyentes a continuar su incorporación a la Facturación Electrónica e informó que, por ahora, no aplicará multas, penalidades ni bloqueos a quienes no la completaron al 15 de noviembre.',
    seoTitle: 'Facturación electrónica: DGII no multará aún',
    seoDescription: 'La DGII pide seguir incorporándose a la Facturación Electrónica y, por ahora, no aplicará multas ni bloqueos a quien no la completó al 15 de noviembre.',
    summary: [
      'Tras el vencimiento del plazo del 15 de noviembre de 2026, la Dirección General de Impuestos Internos informó que, por el momento, no aplicará multas, penalidades ni bloqueos a los contribuyentes que aún no han completado su incorporación a la Facturación Electrónica, y que mantendrá la asistencia para que avancen.',
      'La institución precisó que la prórroga prevista en el Reglamento núm. 587-24 ya fue otorgada mediante el Aviso 06-26, por lo que no contempla una nueva prórroga general.',
    ],
    relevance: 'Las empresas que todavía no emiten comprobantes electrónicos (e-CF) siguen obligadas a completar el proceso. La ausencia temporal de sanciones es una oportunidad para terminar la adecuación técnica y administrativa, no un nuevo plazo.',
    cbrNote: 'Si su empresa tiene dudas sobre su incorporación a la Facturación Electrónica, puede consultarnos.',
    category: 'DGII',
    sourceName: 'Dirección General de Impuestos Internos (DGII)',
    sourceUrl: 'https://dgii.gov.do/noticias/Paginas/DGII-mantendra-acompa%C3%B1amiento-para-Facturacion-Electronica-sin-aplicar-momento-multas-ni-bloqueos.aspx',
    publishedAt: '2026-11-16',
    verifiedAt: '2026-11-17',
  },
  {
    slug: 'dgii-facturas-electronicas-tipo-e-grandes-locales-medianos',
    type: 'noticia',
    title: 'Desde noviembre, los contribuyentes Grandes Locales y Medianos deben emitir facturas electrónicas tipo «E»',
    excerpt: 'La DGII recordó que, a partir del 1 de noviembre de 2026, los contribuyentes Grandes Locales y Medianos deben emitir sus comprobantes fiscales exclusivamente en formato electrónico (e-CF).',
    seoTitle: 'e-CF obligatorio: Grandes Locales y Medianos',
    seoDescription: 'Desde el 1 de noviembre de 2026, los Grandes Locales y Medianos deben emitir sus comprobantes fiscales solo en formato electrónico (e-CF), recuerda la DGII.',
    summary: [
      'La Dirección General de Impuestos Internos recordó que, desde el 1 de noviembre de 2026, los contribuyentes clasificados como Grandes Locales y Medianos deben emitir sus comprobantes fiscales solo en formato electrónico, con secuencias tipo «E».',
      'Las secuencias no electrónicas tipo «B» asignadas a estos contribuyentes tuvieron validez hasta el 31 de octubre de 2026, según el artículo 55 del Reglamento núm. 587-24. Después de esa fecha, los comprobantes no electrónicos solo pueden usarse en el procedimiento de contingencia previsto en el mismo reglamento.',
    ],
    relevance: 'Afecta directamente a la facturación diaria de las empresas de estas categorías: emitir comprobantes con secuencias no válidas puede generar incumplimientos. Conviene revisar la clasificación del contribuyente y el estado de su sistema de facturación.',
    cbrNote: 'Podemos orientarle sobre las obligaciones fiscales de su empresa en este proceso.',
    category: 'DGII',
    sourceName: 'Dirección General de Impuestos Internos (DGII)',
    sourceUrl: 'https://dgii.gov.do/noticias/Paginas/DGII-reitera-emision-facturas-electronicas-tipo-E.aspx',
    publishedAt: '2026-10-26',
    verifiedAt: '2026-11-17',
  },
  {
    slug: 'seguimiento-obligaciones-tss-empleadores',
    type: 'recurso',
    title: 'Seguimiento a obligaciones de seguridad social para empleadores',
    excerpt: 'La TSS mantiene un canal oficial de noticias y actualizaciones relevantes para empleadores, aportes y cumplimiento de obligaciones laborales vinculadas al SDSS.',
    seoTitle: 'TSS: obligaciones de los empleadores',
    summary: [
      'Las obligaciones vinculadas a seguridad social requieren seguimiento oportuno, revisión de nómina y control de pagos conforme al marco aplicable.',
    ],
    relevance: 'El monitoreo de actualizaciones oficiales ayuda a prevenir atrasos, diferencias y contingencias administrativas.',
    cbrNote: 'CBR puede apoyar con revisión de registros, conciliaciones y controles relacionados con obligaciones recurrentes de la empresa.',
    category: 'TSS',
    sourceName: 'Tesorería de la Seguridad Social (TSS)',
    sourceUrl: 'https://tss.gob.do/noticias/',
    verifiedAt: '2026-11-17',
  },
  {
    slug: 'prensa-regulatoria-superintendencia-bancos-rd',
    type: 'recurso',
    title: 'Actualidad regulatoria y financiera desde fuentes oficiales',
    excerpt: 'La sección de prensa de la Superintendencia de Bancos permite dar seguimiento a publicaciones del sistema financiero, avisos, regulación y temas de interés empresarial.',
    seoTitle: 'Prensa de la Superintendencia de Bancos',
    seoDescription: 'La sección de prensa de la Superintendencia de Bancos publica avisos, regulación y temas del sistema financiero de interés para las empresas.',
    summary: [
      'El entorno financiero y regulatorio dominicano exige seguimiento constante para empresas que interactúan con entidades financieras o que requieren información de mercado.',
    ],
    relevance: 'Las actualizaciones oficiales ayudan a contextualizar decisiones de financiamiento, cumplimiento, control interno y gestión de riesgos.',
    cbrNote: 'CBR convierte estas referencias en contenido breve y útil para que sus clientes identifiquen posibles impactos en su operación.',
    category: 'Regulatorio',
    sourceName: 'Superintendencia de Bancos (SB)',
    sourceUrl: 'https://sb.gob.do/prensa/',
    verifiedAt: '2026-11-17',
  },
  {
    slug: 'ley-155-17-marco-prevencion-laft',
    type: 'recurso',
    title: 'Ley 155-17: marco de prevención de lavado de activos y financiamiento del terrorismo',
    excerpt: 'Un recurso oficial para comprender el marco legal aplicable a Sujetos Obligados y programas de cumplimiento en República Dominicana.',
    seoTitle: 'Ley 155-17: prevención del lavado de activos',
    summary: [
      'La Ley 155-17 establece el marco dominicano contra el lavado de activos y el financiamiento del terrorismo.',
      'Los Sujetos Obligados deben mantener controles proporcionales a sus riesgos y a la naturaleza de sus operaciones.',
    ],
    relevance: 'La revisión periódica del programa de cumplimiento es clave para demostrar gestión efectiva, trazabilidad y control.',
    category: 'Prevención LA/FT',
    sourceName: 'Superintendencia de Bancos (SB)',
    sourceUrl: 'https://www.sb.gob.do/regulacion/compendio-de-leyes-y-reglamentos/ley-no-155-17-lavado-de-activos-y-el-financiamiento-del-terrorismo/',
    verifiedAt: '2026-11-17',
  },
]

// Noticias fechadas, de la más reciente a la más antigua.
export const datedNews = () =>
  news.filter(item => item.type === 'noticia').sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export const resources = () => news.filter(item => item.type === 'recurso')

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

// '2026-11-16' -> '16 de noviembre de 2026' (sin depender de la zona horaria del visitante)
export function formatDate(iso) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-').map(Number)
  return `${day} de ${MONTHS[month - 1]} de ${year}`
}

// Retirada temporalmente de la publicación (no se muestra en la web; no la lee ningún componente ni script).
// Ley 30-26: el resumen anterior describía una presentación de la DGII a empresarios de Santiago cuya fuente
// no se pudo verificar. Requiere aprobación de CBR antes de volver a publicarse; si se republica, debe
// presentarse como resumen editorial de CBR, no como publicación de la DGII.
// Fuente normativa oficial verificada (texto de la ley): https://dgii.gov.do/transparencia/baseLegal/Documents/Leyes/30-26.pdf
// La antigua URL del artículo (/noticias/ley-30-26-beneficios-fiscales-formalizacion) redirige con 301 a /noticias (vercel.json).
export const pendientesDeAprobacion = [
  {
    slug: 'ley-30-26-beneficios-fiscales-formalizacion',
    category: 'Fiscal',
    title: 'Ley 30-26: facilidades fiscales, formalización y decisiones empresariales',
    sourceName: 'Dirección General de Impuestos Internos (DGII) — Texto de la Ley 30-26',
    sourceUrl: 'https://dgii.gov.do/transparencia/baseLegal/Documents/Leyes/30-26.pdf',
    estado: 'Pendiente de aprobación de CBR; resumen y fecha sin verificar contra una fuente oficial.',
  },
]
