import { Github, Linkedin, Mail, Heart } from 'lucide-react';

interface FooterLandingProps {
  onNavigateToCv: () => void;
}

export function FooterLanding({ onNavigateToCv }: FooterLandingProps) {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/jdgm464', label: 'GitHub', ariaLabel: 'Visitar GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/jos%C3%A9-guzman-819a1b33a/', label: 'LinkedIn', ariaLabel: 'Visitar LinkedIn' },
    { icon: Mail, href: 'mailto:jdgm464@gmail.com', label: 'Email', ariaLabel: 'Enviar Email' }
  ];

  const quickLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Currículum', onClick: onNavigateToCv }
  ];

  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Sobre */}
          <div>
            <h3 className="text-xl text-white mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Portafolio
              </span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-4">
              Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras y experiencias excepcionales.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.ariaLabel}
                  target={social.label !== 'Email' ? '_blank' : undefined}
                  rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:jdgm464@gmail.com" className="hover:text-white transition-colors">
                  jdgm464@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">📍</span>
                <span>Puerto Ordaz, Venezuela</span>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href="mailto:jdgm464@gmail.com?subject=Contacto desde Portfolio"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 text-sm"
              >
                <Mail className="w-4 h-4" />
                Enviar Mensaje
              </a>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p className="flex items-center gap-1">
              &copy; {new Date().getFullYear()} Todos los derechos reservados. Hecho con
              <Heart className="w-4 h-4 text-red-500 inline-block mx-1" />
              y código
            </p>
            <div className="flex gap-6">
              <a href="#hero" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#hero" className="hover:text-white transition-colors">
                Términos
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}