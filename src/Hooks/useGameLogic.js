import { useState, useEffect } from "react";
import { generateWordSet,boardDefault } from "../pages/GamePage/Words";

const useGameLogic = () => {
  const [board, setBoard] = useState([]);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [numAttempts, setNumAttempts] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const initializeGame = async () => {
      const words = await generateWordSet();
      setWordList(words.wordSet);
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
      setBoard(boardDefault);
      setCurrAttempt({ attempt: 0, letter: 0 });
      setDisabledLetters([]);
      setGameOver({ gameOver: false, guessedWord: false });
      setGameFinished(false);
      setNumAttempts(0);
    };

    initializeGame();
  }, []);

  const restartGame = () => {
    setBoard(boardDefault);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setGameFinished(false);
    setNumAttempts(0);
  };

  const nextWord = () => {
    if (wordList.length > 0 && wordIndex < wordList.length - 1) {
      setWordIndex(wordIndex + 1);
      restartGame();
    } else {
      // All words guessed, end the game or show a message
    }
  };

  // Other game-related functions and logic

  return {
    board,
    currAttempt,
    wordSet,
    correctWord,
    gameFinished,
    disabledLetters,
    gameOver,
    numAttempts,
    wordList,
    wordIndex,
    restartGame,
    nextWord,
    // Other game-related functions and state
  };
};

export default useGameLogic;
