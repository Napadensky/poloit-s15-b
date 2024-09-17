# Poloit-s15-b
Backend de Sistema de Inscripciones 

# Instalación de Dependencias

Este proyecto utiliza varias dependencias para su funcionamiento. A continuación se detallan las instrucciones para la instalación de todas las dependencias requeridas.

## Dependencias

- `bcryptjs`: Librería para encriptar contraseñas.
- `dotenv`: Carga variables de entorno desde un archivo `.env`.
- `express`: Framework web para Node.js.
- `express-validator`: Middleware para validación de solicitudes HTTP.
- `jsonwebtoken`: Implementación de JSON Web Tokens (JWT) para autenticación.
- `mongoose`: ODM (Object Data Modeling) para MongoDB y Node.js.
- `node-cron`: Permite ejecutar tareas de cron programadas en Node.js.
- `nodemailer`: Herramienta para enviar correos electrónicos con Node.js.

### Instalación

Para instalar todas las dependencias, ejecuta el siguiente comando en tu terminal dentro del directorio de tu proyecto:

```bash
npm install bcryptjs dotenv express express-validator jsonwebtoken mongoose node-cron nodemailer

```
# Configuración de Conexión a la Base de Datos

Para conectar la aplicación a la base de datos, es necesario crear un archivo de variables de entorno llamado `.env`. Este archivo contendrá las credenciales y detalles necesarios para establecer la conexión de forma segura.

## Variables de Entorno Base de datos

En el archivo `.env`, debes definir las siguientes variables:

- `MONGO_USER`: El nombre de usuario para acceder a la base de datos.
- `MONGO_PASSWORD`: La contraseña del usuario.
- `MONGO_HOST`: La URL o dirección del host donde está alojada la base de datos.
- `MONGO_DB`: El nombre de la base de datos.

### Ejemplo de archivo `.env`:

```bash
MONGO_USER=tu_usuario
MONGO_PASSWORD=tu_contraseña
MONGO_HOST=tu_host
MONGO_DB=tu_base_de_datos
```
## Descripción de Variables de Entorno Adicionales

Este proyecto requiere varias variables de entorno que deben configurarse en el archivo `.env`. A continuación, se describen las variables necesarias y su propósito.

## Variables

- **PORT**: Define el puerto en el que la aplicación escuchará las solicitudes. 

  
- **SALT**: Es el número de rondas que se utilizará para generar un salt al encriptar contraseñas con bcryptjs. A mayor valor, mayor seguridad.

- **JWT_SECRET**:Clave secreta utilizada para firmar y verificar tokens JWT (JSON Web Tokens). Esta clave es crucial para la autenticación segura.

```bash
  PORT=tu_puerto_deseado
  SALT=tu_valor_de_salt
  JWT_SECRET=tu_clave_secreta
```

## Variables de Entorno para Nodemailer

Para configurar el envío de correos electrónicos utilizando Nodemailer, es necesario definir ciertas variables de entorno en el archivo `.env`. A continuación se describen estas variables y su propósito.



- **NODEMAILER_USER**: La dirección de correo electrónico que se utilizará como remitente para enviar los correos. Debe ser una cuenta válida de correo electrónico que tenga permisos para enviar mensajes.
- **NODEMAILER_PASS**: La contraseña o token de acceso para la cuenta de correo electrónico utilizada en NODEMAILER_USER. Esta contraseña o token es necesario para autenticar el envío de correos electrónicos a través del servidor de correo.

  ```bash
  NODEMAILER_USER=tu_correo_electronico
  NODEMAILER_PASS=tu_contraseña

  ```
# Enrolled API

Este API permite gestionar a los estudiantes inscritos en el sistema. Ofrece funciones para crear, obtener, actualizar y eliminar estudiantes.


## Endpoints

| Método | Endpoint        | Descripción                                      |
|--------|-----------------|--------------------------------------------------|
| POST   | `/enrolled`      | Crear un nuevo estudiante inscrito               |
| GET    | `/enrolled`      | Obtener todos los estudiantes inscritos          |
| GET    | `/enrolled/:id`  | Obtener un estudiante inscrito por su ID         |
| PUT    | `/enrolled/:id`  | Actualizar un estudiante inscrito                |
| DELETE | `/enrolled/:id`  | Eliminar un estudiante inscrito por su ID        |


## Modelo de Enrolled

El esquema para el modelo `Enrolled` es el siguiente:

- **name**: `String` — Nombre del estudiante.
- **dni**: `String` — Documento Nacional de Identidad del estudiante.
- **mail**: `String` — Correo electrónico del estudiante.
- **phone**: `String` — Número de teléfono del estudiante.
- **active**: `Boolean` — Indica si el estudiante está activo.
- **role**: `String` — Rol del estudiante. Puede ser uno de los siguientes valores:
  - `QA`
  - `UX/UI`
  - `Frontend`
  - `Backend`
- **projects**: `[ObjectId]` — Lista de identificadores de proyectos asociados al estudiante.
- **assigned**: `Boolean` — Indica si el estudiante ya está asignado a un squad. El valor por defecto es `false`.


# Endpoints de la API de Mentor

