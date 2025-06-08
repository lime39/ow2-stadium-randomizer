import React from 'react';
import { useEffect, useState } from 'react';

function HeroSelector({ role, onSelect }) {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/heroes')
      .then(res => res.json())
      .then(data => setHeroes(data))
      .catch(err => console.error('Error fetching heroes:', err));
  }, []);

  const filtered = heroes.filter(hero => hero.role === role);

  return (
    <div>
      <h2>Select a {role} Hero</h2>
      <ul>
        {filtered.map(hero => (
          <li key={hero.id} onClick={() => onSelect(hero)}>
            {hero.icon && <img src={hero.icon} alt={hero.name} width="50" />}
            {hero.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HeroSelector;
