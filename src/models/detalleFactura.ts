export class DetalleFactura {
    id: number;
    factura_id: number;
    producto_id: number;
    cantidad: number;
    subtotal: number;

    constructor(id: number, factura_id: number, producto_id: number, cantidad: number, subtotal: number) {
        this.id = id;
        this.factura_id = factura_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}