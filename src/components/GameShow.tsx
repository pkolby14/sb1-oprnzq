import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import GameController from '@/components/GameController';
import GameDisplay from '@/components/GameDisplay';

const GameShow = () => {
  const [gameState, setGameState] = useState(() => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : {
      points: 0,
      round: 1,
      challenges: [],
      multiplier: 1
    };
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const updateGame = (action, payload) => {
    setGameState(prevState => {
      let newState = { ...prevState };
      switch (action) {
        case 'ADD_CHALLENGE':
          newState.challenges = [...prevState.challenges, payload];
          toast({
            title: "New Challenge Added",
            description: `${payload.name} (+${payload.points} points)`
          });
          break;
        case 'REMOVE_CHALLENGE':
          newState.challenges = prevState.challenges.filter((_, index) => index !== payload);
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

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Game Show Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="controller">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="controller">Controller</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
            <TabsContent value="controller">
              <GameController 
                onUpdateGame={updateGame} 
                gameState={gameState}
              />
            </TabsContent>
            <TabsContent value="display">
              <GameDisplay gameState={gameState} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default GameShow;