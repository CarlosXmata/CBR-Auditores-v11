
import { useEffect, useMemo, useState } from 'react'
import logo from './assets/cbr-logo.png'

const CONTACT_EMAIL = 'info.cbrauditores@gmail.com'
const CONTACT_PHONE = '(809) 323-4460'
const WHATSAPP_NUMBER = '18093234460'
const ADDRESS = 'República Dominicana'
const INSTAGRAM_URL = 'https://www.instagram.com/cbrauditores/'

const navItems = [
  ['/', 'Inicio'],
  ['/servicios', 'Servicios'],
  ['/quienes-somos', 'Nosotros'],
  ['/contacto', 'Contacto'],
]

const services = [
  {
    title: 'Outsourcing Estratégico',
    headline: 'Enfócate en crecer. Nosotros nos ocupamos del resto.',
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

const news = [
  {
    slug: 'modernizacion-tributaria-dgii-industria-rd',
    date: '23 de julio de 2026',
    category: 'DGII',
    title: 'Modernización tributaria y digitalización de servicios para empresas dominicanas',
    excerpt: 'La DGII presentó ante el sector industrial su hoja de ruta de simplificación, digitalización y fortalecimiento de servicios tributarios.',
    sourceLabel: 'DGII — Hoja de ruta de modernización tributaria',
    sourceUrl: 'https://dgii.gov.do/noticias/Paginas/DGII-presenta-ante-industria-dominicana-hoja-ruta-modernizacion-tributaria.aspx',
    body: [
      'La DGII presentó una agenda enfocada en simplificación de procesos, digitalización de servicios y fortalecimiento de la relación con los contribuyentes.',
      'Para las empresas, este tipo de actualización confirma la importancia de revisar sus procesos fiscales, documentales y tecnológicos de forma preventiva.',
      'CBR puede acompañar la revisión de obligaciones, evidencias, controles internos y preparación operativa ante cambios en el entorno tributario.'
    ],
  },
  {
    slug: 'ley-30-26-beneficios-fiscales-formalizacion',
    date: '16 de julio de 2026',
    category: 'Fiscal',
    title: 'Ley 30-26: facilidades fiscales, formalización y decisiones empresariales',
    excerpt: 'La DGII presentó a empresarios de Santiago beneficios y facilidades de la Ley 30-26, vinculadas a cumplimiento, inversión y formalización.',
    sourceLabel: 'DGII — Ley 30-26 y formalización',
    sourceUrl: 'https://dgii.gov.do/noticias/Paginas/Director-DGII-presenta-empresarios-Santiago-beneficios-Ley-30-26.aspx',
    body: [
      'La Ley 30-26 fue presentada como un instrumento orientado a facilitar el cumplimiento de obligaciones fiscales y promover la formalización empresarial.',
      'Las empresas deben analizar con criterio profesional cualquier facilidad, beneficio o ajuste fiscal antes de tomar decisiones financieras o tributarias.',
      'CBR acompaña la evaluación de escenarios fiscales, organización documental y toma de decisiones con impacto financiero.'
    ],
  },
  {
    slug: 'seguimiento-obligaciones-tss-empleadores',
    date: 'Actualización permanente',
    category: 'TSS',
    title: 'Seguimiento a obligaciones de seguridad social para empleadores',
    excerpt: 'La TSS mantiene un canal oficial de noticias y actualizaciones relevantes para empleadores, aportes y cumplimiento de obligaciones laborales vinculadas al SDSS.',
    sourceLabel: 'TSS — Noticias oficiales',
    sourceUrl: 'https://tss.gob.do/noticias/',
    body: [
      'Las obligaciones vinculadas a seguridad social requieren seguimiento oportuno, revisión de nómina y control de pagos conforme al marco aplicable.',
      'El monitoreo de actualizaciones oficiales ayuda a prevenir atrasos, diferencias y contingencias administrativas.',
      'CBR puede apoyar con revisión de registros, conciliaciones y controles relacionados con obligaciones recurrentes de la empresa.'
    ],
  },
  {
    slug: 'prensa-regulatoria-superintendencia-bancos-rd',
    date: 'Actualización permanente',
    category: 'Regulatorio',
    title: 'Actualidad regulatoria y financiera desde fuentes oficiales',
    excerpt: 'La sección de prensa de la Superintendencia de Bancos permite dar seguimiento a publicaciones del sistema financiero, avisos, regulación y temas de interés empresarial.',
    sourceLabel: 'Superintendencia de Bancos — Prensa oficial',
    sourceUrl: 'https://sb.gob.do/prensa/',
    body: [
      'El entorno financiero y regulatorio dominicano exige seguimiento constante para empresas que interactúan con entidades financieras o que requieren información de mercado.',
      'Las actualizaciones oficiales ayudan a contextualizar decisiones de financiamiento, cumplimiento, control interno y gestión de riesgos.',
      'CBR convierte estas referencias en contenido breve y útil para que sus clientes identifiquen posibles impactos en su operación.'
    ],
  },
  {
    slug: 'ley-155-17-marco-prevencion-laft',
    date: 'Consulta permanente',
    category: 'Prevención LA/FT',
    title: 'Ley 155-17: marco de prevención de lavado de activos y financiamiento del terrorismo',
    excerpt: 'Un recurso oficial para comprender el marco legal aplicable a Sujetos Obligados y programas de cumplimiento en República Dominicana.',
    sourceLabel: 'Superintendencia de Bancos — Compendio legal',
    sourceUrl: 'https://www.sb.gob.do/regulacion/compendio-de-leyes-y-reglamentos/ley-no-155-17-lavado-de-activos-y-el-financiamiento-del-terrorismo/',
    body: [
      'La Ley 155-17 establece el marco dominicano contra el lavado de activos y el financiamiento del terrorismo.',
      'Los Sujetos Obligados deben mantener controles proporcionales a sus riesgos y a la naturaleza de sus operaciones.',
      'La revisión periódica del programa de cumplimiento es clave para demostrar gestión efectiva, trazabilidad y control.'
    ],
  },
]

const newsMaintenance = [
  ['Fuentes oficiales', 'DGII, TSS, Superintendencia de Bancos, Ministerio de Trabajo y organismos reguladores vinculados al entorno empresarial.'],
  ['Curaduría profesional', 'No se copia contenido completo. Se publica un resumen breve, útil y orientado al impacto para empresas.'],
  ['Frecuencia sugerida', 'Actualizar de 2 a 4 veces al mes, priorizando avisos, normas, cambios fiscales, seguridad social y cumplimiento.'],
  ['Trazabilidad', 'Cada publicación conserva enlace directo a la fuente oficial para reforzar confianza y evitar información sin respaldo.'],
]

const keywords = ['DGII', 'TSS', 'Ministerio de Trabajo', 'Ley 155-17', 'Sujetos Obligados', 'Gobierno Corporativo', 'Control Interno']

function navigate(path) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function usePathname() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function useReveal(pathname) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])
}

