// Envío protegido de formularios (FormSubmit vía src/formSubmit.js): campo trampa, tiempo mínimo y respuesta confirmada.
import { useRef, useState } from 'react'
import { CONTACT } from '../config/site.js'
import { isHoneypotFilled, sendFormSubmit } from '../formSubmit.js'

const MIN_FILL_MS = 2500 // un envío más rápido que esto se trata como automatizado

// Campo trampa: invisible para personas, rellenado por bots. FormSubmit descarta los envíos con _honey.
export function Honeypot() {
  return (
    <div className="hp-field" aria-hidden="true">
      <label>No rellene este campo<input type="text" name="_honey" tabIndex="-1" autoComplete="off" defaultValue="" /></label>
    </div>
  )
}

export function useFormGuard() {
  const mountedAt = useRef(Date.now())
  return data => {
    if (isHoneypotFilled(data)) return 'bot'
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return 'too-fast'
    return 'ok'
  }
}

// Envía y lanza error si FormSubmit no confirma el envío (red, tiempo agotado o success distinto de true).
export async function sendForm(data) {
  const result = await sendFormSubmit(CONTACT.email, data)
  if (!result.ok) throw new Error(result.message || 'send-failed')
}

export function Newsletter({ id = 'newsletter', className = '' }) {
  const [status, setStatus] = useState('idle')
  const check = useFormGuard()

  const handleNewsletter = async event => {
    event.preventDefault()
    if (status === 'sending' || status === 'sent') return
    const form = event.currentTarget
    const data = new FormData(form)
    const verdict = check(data)
    if (verdict === 'bot') { form.reset(); setStatus('sent'); return }
    if (verdict === 'too-fast') { setStatus('retry'); return }
    data.append('_subject', 'Nueva suscripción al boletín CBR')
    data.append('_template', 'table')
    data.append('_captcha', 'false')
    setStatus('sending')

    try {
      await sendForm(data)
      form.reset()
      setStatus('sent')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form className={`newsletter ${className}`} onSubmit={handleNewsletter}>
      <label htmlFor={`${id}-email`}>Suscríbase a nuestro boletín</label>
      <Honeypot />
      <div className="newsletter__field">
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="correo@empresa.com" maxLength="160" required />
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Enviando…' : 'Suscribirse'}
        </button>
      </div>
      <p className={`newsletter__status ${status === 'error' ? 'is-error' : ''}`} role="status" aria-live="polite">
        {status === 'sent' && 'Suscripción recibida. Gracias.'}
        {status === 'retry' && 'Revise su correo y vuelva a pulsar «Suscribirse».'}
        {status === 'error' && <>No se pudo completar la suscripción. Inténtelo de nuevo o escríbanos a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</>}
      </p>
    </form>
  )
}
