# CLAUDE.md: CBR Auditores & Consultores

Esta es la web corporativa de CBR Auditores & Consultores, una firma de auditoría, contabilidad, impuestos, consultoría financiera y cumplimiento de la Ley 155-17 en República Dominicana.

## Documentos de referencia (leer antes de trabajar)

- **`PRODUCT.md`**: público, propósito, posicionamiento, restricciones y material confirmado frente a material pendiente. Manda en todo lo que tiene que ver con el contenido.
- **`DESIGN.md`**: el sistema visual ("Azul corporativo", Manrope e Inter). Manda en todo lo visual. `.impeccable/design.json` pertenece a la dirección anterior y está desactualizado.
- **`MANTENIMIENTO_NOTICIAS.md`**: criterio editorial del Centro de Actualizaciones Profesionales.
- **`ENTREGA_FINAL.md`** y **`PRODUCCION.md`**: alcance aprobado de la versión v11 y configuración de Vercel.

Para trabajo de diseño se usa la skill **Impeccable** (`/impeccable …`), que lee `PRODUCT.md` y `DESIGN.md`.

## Stack

- React 18 + Vite, sin framework de estilos.
- Interfaz en `src/App.jsx`, estilos globales en `src/styles.css`, noticias en `src/content/news.js` y metadatos SEO por ruta en `src/seo.js`. El router es propio y funciona por `window.location.pathname`.
- Comandos:
  - `npm run dev`: desarrollo.
  - `npm run build`: compila con Vite y ejecuta `scripts/prerender.mjs`, que escribe un HTML por ruta con title, description, canonical y Open Graph propios, `404.html` y `sitemap.xml`.
  - `npm run preview`: sirve el build.
  - `npm run news:check` y `npm run news:feeds`: verifican los datos y enlaces oficiales de las noticias y listan candidatos desde RSS oficiales (informan, no publican). GitHub Actions ejecuta la verificación cada lunes (`.github/workflows/news-check.yml`).
- Despliegue en Vercel con el preset Vite. `vercel.json`: URLs limpias (`/servicios` sirve `servicios.html`), redirección 301 de `cbrauditores.com` a `www.cbrauditores.com`, cabeceras de seguridad y caché de `/assets`. Las rutas desconocidas reciben `404.html` con estado 404.
- Dominio canónico: `https://www.cbrauditores.com` (definido en `src/seo.js`, `index.html` y `public/robots.txt`).
- Formularios (FormSubmit): campo trampa `_honey`, rechazo de envíos en menos de 2,5 s, tiempo límite de 15 s y alternativas por WhatsApp o correo si el envío falla.

## Reglas editoriales (no negociables)

1. **No inventar datos.** Mientras no estén confirmados, no se publica nada de lo siguiente, ni como contenido real ni como relleno:
   - nombres o cargos de socios;
   - fotografías del equipo;
   - RNC o registro ICPARD;
   - dirección o horario;
   - sectores atendidos;
   - clientes, testimonios o casos;
   - cifras o métricas.
2. **Los textos de los seis servicios están aprobados por la clienta.** Se conservan literalmente: no se reescriben, no se resumen con otras palabras ni se reordenan sin autorización.
   - En Inicio pueden mostrarse resumidos usando fragmentos literales del texto aprobado, como el título y el subtítulo.
3. **Trato de usted** en todo el sitio. Nada de "tú".
4. **Un solo llamado a la acción principal**, con el mismo texto en todo el sitio.
5. **Las noticias** siempre llevan fecha, categoría, resumen propio, fuente oficial y enlace a esa fuente. No se copian artículos.
6. **El correo público** sigue siendo `info.cbrauditores@gmail.com` hasta que se confirme la dirección definitiva de Google Workspace en `cbrauditores.com`.

## Reglas de arquitectura

- **El menú principal está aprobado** (Inicio, Servicios, Nosotros, Contacto) y no se modifica sin autorización explícita.
- **La Ley 155-17 gana protagonismo** con bloques y enlaces dentro de las páginas, no con un enlace nuevo en el menú.
- **El logo** es el archivo original `src/assets/cbr-logo.png`. No se redibuja, no se recolorea y no se repite como marca de agua.

## Reglas visuales (resumen de DESIGN.md; dirección "Azul corporativo", aprobada)

- **Paleta**: blanco, navy y azul corporativo; degradado azul muy suave en fondos de hero y degradado azul en botones y bandas; verde solo para el distintivo de la Ley 155-17.
- **Tipografía** (autoalojada): Manrope 700-800 para titulares; Inter 400-600 para texto, navegación y formularios. Sin serif en titulares.
- **Forma**: tarjetas blancas con radios amplios, botones en píldora, sombras suaves.
- **Panel del hero**: solo ilustrativo. Sin métricas, cifras de clientes, resultados ni estados de cumplimiento inventados; el globo es un dibujo propio, no el logo.
- **Logo**: sin tocar, sin marca de agua.
- **Accesibilidad**: contraste AA, foco visible, `prefers-reduced-motion`, nada flotante que tape el contenido en móvil.

## Forma de trabajo con Git

- Los cambios visuales se hacen en una **rama independiente**, nunca directamente en `main`.
- **No hacer push, merge ni despliegue** sin autorización explícita.
- Antes de implementar un cambio de diseño, se presenta la propuesta y se espera la aprobación.
- Se verifica con `npm run build` y revisando el resultado en el navegador, en escritorio y en móvil, antes de dar algo por terminado.
