<h1 align="center">Software de control de inventarios de las bodegas de Seguridad y Salud – AlmaSENA</h1>

## Instalación
1. Crear la base de datos llamada almasenadb
2. Exportar la base de datos
3. Entrar en la carpeta `backend/` 
    - Correr un `npm install`
    - Crear una archivo `.env`, dentro de el llenar con la siguiente informacíón:
        ```env
        DATABASE_URL="mysql://user:password@127.0.0.1:3306/almasenadb"
        SECRET_TOKEN="secret token" // Lo puedes generar en una consola corriendo: require('crypto').randomBytes(64).toString('hex')
        ```
    - Ejecutar `npx prisma migrate dev` para sincronizar el cliente con la base de datos
4. Salir de la carpeta `backend/` y entrar en la carpeta `/frontend` y correr `npm install` en la terminal


