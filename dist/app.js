"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const mascotasRoutes_1 = __importDefault(require("./routes/mascotasRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const serviciosRoutes_1 = __importDefault(require("./routes/serviciosRoutes"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
const facturasRoutes_1 = __importDefault(require("./routes/facturasRoutes"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
(0, typeorm_1.createConnection)(database_1.databaseConfig)
    .then(() => {
    console.log('Conexión a la base de datos establecida');
    app.use('/api/clientes', clientesRoutes_1.default);
    app.use('/api/mascotas', mascotasRoutes_1.default);
    app.use('/api/productos', productosRoutes_1.default);
    app.use('/api/servicios', serviciosRoutes_1.default);
    app.use('/api/citas', citasRoutes_1.default);
    app.use('/api/facturas', facturasRoutes_1.default);
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
})
    .catch(error => console.log('Error al conectar a la base de datos', error));
