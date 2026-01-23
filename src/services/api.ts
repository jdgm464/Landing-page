// URL del backend
const API_URL = 'http://localhost:3001/api';

// ==========================================
// TIPOS DE DATOS
// ==========================================

export interface Persona {
  id_persona: number;
  nombre: string;
  apellido: string;
  titulo_profesional?: string;
  resumen?: string;
  foto_url?: string;
  fecha_nacimiento?: string;
  nacionalidad?: string;
  ubicacion?: string;
  email: string;
  telefono?: string;
  linkedin?: string;
  github?: string;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface ExperienciaLaboral {
  id_experiencia: number;
  id_persona: number;
  titulo_puesto: string;
  nombre_empresa: string;
  ubicacion?: string;
  fecha_inicio: string;
  fecha_fin?: string;
  actualmente_trabaja: boolean;
  descripcion?: string;
  orden: number;
}

export interface Educacion {
  id_educacion: number;
  id_persona: number;
  titulo: string;
  institucion: string;
  ubicacion?: string;
  fecha_inicio: string;
  fecha_fin?: string;
  actualmente_estudiando: boolean;
  descripcion?: string;
  orden: number;
}

export interface Curso {
  id_curso: number;
  id_persona: number;
  nombre_curso: string;
  institucion: string;
  plataforma?: string;
  fecha_obtencion?: string;
  credencial_url?: string;
  orden: number;
}

export interface Habilidad {
  id_habilidad: number;
  id_persona: number;
  id_categoria: number;
  nombre_habilidad: string;
  nivel: 'basico' | 'intermedio' | 'avanzado' | 'experto';
  orden: number;
  nombre_categoria?: string;
  categoria_icono?: string;
}

export interface Proyecto {
  id_proyecto: number;
  id_persona: number;
  nombre_proyecto: string;
  descripcion?: string;
  imagen_url?: string;
  repositorio_url?: string;
  demo_url?: string;
  orden: number;
  tecnologias?: Array<{
    id_proyecto_tecnologia: number;
    tecnologia: string;
  }>;
}

export interface CVCompleto {
  persona: Persona | null;
  experiencias: ExperienciaLaboral[];
  educacion: Educacion[];
  cursos: Curso[];
  habilidades: Habilidad[];
  proyectos: Proyecto[];
}

// ==========================================
// FUNCIONES DE API
// ==========================================

/**
 * Obtener información de la persona
 */
export async function obtenerPersona(): Promise<Persona | null> {
  try {
    const response = await fetch(`${API_URL}/persona`);
    if (!response.ok) throw new Error('Error al obtener persona');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener persona:', error);
    return null;
  }
}

/**
 * Obtener todas las experiencias laborales
 */
export async function obtenerExperiencias(): Promise<ExperienciaLaboral[]> {
  try {
    const response = await fetch(`${API_URL}/experiencias`);
    if (!response.ok) throw new Error('Error al obtener experiencias');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener experiencias:', error);
    return [];
  }
}

/**
 * Obtener toda la educación
 */
export async function obtenerEducacion(): Promise<Educacion[]> {
  try {
    const response = await fetch(`${API_URL}/educacion`);
    if (!response.ok) throw new Error('Error al obtener educación');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener educación:', error);
    return [];
  }
}

/**
 * Obtener todos los cursos
 */
export async function obtenerCursos(): Promise<Curso[]> {
  try {
    const response = await fetch(`${API_URL}/cursos`);
    if (!response.ok) throw new Error('Error al obtener cursos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    return [];
  }
}

/**
 * Obtener habilidades con categorías
 */
export async function obtenerHabilidades(): Promise<Habilidad[]> {
  try {
    const response = await fetch(`${API_URL}/habilidades`);
    if (!response.ok) throw new Error('Error al obtener habilidades');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener habilidades:', error);
    return [];
  }
}

/**
 * Obtener proyectos con tecnologías
 */
export async function obtenerProyectos(): Promise<Proyecto[]> {
  try {
    const response = await fetch(`${API_URL}/proyectos`);
    if (!response.ok) throw new Error('Error al obtener proyectos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    return [];
  }
}

/**
 * Obtener todo el CV completo en una sola petición
 */
export async function obtenerCVCompleto(): Promise<CVCompleto | null> {
  try {
    const response = await fetch(`${API_URL}/cv-completo`);
    if (!response.ok) throw new Error('Error al obtener CV completo');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener CV completo:', error);
    return null;
  }
}

/**
 * Verificar si el backend está disponible
 */
export async function verificarBackend(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend no disponible:', error);
    return false;
  }
}
