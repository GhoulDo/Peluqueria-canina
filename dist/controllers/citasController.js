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
exports.CitasController = void 0;
class CitasController {
    constructor(citasService) {
        this.citasService = citasService;
    }
    crearCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const nuevaCita = yield this.citasService.crearCita(req.body);
                res.status(201).json(nuevaCita);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al crear la cita', error });
            }
        });
    }
    obtenerCitas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const citas = yield this.citasService.obtenerCitas();
                res.status(200).json(citas);
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener las citas', error });
            }
        });
    }
    obtenerCitaPorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const cita = yield this.citasService.obtenerCitaPorId(id);
                if (cita) {
                    res.status(200).json(cita);
                }
                else {
                    res.status(404).json({ mensaje: 'Cita no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al obtener la cita', error });
            }
        });
    }
    actualizarCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const citaData = req.body;
                const citaActualizada = yield this.citasService.actualizarCita(id, citaData);
                if (citaActualizada) {
                    res.status(200).json(citaActualizada);
                }
                else {
                    res.status(404).json({ mensaje: 'Cita no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al actualizar la cita', error });
            }
        });
    }
    eliminarCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const citaEliminada = yield this.citasService.eliminarCita(id);
                if (citaEliminada) {
                    res.status(200).json({ mensaje: 'Cita eliminada' });
                }
                else {
                    res.status(404).json({ mensaje: 'Cita no encontrada' });
                }
            }
            catch (error) {
                res.status(500).json({ mensaje: 'Error al eliminar la cita', error });
            }
        });
    }
}
exports.CitasController = CitasController;
