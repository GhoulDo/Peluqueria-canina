"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
const router = (0, express_1.Router)();
const clientesController = new clientesController_1.ClientesController();
// Rutas para operaciones CRUD de clientes
router.post('/', clientesController.crearCliente);
router.get('/', clientesController.obtenerClientes);
router.get('/:id', clientesController.obtenerClientePorId);
router.put('/:id', clientesController.actualizarCliente);
router.delete('/:id', clientesController.eliminarCliente);
exports.default = router;
