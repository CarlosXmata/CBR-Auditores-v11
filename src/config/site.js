// Fuente única de los datos de contacto y de navegación de CBR.
// Cualquier cambio de teléfono, correo o redes se hace aquí y en ningún otro archivo de la interfaz.
// (index.html repite el teléfono y el correo en el JSON-LD y en <noscript>: actualizarlos a la vez.)

export const SITE_URL = 'https://www.cbrauditores.com'

export const CONTACT = {
  email: 'info.cbrauditores@gmail.com', // se mantiene hasta confirmar el correo corporativo en cbrauditores.com
  phoneDisplay: '(809) 323-4460',
  phoneHref: 'tel:+18093234460',
  whatsappNumber: '18093234460',
  instagramUrl: 'https://www.instagram.com/cbrauditores/',
  instagramHandle: '@cbrauditores',
  location: 'República Dominicana', // dirección física pendiente de confirmar por la clienta
}

export const CTA_LABEL = 'Solicitar una consulta'

export const WHATSAPP_MESSAGE = 'Hola, deseo solicitar una consulta con CBR Auditores & Consultores.'

export const whatsappHref = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`

// Menú principal aprobado: no se modifica sin autorización.
export const NAV_ITEMS = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/quienes-somos', 'Nosotros'],
  ['/contacto', 'Contacto'],
]

// Fuentes oficiales citadas en /ley-155-17. scripts/news-check.mjs también verifica estos enlaces.
export const LAW_SOURCES = {
  ley: {
    label: 'Ley núm. 155-17 (compendio de la Superintendencia de Bancos)',
    url: 'https://www.sb.gob.do/regulacion/compendio-de-leyes-y-reglamentos/ley-no-155-17-lavado-de-activos-y-el-financiamiento-del-terrorismo/',
  },
  reglamento: {
    label: 'Reglamento de aplicación de la Ley núm. 155-17 (Superintendencia de Bancos, PDF)',
    url: 'https://sb.gob.do/media/wkrboumv/reglamento-de-aplicacion-de-la-ley-no-155-17-contra-el-lavado-de-activos-el-financiamiento-del-terrorismo-y-la-proliferaci.pdf',
  },
  uaf: {
    label: 'Unidad de Análisis Financiero (UAF)',
    url: 'https://uaf.gob.do/es',
  },
}
