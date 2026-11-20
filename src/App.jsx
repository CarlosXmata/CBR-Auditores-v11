import { useEffect, useMemo, useRef, useState } from 'react'
import logo from './assets/cbr-logo.png'
import { datedNews, formatDate, news } from './content/news.js'
import { absoluteUrl, metaFor } from './seo.js'

import { ADDRESS, CONTACT_EMAIL, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from './config/site.js'

const navItems = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/quienes-somos', 'Nosotros'],
  ['/contacto', 'Contacto'],
]

const services = [
  {
    title: 'Outsourcing Estratégico',
    headline: 'Enfóquese en crecer. Nosotros nos ocupamos del resto.',
    description: 'Delegue las funciones críticas de su operación en un equipo especialista. Reducimos su carga administrativa con procesos eficientes, exactos y siempre en cumplimiento, para que su equipo invierta su energía donde realmente genera valor.',
    items: [
      'Gestión contable integral y administración del ciclo financiero',
      'Gestión de impuestos y obligaciones tributarias',
      'Dirección financiera externalizada',
    ],
    icon: 'consulting',
    number: '01',
  },
  {
    title: 'Auditoría y Aseguramiento',
    headline: 'Confianza que se construye con evidencia, no con palabras.',
    description: 'Brindamos una visión objetiva e independiente sobre la salud financiera y operativa de su organización. Identificamos riesgos, evaluamos controles y certificamos la razonabilidad de sus cifras ante inversionistas, bancos y entes reguladores.',
    items: [
      'Auditorías de estados financieros',
      'Auditoría de procesos para maximizar la eficiencia operativa',
      'Diagnóstico e implementación de sistemas de control interno',
      'Procedimientos convenidos y revisiones a la medida de la gerencia',
    ],
    icon: 'audit',
    number: '02',
  },
  {
    title: 'Estrategia y Cumplimiento Fiscal',
    headline: 'Precisión tributaria con visión estratégica.',
    description: 'Le ayudamos a navegar la complejidad del sistema tributario dominicano con precisión y visión estratégica. Prevenimos contingencias y diseñamos estructuras fiscales eficientes, siempre dentro del marco de la DGII y la normativa vigente.',
    items: [
      'Preparación y revisión minuciosa de declaraciones fiscales',
      'Planificación fiscal estratégica y preventiva',
      'Asesoría en el cumplimiento de normativas tributarias',
    ],
    icon: 'tax',
    number: '03',
  },
  {
    title: 'Consultoría Financiera Corporativa',
    headline: 'La solidez financiera no es casualidad, es estrategia.',
    description: 'Acompañamos a la Alta Dirección con análisis de fondo y estrategias de alto nivel que aseguran la liquidez, rentabilidad y estabilidad a largo plazo. Porque las mejores decisiones se toman con información clara y en el momento oportuno.',
    items: [
      'Diagnóstico, saneamiento y reestructuración financiera',
      'Proyecciones y gestión inteligente del flujo de efectivo',
      'Acompañamiento en negociaciones con entidades financieras, proveedores y acreedores',
      'Inteligencia competitiva y análisis del sector',
    ],
    icon: 'finance',
    number: '04',
  },
  {
    title: 'Estrategia y Valoración de Negocios',
    headline: 'Conozca el valor real de su empresa y actúe en consecuencia.',
    description: 'Le proveemos las herramientas analíticas para evaluar nuevas inversiones, estructurar proyectos o determinar el valor de mercado de su empresa. Transformamos datos en rutas viables que maximizan su rentabilidad.',
    items: [
      'Modelado financiero y desarrollo de planes de negocio',
      'Estudios de viabilidad para nuevos proyectos de inversión',
      'Diseño y control de presupuestos anuales',
      'Valoración corporativa de empresas, ramas o intangibles',
    ],
    icon: 'valuation',
    number: '05',
  },
  {
    title: 'Soluciones Contables Especializadas',
    headline: 'Precisión técnica donde más se necesita.',
    description: 'Atendemos los retos contables más complejos con la pericia y el rigor que cada situación exige, desde la organización inicial de una empresa hasta la regularización de periodos atrasados y la consolidación de grupos empresariales.',
    items: [
      'Reconstrucción y puesta al día de contabilidades atrasadas',
      'Diseño e implementación de catálogos de cuentas a la medida',
      'Consolidación de estados financieros para grupos empresariales',
      'Soporte técnico en transacciones complejas y cierres fiscales',
    ],
    icon: 'ledger',
    number: '06',
  },
]

const reasons = [
  'Atención personalizada',
  'Contacto directo con los profesionales',
  'Respuesta rápida',
  'Soluciones adaptadas a cada cliente',
  'Alto compromiso con la calidad',
  'Confidencialidad absoluta',
  'Experiencia en auditoría, impuestos y finanzas',
  'Asesoría especializada en cumplimiento de la Ley 155-17',
  'Acompañamiento permanente',
]

