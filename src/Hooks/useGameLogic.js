// import { useState, useEffect } from "react";
// import { generateWordSet,boardDefault } from "../pages/GamePage/Words";

// const useGameLogic = () => {
//   const [board, setBoard] = useState([]);
//   const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
//   const [wordSet, setWordSet] = useState(new Set());
//   const [correctWord, setCorrectWord] = useState("");
//   const [gameFinished, setGameFinished] = useState(false);
//   const [disabledLetters, setDisabledLetters] = useState([]);
//   const [gameOver, setGameOver] = useState({
//     gameOver: false,
//     guessedWord: false,
//   });
//   const [numAttempts, setNumAttempts] = useState(0);
//   const [wordList, setWordList] = useState([]);
//   const [wordIndex, setWordIndex] = useState(0);

//   export const checkWordGuessed = (word) => {
//     return wordsGuessed.includes(word.toLowerCase());
//   };

// export default useGameLogic;
