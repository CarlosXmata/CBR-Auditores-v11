// Ley 155-17: página especializada. Cada afirmación normativa remite al texto de la ley publicado
// por la Superintendencia de Bancos (verificado el 17/11/2026). Es informativa: no es asesoría jurídica.
import { CTA_LABEL, LAW_SOURCES } from '../config/site.js'
import { complianceBlocks } from '../content/services.js'
import { Close, PageHero } from '../components/layout.jsx'
import { Link, consultHref } from '../components/routing.jsx'
import { ArrowRight, ArrowUpRight } from '../components/icons.jsx'

const financieros = [
  'Entidades de intermediación financiera',
  'Intermediarios de valores',
  'Quienes intermedian en el cambio y la remesa de divisas',
  'Fiduciarias',
  'Asociaciones cooperativas de ahorro y crédito',
  'Otras entidades que enumera el artículo 32',
]

const noFinancieros = [
  'Casinos, bancas de lotería y apuestas',
  'Empresas de factoraje',
  'Agentes inmobiliarios en la compraventa de inmuebles para sus clientes',
  'Comerciantes de metales y piedras preciosas',
  'Abogados, notarios y contadores cuando realizan determinadas transacciones para sus clientes',
  'Compraventa habitual de vehículos, armas, barcos y aviones',
  'Casas de empeño',
  'Empresas constructoras',
]

const obligaciones = [
  ['Programa de cumplimiento basado en riesgo', 'Adecuado a la organización, estructura, recursos y complejidad de las operaciones. Incluye políticas para evaluar y mitigar riesgos, estándares de contratación y capacitación, régimen disciplinario, código de ética y auditoría externa de su efectividad (art. 34).'],
  ['Oficial de cumplimiento', 'Un ejecutivo de alto nivel, con capacidad técnica, que vigila el programa y sirve de enlace con la UAF y con el ente supervisor (art. 44).'],
  ['Debida diligencia del cliente', 'Identificar y verificar al cliente antes de iniciar o mantener una relación comercial o profesional, y aplicar un enfoque basado en riesgos.'],
  ['Reporte de operaciones sospechosas', 'Comunicar las operaciones sospechosas a la Unidad de Análisis Financiero (UAF) dentro de los cinco días hábiles posteriores a la operación realizada o intentada (art. 55).'],
]

export default function CompliancePage() {
  return (
    <>
      <PageHero
        title="Cumplimiento regulatorio para Sujetos Obligados en República Dominicana."
        lead="Acompañamos la implementación, revisión y fortalecimiento de controles para la prevención del lavado de activos y financiamiento del terrorismo."
        aside={
          <dl className="sheet facts">
            <div><dt>Marco legal</dt><dd>Ley núm. 155-17 contra el Lavado de Activos y el Financiamiento del Terrorismo</dd></div>
            <div><dt>Dirigido a</dt><dd>Sujetos Obligados financieros y no financieros (arts. 32 y 33)</dd></div>
            <div><dt>Referencia oficial</dt><dd><a href={LAW_SOURCES.ley.url} target="_blank" rel="noopener noreferrer">Texto de la ley en la Superintendencia de Bancos <ArrowUpRight /></a></dd></div>
          </dl>
        }
      />

      <section className="section" aria-labelledby="context-title">
        <div className="wrap statement">
          <h2 className="headline" id="context-title">El contexto de cumplimiento.</h2>
          <div>
            <p className="body">La Ley núm. 155-17 tipifica el lavado de activos, sus infracciones precedentes y el financiamiento del terrorismo, y establece las sanciones aplicables. También define quiénes son Sujetos Obligados y qué medidas preventivas deben mantener.</p>
            <p className="body">La Unidad de Análisis Financiero (UAF) recibe los reportes de operaciones sospechosas y eleva al Ministerio Público los informes de análisis financiero sobre posibles infracciones.</p>
            <p className="body">No se trata solo de tener manuales. Se trata de que la empresa pueda demostrar gestión, seguimiento, actualización y evidencia.</p>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="subjects-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="subjects-title">¿Quiénes son Sujetos Obligados?</h2>
            <p className="body">La ley los agrupa en dos categorías. Esta es una síntesis; la lista completa y sus condiciones están en los artículos 32 y 33.</p>
          </div>
          <div className="subjects">
            <div>
              <h3>Sujetos Obligados financieros</h3>
              <ul>{financieros.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <div>
              <h3>Sujetos Obligados no financieros</h3>
              <ul>{noFinancieros.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="duties-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="duties-title">Prevención de LA/FT: lo que la ley exige.</h2>
            <p className="body">Medidas preventivas centrales para los Sujetos Obligados, con su referencia en la ley.</p>
          </div>
          <ul className="duties">
            {obligaciones.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="law law--page" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="law__head">
            <h2 className="headline" id="approach-title">Del documento al control operativo.</h2>
            <p className="body">Riesgos y controles: así acompaña CBR a los Sujetos Obligados en cada componente de su programa de cumplimiento.</p>
          </div>
          <ol className="flow" aria-label="Componentes del acompañamiento">
            {complianceBlocks.map(([title, text]) => (
              <li key={title}>
                <span className="flow__node" aria-hidden="true"></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="law__cta">
            <Link className="btn btn--white" to={consultHref('Cumplimiento Ley 155-17')}>{CTA_LABEL}</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="local-title">
        <div className="wrap statement">
          <h2 className="headline" id="local-title">Un enfoque alineado al entorno dominicano.</h2>
          <p className="lead">Integramos la realidad del mercado local y las necesidades de Sujetos Obligados, empresas y profesionales independientes.</p>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="refs-title">
        <div className="wrap statement">
          <h2 className="headline" id="refs-title">Referencias oficiales.</h2>
          <div>
            <ul className="refs">
              <li><a href={LAW_SOURCES.ley.url} target="_blank" rel="noopener noreferrer">{LAW_SOURCES.ley.label} <ArrowUpRight /></a></li>
              <li><a href={LAW_SOURCES.reglamento.url} target="_blank" rel="noopener noreferrer">{LAW_SOURCES.reglamento.label} <ArrowUpRight /></a></li>
              <li><a href={LAW_SOURCES.uaf.url} target="_blank" rel="noopener noreferrer">{LAW_SOURCES.uaf.label} <ArrowUpRight /></a></li>
            </ul>
            <p className="disclaimer">Este resumen es informativo y se basa en el texto de la ley publicado por la Superintendencia de Bancos (consultado el 17 de noviembre de 2026). No sustituye la lectura de la norma ni las instrucciones de su ente supervisor, y no constituye asesoría jurídica.</p>
            <Link className="textlink" to="/noticias/ley-155-17-marco-prevencion-laft">Ver la ficha en el Centro de Actualizaciones <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <Close />
    </>
  )
}
