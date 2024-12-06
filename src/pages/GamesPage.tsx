import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { TicTacToe } from '@/components/games/TicTacToe';
import { MemoryGame } from '@/components/games/MemoryGame';
import { CatchTheStarsGame } from '@/components/games/CatchTheStarsGame';
import { FindTheOddColorGame } from '@/components/games/FindTheOddColorGame';
import { useAuthStore } from '@/store/auth';
import { LogOut } from 'lucide-react';

type Game = 'tictactoe' | 'memory' | 'star' | 'color' | null;

export function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-80 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.username}!</h1>
            <p className="text-gray-600">Choose a game to play</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {!selectedGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedGame('tictactoe')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">Tic Tac Toe</h3>
              <p className="text-gray-600">Classic game of X's and O's</p>
            </button>

            <button
              onClick={() => setSelectedGame('star')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">Catch the Star</h3>
              <p className="text-gray-600">Catch the falling stars!.</p>
            </button>

            <button
              onClick={() => setSelectedGame('color')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">FindTheOddColorGame</h3>
              <p className="text-gray-600">This is the best of all, just pick the weird color.</p>
            </button>

            <button
              onClick={() => setSelectedGame('memory')}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">Memory Game</h3>
              <p className="text-gray-600">Test your memory by matching pairs</p>
            </button>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <Button variant="outline" onClick={() => setSelectedGame(null)}>
                Back to Games
              </Button>
            </div>
            {selectedGame === 'tictactoe' && <TicTacToe />}
            {selectedGame === 'memory' && <MemoryGame />}
            {selectedGame === 'color' && <FindTheOddColorGame />}
            {selectedGame === 'star' && <CatchTheStarsGame />}

          </div>
        )}
      </div>
    </div>
  );
}