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
