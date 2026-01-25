# 📡 Backend API - Curriculum Vitae

API REST para gestionar información de Curriculum Vitae usando Node.js, Express y PostgreSQL.

---

## 📦 Contenido del Proyecto

```
backend/
├── server.js                           # Servidor Express con todos los endpoints
├── db.js                               # Configuración de conexión a PostgreSQL
├── package.json                        # Dependencias del proyecto
├── .env                               # Variables de entorno (no en Git)
├── .gitignore                         # Archivos ignorados por Git
│
├── 📄 DOCUMENTACIÓN
│   ├── README_API.md                  # 📚 Documentación completa de la API
│   └── TESTING_GUIDE.md               # 🧪 Guía rápida de pruebas
│
├── 🧪 ARCHIVOS DE PRUEBAS
│   ├── API_TEST.postman_collection.json  # Colección de Postman
│   ├── api-tests.http                    # Tests para REST Client (VS Code)
│   └── api-examples.js                   # Ejemplos en JavaScript/Fetch
│
└── 📊 SQL
    └── insert_data.sql                # Script de inserción de datos
```

---

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Base de Datos

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE curriculum_db WITH ENCODING='UTF8' LC_COLLATE='es_ES.UTF-8' LC_CTYPE='es_ES.UTF-8' TEMPLATE=template0;"

# Ejecutar el script SQL (desde la carpeta raíz del proyecto)
psql -U postgres -d curriculum_db -f database/curriculum.sql
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
DB_HOST=localhost
DB_PORT=5433
DB_NAME=curriculum_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
PORT=3001
```

### 4. Iniciar el Servidor

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

Si todo está bien configurado, verás:

```
==================================================
🚀 SERVIDOR BACKEND INICIADO
==================================================
📍 URL: http://localhost:3001
🕐 Hora: [timestamp]
==================================================

📊 Endpoints disponibles:
   GET http://localhost:3001/api/persona
   GET http://localhost:3001/api/experiencias
   ...
==================================================

✅ Conectado a PostgreSQL exitosamente
📊 Base de datos: curriculum_db
🔌 Puerto: 5433
✅ Test de conexión exitoso: [timestamp]
```

---

## 📋 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check del servidor |
| `GET` | `/` | Información general de la API |
| `GET` | `/api/persona` | Información personal |
| `GET` | `/api/experiencias` | Todas las experiencias laborales |
| `GET` | `/api/experiencias/:id` | Experiencias de una persona |
| `GET` | `/api/educacion` | Registros de educación |
| `GET` | `/api/cursos` | Cursos y certificaciones |
| `GET` | `/api/habilidades` | Todas las habilidades |
| `GET` | `/api/habilidades/por-categoria` | Habilidades agrupadas |
| `GET` | `/api/proyectos` | Proyectos con tecnologías |
| `GET` | `/api/cv-completo` | Todo el CV en una petición |

**📚 Ver documentación completa:** [`README_API.md`](./README_API.md)

---

## 🧪 Probar la API

### Opción 1: Postman (Recomendado)

1. Importa `API_TEST.postman_collection.json` en Postman
2. Ejecuta las peticiones desde la colección

### Opción 2: REST Client (VS Code)

1. Instala la extensión "REST Client"
2. Abre `api-tests.http`
3. Click en "Send Request" sobre cualquier endpoint

### Opción 3: Navegador

Abre directamente en tu navegador:
```
http://localhost:3001/api/health
http://localhost:3001/api/cv-completo
```

### Opción 4: JavaScript (Consola)

Copia el contenido de `api-examples.js` en la consola del navegador y ejecuta:
```javascript
await probarTodosLosEndpoints()
```

**🧪 Ver guía completa de pruebas:** [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)

---

## 🏗️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos relacional
- **pg** - Driver de PostgreSQL para Node.js
- **dotenv** - Gestión de variables de entorno
- **CORS** - Permitir peticiones cross-origin

---

## 📊 Estructura de la Base de Datos

```
persona ──┐
          ├── experiencia_laboral
          ├── educacion
          ├── curso
          ├── habilidad ──── categoria_habilidad
          └── proyecto ──── proyecto_tecnologia
```

**Ver esquema completo:** [`../database/curriculum.sql`](../database/curriculum.sql)

---

## 🔧 Scripts Disponibles

```bash
# Iniciar en modo desarrollo (auto-reload)
npm run dev

# Iniciar en modo producción
npm start

# Información de tests
npm test
```

---

## 🌐 CORS

La API está configurada con CORS abierto para desarrollo:

```javascript
app.use(cors());
```

Para producción, restringe los orígenes en `server.js`:

```javascript
app.use(cors({
  origin: 'https://tu-dominio.com'
}));
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"

✅ **Solución:**
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Verifica que la base de datos `curriculum_db` exista

### Error: "Port 3001 already in use"

✅ **Solución:**
```bash
# Opción 1: Cambiar puerto en .env
PORT=3002

# Opción 2: Matar el proceso (Windows)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Opción 2: Matar el proceso (Linux/Mac)
lsof -ti:3001 | xargs kill -9
```

### Error: "Module not found"

✅ **Solución:**
```bash
npm install
```

### Error: "relation does not exist"

✅ **Solución:**
- Ejecuta el script SQL: `psql -U postgres -d curriculum_db -f ../database/curriculum.sql`

---

## 📁 Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `DB_HOST` | Host de PostgreSQL | `localhost` |
| `DB_PORT` | Puerto de PostgreSQL | `5433` |
| `DB_NAME` | Nombre de la base de datos | `curriculum_db` |
| `DB_USER` | Usuario de PostgreSQL | `postgres` |
| `DB_PASSWORD` | Contraseña de PostgreSQL | - |
| `PORT` | Puerto del servidor | `3001` |

---

## 📦 Dependencias

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## 📚 Documentación Adicional

- **[README_API.md](./README_API.md)** - Documentación completa de endpoints
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Guía de pruebas de la API
- **[api-examples.js](./api-examples.js)** - Ejemplos de código JavaScript
- **[api-tests.http](./api-tests.http)** - Tests REST Client
- **[API_TEST.postman_collection.json](./API_TEST.postman_collection.json)** - Colección Postman

---

## 🚀 Deploy a Producción

### Variables de Entorno en Producción

En tu servicio de hosting (Heroku, Railway, Render, etc.):

```env
DB_HOST=tu-host-postgresql.com
DB_PORT=5432
DB_NAME=curriculum_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña_segura
PORT=3001
NODE_ENV=production
```

### Configurar CORS para Producción

En `server.js`, reemplaza:

```javascript
app.use(cors()); 
```

Por:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://tu-dominio.com',
  credentials: true
}));
```

---

## 📞 Contacto

**José Daniel Guzmán Mata**
- Email: jdgm464@gmail.com
- GitHub: [@jdgm464](https://github.com/jdgm464)
- LinkedIn: [José Guzmán](https://www.linkedin.com/in/josé-guzman-819a1b33a/)

---

## 📝 Licencia

MIT License

---

**¡Tu API está lista para usar! 🎉**

Para empezar a probar, lee [`TESTING_GUIDE.md`](./TESTING_GUIDE.md)
