import { CONTACT } from '../config/site.js'
import { PageHero } from '../components/layout.jsx'

export default function PrivacyPage() {
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
            <p>El usuario puede solicitar la actualización o eliminación de sus datos escribiendo a <a className="textlink" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
