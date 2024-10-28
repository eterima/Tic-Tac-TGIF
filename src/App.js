import React, { useState, useEffect } from 'react';
import './App.css';
import xImage from './X.png';      // Import X image
import oImage from './O.jpeg';     // Import O image
import background from './background.jpg'; // Import background image

// Function to calculate the winner of the game
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Function for the AI to make a move (basic strategy)
function getComputerMove(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] === 'X' && squares[b] === 'X' && !squares[c]) return c;
    if (squares[a] === 'X' && squares[c] === 'X' && !squares[b]) return b;
    if (squares[b] === 'X' && squares[c] === 'X' && !squares[a]) return a;
  }

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] === 'O' && squares[b] === 'O' && !squares[c]) return c;
    if (squares[a] === 'O' && squares[c] === 'O' && !squares[b]) return b;
    if (squares[b] === 'O' && squares[c] === 'O' && !squares[a]) return a;
  }

  const availableSquares = squares
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);
  
  if (availableSquares.length > 0) {
    return availableSquares[Math.floor(Math.random() * availableSquares.length)];
  }

  return null;
}

// Square component to render each square in the Tic-Tac-Toe board
function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value === 'X' ? <img src={xImage} alt="epilot" className="game-image" /> : 
       value === 'O' ? <img src={oImage} alt="eka" className="game-image" /> : 
       null}
    </button>
  );
}

// Board component to render the entire 3x3 grid of squares
function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}

// Main App component that controls the game state and renders the game
export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playWithComputer, setPlayWithComputer] = useState(false); // Game mode toggle
  const winner = calculateWinner(squares);

  // Switch mode between Player vs Player and Player vs Computer
  const togglePlayMode = () => {
    setPlayWithComputer(!playWithComputer);
    handleReset(); // Reset game when mode is switched
  };

  useEffect(() => {
    // Trigger computer's turn if it's X's turn, we're playing with computer, and there's no winner
    if (playWithComputer && isXNext && !winner) {
      const computerMove = getComputerMove(squares);
      if (computerMove !== null) {
        const newSquares = squares.slice();
        newSquares[computerMove] = 'X';
        setSquares(newSquares);
        setIsXNext(false);
      }
    }
  }, [isXNext, squares, winner, playWithComputer]);

  const handleClick = (i) => {
    // Ignore click if the square is already filled or if there is a winner or if it's computer's turn
    if (squares[i] || winner || (playWithComputer && isXNext)) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${background})` }}>
      <h1>Tic Tac TGIF</h1>
      <div className="mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={playWithComputer}
            onChange={togglePlayMode}
          />
          Play with Computer
        </label>
      </div>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">
        {winner
          ? `Winner: ${winner === 'X' ? (playWithComputer ? 'epilot (Computer)' : 'Player X') : 'eka (You)'}`
          : `Next player: ${isXNext ? (playWithComputer ? 'epilot (Computer)' : 'Player X') : 'eka (You)'}`}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}
