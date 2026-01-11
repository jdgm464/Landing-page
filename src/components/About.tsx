import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User } from 'lucide-react';

export function About() {
  return (
    <section id="sobre-mi">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6" />
            Sobre Mí
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 leading-relaxed">
            Escribe aquí tu descripción personal, tus intereses, tu filosofía de trabajo y lo que te apasiona 
            de tu profesión. Este es el espacio para que te presentes y cuentes tu historia.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}