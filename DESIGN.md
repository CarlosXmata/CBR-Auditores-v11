---
name: CBR Auditores & Consultores
description: Firma de auditoría, contabilidad, impuestos y cumplimiento en República Dominicana; el azul del logo como superficie que estructura la web.
colors:
  blue: "#0455bb"
  blue-deep: "#003f99"
  sky: "#dbedfc"
  navy: "#0b1f3a"
  mist: "#eef6fe"
  white: "#ffffff"
  ink: "#142238"
  ink-2: "#4a5568"
  ink-3: "#6b7280"
  rule: "#d6e2f0"
  rule-strong: "#b6cbe3"
  on-blue: "#ffffff"
  on-blue-2: "#c9dcf6"
  on-navy-2: "#b9c9df"
  rule-on-dark: "rgba(255, 255, 255, 0.22)"
  error: "#a3261d"
  error-wash: "#fbf1ef"
typography:
  numeral-chapter:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3rem, 2rem + 3vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  numeral-law:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 2rem + 2.6vw, 4.25rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.375rem, 1.35rem + 2.8vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-0.018em"
  hero-title:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 1.4rem + 2.6vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  lema:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 1.4rem + 2.2vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  ink-statement:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 1.3rem + 2.4vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.875rem, 1.3rem + 1.8vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.012em"
  headline-service:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.3vw, 2.375rem)"
    fontWeight: 500
    lineHeight: 1.14
  headline-sm:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.2
  title-lg:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.25
  title-sm:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  title-xs:
    fontFamily: "'Source Serif 4 Variable', Georgia, 'Times New Roman', serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
  lead:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  prose:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  ui:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.55
    letterSpacing: "0.01em"
  label:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.06em"
  meta:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.04em"
  brand-sub:
    fontFamily: "'Public Sans Variable', 'Segoe UI', system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.08em"
rounded:
  sm: "2px"
  md: "4px"
spacing:
  gutter: "clamp(20px, 4vw, 48px)"
  section: "clamp(80px, 9vw, 128px)"
  column-gap: "32px"
  header: "76px"
  header-mobile: "64px"
  container: "1240px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.ui}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.blue-deep}"
    textColor: "{colors.white}"
  button-primary-lg:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 28px"
    height: "54px"
  button-white:
    backgroundColor: "{colors.white}"
    textColor: "{colors.blue}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-white-hover:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.blue-deep}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-quiet-hover:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.blue}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "44px"
  filter-chip-active:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "11px 14px"
    height: "48px"
  practice-cell:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.navy}"
    padding: "30px 30px 26px"
  practice-cell-hover:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
  update-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "26px"
  sheet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "24px"
  whatsapp-float:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    size: "48px"
---

# Design System: CBR Auditores & Consultores

## Overview

**Creative North Star: "Confianza en azul"**

El azul del logo deja de ser un acento y se convierte en la superficie que ordena el sitio. Cada recorrido alterna bloques reales de color (azul de marca y navy) con blanco y bruma azul: el azul abre las páginas interiores, sostiene el panel del hero, carga la propuesta de valor y cierra las páginas con la acción principal. La firma se presenta seria y cercana a la vez.

La densidad es editorial y contenida: retícula de 12 columnas, titulares en serif con tamaño óptico, cuerpo en sans de lectura y filetes de 1 px como única estructura visible. No hay sombras, degradados ni volumen: la profundidad la da el cambio de superficie. El único recurso gráfico es un juego de anillos discontinuos que cita el globo del logo, siempre lejos del texto.

El sistema rechaza la página beige con detalles azules (el sistema anterior, «El Dictamen Firmado», queda sustituido por completo) y la landing SaaS: dashboards ficticios, métricas, insignias, degradados, halos y tarjetas anidadas.