function Link({ to, className, children, onClick, ...props }) {
  return (
    <a
      href={to}
      className={className}
      onClick={event => {
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

function Icon({ type }) {
  const base = { viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', className: 'iconSvg' }
  const s = { stroke: 'currentColor', strokeWidth: '1.8', strokeLinecap: 'round', strokeLinejoin: 'round' }

  if (type === 'ledger') return <svg {...base}><path {...s} d="M7 4h10a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2Z"/><path {...s} d="M9 8h6M9 12h6M9 16h4"/></svg>
  if (type === 'audit') return <svg {...base}><circle {...s} cx="10.5" cy="10.5" r="5.5"/><path {...s} d="M15 15l5 5M8.2 10.6l1.6 1.6 3.3-3.5"/></svg>
  if (type === 'tax') return <svg {...base}><path {...s} d="M7 3h7l4 4v14H7V3Z"/><path {...s} d="M14 3v5h5M10 13h4M10 17h4"/><path {...s} d="M4 9h3M4 13h3"/></svg>
  if (type === 'finance') return <svg {...base}><path {...s} d="M4 19V5M4 19h16"/><path {...s} d="M8 15v-4M12 15V8M16 15v-7"/><path {...s} d="M7 8l4 2 5-5"/></svg>
  if (type === 'consulting') return <svg {...base}><path {...s} d="M5 18V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v11"/><path {...s} d="M3 18h18M8 10h8M8 14h5"/></svg>
  if (type === 'valuation') return <svg {...base}><path {...s} d="M4 18h16M6 15l4-4 3 3 5-7"/><path {...s} d="M17 7h2v2M8 19V9M12 19v-5M16 19v-8"/></svg>
  return <svg {...base}><path {...s} d="M12 3l7 3v5c0 4.7-2.8 8.7-7 10-4.2-1.3-7-5.3-7-10V6l7-3Z"/><path {...s} d="M9 12.5l2 2 4.6-5"/></svg>
}

function Header({ pathname }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`siteHeader ${scrolled ? 'compact' : ''}`}>
      <div className="container nav">
        <Link to="/" className="brandWrap" aria-label="Inicio CBR Auditores & Consultores">
          <img src={logo} alt="CBR Auditores & Consultores" className="brandLogo" />
          <div className="brandText">
            <strong>CBR Auditores</strong>
            <small>& Consultores</small>
          </div>
        </Link>

        <nav className="desktopNav" aria-label="Navegación principal">
          {navItems.map(([to, label]) => (
            <Link key={to} to={to} className={pathname === to ? 'active' : ''}>{label}</Link>
          ))}
        </nav>

        <div className="headerActions">
          <a className="headerEmail" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <Link className="navBtn" to="/contacto">Agendar consulta</Link>
          <button className="menuBtn" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobileNav">
          {navItems.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={pathname === to ? 'active' : ''}>{label}</Link>
          ))}
        </nav>
      )}
    </header>
  )
}

