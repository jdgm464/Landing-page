# Landing Page - Portfolio & Curriculum

Portfolio profesional con página de curriculum integrada, construido con React, TypeScript y Vite.

## 🚀 Desplegar en Vercel

### Opción 1: Despliegue desde GitHub (Recomendado)

1. **Sube tu proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```

2. **Conecta con Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Add New Project"
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"

### Opción 2: Despliegue desde la CLI

1. **Instala Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```

   Para producción:
   ```bash
   vercel --prod
   ```

### Opción 3: Despliegue Directo (Sin Git)

1. Ve a [vercel.com](https://vercel.com)
2. Arrastra y suelta la carpeta `build` después de ejecutar:
   ```bash
   npm run build
   ```

## 📦 Comandos Disponibles

```bash
# Instalar dependencias
npm install

# Modo desarrollo (http://localhost:3000)
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🔧 Configuración de Vercel

El proyecto incluye un archivo `vercel.json` configurado con:
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Framework:** Vite
- **Rewrites:** Configurado para SPAs (Single Page Applications)

## 📝 Variables de Entorno

Si necesitas variables de entorno:

1. Crea un archivo `.env.local`:
   ```
   VITE_API_URL=https://tu-api.com
   ```

2. En Vercel, ve a:
   - Project Settings → Environment Variables
   - Agrega las mismas variables

## 🌐 Dominio Personalizado

Después del despliegue, puedes agregar un dominio personalizado:
1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado

## 📱 Características

- ✅ Responsive Design
- ✅ React Router para navegación
- ✅ Tailwind CSS
- ✅ Componentes UI con Radix UI
- ✅ Optimizado para SEO
- ✅ Fast Refresh con Vite

## 🔄 Actualizaciones Automáticas

Si conectaste con GitHub, Vercel desplegará automáticamente cada vez que hagas push a tu rama principal:

```bash
git add .
git commit -m "Actualización"
git push
```

## 📊 Analytics y Monitoreo

Vercel incluye:
- Analytics de tráfico
- Web Vitals
- Logs en tiempo real
- Preview deployments para cada PR

## 🆘 Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
npm run build
```

### Error: "Build failed"
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no haya errores de TypeScript

### Error: "404 on refresh"
- El archivo `vercel.json` ya está configurado para resolver esto

## 📞 Contacto

José Daniel Guzmán Mata
- Email: jdgm464@gmail.com
- Ubicación: Puerto Ordaz, Venezuela

---

**Nota:** Este proyecto está optimizado para desplegarse en Vercel con configuración cero. Solo necesitas conectar tu repositorio y desplegar. 🚀
