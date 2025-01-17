"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturacionService = void 0;
class FacturacionService {
    constructor() {
        this.facturas = []; // Array para almacenar las facturas
    }
    // Método para generar una nueva factura
    generarFactura(clienteId, total) {
        const nuevaFactura = {
            id: this.facturas.length + 1,
            cliente_id: clienteId,
            fecha: new Date(),
            total: total
        };
        this.facturas.push(nuevaFactura);
        return nuevaFactura;
    }
    // Método para obtener todas las facturas
    obtenerFacturas() {
        return this.facturas;
    }
    // Método para obtener una factura por ID
    obtenerFacturaPorId(id) {
        return this.facturas.find(factura => factura.id === id);
    }
    // Método para actualizar una factura
    actualizarFactura(id, total) {
        const factura = this.obtenerFacturaPorId(id);
        if (factura) {
            factura.total = total;
            return factura;
        }
        return undefined;
    }
    // Método para eliminar una factura
    eliminarFactura(id) {
        const index = this.facturas.findIndex(factura => factura.id === id);
        if (index !== -1) {
            this.facturas.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.FacturacionService = FacturacionService;
