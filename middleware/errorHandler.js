/**
 * Manejo centralizado de errores.
 *
 * Normaliza los errores propios (ApiError) y los errores conocidos de
 * Mongoose a un mismo shape: { error: { status, message } }.
 */
export default function errorHandler(error, _req, res, _next) {
  let status = error.statusCode || 500;
  let message = error.message || 'Error interno del servidor';

  if (error.name === 'ValidationError') {
    status = 400;
    message = Object.values(error.errors)
      .map((detalle) => detalle.message)
      .join('. ');
  } else if (error.name === 'CastError') {
    status = 400;
    message = `Valor inválido para el campo ${error.path}.`;
  } else if (error.code === 11000) {
    status = 409;
    const campo = Object.keys(error.keyValue || {}).join(', ');
    message = `Ya existe un registro con ese valor${
      campo ? ` (${campo})` : ''
    }.`;
  }

  const respuesta = { error: { status, message } };

  // El stack solo se expone fuera de producción.
  if (process.env.NODE_ENV !== 'production') {
    respuesta.error.stack = error.stack;
  }

  if (status >= 500) {
    console.error(error);
  }

  res.status(status).json(respuesta);
}
