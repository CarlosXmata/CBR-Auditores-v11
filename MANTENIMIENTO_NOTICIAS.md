# Mantenimiento del Centro de Actualizaciones Profesionales

## Objetivo
Mantener la web activa sin publicar contenido inventado. La sección debe funcionar como un centro de curaduría profesional con fuentes oficiales.

## Fuentes recomendadas
- DGII: https://dgii.gov.do/noticias/Paginas/default.aspx
- TSS: https://tss.gob.do/noticias/
- Superintendencia de Bancos: https://sb.gob.do/prensa/
- Ministerio de Trabajo: https://mt.gob.do/
- Otras fuentes oficiales vinculadas a impuestos, seguridad social, regulación, cumplimiento y finanzas empresariales.

## Frecuencia recomendada
2 a 4 actualizaciones mensuales.

## Criterio editorial
Cada actualización debe incluir:
- Título claro.
- Fecha.
- Categoría.
- Resumen breve.
- Fuente oficial.
- Enlace directo a la fuente oficial.
- Enfoque de impacto para empresas.

No copiar artículos completos. Solo resumir y enlazar.

## Dónde se edita
Archivo:
`src/App.jsx`

Buscar:
`const news = [`

Agregar o actualizar objetos dentro de esa lista.

## Proceso de publicación
1. Editar la noticia en `src/App.jsx`.
2. Ejecutar `npm run build` para validar.
3. Subir cambios a GitHub.
4. Vercel publicará automáticamente el cambio.
