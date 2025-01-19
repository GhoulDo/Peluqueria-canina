import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Producto } from '../models/producto';

export class ProductosController {
    private productoRepository: Repository<Producto>;

    constructor() {
        this.productoRepository = AppDataSource.getRepository(Producto);
    }

    // Crear un nuevo producto
    public async crearProducto(req: Request, res: Response) {
        const producto = this.productoRepository.create(req.body);
        await this.productoRepository.save(producto);
        res.status(201).json(producto);
    }

    // Obtener todos los productos
    public async obtenerProductos(req: Request, res: Response) {
        const productos = await this.productoRepository.find();
        res.status(200).json(productos);
    }

    // Obtener un producto por ID
    public async obtenerProductoPorId(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const producto = await this.productoRepository.findOneBy({ id });
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }

    // Actualizar un producto
    public async actualizarProducto(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        let producto = await this.productoRepository.findOneBy({ id });
        if (producto) {
            this.productoRepository.merge(producto, req.body);
            const resultado = await this.productoRepository.save(producto);
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }

    // Eliminar un producto
    public async eliminarProducto(req: Request, res: Response) {
        const id = parseInt(req.params.id); // Convertir id a número
        const resultado = await this.productoRepository.delete(id);
        if (resultado.affected) {
            res.status(200).json({ mensaje: 'Producto eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
}