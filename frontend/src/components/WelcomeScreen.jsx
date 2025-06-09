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
        <ol className="welcome-list">
          <li>Select your desired role: Tank, DPS, or Support. You can also hit “Surprise Me!” to get a random hero instantly.</li>
          <li>Pick a hero from the selected role if you didn't choose “Surprise Me!” in the previous step.</li>
          <li>Review your powers and items. Items with a <span style={{color: '#ff7f50', fontWeight: 'bold'}}>rainbow glow</span> are hero-specific. Item colors show their tier: Common, Rare, or Epic. After each round, enter your updated cash before clicking the “Win +” or “Loss +” button.</li>
          <li>When a team wins 4 rounds or triggers the mercy rule, you'll be taken to a summary screen with the match results and an option to return to role selection.</li>
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
