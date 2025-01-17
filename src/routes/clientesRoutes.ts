import { Router } from 'express';
import { ClientesController } from '../controllers/clientesController';

const router = Router();
const clientesController = new ClientesController();

// Rutas para clientes
router.post('/', (req, res) => clientesController.crearCliente(req, res));
router.get('/', (req, res) => clientesController.obtenerClientes(req, res));
router.get('/:id', (req, res) => clientesController.obtenerClientePorId(req, res));
router.put('/:id', (req, res) => clientesController.actualizarCliente(req, res));
router.delete('/:id', (req, res) => clientesController.eliminarCliente(req, res));

export default router;