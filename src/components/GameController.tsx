import { useState, useEffect } from 'react';
import { Plus, Minus, Save, Trash2, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const GameController = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : {
      points: 0,
      round: 1,
      challenges: [],
      multiplier: 1
    };
  });
  const [newChallenge, setNewChallenge] = useState({ name: '', points: '' });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGame = (action, payload) => {
    setGameState(prevState => {
      let newState = { ...prevState };
      switch (action) {
        case 'ADD_CHALLENGE':
          newState.challenges = [...(prevState.challenges || []), payload];
          toast({
            title: "New Challenge Added",
            description: `${payload.name} (+${payload.points} points)`
          });
          break;
        case 'REMOVE_CHALLENGE':
          newState.challenges = (prevState.challenges || []).filter((_, index) => index !== payload);
          toast({
            title: "Challenge Removed",
            description: "A challenge has been removed from the list."
          });
          break;
        case 'ADD_POINTS':
          newState.points += payload * prevState.multiplier;
          toast({
            title: `${payload > 0 ? 'Points Added' : 'Points Deducted'}`,
            description: `${Math.abs(payload)} points ${payload > 0 ? 'added to' : 'deducted from'} the score.`
          });
          break;
        case 'NEXT_ROUND':
          newState.round += 1;
          toast({
            title: "New Round",
            description: `Round ${newState.round} has started!`
          });
          break;
        case 'RESET_GAME':
          newState = { points: 0, round: 1, challenges: [], multiplier: 1 };
          toast({
            title: "Game Reset",
            description: "The game has been reset to its initial state."
          });
          break;
        case 'SET_MULTIPLIER':
          newState.multiplier = payload;
          toast({
            title: "Multiplier Updated",
            description: `Point multiplier set to ${payload}x`
          });
          break;
      }
      return newState;
    });
  };

  const addChallenge = () => {
    if (newChallenge.name && newChallenge.points) {
      updateGame('ADD_CHALLENGE', { ...newChallenge, points: parseInt(newChallenge.points) });
      setNewChallenge({ name: '', points: '' });
    }
  };

  const removeChallenge = (index) => {
    updateGame('REMOVE_CHALLENGE', index);
  };

  const addPoints = (points) => {
    updateGame('ADD_POINTS', points);
  };

  const nextRound = () => {
    updateGame('NEXT_ROUND');
  };

  const resetGame = () => {
    updateGame('RESET_GAME');
  };

  const setMultiplier = (value) => {
    updateGame('SET_MULTIPLIER', parseFloat(value));
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Game Controller</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="challenge-name">New Challenge</Label>
            <Input 
              id="challenge-name"
              placeholder="Challenge name" 
              value={newChallenge.name} 
              onChange={(e) => setNewChallenge({...newChallenge, name: e.target.value})}
            />
            <Input 
              type="number" 
              placeholder="Points" 
              value={newChallenge.points} 
              onChange={(e) => setNewChallenge({...newChallenge, points: e.target.value})}
            />
            <Button onClick={addChallenge} className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Challenge</Button>
          </div>

          <div className="space-y-2">
            <Label>Challenges</Label>
            {(gameState.challenges || []).map((challenge, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{challenge.name} (+{challenge.points})</span>
                <div>
                  <Button onClick={() => addPoints(challenge.points)} variant="outline" size="sm" className="mr-2">Award</Button>
                  <Button onClick={() => removeChallenge(index)} variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Game Controls</Label>
            <div className="flex space-x-2">
              <Button onClick={() => addPoints(-1)} variant="outline"><Minus className="mr-2 h-4 w-4" />1 Point</Button>
              <Button onClick={() => addPoints(1)} variant="outline"><Plus className="mr-2 h-4 w-4" />1 Point</Button>
            </div>
            <div className="flex space-x-2 items-center">
              <Label htmlFor="multiplier">Multiplier:</Label>
              <Input 
                id="multiplier"
                type="number" 
                value={gameState.multiplier} 
                onChange={(e) => setMultiplier(e.target.value)}
                className="w-24"
              />
            </div>
            <Button onClick={nextRound} className="w-full">Next Round</Button>
            <Button onClick={resetGame} className="w-full" variant="destructive">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default GameController;