function SectionHero({ eyebrow, title, text, children }) {
  return (
    <section className="pageHero">
      <div className="pageLogoMark"><img src={logo} alt="" /></div>
      <div className="container pageHeroGrid reveal">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        {children && <div className="pageHeroSide">{children}</div>}
      </div>
    </section>
  )
}

function HomePage({ whatsappLink }) {
  return (
    <>
      <section className="heroSection">
        <div className="heroGridPattern"></div>
        <div className="heroHalo"></div>
        <div className="heroLogoWatermark"><img src={logo} alt="" aria-hidden="true" /></div>

        <div className="container heroLayout">
          <div className="heroCopy reveal">
            <p className="eyebrow">Firma consultora para empresas en República Dominicana</p>
            <h1>Auditoría, Contabilidad, Impuestos y Consultoría Financiera para empresas en RD</h1>
            <p className="heroLead">
              Ayudamos a empresas, emprendedores, profesionales independientes y Sujetos Obligados a fortalecer su gestión financiera, fiscal y regulatoria.
            </p>
            <p className="heroSublead">
              Soluciones personalizadas, oportunas y confiables para operar con seguridad, cumplir obligaciones legales y tomar mejores decisiones de negocio.
            </p>

            <div className="heroActions">
              <Link className="btn primary" to="/contacto">Solicitar una consulta</Link>
              <a className="btn secondary" href={whatsappLink} target="_blank" rel="noreferrer">Contáctanos por WhatsApp</a>
            </div>

            <div className="heroChips">
              {keywords.slice(0, 5).map(item => <span key={item}>{item}</span>)}
            </div>
          </div>

          <div className="heroVisual reveal">
            <div className="executivePanel">
              <div className="panelTop">
                <div>
                  <small>República Dominicana</small>
                  <strong>Panel de control financiero y regulatorio</strong>
                </div>
                <span>Ley 155-17</span>
              </div>

              <div className="panelMetrics">
                <article>
                  <small>Servicios</small>
                  <strong>360°</strong>
                  <p>Contabilidad · Auditoría · Impuestos</p>
                </article>
                <article>
                  <small>Clientes</small>
                  <strong>B2B</strong>
                  <p>Empresas · Profesionales · Sujetos Obligados</p>
                </article>
              </div>

              <div className="reportMock">
                <div className="reportHeader">
                  <strong>Resumen fiscal y de cumplimiento</strong>
                  <span>Validado</span>
                </div>
                <div className="chartStage">
                  <i className="lineA"></i>
                  <i className="lineB"></i>
                  <i className="lineC"></i>
                </div>
              </div>

              <div className="panelChecklist">
                <div>
                  <strong>Áreas clave</strong>
                  <p><span>✓</span> DGII</p>
                  <p><span>✓</span> TSS</p>
                  <p><span>✓</span> Ministerio de Trabajo</p>
                </div>
                <div>
                  <strong>Cumplimiento</strong>
                  <p><span>✓</span> Sujetos Obligados</p>
                  <p><span>✓</span> Control Interno</p>
                  <p><span>✓</span> Gobierno Corporativo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TrustStrip />
      <section className="section introBlocks">
        <div className="container introGrid">
          <article className="introCard reveal">
            <p className="eyebrow">Quiénes somos</p>
            <h2>Una firma cercana, técnica y orientada a resultados.</h2>
            <p>CBR Auditores & Consultores brinda asesoría integral a empresas de todos los tamaños, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17.</p>
            <Link className="sectionCta" to="/quienes-somos">Conocer la firma</Link>
          </article>
          <article className="introCard dark reveal">
            <p className="eyebrow light">Servicio diferencial</p>
            <h2>Servicios profesionales con profundidad técnica.</h2>
            <p>Acompañamos la operación diaria y las decisiones estratégicas con rigor, criterio y visión empresarial.</p>
            <Link className="btn white" to="/servicios">Ver servicios</Link>
          </article>
        </div>
      </section>
      <ServicesPreview />
      <NewsPreview />
      <FinalCTA />
    </>
  )
}

