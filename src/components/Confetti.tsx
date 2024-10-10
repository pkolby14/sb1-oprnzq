import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      });

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      return () => {
        myConfetti.reset();
      };
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
};

export default Confetti;