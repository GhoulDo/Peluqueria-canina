export class ServiciosController {
    private servicios: any[] = []; // Aquí se almacenarán los servicios en memoria

    // Crear un nuevo servicio
    public crearServicio(req: any, res: any) {
        const servicio = req.body;
        this.servicios.push(servicio);
        res.status(201).json(servicio);
    }

    // Obtener todos los servicios
    public obtenerServicios(req: any, res: any) {
        res.status(200).json(this.servicios);
    }

    // Obtener un servicio por ID
    public obtenerServicioPorId(req: any, res: any) {
        const { id } = req.params;
        const servicio = this.servicios.find(servicio => servicio.id === parseInt(id));
        if (servicio) {
            res.status(200).json(servicio);
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }

    // Actualizar un servicio
    public actualizarServicio(req: any, res: any) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.servicios.findIndex(servicio => servicio.id === parseInt(id));
        if (index !== -1) {
            this.servicios[index] = { ...this.servicios[index], ...datosActualizados };
            res.status(200).json(this.servicios[index]);
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }

    // Eliminar un servicio
    public eliminarServicio(req: any, res: any) {
        const { id } = req.params;
        const index = this.servicios.findIndex(servicio => servicio.id === parseInt(id));
        if (index !== -1) {
            this.servicios.splice(index, 1);
            res.status(200).json({ mensaje: 'Servicio eliminado' });
        } else {
            res.status(404).json({ mensaje: 'Servicio no encontrado' });
        }
    }
}