**Key Characteristics:**
- Bloques de color sólido medidos del logo: azul, azul profundo y esfera, con navy y bruma derivados. Sin dorado.
- Serif editorial (Source Serif 4) para titulares; Public Sans para todo lo funcional.
- Filetes de 1 px, radios de 2–4 px, superficies planas, cero sombras en reposo.
- Anillos discontinuos del globo como único motivo, siempre fuera del texto.
- Tres interacciones de firma: celdas de práctica que pasan a azul, declaración que se ilumina palabra a palabra, metodología en capítulos fijados.

## Colors

Una familia de azules medida del logo original (`src/assets/cbr-logo.png`), con navy de soporte y neutros fríos; sin segundo color de acento.

### Primary
- **Azul CBR** (blue): el trazo del logo (55 % de los trazos). Único color de acción: botones, enlaces, foco, filtros activos, puntos de lista y de hechos. También superficie protagonista: cabecera de páginas interiores, panel del hero de Inicio, propuesta de valor, banda azul de Nosotros y cierre comercial. Blanco sobre azul 6,95:1; azul sobre blanco 6,95:1; azul sobre bruma 6,37:1.
- **Azul profundo** (blue-deep): el trazo más oscuro del logo. Solo estados hover (botón primario, enlaces, WhatsApp, texto del botón blanco). Blanco sobre azul profundo 9,67:1.
- **Esfera** (sky): la esfera del logo (24,5 %). Anillos, segunda línea del lema y del lema de Nosotros, numeral de la Ley 155-17, nodos de la ruta de ley, pista de la barra de capítulos, hover del botón blanco. Sobre azul 5,80:1; sobre navy 13,79:1.

### Secondary
- **Navy institucional** (navy): derivado. Titulares sobre claro, bloques de la Ley 155-17, banda de nota en Servicios, pie y fondo del acceso a WhatsApp.

### Neutral
- **Blanco** (white): fondo base del sitio y de hojas, tarjetas y formularios.
- **Bruma azul** (mist): secciones alternas, celdas de práctica en reposo, nota de fuente, hover de controles secundarios.
- **Tinta** (ink): texto de lectura sobre blanco (15,96:1).
- **Tinta 2** (ink-2): cuerpo secundario, entradillas, metadatos (7,53:1 sobre blanco; 6,90:1 sobre bruma).
- **Tinta 3** (ink-3): placeholders y nada más largo que eso (4,83:1 sobre blanco).
- **Filete** (rule) y **filete fuerte** (rule-strong): divisorias de 1 px; el fuerte para bordes de controles y cabeza de listas.
- **Texto sobre oscuro** (on-blue, on-blue-2, on-navy-2, rule-on-dark): blanco para titulares; on-blue-2 para cuerpo y palabras aún no iluminadas sobre azul (4,98:1); on-navy-2 para cuerpo sobre navy (9,82:1); filete translúcido sobre azul y navy.
- **Error** (error, error-wash): solo alertas y estados de formulario (6,64:1).

### Named Rules
**The Measured Blue Rule.** Los azules de marca son los medidos del logo; no se ajustan a ojo ni se añaden tonos nuevos. Cualquier derivado se queda en el mismo tono.

**The One Action Color Rule.** El azul es el único color interactivo. El navy estructura, la esfera decora, el dorado no existe.

**The Real Blocks Rule.** El azul aparece como superficie a sangre completa, no como borde de color ni como tinte de tarjeta. Toda página interior abre con la cabecera azul.

## Typography

**Display Font:** Source Serif 4 Variable (con Georgia, 'Times New Roman', serif), con tamaño óptico automático.
**Body Font:** Public Sans Variable (con 'Segoe UI', system-ui, sans-serif).

Ambas autoalojadas con `@fontsource-variable` (`source-serif-4/opsz.css`, `public-sans/wght.css`).

**Character:** Serif editorial a peso medio para todo lo que se lee como titular; sans pública, neutra y legible, para cuerpo, controles y etiquetas.

### Hierarchy
Escala completa tal como se usa en `src/styles.css`. Serif a 500 en titulares grandes, 600 en títulos de bloque y 400 en frases destacadas.

