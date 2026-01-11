import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CvPage } from './components/CvPage';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'cv'>('landing');

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onNavigateToCv={() => setCurrentView('cv')} />
      ) : (
        <CvPage onNavigateToLanding={() => setCurrentView('landing')} />
      )}
    </>
  );
}