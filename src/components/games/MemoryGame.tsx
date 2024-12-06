import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

const ICONS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initializeGame = () => {
    const duplicatedIcons = [...ICONS, ...ICONS];
    const shuffledCards = duplicatedIcons
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    if (cards[id].isMatched || cards[id].isFlipped) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);

    if (flippedCards.length === 1) {
      setMoves(moves + 1);
      const [firstCard] = flippedCards;
      if (cards[firstCard].icon === cards[id].icon) {
        newCards[firstCard].isMatched = true;
        newCards[id].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[id].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isGameComplete = cards.length > 0 && cards.every((card) => card.isMatched);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold">Memory Game</h2>
      <p className="text-lg">Moves: {moves}</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`h-16 w-16 text-2xl rounded-lg transition-all duration-300 ${
              card.isFlipped || card.isMatched
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.isFlipped || card.isMatched) && card.icon}
          </button>
        ))}
      </div>
      {isGameComplete && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            Congratulations! You completed the game in {moves} moves!
          </p>
          <Button onClick={initializeGame}>Play Again</Button>
        </div>
      )}
    </div>
  );
}