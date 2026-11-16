// Envío a FormSubmit (https://formsubmit.co) con validación real de la respuesta.
//
// FormSubmit responde JSON, por ejemplo {"success":"true","message":"..."}.
// Un HTTP 200 NO basta: si el correo aún no está activado o el envío es rechazado,
// la respuesta puede traer success "false". Aquí solo se considera enviado cuando
// el HTTP es correcto Y el cuerpo confirma success.

const TIMEOUT_MS = 15000

export async function sendFormSubmit(email, formData, { timeoutMs = TIMEOUT_MS } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    let payload = null
    try {
      payload = await response.json()
    } catch {
      payload = null
    }

    const confirmed = payload !== null && (payload.success === true || payload.success === 'true')
    return { ok: response.ok && confirmed, status: response.status, message: payload?.message ?? null }
  } catch (error) {
    return { ok: false, status: 0, message: error?.name === 'AbortError' ? 'timeout' : 'network' }
  } finally {
    clearTimeout(timer)
  }
}

// ¿Se llenó el campo trampa (honeypot)? Solo un bot lo completa.
export function isHoneypotFilled(formData) {
  return String(formData.get('_honey') || '').trim() !== ''
}
