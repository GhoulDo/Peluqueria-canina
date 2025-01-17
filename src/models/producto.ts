import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Producto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    tipo: string;

    @Column()
    precio: number;

    @Column()
    stock: number;

    constructor(id: number, nombre: string, tipo: string, precio: number, stock: number) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo; // medicamento, galleta, juguete
        this.precio = precio;
        this.stock = stock;
    }
}

export default Producto;