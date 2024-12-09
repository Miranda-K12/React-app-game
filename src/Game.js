import React, { useState } from 'react';
import './Game.css';
import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';

function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const choices = [
    { name: 'rock', img: rockImg },
    { name: 'paper', img: paperImg },
    { name: 'scissors', img: scissorsImg },
  ];

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex].name;
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "It's a draw!";
    }
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      setUserScore((currentScore) => currentScore + 1);
      return 'You win!';
    }
    setComputerScore((currentScore) => currentScore + 1);
    return 'You lose!';
  };

  const handleChoice = (choice) => {
    const computerChoice = getComputerChoice();
    setUserChoice(choice);
    setComputerChoice(computerChoice);
    setResult(determineWinner(choice, computerChoice));

    // Check if the game needs to be reset
    setTimeout(() => {
      if (userScore === 9 || computerScore === 9) { 
        alert(
          userScore === 9
            ? 'Congratulations! You reached 10 points and win!'
            : 'Computer reached 10 points! You lost!'
        );
        resetGame(true); 
      }
    }, 100); 
  };

  const resetGame = (resetScores = false) => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
    if (resetScores) {
      setUserScore(0);
      setComputerScore(0);
    }
  };

  return (
    <div>
      <h1>Rock, Paper, Scissors</h1>
      <div className="scoreboard">
        <p>Player<strong> {userScore}</strong></p>
        <p>Computer<strong> {computerScore}</strong></p>
      </div>
      <div className="game-container">
        <div className="choices">
          {choices.map((choice) => (
            <img
              key={choice.name}
              src={choice.img}
              alt={choice.name}
              onClick={() => handleChoice(choice.name)}
              className="choice-img"
            />
          ))}
        </div>
        {result && (
          <div className="result-section">
            <h2>Game Result</h2>
            <p>Your choice: <strong>{userChoice}</strong></p>
            <p>Computer's choice: <strong>{computerChoice}</strong></p>
            <p className="result-text">{result}</p>
            <button onClick={resetGame} className="reset-button">
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
