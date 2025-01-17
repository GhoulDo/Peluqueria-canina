"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetalleFactura = void 0;
class DetalleFactura {
    constructor(id, factura_id, producto_id, cantidad, subtotal) {
        this.id = id;
        this.factura_id = factura_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}
exports.DetalleFactura = DetalleFactura;
