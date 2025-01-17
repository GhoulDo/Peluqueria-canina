export class Cita {
    id: number;
    mascota_id: number;
    servicio_id: number;
    fecha: Date;
    hora: string;
    estado: string;

    constructor(id: number, mascota_id: number, servicio_id: number, fecha: Date, hora: string, estado: string) {
        this.id = id;
        this.mascota_id = mascota_id;
        this.servicio_id = servicio_id;
        this.fecha = fecha;
        this.hora = hora;
        this.estado = estado;
    }
}