# ProyectoLyEP2026-server

Backend del Panel de Control de Clientes (LyEP 2026).
Reemplaza la API pública FakeStoreAPI que hoy consume el frontend en producción.

Stack: **Node.js + Express + Mongoose (MongoDB Atlas)**. Pensado para desplegarse en **Render**.

## Requisitos

- Node.js >= 20
- Una base MongoDB (Atlas o local)

## Puesta en marcha

```bash
npm install
cp .env.example .env   # completar MONGODB_URI y lo demás
npm run dev            # arranca con --watch en http://localhost:4000
```

Cargar datos de ejemplo:

```bash
npm run seed
```

## Scripts

| Script | Qué hace |
|--------|----------|
| `npm start` | Arranca el servidor (modo producción). |
| `npm run dev` | Arranca con recarga automática. |
| `npm run seed` | Carga `documents/clientes.seed.json` en la base. |

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (Render lo inyecta solo). |
| `NODE_ENV` | `development` o `production`. |
| `MONGODB_URI` | Cadena de conexión a MongoDB. **Secreta.** |
| `MONGODB_USERNAME` / `MONGODB_PASSWORD` | Alternativa por partes. **Secretas.** |
| `CORS_ORIGIN` | `*` en dev, o lista de orígenes separados por coma. |

> El `.env` real nunca se versiona. `MONGODB_URI` contiene credenciales.

## API

Contrato drop-in de FakeStoreAPI, montado en `/users`:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | Health check (200 aunque Mongo no responda). |
| GET | `/users` | Lista de clientes. |
| GET | `/users/:id` | Un cliente (404 si no existe). |
| POST | `/users` | Crea un cliente. |
| PUT | `/users/:id` | Actualiza un cliente. |
| DELETE | `/users/:id` | Elimina un cliente. |

### Shape del cliente

```json
{
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "name": { "firstname": "john", "lastname": "doe" },
  "address": {
    "city": "kilcoole",
    "street": "new road",
    "number": 7682,
    "zipcode": "12926-3874",
    "geolocation": { "lat": "-37.3159", "long": "81.1496" }
  },
  "phone": "1-570-236-7033"
}
```

El `id` es numérico y auto-incremental. Las respuestas nunca incluyen `_id` ni `password`.

## Estructura

```
app.js                 Configuración de Express (middlewares, /health, rutas)
server.js              Arranque: carga .env, conecta a Mongo y escucha
config/db.js           Conexión a MongoDB
models/                Esquemas de Mongoose (Cliente, Counter)
controllers/           Handlers HTTP
services/              Lógica de acceso a datos
routes/                Definición de rutas
middleware/            Errores (404, handler central) y validaciones
utils/                 Helpers (ApiError, asyncHandler)
documents/             Documentos semilla (JSON) para la base
seeds/                 Script de carga de la semilla
specs/                 Unidades de trabajo del equipo (una por rama/PR)
render.yaml            Blueprint de deploy en Render
```

## Deploy en Render

El repo trae `render.yaml`. Para desplegar:

1. Crear el Web Service apuntando a este repo (o usar el blueprint).
2. Cargar en el dashboard: `MONGODB_URI` y `CORS_ORIGIN`.
3. Verificar `GET https://<servicio>.onrender.com/health`.
4. Cargar la semilla: `npm run seed` con el `MONGODB_URI` de producción.

## Trabajo en equipo

Ver [`specs/README.md`](specs/README.md): cada spec se trabaja en una rama
`feature/<NOMBREAPELLIDO>` del integrante asignado, y cada PR cumple 3 criterios
obligatorios: descripción completa (qué, cómo, archivos), título con referencia al
issue (cuando se usen) y declaratoria de uso de IA.
