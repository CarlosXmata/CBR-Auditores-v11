# Lista para el día de la publicación

Pasos en orden. Cada uno dice quién lo hace y cómo saber que quedó bien. Ningún paso pide inventar datos: si Google pregunta algo que la clienta no ha confirmado (dirección, horario, zonas que atiende), se deja en blanco.

## Antes de empezar

- [ ] La rama con los cambios aprobados está unida a `main` y la versión de prueba se ve bien en computadora y en teléfono.
- [ ] Tener a mano el acceso a: Squarespace (donde está el dominio), la cuenta de Google de la firma, el correo info.cbrauditores@gmail.com y el teléfono de la firma (Google puede llamar o enviar un SMS para verificar).

## 1. Decidir dónde se aloja la web

**Recomendación: Cloudflare Pages.**

Razón principal: el plan gratuito de Vercel (Hobby) solo permite uso personal y no comercial, y la web de una firma de auditoría es comercial; para quedarse en Vercel habría que pagar el plan Pro (unos 20 USD al mes por persona). Cloudflare Pages permite uso comercial en su plan gratuito, sin límite de visitas, y además incluye las estadísticas sin cookies del paso 4. El proyecto ya tiene lista la configuración para Cloudflare (cabeceras de seguridad, redirección de la noticia retirada, bloqueo de las direcciones de prueba en Google) y una guía paso a paso en `HOSTING_CLOUDFLARE_PAGES.md`.

Lo que se pierde respecto a Vercel: la redirección de `cbrauditores.com` a `www.cbrauditores.com` ya no la hace la web; se configura una vez en Squarespace (apartado 5 de la guía).

Comparación rápida:

| | Vercel | Cloudflare Pages |
| --- | --- | --- |
| Precio para una web comercial | Plan Pro, unos 20 USD/mes | Gratis |
| Configuración en el proyecto | Lista (`vercel.json`) | Lista (`public/_headers` y `public/_redirects`) |
| Paso de `cbrauditores.com` a `www` | Lo hace Vercel | Se configura en Squarespace |
| Estadísticas sin cookies | De pago aparte | Incluidas y gratis |
| Formulario (FormSubmit) | Funciona igual | Funciona igual |

Pasos:

- [ ] Crear el proyecto en Cloudflare Pages siguiendo `HOSTING_CLOUDFLARE_PAGES.md` (apartados 3 a 6). Lo hace la persona técnica.
- [ ] Probar la dirección de prueba que da Cloudflare (termina en `.pages.dev`): todas las páginas, el menú en el teléfono, el botón de WhatsApp y una página inexistente, que debe decir «Este apartado no está disponible».
- [ ] Conectar `www.cbrauditores.com` a Cloudflare desde Squarespace y hacer que `cbrauditores.com` lleve a `www.cbrauditores.com`.
- [ ] Comprobar en el navegador: al escribir `cbrauditores.com` se termina en `https://www.cbrauditores.com` con el candado.
- [ ] Si existe un proyecto en Vercel, dejarlo encendido una o dos semanas y luego borrarlo, para que no haya dos copias de la web.

## 2. Comprobar que llegan los mensajes del formulario

El formulario envía los mensajes a info.cbrauditores@gmail.com a través de un servicio llamado FormSubmit. La primera vez que se usa desde una web nueva, FormSubmit manda un correo pidiendo activarlo; mientras no se active, los mensajes no llegan.

- [ ] Enviar una solicitud de prueba desde `www.cbrauditores.com/contacto`, con datos reales de la persona que prueba.
- [ ] Revisar info.cbrauditores@gmail.com, también la carpeta de spam. Si llega un correo de FormSubmit pidiendo activar, pulsar el botón de activación y volver a enviar la prueba.
- [ ] Confirmar que la segunda prueba llega como tabla con nombre, correo, teléfono, servicio y mensaje.
- [ ] Marcar como «No es spam» el correo de FormSubmit si cayó en spam, para que no vuelva a pasar.

