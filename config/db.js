import mongoose from 'mongoose';

/**
 * Conecta a MongoDB usando MONGODB_URI.
 *
 * No corta el proceso si falla a propósito: el health check (/health)
 * debe seguir respondiendo 200 para que Render no reinicie el servicio
 * mientras la base está momentáneamente inaccesible.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI no está definida. Revisá tu archivo .env');
    return;
  }

  try {
    const conexion = await mongoose.connect(uri);
    console.log(`MongoDB conectado: ${conexion.connection.name}`);
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
  }
}

export default connectDB;
