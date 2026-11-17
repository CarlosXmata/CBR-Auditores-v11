// Nosotros: identidad de la firma construida solo con información confirmada (sin socios, cifras ni clientes).
import { process, reasons } from '../content/services.js'
import { Close, PageHero } from '../components/layout.jsx'
import { ProcessChapters } from '../components/moments.jsx'

export default function AboutPage() {
  return (
    <>
      <PageHero
        rings={false}
        title="Una firma especializada en contabilidad, auditoría, impuestos, finanzas y consultoría empresarial."
        lead="Brindamos asesoría integral a empresas, emprendedores, profesionales independientes y Sujetos Obligados conforme a la Ley 155-17, con ética, profesionalismo y compromiso."
        aside={
          <ul className="motto" aria-label="Principios de la firma">
            <li>Orden.</li>
            <li>Cumplimiento.</li>
            <li>Confianza.</li>
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

      <section className="section section--blue" aria-labelledby="why-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="why-title">Un equipo cercano, confidencial y comprometido con la calidad.</h2>
            <p className="body">La relación con el cliente se gestiona con comunicación directa, criterio profesional y seguimiento oportuno.</p>
          </div>
          <ul className="reasons">
            {reasons.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="method-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="method-title">Un proceso claro para entregar soluciones oportunas y confiables.</h2>
            <p className="body">Acompañamos la operación diaria y las decisiones estratégicas con rigor, criterio y visión empresarial.</p>
          </div>
          <ProcessChapters steps={process} />
        </div>
      </section>

      <Close />
    </>
  )
}
