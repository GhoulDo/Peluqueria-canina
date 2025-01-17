"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiciosController = void 0;
class ServiciosController {
    constructor() {
        this.servicios = []; // Aquí se almacenarán los servicios en memoria
    }
    // Crear un nuevo servicio
    crearServicio(req, res) {
        const servicio = req.body;
        this.servicios.push(servicio);
        res.status(201).json(servicio);
    }
    // Obtener todos los servicios
    obtenerServicios(req, res) {
        res.status(200).json(this.servicios);
    }
    // Obtener un servicio por ID
    obtenerServicioPorId(req, res) {
        const { id } = req.params;
        const servicio = this.servicios.find(servicio => servicio.id === parseInt(id));
        if (servicio) {
            res.status(200).json(servicio);
        }
        else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }
    // Actualizar un servicio
    actualizarServicio(req, res) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.servicios.findIndex(servicio => servicio.id === parseInt(id));
        if (index !== -1) {
            this.servicios[index] = Object.assign(Object.assign({}, this.servicios[index]), datosActualizados);
            res.status(200).json(this.servicios[index]);
        }
        else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }
    // Eliminar un servicio
    eliminarServicio(req, res) {
        const { id } = req.params;
        const index = this.servicios.findIndex(servicio => servicio.id === parseInt(id));
        if (index !== -1) {
            this.servicios.splice(index, 1);
            res.status(200).json({ mensaje: 'Servicio eliminado' });
        }
        else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }
}
exports.ServiciosController = ServiciosController;
