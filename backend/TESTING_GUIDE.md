# 🧪 Guía Rápida de Pruebas de la API

## ✅ Archivos Creados

En la carpeta `backend/` ahora tienes:

1. **`API_TEST.postman_collection.json`** - Colección de Postman
2. **`api-tests.http`** - Tests para REST Client (VS Code)
3. **`api-examples.js`** - Ejemplos en JavaScript/Fetch
4. **`README_API.md`** - Documentación completa de la API

## 🚀 Métodos de Prueba

### Método 1: Postman (Recomendado) ⭐

1. **Descargar Postman:**
   - https://www.postman.com/downloads/

2. **Importar la colección:**
   - Abre Postman
   - Click en "Import"
   - Selecciona `API_TEST.postman_collection.json`
   - ¡Listo! Verás todos los endpoints organizados

3. **Usar:**
   - Asegúrate que el servidor esté corriendo (`npm run dev`)
   - Selecciona cualquier petición
   - Click en "Send"
   - Verás la respuesta abajo

### Método 2: REST Client (VS Code)

1. **Instalar extensión:**
   - Abre VS Code
   - Ve a Extensions (Ctrl+Shift+X)
   - Busca "REST Client"
   - Instala "REST Client" por Huachao Mao

2. **Usar:**
   - Abre el archivo `api-tests.http`
   - Verás "Send Request" sobre cada línea GET
   - Click en "Send Request"
   - La respuesta aparecerá en una nueva pestaña

### Método 3: Navegador

Simplemente abre estas URLs en tu navegador:

```
http://localhost:3001/api/health
http://localhost:3001/api/persona
http://localhost:3001/api/experiencias
http://localhost:3001/api/educacion
http://localhost:3001/api/cursos
http://localhost:3001/api/habilidades
http://localhost:3001/api/habilidades/por-categoria
http://localhost:3001/api/proyectos
http://localhost:3001/api/cv-completo
```

### Método 4: Consola del Navegador (JavaScript)

1. Abre cualquier página en tu navegador
2. Presiona F12 (DevTools)
3. Ve a la pestaña Console
4. Copia y pega el contenido de `api-examples.js`
5. Ejecuta:
```javascript
probarTodosLosEndpoints()
```

O prueba endpoints individuales:
```javascript
await checkHealth()
await getPersona()
await getCVCompleto()
await mostrarCVCompleto()
```

### Método 5: cURL (Terminal)

```bash
# Health Check
curl http://localhost:3001/api/health

# Persona
curl http://localhost:3001/api/persona

# CV Completo
curl http://localhost:3001/api/cv-completo

# Con formato bonito (usando jq)
curl http://localhost:3001/api/cv-completo | jq
```

### Método 6: PowerShell (Windows)

```powershell
# Health Check
Invoke-RestMethod -Uri "http://localhost:3001/api/health" | ConvertTo-Json

# Persona
Invoke-RestMethod -Uri "http://localhost:3001/api/persona" | ConvertTo-Json

# CV Completo
Invoke-RestMethod -Uri "http://localhost:3001/api/cv-completo" | ConvertTo-Json -Depth 10
```

## 📋 Lista de Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Health check del servidor |
| GET | `/` | Información de la API |
| GET | `/api/persona` | Información personal |
| GET | `/api/experiencias` | Todas las experiencias |
| GET | `/api/experiencias/:id` | Experiencias por persona |
| GET | `/api/educacion` | Toda la educación |
| GET | `/api/cursos` | Todos los cursos |
| GET | `/api/habilidades` | Todas las habilidades |
| GET | `/api/habilidades/por-categoria` | Habilidades agrupadas |
| GET | `/api/proyectos` | Todos los proyectos |
| GET | `/api/cv-completo` | Todo el CV en una petición |

## ⚠️ Antes de Probar

1. **Base de datos creada:**
   ```bash
   psql -U postgres -c "CREATE DATABASE curriculum_db"
   ```

2. **Script SQL ejecutado:**
   ```bash
   psql -U postgres -d curriculum_db -f ../database/curriculum.sql
   ```

3. **Variables de entorno configuradas:**
   - Archivo `.env` creado con credenciales correctas

4. **Servidor corriendo:**
   ```bash
   npm install
   npm run dev
   ```
   
   Deberías ver:
   ```
   ✅ Conectado a PostgreSQL exitosamente
   🚀 SERVIDOR BACKEND INICIADO
   📍 URL: http://localhost:3001
   ```

## 🎯 Prueba Rápida

**Opción más rápida (navegador):**

1. Asegúrate que el servidor esté corriendo
2. Abre en tu navegador: http://localhost:3001/api/health
3. Si ves `{"status":"ok"}`, ¡todo funciona!
4. Prueba: http://localhost:3001/api/cv-completo

## 💡 Tips

- **JSON Formatter:** Instala una extensión para ver JSON bonito en el navegador
  - Chrome: "JSON Formatter"
  - Firefox: "JSONView"

- **Postman Alternatives:**
  - Insomnia: https://insomnia.rest/
  - Thunder Client: Extensión de VS Code

- **Auto-refresh:** En Postman, puedes guardar las peticiones y crear tests automáticos

## 🐛 Problemas Comunes

**Error: "Failed to fetch" o "net::ERR_CONNECTION_REFUSED"**
- ✅ Verifica que el servidor esté corriendo
- ✅ Verifica que esté en el puerto correcto (3001)

**Error: "database does not exist"**
- ✅ Crea la base de datos: `createdb curriculum_db`
- ✅ O usa: `psql -U postgres -c "CREATE DATABASE curriculum_db"`

**Error: "password authentication failed"**
- ✅ Verifica las credenciales en `.env`
- ✅ Verifica que PostgreSQL esté corriendo

## 📞 Más Ayuda

- Ver documentación completa: `README_API.md`
- Ver ejemplos de código: `api-examples.js`
- Ejecutar tests HTTP: `api-tests.http`
- Usar colección Postman: `API_TEST.postman_collection.json`

---

**¡Feliz Testing! 🎉**
