import React, { useState } from 'react';
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
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    // Ignore click if the square is already filled or if there is a winner
    if (squares[i] || winner) return;

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
      <h1>TGIF</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">
        {winner
          ? `Winner: ${winner === 'X' ? 'epilot' : 'eka'}`
          : `Next player: ${isXNext ? 'epilot' : 'eka'}`}
      </div>
      <button className="reset-button" onClick={handleReset}>Reset Game</button>
    </div>
  );
}
