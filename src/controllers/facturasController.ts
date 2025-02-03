import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Factura } from '../models/factura';
import { Cliente } from '../models/cliente';

export class FacturasController {
    private facturaRepository: Repository<Factura>;
    private clienteRepository: Repository<Cliente>;

    constructor() {
        this.facturaRepository = AppDataSource.getRepository(Factura);
        this.clienteRepository = AppDataSource.getRepository(Cliente);
    }

    public async crearFactura(req: Request, res: Response) {
        try {
            const { cliente_id, total } = req.body;
            if (!cliente_id || isNaN(cliente_id) || !total || isNaN(total)) {
                console.error('Datos inválidos:', req.body);
                return res.status(400).json({ mensaje: 'Datos inválidos' });
            }
            const cliente = await this.clienteRepository.findOneBy({ id: cliente_id });
            if (!cliente) {
                console.error('Cliente no encontrado:', cliente_id);
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            }
            const nuevaFactura = this.facturaRepository.create({ cliente, total });
            await this.facturaRepository.save(nuevaFactura);
            res.status(201).json(nuevaFactura);
        } catch (error) {
            console.error('Error al crear la factura:', error);
            res.status(500).json({ mensaje: 'Error al crear la factura', error: (error as any).message });
        }
    }

    public async obtenerFacturas(req: Request, res: Response) {
        try {
            const facturas = await this.facturaRepository.find({ relations: ['cliente'] });
            res.status(200).json(facturas);
        } catch (error) {
            console.error('Error al obtener las facturas:', error);
            res.status(500).json({ mensaje: 'Error al obtener las facturas', error });
        }
    }

    public async obtenerFacturaPorId(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                console.error('ID inválido:', req.params.id);
                return res.status(400).json({ mensaje: 'ID inválido' });
            }
            const factura = await this.facturaRepository.findOne({ where: { id }, relations: ['cliente'] });
            if (factura) {
                res.status(200).json(factura);
            } else {
                res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
        } catch (error) {
            console.error('Error al obtener la factura:', error);
            res.status(500).json({ mensaje: 'Error al obtener la factura', error });
        }
    }

    public async actualizarFactura(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                console.error('ID inválido:', req.params.id);
                return res.status(400).json({ mensaje: 'ID inválido' });
            }
            const facturaData = req.body;
            let factura = await this.facturaRepository.findOneBy({ id });
            if (factura) {
                this.facturaRepository.merge(factura, facturaData);
                const facturaActualizada = await this.facturaRepository.save(factura);
                res.status(200).json(facturaActualizada);
            } else {
                res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la factura:', error);
            res.status(500).json({ mensaje: 'Error al actualizar la factura', error });
        }
    }

    public async eliminarFactura(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                console.error('ID inválido:', req.params.id);
                return res.status(400).json({ mensaje: 'ID inválido' });
            }
            const resultado = await this.facturaRepository.delete(id);
            if (resultado.affected) {
                res.status(200).json({ mensaje: 'Factura eliminada' });
            } else {
                res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la factura:', error);
            res.status(500).json({ mensaje: 'Error al eliminar la factura', error });
        }
    }
}