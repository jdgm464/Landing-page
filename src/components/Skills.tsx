import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code2, Layers, Database, Wrench } from 'lucide-react';
import { obtenerHabilidades, type Habilidad } from '../services/api';

// Iconos por categoría
const iconMap: Record<string, any> = {
  'Frontend': Code2,
  'Backend': Layers,
  'Bases de Datos': Database,
  'Herramientas & DevOps': Wrench,
  'default': Code2
};

export function Skills() {
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerHabilidades().then(data => {
      setHabilidades(data);
      setLoading(false);
    });
  }, []);

  // Agrupar habilidades por categoría
  const agruparPorCategoria = () => {
    const grupos: Record<string, { nombre: string; habilidades: Habilidad[] }> = {};
    
    habilidades.forEach(hab => {
      const categoria = hab.nombre_categoria || 'Otros';
      if (!grupos[categoria]) {
        grupos[categoria] = {
          nombre: categoria,
          habilidades: []
        };
      }
      grupos[categoria].habilidades.push(hab);
    });

    return Object.values(grupos);
  };

  const categorias = agruparPorCategoria();

  if (loading) {
    return (
      <section id="habilidades">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-6 h-6" />
              Habilidades Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">Cargando habilidades...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (habilidades.length === 0) {
    return (
      <section id="habilidades">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="w-6 h-6" />
              Habilidades Técnicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">No hay habilidades registradas.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="habilidades">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="w-6 h-6" />
            Habilidades Técnicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categorias.map((categoria) => {
              const Icon = iconMap[categoria.nombre] || iconMap['default'];
              return (
                <div key={categoria.nombre}>
                  <h3 className="flex items-center gap-2 mb-3 font-semibold">
                    <Icon className="w-5 h-5 text-slate-600" />
                    {categoria.nombre}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categoria.habilidades.map((skill) => (
                      <Badge key={skill.id_habilidad} variant="outline">
                        {skill.nombre_habilidad}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}