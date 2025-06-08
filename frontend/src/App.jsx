import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import RoleSelector from './components/RoleSelector';
import HeroSelector from './components/HeroSelector';
import Randomizer from './components/Randomizer';

function App() {
  const [started, setStarted] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);

  const handleBackToRoles = () => {
    setSelectedRole(null);
    setSelectedHero(null);
  };

  const handleSurpriseMe = async () => {
    try {
      const response = await fetch('http://localhost:8000/heroes');
      const heroes = await response.json();
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
      setSelectedHero(randomHero);
    } catch (error) {
      console.error('Failed to fetch heroes for Surprise Me:', error);
    }
  };

   if (!started) {
    return (
      <WelcomeScreen onStart={() => setStarted(true)} />
    );
  }

  if (!selectedRole && !selectedHero) {
    return (
      <RoleSelector
        onRoleSelect={setSelectedRole}
        onSurpriseHero={handleSurpriseMe}
      />
    );
  }

  if (selectedRole && !selectedHero) {
    return (
      <HeroSelector
        role={selectedRole}
        onSelect={setSelectedHero}
        onBack={handleBackToRoles}
      />
    );
  }

  if (selectedHero) {
    return <Randomizer hero={selectedHero} onBack={handleBackToRoles} />;
  }

  // fallback render (optional)
  return null;
}

export default App;