const process = [
  ['01', 'Diagnóstico inicial', 'Conocemos la realidad financiera, fiscal, contable o regulatoria de la empresa.'],
  ['02', 'Levantamiento de necesidades', 'Identificamos documentos, obligaciones, brechas, riesgos y prioridades.'],
  ['03', 'Plan de trabajo', 'Definimos alcance, tiempos, entregables y ruta de acompañamiento.'],
  ['04', 'Ejecución y seguimiento', 'Trabajamos con evidencia, comunicación, revisión y control de avances.'],
  ['05', 'Resultados y recomendaciones', 'Entregamos conclusiones claras y próximos pasos para fortalecer la gestión.'],
]


const complianceBlocks = [
  ['Manual de prevención', 'Documento base para formalizar políticas, procedimientos, responsabilidades y controles.'],
  ['Matriz de riesgos', 'Identificación, medición y seguimiento de riesgos asociados al lavado de activos y financiamiento del terrorismo.'],
  ['Debida diligencia', 'Proceso para conocer clientes, beneficiarios, operaciones y señales de alerta.'],
  ['Evaluación independiente', 'Revisión objetiva del programa de cumplimiento, hallazgos y oportunidades de mejora.'],
  ['Evidencias y controles', 'Soportes documentales que permiten demostrar gestión, revisión y seguimiento.'],
  ['Acompañamiento permanente', 'Orientación para mantener el cumplimiento actualizado y alineado a la operación.'],
]

const commitments = [
  ['Enfoque local', 'Servicios orientados al marco fiscal, laboral y regulatorio dominicano.'],
  ['Cumplimiento regulatorio', 'Acompañamiento a Sujetos Obligados y controles documentales.'],
  ['Visión integral', 'Contabilidad, auditoría, impuestos, finanzas y consultoría empresarial.'],
  ['Atención profesional', 'Comunicación clara, respuesta oportuna y acompañamiento personalizado.'],
]

const CTA_LABEL = 'Solicitar una consulta'
const LAW_SOURCE_URL = 'https://www.sb.gob.do/regulacion/compendio-de-leyes-y-reglamentos/ley-no-155-17-lavado-de-activos-y-el-financiamiento-del-terrorismo/'

// Fecha visible de una publicación: las noticias llevan su fecha oficial; los recursos, nunca una fecha inventada.
const dateLabel = item => (item.type === 'noticia' ? formatDate(item.publishedAt) : 'Recurso permanente')

const slugify = text =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const serviceHref = service => `/servicios#${slugify(service.title)}`

const practiceAreas = [
  ['Auditoría', serviceHref(services[1])],
  ['Contabilidad', serviceHref(services[5])],
  ['Impuestos', serviceHref(services[2])],
  ['Consultoría financiera', serviceHref(services[3])],
  ['Cumplimiento Ley 155-17', '/ley-155-17'],
]

