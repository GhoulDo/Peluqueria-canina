import { Router } from 'express';
import { DetalleFacturaController } from '../controllers/detalleFacturaController';

const router = Router();
const detalleFacturaController = new DetalleFacturaController();

// Rutas para detalleFactura
router.post('/', (req, res) => detalleFacturaController.crearDetalleFactura(req, res));
router.get('/', (req, res) => detalleFacturaController.obtenerDetallesFactura(req, res));
router.get('/:id', (req, res) => detalleFacturaController.obtenerDetalleFacturaPorId(req, res));
router.put('/:id', (req, res) => detalleFacturaController.actualizarDetalleFactura(req, res));
router.delete('/:id', (req, res) => detalleFacturaController.eliminarDetalleFactura(req, res));

export default router;