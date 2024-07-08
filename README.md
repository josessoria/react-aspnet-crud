
# Zoco ASPNET Crud

Este repositorio alberga una aplicación web para gestionar productos y categorías utilizando React.js en el frontend y ASP.NET Core 6 en el backend. Incluye autenticación JWT con control de acceso basado en roles para administradores y usuarios regulares.

## Estructura del Repositorio

- **Zocoapi**
  - `Zocoapi.server`: Backend construido con .NET 6.0, C#, SQL SERVER.
  
- **ZocoFrontend**
  - Raíz del proyecto frontend construido con Vite, React, y TypeScript.

## Instalación

### Zocoapi

1. **Dirigirnos a la carpeta:**
   ```bash
   cd Zocoapi
   ```

2. **Instalar las dependencias:**
   Asegúrate de tener .NET 6.0 instalado.
   ```bash
   cd Zocoapi.server
   dotnet restore
   dotnet build   
   ```
   
3. **Configuración de la base de datos:**
   ```bash
   Ejecuta el contenido de SCRIPT SQL.txt que está en la raiz de este repositorio en tu SQL SERVER 
   ```
   
4. **Configuración del entorno:**
   ```bash
   cd Zocoapi.server
   Configura el appsettings.json y colca tu url de tu base de datos sql server  
   ```
   
5. **Ejecutar la aplicación:**
   ```bash
   dotnet run
   ```
   La aplicación estará disponible en `http://localhost:3000`.

### ZocoFrontend

1. **Dirigirnos a la carpeta:**
   ```bash
   cd ZocoFrontend
   ```

2. **Instalar las dependencias:**
   Asegúrate de tener Node.js y npm instalados.
   ```bash
   npm install
   ```
   
3. **Compilar y ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El servidor de desarrollo estará disponible en `http://localhost:5173`.




