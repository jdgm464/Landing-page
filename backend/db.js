const { Pool } = require('pg');
require('dotenv').config();

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'curriculum_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// Evento: Conexión exitosa
pool.on('connect', () => {
  console.log('✅ Conectado a PostgreSQL exitosamente');
  console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
  console.log(`🔌 Puerto: ${process.env.DB_PORT}`);
});

// Evento: Error en la conexión
pool.on('error', (err) => {
  console.error('❌ Error inesperado en la conexión a PostgreSQL:', err);
  process.exit(-1);
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Test de conexión exitoso:', result.rows[0].now);
    return true;
  } catch (err) {
    console.error('❌ Error en test de conexión:', err.message);
    return false;
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  testConnection
};
