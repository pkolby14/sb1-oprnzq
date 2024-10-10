import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import GameShow from '@/components/GameShow';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GameShow />
    </ThemeProvider>
  );
}

export default App;