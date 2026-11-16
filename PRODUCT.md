# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

CBR Auditores & Consultores atiende a cuatro perfiles con el mismo peso; la web no prioriza uno sobre otro:

- **Empresas medianas**: gerentes generales y directores financieros (CFO) que evalúan una firma externa de auditoría, contabilidad o impuestos.
- **Sujetos Obligados por la Ley 155-17**: oficiales de cumplimiento de entidades obligadas por la ley contra el lavado de activos y el financiamiento del terrorismo.
- **PYMEs y emprendedores**: dueños de negocios pequeños que necesitan tener al día la contabilidad, la DGII y la TSS.
- **Profesionales independientes**: personas físicas con obligaciones fiscales y sin estructura de empresa.

Todos visitan la web para decidir si confían en la firma lo suficiente como para pedir una reunión.

## Product Purpose

La web corporativa de una firma de auditoría, contabilidad, impuestos y consultoría financiera de República Dominicana. Su trabajo es generar confianza y convertirla en contacto: una solicitud de consulta por formulario, WhatsApp, teléfono o correo.

El éxito se mide en consultas cualificadas de los cuatro perfiles.

La web debe transmitir:

- autoridad profesional;
- confianza institucional;
- experiencia financiera;
- independencia y rigor;
- elegancia y sobriedad;
- cercanía empresarial.

## Positioning

Lo que distingue a CBR, confirmado por el responsable del proyecto:

- **Especialización en la Ley 155-17** (el diferencial principal): acompañar a los Sujetos Obligados desde el documento (manuales, políticas) hasta el control operativo demostrable (gestión, seguimiento, actualización y evidencia).
- **Trato directo con los socios**: el cliente trabaja con quien firma, no con un junior.
- **Servicio integral**: auditoría, contabilidad, impuestos y consultoría en una sola firma.
- **Rigor y trazabilidad**: el trabajo se apoya en evidencia y en fuentes oficiales, y el criterio técnico es demostrable.

## Operating Context

- **Entorno regulatorio dominicano**: DGII, TSS, Ministerio de Trabajo, Superintendencia de Bancos y Ley 155-17.
- **Canales de primer contacto**: WhatsApp, que es habitual en República Dominicana, además de formulario, teléfono y correo.
- **Centro de Actualizaciones Profesionales** (`/noticias`):
  - publica resúmenes breves de normas y avisos oficiales, cada uno con fecha, categoría, fuente oficial y enlace directo a esa fuente;
  - se actualiza de 2 a 4 veces al mes;
  - el criterio editorial está en `MANTENIMIENTO_NOTICIAS.md`: no se copian artículos completos, solo se resume y se enlaza.
- **Aprobación**: la clienta aprueba el contenido. Ningún texto aprobado se reescribe sin su autorización.

## Capabilities and Constraints

- **Stack**: SPA en React 18 + Vite.
  - Interfaz en `src/App.jsx`, estilos en `src/styles.css`, noticias en `src/content/news.js`, metadatos por ruta en `src/seo.js` y envío de formularios en `src/formSubmit.js`.
  - Router propio por `pathname`.
  - Despliegue en Vercel; la salida de build va a `dist`.
- **Dominio oficial**: `cbrauditores.com`.
  - El dominio está registrado en Squarespace Domains y el DNS se administra desde allí. No se tocan los registros MX, TXT, SPF, DKIM ni DMARC del correo.
  - El correo del dominio lo gestiona Google Workspace.
  - **Pendiente**: confirmar la dirección pública profesional definitiva. Hasta entonces, el correo público sigue siendo `info.cbrauditores@gmail.com`.
  - Dominio canónico: `www.cbrauditores.com` (confirmado). El `sitemap.xml` y el HTML con metadatos de cada ruta se generan en cada build (`scripts/prerender-meta.mjs`); `vercel.json` redirige `cbrauditores.com` a `www`.
  - El sitio aún no está publicado ni conectado al dominio.
- **Navegación principal aprobada**: Inicio, Servicios, Nosotros y Contacto.
  - No se modifica sin autorización.
  - La Ley 155-17, Noticias y el Aviso de privacidad son apartados secundarios: se llega a ellos desde el pie de página y desde enlaces internos.
