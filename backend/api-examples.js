/**
 * ================================================
 * EJEMPLOS DE USO DE LA API - JavaScript/Fetch
 * ================================================
 * 
 * Este archivo contiene ejemplos de cómo consumir
 * la API del Curriculum Vitae usando JavaScript
 * y la API Fetch.
 * 
 * Autor: José Daniel Guzmán Mata
 * ================================================
 */

const API_BASE_URL = 'http://localhost:3001/api';

// ================================================
// FUNCIONES HELPER
// ================================================

/**
 * Función genérica para hacer peticiones GET
 */
async function fetchAPI(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// ================================================
// ENDPOINTS
// ================================================

async function checkHealth() {
  const data = await fetchAPI('/health');
  console.log('✅ Health Check:', data);
  return data;
}

async function getPersona() {
  const persona = await fetchAPI('/persona');
  console.log('👤 Persona:', persona);
  return persona;
}

async function getExperiencias() {
  const experiencias = await fetchAPI('/experiencias');
  console.log('💼 Experiencias:', experiencias);
  return experiencias;
}

async function getEducacion() {
  const educacion = await fetchAPI('/educacion');
  console.log('🎓 Educación:', educacion);
  return educacion;
}

async function getCursos() {
  const cursos = await fetchAPI('/cursos');
  console.log('📚 Cursos:', cursos);
  return cursos;
}

async function getHabilidades() {
  const habilidades = await fetchAPI('/habilidades');
  console.log('💡 Habilidades:', habilidades);
  return habilidades;
}

async function getHabilidadesPorCategoria() {
  const habilidades = await fetchAPI('/habilidades/por-categoria');
  console.log('💡 Habilidades por Categoría:', habilidades);
  return habilidades;
}

async function getProyectos() {
  const proyectos = await fetchAPI('/proyectos');
  console.log('🚀 Proyectos:', proyectos);
  return proyectos;
}

async function getCVCompleto() {
  const cv = await fetchAPI('/cv-completo');
  console.log('📄 CV Completo:', cv);
  return cv;
}

// ================================================
// EJEMPLO DE USO
// ================================================

async function probarTodosLosEndpoints() {
  console.log('\n🚀 INICIANDO PRUEBAS DE LA API...\n');
  
  await checkHealth();
  await getPersona();
  await getExperiencias();
  await getEducacion();
  await getCursos();
  await getHabilidades();
  await getHabilidadesPorCategoria();
  await getProyectos();
  await getCVCompleto();
  
  console.log('\n✅ PRUEBAS COMPLETADAS\n');
}

// Para ejecutar en la consola del navegador:
// probarTodosLosEndpoints()

console.log('✅ Funciones de API cargadas');
console.log('💡 Usa: probarTodosLosEndpoints()');
