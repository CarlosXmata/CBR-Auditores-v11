# Revisión de marketing, conversión y SEO (20/11/2026)

Rama: `mejoras-kit-emprendedor`, creada a partir de `mejoras-diseno-inicio`. Sin push, merge ni despliegue.

## 1. Cambios ya aplicados en esta rama

Son cambios técnicos. No tocan textos aprobados, el diseño ni el menú.

| Cambio | Detalle |
|---|---|
| Íconos regenerados desde el logo 4K | `favicon-32.png`, `favicon-192.png` y `apple-touch-icon.png`. El logo no se redibuja: solo se recortan los márgenes vacíos y se escala. Los íconos de app llevan fondo blanco, porque iOS pinta de negro el fondo transparente. |
| `favicon.ico` nuevo (16, 32 y 48 px) | Los navegadores y Google lo piden en `/favicon.ico`. Antes devolvía 404. |
| `site.webmanifest` + `icon-512.png` + `icon-maskable-512.png` | Ícono correcto al guardar la web en la pantalla de inicio del celular (Android). |
| `logo-cbr.png` (512 px) | El JSON-LD apuntaba al favicon de 192 px como logo. Ahora apunta a un logo de 512 px, que es lo que Google usa en los resultados. |
| Nueva imagen para compartir (`og-cbr.png`) | La anterior mostraba solo el globo, sin el nombre. La nueva lleva logo, nombre, áreas (Auditoría · Contabilidad · Impuestos · Ley 155-17) y "República Dominicana", con las fuentes y los colores de DESIGN.md. Pesa 66 KB, por debajo del límite de WhatsApp. |
| Texto alternativo de la imagen para compartir | Describe la imagen completa en vez de "Logotipo de…". |
| `.agents/product-marketing.md` | Documento base de posicionamiento para las skills de marketing. Los huecos quedan marcados como **Pendiente**. |
| `scripts/generar-iconos.py` | Regenera todos los íconos si el logo cambia. |

Verificado: `npm run build` y `npm test` (6/6) pasan; los archivos nuevos responden 200; la portada se ve igual en escritorio y móvil, sin errores en la consola.

## 2. Requieren aprobación de la clienta (por prioridad)

### Alta

1. **El texto de Outsourcing Estratégico usa "tú"**: "Enfócate en crecer. Nosotros nos ocupamos del resto." Choca con la regla de usted en todo el sitio. Propuesta: **"Enfóquese en crecer. Nosotros nos ocupamos del resto."** Es un texto aprobado, así que hace falta su visto bueno.
2. **Los botones flotantes tapan contenido.** En móvil cubren el chip "Sujetos Obligados" y en escritorio, parte de "Consultoría financiera" del panel. `CLAUDE.md` prohíbe que algo flotante tape contenido en móvil. Propuesta: mantener los dos botones, que es la decisión de la clienta, y añadir un margen inferior a la página igual a la altura de los botones (o reducirlos a solo ícono en móvil).
3. ~~El contenido no está en el HTML; solo los metadatos.~~ **Resuelto** en la rama `prerender-contenido` (commit `72e5ca8`): el prerender ahora escribe el contenido de cada página en el HTML con `renderToString` y React lo hidrata en el navegador.
4. **El correo público es un Gmail** y aparece debajo del formulario y en la cabecera. Para una firma de auditoría resta confianza. Conviene confirmar el correo de Google Workspace en `cbrauditores.com` antes del lanzamiento.

### Media

5. **Títulos y descripciones demasiado largos para Google.** Google corta los títulos de más de 60 caracteres y las descripciones de más de 160.

| Ruta | Actual | Propuesta |
|---|---|---|
| `/` título (82) | CBR Auditores & Consultores \| Firma de Auditoría, Contabilidad y Consultoría en RD | Auditoría, Contabilidad e Impuestos en RD \| CBR Auditores (57) |
| `/` descripción (207) | CBR Auditores & Consultores ofrece auditoría, contabilidad empresarial… | Firma dominicana de auditoría, contabilidad, impuestos y cumplimiento de la Ley 155-17. Trato directo con los socios. Solicite una consulta. (140) |
| `/servicios` descripción (194) | Outsourcing estratégico, auditoría y aseguramiento… | Outsourcing contable, auditoría, cumplimiento fiscal, consultoría financiera, valoración de negocios y soluciones contables en República Dominicana. (148) |
| `/quienes-somos` descripción (173) | Firma especializada en contabilidad… | Firma de contabilidad, auditoría, impuestos y consultoría para empresas, emprendedores, profesionales y Sujetos Obligados en República Dominicana. (146) |
| `/noticias` título (69) | Centro de Actualizaciones Profesionales \| CBR Auditores & Consultores | Actualizaciones DGII, TSS y Ley 155-17 \| CBR Auditores (54) |
| `/ley-155-17` descripción (170) | Acompañamiento a Sujetos Obligados… | Manual de prevención, matriz de riesgos, debida diligencia y evaluación independiente para Sujetos Obligados por la Ley 155-17 en RD. (133) |

6. **El inicio no menciona lo que distingue a la firma.** El H1 enumera servicios, lo cual es bueno para SEO, y la etiqueta superior dice "Firma consultora", que podría decirlo cualquier competidor. Propuesta de menor riesgo: mantener el H1 y cambiar solo la etiqueta superior a **"Trato directo con los socios · Ley 155-17"**. Ambos diferenciadores están confirmados en `PRODUCT.md`.
7. **El formulario obliga a elegir un servicio.** Quien no sabe cuál necesita se frena. Propuesta: añadir la opción **"Necesito orientación"** a la lista.
8. **El mensaje de envío no fija una expectativa.** "Nos pondremos en contacto pronto" funciona, pero si la clienta confirma un plazo (por ejemplo, un día hábil) conviene decirlo. Ese plazo también respaldaría "Respuesta rápida", que hoy aparece en las razones sin dato que la sostenga.
9. **El logo de la cabecera pesa 159 KB** para mostrarse a 44 px, y se carga en la cabecera y en el pie. Una copia escalada a 96 px pesaría unos 8 KB, con el mismo dibujo. Como `PRODUCT.md` exige usar el archivo original, hace falta autorización.

### Al publicar

10. Dar de alta el dominio en **Google Search Console** y en **Bing Webmaster Tools**, y enviar `sitemap.xml` a los dos.
11. Crear el **Perfil de Empresa en Google** como negocio de área de servicio (no exige mostrar dirección). Es lo que más pesa en búsquedas como "auditores en Santo Domingo".
12. Instalar analítica sin cookies, como Cloudflare Web Analytics, y medir los clics en WhatsApp y los envíos del formulario. Hoy no hay forma de saber qué convierte.
13. Hay configuración para dos hostings (`vercel.json` y `_headers`/`_redirects` de Cloudflare Pages), y `PRODUCT.md` dice Vercel. Conviene decidir uno y actualizar la documentación.

## 3. Datos que faltan (más confianza y mejor conversión)

Nada de esto se publica hasta que la clienta lo confirme: nombres, cargos y fotos de los socios; inscripción en el ICPARD y RNC; dirección y horario; sectores atendidos; testimonios con autorización. Es la mayor brecha de confianza del sitio y la que más ayuda a convertir visitas en consultas.
