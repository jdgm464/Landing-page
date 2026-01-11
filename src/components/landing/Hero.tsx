import { ArrowRight, FileText } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HeroProps {
  onNavigateToCv: () => void;
}

export function Hero({ onNavigateToCv }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2ODEyMDI3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Workspace background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Efectos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Saludo */}
          <div className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-slate-700/50 backdrop-blur-sm border border-slate-600/50 text-slate-300 text-sm">
              👋 Bienvenido a mi portafolio
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white">
            Hola, Soy{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              José Daniel Guzmán
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto">
            Desarrollador Full Stack apasionado por crear experiencias digitales increíbles
          </p>

          {/* Descripción */}
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Especializado en diseño web moderno, desarrollo de aplicaciones y soluciones tecnológicas innovadoras
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={onNavigateToCv}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              Ver Mi Currículum
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-700/50 backdrop-blur-sm text-white rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-all duration-300"
            >
              Conoce más sobre mí
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="pt-12 animate-bounce">
            <div className="w-6 h-10 mx-auto border-2 border-slate-500 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-slate-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}