/**
 * Responde 404 con el shape de error uniforme de la API.
 */
export default function notFound(req, res) {
  res.status(404).json({
    error: {
      status: 404,
      message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    },
  });
}