function TrustStrip() {
  const items = [
    ['RD', 'Enfoque local', 'Servicios orientados al marco fiscal, laboral y regulatorio dominicano.'],
    ['155-17', 'Cumplimiento regulatorio', 'Acompañamiento a Sujetos Obligados y controles documentales.'],
    ['360°', 'Visión integral', 'Contabilidad, auditoría, impuestos, finanzas y consultoría empresarial.'],
    ['Directo', 'Atención profesional', 'Comunicación clara, respuesta oportuna y acompañamiento personalizado.'],
  ]
  return (
    <section className="trustSection">
      <div className="container trustGrid">
        {items.map(([value, label, text], index) => (
          <article className="reveal" style={{ transitionDelay: `${index * 70}ms` }} key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview() {
  return (
    <section className="section servicesSection">
      <div className="container">
        <div className="sectionHeader centered reveal">
          <p className="eyebrow">Servicios</p>
          <h2>Soluciones profesionales para empresas que no se conforman.</h2>
          <p>Un portafolio diseñado para acompañar la operación diaria, las decisiones estratégicas y el crecimiento con confianza.</p>
        </div>
        <div className="servicesGrid preview">
          {services.slice(0, 6).map((service, index) => (
            <ServiceCard key={service.title} service={service} delay={index * 50} />
          ))}
        </div>
        <div className="centerCta reveal">
          <Link className="btn primary" to="/servicios">Ver todos los servicios</Link>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, delay = 0 }) {
  return (
    <article className="serviceCard reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="serviceNumber">{service.number}</div>
      <div className="serviceIcon"><Icon type={service.icon} /></div>
      <h3>{service.title}</h3>
      <h4>{service.headline}</h4>
      <p>{service.description}</p>
      <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
    </article>
  )
}

function AboutPage() {
  return (
    <>
      <SectionHero
        eyebrow="Quiénes somos"
        title="Una firma especializada en contabilidad, auditoría, impuestos, finanzas y consultoría empresarial."
        text="Brindamos asesoría integral a empresas, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17, con ética, profesionalismo y compromiso."
      >
        <div className="heroCredential">
          <img src={logo} alt="" />
          <strong>CBR Auditores & Consultores</strong>
          <span>Orden · Cumplimiento · Confianza</span>
        </div>
      </SectionHero>

      <section className="section aboutSection">
        <div className="container aboutPanel reveal">
          <div className="aboutIntro">
            <p className="eyebrow">Nuestra propuesta</p>
            <h2>Ayudamos a que las empresas operen con mayor claridad, control y seguridad.</h2>
            <Link className="sectionCta" to="/contacto">Solicite una consulta</Link>
          </div>
          <div className="aboutCopy">
            <p>CBR Auditores & Consultores trabaja con una visión práctica: entender la necesidad del cliente, organizar la información, evaluar los riesgos y entregar soluciones claras.</p>
            <p>Nuestro acompañamiento se enfoca en fortalecer procesos financieros, mejorar controles internos, cumplir obligaciones fiscales y regulatorias, y respaldar la toma de decisiones empresariales.</p>
            <div className="aboutSignature">
              <img src={logo} alt="" aria-hidden="true" />
              <span>Soluciones adaptadas a la realidad de cada cliente.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section whySection">
        <div className="container whyGrid">
          <div className="whyCopy reveal">
            <p className="eyebrow">Por qué elegirnos</p>
            <h2>Un equipo cercano, confidencial y comprometido con la calidad.</h2>
            <p>La relación con el cliente se gestiona con comunicación directa, criterio profesional y seguimiento oportuno.</p>
          </div>
          <div className="reasonGrid">
            {reasons.map((reason, index) => (
              <article className="reveal" style={{ transitionDelay: `${index * 45}ms` }} key={reason}>
                <span>✓</span>
                <p>{reason}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Methodology />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <SectionHero
        eyebrow="Servicios profesionales"
        title="Más que asesores, somos su ventaja estratégica"
        text="Combinamos profundidad técnica, visión empresarial y un trato personal que pocas firmas pueden ofrecer. Cada solución está diseñada para el negocio que usted dirige hoy y para el que aspira construir mañana."
      >
        <div className="serviceHeroCard">
          <span>Portafolio CBR</span>
          <strong>6 líneas estratégicas</strong>
          <p>Soluciones diseñadas para empresas que buscan crecer con estructura, confianza y visión.</p>
        </div>
      </SectionHero>

      <section className="section valueProposition">
        <div className="container valuePanel reveal">
          <div>
            <p className="eyebrow">Nuestra propuesta de valor</p>
            <h2>Soluciones de alta exigencia para empresas que no se conforman</h2>
          </div>
          <p>
            Detrás de cada empresa exitosa hay información financiera confiable, decisiones bien respaldadas y asesores que realmente entienden el negocio. Nuestro portafolio está diseñado para acompañarle en cada etapa: desde la operación diaria hasta las decisiones más estratégicas.
          </p>
        </div>
      </section>

      <section className="section servicesSection editorialServices">
        <div className="container">
          <div className="servicesGrid editorial">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} delay={index * 50} />
            ))}
          </div>
        </div>
      </section>

      <section className="finalCta">
        <div className="container finalPanel reveal">
          <div>
            <p className="eyebrow light">Demos el primer paso</p>
            <h2>¿Listo para llevar su empresa al siguiente nivel?</h2>
            <p>
              Conversemos sobre sus desafíos actuales. Sin compromisos, sin formalidades innecesarias. Solo una conversación honesta sobre cómo podemos ayudarle a crecer con más confianza.
            </p>
          </div>
          <Link className="btn white" to="/contacto">Agendar conversación</Link>
        </div>
      </section>
    </>
  )
}

function CompliancePage() {
  const blocks = [
    ['Manual de prevención', 'Documento base para formalizar políticas, procedimientos, responsabilidades y controles.'],
    ['Matriz de riesgos', 'Identificación, medición y seguimiento de riesgos asociados al lavado de activos y financiamiento del terrorismo.'],
    ['Debida diligencia', 'Proceso para conocer clientes, beneficiarios, operaciones y señales de alerta.'],
    ['Evaluación independiente', 'Revisión objetiva del programa de cumplimiento, hallazgos y oportunidades de mejora.'],
    ['Evidencias y controles', 'Soportes documentales que permiten demostrar gestión, revisión y seguimiento.'],
    ['Acompañamiento permanente', 'Orientación para mantener el cumplimiento actualizado y alineado a la operación.'],
  ]

  return (
    <>
      <SectionHero
        eyebrow="Ley 155-17"
        title="Cumplimiento regulatorio para Sujetos Obligados en República Dominicana."
        text="Acompañamos la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo."
      >
        <div className="lawBadge">
          <strong>155-17</strong>
          <span>Prevención LA/FT</span>
        </div>
      </SectionHero>

      <section className="section complianceSection standalone">
        <div className="container complianceGrid">
          <div className="complianceCopy reveal">
            <p className="eyebrow light">Enfoque especializado</p>
            <h2>Del documento al control operativo.</h2>
            <p>No se trata solo de tener manuales. Se trata de que la empresa pueda demostrar gestión, seguimiento, actualización y evidencia.</p>
            <Link className="btn white" to="/contacto">Agende una reunión</Link>
          </div>

          <div className="complianceBoard reveal">
            <div className="boardHeader">
              <strong>Marco de cumplimiento</strong>
              <span>Ley 155-17</span>
            </div>
            <div className="boardCards">
              {blocks.map(([title, text]) => (
                <article key={title}>
                  <b>✓</b>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section dominicanSection">
        <div className="container dominicanPanel reveal">
          <div>
            <p className="eyebrow">Contexto local</p>
            <h2>Un enfoque alineado al entorno dominicano.</h2>
            <p>Integramos la realidad del mercado local y las necesidades de Sujetos Obligados, empresas y profesionales independientes.</p>
          </div>
          <div className="keywordCloud">
            {keywords.map(keyword => <span key={keyword}>{keyword}</span>)}
          </div>
        </div>
      </section>
    </>
  )
}

function Methodology() {
  return (
    <section className="section methodologySection">
      <div className="container">
        <div className="sectionHeader centered reveal">
          <p className="eyebrow">Metodología de trabajo</p>
          <h2>Un proceso claro para entregar soluciones oportunas y confiables.</h2>
        </div>
        <div className="timeline">
          {process.map(([number, title, text], index) => (
            <article className="reveal" style={{ transitionDelay: `${index * 60}ms` }} key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsPreview() {
  return (
    <section className="section newsSection">
      <div className="container">
        <div className="newsHeader reveal">
          <div className="newsHeaderCopy">
            <p className="eyebrow">Centro de actualizaciones profesionales</p>
            <h2>Noticias oficiales convertidas en información útil para empresas.</h2>
            <p>Un espacio de curaduría profesional con fuentes reales sobre DGII, TSS, Ley 155-17, cumplimiento, impuestos y entorno financiero dominicano.</p>
          </div>
          <Newsletter compact />
        </div>
        <div className="newsGrid">
          {news.slice(0, 3).map((item, index) => (
            <NewsCard key={item.slug} item={item} delay={index * 50} />
          ))}
        </div>
        <div className="centerCta reveal">
          <Link className="btn secondary" to="/noticias">Ver centro de actualizaciones</Link>
        </div>
      </div>
    </section>
  )
}

function NewsPage() {
  return (
    <>
      <SectionHero
        eyebrow="Centro de actualizaciones profesionales"
        title="Información oficial, resumida con criterio empresarial."
        text="Este espacio se alimenta con fuentes oficiales y se presenta como una guía práctica para empresas en República Dominicana: DGII, TSS, Ley 155-17, control interno, auditoría, impuestos y gestión financiera."
      >
        <Newsletter />
      </SectionHero>

      <NewsPolicyPanel />

      <section className="section newsSection">
        <div className="container">
          <div className="sectionHeader centered reveal">
            <p className="eyebrow">Actualizaciones recientes</p>
            <h2>Referencias seleccionadas para decisiones mejor informadas.</h2>
            <p>Cada tarjeta dirige a la fuente oficial. CBR agrega el contexto profesional sin sustituir la lectura normativa o regulatoria completa.</p>
          </div>
          <div className="newsGrid">
            {news.map((item, index) => (
              <NewsCard key={item.slug} item={item} delay={index * 50} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function NewsPolicyPanel() {
  return (
    <section className="section newsPolicySection">
      <div className="container newsPolicyPanel reveal">
        <div>
          <p className="eyebrow">Cómo se alimenta esta sección</p>
          <h2>Un modelo de actualización simple, confiable y sostenible.</h2>
          <p>La sección no publica noticias inventadas ni copia artículos completos. Se seleccionan fuentes oficiales, se resume lo relevante y se enlaza al origen para mantener transparencia.</p>
        </div>
        <div className="newsPolicyGrid">
          {newsMaintenance.map(([title, text]) => (
            <article key={title}>
              <span>✓</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsCard({ item, delay = 0 }) {
  return (
    <article className="newsCard reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="newsArt">
        <span>{item.category}</span>
        <div className="newsArtLines"><i></i><i></i><i></i></div>
      </div>
      <div className="newsBody">
        <time>{item.date}</time>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <small className="sourceTag">Fuente: {item.sourceLabel}</small>
        <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="readMore">Leer en fuente real <span>›</span></a>
      </div>
    </article>
  )
}

function ArticlePage({ slug }) {
  const article = news.find(item => item.slug === slug)
  if (!article) return <NotFoundPage />

  return (
    <>
      <SectionHero
        eyebrow={article.category}
        title={article.title}
        text={article.excerpt}
      >
        <div className="articleMetaCard">
          <span>Fuente real</span>
          <strong>{article.sourceLabel}</strong>
        </div>
      </SectionHero>

      <section className="section articleSection">
        <div className="container articleWrap reveal">
          {article.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className="articleCTA">
            <strong>Lectura completa en la fuente original</strong>
            <p>Para evitar publicar noticias sin respaldo, este apartado enlaza directamente a la fuente real donde se encuentra la información.</p>
            <a className="btn primary" href={article.sourceUrl} target="_blank" rel="noreferrer">Abrir fuente real</a>
          </div>
        </div>
      </section>
    </>
  )
}

function Newsletter({ compact = false }) {
  const [status, setStatus] = useState('idle')

  const handleNewsletter = async event => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    data.append('_subject', 'Nueva suscripción al boletín CBR')
    data.append('_template', 'table')
    data.append('_captcha', 'false')
    setStatus('sending')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Error')
      form.reset()
      setStatus('sent')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form className={`newsletter ${compact ? 'compact' : ''}`} onSubmit={handleNewsletter}>
      {!compact && <label>Suscríbete a nuestro boletín</label>}
      {compact && <label>Suscríbete a nuestro boletín</label>}
      <div>
        <input name="email" type="email" placeholder="Email" required />
        <button type="submit" aria-label="Suscribirse">›</button>
      </div>
      <small>
        {status === 'sending' && 'Enviando...'}
        {status === 'sent' && 'Suscripción recibida.'}
        {status === 'error' && 'No se pudo enviar. Intenta nuevamente.'}
      </small>
    </form>
  )
}

function ContactPage({ whatsappLink }) {
  const [formStatus, setFormStatus] = useState('idle')

  const handleSubmit = async event => {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    data.append('_subject', `Solicitud web CBR - ${data.get('service')}`)
    data.append('_template', 'table')
    data.append('_captcha', 'false')

    setFormStatus('sending')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.')
      }

      form.reset()
      setFormStatus('sent')
    } catch (error) {
      const subject = encodeURIComponent(`Solicitud web CBR - ${data.get('service')}`)
      const body = encodeURIComponent(
        [
          `Nombre: ${data.get('name')}`,
          `Empresa: ${data.get('company')}`,
          `Correo: ${data.get('email')}`,
          `Teléfono: ${data.get('phone')}`,
          `Servicio de interés: ${data.get('service')}`,
          '',
          'Mensaje:',
          data.get('message') || 'Sin mensaje adicional.',
        ].join('\n')
      )

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
      setFormStatus('idle')
    }
  }

  return (
    <>
      <SectionHero
        eyebrow="Contacto"
        title="Solicite una consulta con CBR Auditores & Consultores."
        text="Cuéntanos qué necesita tu empresa y te orientaremos sobre el servicio más adecuado."
      >
        <div className="contactHeroLinks">
          <a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a href={`mailto:${CONTACT_EMAIL}`}>Correo</a>
        </div>
      </SectionHero>

      <section className="section contactSection">
        <div className="container contactGrid">
          <div className="contactCopy reveal">
            <p className="eyebrow">Datos de contacto</p>
            <h2>Estamos listos para escucharte.</h2>
            <p>El primer paso es entender la necesidad, alcance y prioridad de tu empresa.</p>
            <div className="contactCards">
              <article><strong>Correo</strong><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></article>
              <article><strong>WhatsApp</strong><a href={whatsappLink} target="_blank" rel="noreferrer">{CONTACT_PHONE}</a></article>
              <article><strong>Instagram</strong><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@cbrauditores</a></article>
              <article><strong>Teléfono</strong><span>{CONTACT_PHONE}</span></article>
              <article><strong>Ubicación</strong><span>{ADDRESS}</span></article>
            </div>
          </div>

          <form className="contactForm reveal" onSubmit={handleSubmit}>
            <div className="formGrid">
              <label>Nombre<input name="name" type="text" placeholder="Nombre y apellido" required /></label>
              <label>Empresa<input name="company" type="text" placeholder="Nombre de la empresa" required /></label>
            </div>
            <div className="formGrid">
              <label>Correo electrónico<input name="email" type="email" placeholder="correo@empresa.com" required /></label>
              <label>Teléfono<input name="phone" type="tel" placeholder="809-000-0000" required /></label>
            </div>
            <label>
              Servicio de interés
              <select name="service" defaultValue="" required>
                <option value="" disabled>Seleccionar servicio</option>
                {services.map(service => <option key={service.title}>{service.title}</option>)}
              </select>
            </label>
            <label>Mensaje<textarea name="message" rows="5" placeholder="Cuéntanos brevemente qué necesita tu empresa"></textarea></label>
            <button type="submit" className="btn primary full">Enviar solicitud</button>
            <small className="formNote">
              {formStatus === 'sending' && 'Enviando solicitud...'}
              {formStatus === 'sent' && 'Solicitud enviada correctamente. Nos pondremos en contacto pronto.'}
              {formStatus === 'idle' && `El mensaje será enviado a ${CONTACT_EMAIL}.`}
            </small>
          </form>
        </div>
      </section>
    </>
  )
}

function PrivacyPage() {
  return (
    <>
      <SectionHero
        eyebrow="Aviso de privacidad"
        title="Uso responsable de la información recibida."
        text="La información enviada por los formularios se utiliza únicamente para responder solicitudes, coordinar reuniones o brindar información sobre nuestros servicios."
      />
      <section className="section privacySection">
        <div className="container privacyPanel reveal">
          <div>
            <p className="eyebrow">Protección de datos</p>
            <h2>Compromiso de confidencialidad.</h2>
          </div>
          <div className="privacyContent">
            <p>La información suministrada a través de esta web será utilizada únicamente por CBR Auditores & Consultores para responder solicitudes de contacto, coordinar reuniones o brindar información relacionada con nuestros servicios.</p>
            <p>Los datos personales enviados no serán compartidos con terceros sin autorización previa, salvo requerimiento legal aplicable.</p>
            <p>El usuario puede solicitar la actualización o eliminación de sus datos escribiendo a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}

function FinalCTA() {
  return (
    <section className="finalCta">
      <div className="container finalPanel reveal">
        <div>
          <p className="eyebrow light">Siguiente paso</p>
          <h2>Fortalece la gestión financiera, fiscal y regulatoria de tu empresa.</h2>
          <p>Agenda una asesoría con CBR y da el siguiente paso hacia una operación más ordenada, segura y preparada.</p>
        </div>
        <Link className="btn white" to="/contacto">Solicitar asesoría</Link>
      </div>
    </section>
  )
}

function Footer({ whatsappLink }) {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div>
          <Link to="/" className="brandWrap footerBrand">
            <img src={logo} alt="CBR Auditores & Consultores" className="brandLogo" />
            <div className="brandText">
              <strong>CBR Auditores</strong>
              <small>& Consultores</small>
            </div>
          </Link>
          <p className="footerSummary">Soluciones profesionales en contabilidad, auditoría, impuestos, finanzas, consultoría y cumplimiento Ley 155-17.</p>
        </div>

        <div className="footerColumns">
          <div>
            <h4>Mapa del sitio</h4>
            {navItems.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
            <Link to="/noticias">Actualizaciones profesionales</Link>
            <Link to="/aviso-privacidad">Aviso de privacidad</Link>
          </div>
          <div>
            <h4>Servicios</h4>
            <Link to="/servicios">Contabilidad</Link>
            <Link to="/servicios">Auditoría</Link>
            <Link to="/servicios">Impuestos</Link>
            <Link to="/servicios">Finanzas</Link>
            <Link to="/servicios">Consultoría</Link>
            <Link to="/ley-155-17">Cumplimiento Ley 155-17</Link>
            <Link to="/noticias">Noticias y fuentes oficiales</Link>
          </div>
          <div>
            <h4>Contacto</h4>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={whatsappLink} target="_blank" rel="noreferrer">{CONTACT_PHONE}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram @cbrauditores</a>
            <Link to="/contacto">Formulario de contacto</Link>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <span>© {new Date().getFullYear()} CBR Auditores & Consultores. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}

function FloatingSocials({ whatsappLink }) {
  return (
    <div className="floatingSocials" aria-label="Accesos rápidos">
      <a className="socialFloat whatsappFloat" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path className="filled" d="M16.02 3.2A12.76 12.76 0 0 0 5.06 22.5L3.6 28.8l6.44-1.38A12.78 12.78 0 1 0 16.02 3.2Zm0 2.28a10.5 10.5 0 1 1-5.34 19.54l-.38-.22-3.6.77.82-3.5-.25-.4A10.5 10.5 0 0 1 16.02 5.48Zm-3.4 5.34c-.23-.55-.48-.56-.7-.57h-.6c-.22 0-.57.08-.87.4-.3.33-1.14 1.12-1.14 2.72 0 1.6 1.17 3.15 1.33 3.37.16.22 2.26 3.62 5.58 4.93 2.76 1.09 3.32.87 3.92.82.6-.06 1.94-.8 2.22-1.56.27-.77.27-1.43.19-1.56-.08-.14-.3-.22-.63-.38l-1.86-.91c-.33-.17-.57-.25-.81.24-.25.5-.93 1.21-1.14 1.46-.21.25-.42.28-.78.12-.36-.17-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.2-.36-.02-.55.15-.72.16-.16.36-.42.55-.63.18-.21.24-.36.36-.6.12-.25.06-.46-.03-.64l-.9-1.97Z"/>
        </svg>
      </a>
      <a className="socialFloat instagramFloat" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Ver Instagram de CBR Auditores">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="7.4" y="7.4" width="17.2" height="17.2" rx="5.1" />
          <circle cx="16" cy="16" r="4.25" />
          <circle className="filled" cx="21.25" cy="10.75" r="1.15" />
        </svg>
      </a>
    </div>
  )
}

function NotFoundPage() {
  return (
    <>
      <SectionHero eyebrow="Página no encontrada" title="Este apartado no está disponible." text="Puedes regresar al inicio o contactar a CBR Auditores & Consultores." />
      <section className="section">
        <div className="container centerCta">
          <Link className="btn primary" to="/">Volver al inicio</Link>
        </div>
      </section>
    </>
  )
}

function App() {
  const pathname = usePathname()
  useReveal(pathname)

  const whatsappLink = useMemo(() => {
    const message = 'Hola, deseo solicitar una consulta con CBR Auditores & Consultores.'
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  }, [])

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
      <Header pathname={pathname} />
      <main>{page}</main>
      <Footer whatsappLink={whatsappLink} />
      <FloatingSocials whatsappLink={whatsappLink} />
    </>
  )
}

export default App
