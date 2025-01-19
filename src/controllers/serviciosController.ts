import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Servicio } from '../models/servicio';

export class ServiciosController {
    private servicioRepository: Repository<Servicio>;

    constructor() {
        this.servicioRepository = AppDataSource.getRepository(Servicio);
    }

    // Crear un nuevo servicio
    public async crearServicio(req: Request, res: Response) {
        const servicio = this.servicioRepository.create(req.body);
        await this.servicioRepository.save(servicio);
        res.status(201).json(servicio);
    }

    // Obtener todos los servicios
    public async obtenerServicios(req: Request, res: Response) {
        const servicios = await this.servicioRepository.find();
        res.status(200).json(servicios);
    }

    // Obtener un servicio por ID
    public async obtenerServicioPorId(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const servicio = await this.servicioRepository.findOneBy({ id });
        if (servicio) {
            res.status(200).json(servicio);
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }

    // Actualizar un servicio
    public async actualizarServicio(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        let servicio = await this.servicioRepository.findOneBy({ id });
        if (servicio) {
            this.servicioRepository.merge(servicio, req.body);
            const resultado = await this.servicioRepository.save(servicio);
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }

    // Eliminar un servicio
    public async eliminarServicio(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const resultado = await this.servicioRepository.delete(id);
        if (resultado.affected) {
            res.status(200).json({ mensaje: 'Servicio eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }
}