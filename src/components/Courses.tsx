import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { obtenerCursos, type Curso } from '../services/api';

export function Courses() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerCursos().then(data => {
      setCursos(data);
      setLoading(false);
    });
  }, []);

  const formatearFecha = (fecha: string | undefined) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <section id="cursos">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Cursos y Certificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">Cargando cursos...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (cursos.length === 0) {
    return (
      <section id="cursos">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Cursos y Certificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">No hay cursos registrados.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="cursos">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Cursos y Certificaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cursos.map((curso) => (
              <Card key={curso.id_curso} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{curso.nombre_curso}</h3>
                      <p className="text-sm text-slate-600">{curso.institucion}</p>
                      {curso.plataforma && (
                        <p className="text-xs text-slate-500">{curso.plataforma}</p>
                      )}
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    {curso.fecha_obtencion && (
                      <span>{formatearFecha(curso.fecha_obtencion)}</span>
                    )}
                  </div>

                  {curso.credencial_url && (
                    <div>
                      <Badge variant="outline" className="text-xs">
                        <a href={curso.credencial_url} target="_blank" rel="noopener noreferrer">
                          Ver credencial
                        </a>
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}