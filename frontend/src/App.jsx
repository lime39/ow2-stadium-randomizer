import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    console.log("Fetching heroes...");
    fetch('http://localhost:8000/heroes')
      .then(res => res.json())
      .then(data => {
        console.log("Heroes fetched:", data);
        setHeroes(data);
      })
      .catch(err => console.error("Error fetching heroes:", err));
  }, []);

  return (
    <div>
      <h1>Choose Your Hero</h1>
      <ul>
        {heroes.map(hero => (
          <li key={hero.id}>
            {hero.icon && <img src={hero.icon} alt={hero.name} width="50" />}
            {hero.name} ({hero.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
