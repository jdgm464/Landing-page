import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User } from 'lucide-react';
import { obtenerPersona, type Persona } from '../services/api';

export function About() {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerPersona().then(data => {
      setPersona(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
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
            <p className="text-slate-500">Cargando...</p>
          </CardContent>
        </Card>
      </section>
    );
  }

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
            {persona?.resumen || 'Sin descripción disponible.'}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}