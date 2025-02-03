import { Router } from 'express';
import { FacturasController } from '../controllers/facturasController';

const router = Router();
const facturasController = new FacturasController();

// Rutas para las facturas
router.post('/', (req, res) => facturasController.crearFactura(req, res));
router.get('/', (req, res) => facturasController.obtenerFacturas(req, res));
router.get('/:id', (req, res) => facturasController.obtenerFacturaPorId(req, res));
router.put('/:id', (req, res) => facturasController.actualizarFactura(req, res));
router.delete('/:id', (req, res) => facturasController.eliminarFactura(req, res));

export default router;