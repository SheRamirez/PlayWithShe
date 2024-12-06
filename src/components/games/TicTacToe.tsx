import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type Player = 'X' | 'O';
type Board = (Player | null)[];

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = (squares: Board): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="h-16 w-16 bg-white border-2 border-gray-300 rounded-lg text-2xl font-bold"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            {winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}
          </p>
          <Button onClick={resetGame}>Play Again</Button>
        </div>
      )}
      {!winner && (
        <p className="text-lg">Current player: {currentPlayer}</p>
      )}
    </div>
  );
}