---
name: CBR Auditores & Consultores
description: Firma de auditoría, contabilidad, impuestos y cumplimiento en República Dominicana; la web como una oficina profesional clara, azul y ordenada ("Azul corporativo").
colors:
  bg: "#ffffff"
  wash: "#f5f8fd"
  wash-2: "#eaf1fb"
  card: "#ffffff"
  ink: "#1c2a40"
  ink-2: "#4b5870"
  ink-3: "#66748b"
  navy: "#0a1f4a"
  navy-deep: "#071633"
  blue: "#0f5bc8"
  blue-deep: "#0a3f93"
  blue-soft: "#dce9fb"
  green: "#12805c"
  green-wash: "#e7f5ef"
  line: "#e1e8f2"
  line-strong: "#c9d5e6"
  on-navy: "#f3f7fd"
  on-navy-2: "#b8c7de"
  line-navy: "rgba(243, 247, 253, 0.16)"
  error: "#a3261d"
  error-wash: "#fbf1ef"
gradients:
  button: "linear-gradient(135deg, #1763d1 0%, #0a2f74 100%)"
  band: "linear-gradient(135deg, #0a2559 0%, #0d4aaa 100%)"
  hero: "radial-gradient(900px 520px at 88% 8%, #dbe9fc 0%, transparent 70%), linear-gradient(180deg, #f6f9fe 0%, #ffffff 100%)"
  tile: "linear-gradient(135deg, #0a2e72 0%, #1366d6 100%)"
typography:
  display:
    fontFamily: "'Manrope Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.3rem + 2.8vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  display-page:
    fontFamily: "'Manrope Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 1.3rem + 2.6vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Manrope Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.25rem + 1.8vw, 2.625rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Manrope Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "'Inter Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "'Inter Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  eyebrow:
    fontFamily: "'Inter Variable', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.14em"
rounded:
  control: "12px"
  card: "22px"
  panel: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(64px, 8vw, 112px)"
  section-tight: "clamp(40px, 5vw, 72px)"
  container: "1200px"
components:
  button-primary:
    background: "{gradients.button}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "50px"
  button-quiet:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy}"
    border: "1px solid {colors.line-strong}"
    rounded: "{rounded.pill}"
  button-light:
    backgroundColor: "#ffffff"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "50px"
---

# Design System: CBR Auditores & Consultores

Dirección visual "Azul corporativo", aprobada por CBR sobre la referencia de diseño de la clienta. Sustituye al sistema anterior ("El Dictamen Firmado"). Este documento describe lo implementado en `src/styles.css`; si el código cambia, se actualiza aquí.

## Overview

Una oficina profesional clara: fondos blancos y azul muy pálido, titulares grandes en azul marino con una sans gruesa y moderna, tarjetas blancas con esquinas amplias y bandas de azul corporativo para los momentos de peso. La autoridad viene del orden, del contraste y de que cada actualización cita su fuente oficial, no de efectos.

**Rasgos:**

- Manrope 800 para titulares y cifras; Inter para leer y operar. Ambas autoalojadas (`@fontsource-variable`).
- Fondo blanco con un degradado azul muy suave en los hero; paneles y tarjetas blancas con filete de 1px y sombra suave.
- Botones en píldora con degradado azul corporativo; un único llamado a la acción con el mismo texto en todo el sitio.
- Bandas de degradado azul marino a azul corporativo para compromisos, Ley 155-17 y el cierre; pie en navy profundo.
- Elementos gráficos inspirados en el globo del logo, dibujados como SVG propio y decorativo (nunca el logo, nunca como marca de agua).
- Sin fotografía mientras no exista material real.

**Se rechaza:** el aspecto de plantilla SaaS genérica (métricas, clientes o gráficas inventadas, estados de cumplimiento ficticios, halos de neón, iconos en baldosas), cualquier serif en titulares y todo dato no confirmado.

## Colors

