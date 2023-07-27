// gameState.js
import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

const initialState = {
  // Your initial state here
};

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(initialState);

  const setGameStateProperty = (property, value) => {
    setGameState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  // Other functions related to state management

  return (
    <GameContext.Provider value={{ gameState, setGameStateProperty }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
