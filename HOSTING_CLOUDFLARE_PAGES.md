# Alojamiento en Cloudflare Pages (plan gratuito)

Guía para publicar CBR Auditores & Consultores en Cloudflare Pages. El sitio es **estático** (React + Vite, prerenderizado por ruta): no usa funciones de servidor ni base de datos. El formulario de contacto sigue usando FormSubmit desde el navegador.

> **Estado de la migración:** preparada en la rama `infra/cloudflare-pages`. Se considera completada solo cuando la vista previa de Cloudflare esté probada (lista de comprobación del final) y el dominio `www.cbrauditores.com` funcione sobre Cloudflare. Hasta entonces, **Vercel sigue siendo el alojamiento vigente** y `vercel.json` no se elimina.

## 1. Archivos de este repositorio que Cloudflare lee

| Archivo | Para qué sirve |
| --- | --- |
| `public/_redirects` | Redirección 301 de la antigua URL de Ley 30-26 a `/noticias`. |
| `public/_headers` | Cabeceras de seguridad, caché de `/assets/*` y `X-Robots-Tag: noindex` en las direcciones `*.pages.dev`. |
| `vercel.json` | Se conserva sin cambios durante la migración (Vercel sigue activo). |

Vite copia todo `public/` a `dist/`, así que `_headers` y `_redirects` quedan en la raíz de `dist/` (comprobado en el build).

## 2. Equivalencias con Vercel

| Función | Vercel (`vercel.json`) | Cloudflare Pages |
| --- | --- | --- |
| URLs limpias (`/servicios` sirve `servicios.html`) | `cleanUrls: true` | Comportamiento por defecto de Pages: sirve `servicios.html` en `/servicios` y redirige `/servicios.html` a `/servicios`. |
| Sin barra final | `trailingSlash: false` | Comprobar en la vista previa (apartado 6). |
| Redirección 301 de Ley 30-26 | `redirects` | `public/_redirects` |
| Cabeceras de seguridad | `headers` `/(.*)` | `public/_headers` `/*` |
| Caché de `/assets/*` (un año, inmutable) | `headers` `/assets/(.*)` | `public/_headers` `/assets/*` |
| Página 404 con estado 404 | Rutas desconocidas reciben `404.html` | Pages sirve `404.html` en la raíz con estado 404 cuando existe y no hay `index.html` de respaldo para SPA que lo reemplace (el proyecto tiene `404.html`). |
| `cbrauditores.com` -> `www.cbrauditores.com` | Regla por host en `vercel.json` | **No va en Pages.** Se hace en Squarespace (apartado 5). |
| Vistas previas sin indexar | Automático | `X-Robots-Tag: noindex` en `*.pages.dev` desde `_headers`. |

Rutas prerenderizadas (12 más `404.html`): `/`, `/servicios`, `/quienes-somos`, `/ley-155-17`, `/noticias`, `/contacto`, `/aviso-privacidad` y cinco artículos en `/noticias/<slug>`.

## 3. Crear el proyecto en Cloudflare Pages

Requisitos: cuenta de Cloudflare (plan gratuito) y acceso de administración al repositorio `CarlosXmata/CBR-Auditores-v11`.

1. Entrar en el panel de Cloudflare -> **Workers & Pages** -> **Create** -> pestaña **Pages** -> **Connect to Git**.
2. Autorizar la aplicación de GitHub de Cloudflare y conceder acceso **solo** al repositorio `CBR-Auditores-v11`.
3. Seleccionar el repositorio y pulsar **Begin setup**.
4. Configurar:

   | Campo | Valor |
   | --- | --- |
   | Project name | `cbr-auditores` (la dirección será `cbr-auditores.pages.dev`; si está ocupado, usar otro y anotarlo) |
   | Production branch | `main` |
   | Framework preset | `Vite` (o `None`) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | vacío |

5. En **Environment variables (advanced)** añadir, para Production y Preview:
   - `NODE_VERSION` = `20`
6. Pulsar **Save and Deploy**. El primer despliegue construye la rama `main`.
7. Para probar esta rama antes de fusionar: el empuje de `infra/cloudflare-pages` genera una **vista previa** (Preview deployment) con dirección del tipo `https://<hash>.cbr-auditores.pages.dev` y un alias de rama (`https://infra-cloudflare-pages.cbr-auditores.pages.dev`). Si la rama no aparece, revisar en **Settings -> Builds & deployments -> Branch control** que las vistas previas estén activadas para todas las ramas.

> Nota: mientras `main` no contenga `public/_headers` ni `public/_redirects`, el despliegue de producción de Pages no los tendrá; las vistas previas de la rama `infra/cloudflare-pages` sí.

