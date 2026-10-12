import Cliente from '../models/Cliente.js';
import ApiError from '../utils/ApiError.js';

/**
 * Devuelve todos los clientes ordenados por id.
 *
 * A propósito NO se usa .lean(): así se aplica el toJSON del modelo
 * y la respuesta no expone _id ni password.
 */
export async function listarClientes() {
  return Cliente.find().sort({ id: 1 });
}

/**
 * Devuelve un cliente por su id numérico.
 * Lanza 404 si no existe.
 */
export async function obtenerClientePorId(id) {
  const cliente = await Cliente.findOne({ id: Number(id) });

  if (!cliente) {
    throw new ApiError(404, `Cliente ${id} no encontrado`);
  }

  return cliente;
}

export default {
  listarClientes,
  obtenerClientePorId,
};
