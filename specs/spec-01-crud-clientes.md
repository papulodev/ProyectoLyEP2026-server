# Spec 01 — CRUD completo de clientes

## Objetivo

Completar el CRUD sobre `/users` (crear, actualizar y eliminar), manteniendo el
mismo contrato JSON que el frontend ya consume.

## Contexto

La base ya resuelve `GET /users` y `GET /users/:id`. Falta el resto del contrato
drop-in de FakeStoreAPI. El frontend (`FormCliente.jsx`) envía
`{ nombre, email, telefono, ciudad }` y espera `respuesta.id` en el POST.

## Alcance

Incluye:

- `POST /users` -> crea un cliente, responde 201 con el cliente creado (incluye `id`).
- `PUT /users/:id` -> actualiza parcialmente, responde 200 con el cliente actualizado.
- `DELETE /users/:id` -> elimina, responde 200 con el cliente eliminado (o 204).
- Traducir el payload del frontend (`nombre`, `email`, `telefono`, `ciudad`) al
  shape de la base (`name.firstname`, `email`, `phone`, `address.city`).
- 404 uniforme cuando el `id` no existe.

No incluye:

- Validación profunda de payloads (spec 02).
- Autenticación (spec 03).

## Archivos a tocar

- `services/clientesService.js` -> agregar `crearCliente`, `actualizarCliente`, `eliminarCliente`.
- `controllers/clientesController.js` -> agregar los handlers.
- `routes/clientesRoutes.js` -> agregar las rutas POST/PUT/DELETE.

## Criterios de aceptación

- `POST /users` devuelve 201 y un body con `id` numérico; el `id` es auto-incremental.
- `PUT /users/:id` devuelve 200 y el documento actualizado.
- `DELETE /users/:id` deja de devolver el cliente en `GET /users`.
- Ningún `id` se repite, incluso con altas concurrentes.
- Ninguna respuesta incluye `_id` ni `password`.
- `POST`/`PUT`/`DELETE` sobre un `id` inexistente devuelve 404 con el shape de error.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `crud-clientes`).

## Dependencias

Ninguna (la base ya está en `main`).

## Definition of Done

- Código implementado y probado a mano con `curl` (o Postman/Thunder).
- Commits convencionales.
- PR abierto hacia `main` con la evidencia de las pruebas.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
