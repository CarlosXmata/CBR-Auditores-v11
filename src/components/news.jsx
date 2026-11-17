// Piezas del Centro de Actualizaciones: tarjeta de listado y datos de una publicación.
import { formatDate } from '../content/news.js'
import { Link } from './routing.jsx'
import { ArrowRight, ArrowUpRight } from './icons.jsx'

export const newsHref = item => `/noticias/${item.slug}`

// Fecha visible: la de publicación oficial en una noticia; «Recurso permanente» en una guía.
export function NewsDate({ item }) {
  if (item.type === 'noticia') return <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
  return <span>Recurso permanente</span>
}

export function UpdateCard({ item, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`
  return (
    <article className="update-card">
      <p className="update-card__meta"><span className="update-card__cat">{item.category}</span><NewsDate item={item} /></p>
      <Heading className="update-card__title"><Link to={newsHref(item)}>{item.title}</Link></Heading>
      <p className="update-card__source">{item.sourceName}</p>
      <div className="update-card__actions">
        <Link className="textlink" to={newsHref(item)}>Leer el resumen de CBR <ArrowRight /></Link>
        <a className="textlink" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Fuente oficial <ArrowUpRight /></a>
      </div>
    </article>
  )
}
