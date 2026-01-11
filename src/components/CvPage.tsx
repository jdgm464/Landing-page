import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { About } from './About';
import { Experience } from './Experience';
import { Education } from './Education';
import { Courses } from './Courses';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { Contact } from './Contact';
import { ArrowLeft } from 'lucide-react';

interface CvPageProps {
  onNavigateToLanding: () => void;
}

export function CvPage({ onNavigateToLanding }: CvPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Sidebar />
      
      {/* Botón para volver a la landing page */}
      <button
        onClick={onNavigateToLanding}
        className="fixed top-4 right-4 z-50 lg:top-6 lg:right-6 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Volver a inicio"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Volver a Inicio</span>
      </button>

      {/* Contenido principal con margen para el sidebar */}
      <div className="lg:ml-64">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
          <About />
          <Experience />
          <Education />
          <Courses />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <footer className="bg-slate-900 text-slate-300 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Mi Curriculum. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
