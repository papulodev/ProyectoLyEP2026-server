# Spec 05 — Tests

## Objetivo

Cubrir el contrato de la API con tests automáticos, para que el equipo pueda
refactorizar sin miedo.

## Contexto

Hoy no hay tests. El frontend está en producción y depende de este contrato:
un test que falle debe avisar antes de que un cambio rompa a los usuarios.

## Alcance

Incluye:

- Suite de tests de integración sobre la app Express (`supertest`).
- Cobertura mínima: `GET /health`, `GET /users`, `GET /users/:id` (existente y 404),
  `POST /users`, `PUT /users/:id`, `DELETE /users/:id`.
- Base de datos de prueba (Mongo en memoria con `mongodb-memory-server`) para no
  tocar la base real.
- Script `npm test`.

No incluye:

- Tests end-to-end del frontend.
- Cobertura de las specs 03/04 (se agregan cuando esas ramas se integren).

## Archivos a tocar

- `package.json` — script `test` y devDependencies.
- `tests/clientes.test.js` (nuevo).
- `tests/setup.js` (nuevo) — arranque/parada de la base en memoria.

## Criterios de aceptación

- `npm test` corre en verde y no requiere una base real.
- Al menos un test de cada endpoint del contrato.
- Un cambio que rompa el shape (por ejemplo, sacar `name.lastname`) hace fallar la suite.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `tests`).

## Dependencias

Spec 01 (necesita los endpoints de escritura para cubrirlos).

## Definition of Done

- `npm test` en verde, con la salida pegada en el PR.
- PR abierto hacia `main`.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
