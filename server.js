import 'dotenv/config';

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 3001;

// Se dispara la conexión sin bloquear el arranque:
// /health debe responder igual aunque MongoDB no esté disponible.
connectDB();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
