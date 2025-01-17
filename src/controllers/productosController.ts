export class ProductosController {
    private productos: any[] = []; // Aquí se almacenarán los productos en memoria

    // Crear un nuevo producto
    public crearProducto(req: any, res: any) {
        const producto = req.body;
        this.productos.push(producto);
        res.status(201).json(producto);
    }

    // Obtener todos los productos
    public obtenerProductos(req: any, res: any) {
        res.status(200).json(this.productos);
    }

    // Obtener un producto por ID
    public obtenerProductoPorId(req: any, res: any) {
        const { id } = req.params;
        const producto = this.productos.find(producto => producto.id === parseInt(id));
        if (producto) {
            res.status(200).json(producto);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }

    // Actualizar un producto
    public actualizarProducto(req: any, res: any) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.productos.findIndex(producto => producto.id === parseInt(id));
        if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...datosActualizados };
            res.status(200).json(this.productos[index]);
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }

    // Eliminar un producto
    public eliminarProducto(req: any, res: any) {
        const { id } = req.params;
        const index = this.productos.findIndex(producto => producto.id === parseInt(id));
        if (index !== -1) {
            this.productos.splice(index, 1);
            res.status(200).json({ mensaje: 'Producto eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    }
}