"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mascotasController_1 = require("../controllers/mascotasController");
const router = (0, express_1.Router)();
const mascotasController = new mascotasController_1.MascotasController();
// Rutas para las mascotas
router.post('/', (req, res) => mascotasController.crearMascota(req, res));
router.get('/', (req, res) => mascotasController.obtenerMascotas(req, res));
router.get('/:id', (req, res) => mascotasController.obtenerMascotaPorId(req, res));
router.put('/:id', (req, res) => mascotasController.actualizarMascota(req, res));
router.delete('/:id', (req, res) => mascotasController.eliminarMascota(req, res));
exports.default = router;
