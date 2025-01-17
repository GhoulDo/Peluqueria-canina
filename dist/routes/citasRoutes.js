"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasController_1 = require("../controllers/citasController");
const citasService_1 = require("../services/citasService"); // Asegúrate de que este servicio esté definido
const router = (0, express_1.Router)();
const citasService = new citasService_1.CitasService(); // Crea una instancia del servicio
const citasController = new citasController_1.CitasController(citasService); // Pasa el servicio al controlador
// Rutas para las citas
router.post('/', (req, res) => citasController.crearCita(req, res));
router.get('/', (req, res) => citasController.obtenerCitas(req, res));
router.get('/:id', (req, res) => citasController.obtenerCitaPorId(req, res));
router.put('/:id', (req, res) => citasController.actualizarCita(req, res));
router.delete('/:id', (req, res) => citasController.eliminarCita(req, res));
exports.default = router;
