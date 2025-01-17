import { Sequelize } from 'sequelize';
import { ConnectionOptions } from 'typeorm';

export const databaseConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'peluqueria_perros',
    entities: [
        __dirname + '/models/*.ts'
    ],
    synchronize: true,
};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

export default sequelize;