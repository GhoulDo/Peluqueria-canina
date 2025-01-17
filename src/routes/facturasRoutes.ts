import { Router } from 'express';
import { FacturasController } from '../controllers/facturasController';
import { FacturacionService } from '../services/facturacionService'; // Asegúrate de que este servicio esté definido

const router = Router();
const facturacionService = new FacturacionService(); // Crea una instancia del servicio
const facturasController = new FacturasController(facturacionService); // Pasa el servicio al controlador

// Rutas para las facturas
router.post('/', (req, res) => facturasController.crearFactura(req, res));
router.get('/', (req, res) => facturasController.obtenerFacturas(req, res));
router.get('/:id', (req, res) => facturasController.obtenerFacturaPorId(req, res));
router.put('/:id', (req, res) => facturasController.actualizarFactura(req, res));
router.delete('/:id', (req, res) => facturasController.eliminarFactura(req, res));

export default router;