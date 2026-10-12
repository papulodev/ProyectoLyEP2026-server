import { Router } from 'express';

import clientesRoutes from './clientesRoutes.js';

const router = Router();

// Se monta en /users: el mismo path que el frontend ya consumía en FakeStoreAPI.
router.use('/users', clientesRoutes);

export default router;
