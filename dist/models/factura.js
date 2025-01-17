"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
class Factura {
    constructor(id, cliente_id, fecha, total) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.fecha = fecha;
        this.total = total;
    }
}
exports.Factura = Factura;
