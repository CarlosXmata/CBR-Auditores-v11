# Mantenimiento del Centro de Actualizaciones Profesionales

## Objetivo

Mantener la web activa sin publicar contenido inventado. El Centro de Actualizaciones es una curaduría profesional: cada entrada resume con palabras propias una publicación oficial, explica por qué importa a las empresas y enlaza a la fuente. No se copian artículos.

## Dos tipos de publicación

| Tipo | Cuándo | Fecha visible |
| --- | --- | --- |
| `noticia` | Un anuncio, aviso o comunicado oficial con fecha. | La fecha de publicación oficial (`publishedAt`). |
| `recurso` | Un canal o guía permanente (portal de noticias de la TSS, texto de la Ley 155-17…). | «Recurso permanente». Nunca se inventa una fecha. |

Las noticias se ordenan de la más reciente a la más antigua. En Inicio aparecen las tres noticias más recientes; los recursos solo se listan en `/noticias`.

## Dónde se edita

Todo vive en `src/content/news.js`, en la lista `export const news = [ … ]`. Cada objeto genera su página `/noticias/<slug>`, sus metadatos (título, descripción, Open Graph) y su entrada en `sitemap.xml` durante `npm run build`.

| Campo | Obligatorio | Contenido |
| --- | --- | --- |
| `slug` | Sí | Minúsculas, números y guiones. Define la URL. No se cambia una vez publicado. |
| `type` | Sí | `'noticia'` o `'recurso'`. |
| `title` | Sí | Titular propio, fiel a la fuente. |
| `excerpt` | Sí | Una frase para listados y buscadores. |
| `summary` | Sí | Lista de 1 a 3 párrafos propios. |
| `relevance` | Sí | Por qué importa a las empresas. |
| `cbrNote` | No | Cómo puede orientar CBR, sin prometer resultados. |
| `category` | Sí | DGII, TSS, Fiscal, Regulatorio, Prevención LA/FT… (reutilizar las existentes). |
| `sourceName` | Sí | Organismo emisor con su nombre completo. |
| `sourceUrl` | Sí | Enlace `https://` a la publicación original, no a una portada general. |
| `publishedAt` | En `noticia` | Fecha oficial en formato `AAAA-MM-DD`. |
| `verifiedAt` | Sí | Fecha en que una persona abrió el enlace y comprobó el contenido (`AAAA-MM-DD`). |

Plantilla:

```js
{
  slug: 'dgii-ejemplo-de-slug',
  type: 'noticia',
  title: 'Titular propio y fiel a la fuente',
  excerpt: 'Una frase que resume la publicación.',
  summary: [
    'Primer párrafo con palabras propias: qué se anunció, quién y desde cuándo.',
    'Segundo párrafo opcional con el detalle que afecta a las empresas.',
  ],
  relevance: 'Qué debe revisar o decidir una empresa a partir de esto.',
  cbrNote: 'Si su empresa tiene dudas sobre este tema, puede consultarnos.',
  category: 'DGII',
  sourceName: 'Dirección General de Impuestos Internos (DGII)',
  sourceUrl: 'https://dgii.gov.do/noticias/Paginas/…',
  publishedAt: 'AAAA-MM-DD',
  verifiedAt: 'AAAA-MM-DD',
},
```

## Fuentes

| Organismo | Seguimiento |
| --- | --- |
| DGII | RSS oficial (lo lee `npm run news:feeds`) y https://dgii.gov.do/noticias/Paginas/default.aspx |
| TSS | RSS oficial y https://tss.gob.do/noticias/ |
| Ministerio de Trabajo | RSS oficial y https://mt.gob.do/ |
| SIMV | RSS oficial y https://simv.gob.do/ |
| Superintendencia de Bancos | Sin RSS: revisar https://sb.gob.do/prensa/ en el navegador |
| Banco Central | Sin RSS: revisar su sala de prensa |
| UAF | https://uaf.gob.do/es (prevención LA/FT) |

## Frecuencia: 2 a 4 publicaciones al mes

Una rutina que cabe en una hora a la semana:

