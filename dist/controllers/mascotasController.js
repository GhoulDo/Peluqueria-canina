"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MascotasController = void 0;
class MascotasController {
    constructor() {
        this.mascotas = []; // Aquí se almacenarán las mascotas en memoria
    }
    // Crear una nueva mascota
    crearMascota(req, res) {
        const mascota = req.body;
        this.mascotas.push(mascota);
        res.status(201).json(mascota);
    }
    // Obtener todas las mascotas
    obtenerMascotas(req, res) {
        res.status(200).json(this.mascotas);
    }
    // Obtener una mascota por ID
    obtenerMascotaPorId(req, res) {
        const { id } = req.params;
        const mascota = this.mascotas.find(mascota => mascota.id === parseInt(id));
        if (mascota) {
            res.status(200).json(mascota);
        }
        else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }
    // Actualizar una mascota
    actualizarMascota(req, res) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (index !== -1) {
            this.mascotas[index] = Object.assign(Object.assign({}, this.mascotas[index]), datosActualizados);
            res.status(200).json(this.mascotas[index]);
        }
        else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }
    // Eliminar una mascota
    eliminarMascota(req, res) {
        const { id } = req.params;
        const index = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (index !== -1) {
            this.mascotas.splice(index, 1);
            res.status(200).json({ mensaje: 'Mascota eliminada' });
        }
        else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }
}
exports.MascotasController = MascotasController;
