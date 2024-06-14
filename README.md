### README para Frontend (Angular)

#### README.md

# Libreta de Direcciones - Frontend

Este proyecto es el frontend de una aplicación de libreta de direcciones avanzada, construido con Angular.

## Requisitos

- Node.js >= 12.x
- Angular CLI >= 11.x

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/libreta-direcciones-frontend.git
cd libreta-direcciones-frontend
```
2. Instala las dependencias de Node.js:
```bash
npm install
```
3. Configura la URL del backend en el archivo de entorno
```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```
4. Inicial el servidor de angular
```bash
ng serve
```
Tu frontend debería estar corriendo en http://localhost:4200.

## Estructura del proyecto
- src/app/components - Contiene los componentes de Angular.
- src/app/services - Contiene los servicios para interactuar con la API.
- src/app/models - Contiene las interfaces y modelos de datos.

## Funcionalidades
- Página Principal: Muestra una lista de todos los contactos con opciones para ver, editar, eliminar y añadir nuevos contactos.
- Agregar Contacto: Formulario para ingresar nuevos contactos con campos para nombre, varios números de teléfono, emails y direcciones.
- Editar Contacto: Formulario similar al de agregar, pero para actualizar datos existentes.
- Detalles del Contacto: Vista detallada de cada contacto con toda su información asociada

## Contribuir
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia
Este proyecto está licenciado bajo la Licencia MIT.
