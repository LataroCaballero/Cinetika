# Cinetika
WIP...

Backend: CRUD basico para poder probar react
Pasos para ejecutar:
- Tener instalado php 8.4.6 y composer
- Modificar php.ini (en directorio de instalacion de php), eliminar ";" en la linea ";extension=sqlite3", ";extension=pdo_sqlite", ";extension=fileinfo" 

En la carpeta raiz del repositorio clonado ejecutar:
- compose install 

Para generar la base de datos
crear archivo "database.sqlite" en directorio database.
Ejecutar los siguientes comandos
- php artisan migrate:install
- php artisan migrate:fresh
- php artisan db:seed

Para ejecutar el servidor
- php artisan serve

Frontend: 
dentro de la carpeta frotnend
- npm install
para correr servidor
- npm run dev