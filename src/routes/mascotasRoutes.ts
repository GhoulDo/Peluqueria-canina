import { Router } from 'express';
import { MascotasController } from '../controllers/mascotasController';

const router = Router();
const mascotasController = new MascotasController();

// Rutas para las mascotas
router.post('/', (req, res) => mascotasController.crearMascota(req, res));
router.get('/', (req, res) => mascotasController.obtenerMascotas(req, res));
router.get('/:id', (req, res) => mascotasController.obtenerMascotaPorId(req, res));
router.put('/:id', (req, res) => mascotasController.actualizarMascota(req, res));
router.delete('/:id', (req, res) => mascotasController.eliminarMascota(req, res));

export default router;