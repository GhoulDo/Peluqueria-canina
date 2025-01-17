"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
class Producto {
    constructor(id, nombre, tipo, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo; // medicamento, galleta, juguete
        this.precio = precio;
        this.stock = stock;
    }
}
exports.Producto = Producto;
exports.default = Producto;
