import React, { useState, useEffect } from 'react';
import './App.css';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (scores.X === 5 || scores.O === 5) {
      setGameOver(true);
    }
  }, [scores]);

  const handleClick = (index) => {
    if (winner || board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const checkWinner = () => {
    for (let combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setScores(prev => ({ ...prev, [board[a]]: prev[board[a]] + 1 }));
        return;
      }
    }
    if (board.every(cell => cell !== null)) {
      setWinner('draw');
    }
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetGame = () => {
    resetRound();
    setScores({ X: 0, O: 0 });
    setGameOver(false);
  };

  const renderCell = (index) => {
    return (
      <button
        className="w-20 h-20 text-4xl font-bold bg-blue-100 hover:bg-blue-200 transition-colors duration-300 rounded-lg shadow-md"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="App min-h-screen flex flex-col items-center justify-center font-niramit relative">
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0"
      style={{backgroundImage: "url('https://uploads.codehs.com/859400cd211700dcde03a3f3cee74575')"}}
    ></div>
    <div className="relative z-10">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="text-2xl mb-4 text-orange-500">
        <p>Score - X: {scores.X}, O: {scores.O}</p>
      </div>
      {!winner && !gameOver && (
        <p className="text-2xl mb-4 text-yellow-800">
          Next player: {isXNext ? 'X' : 'O'}
        </p>
      )}
      {winner && winner !== 'draw' && (
        <p className="text-3xl font-bold mb-4 text-blue-900">
          Player {winner} wins this round!
        </p>
      )}
      {winner === 'draw' && (
        <p className="text-3xl font-bold mb-4 text-green-900">This round is a draw!</p>
      )}
      {gameOver && (
        <p className="text-3xl font-bold mb-4 text-green-900">
          Game Over! Player {scores.X === 5 ? 'X' : 'O'} wins the game!
        </p>
      )}
      <button
        className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300 mr-4"
        onClick={gameOver ? resetGame : resetRound}
      >
        {gameOver ? "New Game" : "Next Round"}
      </button>
      {!gameOver && (
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 mt-4"
          onClick={resetGame}
        >
          Reset Game
        </button>
      )}
      </div>
    </div>
  );
}

export default App;
