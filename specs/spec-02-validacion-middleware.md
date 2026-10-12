# Spec 02 — Validación de payloads y errores

## Objetivo

Rechazar payloads inválidos con mensajes claros y un shape de error consistente,
antes de que lleguen a la base.

## Contexto

Hoy los handlers confían en lo que llega. Un `POST /users` sin `email` debe
devolver 400 con un mensaje entendible, no un 500 del driver de Mongo.

## Alcance

Incluye:

- Validación de entrada para `POST` y `PUT` (`email` con formato válido y obligatorio,
  `nombre`/`telefono`/`ciudad` como strings, longitudes máximas).
- Normalizar el error de validación al shape `{ error: { status, message } }`.
- Cubrir también los errores de Mongoose ya previstos en `middleware/errorHandler.js`
  (duplicados `E11000`, `CastError`, `ValidationError`).

No incluye:

- Rate limiting ni sanitización XSS (spec 04).

## Archivos a tocar

- `middleware/validarCliente.js` (nuevo) — o validaciones dentro del controller.
- `middleware/errorHandler.js` — extender si aparece un error nuevo.
- `routes/clientesRoutes.js` — encadenar el middleware de validación.

## Criterios de aceptación

- Un payload inválido devuelve **400** (nunca 500) con un mensaje que nombra el campo.
- Un `email` duplicado devuelve **409**.
- Un payload válido sigue funcionando igual que antes.
- Los mensajes de error no filtran el stack en producción.

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `validacion-middleware`).

## Dependencias

Spec 01 (necesita los endpoints de POST/PUT).

## Definition of Done

- Validaciones implementadas y probadas con casos borde (falta de campo, tipo
  incorrecto, duplicado).
- PR abierto hacia `main` con la evidencia.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
