export class Producto {
    id: number;
    nombre: string;
    tipo: string;
    precio: number;
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