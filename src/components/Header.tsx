import { Mail, Phone, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar className="w-32 h-32 border-4 border-white/20">
            <AvatarImage src="" />
            <AvatarFallback>JG</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl mb-2">José Daniel Guzmán Mata</h1>
            <p className="text-xl text-slate-300 mb-4">Bachiller en Ciencias</p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
              <a href="mailto:jdgm464@gmail.com" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>jdgm464@gmail.com</span>
              </a>
              <a href="tel:04129778551" className="flex items-center gap-2 hover:text-slate-300 transition-colors">
                <Phone className="w-4 h-4" />
                <span>0412 9778551</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Puerto Ordaz – Estado Bolívar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}