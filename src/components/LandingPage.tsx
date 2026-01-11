import { Navigation } from './landing/Navigation';
import { Hero } from './landing/Hero';
import { AboutLanding } from './landing/AboutLanding';
import { FooterLanding } from './landing/FooterLanding';

interface LandingPageProps {
  onNavigateToCv: () => void;
}

export function LandingPage({ onNavigateToCv }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation onNavigateToCv={onNavigateToCv} />
      <main>
        <div id="hero">
          <Hero onNavigateToCv={onNavigateToCv} />
        </div>
        <AboutLanding />
      </main>
      <FooterLanding onNavigateToCv={onNavigateToCv} />
    </div>
  );
}
