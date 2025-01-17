export class CitasController {
    private citasService: any;

    constructor(citasService: any) {
        this.citasService = citasService;
    }

    public async crearCita(req: any, res: any) {
        try {
            const nuevaCita = await this.citasService.crearCita(req.body);
            res.status(201).json(nuevaCita);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear la cita', error });
        }
    }

    public async obtenerCitas(req: any, res: any) {
        try {
            const citas = await this.citasService.obtenerCitas();
            res.status(200).json(citas);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener las citas', error });
        }
    }

    public async obtenerCitaPorId(req: any, res: any) {
        try {
            const { id } = req.params;
            const cita = await this.citasService.obtenerCitaPorId(id);
            if (cita) {
                res.status(200).json(cita);
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener la cita', error });
        }
    }

    public async actualizarCita(req: any, res: any) {
        try {
            const { id } = req.params;
            const citaData = req.body;
            const citaActualizada = await this.citasService.actualizarCita(id, citaData);
            if (citaActualizada) {
                res.status(200).json(citaActualizada);
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al actualizar la cita', error });
        }
    }

    public async eliminarCita(req: any, res: any) {
        try {
            const { id } = req.params;
            const citaEliminada = await this.citasService.eliminarCita(id);
            if (citaEliminada) {
                res.status(200).json({ mensaje: 'Cita eliminada' });
            } else {
                res.status(404).json({ mensaje: 'Cita no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar la cita', error });
        }
    }
}