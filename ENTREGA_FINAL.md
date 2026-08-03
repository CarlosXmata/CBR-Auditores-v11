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
- Teléfono: `(809) 323-4460`
- WhatsApp: `18093234460`
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

## Pendiente posterior a dominio
Cuando se compre/defina el dominio real, actualizar:
- `public/sitemap.xml`
- `public/robots.txt`
- URLs canónicas en `index.html`, si aplica.
