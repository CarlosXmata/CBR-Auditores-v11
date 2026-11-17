// Centro de Actualizaciones Profesionales: noticias fechadas y recursos permanentes, siempre con su fuente oficial.
import { useState } from 'react'
import { datedNews, formatDate, news, resources } from '../content/news.js'
import { Close, PageHero } from '../components/layout.jsx'
import { Newsletter } from '../components/forms.jsx'
import { NewsDate, UpdateCard } from '../components/news.jsx'
import { Link } from '../components/routing.jsx'
import { ArrowLeft, ArrowUpRight } from '../components/icons.jsx'
import NotFoundPage from './NotFound.jsx'

export function NewsPage() {
  const categories = ['Todas', ...Array.from(new Set(news.map(item => item.category)))]
  const [filter, setFilter] = useState('Todas')
  const match = item => filter === 'Todas' || item.category === filter
  const dated = datedNews().filter(match)
  const permanent = resources().filter(match)

  return (
    <>
      <PageHero
        title="Información oficial, resumida con criterio empresarial."
        lead="Este espacio se alimenta con fuentes oficiales y se presenta como una guía práctica para empresas en República Dominicana: DGII, TSS, Ley 155-17, control interno, auditoría, impuestos y gestión financiera."
        aside={<div className="sheet"><Newsletter id="news-newsletter" /></div>}
      />

      <section className="section" aria-labelledby="refs-title">
        <div className="wrap">
          <div className="section-head">
            <h2 className="headline" id="refs-title">Referencias seleccionadas para decisiones mejor informadas.</h2>
            <div>
              <p className="body">La sección no publica noticias inventadas ni copia artículos completos. Se seleccionan fuentes oficiales, se resume lo relevante y se enlaza al origen para mantener transparencia.</p>
              <p className="body">Cada resumen enlaza a su fuente oficial. CBR agrega el contexto profesional sin sustituir la lectura normativa o regulatoria completa.</p>
            </div>
          </div>
          <div className="filters" role="group" aria-label="Filtrar por categoría">
            {categories.map(category => (
              <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>

          <div aria-live="polite">
            {dated.length > 0 && (
              <>
                <h3 className="list-title">Noticias</h3>
                <div className="update-grid">
                  {dated.map(item => <UpdateCard key={item.slug} item={item} headingLevel={4} />)}
                </div>
              </>
            )}
            {permanent.length > 0 && (
              <>
                <h3 className="list-title">Recursos permanentes</h3>
                <div className="update-grid">
                  {permanent.map(item => <UpdateCard key={item.slug} item={item} headingLevel={4} />)}
                </div>
              </>
            )}
            {dated.length + permanent.length === 0 && <p className="empty">No hay publicaciones en esta categoría.</p>}
          </div>
        </div>
      </section>

      <Close />
    </>
  )
}

export function ArticlePage({ slug }) {
  const article = news.find(item => item.slug === slug)
  if (!article) return <NotFoundPage />

  return (
    <>
      <PageHero
        title={article.title}
        lead={article.excerpt}
        aside={
          <dl className="sheet facts">
            <div><dt>{article.type === 'noticia' ? 'Fecha de publicación' : 'Tipo'}</dt><dd><NewsDate item={article} /></dd></div>
            <div><dt>Categoría</dt><dd>{article.category}</dd></div>
            <div><dt>Organismo emisor</dt><dd>{article.sourceName}</dd></div>
            <div><dt>Enlace verificado</dt><dd><time dateTime={article.verifiedAt}>{formatDate(article.verifiedAt)}</time></dd></div>
            <div>
              <a className="btn" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Consultar fuente oficial <ArrowUpRight /></a>
            </div>
          </dl>
        }
      />

      <section className="section">
        <div className="wrap article">
          <div className="article__body">
            <h2 className="article__label">Resumen</h2>
            <div className="prose">
              {article.summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
            <h2 className="article__label">Relevancia para las empresas</h2>
            <div className="prose"><p>{article.relevance}</p></div>
            {article.cbrNote && <p className="article__note">{article.cbrNote}</p>}
          </div>
          <aside className="source-note" aria-labelledby="source-title">
            <h2 id="source-title">Lectura completa en la fuente original</h2>
            <p>Para evitar publicar noticias sin respaldo, este apartado enlaza directamente a la fuente real donde se encuentra la información.</p>
            <a className="textlink" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">{article.sourceName} <ArrowUpRight /></a>
            <p className="source-note__check">Enlace verificado el {formatDate(article.verifiedAt)}.</p>
          </aside>
        </div>
        <div className="wrap back-link">
          <Link className="textlink" to="/noticias"><ArrowLeft /> Volver al Centro de Actualizaciones</Link>
        </div>
      </section>

      <Close />
    </>
  )
}
