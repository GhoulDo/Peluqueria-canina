export class MascotasController {
    private mascotas: any[] = []; // Aquí se almacenarán las mascotas en memoria

    // Crear una nueva mascota
    public crearMascota(req: any, res: any) {
        const mascota = req.body;
        this.mascotas.push(mascota);
        res.status(201).json(mascota);
    }

    // Obtener todas las mascotas
    public obtenerMascotas(req: any, res: any) {
        res.status(200).json(this.mascotas);
    }

    // Obtener una mascota por ID
    public obtenerMascotaPorId(req: any, res: any) {
        const { id } = req.params;
        const mascota = this.mascotas.find(mascota => mascota.id === parseInt(id));
        if (mascota) {
            res.status(200).json(mascota);
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }

    // Actualizar una mascota
    public actualizarMascota(req: any, res: any) {
        const { id } = req.params;
        const datosActualizados = req.body;
        const index = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (index !== -1) {
            this.mascotas[index] = { ...this.mascotas[index], ...datosActualizados };
            res.status(200).json(this.mascotas[index]);
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }

    // Eliminar una mascota
    public eliminarMascota(req: any, res: any) {
        const { id } = req.params;
        const index = this.mascotas.findIndex(mascota => mascota.id === parseInt(id));
        if (index !== -1) {
            this.mascotas.splice(index, 1);
            res.status(200).json({ mensaje: 'Mascota eliminada' });
        } else {
            res.status(404).json({ mensaje: 'Mascota no encontrada' });
        }
    }
}