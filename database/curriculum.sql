-- ================================================
-- Script SQL: Sistema de Gestión de Curriculum Vitae
-- Base de Datos: PostgreSQL 14+
-- Autor: José Daniel Guzmán Mata
-- Fecha: Enero 2026
-- ================================================

-- Crear base de datos
-- Ejecutar esta línea desde psql o pgAdmin conectado a la base 'postgres'
-- CREATE DATABASE curriculum_db WITH ENCODING='UTF8' LC_COLLATE='es_ES.UTF-8' LC_CTYPE='es_ES.UTF-8' TEMPLATE=template0;

-- Conectarse a la base de datos curriculum_db antes de ejecutar el resto
-- \c curriculum_db

-- ================================================
-- Tabla: PERSONA
-- ================================================
CREATE TABLE persona (
    id_persona SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    titulo_profesional VARCHAR(200),
    resumen TEXT,
    foto_url VARCHAR(255),
    fecha_nacimiento DATE,
    nacionalidad VARCHAR(50),
    ubicacion VARCHAR(200),
    email VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(50),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para persona
CREATE INDEX idx_persona_email ON persona(email);
CREATE INDEX idx_persona_nombre_apellido ON persona(nombre, apellido);

-- Trigger para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_persona_fecha_actualizacion
BEFORE UPDATE ON persona
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_modificacion();

-- ================================================
-- Tabla: EXPERIENCIA_LABORAL
-- ================================================
CREATE TABLE experiencia_laboral (
    id_experiencia SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    titulo_puesto VARCHAR(200) NOT NULL,
    nombre_empresa VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(200),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    actualmente_trabaja BOOLEAN DEFAULT FALSE,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT fk_experiencia_persona FOREIGN KEY (id_persona) 
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT chk_experiencia_fechas CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio),
    CONSTRAINT chk_experiencia_orden CHECK (orden >= 0)
);

-- Índices para experiencia_laboral
CREATE INDEX idx_experiencia_persona ON experiencia_laboral(id_persona);
CREATE INDEX idx_experiencia_fecha_inicio ON experiencia_laboral(fecha_inicio DESC);

-- ================================================
-- Tabla: EDUCACION
-- ================================================
CREATE TABLE educacion (
    id_educacion SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    ubicacion VARCHAR(200),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    actualmente_estudiando BOOLEAN DEFAULT FALSE,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT fk_educacion_persona FOREIGN KEY (id_persona) 
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT chk_educacion_fechas CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio),
    CONSTRAINT chk_educacion_orden CHECK (orden >= 0)
);

-- Índices para educacion
CREATE INDEX idx_educacion_persona ON educacion(id_persona);
CREATE INDEX idx_educacion_fecha_inicio ON educacion(fecha_inicio DESC);

-- ================================================
-- Tabla: CURSO
-- ================================================
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    nombre_curso VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    plataforma VARCHAR(100),
    fecha_obtencion DATE,
    credencial_url VARCHAR(255),
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT fk_curso_persona FOREIGN KEY (id_persona) 
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT chk_curso_orden CHECK (orden >= 0)
);

-- Índices para curso
CREATE INDEX idx_curso_persona ON curso(id_persona);
CREATE INDEX idx_curso_fecha ON curso(fecha_obtencion DESC);

-- ================================================
-- Tabla: CATEGORIA_HABILIDAD
-- ================================================
CREATE TABLE categoria_habilidad (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    icono VARCHAR(50),
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT chk_categoria_orden CHECK (orden >= 0)
);

-- ================================================
-- Tabla: HABILIDAD
-- ================================================
CREATE TABLE habilidad (
    id_habilidad SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    id_categoria INTEGER NOT NULL,
    nombre_habilidad VARCHAR(100) NOT NULL,
    nivel VARCHAR(20) DEFAULT 'intermedio' CHECK (nivel IN ('basico', 'intermedio', 'avanzado', 'experto')),
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT fk_habilidad_persona FOREIGN KEY (id_persona) 
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT fk_habilidad_categoria FOREIGN KEY (id_categoria) 
        REFERENCES categoria_habilidad(id_categoria)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    
    CONSTRAINT chk_habilidad_orden CHECK (orden >= 0),
    CONSTRAINT uk_persona_habilidad UNIQUE (id_persona, nombre_habilidad)
);

