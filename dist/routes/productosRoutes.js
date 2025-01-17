"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
const router = (0, express_1.Router)();
const productosController = new productosController_1.ProductosController();
// Rutas para productos
router.get('/', (req, res) => productosController.obtenerProductos(req, res));
router.get('/:id', (req, res) => productosController.obtenerProductoPorId(req, res));
router.post('/', (req, res) => productosController.crearProducto(req, res));
router.put('/:id', (req, res) => productosController.actualizarProducto(req, res));
router.delete('/:id', (req, res) => productosController.eliminarProducto(req, res));
exports.default = router;
