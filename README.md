
# Zoco ASPNET Crud

Este repositorio alberga una aplicación web para gestionar productos y categorías utilizando React.js en el frontend y ASP.NET Core 6 en el backend. Incluye autenticación JWT con control de acceso basado en roles para administradores y usuarios regulares.

## Estructura del Repositorio

- **Zocoapi**
  - `Zocoapi.server`: Backend construido con .NET 6.0 y C#.
  
- **ZocoFrontend**
  - Raíz del proyecto frontend construido con Vite, React, y TypeScript.

## Instalación

### Zocoapi

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/Zocoapi.git
   cd Zocoapi
   ```

2. **Instalar las dependencias:**
   Asegúrate de tener .NET 6.0 instalado.
   ```bash
   cd Zocoapi.server
   dotnet restore
   ```

3. **Configuración del entorno:**
   Configura las variables de entorno según sea necesario.

4. **Ejecutar la aplicación:**
   ```bash
   dotnet run
   ```
   La aplicación estará disponible en `http://localhost:3000`.

### ZocoFrontend

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/ZocoFrontend.git
   cd ZocoFrontend
   ```

2. **Instalar las dependencias:**
   Asegúrate de tener Node.js y npm instalados.
   ```bash
   npm install
   ```

3. **Configuración del entorno:**
   Configura las variables de entorno según sea necesario.

4. **Compilar y ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El servidor de desarrollo estará disponible en `http://localhost:5173`.




