import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, Calendar } from 'lucide-react';

const education = [
  {
    id: 1,
    degree: 'Título o Grado',
    institution: 'Nombre de la Institución',
    period: 'Año - Año',
    description: 'Descripción breve de tu formación.'
  }
];

const certifications = [
  'Certificación 1',
  'Certificación 2'
];

export function Education() {
  return (
    <section id="educacion">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            Educación y Certificaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-4">Formación Académica</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-slate-300 pl-6 relative">
                  <div className="absolute w-4 h-4 bg-slate-800 rounded-full -left-[9px] top-0"></div>
                  
                  <h4 className="text-lg mb-1">{edu.degree}</h4>
                  <p className="text-slate-600 mb-2">{edu.institution}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.period}</span>
                  </div>
                  
                  <p className="text-slate-700 text-sm">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="mb-3">Certificaciones</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-2 text-slate-700">
                  <span className="text-slate-500 mt-1">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}