// Centro de Actualizaciones Profesionales. Criterio editorial en MANTENIMIENTO_NOTICIAS.md.
// Este archivo lo leen la web (src/App.jsx) y el prerenderizado de metadatos (scripts/prerender.mjs).

export const news = [
  {
    slug: 'dgii-acompanamiento-facturacion-electronica',
    date: '16 de noviembre de 2026',
    category: 'DGII',
    title: 'Facturación Electrónica: la DGII mantiene el acompañamiento y, por el momento, no aplicará multas ni bloqueos',
    excerpt: 'La DGII informó que, por el momento, no aplicará multas, penalidades ni bloqueos a quienes no completaron su incorporación a la Facturación Electrónica al 15 de noviembre, y que seguirá asistiendo a los contribuyentes.',
    sourceLabel: 'DGII — Acompañamiento para Facturación Electrónica (publicado el 16/11/2026)',
    sourceUrl: 'https://dgii.gov.do/noticias/Paginas/DGII-mantendra-acompa%C3%B1amiento-para-Facturacion-Electronica-sin-aplicar-momento-multas-ni-bloqueos.aspx',
    body: [
      'Según la DGII, su actuación se centra en orientar, asistir y acompañar a los contribuyentes en la incorporación a la Facturación Electrónica, y los exhortó a continuar el proceso por sus canales oficiales de atención.',
      'La institución indicó que la prórroga prevista en el reglamento ya fue otorgada mediante el Aviso 06-26 y que una nueva prórroga general no tendría sustento reglamentario. Aclaró que esto no se traduce, por el momento, en multas, penalidades ni bloqueos.',
      'Este resumen es de CBR y no sustituye la lectura del texto oficial. Las empresas deben verificar su situación particular con asesoría profesional; CBR puede acompañar la revisión de su estado de incorporación, sus procesos de facturación y sus controles internos.'
    ],
  },
  {
    slug: 'seguimiento-obligaciones-tss-empleadores',
    date: 'Actualización permanente',
    category: 'TSS',
    title: 'Seguimiento a obligaciones de seguridad social para empleadores',
    excerpt: 'La TSS mantiene un canal oficial de noticias y actualizaciones relevantes para empleadores, aportes y cumplimiento de obligaciones laborales vinculadas al SDSS.',
    sourceLabel: 'TSS — Noticias oficiales',
    sourceUrl: 'https://tss.gob.do/noticias/',
    body: [
      'Las obligaciones vinculadas a seguridad social requieren seguimiento oportuno, revisión de nómina y control de pagos conforme al marco aplicable.',
      'El monitoreo de actualizaciones oficiales ayuda a prevenir atrasos, diferencias y contingencias administrativas.',
      'CBR puede apoyar con revisión de registros, conciliaciones y controles relacionados con obligaciones recurrentes de la empresa.'
    ],
  },
  {
    slug: 'prensa-regulatoria-superintendencia-bancos-rd',
    date: 'Actualización permanente',
    category: 'Regulatorio',
    title: 'Actualidad regulatoria y financiera desde fuentes oficiales',
    excerpt: 'La sección de prensa de la Superintendencia de Bancos permite dar seguimiento a publicaciones del sistema financiero, avisos, regulación y temas de interés empresarial.',
    sourceLabel: 'Superintendencia de Bancos — Prensa oficial',
    sourceUrl: 'https://sb.gob.do/prensa/',
    body: [
      'El entorno financiero y regulatorio dominicano exige seguimiento constante para empresas que interactúan con entidades financieras o que requieren información de mercado.',
      'Las actualizaciones oficiales ayudan a contextualizar decisiones de financiamiento, cumplimiento, control interno y gestión de riesgos.',
      'CBR convierte estas referencias en contenido breve y útil para que sus clientes identifiquen posibles impactos en su operación.'
    ],
  },
  {
    slug: 'ley-155-17-marco-prevencion-laft',
    date: 'Consulta permanente',
    category: 'Prevención LA/FT',
    title: 'Ley 155-17: marco de prevención de lavado de activos y financiamiento del terrorismo',
    excerpt: 'Un recurso oficial para comprender el marco legal aplicable a Sujetos Obligados y programas de cumplimiento en República Dominicana.',
    sourceLabel: 'Superintendencia de Bancos — Compendio legal',
    sourceUrl: 'https://www.sb.gob.do/regulacion/compendio-de-leyes-y-reglamentos/ley-no-155-17-lavado-de-activos-y-el-financiamiento-del-terrorismo/',
    body: [
      'La Ley 155-17 establece el marco dominicano contra el lavado de activos y el financiamiento del terrorismo.',
      'Los Sujetos Obligados deben mantener controles proporcionales a sus riesgos y a la naturaleza de sus operaciones.',
      'La revisión periódica del programa de cumplimiento es clave para demostrar gestión efectiva, trazabilidad y control.'
    ],
  },
]

// Retirada temporalmente de la publicación (no se muestra en la web; no la lee ningún componente).
// Ley 30-26: el resumen original describía una presentación de la DGII a empresarios de Santiago cuya fuente
// no se pudo verificar (la página devolvía 401). Requiere aprobación de CBR antes de volver a publicarse.
// La fuente normativa oficial verificada es el texto de la ley:
// https://dgii.gov.do/transparencia/baseLegal/Documents/Leyes/30-26.pdf
// Si se republica, debe presentarse como resumen editorial de CBR, no como publicación de la DGII.
export const pendientesDeAprobacion = [
  {
    slug: 'ley-30-26-beneficios-fiscales-formalizacion',
    category: 'Fiscal',
    title: 'Ley 30-26: facilidades fiscales, formalización y decisiones empresariales',
    sourceLabel: 'DGII — Texto de la Ley 30-26',
    sourceUrl: 'https://dgii.gov.do/transparencia/baseLegal/Documents/Leyes/30-26.pdf',
    estado: 'Pendiente de aprobación de CBR; fecha y resumen sin verificar contra una fuente oficial.',
  },
]
