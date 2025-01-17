"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cita = void 0;
class Cita {
    constructor(id, mascota_id, servicio_id, fecha, hora, estado) {
        this.id = id;
        this.mascota_id = mascota_id;
        this.servicio_id = servicio_id;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }
}
exports.Cita = Cita;
