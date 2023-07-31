// gameState.js
import React, { createContext, useState, useContext } from 'react';
import { boardDefault, generateWordSet } from "../pages/GamePage/Words"

const GameContext = createContext();

const initialState = {
    board: boardDefault,
    currAttempt: { attempt: 0, letter: 0 },
    wordSet: new Set(),
    correctWord: "",
    gameFinished: false,
    disabledLetters: [],
    gameOver: { gameOver: false, guessedWord: false },
    numAttempts: 0,
    wordList: [],
    wordIndex: 0,
    numWordsGuessed: 0,
    wordsGuessed: [],
    totalAttempts: 0,
    showNextWordButton: false,
    showEndGameButton: false,
    setDisabledLetters: () => {},
    setShowConfetti: () => {},
  };

  export function GameProvider({ children }) {
    const [gameState, setGameState] = useState(initialState);
    const setCorrectWord = async () => {
        try {
          const words = await generateWordSet();
          setGameStateProperty("wordSet", words.wordSet);
          setGameStateProperty("wordList", Array.from(words.wordSet));
          setGameStateProperty("correctWord", words.todaysWord);
          console.log("setCorrectWord" , words.todaysWord)
        } catch (error) {
          console.error("Failed to generate correct word:", error);
        }
      };
    const setGameStateProperty = (property, value) => {
      setGameState((prevState) => ({
        ...prevState,
        [property]: value,
      }));
    };
    

    const resetGame = () => {
      setGameState(initialState);
    };
    
  return (
    <GameContext.Provider
      value={{ gameState, setGameStateProperty, resetGame, setCorrectWord }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
    return useContext(GameContext);
  }