| Método  | URL               | Descripción                                  |
|---------|-------------------|----------------------------------------------|
| `POST`  | `/mentors`         | Crear un nuevo mentor.                       |
| `GET`   | `/mentors`         | Obtener todos los mentores.                  |
| `GET`   | `/mentors/:id`     | Obtener un mentor por ID.                    |
| `PUT`   | `/mentors/:id`     | Actualizar un mentor por ID.                 |
| `DELETE`| `/mentors/:id`     | Eliminar un mentor por ID.                   |

## Modelo Mentor

El modelo `Mentor` representa los mentores en la base de datos y contiene la siguiente estructura:


## Descripción de los campos:

- **name**: El nombre del mentor.
- **img**: URL de la imagen del mentor.
- **skills**: Un array de habilidades (por ejemplo, "JavaScript", "React", "UI Design") que describen las competencias del mentor.
- **active**: Un campo booleano que indica si el mentor está activo. El valor por defecto es `true`.
- **role**: Define el rol del mentor. Siempre debe ser `'Mentor'`.
- **assigned**: Un campo booleano que indica si el mentor está asignado a un squad. El valor por defecto es `false`.

# Endpoints de la API Project

| Método    | URL              | Descripción                                  |
|-----------|------------------|----------------------------------------------|
| `POST`    | `/projects`       | Crear un nuevo proyecto.                     |
| `GET`     | `/projects`       | Obtener todos los proyectos.                 |
| `GET`     | `/projects/:id`   | Obtener un proyecto por ID.                  |
| `PUT`     | `/projects/:id`   | Actualizar un proyecto por ID.               |
| `DELETE`  | `/projects/:id`   | Eliminar un proyecto por ID.                 |


# Modelo `Project`

El modelo `Project` representa los proyectos en la base de datos y tiene los siguientes campos:



## Descripción de los campos

- **active**: Indica si el proyecto está activo o no.
- **description**: Detalla la descripción del proyecto.
- **img**: URL de la imagen representativa del proyecto.
- **maxStudents**: Límite máximo de estudiantes que se pueden inscribir en el proyecto.
- **mentors**: Referencias a los mentores involucrados, que son documentos de la colección `Mentor`.
- **modalidad**: Modalidad en que se imparte el curso (online, presencial).
- **plataforma**: Plataforma a través de la cual se ofrece el curso (e.g., Zoom).
- **precio**: Precio del proyecto.
- **schedules**: Lista de horarios en los que se ofrece el proyecto.
- **students**: Referencias a los estudiantes inscritos en el proyecto.
- **tag**: Etiquetas para categorizar el proyecto.
- **title**: Título del proyecto o curso.

# Endpoints de la API para `Tag`

| Método | Endpoint           | Descripción                     |
|--------|--------------------|---------------------------------|
| POST   | `/tags`             | Crear un nuevo tag              |
| GET    | `/tags`             | Obtener todos los tags          |
| GET    | `/tags/:id`         | Obtener un tag por ID           |
| PUT    | `/tags/:id`         | Actualizar un tag por ID        |
| DELETE | `/tags/:id`         | Eliminar un tag por ID          |

#  Modelo `Tag`

El modelo `Tag` representa las etiquetas o categorías para definir campos de conocimiento o expertise.


## Descripción de los campos

- **name**: Es el nombre de la etiqueta que se utilizará para categorizar diferentes entidades. Es un campo obligatorio.

# Endpoints de la API para `User`

| Método | Endpoint         | Descripción                                      |
|--------|------------------|--------------------------------------------------|
| POST   | `/users`          | Crear un nuevo usuario                          |
| POST   | `/users/login`    | Iniciar sesión (login) y generar token JWT       |
| GET    | `/users`          | Obtener todos los usuarios                      |
| GET    | `/users/:id`      | Obtener un usuario por ID                       |
| PUT    | `/users/:id`      | Actualizar un usuario por ID                    |
| DELETE | `/users/:id`      | Eliminar un usuario por ID                      |

## Modelo `User`

El modelo `User` representa la estructura de los usuarios registrados en el sistema. A continuación se describen los campos que contiene:

- `name`: **String** - El nombre del usuario. Es requerido.
- `mail`: **String** - El correo electrónico del usuario. Es requerido y debe ser único.
- `phone`: **String** - El número de teléfono del usuario. Es opcional.
- `password`: **String** - La contraseña del usuario, que será encriptada antes de almacenarse. Es requerida.
- `active`: **Boolean** - Define si el usuario está activo o no. Tiene un valor por defecto de `true`.

Este modelo permite realizar las siguientes operaciones en la base de datos: creación, búsqueda, actualización y eliminación de usuarios.

## Solicitud y Respuesta para Login

### Solicitud

- **Método:** POST
- **Endpoint:** `/users/login`
- **Descripción:** Inicia sesión y genera un token JWT.

**Cuerpo de la solicitud:**

```json
{
  "mail": "string",       // El correo electrónico del usuario
  "password": "string"    // La contraseña del usuario
}
```
**Respuesta exitosa**

```json 
{
  "message": "Login successful",
  "user": {
    "name": "John Doe",
    "mail": "john.doe@example.com",
    "phone": "+123456789",
    "_id": "64e5f0d8c5b4c00012345678"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTVmMGQ4YzViNGMwMDAxMjM0NTY3OCIsIm1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTY4MDg1Mzg2NCwiZXhwIjoxNjgwODU3NDY0fQ.S9B3w8jLl-dB9y9l_dnn1dP1QGNGK_Mn2SBbFwX4KsY"
}
```