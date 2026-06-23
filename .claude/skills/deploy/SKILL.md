---
name: deploy
description: Build de producción + deploy a Vercel + verificación de rutas y assets en vivo (Essential Import)
disable-model-invocation: true
---

# Deploy a producción — Essential Import

Publica el estado actual del proyecto en producción (https://essential-import.vercel.app) vía **Vercel CLI**.

## Pasos

1. **Build local** (detectar errores antes de subir):
   - `npm run build`
   - Si el build falla, **detené el proceso y reportá el error. NO deployes.**

2. **Deploy a producción:**
   - `vercel --prod --yes`
   - Capturá la URL de *Production* y el `readyState` (debe ser `READY`).

3. **Smoke test en vivo** (confirmá HTTP 200 con `curl -s -o /dev/null -w "%{http_code}"`):
   - `/`, `/products`, `/login`, `/admin`
   - El bundle JS/CSS que referencia el HTML de `/`
   - Si tocaste assets de SEO: `/og-image.png`, `/robots.txt`, `/sitemap.xml`, `/favicon.svg`

4. **Reportá:** URL de producción, el resultado de cada check, y cualquier warning relevante del build.

## Notas

- **GitHub y Vercel NO están conectados:** este deploy NO depende de git. Pushear a GitHub no deploya.
- Para versionar además de publicar: `git add -A && git commit -m "..." && git push` (acción separada).
- Proyecto Vercel linkeado: `essential-import` (ver `.vercel/project.json`).
- `vercel.json` tiene rewrite SPA → todas las rutas devuelven 200 (la 404 se renderiza client-side).
- Si el build tira el warning de "chunks > 500 kB", es esperable (Firebase + Framer Motion); no es un error.
