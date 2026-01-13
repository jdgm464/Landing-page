# 🚀 Guía de Despliegue para Windows

Esta guía está optimizada para Windows con PowerShell.

## ✅ Pre-requisitos

1. **Node.js instalado** (verifica con):
   ```powershell
   node --version
   npm --version
   ```

2. **Git instalado** (verifica con):
   ```powershell
   git --version
   ```

Si no los tienes:
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/download/win

---

## 📦 Paso 1: Preparar el Proyecto

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Instalar dependencias
npm install

# Verificar que el build funcione
npm run build

# Verificar la configuración de Vercel
npm run vercel-check
```

Si todo está ✅, continúa al siguiente paso.

---

## 🔧 Paso 2: Configurar Git (Si es primera vez)

```powershell
# Configurar tu nombre y email (solo primera vez)
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@gmail.com"

# Verificar configuración
git config --list
```

---

## 📤 Paso 3: Subir a GitHub

### 3.1 Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `mi-portfolio` (o el que prefieras)
3. Deja todo en **Public** o **Private**
4. NO marques ninguna opción (README, .gitignore, etc.)
5. Click en **"Create repository"**

### 3.2 Subir el código desde PowerShell

```powershell
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer primer commit
git commit -m "Initial commit - Portfolio listo para Vercel"

# Renombrar rama a main
git branch -M main

# Conectar con GitHub (REEMPLAZA con tu URL)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# Subir a GitHub
git push -u origin main
```

**Nota:** Si te pide credenciales, usa un Personal Access Token desde GitHub.

---

## 🌐 Paso 4: Desplegar en Vercel

### Opción A: Desde la Web (Más Fácil) ⭐

1. **Ir a Vercel:**
   - https://vercel.com/signup

2. **Iniciar sesión con GitHub:**
   - Click en "Continue with GitHub"
   - Autoriza Vercel

3. **Importar proyecto:**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio
   - Click en "Import"

4. **Configuración (auto-detectada):**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - ✅ Todo debería estar correcto

5. **Deploy:**
   - Click en "Deploy"
   - ⏳ Espera 1-2 minutos
   - 🎉 ¡Tu sitio está en línea!

### Opción B: Desde PowerShell con CLI

```powershell
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login (abrirá el navegador)
vercel login

# Desplegar (modo preview)
vercel

# Desplegar en producción
vercel --prod
```

---

## 🔄 Paso 5: Actualizar el Sitio

Cada vez que hagas cambios:

```powershell
# Ver cambios
git status

# Agregar cambios
git add .

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir a GitHub
git push
```

**Vercel desplegará automáticamente** los cambios en 1-2 minutos. 🚀

---

## 🌐 Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Tu proyecto
2. Settings → Domains
3. Agrega tu dominio: `miportfolio.com`
4. Sigue las instrucciones DNS

**Dominio gratis de Vercel:**
Tu sitio estará en: `tu-proyecto.vercel.app`

---

## 🐛 Solución de Problemas Windows

### Error: "git no se reconoce..."
**Solución:** Instala Git desde https://git-scm.com/download/win

### Error: "npm no se reconoce..."
**Solución:** Instala Node.js desde https://nodejs.org/

### Error: "PowerShell no permite ejecutar scripts"
**Solución:** Ejecuta como Administrador:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error al hacer push a GitHub
**Solución:** Usa Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Selecciona `repo`
3. Copia el token
4. Úsalo como contraseña al hacer push

### Error: "Cannot find module 'typescript'"
**Solución:**
```powershell
npm install --save-dev typescript @types/react @types/react-dom
```

---

## 📊 Ver tu Sitio en Producción

Después del despliegue:
```
🌐 https://tu-proyecto.vercel.app
```

Vercel te enviará un email con el enlace.

---

## 🎯 Comandos Rápidos

```powershell
# Desarrollo local
npm run dev

# Build de prueba
npm run build

# Preview del build
npm run preview

# Verificar configuración
npm run vercel-check

# Ver status de Git
git status

# Ver commits
git log --oneline
```

---

## 📱 Panel de Control Vercel

- **Dashboard:** https://vercel.com/dashboard
- **Ver logs:** Click en tu proyecto → Deployments → Click en un deployment
- **Analytics:** Click en tu proyecto → Analytics
- **Settings:** Click en tu proyecto → Settings

---

## ✨ Características Incluidas

✅ HTTPS automático y seguro
✅ CDN global ultrarrápido
✅ Despliegues ilimitados (plan gratuito)
✅ Preview para cada branch
✅ Rollback instantáneo
✅ Analytics incluido
✅ Logs en tiempo real
✅ Sin configuración de servidores

---

## 💡 Tips Pro

1. **Branches de desarrollo:**
   ```powershell
   git checkout -b desarrollo
   git push -u origin desarrollo
   ```
   Vercel creará un preview automático.

2. **Ver preview antes de producción:**
   - Cada push genera un URL de preview
   - Verifica que todo funcione antes de mergear a main

3. **Variables de entorno:**
   - Settings → Environment Variables
   - Deben empezar con `VITE_`

---

## 🎓 Recursos Adicionales

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Git Tutorial:** https://git-scm.com/book/es/v2

---

## 📞 Contacto

José Daniel Guzmán Mata
- Email: jdgm464@gmail.com
- GitHub: [Tu username]
- Portfolio: [Tu URL de Vercel]

---

**¡Tu portfolio estará en línea en menos de 10 minutos!** 🎉🚀