/* Mantiene <head> al día en la navegación interna (el HTML prerenderizado ya lo trae en la carga inicial). */
function applyMeta(pathname) {
  const meta = metaFor(pathname)
  const url = absoluteUrl(meta.path)
  document.title = meta.title
  const set = (selector, attr, value) => {
    const el = document.head.querySelector(selector)
    if (el) el.setAttribute(attr, value)
  }
  set('meta[name="description"]', 'content', meta.description)
  set('link[rel="canonical"]', 'href', url)
  set('meta[property="og:url"]', 'content', url)
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:type"]', 'content', meta.type || 'website')
  set('meta[name="twitter:title"]', 'content', meta.title)
  set('meta[name="twitter:description"]', 'content', meta.description)
  set('meta[name="robots"]', 'content', meta.indexable ? 'index, follow' : 'noindex, follow')
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- Routing ---------- */

function scrollToHash(hash) {
  if (!hash) return
  const target = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!target) return
  const startY = window.scrollY
  target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  // Respaldo: si el navegador no ejecuta el desplazamiento suave, saltar directamente.
  window.setTimeout(() => {
    const off = Math.abs(target.getBoundingClientRect().top) > 160
    if (off && window.scrollY === startY) target.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, 450)
}

function navigate(to) {
  const url = new URL(to, window.location.origin)
  const next = url.pathname + url.hash
  const samePage = url.pathname === window.location.pathname
  if (window.location.pathname + window.location.hash !== next) {
    window.history.pushState({}, '', next)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  if (url.hash) {
    window.setTimeout(() => scrollToHash(url.hash), samePage ? 0 : 60)
  } else if (!samePage) {
    window.scrollTo({ top: 0 })
  }
}

// En el prerenderizado no hay window: la ruta llega como initialPath.
function useLocation(initialPath) {
  const read = () => ({ pathname: window.location.pathname, hash: window.location.hash })
  const [location, setLocation] = useState(() => (typeof window === 'undefined' ? { pathname: initialPath, hash: '' } : read()))
  useEffect(() => {
    const onPop = () => setLocation(read())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return location
}

function Link({ to, className, children, onClick, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
        event.preventDefault()
        onClick?.()
        navigate(to)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

/* ---------- Icons (one stroke family, 1.6px) ---------- */

const ArrowRight = () => (
  <svg className="icon icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
)
const ArrowLeft = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
)
const ArrowUpRight = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
)
const Check = () => (
  <svg className="icon icon-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
)
const MenuIcon = ({ open }) => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
  </svg>
)
const WhatsAppGlyph = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16.02 3.2A12.76 12.76 0 0 0 5.06 22.5L3.6 28.8l6.44-1.38A12.78 12.78 0 1 0 16.02 3.2Zm0 2.28a10.5 10.5 0 1 1-5.34 19.54l-.38-.22-3.6.77.82-3.5-.25-.4A10.5 10.5 0 0 1 16.02 5.48Zm-3.4 5.34c-.23-.55-.48-.56-.7-.57h-.6c-.22 0-.57.08-.87.4-.3.33-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.37.16.22 2.26 3.62 5.58 4.93 2.76 1.09 3.32.87 3.92.82.6-.06 1.94-.8 2.22-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38l-1.86-.91c-.33-.17-.57-.25-.81.24-.25.5-.93 1.21-1.14 1.46-.21.25-.42.28-.78.12-.36-.17-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.2-.36-.02-.55.15-.72.16-.16.36-.42.55-.63.18-.21.24-.36.36-.6.12-.25.06-.46-.03-.64l-.9-1.97Z" />
  </svg>
)

const InstagramGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle className="ig-dot" cx="17.2" cy="6.8" r="1.1" />
  </svg>
)

/* ---------- Ilustración: globo (decorativo, sin datos) ---------- */

function GlobeArt({ className = '' }) {
  const parallels = [-60, -30, 0, 30, 60]
  const meridians = [22, 45, 68]
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true" focusable="false">
      <circle className="g-ring" cx="120" cy="120" r="112" strokeDasharray="210 500" transform="rotate(-30 120 120)" />
      <circle className="g-ring g-ring--thin" cx="120" cy="120" r="100" strokeDasharray="120 600" transform="rotate(95 120 120)" />
      <g className="g-sphere">
        <circle className="g-disc" cx="120" cy="120" r="82" />
        {parallels.map(dy => {
          const rx = Math.sqrt(82 * 82 - dy * dy)
          return <ellipse key={dy} cx="120" cy={120 + dy} rx={rx} ry={rx * 0.16} />
        })}
        {meridians.map(rx => <ellipse key={rx} cx="120" cy="120" rx={rx} ry="82" />)}
        <path d="M120 38v164" />
      </g>
    </svg>
  )
}

/* ---------- Shell ---------- */

function Header({ pathname }) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = event => { if (event.key === 'Escape') setOpen(false) }
    const onClick = event => { if (!headerRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onClick)
    }
  }, [open])

  const current = to => (pathname === to ? 'page' : undefined)

  return (
    <header className="site-header" ref={headerRef}>
      <div className="wrap site-header__inner">
        <Link to="/" className="brand" aria-label="CBR Auditores & Consultores, ir al inicio">
          <img src={logo} alt="" width="44" height="44" />
          <span className="brand__name">
            <strong>CBR Auditores</strong>
            <span>&amp; Consultores</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Navegación principal">
          {navItems.map(([to, label]) => (
            <Link key={to} to={to} aria-current={current(to)}>{label}</Link>
          ))}
        </nav>

        <a className="header-mail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>

        <Link className="btn" to="/contacto">{CTA_LABEL}</Link>

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
            {navItems.map(([to, label]) => (
              <li key={to}><Link to={to} aria-current={current(to)}>{label}</Link></li>
            ))}
          </ul>
          <Link className="btn" to="/contacto">{CTA_LABEL}</Link>
        </div>
      </nav>
    </header>
  )
}

function PageHero({ title, lead, aside, wide = false }) {
  return (
    <section className={`page-hero ${wide ? 'page-hero--wide' : ''}`}>
      <div className="wrap page-hero__grid">
        <div className="page-hero__main">
          <h1 className="display">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
        </div>
        {aside && <div className="page-hero__aside">{aside}</div>}
      </div>
    </section>
  )
}

function Close({
  title = 'Fortalezca la gestión financiera, fiscal y regulatoria de su empresa.',
  text = 'Solicite una consulta con CBR y dé el siguiente paso hacia una operación más ordenada, segura y preparada.',
}) {
  return (
    <section className="close" aria-labelledby="close-title">
      <div className="wrap close__grid">
        <div>
          <h2 className="headline" id="close-title">{title}</h2>
        </div>
        <div>
          <p className="body">{text}</p>
          <Link className="btn" to="/contacto">{CTA_LABEL}</Link>
        </div>
      </div>
    </section>
  )
}

