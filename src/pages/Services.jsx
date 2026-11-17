// Servicios: las seis líneas aprobadas, con su texto literal, servicios incluidos y consulta directa.
import { services } from '../content/services.js'
import { Close, PageHero } from '../components/layout.jsx'
import { Link, consultHref, serviceHref, slugify } from '../components/routing.jsx'
import { ArrowRight } from '../components/icons.jsx'

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Más que asesores, somos su ventaja estratégica"
        lead="Combinamos profundidad técnica, visión empresarial y un trato personal que pocas firmas pueden ofrecer. Cada solución está diseñada para el negocio que usted dirige hoy y para el que aspira construir mañana."
        aside={
          <nav className="sheet" aria-labelledby="toc-title">
            <p className="sheet__label" id="toc-title">Índice de servicios</p>
            <ul className="toc">
              {services.map(service => (
                <li key={service.title}><Link to={serviceHref(service)}>{service.title} <ArrowRight /></Link></li>
              ))}
            </ul>
            <p className="sheet__note">Soluciones diseñadas para empresas que buscan crecer con estructura, confianza y visión.</p>
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

      <section className="services-list" aria-label="Detalle de servicios">
        {services.map((service, index) => {
          const id = slugify(service.title)
          return (
            <article className={`service ${index % 2 ? 'service--mist' : ''}`} id={id} key={service.title} aria-labelledby={`${id}-title`}>
              <div className="wrap service__grid">
                <div className="service__head">
                  <h2 className="headline" id={`${id}-title`}>{service.title}</h2>
                  <p className="service__tagline">{service.headline}</p>
                </div>
                <div className="service__body">
                  <h3 className="service__label">Lo que resolvemos</h3>
                  <p className="body">{service.description}</p>
                  <h3 className="service__label">Servicios incluidos</h3>
                  <ul className="scope">
                    {service.items.map(item => <li key={item}>{item}</li>)}
                  </ul>
                  <Link className="btn btn--quiet" to={consultHref(service.title)}>Consultar sobre {service.title} <ArrowRight /></Link>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <aside className="note-band" aria-label="Cumplimiento Ley 155-17">
        <div className="wrap">
          <p>¿Su organización es Sujeto Obligado según la Ley 155-17?</p>
          <Link className="btn btn--white" to="/ley-155-17">Conocer el enfoque de cumplimiento</Link>
        </div>
      </aside>

      <Close
        title="¿Listo para llevar su empresa al siguiente nivel?"
        text="Conversemos sobre sus desafíos actuales. Sin compromisos, sin formalidades innecesarias. Solo una conversación honesta sobre cómo podemos ayudarle a crecer con más confianza."
      />
    </>
  )
}
