"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const facturasController_1 = require("../controllers/facturasController");
const facturacionService_1 = require("../services/facturacionService"); // Asegúrate de que este servicio esté definido
const router = (0, express_1.Router)();
const facturacionService = new facturacionService_1.FacturacionService(); // Crea una instancia del servicio
const facturasController = new facturasController_1.FacturasController(facturacionService); // Pasa el servicio al controlador
// Rutas para las facturas
router.post('/', (req, res) => facturasController.crearFactura(req, res));
router.get('/', (req, res) => facturasController.obtenerFacturas(req, res));
router.get('/:id', (req, res) => facturasController.obtenerFacturaPorId(req, res));
router.put('/:id', (req, res) => facturasController.actualizarFactura(req, res));
router.delete('/:id', (req, res) => facturasController.eliminarFactura(req, res));
exports.default = router;
