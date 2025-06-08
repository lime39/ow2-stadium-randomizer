import React from 'react';
function Randomizer({ hero }) {
  return (
    <div>
      <h2>Welcome, {hero.name}!</h2>
      <p>Round 1 begins now. Let the randomizer begin!</p>
    </div>
  );
}

export default Randomizer;
