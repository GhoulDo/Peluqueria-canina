export class Cliente {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    direccion: string;

    constructor(id: number, nombre: string, telefono: string, email: string, direccion: string) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.direccion = direccion;
    }
}