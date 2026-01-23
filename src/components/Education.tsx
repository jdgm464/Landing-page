import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, Calendar } from 'lucide-react';
import { obtenerEducacion, type Educacion } from '../services/api';

export function Education() {
  const [educacion, setEducacion] = useState<Educacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerEducacion().then(data => {
      setEducacion(data);
      setLoading(false);
    });
  }, []);

  const formatearFecha = (fecha: string | undefined, actualmente: boolean) => {
    if (!fecha) return actualmente ? 'Presente' : '-';
    const date = new Date(fecha);
    return date.getFullYear().toString();
  };

  const formatearPeriodo = (edu: Educacion) => {
    const inicio = formatearFecha(edu.fecha_inicio, false);
    const fin = edu.actualmente_estudiando ? 'Presente' : formatearFecha(edu.fecha_fin, false);
    return `${inicio} - ${fin}`;
  };

  if (loading) {
    return (
      <section id="educacion">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Educación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">Cargando educación...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (educacion.length === 0) {
    return (
      <section id="educacion">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Educación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">No hay educación registrada.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="educacion">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Educación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {educacion.map((edu) => (
              <div key={edu.id_educacion} className="border-l-2 border-slate-300 pl-6 relative">
                <div className="absolute w-4 h-4 bg-slate-800 rounded-full -left-[9px] top-0"></div>
                
                <h4 className="text-lg font-semibold mb-1">{edu.titulo}</h4>
                <p className="text-slate-600 font-medium mb-2">{edu.institucion}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatearPeriodo(edu)}</span>
                  {edu.ubicacion && <span className="ml-2">• {edu.ubicacion}</span>}
                </div>
                
                {edu.descripcion && (
                  <p className="text-slate-700 text-sm">{edu.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}