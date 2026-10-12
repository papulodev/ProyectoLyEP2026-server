/**
 * Envuelve un handler async para que cualquier promesa rechazada
 * llegue al middleware de errores de Express.
 */
export default function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
