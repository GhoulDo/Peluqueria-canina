import { Request, Response } from 'express';

export class ClientesController {
    private clientes: any[] = []; // Aquí se almacenarán los clientes en memoria

    constructor() {
        this.clientes = []; // Inicializa la propiedad clientes
    }

    // Crear un nuevo cliente
    public crearCliente(req: Request, res: Response) {
        const cliente = req.body;
        this.clientes.push(cliente);
        res.status(201).json(cliente);
    }

    // Obtener todos los clientes
    public obtenerClientes(req: Request, res: Response) {
        res.status(200).json(this.clientes);
    }

    // Obtener un cliente por ID
    public obtenerClientePorId(req: Request, res: Response) {
        const { id } = req.params;
        const cliente = this.clientes.find(cliente => cliente.id === parseInt(id));
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }

    // Actualizar un cliente
    public actualizarCliente(req: Request, res: Response) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.clientes.findIndex(cliente => cliente.id === parseInt(id));
        if (index !== -1) {
            this.clientes[index] = { ...this.clientes[index], ...datosActualizados };
            res.status(200).json(this.clientes[index]);
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }

    // Eliminar un cliente
    public eliminarCliente(req: Request, res: Response) {
        const { id } = req.params;
        const index = this.clientes.findIndex(cliente => cliente.id === parseInt(id));
        if (index !== -1) {
            this.clientes.splice(index, 1);
            res.status(200).json({ mensaje: 'Cliente eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }
}