import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DetalleFactura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    factura_id: number;

    @Column()
    producto_id: number;

    @Column()
    cantidad: number;

    @Column()
    subtotal: number;

    constructor(id: number, factura_id: number, producto_id: number, cantidad: number, subtotal: number) {
        this.id = id;
        this.factura_id = factura_id;
        this.producto_id = producto_id;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}