# Backend3

API REST para gestión de usuarios, mascotas y adopciones, desarrollada con Node.js, Express y MongoDB.

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Swagger
- Docker

## Requisitos previos

- [Docker](https://www.docker.com/) instalado
- [Node.js](https://nodejs.org/) (si se ejecuta sin Docker)

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGO_URI=tu_uri_de_mongodb (se lo envío junto con la entrega del proyecto)
PORT=3000
```

## Ejecución con Docker

### Opción 1: Usar la imagen publicada en Docker Hub

```bash
docker pull gsotoc1891/backend3
docker run -p 3000:3000 --env-file .env gsotoc1891/backend3
```

### Opción 2: Construir la imagen localmente

```bash
docker build -t backend3 .
docker run -p 3000:3000 --env-file .env backend3
```

## Ejecución sin Docker

```bash
npm install
npm start
```

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/users | Obtener todos los usuarios |
| GET | /api/users/:uid | Obtener usuario por ID |
| PUT | /api/users/:uid | Actualizar usuario |
| DELETE | /api/users/:uid | Eliminar usuario |
| GET | /api/pets | Obtener todas las mascotas |
| POST | /api/pets | Crear mascota |
| PUT | /api/pets/:pid | Actualizar mascota |
| DELETE | /api/pets/:pid | Eliminar mascota |
| GET | /api/adoptions | Obtener todas las adopciones |
| GET | /api/adoptions/:aid | Obtener adopción por ID |
| POST | /api/adoptions/:uid/:pid | Crear adopción |
| POST | /api/sessions/register | Registrar usuario |
| POST | /api/sessions/login | Iniciar sesión |
| GET | /api/sessions/current | Obtener sesión actual |
| GET | /api/mocks/mockingusers | Generar 50 usuarios mock |
| GET | /api/mocks/mockingpets | Generar mascotas mock |
| POST | /api/mocks/generateData | Insertar usuarios y mascotas en la BD |

## Documentación Swagger

Con el servidor corriendo, acceder a:

```
http://localhost:3000/apidocs
```

## Imagen en Docker Hub

🐳 [gsotoc1891/backend3](https://hub.docker.com/r/gsotoc1891/backend3)