-- Índices para habilidad
CREATE INDEX idx_habilidad_persona ON habilidad(id_persona);
CREATE INDEX idx_habilidad_categoria ON habilidad(id_categoria);

-- ================================================
-- Tabla: PROYECTO
-- ================================================
CREATE TABLE proyecto (
    id_proyecto SERIAL PRIMARY KEY,
    id_persona INTEGER NOT NULL,
    nombre_proyecto VARCHAR(200) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    repositorio_url VARCHAR(255),
    demo_url VARCHAR(255),
    orden INTEGER DEFAULT 0,
    
    CONSTRAINT fk_proyecto_persona FOREIGN KEY (id_persona) 
        REFERENCES persona(id_persona)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT chk_proyecto_orden CHECK (orden >= 0)
);

-- Índices para proyecto
CREATE INDEX idx_proyecto_persona ON proyecto(id_persona);

-- ================================================
-- Tabla: PROYECTO_TECNOLOGIA
-- ================================================
CREATE TABLE proyecto_tecnologia (
    id_proyecto_tecnologia SERIAL PRIMARY KEY,
    id_proyecto INTEGER NOT NULL,
    tecnologia VARCHAR(100) NOT NULL,
    
    CONSTRAINT fk_proyecto_tecnologia_proyecto FOREIGN KEY (id_proyecto) 
        REFERENCES proyecto(id_proyecto)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    CONSTRAINT uk_proyecto_tecnologia UNIQUE (id_proyecto, tecnologia)
);

-- Índices para proyecto_tecnologia
CREATE INDEX idx_proyecto_tecnologia_proyecto ON proyecto_tecnologia(id_proyecto);

-- ================================================
-- Datos de Ejemplo: José Daniel Guzmán Mata
-- ================================================

-- Insertar persona
INSERT INTO persona (
    nombre, apellido, titulo_profesional, resumen, ubicacion,
    email, telefono, linkedin, github
) VALUES (
    'José Daniel',
    'Guzmán Mata',
    'Bachiller en Ciencias',
    'Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Especializado en diseño web moderno, desarrollo de aplicaciones y soluciones tecnológicas innovadoras.',
    'Puerto Ordaz – Estado Bolívar',
    'jdgm464@gmail.com',
    '0412 9778551',
    'https://www.linkedin.com/in/josé-guzman-819a1b33a/',
    'https://github.com/jdgm464'
);

-- Insertar experiencia laboral (placeholders - agregar tus experiencias reales)
INSERT INTO experiencia_laboral (id_persona, titulo_puesto, nombre_empresa, ubicacion, fecha_inicio, fecha_fin, actualmente_trabaja, descripcion, orden) VALUES
(1, 'Título del Puesto', 'Nombre de la Empresa', 'Ubicación', '2023-01-01', NULL, TRUE, 'Describe tus responsabilidades y logros en este puesto.', 1);

-- Insertar educación
INSERT INTO educacion (id_persona, titulo, institucion, ubicacion, fecha_inicio, fecha_fin, actualmente_estudiando, descripcion, orden) VALUES
(1, 'Bachiller en Ciencias', 'Nombre de la Institución', 'Puerto Ordaz, Venezuela', '2018-01-01', '2023-12-31', FALSE, 'Formación académica en ciencias.', 1);

