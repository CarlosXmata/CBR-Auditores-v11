// Router propio por pathname (sin dependencias): navegación SPA, anclas y enlaces internos.
import { useEffect, useState } from 'react'
import { normalizePath } from '../seo.js'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToHash(hash) {
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

export function navigate(to) {
  const url = new URL(to, window.location.origin)
  const next = url.pathname + url.search + url.hash
  const samePage = url.pathname === window.location.pathname
  if (window.location.pathname + window.location.search + window.location.hash !== next) {
    window.history.pushState({}, '', next)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
  if (url.hash) {
    window.setTimeout(() => scrollToHash(url.hash), samePage ? 0 : 60)
  } else if (!samePage) {
    window.scrollTo({ top: 0 })
  }
}

export function useLocation() {
  const read = () => ({
    pathname: normalizePath(window.location.pathname),
    search: window.location.search,
    hash: window.location.hash,
  })
  const [location, setLocation] = useState(read)
  useEffect(() => {
    const onPop = () => setLocation(read())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return location
}

export function Link({ to, className, children, onClick, ...props }) {
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

export const slugify = text =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const serviceHref = service => `/servicios#${slugify(service.title)}`

// Enlace a Contacto con el servicio ya elegido en el formulario.
export const consultHref = title => `/contacto?servicio=${encodeURIComponent(title)}#formulario`
