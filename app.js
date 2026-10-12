import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import routes from './routes/index.js';

const app = express();

// Render está detrás de un proxy: permite resolver la IP real del cliente
// (necesario para rate limiting en una spec posterior).
app.set('trust proxy', 1);

// Cabeceras de seguridad HTTP.
app.use(helmet());

// CORS: "*" en desarrollo, o lista de orígenes separados por coma en producción.
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(
  cors({
    origin:
      corsOrigin === '*'
        ? '*'
        : corsOrigin.split(',').map((origen) => origen.trim()),
  })
);

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Health check: debe responder 200 aunque MongoDB no esté disponible.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Rutas de la API (contrato drop-in de FakeStoreAPI, montado en /users).
app.use(routes);

// 404 y manejo centralizado de errores (siempre al final).
app.use(notFound);
app.use(errorHandler);

export default app;
