# Proyecto Peluquería de Perros

Este proyecto es un sistema de gestión para una peluquería de perros que incluye funcionalidades para manejar clientes, mascotas, productos, servicios, citas y facturación.

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
  - **models/**: Modelos que representan la estructura de los datos.
    - `cliente.ts`
    - `mascota.ts`
    - `producto.ts`
    - `servicio.ts`
    - `cita.ts`
    - `factura.ts`
  - **routes/**: Rutas de la API que conectan los controladores con las solicitudes HTTP.
    - `clientesRoutes.ts`
    - `mascotasRoutes.ts`
    - `productosRoutes.ts`
    - `serviciosRoutes.ts`
    - `citasRoutes.ts`
    - `facturasRoutes.ts`
  - **services/**: Servicios que contienen la lógica para la gestión de inventario, facturación y citas.
    - `inventarioService.ts`
    - `facturacionService.ts`
    - `citasService.ts`
  - `app.ts`: Punto de entrada de la aplicación.
  - `database.ts`: Maneja la conexión a la base de datos.

- **package.json**: Configuración de npm, incluyendo dependencias y scripts.
- **tsconfig.json**: Configuración de TypeScript.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
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