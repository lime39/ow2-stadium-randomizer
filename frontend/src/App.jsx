import React from 'react';
import { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import HeroSelector from './components/HeroSelector';
import Randomizer from './components/Randomizer';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);

  if (!selectedRole) {
    return <RoleSelector onSelect={setSelectedRole} />;
  }

  if (!selectedHero) {
    return <HeroSelector role={selectedRole} onSelect={setSelectedHero} />;
  }

  return <Randomizer hero={selectedHero} />;
}

export default App;
