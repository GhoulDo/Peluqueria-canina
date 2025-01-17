import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mascota {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    tipo: string;

    @Column()
    raza: string;

    @Column()
    edad: number;

    @Column()
    cliente_id: number;

    constructor(id: number, nombre: string, tipo: string, raza: string, edad: number, cliente_id: number) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.raza = raza;
        this.edad = edad;
        this.cliente_id = cliente_id;
    }
}