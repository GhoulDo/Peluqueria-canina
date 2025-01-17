import { DataSource, DataSourceOptions } from 'typeorm';
import { Cliente } from './models/cliente';
import { Cita } from './models/cita';
import { DetalleFactura } from './models/detalleFactura';
import { Factura } from './models/factura';
import { Mascota } from './models/mascota';
import Producto from './models/producto';
import { Servicio } from './models/servicio';
// ...importa otras entidades si es necesario...

export const databaseConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'peluqueria_perros',
    entities: [
        Cliente,
        Cita,
        DetalleFactura,
        Factura,
        Mascota,
        Producto,
        Servicio

        // ...agrega otras entidades aquí...
    ],
    synchronize: true,
};

const AppDataSource = new DataSource(databaseConfig);

AppDataSource.initialize()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
    })
    .catch(error => {
        console.error('No se pudo conectar a la base de datos:', error);
    });

export default AppDataSource;