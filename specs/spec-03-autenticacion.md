# Spec 03 — Autenticación

## Objetivo

Reemplazar el login simulado del frontend por un endpoint real de autenticación
en el backend.

## Contexto

Hoy `src/services/autorizacionesServices.js` del frontend valida 6 usuarios
hardcodeados con la contraseña `Admin123`, y las rutas protegidas dependen de esa
respuesta. El backend debe ofrecer un `POST /auth/login` que devuelva algo
equivalente a lo que el frontend espera (usuario + sector/rol).

## Alcance

Incluye:

- `POST /auth/login` que valide `email` + `password` contra la base.
- Comparación de contraseñas con hash (`bcrypt`).
- Emisión de un token (`JWT`) y/o el objeto de usuario que el frontend espera.
- Un usuario/rol (sector) asociado al cliente para replicar Gerencia/Soporte.
- (Opcional) `GET /auth/me` protegido por token.

No incluye:

- Recuperación de contraseña ni registro público.
- Cambios en el frontend (eso es la spec 07).

## Archivos a tocar

- `models/Cliente.js` — campo de rol/sector y hasheo de `password` si hace falta.
- `services/authService.js`, `controllers/authController.js`, `routes/authRoutes.js` (nuevos).
- `middleware/auth.js` (nuevo) — verificación del token.
- `routes/index.js` — montar `/auth`.

## Criterios de aceptación

- Credenciales válidas -> 200 con el usuario (sin `password`) y el token.
- Credenciales inválidas -> 401, sin decir cuál campo falló.
- La contraseña nunca se guarda ni se devuelve en texto plano.
- El login sigue funcionando con los usuarios de la semilla (`documents/clientes.seed.json`).

## Rama

`feature/<NOMBREAPELLIDO>` — ejemplo: `feature/JHONDOE` (tema de referencia: `autenticacion`).

## Dependencias

Ninguna (el modelo `Cliente` ya está en `main`).

## Definition of Done

- Endpoint probado con `curl` (éxito y fallo).
- Contraseñas hasheadas en la base.
- PR abierto hacia `main` con la evidencia.
- El PR cumple los 3 criterios de `specs/README.md`: descripción completa, título con referencia y declaratoria de uso de IA.