function Footer({ whatsappLink }) {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="brand" aria-label="CBR Auditores & Consultores, ir al inicio">
            <img src={logo} alt="" width="44" height="44" />
            <span className="brand__name">
              <strong>CBR Auditores</strong>
              <span>&amp; Consultores</span>
            </span>
          </Link>
          <p>Soluciones profesionales en contabilidad, auditoría, impuestos, finanzas, consultoría y cumplimiento Ley&nbsp;155-17.</p>
        </div>

        <div className="site-footer__cols">
          <div>
            <h2>Sitio</h2>
            <ul>
              {navItems.map(([to, label]) => <li key={to}><Link to={to}>{label}</Link></li>)}
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
              <li><a href={PHONE_TEL}>Teléfono {PHONE_DISPLAY}</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp {PHONE_DISPLAY}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram @cbrauditores</a></li>
              <li><Link to="/contacto">Formulario de contacto</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="wrap site-footer__base">
        {/* El año del HTML compilado puede quedar atrás hasta la próxima compilación. */}
        <span suppressHydrationWarning>© {new Date().getFullYear()} CBR Auditores &amp; Consultores. Todos los derechos reservados.</span>
        <Link to="/aviso-privacidad">Aviso de privacidad</Link>
      </div>
    </footer>
  )
}

