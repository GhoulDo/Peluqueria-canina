import { Request, Response } from 'express';
import { CitasService } from '../services/citasService';

export class CitasController {
    private citasService: CitasService;

    constructor(citasService: CitasService) {
        this.citasService = citasService;
    }

    public async crearCita(req: Request, res: Response) {
        try {
            const nuevaCita = await this.citasService.crearCita(req.body);
            res.status(201).json(nuevaCita);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear la cita', error });
        }
    }

    public async obtenerCitas(req: Request, res: Response) {
        try {
            const citas = await this.citasService.obtenerCitas();
            res.status(200).json(citas);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener las citas', error });
        }
    }

    public async obtenerCitaPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cita = await this.citasService.obtenerCitaPorId(parseInt(id));
            if (cita) {
                res.status(200).json(cita);
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener la cita', error });
        }
    }

    public async actualizarCita(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const citaData = req.body;
            const citaActualizada = await this.citasService.actualizarCita(parseInt(id), citaData);
            if (citaActualizada) {
                res.status(200).json(citaActualizada);
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar la cita', error });
        }
    }

    public async eliminarCita(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const citaEliminada = await this.citasService.eliminarCita(parseInt(id));
            if (citaEliminada) {
                res.status(200).json({ mensaje: 'Cita eliminada' });
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar la cita', error });
        }
    }
}