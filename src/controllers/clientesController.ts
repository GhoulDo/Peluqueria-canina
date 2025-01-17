import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Cliente } from '../models/cliente';

export class ClientesController {
    private clienteRepository: Repository<Cliente>;

    constructor() {
        this.clienteRepository = AppDataSource.getRepository(Cliente);
    }

    // Crear un nuevo cliente
    public async crearCliente(req: Request, res: Response) {
        const cliente = this.clienteRepository.create(req.body);
        await this.clienteRepository.save(cliente);
        res.status(201).json(cliente);
    }

    // Obtener todos los clientes
    public async obtenerClientes(req: Request, res: Response) {
        const clientes = await this.clienteRepository.find();
        res.status(200).json(clientes);
    }

    // Obtener un cliente por ID
    public async obtenerClientePorId(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const cliente = await this.clienteRepository.findOneBy({ id });
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }

    // Actualizar un cliente
    public async actualizarCliente(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        let cliente = await this.clienteRepository.findOneBy({ id });
        if (cliente) {
            this.clienteRepository.merge(cliente, req.body);
            const resultado = await this.clienteRepository.save(cliente);
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }

    // Eliminar un cliente
    public async eliminarCliente(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const resultado = await this.clienteRepository.delete(id);
        if (resultado.affected) {
            res.status(200).json({ mensaje: 'Cliente eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
    }
}