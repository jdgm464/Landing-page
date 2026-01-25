# 📡 API de Curriculum Vitae - Documentación

## 🚀 Inicio Rápido

### 1. Configurar Base de Datos

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE curriculum_db WITH ENCODING='UTF8' LC_COLLATE='es_ES.UTF-8' LC_CTYPE='es_ES.UTF-8' TEMPLATE=template0;"

# Ejecutar el script SQL
psql -U postgres -d curriculum_db -f ../database/curriculum.sql
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `backend/`:

```env
DB_HOST=localhost
DB_PORT=5433
DB_NAME=curriculum_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña_aqui
PORT=3001
```

### 3. Instalar Dependencias e Iniciar

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con auto-reload)
npm run dev

# Modo producción
npm start
```

## 📋 Endpoints Disponibles

### Base URL
```
http://localhost:3001
```

---

## 🏥 Health Check

### GET `/api/health`
Verifica que el servidor esté funcionando correctamente.

**Respuesta:**
```json
{
  "status": "ok",
  "message": "Backend funcionando correctamente",
  "timestamp": "2026-01-25T10:30:00.000Z"
}
```

### GET `/`
Información general de la API y lista de endpoints.

**Respuesta:**
```json
{
  "message": "API de Curriculum Vitae",
  "version": "1.0.0",
  "endpoints": [...]
}
```

---

## 👤 Persona

### GET `/api/persona`
Obtiene la información personal del currículum.

**Respuesta:**
```json
{
  "id_persona": 1,
  "nombre": "José Daniel",
  "apellido": "Guzmán Mata",
  "titulo_profesional": "Bachiller en Ciencias",
  "resumen": "Desarrollador Full Stack...",
  "foto_url": null,
  "fecha_nacimiento": null,
  "nacionalidad": null,
  "ubicacion": "Puerto Ordaz – Estado Bolívar",
  "email": "jdgm464@gmail.com",
  "telefono": "0412 9778551",
  "linkedin": "https://www.linkedin.com/in/josé-guzman-819a1b33a/",
  "github": "https://github.com/jdgm464",
  "fecha_creacion": "2026-01-25T10:00:00.000Z",
  "fecha_actualizacion": "2026-01-25T10:00:00.000Z"
}
```

---

## 💼 Experiencia Laboral

### GET `/api/experiencias`
Obtiene todas las experiencias laborales ordenadas por fecha.

**Respuesta:**
```json
[
  {
    "id_experiencia": 1,
    "id_persona": 1,
    "titulo_puesto": "Desarrollador Web",
    "nombre_empresa": "Freelance",
    "ubicacion": "Remoto",
    "fecha_inicio": "2023-01-01",
    "fecha_fin": null,
    "actualmente_trabaja": true,
    "descripcion": "Desarrollo de aplicaciones web...",
    "orden": 1
  }
]
```

### GET `/api/experiencias/:idPersona`
Obtiene las experiencias laborales de una persona específica.

**Parámetros:**
- `idPersona` (number): ID de la persona

**Ejemplo:**
```
GET /api/experiencias/1
```

---

## 🎓 Educación

### GET `/api/educacion`
Obtiene todos los registros de educación ordenados por fecha.

**Respuesta:**
```json
[
  {
    "id_educacion": 1,
    "id_persona": 1,
    "titulo": "Bachiller en Ciencias",
    "institucion": "Institución Educativa",
    "ubicacion": "Puerto Ordaz, Venezuela",
    "fecha_inicio": "2018-01-01",
    "fecha_fin": "2023-12-31",
    "actualmente_estudiando": false,
    "descripcion": "Formación académica en ciencias.",
    "orden": 1
  }
]
```

---

## 📚 Cursos y Certificaciones

### GET `/api/cursos`
Obtiene todos los cursos y certificaciones ordenados por fecha.

**Respuesta:**
```json
[
  {
    "id_curso": 1,
    "id_persona": 1,
    "nombre_curso": "Programación en C, C++, Java Básico",
    "institucion": "Centro de Formación",
    "plataforma": "Presencial",
    "fecha_obtencion": "2020-08-01",
    "credencial_url": null,
    "orden": 1
  }
]
```

---

## 💡 Habilidades

### GET `/api/habilidades`
Obtiene todas las habilidades con información de su categoría.

**Respuesta:**
```json
[
  {
    "id_habilidad": 1,
    "id_persona": 1,
    "id_categoria": 1,
    "nombre_habilidad": "CSS",
    "nivel": "avanzado",
    "orden": 1,
    "nombre_categoria": "Frontend",
    "categoria_icono": "code",
    "categoria_orden": 1
  }
]
```

### GET `/api/habilidades/por-categoria`
Obtiene las habilidades agrupadas por categoría en formato JSON.

**Respuesta:**
```json
[
  {
    "id_categoria": 1,
    "nombre_categoria": "Frontend",
    "icono": "code",
    "habilidades": [
      {
        "id_habilidad": 1,
        "nombre_habilidad": "CSS",
        "nivel": "avanzado",
        "orden": 1
      },
      {
        "id_habilidad": 2,
        "nombre_habilidad": "Bootstrap",
        "nivel": "avanzado",
        "orden": 2
      }
    ]
  }
]
```

---

## 🚀 Proyectos

### GET `/api/proyectos`
Obtiene todos los proyectos con sus tecnologías asociadas.

**Respuesta:**
```json
[
  {
    "id_proyecto": 1,
    "id_persona": 1,
    "nombre_proyecto": "Medisoft",
    "descripcion": "Aplicación de escritorio que permite realizar órdenes...",
    "imagen_url": null,
    "repositorio_url": "https://github.com/jdgm464/LaboratorioAplicacion-main-main",
    "demo_url": null,
    "orden": 1,
    "tecnologias": [
      {
        "id_proyecto_tecnologia": 1,
        "tecnologia": "Java"
      },
      {
        "id_proyecto_tecnologia": 2,
        "tecnologia": "Swing"
      },
      {
        "id_proyecto_tecnologia": 3,
        "tecnologia": "MySQL"
      },
      {
        "id_proyecto_tecnologia": 4,
        "tecnologia": "NetBeans"
      }
    ]
  }
]
```

---

## 📄 CV Completo

### GET `/api/cv-completo`
Obtiene toda la información del CV en una sola petición.

**Respuesta:**
```json
{
  "persona": { ... },
  "experiencias": [ ... ],
  "educacion": [ ... ],
  "cursos": [ ... ],
  "habilidades": [ ... ],
  "proyectos": [ ... ]
}
```

---

## 🧪 Probar la API

### Opción 1: Postman

1. Importa el archivo `API_TEST.postman_collection.json`
2. La variable `base_url` está configurada como `http://localhost:3001`
3. Ejecuta las peticiones desde la colección

