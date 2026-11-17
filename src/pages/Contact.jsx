// Contacto: formulario protegido, canales directos (una sola fuente en src/config/site.js) y preguntas frecuentes.
import { useMemo, useState } from 'react'
import { CONTACT, whatsappHref } from '../config/site.js'
import { faqs, services } from '../content/services.js'
import { InstagramButton, PageHero } from '../components/layout.jsx'
import { Honeypot, sendForm, useFormGuard } from '../components/forms.jsx'

const SERVICE_OPTIONS = [...services.map(service => service.title), 'Cumplimiento Ley 155-17']

export default function ContactPage({ search = '' }) {
  const [formStatus, setFormStatus] = useState('idle')
  const [fallbackMailto, setFallbackMailto] = useState('')
  const check = useFormGuard()

  // /contacto?servicio=<título> llega desde «Consultar sobre…» y deja el servicio elegido.
  const preselected = useMemo(() => {
    const value = new URLSearchParams(search).get('servicio')
    return SERVICE_OPTIONS.includes(value) ? value : ''
  }, [search])

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
      setFallbackMailto(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`)
      setFormStatus('error')
    }
  }

  return (
    <>
      <PageHero
        title="Solicite una consulta con CBR Auditores & Consultores."
        lead="Cuéntenos qué necesita su empresa y le orientaremos sobre el servicio más adecuado."
      />

      <section className="section" id="formulario">
        <div className="wrap contact-grid">
          <form className="contact-form" onSubmit={handleSubmit} aria-labelledby="form-title" key={preselected}>
            <h2 className="contact-form__title" id="form-title">Formulario de solicitud</h2>
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
                <input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="(809) 000-0000" maxLength="30" pattern="[0-9\s\+\(\)\-\.]{7,30}" title="Indique un teléfono de al menos 7 dígitos" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-service">Servicio de interés</label>
              <select id="f-service" name="service" defaultValue={preselected} required>
                <option value="" disabled>Seleccione un servicio</option>
                {SERVICE_OPTIONS.map(option => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="f-message">Mensaje <small>(opcional)</small></label>
              <textarea id="f-message" name="message" rows="5" maxLength="2000" placeholder="Describa brevemente lo que necesita su empresa"></textarea>
            </div>

            {formStatus === 'error' && (
              <div className="form-alert" role="alert">
                <strong>No se pudo enviar la solicitud.</strong>
                Puede intentarlo de nuevo, <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">escribirnos por WhatsApp</a> o <a href={fallbackMailto}>enviarla por correo</a> con los datos ya completados.
              </div>
            )}

            <button type="submit" className="btn btn--block btn--lg" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Enviando solicitud…' : 'Enviar solicitud'}
            </button>
            <p className={`contact-form__status ${formStatus === 'sent' ? 'is-sent' : ''}`} role="status" aria-live="polite">
              {formStatus === 'sent' && 'Solicitud enviada correctamente. Nos pondremos en contacto pronto.'}
              {formStatus === 'retry' && 'Revise los datos y vuelva a pulsar «Enviar solicitud».'}
              {!['sent', 'retry'].includes(formStatus) && `El mensaje será enviado a ${CONTACT.email}.`}
            </p>
          </form>

          <aside className="channels" aria-labelledby="channels-title">
            <h2 className="headline" id="channels-title">Estamos listos para escucharle.</h2>
            <p className="body channels__intro">El primer paso es entender la necesidad, alcance y prioridad de su empresa.</p>
            <dl aria-label="Datos de contacto">
              <div>
                <dt>Teléfono</dt>
                <dd><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><a href={whatsappHref()} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a></dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd><InstagramButton /></dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{CONTACT.location}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="faq-title">
        <div className="wrap faq">
          <div className="faq__intro">
            <h2 className="headline" id="faq-title">Preguntas frecuentes</h2>
            <p className="body">Servicios profesionales con profundidad técnica. Si su pregunta no está aquí, escríbanos.</p>
          </div>
          <div className="faq__list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>{question}<span className="faq__icon" aria-hidden="true"></span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
