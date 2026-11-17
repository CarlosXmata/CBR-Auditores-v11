import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { PHONE_DISPLAY, PHONE_E164 } from './src/config/site.js'

// index.html (JSON-LD y noscript) toma el teléfono de src/config/site.js.
const siteData = () => ({
  name: 'cbr-site-data',
  transformIndexHtml: html => html.replaceAll('{{PHONE_E164}}', PHONE_E164).replaceAll('{{PHONE_DISPLAY}}', PHONE_DISPLAY),
})

export default defineConfig({
  plugins: [react(), siteData()],
})