- **Numeral de capítulo** (500, clamp(3rem, 2rem + 3vw, 4.5rem), 1): número del paso fijado en la metodología.
- **Numeral de ley** (500, clamp(2.75rem, 2rem + 2.6vw, 4.25rem), 1): «Ley 155-17» en esfera dentro del titular del bloque de ley.
- **Display** (500, clamp(2.375rem, 1.35rem + 2.8vw, 4rem), 1.06): H1 de las páginas interiores.
- **Titular del hero** (500, clamp(2.5rem, 1.4rem + 2.6vw, 3.75rem), 1.04): H1 de Inicio, con un tramo en azul.
- **Lema** (500, clamp(2.25rem, 1.4rem + 2.2vw, 3.5rem), 1.04): «Orden. Cumplimiento. Confianza.» en el panel azul.
- **Declaración de tinta** (500, clamp(2rem, 1.3rem + 2.4vw, 3.25rem), 1.14, máx. 26ch): propuesta de valor.
- **Headline** (500, clamp(1.875rem, 1.3rem + 1.8vw, 2.75rem), 1.14): H2 de sección y título del capítulo fijado.
- **Headline de servicio** (500, clamp(1.75rem, 1.3rem + 1.3vw, 2.375rem)): H2 de cada servicio.
- **Headline pequeño** (1.75rem, 1.2): H2 de canales en Contacto; lema de Nosotros en serif 400.
- **Título grande** (600, 1.5rem): título del formulario de contacto.
- **Título** (600, 1.375rem): celdas de práctica, sujetos obligados, pasos de la metodología; a 400 en la cita destacada y la banda de nota.
- **Título pequeño** (600, 1.25rem): tarjetas de actualización, nota de fuente, obligaciones, preguntas frecuentes, menú móvil; a 400 en el subtítulo de servicio.
- **Título mínimo** (600, 1.1875rem): nombre de marca y pasos de la ruta de ley.
- **Entradilla** (400, clamp(1.125rem, 1rem + 0.35vw, 1.25rem), 1.6, máx. 58ch).
- **Prosa** (400, 1.125rem, 1.75, máx. 66ch): ficha de noticia. El mismo paso sirve para el título de la tarjeta del hero (serif 600) y la pregunta frecuente a ≤720 px.
- **Cuerpo** (400, 1.0625rem, 1.65, máx. 66ch): texto base; baja a 1rem a ≤720 px. A 600 en los subtítulos de la banda de valor y de los motivos; serif 600 en la ruta de ley.
- **Cuerpo pequeño** (400, 1rem, 1.5): listas de alcance y de sujetos, botón grande.
- **UI** (600, 0.9375rem, 0.01em): botones, navegación, enlaces de celda y de tarjeta, enlaces del pie, Instagram.
- **Etiqueta** (600, 0.875rem, 0.06em): rótulos de lista, hechos del hero, campos de formulario, metadatos de tarjeta (400). Sin mayúsculas forzadas.
- **Meta** (600, 0.8125rem, 0.04em): términos de hoja y de canales, encabezados del pie, fecha de la tarjeta del hero, base del pie.
- **Submarca** (400, 0.75rem, 0.08em): «& Consultores» junto al logo.

### Named Rules
**The Real Weights Rule.** Solo pesos que existen en la fuente variable cargada: 400, 500 y 600.

**The No Eyebrow Rule.** Ningún titular lleva rótulo encima. Las etiquetas de 0.875rem rotulan listas y datos, nunca anuncian un titular.

## Layout

Retícula de 12 columnas con 32 px de separación dentro de un contenedor de 1240 px y margen lateral fluido (gutter). El ritmo vertical de sección es `section`; el hero y los bloques azules usan pasos propios algo mayores (hasta 152 px en la propuesta de valor). Los textos largos se limitan a 58–66ch.

Composiciones recurrentes: hero dividido 6/6 en Inicio (texto a la izquierda; panel azul con lema y tarjeta de la última actualización a la derecha); cabecera de sección con título en 1–6 y contexto en 8–12; enunciados 5/6; cabeceras interiores con principal en 1–7 y hoja en 9–12; servicios y preguntas frecuentes con encabezado sticky a la izquierda. Bajo el texto del hero, una fila de hechos verificables separada por un filete, cada uno precedido de un punto azul de 5 px.

