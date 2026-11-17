// Membrete, cabeceras de página, cierre comercial, pie y accesos de contacto compartidos por todas las rutas.
import { useEffect, useRef, useState } from 'react'
import logo from '../assets/cbr-logo.png'
import { CONTACT, CTA_LABEL, NAV_ITEMS, whatsappHref } from '../config/site.js'
import { services } from '../content/services.js'
import { Link, serviceHref } from './routing.jsx'
import { ArrowUpRight, InstagramGlyph, MenuIcon, Rings, WhatsAppGlyph } from './icons.jsx'

function Brand({ inverse = false }) {
  return (
    <Link to="/" className={`brand ${inverse ? 'brand--inverse' : ''}`} aria-label="CBR Auditores & Consultores, ir al inicio">
      <span className="brand__logo"><img src={logo} alt="" width="44" height="44" /></span>
      <span className="brand__name">
        <strong>CBR Auditores</strong>
        <span>&amp; Consultores</span>
      </span>
    </Link>
  )
}

export function Header({ pathname }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return undefined
    const onKey = event => { if (event.key === 'Escape') setOpen(false) }
    const onClick = event => { if (!headerRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  const current = to => (pathname === to || (to !== '/' && pathname.startsWith(`${to}/`)) ? 'page' : undefined)

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap site-header__inner">
        <Brand />
        <nav className="nav" aria-label="Navegación principal">
          {NAV_ITEMS.map(([to, label]) => (
            <Link key={to} to={to} aria-current={current(to)}>{label}</Link>
          ))}
        </nav>
        <Link className="btn site-header__cta" to="/contacto">{CTA_LABEL}</Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(value => !value)}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <nav id="mobile-nav" className="mobile-nav" data-open={open} aria-label="Navegación principal">
        <div className="wrap">
          <ul>
            {NAV_ITEMS.map(([to, label]) => (
              <li key={to}><Link to={to} aria-current={current(to)}>{label}</Link></li>
            ))}
          </ul>
          <Link className="btn btn--block" to="/contacto">{CTA_LABEL}</Link>
        </div>
      </nav>
    </header>
  )
}

// Cabecera azul de las páginas interiores: el color corporativo abre cada módulo.
// rings={false} cuando el lateral lleva texto directamente sobre el azul (los anillos nunca cruzan texto).
export function PageHero({ title, lead, aside, children, rings = true }) {
  return (
    <section className="page-hero">
      {rings && <Rings className="page-hero__rings" />}
      <div className="wrap page-hero__grid">
        <div className="page-hero__main">
          <h1 className="display">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  )
}

// Cierre comercial en azul, con la acción principal y WhatsApp.
export function Close({
  title = 'Fortalezca la gestión financiera, fiscal y regulatoria de su empresa.',
  text = 'Solicite una consulta con CBR y dé el siguiente paso hacia una operación más ordenada, segura y preparada.',
}) {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="wrap close__grid">
        <h2 className="headline" id="close-title">{title}</h2>
        <div className="close__side">
          <p>{text}</p>
          <div className="close__actions">
            <Link className="btn btn--white" to="/contacto">{CTA_LABEL}</Link>
            <a className="textlink textlink--light" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              Escríbanos por WhatsApp <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Acceso a la cuenta oficial de Instagram (pie de página y Contacto). Nunca flotante.
export function InstagramButton({ className = '' }) {
  return (
    <a
      className={`ig-button ${className}`}
      href={CONTACT.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram de CBR Auditores & Consultores, ${CONTACT.instagramHandle} (se abre en una pestaña nueva)`}
    >
      <InstagramGlyph />
      <span>{CONTACT.instagramHandle}</span>
    </a>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Brand inverse />
          <p>Soluciones profesionales en contabilidad, auditoría, impuestos, finanzas, consultoría y cumplimiento Ley&nbsp;155-17.</p>
          <InstagramButton className="ig-button--inverse" />
        </div>

        <div className="site-footer__cols">
          <div>
            <h2>Sitio</h2>
            <ul>
              {NAV_ITEMS.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
              <li><Link to="/ley-155-17">Cumplimiento Ley 155-17</Link></li>
              <li><Link to="/noticias">Centro de Actualizaciones</Link></li>
            </ul>
          </div>
          <div>
            <h2>Servicios</h2>
            <ul>
              {services.map(service => <li key={service.title}><Link to={serviceHref(service)}>{service.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2>Contacto</h2>
            <ul>
              <li><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
              <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
              <li><Link to="/contacto">Formulario de contacto</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap site-footer__base">
        <span>© {new Date().getFullYear()} CBR Auditores &amp; Consultores. {CONTACT.location}.</span>
        <Link to="/aviso-privacidad">Aviso de privacidad</Link>
      </div>
    </footer>
  )
}

export function WhatsAppQuick() {
  return (
    <a className="wa-float" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Escribir a CBR por WhatsApp">
      <WhatsAppGlyph />
      <span>WhatsApp</span>
    </a>
  )
}
