"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
class ClientesController {
    constructor() {
        this.clientes = []; // Aquí se almacenarán los clientes temporalmente
    }
    // Crear un nuevo cliente
    crearCliente(cliente) {
        this.clientes.push(cliente);
        return cliente;
    }
    // Obtener todos los clientes
    obtenerClientes() {
        return this.clientes;
    }
    // Obtener un cliente por ID
    obtenerClientePorId(id) {
        return this.clientes.find(cliente => cliente.id === id);
    }
    // Actualizar un cliente
    actualizarCliente(id, datosActualizados) {
        const index = this.clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            this.clientes[index] = Object.assign(Object.assign({}, this.clientes[index]), datosActualizados);
            return this.clientes[index];
        }
        return null;
    }
    // Eliminar un cliente
    eliminarCliente(id) {
        const index = this.clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            return this.clientes.splice(index, 1);
        }
        return null;
    }
}
exports.ClientesController = ClientesController;
