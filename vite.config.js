import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CONTACT_EMAIL, PHONE_DISPLAY, PHONE_E164 } from './src/config/site.js'

// index.html (JSON-LD y noscript) toma el teléfono y el correo de src/config/site.js.
const siteData = () => ({
  name: 'cbr-site-data',
  transformIndexHtml: html => html.replaceAll('{{PHONE_E164}}', PHONE_E164).replaceAll('{{PHONE_DISPLAY}}', PHONE_DISPLAY).replaceAll('{{CONTACT_EMAIL}}', CONTACT_EMAIL),
})

export default defineConfig({
  plugins: [react(), siteData()],
})
