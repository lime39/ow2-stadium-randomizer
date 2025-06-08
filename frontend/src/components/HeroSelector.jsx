import React, { useEffect, useState } from 'react';
import './HeroSelector.css';

const HeroSelector = ({ role, onSelect, onBack }) => {
  console.log('Selected role:', role);
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch(`http://localhost:8000/heroes?role=${role}`);
        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        console.error('Failed to fetch heroes:', error);
      }
    };

    fetchHeroes();
  }, [role]);

  return (
    <div className="hero-select-container">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h1 className="hero-select-title">Select a {role}</h1>
      <div className="hero-grid">
        {heroes.map((hero) => (
          <div
            className="hero-card"
            key={hero.name}
            onClick={() => onSelect(hero)}
          >
            <img src={hero.icon_url} alt={hero.name} />
            <p>{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSelector;