**Breakpoints** (escritorio primero):
- **≤1080 px:** casi todas las retículas de dos columnas se apilan; práctica y actualizaciones pasan a 2 columnas, banda de valor y motivos a 2, flujo de ley a 3; desaparece la columna fijada de capítulos y los encabezados sticky se vuelven estáticos; los anillos se reducen.
- **≤960 px:** el menú aprobado y el CTA de cabecera ceden al botón de menú; el hero dividido se apila; los anillos de las cabeceras interiores se retiran.
- **≤720 px:** reglas de teléfono: cabecera de 64 px, cuerpo a 1rem, acciones del hero y del cierre a ancho completo, hechos del hero en columna, todo a una columna, flujo de ley vertical, anillos de la propuesta de valor retirados.

**The Gutter Rule.** Nada flotante sobre el contenido: el único elemento fijo (WhatsApp) vive en el margen, fuera de los 1240 px, en pantallas anchas, y a 14 px de la esquina en las estrechas.

## Elevation & Depth

Sistema plano. No hay sombras en reposo ni en hover; la profundidad se expresa cambiando de superficie (blanco, bruma, azul, navy) y con filetes de 1 px. La única sombra del sitio es el anillo de foco de los campos de formulario.

### Shadow Vocabulary
- **Anillo de foco de campo** (`box-shadow: 0 0 0 3px rgba(4, 85, 187, 0.2)`): solo en `:focus` de input, select y textarea, junto al borde azul.

### Named Rules
**The Flat Surface Rule.** Si algo necesita destacar, cambia de superficie o de color de filete; nunca se eleva.

## Shapes

Esquinas casi rectas: 4 px en botones, campos, tarjetas, hojas, panel del hero y WhatsApp; 2 px en el contorno de foco. Filetes de 1 px como estructura (cabecera, listas, datos, pie). Los únicos círculos son funcionales: puntos de lista y de hechos (5–8 px, azul), nodos de la ruta de ley (11–15 px, contorno en esfera) y el disco blanco tras el logo en el pie.

**The Globe Rings Rule.** El único motivo gráfico son cuatro anillos concéntricos discontinuos (`Rings` en `src/components/icons.jsx`), en esfera con opacidades de .22 a .5, que citan el globo del logo. Se sangran fuera de la esquina de un bloque azul y nunca cruzan texto: en el hero de Inicio viven en la esquina inferior derecha del panel, bajo la tarjeta blanca; las cabeceras interiores los muestran salvo con `rings={false}` (Nosotros, cuyo lema va directamente sobre el azul); se retiran de las cabeceras interiores a ≤960 px y de la propuesta de valor a ≤720 px.

## Components

### Buttons
Sobrios y decididos: rectángulos de 4 px en sans 600.
- **Primario:** fondo azul, texto blanco, 48 px de alto; grande 54 px. Hover a azul profundo; al pulsar baja 1 px.
- **Blanco:** sobre bloques azules (cierre comercial). Texto azul; hover a esfera con texto azul profundo.
- **Discreto:** transparente, texto azul, borde filete fuerte; hover en bruma con borde azul. Admite dos líneas.
- **Enlace de texto:** azul 600 con subrayado de 1 px al 35 % que se completa en hover; la flecha avanza 3 px. Variante clara sobre azul.
- **CTA único:** el texto sale de `CTA_LABEL` («Solicitar una consulta») en `src/config/site.js`; nunca se escribe a mano.

### Chips
- **Filtros de noticias:** 44 px, borde filete fuerte, texto tinta; activo (`aria-pressed`) en azul con texto blanco 600.

### Cards / Containers
- **Tarjeta de actualización:** blanco, filete de 1 px, 4 px; el borde pasa a azul en hover. En secciones de bruma el filete es transparente.
- **Hoja:** bloque blanco dentro de la cabecera azul, con índice o datos; nunca contiene otra tarjeta. Contacto abre sin hoja (desviación citada: el formulario es la hoja).
- **Tarjeta del hero:** blanco sobre el panel azul con la última actualización oficial real.
- **Nota de fuente:** bruma con filete, junto a la ficha de noticia.