### Marca y acción
- **Azul CBR** (blue `#0f5bc8`): enlaces, foco, fecha de actualización, filtro activo, números de paso. Es el único color de acción.
- **Azul CBR Profundo** (blue-deep): hover de enlaces, categorías y lemas de servicio.
- **Azul Suave** (blue-soft): números grandes de las tarjetas de servicio y texto claro sobre bandas.

### Neutros
- **Navy** (navy `#0a1f4a`): titulares, nombre de marca, texto fuerte. **Navy Profundo** (navy-deep): fondo del pie.
- **Blanco** (bg, card): fondo y tarjetas. **Lavado** (wash `#f5f8fd`): secciones de apoyo y la tarjeta izquierda de pares.
- **Tinta** (ink), **Tinta 2** (ink-2) y **Tinta 3** (ink-3): texto de lectura, apoyo y placeholders (todos con contraste AA sobre blanco).
- **Filete** (line) y **Filete Marcado** (line-strong): bordes de 1px de tarjetas, campos y separadores.
- **Texto sobre azul** (on-navy, on-navy-2, line-navy): texto principal, de apoyo y divisores dentro de bandas y pie.

### Funcionales
- **Verde** (green, green-wash): solo el distintivo "Ley 155-17" y los checks de listas.
- **Error** (error, error-wash): alerta del formulario de contacto.

### Degradados (los únicos permitidos)
- **button**: botón primario. **band**: compromisos, Ley 155-17, cierre y la tarjeta azul de "Servicio diferencial". **hero**: fondo de los hero (resplandor azul pálido arriba a la derecha sobre blanco). **tile**: tarjetas azules del panel del hero.

**Reglas.** Ningún hex suelto fuera de los tokens. El verde no decora. Los degradados no se aplican a texto ni a otras superficies.

## Typography

**Display:** Manrope Variable (800 en titulares, 700 en títulos de lista). **Cuerpo e interfaz:** Inter Variable (400 a 600).

### Jerarquía
- **Display** (800, interlineado 1.06, tracking −0.035em, `text-wrap: balance`): tesis de cada página. Hero de Inicio: clamp(2.25rem → 3.5rem), limitado a 15ch. Páginas interiores: clamp(2.125rem → 3.25rem), 20ch.
- **Headline** (800, 1.12, −0.03em): titulares de sección, bandas y cierre. En la ficha de servicio baja a clamp(1.625rem → 2.25rem).
- **Title** (700, 1.25rem): títulos de tarjetas de servicio.
- **Lead** (Inter 400, clamp 1.0625rem → 1.1875rem, 1.65, máximo 60ch) y **Body** (Inter 400, 1rem, 1.65, máximo 66ch).
- **Eyebrow / label** (Inter 600, 0.75rem, mayúsculas, tracking 0.1 a 0.14em, azul): antetítulo del hero y rótulos de panel.
- **Texto de interfaz**: botones en Manrope 700 a 0.9375rem; navegación en Inter 500 a 0.9375rem; campos y listas en Inter 14 a 15px.

**Móvil:** los titulares conservan peso 800 y bajan por `clamp`; se anula el `max-width` en caracteres del hero para que el salto de línea lo decida el ancho. El cuerpo no baja de 16px.

**Reglas.** Solo pesos que existen en la fuente (Manrope 700/800, Inter 400/500/600). Cifras de fechas y pasos en `tabular-nums`. Nunca una serif en un titular.

## Layout

- Contenedor de 1200px con gutter fluido. Secciones de clamp(64px → 112px).
- **Hero de Inicio** a dos columnas (contenido comercial a la izquierda, panel visual a la derecha) con un globo vectorial decorativo detrás. Páginas interiores: hero claro con tesis a la izquierda y una tarjeta de apoyo (índice, datos) a la derecha.
- **Pares de tarjetas**: "Una firma cercana…" (blanca) y "Servicio diferencial" (azul), 50/50.
- **Servicios en Inicio**: cuadrícula de 3 columnas de tarjetas numeradas por contador CSS. En /servicios: una tarjeta ancha por servicio, cabecera a la izquierda y alcance a la derecha.
- **Actualizaciones**: lista de tarjetas con fecha en píldora azul, categoría en mayúsculas, titular y dos enlaces (resumen de CBR y fuente oficial).
- **Breakpoints**: 1240px oculta el correo del membrete; 1080px pasa el menú a botón y colapsa las retículas a una columna (servicios a 2 columnas); 720px reduce paneles, apila botones a ancho completo, deja el pie en una sola columna con enlaces de 8px de relleno vertical y el acceso de WhatsApp solo como icono.
- Membrete fijo de 76px (64px en móvil); el desplazamiento a anclas lo compensa.

