import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { obtenerPersona, type Persona } from '../services/api';

export function Header() {
  const [persona, setPersona] = useState<Persona | null>(null);

  useEffect(() => {
    obtenerPersona().then(setPersona);
  }, []);

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  if (!persona) {
    return (
      <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-slate-300">Cargando...</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-32 h-32 border-4 border-white/20">
            <AvatarImage src={persona.foto_url || ''} />
            <AvatarFallback>{getInitials(persona.nombre, persona.apellido)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {persona.nombre} {persona.apellido}
            </h1>
            {persona.titulo_profesional && (
              <p className="text-xl text-slate-300 mb-4">{persona.titulo_profesional}</p>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              {persona.email && (
                <a 
                  href={`mailto:${persona.email}`} 
                  className="flex items-center gap-2 hover:text-slate-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{persona.email}</span>
                </a>
              )}
              {persona.telefono && (
                <a 
                  href={`tel:${persona.telefono.replace(/\s/g, '')}`} 
                  className="flex items-center gap-2 hover:text-slate-300 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{persona.telefono}</span>
                </a>
              )}
              {persona.ubicacion && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{persona.ubicacion}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}