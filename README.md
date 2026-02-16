Instalación y ejecución
1. Clonar el repositorio e instalar dependencias
npm install
2. Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
MONGO_URI="insertar mongo URI" (se lo paso por la plataforma)
PORT=8080
3. Ejecutar el servidor
Modo producción:
npm start
Modo desarrollo (con nodemon):
npm run dev
El servidor quedará escuchando en http://localhost:8080

Endpoints a evaluar
1. GET /api/mocks/mockingusers
Genera 50 usuarios con formato de Mongo sin guardarlos en la base de datos.
Cada usuario generado cumple con:

password: contraseña x encriptada con bcrypt.
role: valor aleatorio entre "user" y "admin".
pets: array vacío.

Request:
GET http://localhost:8080/api/mocks/mockingusers
Respuesta esperada:
json{
  "status": "success",
  "payload": [ ...50 usuarios... ]
}

Para comprobar que no se persistieron, llamar a GET /api/users antes y después — el total no debe cambiar.


2. GET /api/mocks/mockingpets/:num
Genera una cantidad de mascotas sin guardarlas en la base de datos.
Request:
GET http://localhost:8080/api/mocks/mockingpets/10
Respuesta esperada:
json{
  "status": "success",
  "payload": [ ...10 mascotas... ]
}

3. POST /api/mocks/generateData
Genera y guarda en la base de datos la cantidad de usuarios y mascotas indicada mediante los parámetros users y pets en el body.
Request:
POST http://localhost:8080/api/mocks/generateData
Content-Type: application/json

{
  "users": 10,
  "pets": 5
}
Respuesta esperada:
json{
  "status": "success",
  "payload": {
    "users": [ ...10 usuarios... ],
    "pets": [ ...5 mascotas... ]
  }
}

Verificación de inserción en base de datos
Luego de llamar a POST /api/mocks/generateData, comprobar que los registros fueron guardados correctamente:
Verificar usuarios:
GET http://localhost:8080/api/users

Verificar mascotas:
GET http://localhost:8080/api/pets
Verificar mascotas:
GET http://localhost:8080/api/pets
Los registros generados deben aparecer en ambas respuestas.
