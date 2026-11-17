// Armazón de la web: router por pathname, metadatos por ruta y estructura común.
// Contenido: src/content · Contacto: src/config/site.js · Páginas: src/pages · Piezas compartidas: src/components
import { useEffect, useRef } from 'react'
import { applyRouteMeta, getRouteMeta } from './seo.js'
import { scrollToHash, useLocation } from './components/routing.jsx'
import { Footer, Header, WhatsAppQuick } from './components/layout.jsx'
import HomePage from './pages/Home.jsx'
import ServicesPage from './pages/Services.jsx'
import AboutPage from './pages/About.jsx'
import CompliancePage from './pages/Compliance.jsx'
import { ArticlePage, NewsPage } from './pages/News.jsx'
import ContactPage from './pages/Contact.jsx'
import PrivacyPage from './pages/Privacy.jsx'
import NotFoundPage from './pages/NotFound.jsx'

export default function App() {
  const { pathname, search, hash } = useLocation()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  useEffect(() => {
    applyRouteMeta(getRouteMeta(pathname))
    if (firstRender.current) {
      firstRender.current = false
      if (hash) window.setTimeout(() => scrollToHash(hash), 120)
      return
    }
    if (!hash) mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  let page
  if (pathname === '/') page = <HomePage />
  else if (pathname === '/quienes-somos') page = <AboutPage />
  else if (pathname === '/servicios') page = <ServicesPage />
  else if (pathname === '/ley-155-17') page = <CompliancePage />
  else if (pathname === '/noticias') page = <NewsPage />
  else if (pathname.startsWith('/noticias/')) page = <ArticlePage slug={pathname.split('/').pop()} />
  else if (pathname === '/contacto') page = <ContactPage search={search} />
  else if (pathname === '/aviso-privacidad') page = <PrivacyPage />
  else page = <NotFoundPage />

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header pathname={pathname} />
      <main id="contenido" ref={mainRef} tabIndex="-1" style={{ outline: 'none' }}>{page}</main>
      <Footer />
      {pathname !== '/contacto' && <WhatsAppQuick />}
    </>
  )
}
