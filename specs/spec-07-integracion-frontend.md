# Spec 07 — Integración del frontend

## Objetivo

Migrar el frontend para que consuma este backend en lugar de FakeStoreAPI, sin
romper la experiencia actual.

## Contexto

El frontend hardcodea la URL de FakeStoreAPI en dos lugares:
`src/services/clientesService.js` (`URL_CLIENTES`) y `src/pages/ListaClientes.jsx`
(un `fetch` crudo). El login también está simulado en
`src/services/autorizacionesServices.js`.

> Repo del frontend: `ProyectoLyEP2026` (React + Vite). Está en producción:
> los cambios van en su propia rama y se prueban antes de mergear.

## Alcance

Incluye:

- Centralizar la base de la API en una variable `VITE_API_URL` (`.env` del frontend).
- Reemplazar las dos URLs hardcodeadas por la variable.
- Reemplazar el `fetch` crudo de `ListaClientes.jsx` por el servicio.
- Apuntar el login a `POST /auth/login` (cuando la spec 03 esté mergeada).
- Verificar `ListaClientes`, `DetalleCliente` y `FormCliente`.

No incluye:

- Rediseño de pantallas.
- Cambios en el backend.

## Archivos a tocar (frontend)

- `src/services/clientesService.js` — usar `import.meta.env.VITE_API_URL`.
- `src/pages/ListaClientes.jsx` — sacar el `fetch` crudo a fakestoreapi.
- `src/services/autorizacionesServices.js` — consumir `/auth/login`.
- `.env` / `.env.example` del frontend — documentar `VITE_API_URL`.

## Criterios de aceptación

- Ninguna referencia a `fakestoreapi.com` queda en el código.
- Lista, detalle y alta de clientes funcionan contra el backend nuevo.
- El login funciona contra `/auth/login`.
- Sin regresiones visibles en las pantallas existentes.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `integracion-frontend`; en el repo del frontend).

## Dependencias

Spec 01 y spec 03 mergeadas.

## Definition of Done

- Frontend probado contra el backend (local o la URL de Render).
- PR abierto hacia `main` con la evidencia.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
