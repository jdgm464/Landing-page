import { Button } from './ui/button';
import { Input } from './ui/input';
import { Send, X, Bot, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
};

type ChatStep = 'greeting' | 'askName' | 'askEmail' | 'askMessage' | 'confirm' | 'done';

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [inputValue, setInputValue] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje inicial del bot
      setTimeout(() => {
        addBotMessage("¡Hola! 👋 Soy el asistente de José Daniel.");
      }, 500);
      setTimeout(() => {
        addBotMessage("Me encantaría ayudarte a ponerte en contacto. ¿Cuál es tu nombre?");
        setCurrentStep('askName');
      }, 1500);
    }
  }, [isOpen]);

  useEffect(() => {
    // Auto-focus en el input cuando cambie de paso
    inputRef.current?.focus();
  }, [currentStep]);

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const value = inputValue.trim();
    addUserMessage(value);
    setInputValue('');

    // Procesar respuesta según el paso actual
    setTimeout(() => {
      switch (currentStep) {
        case 'askName':
          setUserData(prev => ({ ...prev, name: value }));
          addBotMessage(`¡Encantado de conocerte, ${value}! 😊`);
          setTimeout(() => {
            addBotMessage("¿Cuál es tu dirección de email?");
            setCurrentStep('askEmail');
          }, 1000);
          break;

        case 'askEmail':
          if (!value.includes('@')) {
            addBotMessage("Hmm... ese email no parece válido. ¿Podrías verificarlo?");
            return;
          }
          setUserData(prev => ({ ...prev, email: value }));
          addBotMessage("¡Perfecto! ✅");
          setTimeout(() => {
            addBotMessage("Ahora, ¿en qué puedo ayudarte? Cuéntame tu mensaje:");
            setCurrentStep('askMessage');
          }, 1000);
          break;

        case 'askMessage':
          setUserData(prev => ({ ...prev, message: value }));
          addBotMessage("¡Excelente! Déjame confirmar tu información:");
          setTimeout(() => {
            addBotMessage(`📝 Nombre: ${userData.name}\n📧 Email: ${value}\n💬 Mensaje: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
          }, 500);
          setTimeout(() => {
            addBotMessage("¿Todo correcto? Puedo enviarlo ahora. 🚀");
            setCurrentStep('confirm');
          }, 1500);
          break;

        case 'confirm':
          if (value.toLowerCase().includes('si') || value.toLowerCase().includes('sí') || value.toLowerCase().includes('ok') || value.toLowerCase().includes('enviar')) {
            addBotMessage("¡Perfecto! Abriendo tu cliente de correo... 📬");
            
            // Construir mailto
            const subject = encodeURIComponent(`Mensaje de ${userData.name}`);
            const body = encodeURIComponent(
              `Nombre: ${userData.name}\n` +
              `Email: ${userData.email}\n\n` +
              `Mensaje:\n${userData.message}`
            );
            
            setTimeout(() => {
              window.location.href = `mailto:jdgm464@gmail.com?subject=${subject}&body=${body}`;
              addBotMessage("¡Listo! Revisa tu cliente de correo y solo presiona enviar. 😊");
              addBotMessage("¡Gracias por contactarme! Te responderé pronto. 👋");
              setCurrentStep('done');
            }, 1000);
          } else {
            addBotMessage("No hay problema. ¿Qué te gustaría cambiar? (nombre/email/mensaje)");
            // Aquí podrías implementar lógica para editar campos específicos
          }
          break;

        case 'done':
          addBotMessage("Ya envié tu mensaje. Si quieres enviar otro, cierra esta ventana y vuelve a abrir. 😊");
          break;
      }
    }, 500);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStep('greeting');
    setUserData({ name: '', email: '', message: '' });
    setInputValue('');
    
    setTimeout(() => {
      addBotMessage("¡Hola! 👋 Soy el asistente de José Daniel.");
    }, 500);
    setTimeout(() => {
      addBotMessage("Me encantaría ayudarte a ponerte en contacto. ¿Cuál es tu nombre?");
      setCurrentStep('askName');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chatbot Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Asistente de Contacto</h3>
              <div className="flex items-center gap-1 text-xs text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                En línea
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === 'bot'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <span className="text-xs opacity-60 mt-1 block">
                  {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-200">
          {currentStep !== 'done' ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu respuesta..."
                className="flex-1"
                autoFocus
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!inputValue.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1"
              >
                Enviar Otro Mensaje
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
