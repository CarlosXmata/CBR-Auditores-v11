# CLAUDE.md: CBR Auditores & Consultores

Esta es la web corporativa de CBR Auditores & Consultores, una firma de auditoría, contabilidad, impuestos, consultoría financiera y cumplimiento de la Ley 155-17 en República Dominicana.

## Documentos de referencia (leer antes de trabajar)

- **`PRODUCT.md`**: público, propósito, posicionamiento, restricciones y material confirmado frente a material pendiente. Manda en todo lo que tiene que ver con el contenido.
- **`DESIGN.md`**: el sistema visual ("El Dictamen Firmado"). Manda en todo lo visual. Regenerado desde el código tras el rediseño; `.impeccable/design.json` es su complemento.
- **`MANTENIMIENTO_NOTICIAS.md`**: criterio editorial del Centro de Actualizaciones Profesionales.
- **`ENTREGA_FINAL.md`** y **`PRODUCCION.md`**: alcance aprobado de la versión v11 y configuración de Vercel.

Para trabajo de diseño se usa la skill **Impeccable** (`/impeccable …`), que lee `PRODUCT.md` y `DESIGN.md`.

## Stack

- React 18 + Vite, sin framework de estilos.
- Interfaz en `src/App.jsx` y estilos globales en `src/styles.css`. El router es propio y funciona por `window.location.pathname`.
- Comandos:
  - `npm run dev`: desarrollo.
  - `npm run build`: genera `dist/`.
  - `npm run preview`: sirve el build.
- Despliegue en Vercel con el preset Vite. Las rutas SPA se resuelven en `vercel.json`.

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

## Reglas visuales (resumen de DESIGN.md)

- **Paleta**: navy institucional, azul del logo como único color de acción, blanco cálido como fondo y dorado apagado como acento escaso.
- **Tipografía**: titulares en serif editorial y cuerpo en sans profesional, ambas autoalojadas. Solo se usan pesos que existan en la fuente.
- **Forma**: filetes de 1px, radios de 2 a 4px y superficies planas.
- **Prohibido** (aspecto SaaS):
  - degradados;
  - halos;
  - cuadrículas de fondo;
  - dashboards ficticios;
  - baldosas de icono;
  - sombras en reposo.
- **Accesibilidad**:
  - contraste AA en todo el texto de lectura;
  - foco visible en todos los controles;
  - respetar `prefers-reduced-motion`;
  - nada flotante que tape el contenido en móvil.

## Forma de trabajo con Git

- Los cambios visuales se hacen en una **rama independiente**, nunca directamente en `main`.
- **No hacer push, merge ni despliegue** sin autorización explícita.
- Antes de implementar un cambio de diseño, se presenta la propuesta y se espera la aprobación.
- Se verifica con `npm run build` y revisando el resultado en el navegador, en escritorio y en móvil, antes de dar algo por terminado.
