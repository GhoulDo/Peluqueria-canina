"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviciosController_1 = require("../controllers/serviciosController");
const router = (0, express_1.Router)();
const serviciosController = new serviciosController_1.ServiciosController();
// Rutas para servicios
router.get('/', (req, res) => serviciosController.obtenerServicios(req, res));
router.get('/:id', (req, res) => serviciosController.obtenerServicioPorId(req, res));
router.post('/', (req, res) => serviciosController.crearServicio(req, res));
router.put('/:id', (req, res) => serviciosController.actualizarServicio(req, res));
router.delete('/:id', (req, res) => serviciosController.eliminarServicio(req, res));
exports.default = router;
