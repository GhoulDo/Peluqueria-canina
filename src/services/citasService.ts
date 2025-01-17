export class CitasService {
    private citas: any[] = []; // Array para almacenar las citas

    // Método para crear una nueva cita
    public crearCita(cita: any): void {
        this.citas.push(cita);
    }

    // Método para obtener todas las citas
    public obtenerCitas(): any[] {
        return this.citas;
    }

    // Método para obtener una cita por ID
    public obtenerCitaPorId(id: number): any | undefined {
        return this.citas.find(cita => cita.id === id);
    }

    // Método para actualizar una cita
    public actualizarCita(id: number, citaActualizada: any): boolean {
        const index = this.citas.findIndex(cita => cita.id === id);
        if (index !== -1) {
            this.citas[index] = { ...this.citas[index], ...citaActualizada };
            return true;
        }
        return false;
    }

    // Método para eliminar una cita
    public eliminarCita(id: number): boolean {
        const index = this.citas.findIndex(cita => cita.id === id);
        if (index !== -1) {
            this.citas.splice(index, 1);
            return true;
        }
        return false;
    }
}