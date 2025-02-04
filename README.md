# Proyecto Peluquería de Perros

Este proyecto es un sistema de gestión para una peluquería de perros que incluye funcionalidades para manejar clientes, mascotas, productos, servicios, citas y facturación.

## Funcionalidades del Sistema

- **Gestión de Clientes**: Permite agregar, editar, eliminar y listar clientes.
- **Gestión de Mascotas**: Permite agregar, editar, eliminar y listar mascotas.
- **Gestión de Productos**: Permite agregar, editar, eliminar y listar productos.
- **Gestión de Servicios**: Permite agregar, editar, eliminar y listar servicios.
- **Gestión de Citas**: Permite agendar, editar, cancelar y listar citas.
- **Gestión de Facturación**: Permite crear, editar, eliminar y listar facturas, así como agregar detalles a las facturas.

## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas y archivos:

- **src/**: Contiene el código fuente de la aplicación.
  - **controllers/**: Controladores que manejan la lógica de negocio y las operaciones CRUD.
    - `clientesController.ts`
    - `mascotasController.ts`
    - `productosController.ts`
    - `serviciosController.ts`
    - `citasController.ts`
    - `facturasController.ts`
    - `detalleFacturaController.ts`
  - **models/**: Modelos que representan la estructura de los datos.
    - `cliente.ts`
    - `mascota.ts`
    - `producto.ts`
    - `servicio.ts`
    - `cita.ts`
    - `factura.ts`
    - `detalleFactura.ts`
  - **routes/**: Rutas de la API que conectan los controladores con las solicitudes HTTP.
    - `clientesRoutes.ts`
    - `mascotasRoutes.ts`
    - `productosRoutes.ts`
    - `serviciosRoutes.ts`
    - `citasRoutes.ts`
    - `facturasRoutes.ts`
    - `detalleFacturaRoutes.ts`
  - **services/**: Servicios que contienen la lógica para la gestión de inventario, facturación y citas.
    - `inventarioService.ts`
    - `facturacionService.ts`
    - `citasService.ts`
  - `app.ts`: Punto de entrada de la aplicación.
  - `database.ts`: Maneja la conexión a la base de datos.

- **frontend/**: Contiene los archivos del frontend.
  - `facturacion.html`: Página para gestionar la facturación.
  - `js/facturacion.js`: Script para manejar la lógica del frontend de facturación.
  - `css/Facturacion.css`: Estilos para la página de facturación.

- **package.json**: Configuración de npm, incluyendo dependencias y scripts.
- **tsconfig.json**: Configuración de TypeScript.

## Instalación

1. Clona el repositorio:
   ```
   git clone <https://github.com/GhoulDo/Peluqueria-canina.git>
   ```
2. Navega al directorio del proyecto:
   ```
   cd peluqueria-perros
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:
```
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.