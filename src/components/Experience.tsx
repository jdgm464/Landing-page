import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Título del Puesto',
    company: 'Nombre de la Empresa',
    period: 'Mes Año - Presente',
    description: 'Describe tus responsabilidades y logros en este puesto.',
    technologies: ['Tecnología 1', 'Tecnología 2']
  }
];

export function Experience() {
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
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-slate-300 pl-6 pb-6 last:pb-0 relative">
              <div className="absolute w-4 h-4 bg-slate-800 rounded-full -left-[9px] top-0"></div>
              
              <h3 className="text-xl mb-1">{exp.title}</h3>
              <p className="text-slate-600 mb-2">{exp.company}</p>
              
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>
              
              <p className="text-slate-700 mb-3">{exp.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}