/**
 * Error de aplicación con código HTTP asociado.
 * Lo interpreta el errorHandler central.
 */
export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export default ApiError;
