export class InventarioService {
    private productos: any[] = [];

    constructor() {
        // Inicializar el inventario con algunos productos si es necesario
    }

    public agregarProducto(producto: any): void {
        this.productos.push(producto);
    }

    public actualizarStock(productoId: number, cantidad: number): void {
        const producto = this.productos.find(p => p.id === productoId);
        if (producto) {
            producto.stock += cantidad;
        }
    }

    public obtenerProductos(): any[] {
        return this.productos;
    }

    public venderProducto(productoId: number, cantidad: number): boolean {
        const producto = this.productos.find(p => p.id === productoId);
        if (producto && producto.stock >= cantidad) {
            producto.stock -= cantidad;
            return true;
        }
        return false;
    }
}