## 4. Variables y dependencias

- No hay variables secretas ni funciones de servidor. Solo `NODE_VERSION`.
- El build es `vite build` seguido de `node scripts/prerender.mjs` (ya incluido en `npm run build`).
- No se añadieron dependencias para esta migración.

## 5. Dominio personalizado (NO hacer hasta validar la vista previa)

Esta fase no cambia DNS ni nameservers. Cuando la vista previa y el despliegue de `main` estén validados:

1. En el proyecto de Pages -> **Custom domains** -> **Set up a custom domain** -> escribir `www.cbrauditores.com`.
2. Cloudflare indicará el registro que hay que crear. Como el DNS sigue en Squarespace, se crea ahí un registro **CNAME**: nombre `www`, destino `cbr-auditores.pages.dev` (o el nombre real del proyecto). Reducir antes el TTL del registro `www` actual para que el cambio y una posible reversión sean rápidos.
3. Esperar a que Pages muestre el dominio como activo y emita el certificado TLS. Verificar con la lista de comprobación del apartado 6, usando el dominio real.
4. **Redirección del dominio raíz:** en Squarespace, configurar la redirección permanente (301) de `cbrauditores.com` a `https://www.cbrauditores.com`, conservando `www` como dominio canónico. No se añade ninguna regla por host en `_redirects`.
5. **Reversión:** si algo falla, restaurar en Squarespace el registro `www` anterior (el que apunta a Vercel). Vercel permanece activo durante todo el proceso.

Antes de este paso, comprobar en la documentación de Cloudflare cómo se enlaza un subdominio cuyo DNS no está en Cloudflare, porque los requisitos pueden cambiar. Los límites del plan gratuito (builds por mes, número y tamaño de archivos) también deben consultarse allí; este proyecto genera pocos archivos pequeños.

## 6. Lista de comprobación de la vista previa

Sustituir `HOST` por la dirección de la vista previa (o `www.cbrauditores.com` al final). Estado esperado entre paréntesis.

```bash
# Rutas principales (200)
for r in "" servicios quienes-somos ley-155-17 noticias contacto aviso-privacidad \
  noticias/dgii-acompanamiento-facturacion-electronica-sin-multas \
  noticias/dgii-facturas-electronicas-tipo-e-grandes-locales-medianos \
  noticias/seguimiento-obligaciones-tss-empleadores \
  noticias/prensa-regulatoria-superintendencia-bancos-rd \
  noticias/ley-155-17-marco-prevencion-laft; do
  printf "/%s -> " "$r"; curl -s -o /dev/null -w "%{http_code}\n" "https://HOST/$r"; done

# Redirección de Ley 30-26 (301, Location: /noticias)
curl -sI https://HOST/noticias/ley-30-26-beneficios-fiscales-formalizacion | grep -iE "^HTTP|^location"

# Ruta inexistente (404 con el HTML de 404.html)
curl -s -o /dev/null -w "%{http_code}\n" https://HOST/ruta-que-no-existe
curl -s https://HOST/ruta-que-no-existe | grep -o "<title>[^<]*"   # Página no encontrada | CBR Auditores & Consultores

# URLs limpias: /servicios.html debe redirigir a /servicios; /servicios/ no debe romper
curl -sI https://HOST/servicios.html | grep -iE "^HTTP|^location"
curl -sI https://HOST/servicios/    | grep -iE "^HTTP|^location"

# Cabeceras de seguridad
curl -sI https://HOST/ | grep -iE "x-content-type-options|referrer-policy|x-frame-options|permissions-policy"

# Caché inmutable de /assets (sustituir por un archivo real de dist/assets)
curl -sI https://HOST/assets/<archivo-con-hash>.css | grep -i cache-control   # public, max-age=31536000, immutable

# Solo en *.pages.dev: noindex. En www.cbrauditores.com NO debe aparecer.
curl -sI https://HOST/ | grep -i x-robots-tag

# SEO: canonical y og:url deben apuntar a https://www.cbrauditores.com
curl -s https://HOST/servicios | grep -oE '<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>'
curl -s https://HOST/robots.txt
curl -s https://HOST/sitemap.xml | head -5
```

Comprobación visual (escritorio y móvil): Inicio, Servicios, Contacto y Noticias; botones de WhatsApp e Instagram; el formulario **no** se envía en las pruebas (los envíos reales los hace CBR al activar FormSubmit).

## 7. Qué no cambia

Diseño, textos, noticias, teléfono `+1 (849) 254-4460`, formulario de contacto (FormSubmit) y política de privacidad no se tocan en esta migración. La verificación semanal de noticias sigue ejecutándose en GitHub Actions, independiente del alojamiento.
