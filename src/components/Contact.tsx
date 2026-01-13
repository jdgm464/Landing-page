import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir el mailto con los datos del formulario
    const subject = encodeURIComponent(`Mensaje de ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    // Abrir cliente de correo
    window.location.href = `mailto:jdgm464@gmail.com?subject=${subject}&body=${body}`;
    
    // Limpiar formulario
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contacto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-6 h-6" />
            Contacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-4">¡Trabajemos Juntos!</h3>
              <p className="text-slate-700 mb-6">
                Estoy siempre abierto a nuevas oportunidades y proyectos interesantes. 
                Si tienes alguna pregunta o quieres trabajar conmigo, no dudes en contactarme.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-slate-600 mt-1" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a href="mailto:jdgm464@gmail.com" className="text-slate-900 hover:underline">
                      jdgm464@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input 
                  name="name"
                  placeholder="Tu nombre" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Input 
                  name="email"
                  type="email" 
                  placeholder="Tu email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Textarea 
                  name="message"
                  placeholder="Tu mensaje" 
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}