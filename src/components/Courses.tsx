import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Programación en C, Programación en C++, Programación en Java Básico',
    platform: '',
    instructor: '',
    duration: '',
    completed: true,
    year: 'Ago 2020',
    skills: ['C', 'C++', 'Java']
  },
  {
    id: 2,
    title: 'Fundamentos de la programación',
    platform: '',
    instructor: '',
    duration: '',
    completed: true,
    year: 'Dic 2021',
    skills: ['Fundamentos']
  },
  {
    id: 3,
    title: 'Introducción al Diseño de videojuegos',
    platform: '',
    instructor: '',
    duration: '',
    completed: true,
    year: 'Dic 2021',
    skills: ['Diseño', 'Videojuegos']
  },
  {
    id: 4,
    title: 'Diseño web con HTML5 + CSS',
    platform: '',
    instructor: '',
    duration: '',
    completed: true,
    year: 'Abril 2022',
    skills: ['HTML5', 'CSS']
  },
  {
    id: 5,
    title: 'Programador Web',
    platform: '',
    instructor: '',
    duration: '',
    completed: true,
    year: 'Septiembre 2025',
    skills: ['Desarrollo Web']
  }
];

export function Courses() {
  return (
    <section id="cursos">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Cursos y Formación Continua
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="mb-1">{course.title}</h3>
                      <p className="text-sm text-slate-600">{course.platform}</p>
                      <p className="text-xs text-slate-500">{course.instructor}</p>
                    </div>
                    {course.completed && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{course.duration}</span>
                    </div>
                    <span>•</span>
                    <span>{course.year}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
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