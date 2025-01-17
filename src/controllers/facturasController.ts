export class FacturasController {
    private facturacionService: any;

    constructor(facturacionService: any) {
        this.facturacionService = facturacionService;
    }

    public async crearFactura(req: any, res: any) {
        try {
            const facturaData = req.body;
            const nuevaFactura = await this.facturacionService.crearFactura(facturaData);
            res.status(201).json(nuevaFactura);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear la factura', error });
        }
    }

    public async obtenerFacturas(req: any, res: any) {
        try {
            const facturas = await this.facturacionService.obtenerFacturas();
            res.status(200).json(facturas);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener las facturas', error });
        }
    }

    public async obtenerFacturaPorId(req: any, res: any) {
        try {
            const { id } = req.params;
            const factura = await this.facturacionService.obtenerFacturaPorId(id);
            if (factura) {
                res.status(200).json(factura);
            } else {
                res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener la factura', error });
        }
    }

    public async actualizarFactura(req: any, res: any) {
        try {
            const { id } = req.params;
            const facturaData = req.body;
            const facturaActualizada = await this.facturacionService.actualizarFactura(id, facturaData);
            if (facturaActualizada) {
                res.status(200).json(facturaActualizada);
            } else {
                res.status(404).json({ mensaje: 'Factura no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar la factura', error });
        }
    }

    public async eliminarFactura(req: any, res: any) {
        // Implementación
    }
}