function WhatsAppQuick({ whatsappLink }) {
  return (
    <div className="quick-dock">
      <a className="ig-float" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Abrir el perfil de Instagram de CBR (@cbrauditores) en una pestaña nueva">
        <InstagramGlyph />
      </a>
      <a className="wa-float" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Escribir a CBR por WhatsApp">
        <WhatsAppGlyph />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

/* ---------- Shared blocks ---------- */

function UpdateRow({ item }) {
  return (
    <li className="update">
      <p className="update__date num">{dateLabel(item)}</p>
      <p className="update__cat">{item.category}</p>
      <div className="update__main">
        <h3><Link to={`/noticias/${item.slug}`}>{item.title}</Link></h3>
        <p className="update__src">Fuente: {item.sourceName}</p>
        <div className="update__actions">
          <Link className="textlink" to={`/noticias/${item.slug}`}>Leer el resumen de CBR <ArrowRight /></Link>
          <a className="textlink" href={item.sourceUrl} target="_blank" rel="noreferrer">Consultar fuente oficial <ArrowUpRight /></a>
        </div>
      </div>
    </li>
  )
}

/* ---------- Envío protegido de formularios (FormSubmit) ---------- */

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`
const MIN_FILL_MS = 2500 // un envío más rápido que esto se trata como automatizado
const SEND_TIMEOUT_MS = 15000

// Campo trampa: invisible para personas, rellenado por bots. FormSubmit descarta los envíos con _honey.
function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label>No rellene este campo<input type="text" name="_honey" tabIndex="-1" autoComplete="off" defaultValue="" /></label>
    </div>
  )
}

function useFormGuard() {
  const mountedAt = useRef(Date.now())
  return data => {
    if (data.get('_honey')) return 'bot'
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return 'too-fast'
    return 'ok'
  }
}

async function sendForm(data) {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok || result.success === 'false' || result.success === false) throw new Error('send-failed')
  } finally {
    window.clearTimeout(timer)
  }
}

/* ---------- Pages ---------- */

function HomePage({ whatsappLink }) {
  return (
    <>
      <section className="hero">
        <GlobeArt className="hero__globe" />
        <div className="wrap hero__grid">
          <div className="hero__main">
            <p className="eyebrow">Firma consultora</p>
            <h1 className="display">Auditoría, Contabilidad, Impuestos y Consultoría Financiera</h1>
            <p className="lead">
              Ayudamos a empresas, emprendedores, profesionales independientes y Sujetos Obligados a fortalecer su gestión financiera, fiscal y regulatoria.
            </p>
            <p className="hero__sub">
              Soluciones personalizadas, oportunas y confiables para operar con seguridad, cumplir obligaciones legales y tomar mejores decisiones de negocio.
            </p>
            <div className="hero__actions">
              <Link className="btn" to="/contacto">{CTA_LABEL}</Link>
              <a className="btn btn--quiet" href={whatsappLink} target="_blank" rel="noreferrer">Escríbanos por WhatsApp</a>
            </div>
            <ul className="chips" aria-label="Marco de trabajo">
              <li>DGII</li>
              <li>TSS</li>
              <li>Sujetos Obligados</li>
            </ul>
          </div>

          <aside className="panel" aria-labelledby="panel-title">
            <div className="panel__head">
              <div>
                <p className="panel__kicker">República Dominicana</p>
                <h2 className="panel__title" id="panel-title">Áreas de práctica</h2>
              </div>
              <Link className="chip-law" to="/ley-155-17">Ley 155-17</Link>
            </div>
            <div className="panel__tiles">
              <Link className="tile" to="/servicios">
                <span>Servicios</span>
                <strong>Seis áreas</strong>
                <small>Contabilidad · Auditoría · Impuestos</small>
              </Link>
              <Link className="tile" to="/quienes-somos">
                <span>Atención</span>
                <strong>Directa</strong>
                <small>Empresas · Profesionales · Sujetos Obligados</small>
              </Link>
            </div>
            <div className="panel__art" aria-hidden="true">
              <GlobeArt className="panel__globe" />
            </div>
            <div className="panel__lists">
              <nav className="mini" aria-labelledby="areas-title">
                <h3 id="areas-title">Áreas clave</h3>
                <ul>
                  {practiceAreas.slice(0, 4).map(([label, to]) => (
                    <li key={label}><Link to={to}><Check />{label}</Link></li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </section>

      <section className="commitments" aria-label="Compromisos de la firma">
        <ul className="wrap">
          {commitments.map(([label, text]) => (
            <li key={label}>
              <h2>{label}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-label="La firma">
        <div className="wrap duo">
          <article className="duo__card">
            <p className="eyebrow">Quiénes somos</p>
            <h2 className="headline">Una firma cercana, técnica y orientada a resultados.</h2>
            <p className="body">CBR Auditores & Consultores brinda asesoría integral a empresas de todos los tamaños, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17.</p>
            <Link className="btn btn--quiet duo__action" to="/quienes-somos">Conocer la firma</Link>
          </article>
          <article className="duo__card duo__card--blue">
            <p className="eyebrow">Servicio diferencial</p>
            <h2 className="headline">Servicios profesionales con profundidad técnica.</h2>
            <p className="body">Acompañamos la operación diaria y las decisiones estratégicas con rigor, criterio y visión empresarial.</p>
            <Link className="btn btn--light duo__action" to="/servicios">Ver servicios</Link>
          </article>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="services-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="services-title">Soluciones profesionales para empresas que no se conforman.</h2>
            <p className="body">Un portafolio diseñado para acompañar la operación diaria, las decisiones estratégicas y el crecimiento con confianza.</p>
          </div>
          <ul className="service-index">
            {services.map(service => (
              <li key={service.title}>
                <Link to={serviceHref(service)}>
                  <span className="title">{service.title}</span>
                  <span className="service-index__line">{service.headline}</span>
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
          <div className="after-list">
            <Link className="textlink" to="/servicios">Ver los seis servicios en detalle <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="law-title">
        <div className="wrap band__grid">
          <div className="band__copy">
            <h2 className="headline" id="law-title">
              <span className="band__law num">Ley 155-17</span>
              Cumplimiento regulatorio para Sujetos Obligados en República Dominicana.
            </h2>
            <p className="body">Acompañamos la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo.</p>
            <Link className="textlink textlink--light" to="/ley-155-17">Conocer el enfoque de cumplimiento <ArrowRight /></Link>
          </div>
          <ul className="band__list">
            {complianceBlocks.map(([title, text]) => (
              <li key={title}>
                <Check />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="updates-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="updates-title">Noticias oficiales convertidas en información útil para empresas.</h2>
            <p className="body">Un espacio de curaduría profesional con fuentes reales sobre DGII, TSS, Ley 155-17, cumplimiento, impuestos y entorno financiero dominicano.</p>
          </div>
          <ul className="updates">
            {datedNews().slice(0, 3).map(item => <UpdateRow key={item.slug} item={item} />)}
          </ul>
          <div className="newsletter-row">
            <p>Las actualizaciones profesionales se publican en el Centro de Actualizaciones, cada una con su fecha y su fuente oficial.</p>
            <div>
              <Link className="btn btn--quiet" to="/noticias">Ver el Centro de Actualizaciones</Link>
            </div>
          </div>
        </div>
      </section>

      <Close />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero
        title="Más que asesores, somos su ventaja estratégica"
        lead="Combinamos profundidad técnica, visión empresarial y un trato personal que pocas firmas pueden ofrecer. Cada solución está diseñada para el negocio que usted dirige hoy y para el que aspira construir mañana."
        aside={
          <nav aria-labelledby="toc-title">
            <p className="label" id="toc-title">Índice de servicios</p>
            <ul className="toc">
              {services.map(service => (
                <li key={service.title}>
                  <Link to={serviceHref(service)}>{service.title}</Link>
                </li>
              ))}
            </ul>
            <p className="toc__note">Soluciones diseñadas para empresas que buscan crecer con estructura, confianza y visión.</p>
          </nav>
        }
      />

      <section className="section">
        <div className="wrap statement">
          <h2 className="headline">Soluciones de alta exigencia para empresas que no se conforman</h2>
          <p className="lead">
            Detrás de cada empresa exitosa hay información financiera confiable, decisiones bien respaldadas y asesores que realmente entienden el negocio. Nuestro portafolio está diseñado para acompañarle en cada etapa: desde la operación diaria hasta las decisiones más estratégicas.
          </p>
        </div>
      </section>

      <section className="section section--tight" aria-label="Detalle de servicios">
        <div className="wrap">
          {services.map(service => (
            <article className="service" id={slugify(service.title)} key={service.title} aria-labelledby={`${slugify(service.title)}-title`}>
              <div className="service__head">
                <h2 className="headline" id={`${slugify(service.title)}-title`}>{service.title}</h2>
                <p className="service__tagline">{service.headline}</p>
              </div>
              <div className="service__body">
                <p className="body">{service.description}</p>
                <ul className="scope">
                  {service.items.map(item => <li key={item}><Check /><span>{item}</span></li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="note-band" aria-label="Cumplimiento Ley 155-17">
        <div className="wrap">
          <p>¿Su organización es Sujeto Obligado según la Ley 155-17?</p>
          <Link className="textlink" to="/ley-155-17">Conocer el enfoque de cumplimiento <ArrowRight /></Link>
        </div>
      </aside>

      <Close
        title="¿Listo para llevar su empresa al siguiente nivel?"
        text="Conversemos sobre sus desafíos actuales. Sin compromisos, sin formalidades innecesarias. Solo una conversación honesta sobre cómo podemos ayudarle a crecer con más confianza."
      />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHero
        title="Una firma especializada en contabilidad, auditoría, impuestos, finanzas y consultoría empresarial."
        lead="Brindamos asesoría integral a empresas, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17, con ética, profesionalismo y compromiso."
        aside={
          <ul className="motto" aria-label="Principios de la firma">
            <li>Orden</li>
            <li>Cumplimiento</li>
            <li>Confianza</li>
          </ul>
        }
      />

      <section className="section">
        <div className="wrap statement">
          <h2 className="headline">Ayudamos a que las empresas operen con mayor claridad, control y seguridad.</h2>
          <div>
            <p className="body">CBR Auditores & Consultores trabaja con una visión práctica: entender la necesidad del cliente, organizar la información, evaluar los riesgos y entregar soluciones claras.</p>
            <p className="body">Nuestro acompañamiento se enfoca en fortalecer procesos financieros, mejorar controles internos, cumplir obligaciones fiscales y regulatorias, y respaldar la toma de decisiones empresariales.</p>
            <p className="pullquote">Soluciones adaptadas a la realidad de cada cliente.</p>
          </div>
        </div>
      </section>

      <section className="section section--deep" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="why-title">Un equipo cercano, confidencial y comprometido con la calidad.</h2>
            <p className="body">La relación con el cliente se gestiona con comunicación directa, criterio profesional y seguimiento oportuno.</p>
          </div>
          <ul className="checklist">
            {reasons.map(reason => <li key={reason}><Check /><span>{reason}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="method-title">Un proceso claro para entregar soluciones oportunas y confiables.</h2>
          </div>
          <ol className="steps">
            {process.map(([number, title, text]) => (
              <li key={number}>
                <span className="steps__num num" aria-hidden="true">{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Close />
    </>
  )
}

function CompliancePage() {
  return (
    <>
      <PageHero
        title="Cumplimiento regulatorio para Sujetos Obligados en República Dominicana."
        lead="Acompañamos la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo."
        aside={
          <dl className="facts">
            <div>
              <dt>Marco legal</dt>
              <dd>Ley 155-17 contra el lavado de activos y el financiamiento del terrorismo</dd>
            </div>
            <div>
              <dt>Dirigido a</dt>
              <dd>Sujetos Obligados en República Dominicana</dd>
            </div>
            <div>
              <dt>Referencia oficial</dt>
              <dd><a href={LAW_SOURCE_URL} target="_blank" rel="noreferrer">Compendio legal de la Superintendencia de Bancos</a></dd>
            </div>
          </dl>
        }
      />

      <section className="band" aria-labelledby="operative-title">
        <div className="wrap band__grid">
          <div className="band__copy">
            <h2 className="headline" id="operative-title">Del documento al control operativo.</h2>
            <p className="body">No se trata solo de tener manuales. Se trata de que la empresa pueda demostrar gestión, seguimiento, actualización y evidencia.</p>
            <Link className="textlink textlink--light" to="/contacto">{CTA_LABEL} <ArrowRight /></Link>
          </div>
          <ul className="band__list" aria-label="Marco de cumplimiento">
            {complianceBlocks.map(([title, text]) => (
              <li key={title}>
                <Check />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap statement">
          <h2 className="headline">Un enfoque alineado al entorno dominicano.</h2>
          <p className="lead">Integramos la realidad del mercado local y las necesidades de Sujetos Obligados, empresas y profesionales independientes.</p>
        </div>
      </section>

      <Close />
    </>
  )
}

function NewsPage() {
  const categories = ['Todas', ...Array.from(new Set(news.map(item => item.category)))]
  const [filter, setFilter] = useState('Todas')
  const visible = filter === 'Todas' ? news : news.filter(item => item.category === filter)

  return (
    <>
      <PageHero
        title="Información oficial, resumida con criterio empresarial."
        lead="Este espacio se alimenta con fuentes oficiales y se presenta como una guía práctica para empresas en República Dominicana: DGII, TSS, Ley 155-17, control interno, auditoría, impuestos y gestión financiera."
        aside={
          <div>
            <p className="label">Cómo leer este espacio</p>
            <p className="body notice-text">Cada actualización indica su fecha, su categoría y el enlace a la fuente oficial. Consulte siempre el texto original antes de tomar decisiones.</p>
          </div>
        }
      />

      <section className="section" aria-labelledby="refs-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="refs-title">Referencias seleccionadas para decisiones mejor informadas.</h2>
            <div>
              <p className="body">La sección no publica noticias inventadas ni copia artículos completos. Se seleccionan fuentes oficiales, se resume lo relevante y se enlaza al origen para mantener transparencia.</p>
              <p className="body">Cada resumen enlaza a su fuente oficial. CBR agrega el contexto profesional sin sustituir la lectura normativa o regulatoria completa.</p>
            </div>
          </div>
          <div className="filters" role="group" aria-label="Filtrar por categoría">
            {categories.map(category => (
              <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
          <ul className="updates" aria-live="polite">
            {visible.map(item => <UpdateRow key={item.slug} item={item} />)}
          </ul>
        </div>
      </section>

      <Close />
    </>
  )
}

function ArticlePage({ slug }) {
  const article = news.find(item => item.slug === slug)
  if (!article) return <NotFoundPage />

  return (
    <>
      <PageHero
        title={article.title}
        lead={article.excerpt}
        aside={
          <dl className="facts">
            <div><dt>Fecha</dt><dd className="num">{dateLabel(article)}</dd></div>
            <div><dt>Categoría</dt><dd>{article.category}</dd></div>
            <div><dt>Fuente</dt><dd>{article.sourceName}</dd></div>
            <div>
              <a className="btn btn--quiet" href={article.sourceUrl} target="_blank" rel="noreferrer">
                Consultar fuente oficial <ArrowUpRight />
              </a>
            </div>
          </dl>
        }
      />

      <section className="section">
        <div className="wrap">
          <div className="prose">
            {[...article.summary, article.relevance, article.cbrNote].filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="source-note">
            <h2>Lectura completa en la fuente original</h2>
            <p>Para evitar publicar noticias sin respaldo, este apartado enlaza directamente a la fuente real donde se encuentra la información.</p>
            <a className="textlink" href={article.sourceUrl} target="_blank" rel="noreferrer">Consultar fuente oficial: {article.sourceName} <ArrowUpRight /></a>
          </div>
          <div className="back-link">
            <Link className="textlink" to="/noticias"><ArrowLeft /> Volver al Centro de Actualizaciones</Link>
          </div>
        </div>
      </section>

      <Close />
    </>
  )
}

function ContactPage({ whatsappLink }) {
  const [formStatus, setFormStatus] = useState('idle')
  const [fallbackMailto, setFallbackMailto] = useState('')
  const check = useFormGuard()

  const handleSubmit = async event => {
    event.preventDefault()
    if (formStatus === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const verdict = check(data)
    if (verdict === 'bot') { form.reset(); setFormStatus('sent'); return }
    if (verdict === 'too-fast') { setFormStatus('retry'); return }
    data.append('_subject', `Solicitud web CBR - ${data.get('service')}`)
    data.append('_template', 'table')
    data.append('_captcha', 'false')

    setFormStatus('sending')

    try {
      await sendForm(data)
      form.reset()
      setFormStatus('sent')
    } catch (error) {
      const subject = encodeURIComponent(`Solicitud web CBR - ${data.get('service')}`)
      const body = encodeURIComponent(
        [
          `Nombre: ${data.get('name')}`,
          `Empresa: ${data.get('company') || 'No indicada'}`,
          `Correo: ${data.get('email')}`,
          `Teléfono: ${data.get('phone')}`,
          `Servicio de interés: ${data.get('service')}`,
          '',
          'Mensaje:',
          data.get('message') || 'Sin mensaje adicional.',
        ].join('\n')
      )
      setFallbackMailto(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`)
      setFormStatus('error')
    }
  }

  return (
    <>
      <PageHero
        wide
        title="Solicite una consulta con CBR Auditores & Consultores."
        lead="Cuéntenos qué necesita su empresa y le orientaremos sobre el servicio más adecuado."
      />

      <section className="section">
        <div className="wrap contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} aria-labelledby="form-title" noValidate={false}>
            <h2 className="visually-hidden" id="form-title">Formulario de solicitud</h2>
            <Honeypot />
            <div className="contact-form__row">
              <div className="field">
                <label htmlFor="f-name">Nombre</label>
                <input id="f-name" name="name" type="text" autoComplete="name" placeholder="Nombre y apellido" maxLength="120" required />
              </div>
              <div className="field">
                <label htmlFor="f-company">Empresa <small>(opcional)</small></label>
                <input id="f-company" name="company" type="text" autoComplete="organization" placeholder="Nombre de la empresa" maxLength="120" />
              </div>
            </div>
            <div className="contact-form__row">
              <div className="field">
                <label htmlFor="f-email">Correo electrónico</label>
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder="correo@empresa.com" maxLength="160" required />
              </div>
              <div className="field">
                <label htmlFor="f-phone">Teléfono</label>
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+1 (000) 000-0000" maxLength="30" pattern="[0-9\s\+\(\)\-\.]{7,30}" title="Indique un teléfono de al menos 7 dígitos" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-service">Servicio de interés</label>
              <select id="f-service" name="service" defaultValue="" required>
                <option value="" disabled>Seleccione un servicio</option>
                {services.map(service => <option key={service.title}>{service.title}</option>)}
                <option>Cumplimiento Ley 155-17</option>
                <option>Necesito orientación</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-message">Mensaje <small>(opcional)</small></label>
              <textarea id="f-message" name="message" rows="5" maxLength="2000" placeholder="Describa brevemente lo que necesita su empresa"></textarea>
            </div>

            {formStatus === 'error' && (
              <div className="form-alert" role="alert">
                <strong>No se pudo enviar la solicitud.</strong>
                Puede intentarlo de nuevo, <a href={whatsappLink} target="_blank" rel="noreferrer">escribirnos por WhatsApp</a> o <a href={fallbackMailto}>enviarla por correo</a> con los datos ya completados.
              </div>
            )}

            <button type="submit" className="btn btn--block" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Enviando solicitud…' : 'Enviar solicitud'}
            </button>
            <p className={`contact-form__status ${formStatus === 'sent' ? 'is-sent' : ''}`} role="status" aria-live="polite">
              {formStatus === 'sent' && 'Solicitud enviada correctamente. Nos pondremos en contacto pronto.'}
              {formStatus === 'retry' && 'Revise los datos y vuelva a pulsar «Enviar solicitud».'}
              {!['sent', 'retry'].includes(formStatus) && `El mensaje será enviado a ${CONTACT_EMAIL}.`}
            </p>
          </form>

          <aside className="channels" aria-labelledby="channels-title">
            <h2 className="headline" id="channels-title">Estamos listos para escucharle.</h2>
            <p className="body channels__intro">El primer paso es entender la necesidad, alcance y prioridad de su empresa.</p>
            <dl aria-label="Datos de contacto">
              <div>
                <dt>Teléfono y WhatsApp</dt>
                <dd><a href={PHONE_TEL}>{PHONE_DISPLAY}</a> · <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a></dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@cbrauditores</a></dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{ADDRESS}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}

