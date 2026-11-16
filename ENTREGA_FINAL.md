# CBR Auditores & Consultores — Entrega final del proyecto web

## Versión
v11 — Entrega final para aprobación y publicación.

## Estructura principal aprobada
- Inicio
- Servicios
- Nosotros
- Contacto

## Apartados secundarios incluidos
- Centro de actualizaciones profesionales: `/noticias`
- Cumplimiento Ley 155-17: `/ley-155-17`
- Aviso de privacidad: `/aviso-privacidad`

Estos apartados se conservan fuera del menú principal para no cargar la navegación, pero quedan disponibles desde el footer y enlaces internos.

## Datos configurados
- Correo: `info.cbrauditores@gmail.com`
- Teléfono: `+1 (849) 254-4460`
- WhatsApp: `18492544460`
- Instagram: `https://www.instagram.com/cbrauditores/`

## Producción en Vercel
Configuración recomendada:
- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: vacío o `./`

## Importante sobre el formulario
El formulario usa FormSubmit. El primer envío puede requerir confirmación desde el correo `info.cbrauditores@gmail.com`.

## Dominio
Dominio oficial: `https://www.cbrauditores.com`. El dominio sin `www` debe redirigir a esa dirección.
`public/robots.txt`, las URLs canónicas, las etiquetas Open Graph (`src/seo.js`) y el `sitemap.xml`
(generado en el build por `scripts/prerender-meta.mjs`) ya apuntan a ese dominio. Pendiente: publicar el sitio y conectar el dominio en Vercel.