-- Insertar cursos y certificaciones
INSERT INTO curso (id_persona, nombre_curso, institucion, plataforma, fecha_obtencion, orden) VALUES
(1, 'Programación en C, Programación en C++, Programación en Java Básico', 'Centro de Formación', 'Presencial', '2020-08-01', 1),
(1, 'Fundamentos de la programación', 'Plataforma de Aprendizaje', 'Online', '2021-12-01', 2),
(1, 'Introducción al Diseño de videojuegos', 'Plataforma de Aprendizaje', 'Online', '2021-12-01', 3),
(1, 'Diseño web con HTML5 + CSS', 'Plataforma de Aprendizaje', 'Online', '2022-04-01', 4),
(1, 'Programador Web', 'Centro de Formación', 'Presencial', '2025-09-01', 5);

-- Insertar categorías de habilidades
INSERT INTO categoria_habilidad (nombre_categoria, icono, orden) VALUES
('Frontend', 'code', 1),
('Backend', 'server', 2),
('Bases de Datos', 'database', 3),
('Herramientas & DevOps', 'tool', 4);

-- Insertar habilidades (basadas en la página)
INSERT INTO habilidad (id_persona, id_categoria, nombre_habilidad, nivel, orden) VALUES
-- Frontend
(1, 1, 'CSS', 'avanzado', 1),
(1, 1, 'Bootstrap', 'avanzado', 2),
(1, 1, 'JavaScript', 'intermedio', 3),
-- Backend
(1, 2, 'HTML', 'avanzado', 1),
(1, 2, 'Node.js', 'intermedio', 2),
(1, 2, 'Java', 'intermedio', 3),
(1, 2, 'PHP', 'basico', 4),
-- Bases de Datos
(1, 3, 'MySQL', 'intermedio', 1),
(1, 3, 'SQL', 'intermedio', 2),
(1, 3, 'PostgreSQL', 'basico', 3),
-- Herramientas & DevOps
(1, 4, 'Git', 'intermedio', 1),
(1, 4, 'GitHub', 'intermedio', 2),
(1, 4, 'VS Code', 'avanzado', 3);

-- Insertar proyecto Medisoft
INSERT INTO proyecto (
    id_persona, nombre_proyecto, descripcion,
    repositorio_url, orden
) VALUES (
    1,
    'Medisoft',
    'Aplicación de escritorio que permite realizar órdenes, registrar pacientes, evaluar resultados de los exámenes.',
    'https://github.com/jdgm464/LaboratorioAplicacion-main-main',
    1
);

-- Insertar tecnologías del proyecto Medisoft
INSERT INTO proyecto_tecnologia (id_proyecto, tecnologia) VALUES
(1, 'Java'),
(1, 'Swing'),
(1, 'MySQL'),
(1, 'NetBeans');

-- ================================================
-- Vistas Útiles
-- ================================================

-- Vista: Curriculum completo de una persona
CREATE OR REPLACE VIEW vista_curriculum_completo AS
SELECT 
    p.id_persona,
    p.nombre,
    p.apellido,
    p.titulo_profesional,
    p.email,
    p.telefono,
    p.ubicacion,
    COUNT(DISTINCT e.id_experiencia) AS total_experiencias,
    COUNT(DISTINCT ed.id_educacion) AS total_educacion,
    COUNT(DISTINCT c.id_curso) AS total_cursos,
    COUNT(DISTINCT h.id_habilidad) AS total_habilidades,
    COUNT(DISTINCT pr.id_proyecto) AS total_proyectos
FROM persona p
LEFT JOIN experiencia_laboral e ON p.id_persona = e.id_persona
LEFT JOIN educacion ed ON p.id_persona = ed.id_persona
LEFT JOIN curso c ON p.id_persona = c.id_persona
LEFT JOIN habilidad h ON p.id_persona = h.id_persona
LEFT JOIN proyecto pr ON p.id_persona = pr.id_persona
GROUP BY p.id_persona, p.nombre, p.apellido, p.titulo_profesional, p.email, p.telefono, p.ubicacion;

-- Vista: Habilidades por categoría
CREATE OR REPLACE VIEW vista_habilidades_por_categoria AS
SELECT 
    ch.nombre_categoria,
    ch.icono,
    STRING_AGG(h.nombre_habilidad, ', ' ORDER BY h.orden) AS habilidades,
    COUNT(h.id_habilidad) AS cantidad_habilidades
