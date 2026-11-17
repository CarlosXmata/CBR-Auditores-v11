// Datos de contacto de CBR: única fuente de verdad. Cualquier cambio de teléfono, correo o
// WhatsApp se hace aquí; la interfaz, index.html (vía vite.config.js) y los enlaces lo leen de este archivo.

export const CONTACT_EMAIL = 'info.cbrauditores@gmail.com'

export const PHONE_DISPLAY = '+1 (849) 254-4460'
export const PHONE_TEL = 'tel:+18492544460'
export const PHONE_E164 = '+18492544460'

const WHATSAPP_NUMBER = '18492544460'
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`
export const whatsappUrl = message => (message ? `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}` : WHATSAPP_BASE)

export const INSTAGRAM_URL = 'https://www.instagram.com/cbrauditores/'
export const ADDRESS = 'República Dominicana'

// Fuentes oficiales de la Ley 155-17. scripts/news-check.mjs también verifica estos enlaces.
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
