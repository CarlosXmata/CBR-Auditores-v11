// Los dos momentos de scroll del sitio. El movimiento ocurre solo dentro de su sección
// y, con movimiento reducido, todo aparece en su estado final.
import { useEffect, useMemo, useRef, useState } from 'react'
import { prefersReducedMotion } from './routing.jsx'

// Declaración que pasa de media tinta a tinta completa, palabra por palabra, al cruzar la pantalla.
export function InkStatement({ text, id, as: Tag = 'h2', className = '' }) {
  const ref = useRef(null)
  const words = useMemo(() => text.split(' '), [text])
  const [lit, setLit] = useState(words.length)

  useEffect(() => {
    if (prefersReducedMotion()) { setLit(words.length); return undefined }
    let frame = 0
    const update = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85
      const span = vh * 0.55 + rect.height * 0.5
      const progress = Math.min(1, Math.max(0, (start - rect.top) / span))
      setLit(Math.round(progress * words.length))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [words.length])

  return (
    <Tag className={`ink-statement ${className}`} id={id} ref={ref} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true" className={index < lit ? 'is-lit' : undefined}>{word} </span>
      ))}
    </Tag>
  )
}

// Metodología en capítulos: el panel fijo muestra el paso que se está leyendo.
export function ProcessChapters({ steps }) {
  const [active, setActive] = useState(0)
  const itemsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    itemsRef.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const [number, title] = steps[active]
  return (
    <div className="chapters">
      <div className="chapters__pin" aria-hidden="true">
        <span className="chapters__num num">{number}</span>
        <span className="chapters__title">{title}</span>
        <span className="chapters__track"><span style={{ transform: `scaleX(${(active + 1) / steps.length})` }}></span></span>
      </div>
      <ol className="chapters__list">
        {steps.map(([num, stepTitle, stepText], index) => (
          <li
            key={num}
            data-index={index}
            ref={el => { itemsRef.current[index] = el }}
            className={index === active ? 'is-active' : undefined}
          >
            <span className="chapters__step num">{num}</span>
            <h3>{stepTitle}</h3>
            <p>{stepText}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
