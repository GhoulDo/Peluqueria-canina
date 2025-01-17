import { Router } from 'express';
import { ProductosController } from '../controllers/productosController';

const router = Router();
const productosController = new ProductosController();

// Rutas para productos
router.get('/', (req, res) => productosController.obtenerProductos(req, res));
router.get('/:id', (req, res) => productosController.obtenerProductoPorId(req, res));
router.post('/', (req, res) => productosController.crearProducto(req, res));
router.put('/:id', (req, res) => productosController.actualizarProducto(req, res));
router.delete('/:id', (req, res) => productosController.eliminarProducto(req, res));

export default router;