FROM categoria_habilidad ch
LEFT JOIN habilidad h ON ch.id_categoria = h.id_categoria
WHERE h.id_persona = 1
GROUP BY ch.id_categoria, ch.nombre_categoria, ch.icono
ORDER BY ch.orden;

-- Vista: Proyectos con tecnologías
CREATE OR REPLACE VIEW vista_proyectos_completos AS
SELECT 
    pr.id_proyecto,
    pr.nombre_proyecto,
    pr.descripcion,
    pr.repositorio_url,
    pr.demo_url,
    STRING_AGG(pt.tecnologia, ', ' ORDER BY pt.tecnologia) AS tecnologias
FROM proyecto pr
LEFT JOIN proyecto_tecnologia pt ON pr.id_proyecto = pt.id_proyecto
WHERE pr.id_persona = 1
GROUP BY pr.id_proyecto, pr.nombre_proyecto, pr.descripcion, pr.repositorio_url, pr.demo_url
ORDER BY pr.orden;

-- ================================================
-- Funciones y Procedimientos Almacenados
-- ================================================

-- Función: Agregar nueva experiencia laboral
CREATE OR REPLACE FUNCTION sp_agregar_experiencia(
    p_id_persona INTEGER,
    p_titulo VARCHAR(200),
    p_empresa VARCHAR(200),
    p_ubicacion VARCHAR(200),
    p_fecha_inicio DATE,
    p_fecha_fin DATE,
    p_actualmente_trabaja BOOLEAN,
    p_descripcion TEXT
)
RETURNS TEXT AS $$
DECLARE
    v_orden INTEGER;
BEGIN
    -- Obtener el siguiente orden
    SELECT COALESCE(MAX(orden), 0) + 1 INTO v_orden
    FROM experiencia_laboral
    WHERE id_persona = p_id_persona;
    
    -- Insertar experiencia
    INSERT INTO experiencia_laboral (
        id_persona, titulo_puesto, nombre_empresa, ubicacion,
        fecha_inicio, fecha_fin, actualmente_trabaja, descripcion, orden
    ) VALUES (
        p_id_persona, p_titulo, p_empresa, p_ubicacion,
        p_fecha_inicio, p_fecha_fin, p_actualmente_trabaja, p_descripcion, v_orden
    );
    
    RETURN 'Experiencia agregada exitosamente';
END;
$$ LANGUAGE plpgsql;

-- Función: Obtener curriculum completo (retorna múltiples conjuntos de resultados)
-- Nota: PostgreSQL no soporta múltiples result sets como MySQL
-- Alternativa: Usar múltiples consultas o una función que retorne JSON

CREATE OR REPLACE FUNCTION sp_obtener_curriculum_json(p_id_persona INTEGER)
RETURNS JSON AS $$
DECLARE
    resultado JSON;
BEGIN
    SELECT json_build_object(
        'persona', (SELECT row_to_json(p.*) FROM persona p WHERE id_persona = p_id_persona),
        'experiencias', (
            SELECT json_agg(e.* ORDER BY actualmente_trabaja DESC, fecha_inicio DESC)
            FROM experiencia_laboral e
            WHERE id_persona = p_id_persona
        ),
        'educacion', (
            SELECT json_agg(ed.* ORDER BY actualmente_estudiando DESC, fecha_inicio DESC)
            FROM educacion ed
            WHERE id_persona = p_id_persona
        ),
        'cursos', (
            SELECT json_agg(c.* ORDER BY fecha_obtencion DESC)
            FROM curso c
            WHERE id_persona = p_id_persona
        ),
        'habilidades', (
            SELECT json_agg(h.*)
            FROM vista_habilidades_por_categoria h
        ),
        'proyectos', (
            SELECT json_agg(pr.*)
            FROM vista_proyectos_completos pr
        )
    ) INTO resultado;
    
    RETURN resultado;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- Triggers
-- ================================================