## Elevation & Depth

Superficies blancas sobre fondo blanco o lavado, separadas por un filete de 1px y una sombra suave de dos capas (`--shadow`); las tarjetas interactivas suben 3px y toman `--shadow-lift` en hover. El panel del hero lleva una sombra larga azulada. El acceso de WhatsApp y el menú móvil llevan sombra por posición. Todo respeta `prefers-reduced-motion`.

## Shapes

- Radios: 12px en campos, 18 a 22px en tarjetas y bandas internas, 28px en el panel del hero, 999px en botones, etiquetas y filtros (14px en fechas largas de dos líneas).
- **Globo**: SVG propio de meridianos, paralelos y arcos en azul pálido, `aria-hidden`. Aparece detrás del hero y dentro del panel. Es ilustrativo: no representa datos.
- **Logo**: el original, 46px en el membrete y el pie (40px en móvil), sin tocar ni recolorear.
- Iconos de trazo de 1.8px, extremos redondeados, en `currentColor`.

## Components

### Botones
Píldora, alto mínimo de 50px, Manrope 700.
- **Primary:** degradado azul, texto blanco, sombra azul; en hover sube 1px. Es el único llamado a la acción y siempre dice "Solicitar una consulta".
- **Quiet:** blanco con borde `line-strong`, texto navy; en hover el borde pasa a azul. Se usa para acciones secundarias (WhatsApp, "Conocer la firma").
- **Light:** blanco sobre bandas azules (cierre, "Ver servicios").
- **Foco:** contorno azul de 2px a 3px (blanco dentro de bandas y pie).

### Panel del hero (ilustrativo)
Tarjeta blanca translúcida con: cabecera ("Áreas de práctica" y distintivo verde "Ley 155-17"), dos tarjetas azules con texto descriptivo, una franja con el globo y dos listas con enlaces reales (áreas clave y cumplimiento). **No contiene cifras, clientes, gráficas ni estados de cumplimiento**, y ningún texto del panel afirma un resultado.

### Tarjetas
Blancas, filete `line`, radio 22px. Variantes: servicio (número azul suave + título + línea del servicio), compromiso (translúcida sobre banda), Ley 155-17 (translúcida con check verde), paso y checklist (blancas con filete).

### Campos
Blancos, borde `line-strong`, radio 12px, alto 50px, etiqueta Inter 600 navy encima. Foco: borde azul y anillo azul de 3px al 20%. Error: alerta con borde de error y fondo `error-wash`.

### Filtros y etiquetas
Filtros de categoría en píldora de 42px; el activo (`aria-pressed`) se rellena de azul. La fecha de cada actualización es una píldora azul con texto blanco.

### Pie
Navy profundo con texto `on-navy-2`; en escritorio, marca a la izquierda y tres columnas (sitio, servicios, contacto); en móvil, una columna con separadores.

### Bloque informativo del boletín
Mientras no exista una integración real de suscripción, no hay formulario ni campo de correo: solo un texto y un enlace al Centro de Actualizaciones.

## Do's and Don'ts

**Hacer:** mantener un solo llamado a la acción con el mismo texto; conservar contraste AA; mantener foco visible y `prefers-reduced-motion`; mostrar solo contenido confirmado.

**No hacer:** inventar métricas, clientes, certificaciones o estados; usar serif en titulares; añadir degradados fuera de los cuatro listados; repetir o recolorear el logo; poner elementos flotantes que tapen contenido en móvil.