### Opción 2: REST Client (VS Code)

1. Instala la extensión "REST Client" en VS Code
2. Abre el archivo `api-tests.http`
3. Haz clic en "Send Request" sobre cualquier línea GET

### Opción 3: cURL

```bash
# Health Check
curl http://localhost:3001/api/health

# Obtener persona
curl http://localhost:3001/api/persona

# CV completo
curl http://localhost:3001/api/cv-completo
```

### Opción 4: Navegador

Simplemente visita las URLs en tu navegador:
- http://localhost:3001/api/health
- http://localhost:3001/api/persona
- http://localhost:3001/api/cv-completo

---

## 📊 Estructura de Respuestas

### Respuesta Exitosa
```json
{
  "data": [ ... ]
}
```

### Respuesta de Error
```json
{
  "error": "Mensaje de error descriptivo"
}
```

**Códigos de Estado HTTP:**
- `200 OK`: Petición exitosa
- `500 Internal Server Error`: Error en el servidor o base de datos

---

## 🔧 Configuración CORS

La API está configurada con CORS abierto para desarrollo:
```javascript
app.use(cors());
```

Para producción, restringe los orígenes:
```javascript
app.use(cors({
  origin: 'https://tu-dominio.com'
}));
```

---

## 📦 Dependencias

```json
{
  "express": "^4.18.2",
  "pg": "^8.11.3",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en el archivo `.env`
- Verifica que la base de datos `curriculum_db` exista

### Error: "Port already in use"
- Cambia el puerto en `.env`: `PORT=3002`
- O mata el proceso que está usando el puerto 3001

### Error: "Module not found"
```bash
npm install
```

---

## 📞 Contacto

**José Daniel Guzmán Mata**
- Email: jdgm464@gmail.com
- GitHub: [@jdgm464](https://github.com/jdgm464)
- LinkedIn: [José Guzmán](https://www.linkedin.com/in/josé-guzman-819a1b33a/)

---

## 📝 Licencia

MIT License - Ver archivo LICENSE para más detalles
