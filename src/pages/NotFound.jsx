import { PageHero } from '../components/layout.jsx'
import { Link } from '../components/routing.jsx'

export default function NotFoundPage() {
  return (
    <PageHero
      title="Este apartado no está disponible."
      lead="Puede regresar al inicio o contactar a CBR Auditores & Consultores."
    >
      <div className="page-hero__actions">
        <Link className="btn btn--white" to="/">Volver al inicio</Link>
        <Link className="textlink textlink--light" to="/contacto">Ir a Contacto</Link>
      </div>
    </PageHero>
  )
}