## 3. Registrar la web en Google y en Bing

Esto no hace que la web aparezca más arriba, pero hace que Google y Bing la encuentren antes y avisa si algo falla.

**Google Search Console**

- [ ] Entrar en search.google.com/search-console con la cuenta de Google de la firma.
- [ ] Pulsar «Añadir propiedad» y elegir **Dominio**. Escribir `cbrauditores.com` (sin www).
- [ ] Google muestra un texto que empieza por `google-site-verification=`. Copiarlo.
- [ ] En Squarespace, en la configuración de DNS del dominio, añadir un registro **TXT** con ese texto (host `@`). Guardar.
- [ ] Volver a Search Console y pulsar «Verificar». Si falla, esperar una hora y repetir.
- [ ] En el menú «Sitemaps», escribir `https://www.cbrauditores.com/sitemap.xml` y pulsar «Enviar».
- [ ] En la barra de arriba, pegar `https://www.cbrauditores.com/` y pulsar «Solicitar indexación».

**Bing Webmaster Tools**

- [ ] Entrar en bing.com/webmasters con la misma cuenta de Google.
- [ ] Elegir **Importar desde Google Search Console**. Bing copia el sitio y el sitemap sin más verificación.
- [ ] Comprobar en «Sitemaps» que aparece `https://www.cbrauditores.com/sitemap.xml`.

## 4. Activar las estadísticas sin cookies

Las estadísticas de Cloudflare cuentan visitas y páginas vistas sin cookies, así que no hace falta el aviso de cookies.

- [ ] En Cloudflare, abrir el proyecto de la web → **Metrics** → **Web Analytics** → **Enable**.
- [ ] Al día siguiente, comprobar que aparecen visitas.

Límite: estas estadísticas no cuentan cuántas personas pulsan WhatsApp ni cuántas envían el formulario. Mientras tanto, contar a mano los mensajes que llegan por cada vía. Si más adelante se quiere medirlo, hace falta un cambio pequeño en la web y una herramienta que cuente «eventos».

## 5. Crear o reclamar el Perfil de Empresa en Google

Es lo que más ayuda a aparecer en búsquedas como «auditores en Santo Domingo» y en Google Maps. Lo hace la clienta, o alguien con ella al lado, porque Google verifica que el negocio es suyo.

- [ ] Entrar en business.google.com con la cuenta de Google de la firma y buscar «CBR Auditores & Consultores».
- [ ] Si ya existe un perfil y no es de la firma, pulsar **Solicitar acceso** y seguir los pasos. Si no existe, pulsar **Añadir empresa**.
- [ ] Nombre: «CBR Auditores & Consultores», tal cual, sin palabras añadidas.
- [ ] Categoría principal: la que más se acerque a «Auditor» o «Contable» de las que ofrece Google.
- [ ] Cuando pregunte si los clientes visitan un local, responder **No**. Así el perfil es de «zona de servicio» y no muestra dirección.
- [ ] Zonas de servicio: solo las que la clienta confirme que atiende. Si no está confirmado, poner «República Dominicana».
- [ ] Teléfono: +1 (849) 254-4460. Sitio web: `https://www.cbrauditores.com`.
- [ ] Horario: dejarlo en blanco hasta que la clienta lo confirme.
- [ ] Verificar el perfil por el método que ofrezca Google (llamada, SMS, correo o vídeo). Puede tardar varios días.
- [ ] Usar el mismo logo de la web como foto de perfil. No subir fotos del equipo hasta que la clienta las apruebe.

## 6. Última revisión, el mismo día

- [ ] Abrir `https://www.cbrauditores.com` en un teléfono y en una computadora: Inicio, Servicios, Nosotros, Contacto, Ley 155-17 y una noticia.
- [ ] Pulsar el botón de WhatsApp: debe abrir una conversación con +1 (849) 254-4460.
- [ ] Buscar en Google `site:cbrauditores.com` unos días después: deben salir las páginas de la web.
