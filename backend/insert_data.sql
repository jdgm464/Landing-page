-- Insertar datos de ejemplo en la base de datos

-- Insertar persona
INSERT INTO persona (nombre, apellido, titulo_profesional, resumen, email, telefono, ubicacion, linkedin, github)
VALUES (
    'José Daniel',
    'Guzmán Mata',
    'Bachiller en Ciencias',
    'Desarrollador Full Stack apasionado por crear experiencias digitales increíbles. Especializado en diseño web moderno, desarrollo de aplicaciones y soluciones tecnológicas innovadoras.',
    'jdgm464@gmail.com',
    '0412 9778551',
    'Puerto Ordaz – Estado Bolívar',
    'https://www.linkedin.com/in/josé-guzman-819a1b33a/',
    'https://github.com/jdgm464'
);

-- Insertar categorías de habilidades
INSERT INTO categoria_habilidad (nombre_categoria, icono, orden) VALUES
('Frontend', 'code', 1),
('Backend', 'server', 2),
('Bases de Datos', 'database', 3),
('Herramientas & DevOps', 'tool', 4);

-- Insertar habilidades
INSERT INTO habilidad (id_persona, id_categoria, nombre_habilidad, nivel, orden) VALUES
-- Frontend
(1, 1, 'CSS', 'avanzado', 1),
(1, 1, 'Bootstrap', 'avanzado', 2),
(1, 1, 'JavaScript', 'intermedio', 3),
(1, 1, 'React', 'intermedio', 4),
-- Backend
(1, 2, 'HTML', 'avanzado', 1),
(1, 2, 'Node.js', 'intermedio', 2),
(1, 2, 'Java', 'intermedio', 3),
(1, 2, 'PHP', 'basico', 4),
-- Bases de Datos
(1, 3, 'MySQL', 'intermedio', 1),
(1, 3, 'SQL', 'intermedio', 2),
(1, 3, 'PostgreSQL', 'basico', 3),
-- Herramientas
(1, 4, 'Git', 'intermedio', 1),
(1, 4, 'GitHub', 'intermedio', 2),
(1, 4, 'VS Code', 'avanzado', 3);

-- Insertar educación
INSERT INTO educacion (id_persona, titulo, institucion, ubicacion, fecha_inicio, fecha_fin, actualmente_estudiando, descripcion, orden)
VALUES (
    1,
    'Bachiller en Ciencias',
    'Institución Educativa',
    'Puerto Ordaz, Venezuela',
    '2018-01-01',
    '2023-12-31',
    false,
    'Formación académica en ciencias.',
    1
);

-- Insertar cursos
INSERT INTO curso (id_persona, nombre_curso, institucion, plataforma, fecha_obtencion, orden) VALUES
(1, 'Programación en C, C++, Java Básico', 'Centro de Formación', 'Presencial', '2020-08-01', 1),
(1, 'Fundamentos de la programación', 'Plataforma Online', 'Online', '2021-12-01', 2),
(1, 'Introducción al Diseño de videojuegos', 'Plataforma Online', 'Online', '2021-12-01', 3),
(1, 'Diseño web con HTML5 + CSS', 'Plataforma Online', 'Online', '2022-04-01', 4),
(1, 'Programador Web', 'Centro de Formación', 'Presencial', '2025-09-01', 5);

-- Insertar proyecto Medisoft
INSERT INTO proyecto (id_persona, nombre_proyecto, descripcion, repositorio_url, orden)
VALUES (
    1,
    'Medisoft',
    'Aplicación de escritorio que permite realizar órdenes, registrar pacientes, evaluar resultados de los exámenes.',
    'https://github.com/jdgm464/LaboratorioAplicacion-main-main',
    1
);

-- Insertar tecnologías del proyecto
INSERT INTO proyecto_tecnologia (id_proyecto, tecnologia) VALUES
(1, 'Java'),
(1, 'Swing'),
(1, 'MySQL'),
(1, 'NetBeans');

-- Insertar experiencia laboral de ejemplo
INSERT INTO experiencia_laboral (id_persona, titulo_puesto, nombre_empresa, ubicacion, fecha_inicio, actualmente_trabaja, descripcion, orden)
VALUES (
    1,
    'Desarrollador Web',
    'Freelance',
    'Remoto',
    '2023-01-01',
    true,
    'Desarrollo de aplicaciones web con tecnologías modernas.',
    1
);
