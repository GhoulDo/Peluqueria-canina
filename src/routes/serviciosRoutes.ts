import { Router } from 'express';
import { ServiciosController } from '../controllers/serviciosController';

const router = Router();
const serviciosController = new ServiciosController();

// Rutas para servicios
router.get('/', (req, res) => serviciosController.obtenerServicios(req, res));
router.get('/:id', (req, res) => serviciosController.obtenerServicioPorId(req, res));
router.post('/', (req, res) => serviciosController.crearServicio(req, res));
router.put('/:id', (req, res) => serviciosController.actualizarServicio(req, res));
router.delete('/:id', (req, res) => serviciosController.eliminarServicio(req, res));

export default router;