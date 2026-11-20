// Entrada para el prerenderizado: dibuja una ruta a HTML en Node (sin navegador).
// La compila `vite build --ssr` y la usa scripts/prerender.mjs.
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export const render = path => renderToString(<App initialPath={path} />)
