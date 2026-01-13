import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code2, Layers, Database, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 1,
    title: 'Frontend',
    icon: Code2,
    skills: ['CSS', 'Bootstrap', 'JavaScript', 'React']
  },
  {
    id: 2,
    title: 'Backend',
    icon: Layers,
    skills: ['HTML', 'Node.js', 'Java', 'PHP']
  },
  {
    id: 3,
    title: 'Bases de Datos',
    icon: Database,
    skills: ['MySQL', 'SQL', 'PostgreSQL']
  },
  {
    id: 4,
    title: 'Herramientas & DevOps',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code']
  }
];

export function Skills() {
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
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id}>
                  <h3 className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-slate-600" />
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
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