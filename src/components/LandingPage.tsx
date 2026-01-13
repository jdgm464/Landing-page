import { useState } from 'react';
import { Navigation } from './landing/Navigation';
import { Hero } from './landing/Hero';
import { AboutLanding } from './landing/AboutLanding';
import { FooterLanding } from './landing/FooterLanding';
import { ContactModal } from './ContactModal';

interface LandingPageProps {
  onNavigateToCv: () => void;
}

export function LandingPage({ onNavigateToCv }: LandingPageProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navigation 
        onNavigateToCv={onNavigateToCv} 
        onOpenContact={() => setIsContactModalOpen(true)}
      />
      <main>
        <div id="hero">
          <Hero onNavigateToCv={onNavigateToCv} />
        </div>
        <AboutLanding />
      </main>
      <FooterLanding onNavigateToCv={onNavigateToCv} />
      
      {/* Modal de Contacto */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