1. **Lunes**: la verificación automática semanal revisa los enlaces (ver más abajo). Revisar su resultado.
2. **Lunes o martes**: ejecutar `npm run news:feeds` y abrir `news-report/candidatos.md`. Es una lista de trabajo, no contenido publicable.
3. **Elegir** una o dos entradas con impacto real para empresas: plazos, obligaciones, cambios de formularios, sanciones, regulación de Sujetos Obligados. Descartar actos protocolares, premios o eventos.
4. **Redactar** cada entrada con la plantilla y la lista de verificación.
5. **Comprobar** con `npm run news:check` y `npm run build`, y revisar la ficha en `npm run preview`.
6. **Publicar** siguiendo el flujo de Git del proyecto (rama, revisión y autorización antes de subir a `main`; Vercel publica al recibir el cambio).

## Lista de verificación antes de publicar

- [ ] **Fecha**: `publishedAt` es la fecha que muestra la fuente oficial, no la del día en que se redacta. Los recursos no llevan fecha.
- [ ] **Titular**: propio, preciso y sin exagerar el alcance de la medida.
- [ ] **Resumen**: redactado con palabras propias; ninguna frase copiada de la fuente salvo cifras, nombres de normas o plazos.
- [ ] **Relevancia**: explica qué debe hacer o revisar una empresa.
- [ ] **Fuente**: organismo emisor oficial; nunca un medio de prensa ni una red social como fuente principal.
- [ ] **Enlace**: abre la publicación concreta (no una portada), en `https://`, y se comprobó en un navegador. `verifiedAt` lleva la fecha de esa comprobación.
- [ ] **Tono**: trato de usted; sin promesas de resultado; la nota de CBR orienta, no asesora.
- [ ] `npm run news:check` sin errores y `npm run build` correcto.

## Verificación automática

`npm run news:check` revisa los datos de `src/content/news.js` y los enlaces oficiales (fuentes de las publicaciones y de la página Ley 155-17, definidas en `src/config/site.js`). Usa HEAD y, si hace falta, GET; sigue redirecciones; espera como máximo 15 s por enlace; consulta de uno en uno. Deja el informe en `news-report/news-check.md` y `.json` (carpeta ignorada por Git).

| Resultado | Qué significa | Qué hacer |
| --- | --- | --- |
| OK | El enlace responde. | Nada. |
| Revisión manual | El sitio respondió 403 o 429 a una petición automática (le ocurre a la Superintendencia de Bancos). | Abrir el enlace en un navegador. Si carga, no es un problema. |
| Roto | 401, 404, 410 u otro error 4xx. | Buscar la nueva dirección oficial y actualizar `sourceUrl` y `verifiedAt`. Si la publicación ya no existe, retirar la entrada. |
| Error de servidor | 5xx tras un reintento. | Repetir más tarde; si persiste una semana, tratarlo como roto. |
| Sin respuesta | Tiempo agotado, DNS o certificado. | Repetir más tarde y comprobar en un navegador. |

También avisa cuando una entrada lleva más de 120 días sin verificación manual.

El flujo `.github/workflows/news-check.yml` ejecuta la verificación cada lunes a las 08:00 (hora de República Dominicana) y también a mano desde la pestaña **Actions** de GitHub (**Verificación de noticias** → **Run workflow**). Muestra el resumen en la ejecución y guarda el informe y la lista de candidatos como artefacto durante 30 días. **No modifica contenido, no hace commit y no despliega**: si falla, GitHub avisa por correo al responsable del repositorio y la corrección se hace a mano.

## Retirar o actualizar una entrada

- Si la fuente cambia de dirección: actualizar `sourceUrl` y `verifiedAt`.
- Si la fuente corrige su contenido: actualizar el resumen y `verifiedAt`.
- Si la publicación oficial desaparece o queda sin efecto: retirar la entrada. Su URL pasará a mostrar la página 404 del sitio.
- No se cambia el `slug` de una entrada publicada: rompe los enlaces que otros hayan compartido.

## Fase futura (propuesta, no implementada)

Para que la clienta publique sin editar código, sin servicios de pago:

- **CMS basado en Git** (por ejemplo Decap CMS o Pages CMS, de código abierto): un formulario web que edita estos mismos datos y guarda el cambio en GitHub. Requiere pasar las noticias a archivos de datos (un archivo por entrada), configurar el acceso con la cuenta de GitHub y, en Vercel, un pequeño servicio de autenticación gratuito.
- **Requisitos antes de decidir**: quién publica, quién revisa, si cada publicación pasa por una vista previa antes de salir y cómo se conserva la verificación de enlaces.

Esta fase necesita aprobación expresa antes de empezar.
