# 🏋️‍♂️ Gymember

**Sistema de gestión de membresías y administración de clientes para gimnasios**

Gymember es una aplicación web fullstack diseñada para transformar la administración de gimnasios tipo _pyme_ en Colombia, proporcionando una solución integral que abarca autenticación segura, control de acceso basado en roles y trazabilidad completa de operaciones.

La plataforma permite gestionar el ciclo de vida completo de las membresías, desde la inscripción de clientes hasta el monitoreo de vencimientos, ofreciendo transparencia operativa y herramientas de análisis para la toma de decisiones.

## ✨ ¿Qué problema resuelve?

Muchos gimnasios _pyme_ en Colombia gestionan sus membresías con hojas de cálculo o registros manuales, lo que genera:

- Falta de trazabilidad en pagos y vencimientos
- Errores humanos frecuentes
- Riesgo de fraude interno
- Pérdida de ingresos no detectada

Gymember centraliza y automatiza la gestión de membresías, ofreciendo control de vencimientos, seguridad por roles y una experiencia clara para empleados y administradores.

## 🛠️ Stack tecnológico

- **Frontend:** React.js ⚛️
- **Backend:** Node.js + Express.js 🚀
- **Base de datos:** MySQL 🗄️
- **Auth:** JWT + Cookies (httpOnly) 🍪
- **Testing:** Jest 🧪

## 🧩 Arquitectura

Gymember sigue una arquitectura cliente-servidor con separación clara de responsabilidades:

- **Frontend (React SPA):** Interfaz de usuario, gestión de estado y comunicación con la API mediante peticiones HTTP autenticadas
- **Backend (Express REST API):** Lógica de negocio, control de acceso, validaciones, generación de reportes y comunicación con la base de datos
- **Base de datos (MySQL):** Persistencia de datos relacionales para gimnasios, empleados, clientes, membresías y transacciones

## 🧩 Funcionalidades principales

- Autenticación segura con JWT y cookies httpOnly
- Login de empleados mediante código de acceso
- Dashboard operativo con feedback visual y métricas generales
- CRUD de clientes y gestión de membresías
- Módulo de vencimientos con feedback visual
- Módulo para la gestión de pagos y renovaciones de membresía
- Panel administrativo para la gestión detallada de empleados, clientes, membresías, pagos, métricas de negocio y generación de reportes financieros en PDF
- Dev Console (Modo Maestro) con acceso total al sistema y gestión de cuentas de gimnasio

## 🔐 Autenticación y seguridad

- Autenticación basada en JSON Web Tokens (JWT)
- Persistencia de sesión mediante cookies httpOnly
- Middleware de protección de rutas
- Separación de accesos entre empleados, administradores y modo desarrollador

## ⚡ Requisitos previos

- **Node.js** >= 22.x
- **npm** >= 9.x
- **MySQL** >= 8.x

## 👨‍💻 Instalación y ejecución

### Clonar el repositorio

```bash
git clone https://github.com/jmncamilo/gymember-app.git
cd gymember-app
```

### Configuración de la base de datos (MySQL)

Dentro de la [carpeta`server/db`](./server/db) encontrarás dos archivos esenciales para la gestión de la base de datos MySQL:

- `server/db/schema.sql`: define la estructura y las tablas de la base de datos
- `server/db/seed.sql`: incluye datos de ejemplo para poblar las tablas creadas

Puedes ejecutar estos scripts utilizando la herramienta de tu preferencia (CLI, MySQL Workbench, DataGrip, etc.), siguiendo el orden: primero `schema.sql` y luego `seed.sql`.

Después de crear la base de datos, configura las variables de entorno del backend con los datos de conexión correspondientes para asegurar el funcionamiento de la aplicación. A continuación se explica cómo hacerlo.

### Backend (Express.js)

```bash
cd server
npm install
npm run dev
```

#### Variables de entorno (`.env`)

_Crea un archivo `.env` en la carpeta `server` con las siguientes variables:_

```env
# Configuración del servidor
PORT=6500
FRONT_URL=http://localhost:5173

# Seguridad
JWT_SECRET=your_jwt_secret
ADMIN_KEY=your_admin_key

# Base de datos
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=your_db_port

# Entorno
NODE_ENV=development
```

> **Nota:** para producción, `NODE_ENV` debe ser igual a `production`.

### Frontend (React + Vite)

Desde la carpeta raíz:

```bash
npm install
npm run dev
```

#### Variables de entorno (`.env`)

_Crea un archivo `.env` en la raíz del frontend:_

```env
VITE_API_URL=http://localhost:6500
VITE_ADMIN_KEY=your_admin_key
```

## 📌 Estado del proyecto

Gymember se encuentra en **desarrollo activo**.  

La versión actual implementa el flujo completo de autenticación, acceso mediante código de empleado y un **dashboard operativo funcional** para la gestión diaria del gimnasio.

Adicionalmente, incluye los módulos para inscripción de clientes y asignación de membresías, lista de clientes y actualización de datos, gestión de transacciones y renovación de membresías, control de vencimientos con feedback visual y cierre de sesión.

### Demo

Puedes probar Gymember en la siguiente URL:

🔗 **[Gymember Demo](https://gymember.vercel.app)**

#### Credenciales de acceso:

- NIT: `999999999-9`
- Contraseña: `pass`
- Código de acceso: `888888`

> **Nota:** esta es una instancia de demostración con datos de prueba y con módulos limitados.

## 🌱 Misión

Gymember busca fortalecer a los pequeños y medianos gimnasios del país, fomentando la gestión de sus membresías de forma clara, profesional, segura y eficiente, dejando atrás las hojas de papel, los libros contables manipulables y contribuyendo a los procesos de auditoría interna de la empresa para entender el comportamiento del negocio.

---

🚀 _**La primera versión ha llegado...**_