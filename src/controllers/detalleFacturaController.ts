import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { DetalleFactura } from '../models/detalleFactura';

export class DetalleFacturaController {
    private detalleFacturaRepository: Repository<DetalleFactura>;

    constructor() {
        this.detalleFacturaRepository = AppDataSource.getRepository(DetalleFactura);
    }

    // Crear un nuevo detalle de factura
    public async crearDetalleFactura(req: Request, res: Response) {
        try {
            const detalleFactura = this.detalleFacturaRepository.create(req.body);
            await this.detalleFacturaRepository.save(detalleFactura);
            res.status(201).json(detalleFactura);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear el detalle de factura', error });
        }
    }

    // Obtener todos los detalles de factura
    public async obtenerDetallesFactura(req: Request, res: Response) {
        try {
            const detallesFactura = await this.detalleFacturaRepository.find();
            res.status(200).json(detallesFactura);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener los detalles de factura', error });
        }
    }

    // Obtener un detalle de factura por ID
    public async obtenerDetalleFacturaPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id); // Convertir id a número
            const detalleFactura = await this.detalleFacturaRepository.findOneBy({ id });
            if (detalleFactura) {
                res.status(200).json(detalleFactura);
            } else {
                res.status(404).json({ mensaje: 'Detalle de factura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener el detalle de factura', error });
        }
    }

    // Actualizar un detalle de factura
    public async actualizarDetalleFactura(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id); // Convertir id a número
            let detalleFactura = await this.detalleFacturaRepository.findOneBy({ id });
            if (detalleFactura) {
                this.detalleFacturaRepository.merge(detalleFactura, req.body);
                const resultado = await this.detalleFacturaRepository.save(detalleFactura);
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ mensaje: 'Detalle de factura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar el detalle de factura', error });
        }
    }

    // Eliminar un detalle de factura
    public async eliminarDetalleFactura(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id); // Convertir id a número
            const resultado = await this.detalleFacturaRepository.delete(id);
            if (resultado.affected) {
                res.status(200).json({ mensaje: 'Detalle de factura eliminado' });
            } else {
                res.status(404).json({ mensaje: 'Detalle de factura no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar el detalle de factura', error });
        }
    }
}