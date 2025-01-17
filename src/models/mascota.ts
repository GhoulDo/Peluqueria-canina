export class Mascota {
    id: number;
    nombre: string;
    tipo: string;
    raza: string;
    edad: number;
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