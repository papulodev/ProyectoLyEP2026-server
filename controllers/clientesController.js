import asyncHandler from '../utils/asyncHandler.js';
import {
  listarClientes,
  obtenerClientePorId,
} from '../services/clientesService.js';

/**
 * GET /users -> lista completa de clientes.
 */
export const getClientes = asyncHandler(async (_req, res) => {
  const clientes = await listarClientes();
  res.status(200).json(clientes);
});

/**
 * GET /users/:id -> un cliente o 404.
 */
export const getCliente = asyncHandler(async (req, res) => {
  const cliente = await obtenerClientePorId(req.params.id);
  res.status(200).json(cliente);
});

export default {
  getClientes,
  getCliente,
};
