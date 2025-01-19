import { Repository } from 'typeorm';
import AppDataSource from '../database';
import { Cita } from '../models/cita'; // Asegúrate de que el modelo Cita esté definido

export class CitasService {
    private citaRepository: Repository<Cita>;

    constructor() {
        this.citaRepository = AppDataSource.getRepository(Cita);
    }

    // Método para crear una nueva cita
    public async crearCita(cita: Cita): Promise<Cita> {
        const nuevaCita = this.citaRepository.create(cita);
        return await this.citaRepository.save(nuevaCita);
    }

    // Método para obtener todas las citas
    public async obtenerCitas(): Promise<Cita[]> {
        return await this.citaRepository.find();
    }

    // Método para obtener una cita por ID
    public async obtenerCitaPorId(id: number): Promise<Cita | undefined> {
        const cita = await this.citaRepository.findOneBy({ id });
        return cita !== null ? cita : undefined;
    }

    // Método para actualizar una cita
    public async actualizarCita(id: number, citaActualizada: Partial<Cita>): Promise<Cita | undefined> {
        const cita = await this.citaRepository.findOneBy({ id });
        if (cita) {
            this.citaRepository.merge(cita, citaActualizada);
            return await this.citaRepository.save(cita);
        }
        return undefined;
    }

    // Método para eliminar una cita
    public async eliminarCita(id: number): Promise<boolean> {
        const resultado = await this.citaRepository.delete(id);
        return resultado.affected !== 0;
    }
}