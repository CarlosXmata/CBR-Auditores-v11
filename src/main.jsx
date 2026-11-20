import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/manrope/wght.css'
import '@fontsource-variable/inter/wght.css'
import App from './App.jsx'
import './styles.css'

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
const root = document.getElementById('root')
// El HTML compilado ya trae la página (scripts/prerender.mjs); en `npm run dev` llega vacío.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
