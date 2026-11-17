# Hoja de ruta: mejoras futuras

Estas funcionalidades quedan **fuera del alcance del lanzamiento**. No se implementan, no se instalan dependencias para ellas ni se contratan servicios externos hasta que CBR las apruebe.

## Fuera del lanzamiento (decisión de alcance)

| Mejora | Estado | Qué implicaría |
| --- | --- | --- |
| Asistente de inteligencia artificial (chatbot) en la web | Futura, sin aprobar | Función de servidor en Vercel (`/api`), clave de una API de IA como variable de entorno, contenido de respaldo aprobado por CBR, límites de uso y de gasto, y actualización del aviso de privacidad. |
| Reserva de consultas con Google Calendar | Futura, sin aprobar | Desde una página de reservas de Google (sin código) hasta funciones `/api` con la API de Calendar; requiere definir el titular del calendario, horarios y duración. |
| Reservas hechas por el asistente | Futura, depende de las dos anteriores | Herramientas de disponibilidad y reserva validadas siempre en el servidor. |

Requisitos previos comunes: aprobación de CBR, presupuesto, cuenta propietaria del servicio, correo definitivo de Google Workspace y revisión del aviso de privacidad.

## Vigente en el lanzamiento

- Botones flotantes de WhatsApp (acción principal) e Instagram.
- Formulario de contacto (FormSubmit) con sus validaciones y alternativas por WhatsApp o correo.
- Sitio estático en Vite sin funciones de servidor.

## Otros pendientes que requieren aprobación de CBR

- Aviso de privacidad: mencionar a FormSubmit como encargado del envío del formulario.
- Resumen editorial de la Ley 30-26 (retirado; queda en `src/content/news.js`).
- Resumen de la noticia de facturas tipo «E» (verificar el enlace oficial de la DGII).
- Comprobar en el Vercel Preview la redirección 301 de la antigua URL de Ley 30-26 y el 404 real de rutas inexistentes.
