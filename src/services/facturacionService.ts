import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Factura } from '../models/factura'; // Asegúrate de que el modelo Factura esté definido

export class FacturacionService {
    private facturaRepository: Repository<Factura>;

    constructor() {
        this.facturaRepository = AppDataSource.getRepository(Factura);
    }

    // Método para generar una nueva factura
    public async generarFactura(factura: Factura): Promise<Factura> {
        const nuevaFactura = this.facturaRepository.create(factura);
        return await this.facturaRepository.save(nuevaFactura);
    }

    // Método para obtener todas las facturas
    public async obtenerFacturas(): Promise<Factura[]> {
        return await this.facturaRepository.find();
    }

    // Método para obtener una factura por ID
    public async obtenerFacturaPorId(id: number): Promise<Factura | undefined> {
        const factura = await this.facturaRepository.findOneBy({ id });
        return factura !== null ? factura : undefined;
    }

    // Método para actualizar una factura
    public async actualizarFactura(id: number, facturaActualizada: Partial<Factura>): Promise<Factura | undefined> {
        const factura = await this.facturaRepository.findOneBy({ id });
        if (factura) {
            this.facturaRepository.merge(factura, facturaActualizada);
            return await this.facturaRepository.save(factura);
        }
        return undefined;
    }

    // Método para eliminar una factura
    public async eliminarFactura(id: number): Promise<boolean> {
        const resultado = await this.facturaRepository.delete(id);
        return resultado.affected !== 0;
    }
}
