import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Overwatch 2 Stadium Randomizer</h1>
      <p className="welcome-description">
         Welcome to the Overwatch 2 Stadium Randomizer!  
         Get ready to shake up your Overwatch 2 gameplay! This randomizer helps you pick a role, select or surprise yourself with a hero, 
         and then generates fun power and item builds to try out in the Stadium gamemode.
         Click "Get Started" to begin your adventure!
      </p>
      <div className="how-to-use">
        <h2>How to Use</h2>
        <ol>
          <li>Select your desired role: Tank, DPS, or Support.</li>
          <li>Pick a hero from the selected role, or hit “Surprise Me!” to get a random hero instantly.</li>
          <li>Explore your randomized powers and items to create exciting new strategies.</li>
          <li>Jump into the Stadium and put your new build to the test!</li>
        </ol>
      </div>

      <button 
        className="get-started-btn" 
        onClick={onStart}
        aria-label="Get Started with Overwatch 2 Stadium Randomizer"
      >
        Get Started
      </button>
      <div className="footer-text">
        Not affiliated with Blizzard Entertainment. Overwatch is a trademark of Blizzard Entertainment, Inc.
      </div>
    </div>
  );
};

export default WelcomeScreen;