### Inputs / Fields
- **Estilo:** blanco, borde filete fuerte, 4 px, 48 px de alto (textarea 140 px); etiqueta navy 600 encima.
- **Hover / Focus:** borde a tinta 2; en foco, borde azul más el anillo translúcido.
- **Error:** alerta con borde error sobre error-wash y alternativas (WhatsApp, correo) en azul.

### Navigation
- **Membrete:** cabecera blanca sticky (76 px; 64 px en móvil) con filete inferior; logo original a 44 px y nombre en serif 600.
- **Menú aprobado:** Inicio, Servicios, Nosotros, Contacto (`NAV_ITEMS`); activo en azul 600 con subrayado de 2 px; seguido del botón primario.
- **Móvil (≤960 px):** botón de menú de 44 px con borde; panel con enlaces serif separados por filetes y el CTA a ancho completo. Cierra con Escape o clic fuera.

### Celdas de práctica (firma)
Seis celdas en bruma unidas por filetes de 1 px. Al pasar o enfocar, la celda entera pasa a azul y su texto a blanco; el foco usa un contorno blanco interior para mantener el contraste.

### Declaración de tinta (firma)
En la propuesta de valor, la frase serif empieza en on-blue-2 y se ilumina a blanco palabra a palabra al desplazarse. Con movimiento reducido aparece entera iluminada. Lleva el texto completo como nombre accesible.

### Capítulos de metodología (firma)
En Nosotros, columna fijada con numeral azul, título y una pista de 3 px en esfera que se llena en azul según el paso; el paso activo de la lista pasa de tinta 2 a navy. A ≤1080 px la columna fijada desaparece y la lista queda en navy.

### Bloque Ley 155-17
Sección navy con titular, ruta de pasos con nodos circulares en esfera (el último relleno) y, en la página propia, flujo de seis pasos que se vuelve vertical en móvil.

### Acceso a WhatsApp
Un único cuadrado navy de 48 px solo con icono (nombre accesible en `aria-label`), hover a azul profundo; en el margen en pantallas anchas; oculto en `/contacto`. Instagram nunca flota.

### Motion
Transiciones de 0.2–0.35 s; desplazamientos con `cubic-bezier(0.16, 1, 0.3, 1)`. Entrada del hero: subida de 14 px escalonada. Con `prefers-reduced-motion: reduce` se anulan animaciones y transiciones.

## Do's and Don'ts

### Do:
- **Do** usar el azul #0455bb como superficie a sangre completa en aperturas, panel del hero, propuesta de valor y cierre.
- **Do** alternar blanco, bruma, azul y navy para separar módulos, con filetes de 1 px dentro de cada uno.
- **Do** mantener el texto de lectura en AA: tinta o tinta 2 sobre claro, blanco u on-blue-2 sobre azul, on-navy-2 sobre navy.
- **Do** sacar contacto, CTA, menú y fuentes oficiales de `src/config/site.js`.
- **Do** dar foco visible a todo control: contorno de 2 px azul, blanco sobre azul y navy.
- **Do** dejar los anillos del globo fuera del texto y retirarlos cuando el texto ocupa el ancho.
- **Do** usar el logo original sin modificar; sobre navy, sobre su disco blanco.

### Don't:
- **Don't** usar degradados, halos ni cuadrículas de fondo.
- **Don't** mostrar dashboards ficticios, métricas ni cifras.
- **Don't** usar baldosas de icono ni tarjetas anidadas.
- **Don't** poner rótulos (eyebrows) encima de los titulares.
- **Don't** usar sombras en reposo ni elevar en hover.
- **Don't** introducir dorado ni un segundo color de acento.
- **Don't** usar radios de más de 4 px ni formas de pastilla.
- **Don't** colocar nada flotante que tape contenido en móvil.
