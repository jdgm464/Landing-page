#!/usr/bin/env node

/**
 * Script de verificación pre-despliegue para Vercel
 * Ejecutar con: node vercel-check.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para despliegue en Vercel...\n');

let errors = 0;
let warnings = 0;

// Verificar archivos requeridos
const requiredFiles = [
  'package.json',
  'index.html',
  'vite.config.ts',
  'vercel.json',
  'src/main.tsx'
];

console.log('📁 Verificando archivos requeridos...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - NO ENCONTRADO`);
    errors++;
  }
});

// Verificar package.json
console.log('\n📦 Verificando package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('  ✅ Script "build" encontrado');
  } else {
    console.log('  ❌ Script "build" no encontrado');
    errors++;
  }
  
  if (packageJson.scripts && packageJson.scripts.dev) {
    console.log('  ✅ Script "dev" encontrado');
  } else {
    console.log('  ⚠️  Script "dev" no encontrado');
    warnings++;
  }
  
  if (packageJson.dependencies && packageJson.dependencies.react) {
    console.log('  ✅ React instalado');
  } else {
    console.log('  ❌ React no encontrado en dependencias');
    errors++;
  }
} catch (e) {
  console.log('  ❌ Error leyendo package.json');
  errors++;
}

// Verificar vercel.json
console.log('\n⚙️  Verificando vercel.json...');
try {
  const vercelJson = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  
  if (vercelJson.buildCommand) {
    console.log(`  ✅ Build command: ${vercelJson.buildCommand}`);
  }
  
  if (vercelJson.outputDirectory) {
    console.log(`  ✅ Output directory: ${vercelJson.outputDirectory}`);
  }
  
  if (vercelJson.framework) {
    console.log(`  ✅ Framework: ${vercelJson.framework}`);
  }
} catch (e) {
  console.log('  ❌ Error leyendo vercel.json');
  errors++;
}

// Verificar estructura de directorios
console.log('\n📂 Verificando estructura de directorios...');
const requiredDirs = ['src', 'src/components'];
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}/`);
  } else {
    console.log(`  ⚠️  ${dir}/ - No encontrado`);
    warnings++;
  }
});

// Verificar .gitignore
console.log('\n🚫 Verificando .gitignore...');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const important = ['node_modules', 'build', 'dist', '.env.local'];
  important.forEach(pattern => {
    if (gitignore.includes(pattern)) {
      console.log(`  ✅ Ignora ${pattern}`);
    } else {
      console.log(`  ⚠️  No ignora ${pattern}`);
      warnings++;
    }
  });
} else {
  console.log('  ⚠️  .gitignore no encontrado');
  warnings++;
}

// Verificar node_modules
console.log('\n📚 Verificando instalación...');
if (fs.existsSync('node_modules')) {
  console.log('  ✅ node_modules instalado');
} else {
  console.log('  ⚠️  node_modules no encontrado. Ejecuta: npm install');
  warnings++;
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('✅ ¡Proyecto listo para desplegar en Vercel!');
  console.log('\n🚀 Próximos pasos:');
  console.log('   1. npm run build (para probar el build)');
  console.log('   2. git add . && git commit -m "Ready for deployment"');
  console.log('   3. git push origin main');
  console.log('   4. Conectar con Vercel en https://vercel.com\n');
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(es) encontrado(s)`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} advertencia(s) encontrada(s)`);
  }
  console.log('\n💡 Soluciona los errores antes de desplegar.');
}

console.log('='.repeat(50) + '\n');

process.exit(errors > 0 ? 1 : 0);

