# Spec 06 — Deploy en Render

## Objetivo

Dejar el backend publicado en Render, con deploy automático desde `main` y health
check funcionando.

## Contexto

El repo ya trae `render.yaml` (blueprint) y `GET /health`. Falta conectar el
servicio, cargar las variables de entorno y verificar que responde en internet.

## Alcance

Incluye:

- Crear el Web Service en Render desde el blueprint (o a mano).
- Cargar secretos en el dashboard: `MONGODB_URI`, `CORS_ORIGIN`.
- Verificar en la URL pública: `/health` y `/users`.
- Cargar la semilla en la base de producción (`npm run seed` apuntando a Atlas).
- Documentar la URL pública en el `README.md`.

No incluye:

- Dominio propio.
- Cambios en el frontend (spec 07).

## Archivos a tocar

- `render.yaml` — ajustar si el plan/región cambia.
- `README.md` — documentar la URL y el proceso.

## Criterios de aceptación

- La URL pública de Render responde 200 en `/health`.
- `GET /users` devuelve los clientes de la semilla.
- Un push a `main` redeploya solo.
- Ningún secreto queda en el repositorio.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `deploy-render`).

## Dependencias

Ninguna.

## Definition of Done

- URL pública funcionando y documentada.
- PR abierto hacia `main` con la evidencia (captura o `curl`).
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
