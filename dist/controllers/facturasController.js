"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturasController = void 0;
class FacturasController {
    constructor(facturacionService) {
        this.facturacionService = facturacionService;
    }
    crearFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facturaData = req.body;
                const nuevaFactura = yield this.facturacionService.crearFactura(facturaData);
                res.status(201).json(nuevaFactura);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al crear la factura', error });
            }
        });
    }
    obtenerFacturas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const facturas = yield this.facturacionService.obtenerFacturas();
                res.status(200).json(facturas);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener las facturas', error });
            }
        });
    }
    obtenerFacturaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const factura = yield this.facturacionService.obtenerFacturaPorId(id);
                if (factura) {
                    res.status(200).json(factura);
                }
                else {
                    res.status(404).json({ mensaje: 'Factura no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener la factura', error });
            }
        });
    }
    actualizarFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const facturaData = req.body;
                const facturaActualizada = yield this.facturacionService.actualizarFactura(id, facturaData);
                if (facturaActualizada) {
                    res.status(200).json(facturaActualizada);
                }
                else {
                    res.status(404).json({ mensaje: 'Factura no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al actualizar la factura', error });
            }
        });
    }
    eliminarFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resultado = yield this.facturacionService.eliminarFactura(id);
                if (resultado) {
                    res.status(204).send();
                }
                else {
                    res.status(404).json({ mensaje: 'Factura no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al eliminar la factura', error });
            }
        });
    }
}
exports.FacturasController = FacturasController;
