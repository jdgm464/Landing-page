import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Send, X } from 'lucide-react';
import { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
    
    // Limpiar formulario y cerrar modal
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      onClose();
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Contacto</h2>
                <p className="text-blue-100 text-sm">¡Envíame un mensaje!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-slate-600 mb-6">
            Estoy siempre abierto a nuevas oportunidades y proyectos interesantes. 
            Si tienes alguna pregunta o quieres trabajar conmigo, no dudes en contactarme.
          </p>

          {/* Email de contacto */}
          <div className="flex items-center gap-3 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <Mail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <a href="mailto:jdgm464@gmail.com" className="text-slate-900 hover:text-blue-600 transition-colors">
                jdgm464@gmail.com
              </a>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Tu nombre
              </label>
              <Input 
                id="name"
                name="name"
                placeholder="Escribe tu nombre" 
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Tu email
              </label>
              <Input 
                id="email"
                name="email"
                type="email" 
                placeholder="tu@email.com" 
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Tu mensaje
              </label>
              <Textarea 
                id="message"
                name="message"
                placeholder="Escribe tu mensaje aquí..." 
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-none"
              />
            </div>
            
            <div className="flex gap-3 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Mensaje
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