-- Trigger: Validar que si actualmente_trabaja es TRUE, fecha_fin sea NULL
CREATE OR REPLACE FUNCTION fn_validar_experiencia_actual()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.actualmente_trabaja = TRUE AND NEW.fecha_fin IS NOT NULL THEN
        NEW.fecha_fin = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_experiencia_actual_insert
BEFORE INSERT ON experiencia_laboral
FOR EACH ROW
EXECUTE FUNCTION fn_validar_experiencia_actual();

CREATE TRIGGER trg_validar_experiencia_actual_update
BEFORE UPDATE ON experiencia_laboral
FOR EACH ROW
EXECUTE FUNCTION fn_validar_experiencia_actual();

-- Trigger similar para educacion
CREATE OR REPLACE FUNCTION fn_validar_educacion_actual()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.actualmente_estudiando = TRUE AND NEW.fecha_fin IS NOT NULL THEN
        NEW.fecha_fin = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_educacion_actual_insert
BEFORE INSERT ON educacion
FOR EACH ROW
EXECUTE FUNCTION fn_validar_educacion_actual();

CREATE TRIGGER trg_validar_educacion_actual_update
BEFORE UPDATE ON educacion
FOR EACH ROW
EXECUTE FUNCTION fn_validar_educacion_actual();

-- ================================================
-- Consultas Útiles de Ejemplo
-- ================================================

-- Ver curriculum completo en formato JSON
-- SELECT sp_obtener_curriculum_json(1);

-- Ver solo habilidades agrupadas
-- SELECT * FROM vista_habilidades_por_categoria;

-- Ver proyectos con tecnologías
-- SELECT * FROM vista_proyectos_completos;

-- Agregar nueva experiencia
-- SELECT sp_agregar_experiencia(
--     1, 
--     'Desarrollador Full Stack', 
--     'Tech Company',
--     'Puerto Ordaz',
--     '2024-01-01',
--     NULL,
--     TRUE,
--     'Desarrollo de aplicaciones web con React y Node.js'
-- );

-- Ver curriculum completo (resumen)
-- SELECT * FROM vista_curriculum_completo;

-- Obtener todas las experiencias de una persona
-- SELECT * FROM experiencia_laboral WHERE id_persona = 1 ORDER BY fecha_inicio DESC;

-- Obtener habilidades de una categoría específica
-- SELECT h.nombre_habilidad, h.nivel 
-- FROM habilidad h
-- JOIN categoria_habilidad ch ON h.id_categoria = ch.id_categoria
-- WHERE h.id_persona = 1 AND ch.nombre_categoria = 'Frontend';

-- ================================================
-- Comandos de Administración Útiles
-- ================================================

-- Ver tamaño de la base de datos
-- SELECT pg_size_pretty(pg_database_size('curriculum_db'));

-- Ver tamaño de cada tabla
-- SELECT 
--     schemaname,
--     tablename,
--     pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Listar todas las funciones
-- SELECT proname, prosrc FROM pg_proc WHERE proname LIKE 'sp_%';

-- Backup de la base de datos (ejecutar en terminal)
-- pg_dump -U postgres -d curriculum_db -F c -b -v -f curriculum_db_backup.backup

-- Restore de la base de datos (ejecutar en terminal)
-- pg_restore -U postgres -d curriculum_db -v curriculum_db_backup.backup

-- ================================================
-- Fin del Script
-- ================================================

-- COMENTARIOS IMPORTANTES:
-- 1. Ejecutar primero la creación de la base de datos desde psql o pgAdmin
-- 2. Conectarse a la base de datos curriculum_db antes de ejecutar el resto del script
-- 3. PostgreSQL usa SERIAL en lugar de AUTO_INCREMENT
-- 4. STRING_AGG reemplaza a GROUP_CONCAT de MySQL
-- 5. Las funciones retornan resultados diferentes a los procedimientos de MySQL
-- 6. Los triggers requieren funciones separadas en PostgreSQL
-- 7. Se agregó soporte para actualización automática de fecha_actualizacion
