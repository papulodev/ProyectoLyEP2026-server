import { Router } from 'express';

import { getClientes, getCliente } from '../controllers/clientesController.js';

const router = Router();

// POST /users, PUT /users/:id y DELETE /users/:id
// se implementan en la spec 01 (feature/crud-clientes).
router.get('/', getClientes);
router.get('/:id', getCliente);

export default router;
