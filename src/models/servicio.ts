export class Servicio {
    id: number;
    nombre: string;
    duracion: number;
    precio: number;

    constructor(id: number, nombre: string, duracion: number, precio: number) {
        this.id = id;
        this.nombre = nombre;
        this.duracion = duracion;
        this.precio = precio;
    }
}