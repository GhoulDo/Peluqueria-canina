import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import clientesRoutes from './routes/clientesRoutes';
import mascotasRoutes from './routes/mascotasRoutes';
import productosRoutes from './routes/productosRoutes';
import serviciosRoutes from './routes/serviciosRoutes';
import facturasRoutes from './routes/facturasRoutes';
import citasRoutes from './routes/citasRoutes';
import { databaseConfig } from './database';

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());

app.use(bodyParser.json());

createConnection(databaseConfig)
    .then(() => {
        console.log('Conexión a la base de datos establecida');

        app.use('/api/citas', citasRoutes);
        app.use('/api/clientes', clientesRoutes);
        app.use('/api/mascotas', mascotasRoutes);
        app.use('/api/productos', productosRoutes);
        app.use('/api/servicios', serviciosRoutes);
        app.use('/api/facturas', facturasRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(error => console.log('Error al conectar a la base de datos:', error));