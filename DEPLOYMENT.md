# 🚀 Guía Rápida de Despliegue en Vercel

## Método 1: GitHub + Vercel (Más Recomendado) ⭐

### Paso 1: Preparar el proyecto
```bash
# Asegúrate de tener todas las dependencias instaladas
npm install

# Verifica que el build funcione
npm run build
```

### Paso 2: Subir a GitHub
```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Ready for deployment"

# Crear rama main
git branch -M main

# Agregar repositorio remoto (reemplaza con tu URL)
git remote add origin https://github.com/tu-usuario/tu-repositorio.git

# Subir a GitHub
git push -u origin main
```

### Paso 3: Conectar con Vercel
1. Ve a https://vercel.com/signup
2. Inicia sesión con GitHub
3. Haz clic en **"Add New..."** → **"Project"**
4. Importa tu repositorio de GitHub
5. Vercel detectará automáticamente:
   - Framework: **Vite**
   - Build Command: **npm run build**
   - Output Directory: **build**
6. Haz clic en **"Deploy"**

¡Listo! Tu sitio estará en línea en menos de 1 minuto. 🎉

---

## Método 2: Vercel CLI (Rápido)

### Instalación
```bash
npm install -g vercel
```

### Despliegue
```bash
# Login (solo la primera vez)
vercel login

# Desplegar en preview
vercel

# Desplegar en producción
vercel --prod
```

---

## Método 3: Despliegue Manual

1. **Construir el proyecto:**
   ```bash
   npm run build
   ```

2. **Subir a Vercel:**
   - Ve a https://vercel.com
   - Arrastra y suelta la carpeta `build/`
   - ¡Listo!

---

## 🔄 Actualizaciones Automáticas

Si usaste el Método 1 (GitHub), cada vez que hagas push:
```bash
git add .
git commit -m "Actualización"
git push
```

Vercel automáticamente:
- Detectará los cambios
- Construirá el proyecto
- Desplegará la nueva versión
- Te enviará un email con el enlace

---

## 🌐 Configurar Dominio Personalizado

Después del despliegue:
1. Ve a tu proyecto en Vercel
2. **Settings** → **Domains**
3. Agrega tu dominio (ej: `miportfolio.com`)
4. Sigue las instrucciones para configurar DNS

---

## 📊 Características Incluidas

✅ HTTPS automático
✅ CDN global
✅ Deploy previews
✅ Analytics integrado
✅ Logs en tiempo real
✅ Rollback instantáneo
✅ Sin costo (plan gratuito)

---

## ⚠️ Problemas Comunes

### Error: "Build failed"
**Solución:** Asegúrate de instalar dependencias
```bash
npm install
npm run build
```

### Error: "Module not found"
**Solución:** Verifica que todas las importaciones sean correctas

### Página en blanco después del despliegue
**Solución:** Verifica la consola del navegador y los logs de Vercel

---

## 📝 Variables de Entorno en Vercel

Si necesitas variables de entorno:

1. En Vercel: **Settings** → **Environment Variables**
2. Agrega tus variables (deben empezar con `VITE_`):
   ```
   VITE_API_URL = https://api.ejemplo.com
   ```
3. Redespliega el proyecto

---

## 🎯 URLs Importantes

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Documentación:** https://vercel.com/docs
- **Status:** https://vercel-status.com

---

## 💡 Tips

1. **Preview Deployments:** Cada branch/PR genera un preview único
2. **Rollback:** Puedes volver a cualquier versión anterior en segundos
3. **Analytics:** Monitorea visitantes y rendimiento gratis
4. **Edge Functions:** Puedes agregar APIs serverless fácilmente

---

## 📞 ¿Necesitas Ayuda?

- Documentación Vercel: https://vercel.com/docs
- Documentación Vite: https://vitejs.dev
- Support: https://vercel.com/support

---

**¡Tu sitio estará en producción en menos de 5 minutos!** 🚀

