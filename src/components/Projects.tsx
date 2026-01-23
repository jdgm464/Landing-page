import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { obtenerProyectos, type Proyecto } from '../services/api';

export function Projects() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProyectos().then(data => {
      setProyectos(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section id="proyectos">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderGit2 className="w-6 h-6" />
              Proyectos Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">Cargando proyectos...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  if (proyectos.length === 0) {
    return (
      <section id="proyectos">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderGit2 className="w-6 h-6" />
              Proyectos Destacados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-500">No hay proyectos registrados.</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="proyectos">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderGit2 className="w-6 h-6" />
            Proyectos Destacados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectos.map((proyecto) => (
              <Card key={proyecto.id_proyecto} className="overflow-hidden hover:shadow-lg transition-shadow">
                {proyecto.imagen_url && (
                  <div className="aspect-video overflow-hidden bg-slate-200">
                    <img 
                      src={proyecto.imagen_url} 
                      alt={proyecto.nombre_proyecto}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{proyecto.nombre_proyecto}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {proyecto.descripcion && (
                    <p className="text-sm text-slate-600">{proyecto.descripcion}</p>
                  )}
                  
                  {proyecto.tecnologias && proyecto.tecnologias.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proyecto.tecnologias.map((tech) => (
                        <Badge key={tech.id_proyecto_tecnologia} variant="secondary" className="text-xs">
                          {tech.tecnologia}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    {proyecto.repositorio_url && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={!proyecto.demo_url ? 'w-full' : 'flex-1'} 
                        asChild
                      >
                        <a href={proyecto.repositorio_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" />
                          Código
                        </a>
                      </Button>
                    )}
                    {proyecto.demo_url && (
                      <Button size="sm" className="flex-1" asChild>
                        <a href={proyecto.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}