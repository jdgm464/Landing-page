import { useState } from 'react';
import { Menu, X, User, Briefcase, GraduationCap, Code2, FolderGit2, Mail, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

const menuItems = [
  { id: 'sobre-mi', label: 'Sobre Mí', icon: User },
  { id: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { id: 'educacion', label: 'Educación', icon: GraduationCap },
  { id: 'cursos', label: 'Cursos', icon: BookOpen },
  { id: 'habilidades', label: 'Habilidades', icon: Code2 },
  { id: 'proyectos', label: 'Proyectos', icon: FolderGit2 },
  { id: 'contacto', label: 'Contacto', icon: Mail },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-white shadow-lg lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="p-6">
          <div className="mb-8 mt-12 lg:mt-0">
            <h2 className="text-2xl mb-1">Mi CV</h2>
            <p className="text-sm text-slate-500">Curriculum Vitae</p>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-left"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 text-center">
            © 2024 Mi Curriculum
          </p>
        </div>
      </aside>
    </>
  );
}
