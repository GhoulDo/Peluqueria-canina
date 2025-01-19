import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Mascota } from '../models/mascota';

export class MascotasController {
    private mascotaRepository: Repository<Mascota>;

    constructor() {
        this.mascotaRepository = AppDataSource.getRepository(Mascota);
    }

    // Crear una nueva mascota
    public async crearMascota(req: Request, res: Response) {
        const mascota = this.mascotaRepository.create(req.body);
        await this.mascotaRepository.save(mascota);
        res.status(201).json(mascota);
    }

    // Obtener todas las mascotas
    public async obtenerMascotas(req: Request, res: Response) {
        const mascotas = await this.mascotaRepository.find();
        res.status(200).json(mascotas);
    }

    // Obtener una mascota por ID
    public async obtenerMascotaPorId(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const mascota = await this.mascotaRepository.findOneBy({ id });
        if (mascota) {
            res.status(200).json(mascota);
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }

    // Actualizar una mascota
    public async actualizarMascota(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        let mascota = await this.mascotaRepository.findOneBy({ id });
        if (mascota) {
            this.mascotaRepository.merge(mascota, req.body);
            const resultado = await this.mascotaRepository.save(mascota);
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }

    // Eliminar una mascota
    public async eliminarMascota(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const resultado = await this.mascotaRepository.delete(id);
        if (resultado.affected) {
            res.status(200).json({ mensaje: 'Mascota eliminada' });
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }
}