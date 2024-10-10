import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Flag, Star } from 'lucide-react';
import Confetti from './Confetti';

const GameDisplay = () => {
  const [gameState, setGameState] = useState({
    points: 0,
    round: 1,
    challenges: [],
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const updateGameState = () => {
      const savedState = localStorage.getItem('gameState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setGameState(prevState => {
          if (prevState.points !== parsedState.points && parsedState.points > prevState.points) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
          }
          return {
            ...prevState,
            points: parsedState.points || 0,
            round: parsedState.round || 1,
            challenges: parsedState.challenges || [],
          };
        });
      }
    };

    updateGameState();
    const interval = setInterval(updateGameState, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden text-white font-sans bg-gradient-to-br from-purple-900 to-indigo-900">
      {showConfetti && <Confetti />}
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default GameDisplay;