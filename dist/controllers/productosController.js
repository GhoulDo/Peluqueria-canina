"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosController = void 0;
class ProductosController {
    constructor() {
        this.productos = []; // Aquí se almacenarán los productos en memoria
    }
    // Crear un nuevo producto
    crearProducto(req, res) {
        const producto = req.body;
        this.productos.push(producto);
        res.status(201).json(producto);
    }
    // Obtener todos los productos
    obtenerProductos(req, res) {
        res.status(200).json(this.productos);
    }
    // Obtener un producto por ID
    obtenerProductoPorId(req, res) {
        const { id } = req.params;
        const producto = this.productos.find(producto => producto.id === parseInt(id));
        if (producto) {
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
    // Actualizar un producto
    actualizarProducto(req, res) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.productos.findIndex(producto => producto.id === parseInt(id));
        if (index !== -1) {
            this.productos[index] = Object.assign(Object.assign({}, this.productos[index]), datosActualizados);
            res.status(200).json(this.productos[index]);
        }
        else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
    // Eliminar un producto
    eliminarProducto(req, res) {
        const { id } = req.params;
        const index = this.productos.findIndex(producto => producto.id === parseInt(id));
        if (index !== -1) {
            this.productos.splice(index, 1);
            res.status(200).json({ mensaje: 'Producto eliminado' });
        }
        else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
}
exports.ProductosController = ProductosController;
