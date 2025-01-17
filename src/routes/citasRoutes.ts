import { Router } from 'express';
import { CitasController } from '../controllers/citasController';
import { CitasService } from '../services/citasService'; // Asegúrate de que este servicio esté definido

const router = Router();
const citasService = new CitasService(); // Crea una instancia del servicio
const citasController = new CitasController(citasService); // Pasa el servicio al controlador

// Rutas para las citas
router.post('/', (req, res) => citasController.crearCita(req, res));
router.get('/', (req, res) => citasController.obtenerCitas(req, res));
router.get('/:id', (req, res) => citasController.obtenerCitaPorId(req, res));
router.put('/:id', (req, res) => citasController.actualizarCita(req, res));
router.delete('/:id', (req, res) => citasController.eliminarCita(req, res));

export default router;