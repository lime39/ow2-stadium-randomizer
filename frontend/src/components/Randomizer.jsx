import React, { useState, useEffect } from 'react';
import './Randomizer.css';

function Randomizer({ hero, onBack }) {
  const [round, setRound] = useState(1);
  const [playerWins, setPlayerWins] = useState(0);
  const [opponentWins, setOpponentWins] = useState(0);
  const [playerCash, setPlayerCash] = useState(3500);
  const [inputCash, setInputCash] = useState('');
  const [pendingCash, setPendingCash] = useState(null);
  const [lastInventoryCost, setLastInventoryCost] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [powers, setPowers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Calculate total cash including current inventory cost
  const totalCash = playerCash;

  // Fetch items and powers on round or hero change
  useEffect(() => {
    if (gameOver) return;

    const fetchItemsAndPowers = async () => {
      try {
        const itemsResponse = await fetch(`http://localhost:8000/items?hero_id=${hero.hero_id}`);
        const allItems = await itemsResponse.json();

        const eligibleItems = allItems.filter(
          (item) => item.hero_id === null || item.hero_id === hero.hero_id
        );

        // Shuffle items randomly
        const shuffleArray = (array) => {
          const arr = [...array];
          for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }
          return arr;
        };

        const shuffledItems = shuffleArray(eligibleItems);

        // Generate random inventory with random count (including possibly zero items)
        let remainingCash = playerCash;
        const newInventory = [];

        for (const item of shuffledItems) {
          if (newInventory.length >= 6) break;
          // 50% chance to try picking item if affordable
          if (Math.random() < 0.5 && item.cost <= remainingCash) {
            newInventory.push(item);
            remainingCash -= item.cost;
          }
        }

        setInventory(newInventory);
        setLastInventoryCost(newInventory.reduce((sum, item) => sum + item.cost, 0));

        // Powers only on odd rounds (1,3,5,7), max 4 powers
        if (round % 2 === 1 && powers.length < 4) {
          try {
            const powersResponse = await fetch(`http://localhost:8000/powers?hero_id=${hero.hero_id}`);
            const heroPowers = await powersResponse.json();

            const ownedPowerIds = powers.map(p => p.power_id);
            const availablePowers = heroPowers.filter(p => !ownedPowerIds.includes(p.power_id));

            if (round === 1 && powers.length === 0 && availablePowers.length > 0) {
              const randomPower = availablePowers[Math.floor(Math.random() * availablePowers.length)];
              setPowers([randomPower]);
            } else if (round > 1 && availablePowers.length > 0) {
              const randomPower = availablePowers[Math.floor(Math.random() * availablePowers.length)];
              setPowers(prev => [...prev, randomPower]);
            }

          } catch (error) {
            console.error("Failed to fetch powers:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch items or powers:", error);
      }
    };

    fetchItemsAndPowers();
  }, [round, hero, gameOver]);

  // Update playerCash whenever pendingCash or lastInventoryCost changes
  useEffect(() => {
    if (pendingCash !== null && lastInventoryCost !== null) {
      setPlayerCash(pendingCash + lastInventoryCost);
      setPendingCash(null);
    }
  }, [pendingCash, lastInventoryCost]);

  const advanceRound = (playerScore, opponentScore) => {
    if (playerScore === 4 || opponentScore === 4 || round === 7) {
      setGameOver(true);
    } else {
      setRound(prev => prev + 1);
    }
  };

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

  const handleCashChange = (e) => {
    setInputCash(e.target.value);
  };

  const updateCash = () => {
    const cash = parseInt(inputCash, 10);
    if (!isNaN(cash)) {
      setPendingCash(cash);
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

      <p className="cash-display">Total Cash (cash + item costs): ${totalCash}</p>

      <h3>Inventory (max 6 items):</h3>
      <ul>
        {inventory.map((item, idx) => (
          <li key={idx}>
            <strong>{item.name}</strong> — {item.category} ({item.tier}) - ${item.cost}
          </li>
        ))}
      </ul>
      <p>Current Inventory Value: ${lastInventoryCost}</p>

      <h3>Powers (max 4):</h3>
      <ul>
        {powers.map((power, idx) => (
          <li key={idx}>
            <strong>{power.name}</strong>
          </li>
        ))}
      </ul>

      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>{playerWins > opponentWins ? "You win!" : "You lose!"}</p>
          <button onClick={onBack}>Back to Hero Select</button>
        </div>
      )}

      {!gameOver && (
        <button onClick={onBack} className="back-btn">
          Back to Hero Select
        </button>
      )}
    </div>
  );
}

export default Randomizer;