function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Uso responsable de la información recibida."
        lead="La información enviada por los formularios se utiliza únicamente para responder solicitudes, coordinar reuniones o brindar información sobre nuestros servicios."
      />
      <section className="section">
        <div className="wrap statement">
          <h2 className="headline">Compromiso de confidencialidad.</h2>
          <div className="prose">
            <p>La información suministrada a través de esta web será utilizada únicamente por CBR Auditores & Consultores para responder solicitudes de contacto, coordinar reuniones o brindar información relacionada con nuestros servicios.</p>
            <p>Los datos personales enviados no serán compartidos con terceros sin autorización previa, salvo requerimiento legal aplicable.</p>
            <p>El usuario puede solicitar la actualización o eliminación de sus datos escribiendo a <a className="textlink" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <PageHero
        title="Este apartado no está disponible."
        lead="Puede regresar al inicio o contactar a CBR Auditores & Consultores."
      />
      <section className="section section--tight">
        <div className="wrap">
          <Link className="btn" to="/">Volver al inicio</Link>
        </div>
      </section>
    </>
  )
}

function App({ initialPath = '/' }) {
  const { pathname, hash } = useLocation(initialPath)
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  const whatsappLink = useMemo(() => {
    const message = 'Hola, deseo solicitar una consulta con CBR Auditores & Consultores.'
    return whatsappUrl(message)
  }, [])

  useEffect(() => {
    applyMeta(pathname)
    if (firstRender.current) {
      firstRender.current = false
      if (hash) window.setTimeout(() => scrollToHash(hash), 120)
      return
    }
    if (!hash) mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  let page
  if (pathname === '/') page = <HomePage whatsappLink={whatsappLink} />
  else if (pathname === '/quienes-somos') page = <AboutPage />
  else if (pathname === '/servicios') page = <ServicesPage />
  else if (pathname === '/ley-155-17') page = <CompliancePage />
  else if (pathname === '/noticias') page = <NewsPage />
  else if (pathname.startsWith('/noticias/')) page = <ArticlePage slug={pathname.split('/').pop()} />
  else if (pathname === '/contacto') page = <ContactPage whatsappLink={whatsappLink} />
  else if (pathname === '/aviso-privacidad') page = <PrivacyPage />
  else page = <NotFoundPage />

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header pathname={pathname} />
      <main id="contenido" ref={mainRef} tabIndex="-1" style={{ outline: 'none' }}>{page}</main>
      <Footer whatsappLink={whatsappLink} />
      {pathname !== '/contacto' && <WhatsAppQuick whatsappLink={whatsappLink} />}
    </>
  )
}

export default App
