"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventarioService = void 0;
class InventarioService {
    constructor() {
        this.productos = [];
        // Inicializar el inventario con algunos productos si es necesario
    }
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    actualizarStock(productoId, cantidad) {
        const producto = this.productos.find(p => p.id === productoId);
        if (producto) {
            producto.stock += cantidad;
        }
    }
    obtenerProductos() {
        return this.productos;
    }
    venderProducto(productoId, cantidad) {
        const producto = this.productos.find(p => p.id === productoId);
        if (producto && producto.stock >= cantidad) {
            producto.stock -= cantidad;
            return true;
        }
        return false;
    }
}
exports.InventarioService = InventarioService;
