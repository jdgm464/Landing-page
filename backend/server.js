const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en las peticiones

// ==========================================
// ENDPOINTS - PERSONA
// ==========================================

// Obtener información de la persona
app.get('/api/persona', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM persona LIMIT 1');
    res.json(result.rows[0] || null);
  } catch (err) {
    console.error('Error al obtener persona:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS - EXPERIENCIA LABORAL
// ==========================================

// Obtener todas las experiencias laborales
app.get('/api/experiencias', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM experiencia_laboral 
      ORDER BY actualmente_trabaja DESC, fecha_inicio DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener experiencias:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener experiencias de una persona específica
app.get('/api/experiencias/:idPersona', async (req, res) => {
  try {
    const { idPersona } = req.params;
    const result = await db.query(
      'SELECT * FROM experiencia_laboral WHERE id_persona = $1 ORDER BY orden',
      [idPersona]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener experiencias:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS - EDUCACIÓN
// ==========================================

// Obtener toda la educación
app.get('/api/educacion', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM educacion 
      ORDER BY actualmente_estudiando DESC, fecha_inicio DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener educación:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS - CURSOS
// ==========================================

// Obtener todos los cursos
app.get('/api/cursos', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM curso 
      ORDER BY fecha_obtencion DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener cursos:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS - HABILIDADES
// ==========================================

// Obtener todas las habilidades con sus categorías
app.get('/api/habilidades', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        h.*,
        c.nombre_categoria,
        c.icono as categoria_icono,
        c.orden as categoria_orden
      FROM habilidad h
      JOIN categoria_habilidad c ON h.id_categoria = c.id_categoria
      ORDER BY c.orden, h.orden
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener habilidades:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener habilidades agrupadas por categoría
app.get('/api/habilidades/por-categoria', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        c.id_categoria,
        c.nombre_categoria,
        c.icono,
        json_agg(
          json_build_object(
            'id_habilidad', h.id_habilidad,
            'nombre_habilidad', h.nombre_habilidad,
            'nivel', h.nivel,
            'orden', h.orden
          ) ORDER BY h.orden
        ) FILTER (WHERE h.id_habilidad IS NOT NULL) as habilidades
      FROM categoria_habilidad c
      LEFT JOIN habilidad h ON c.id_categoria = h.id_categoria
      GROUP BY c.id_categoria, c.nombre_categoria, c.icono
      ORDER BY c.orden
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener habilidades por categoría:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINTS - PROYECTOS
// ==========================================

// Obtener todos los proyectos con sus tecnologías
app.get('/api/proyectos', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        p.*,
        json_agg(
          json_build_object(
            'id_proyecto_tecnologia', pt.id_proyecto_tecnologia,
            'tecnologia', pt.tecnologia
          ) ORDER BY pt.tecnologia
        ) FILTER (WHERE pt.id_proyecto_tecnologia IS NOT NULL) as tecnologias
      FROM proyecto p
      LEFT JOIN proyecto_tecnologia pt ON p.id_proyecto = pt.id_proyecto
      GROUP BY p.id_proyecto
      ORDER BY p.orden
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener proyectos:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ENDPOINT - CV COMPLETO
// ==========================================

// Obtener todo el CV de una vez
app.get('/api/cv-completo', async (req, res) => {
  try {
    const [persona, experiencias, educacion, cursos, habilidades, proyectos] = await Promise.all([
      db.query('SELECT * FROM persona LIMIT 1'),
      db.query('SELECT * FROM experiencia_laboral ORDER BY actualmente_trabaja DESC, fecha_inicio DESC'),
      db.query('SELECT * FROM educacion ORDER BY actualmente_estudiando DESC, fecha_inicio DESC'),
      db.query('SELECT * FROM curso ORDER BY fecha_obtencion DESC'),
      db.query(`
        SELECT 
          h.*,
          c.nombre_categoria,
          c.icono as categoria_icono
        FROM habilidad h
        JOIN categoria_habilidad c ON h.id_categoria = c.id_categoria
        ORDER BY c.orden, h.orden
      `),
      db.query(`
        SELECT 
          p.*,
          json_agg(
            json_build_object(
              'id_proyecto_tecnologia', pt.id_proyecto_tecnologia,
              'tecnologia', pt.tecnologia
            ) ORDER BY pt.tecnologia
          ) FILTER (WHERE pt.id_proyecto_tecnologia IS NOT NULL) as tecnologias
        FROM proyecto p
        LEFT JOIN proyecto_tecnologia pt ON p.id_proyecto = pt.id_proyecto
        GROUP BY p.id_proyecto
        ORDER BY p.orden
      `)
    ]);

    res.json({
      persona: persona.rows[0] || null,
      experiencias: experiencias.rows,
      educacion: educacion.rows,
      cursos: cursos.rows,
      habilidades: habilidades.rows,
      proyectos: proyectos.rows
    });
  } catch (err) {
    console.error('Error al obtener CV completo:', err);
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API de Curriculum Vitae',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/persona',
      'GET /api/experiencias',
      'GET /api/educacion',
      'GET /api/cursos',
      'GET /api/habilidades',
      'GET /api/habilidades/por-categoria',
      'GET /api/proyectos',
      'GET /api/cv-completo'
    ]
  });
});

// ==========================================
// INICIAR SERVIDOR
// ==========================================

app.listen(PORT, async () => {
  console.log('\n' + '='.repeat(50));
  console.log('🚀 SERVIDOR BACKEND INICIADO');
  console.log('='.repeat(50));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🕐 Hora: ${new Date().toLocaleString()}`);
  console.log('='.repeat(50));
  console.log('\n📊 Endpoints disponibles:');
  console.log(`   GET http://localhost:${PORT}/api/persona`);
  console.log(`   GET http://localhost:${PORT}/api/experiencias`);
  console.log(`   GET http://localhost:${PORT}/api/educacion`);
  console.log(`   GET http://localhost:${PORT}/api/cursos`);
  console.log(`   GET http://localhost:${PORT}/api/habilidades`);
  console.log(`   GET http://localhost:${PORT}/api/proyectos`);
  console.log(`   GET http://localhost:${PORT}/api/cv-completo`);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Probar conexión a la base de datos
  await db.testConnection();
});

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('❌ Error no manejado:', err);
  process.exit(1);
});
