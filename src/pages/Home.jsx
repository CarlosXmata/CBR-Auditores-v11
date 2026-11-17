// Inicio: vista general breve. Orienta y despierta interés; el detalle vive en cada módulo.
import { CTA_LABEL, whatsappHref } from '../config/site.js'
import { complianceBlocks, differentiators, services } from '../content/services.js'
import { datedNews, formatDate } from '../content/news.js'
import { Close } from '../components/layout.jsx'
import { InkStatement } from '../components/moments.jsx'
import { UpdateCard, newsHref } from '../components/news.jsx'
import { Link, serviceHref } from '../components/routing.jsx'
import { ArrowRight, ArrowUpRight, Rings } from '../components/icons.jsx'

export default function HomePage() {
  const recent = datedNews()
  const latest = recent[0]

  return (
    <>
      {/* 1. Hero dividido: el texto vende, el panel azul es la marca */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <h1 className="hero__title" id="hero-title">Auditoría, Contabilidad, Impuestos y <span>Consultoría Financiera</span></h1>
            <p className="lead">
              CBR Auditores & Consultores brinda asesoría integral a empresas de todos los tamaños, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--lg" to="/contacto">{CTA_LABEL}</Link>
              <a className="textlink" href={whatsappHref()} target="_blank" rel="noopener noreferrer">Escríbanos por WhatsApp <ArrowUpRight /></a>
            </div>
            <p className="hero__facts"><span>Firma dominicana</span><span>Especialistas en Ley 155-17</span><span>Trato directo con los socios</span></p>
          </div>

          <div className="hero__panel">
            <Rings className="hero__rings" />
            <p className="hero__lema" aria-label="Orden. Cumplimiento. Confianza.">
              <span aria-hidden="true">Orden.</span>
              <span aria-hidden="true">Cumplimiento.</span>
              <span aria-hidden="true">Confianza.</span>
            </p>
            {latest && (
              <aside className="hero__update" aria-label="Última actualización oficial">
                <p className="hero__update-meta">Actualización oficial · {formatDate(latest.publishedAt)} · {latest.category}</p>
                <p className="hero__update-title">{latest.title}</p>
                <Link className="textlink" to={newsHref(latest)}>Leer el resumen de CBR <ArrowRight /></Link>
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* 2. Áreas de práctica: las seis líneas, título y frase aprobados */}
      <section className="section" aria-labelledby="areas-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="areas-title">Seis áreas de práctica, una sola firma.</h2>
            <p className="body">Un portafolio diseñado para acompañar la operación diaria, las decisiones estratégicas y el crecimiento con confianza.</p>
          </div>
          <ul className="practice">
            {services.map(service => (
              <li key={service.title}>
                <Link className="practice__item" to={serviceHref(service)}>
                  <h3>{service.title}</h3>
                  <p>{service.headline}</p>
                  <span className="practice__more">Ver servicio <ArrowRight /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Propuesta de valor: momento de tinta sobre azul */}
      <section className="value" aria-labelledby="value-title">
        <Rings className="value__rings" />
        <div className="wrap">
          <InkStatement
            id="value-title"
            className="ink-statement--on-blue"
            text="Detrás de cada empresa exitosa hay información financiera confiable, decisiones bien respaldadas y asesores que realmente entienden el negocio."
          />
          <ul className="value__list">
            {differentiators.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Ley 155-17: introducción breve y acceso a la página especializada */}
      <section className="law" aria-labelledby="law-title">
        <div className="wrap law__grid">
          <div>
            <h2 className="headline" id="law-title"><span className="law__mark num">Ley 155-17</span> Cumplimiento regulatorio para Sujetos Obligados.</h2>
            <p className="body">Acompañamos la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo.</p>
            <Link className="btn btn--white" to="/ley-155-17">Conocer el enfoque de cumplimiento</Link>
          </div>
          <ol className="law__track" aria-label="Del documento al control operativo">
            {complianceBlocks.map(([title]) => <li key={title}>{title}</li>)}
          </ol>
        </div>
      </section>

      {/* 5. Actualizaciones: publicaciones oficiales verificadas */}
      <section className="section section--mist" aria-labelledby="updates-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="updates-title">Actualizaciones oficiales, explicadas para su empresa.</h2>
            <Link className="textlink" to="/noticias">Ver el Centro de Actualizaciones <ArrowRight /></Link>
          </div>
          <div className="update-grid">
            {recent.slice(0, 3).map(item => <UpdateCard key={item.slug} item={item} />)}
          </div>
        </div>
      </section>

      {/* 6. Cierre comercial */}
      <Close />
    </>
  )
}
