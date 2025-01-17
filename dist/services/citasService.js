"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CitasService = void 0;
class CitasService {
    constructor() {
        this.citas = []; // Array para almacenar las citas
    }
    // Método para crear una nueva cita
    crearCita(cita) {
        this.citas.push(cita);
    }
    // Método para obtener todas las citas
    obtenerCitas() {
        return this.citas;
    }
    // Método para obtener una cita por ID
    obtenerCitaPorId(id) {
        return this.citas.find(cita => cita.id === id);
    }
    // Método para actualizar una cita
    actualizarCita(id, citaActualizada) {
        const index = this.citas.findIndex(cita => cita.id === id);
        if (index !== -1) {
            this.citas[index] = Object.assign(Object.assign({}, this.citas[index]), citaActualizada);
            return true;
        }
        return false;
    }
    // Método para eliminar una cita
    eliminarCita(id) {
        const index = this.citas.findIndex(cita => cita.id === id);
        if (index !== -1) {
            this.citas.splice(index, 1);
            return true;
        }
        return false;
    }
}
exports.CitasService = CitasService;
