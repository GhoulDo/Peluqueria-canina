"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mascota = void 0;
class Mascota {
    constructor(id, nombre, tipo, raza, edad, cliente_id) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.raza = raza;
        this.edad = edad;
        this.cliente_id = cliente_id;
    }
}
exports.Mascota = Mascota;