- **Rutas**: `/`, `/servicios`, `/quienes-somos`, `/contacto`, `/noticias`, `/noticias/<slug>`, `/ley-155-17`, `/aviso-privacidad`.
- **Servicios**: seis líneas editoriales aprobadas por la clienta. Sus textos se conservan literalmente, sin reescribirlos.
  - Outsourcing Estratégico
  - Auditoría y Aseguramiento
  - Estrategia y Cumplimiento Fiscal
  - Consultoría Financiera Corporativa
  - Estrategia y Valoración de Negocios
  - Soluciones Contables Especializadas
- **Formularios**: contacto y boletín funcionan con FormSubmit. El primer envío exige confirmarlo desde el correo de destino.
- **Contacto vigente**:
  - teléfono: +1 (849) 254-4460; WhatsApp: 18492544460;
  - Instagram: @cbrauditores;
  - correo: `info.cbrauditores@gmail.com`.
- **Idioma**: español de República Dominicana (`es-DO`).

- **Decisión abierta**: la clienta debería poder actualizar el Centro de Actualizaciones por su cuenta, sin editar código. Hoy las noticias viven en `src/content/news.js` (un archivo de datos, todavía editado por el desarrollador). Cómo cumplirlo (gestor de contenido u otro) está pendiente de consultar.

## Brand Commitments

- **Nombre**: "CBR Auditores & Consultores".
- **Logo**: se usa el archivo original existente, `src/assets/cbr-logo.png`, sin redibujarlo ni alterarlo.
- **Lema en uso**: «Orden · Cumplimiento · Confianza».
- **Trato al visitante**: siempre de **usted**, en todo el sitio.
- **Llamado a la acción principal**: uno solo, con el mismo texto en todo el sitio.
- **Dirección visual fijada por el responsable del proyecto**: navy profundo, el azul del logo como acento principal, blanco cálido y dorado apagado como acento secundario moderado. Titulares en serif editorial, cuerpo en sans serif profesional, espaciado generoso, filetes sutiles, tarjetas poco redondeadas y fotografía real cuando exista. El desarrollo completo está en `DESIGN.md`.

## Evidence on Hand

**Confirmado y disponible:**

- el logo original;
- el dominio `cbrauditores.com`;
- los textos de los seis servicios (`src/App.jsx`);
- las noticias, cada una con su fuente oficial enlazada;
- teléfono, WhatsApp e Instagram;
- el JSON-LD `ProfessionalService` de `index.html`.

**Sin confirmar. No se inventa, no se rellena con contenido comercial provisional y no se presenta como real:**

- fotografías reales de socios o empleados;
- nombres y cargos de los socios;
- RNC e inscripción en el ICPARD;
- dirección física y horario;
- sectores empresariales atendidos;
- clientes, testimonios y casos de éxito;
- dirección de correo profesional definitiva.

El diseño puede prever un lugar para cada uno de estos elementos en una iteración futura, pero ese espacio no se publica vacío ni con texto de relleno.

## Product Principles

1. **La confianza se demuestra, no se declara**: con fuentes oficiales y, cuando estén confirmadas, con personas y credenciales reales. Nunca con métricas decorativas ni con estados simulados.
2. **Se vende criterio profesional, no software**: la firma es el producto, y la web debe sentirse como un documento profesional, no como una aplicación.
3. **Ningún perfil queda relegado**: los cuatro tipos de cliente encuentran su camino, y la Ley 155-17 gana protagonismo sin tocar la navegación aprobada.
4. **Hay que facilitar el contacto sin cargar la decisión**: un solo llamado a la acción coherente, y canales que no se repitan en la misma vista.
5. **El contenido aprobado es intocable**: el diseño transforma la forma, no las afirmaciones.

## Accessibility & Inclusion

- **Objetivo**: WCAG 2.1 AA, pendiente de confirmar. Incluye contraste AA en el texto de lectura y foco visible en todos los controles.
- **Movimiento**: respetar `prefers-reduced-motion`.
- **Móvil**: es un contexto principal, porque el contacto llega a menudo por WhatsApp. Esto es una inferencia y está pendiente de confirmar.
