# Spec 04 — Seguridad y hardening

## Objetivo

Endurecer el servicio para exponerlo en internet sin sorpresas.

## Contexto

El backend va a estar público en Render. Hoy tiene `helmet`, CORS configurable y
`express.json()`, pero falta limitar abuso, controlar CORS por entorno y validar
variables de entorno al arrancar.

## Alcance

Incluye:

- `express-rate-limit` en las rutas de escritura (`POST`/`PUT`/`DELETE`) y en `/auth/login`.
- Límite de tamaño del body (`express.json({ limit: '10kb' })`).
- CORS restrictivo en producción: exigir `CORS_ORIGIN` con los orígenes reales.
- Validación de variables de entorno al arrancar (fallar temprano y claro si falta
  `MONGODB_URI` en producción).
- Revisar que `helmet` no bloquee el consumo desde el frontend.
- Verificar que `.env` está ignorado por git.

No incluye:

- Rotación de credenciales ni gestión de secretos (decisión del equipo).

## Archivos a tocar

- `app.js` — rate limit, límite de body, CORS.
- `config/env.js` (nuevo) — validación de variables.
- `.gitignore` — confirmar `.env`.

## Criterios de aceptación

- Superar el límite de intentos devuelve 429.
- En producción, un origen no permitido no recibe cabeceras CORS de permiso.
- Si falta una variable crítica en producción, el arranque lo informa claramente.
- `git status` nunca muestra `.env`.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `seguridad`).

## Dependencias

Ninguna.

## Definition of Done

- Cambios implementados y verificados con `curl` (429, CORS).
- PR abierto hacia `main` con la evidencia.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
