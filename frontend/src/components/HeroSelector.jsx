import React, { useEffect, useState } from 'react';
import './HeroSelector.css';

function HeroSelector({ role, onSelect }) {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/heroes')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(hero => hero.role.toLowerCase() === role.toLowerCase());
        setHeroes(filtered);
      });
  }, [role]);

  return (
    <div className="hero-selector">
      <h2>Select a {role}</h2>
      <div className="heroes">
        {heroes.map(hero => (
          <div key={hero.id} onClick={() => onSelect(hero)}>
            <img src={hero.icon_url} alt={hero.name} />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSelector;
