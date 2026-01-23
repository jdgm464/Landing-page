import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Briefcase, Calendar } from 'lucide-react';
import { obtenerExperiencias, type ExperienciaLaboral } from '../services/api';

export function Experience() {
  const [experiencias, setExperiencias] = useState<ExperienciaLaboral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerExperiencias().then(data => {
      setExperiencias(data);
      setLoading(false);
    });
  }, []);

  const formatearFecha = (fecha: string | undefined, actualmente: boolean) => {
    if (!fecha) return actualmente ? 'Presente' : '-';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
  };

  const formatearPeriodo = (exp: ExperienciaLaboral) => {
    const inicio = formatearFecha(exp.fecha_inicio, false);
    const fin = exp.actualmente_trabaja ? 'Presente' : formatearFecha(exp.fecha_fin, false);
    return `${inicio} - ${fin}`;
  };

  if (loading) {
    return (
      <section id="experiencia">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Experiencia Laboral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">Cargando experiencias...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (experiencias.length === 0) {
    return (
      <section id="experiencia">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Experiencia Laboral
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">No hay experiencias registradas.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="experiencia">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Experiencia Laboral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {experiencias.map((exp) => (
            <div key={exp.id_experiencia} className="border-l-2 border-slate-300 pl-6 pb-6 last:pb-0 relative">
              <div className="absolute w-4 h-4 bg-slate-800 rounded-full -left-[9px] top-0"></div>
              
              <h3 className="text-xl font-semibold mb-1">{exp.titulo_puesto}</h3>
              <p className="text-slate-600 font-medium mb-2">{exp.nombre_empresa}</p>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{formatearPeriodo(exp)}</span>
                {exp.ubicacion && <span className="ml-2">• {exp.ubicacion}</span>}
              </div>
              
              {exp.descripcion && (
                <p className="text-slate-700">{exp.descripcion}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}