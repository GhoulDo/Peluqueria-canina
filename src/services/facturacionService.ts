export class FacturacionService {
    private facturas: any[] = []; // Array para almacenar las facturas

    // Método para generar una nueva factura
    public generarFactura(clienteId: number, total: number): any {
        const nuevaFactura = {
            id: this.facturas.length + 1,
            cliente_id: clienteId,
            fecha: new Date(),
            total: total
        };
        this.facturas.push(nuevaFactura);
        return nuevaFactura;
    }

    // Método para obtener todas las facturas
    public obtenerFacturas(): any[] {
        return this.facturas;
    }

    // Método para obtener una factura por ID
    public obtenerFacturaPorId(id: number): any | undefined {
        return this.facturas.find(factura => factura.id === id);
    }

    // Método para actualizar una factura
    public actualizarFactura(id: number, total: number): any | undefined {
        const factura = this.obtenerFacturaPorId(id);
        if (factura) {
            factura.total = total;
            return factura;
        }
        return undefined;
    }

    // Método para eliminar una factura
    public eliminarFactura(id: number): boolean {
        const index = this.facturas.findIndex(factura => factura.id === id);
        if (index !== -1) {
            this.facturas.splice(index, 1);
            return true;
        }
        return false;
    }
}