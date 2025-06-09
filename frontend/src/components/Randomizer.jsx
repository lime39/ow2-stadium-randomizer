import React, { useState } from 'react';
import './Randomizer.css';

function Randomizer({ hero }) {
  const [round, setRound] = useState(1);
  const [playerWins, setPlayerWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [playerCash, setPlayerCash] = useState(3500);
  const [inputCash, setInputCash] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [itemValue, setItemValue] = useState(0); // Placeholder for future item values

  const totalCash = playerCash + itemValue;

  const handleWin = () => {
    const newWins = playerWins + 1;
    setPlayerWins(newWins);
    advanceRound(newWins, opponentWins);
  };

  const handleLoss = () => {
    const newLosses = opponentWins + 1;
    setOpponentWins(newLosses);
    advanceRound(playerWins, newLosses);
  };

  const advanceRound = (playerScore, opponentScore) => {
    if (playerScore === 4 || opponentScore === 4 || round === 7) {
      setGameOver(true);
    } else {
      setRound(prev => prev + 1);
    }
  };

  const handleCashChange = (e) => {
    setInputCash(e.target.value);
  };

  const updateCash = () => {
    const cash = parseInt(inputCash);
    if (!isNaN(cash)) {
      setPlayerCash(cash);
      setInputCash('');
    }
  };

  const handleMercyRule = () => {
    setGameOver(true);
  };

  return (
    <div className="randomizer-container">
      <h2>Welcome, {hero.name}!</h2>
      <p>Round {round} begins now. Let the randomizer begin!</p>

      <div className="scoreboard">
        <p><strong>You:</strong> {playerWins}</p>
        <p><strong>Opponent:</strong> {opponentWins}</p>
      </div>

      {!gameOver && (
        <div className="controls">
          <button onClick={handleWin}>+ Win</button>
          <button onClick={handleLoss}>+ Loss</button>
        </div>
      )}

      {!gameOver && round === 4 && (
        <button className="mercy-btn" onClick={handleMercyRule}>
          End Game with Mercy Rule
        </button>
      )}

      {!gameOver && (
        <div className="cash-input-section">
          <label>
            Enter Cash after Round {round}:
            <input
              type="number"
              value={inputCash}
              onChange={handleCashChange}
              placeholder="e.g. 4200"
            />
          </label>
          <button onClick={updateCash}>Update Cash</button>
        </div>
      )}

      <p className="cash-display">Total Cash: ${totalCash}</p>

      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>{playerWins > opponentWins ? "You win!" : "You lose!"}</p>
        </div>
      )}
    </div>
  );
}

export default Randomizer;
