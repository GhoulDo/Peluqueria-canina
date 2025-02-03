import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente';

@Entity()
export class Factura {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'cliente_id' })
    cliente!: Cliente;

    @CreateDateColumn()
    fecha!: Date;

    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;

    constructor(cliente: Cliente, total: number) {
        this.cliente = cliente;
        this.total = total;
    }
}