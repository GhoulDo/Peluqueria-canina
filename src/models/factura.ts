import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface DetalleFactura {
    id: number;
    factura_id: number;
    producto_id: number;
    cantidad: number;
    subtotal: number;
}

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cliente_id: number;

    @Column()
    fecha: Date;

    @Column()
    total: number;

    constructor(id: number, cliente_id: number, fecha: Date, total: number) {
        this.id = id;
        this.cliente_id = cliente_id;
        this.fecha = fecha;
        this.total = total;
    }
}