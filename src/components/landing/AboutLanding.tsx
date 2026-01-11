import { Code2, Palette, Rocket, Users } from 'lucide-react';

export function AboutLanding() {
  const features = [
    {
      icon: Code2,
      title: 'Desarrollo Web',
      description: 'Creación de aplicaciones web modernas y responsive con las últimas tecnologías'
    },
    {
      icon: Palette,
      title: 'Diseño UI/UX',
      description: 'Interfaces intuitivas y atractivas que mejoran la experiencia del usuario'
    },
    {
      icon: Rocket,
      title: 'Optimización',
      description: 'Rendimiento y velocidad optimizados para la mejor experiencia posible'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Colaboración efectiva en proyectos multidisciplinarios y ágiles'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado de sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Profesional dedicado al desarrollo de soluciones tecnológicas que generan impacto real
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Lado izquierdo - Texto */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl">
              Transformando Ideas en{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Realidad Digital
              </span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Con experiencia en el desarrollo de aplicaciones web y móviles, me especializo en crear
              soluciones tecnológicas que no solo cumplen con los requisitos técnicos, sino que también
              ofrecen experiencias excepcionales a los usuarios.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Mi enfoque combina habilidades técnicas sólidas con una pasión por el diseño limpio y
              funcional. Estoy constantemente aprendiendo y adaptándome a las nuevas tecnologías para
              ofrecer las mejores soluciones posibles.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                HTML
              </span>
              <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                Node.js
              </span>
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm">
                CSS
              </span>
            </div>
            
            {/* Botón para ir al currículum */}
            <div className="pt-6">
              <a 
                href="#curriculum"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('navigate-to-cv'));
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Ver mi Currículum
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Lado derecho - Imagen o visualización */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-2xl bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Code2 className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-slate-700 text-lg">
                    Aquí puedes agregar tu foto profesional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de características */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-slate-200"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg mb-2">{feature.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}