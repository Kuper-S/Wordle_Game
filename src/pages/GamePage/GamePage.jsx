import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Board from "./Board";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Modals/Modal";
import EndGameButton from "../../components/Buttons/EndGameButton";


export const GameContext = React.createContext();

function GamePage() {
  const navigate = useNavigate();
  const { currentUser, updateUserData } = useAuth();
  const [board, setBoard] = useState(boardDefault); // Initialize board state with boardDefault
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
  const [numWordsGuessed, setNumWordsGuessed] = useState(0);
  const [wordsGuessed, SetWordsGuessed] = useState([]);
  const [showNextWordButton, setShowNextWordButton] = useState(false);
  const [showEndGameButton, setShowEndGameButton] = useState(false);
  
  console.log(correctWord);

  useEffect(() => {
    setBoard(boardDefault);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setGameFinished(false);
    setNumAttempts(0);
    setNumWordsGuessed(wordsGuessed.length); // Initialize the number of words guessed
    console.log(wordsGuessed);
    generateWordSet().then((words) => {
      setWordList([...words.wordSet]); // Set the wordList state correctly
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, [currentUser]);

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;
  
    const enteredWord = board[currAttempt.attempt].join("");
  
    if (wordSet.has(enteredWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      toast.error("Word not found");
      return;
    }
  
    if (enteredWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameFinished(true);
      setShowNextWordButton(true);
      SetWordsGuessed(prevWords => [...prevWords, enteredWord]);
      console.log(wordsGuessed.length);
     
      toast.success("Great JOB!");
      setGameOver({ gameOver: true, guessedWord: true });
      return; // Stop further execution of the function
    }
    setNumAttempts(prevAttempts => prevAttempts + 1); // Increment numAttempts by 1
  
    if (currAttempt.attempt === 5) {
      setGameFinished(true);
      setGameOver({ gameOver: true, guessedWord: false });
      return; // Stop further execution of the function
    }
  };
  console.log(wordsGuessed);
  const handleNextWord = async () => {
    const words = await generateWordSet();
    const guessedWord = board[currAttempt.attempt].join("");
    const updatedWordsGuessed = [...wordsGuessed, guessedWord]; // Combine previous words with current guessed word
    setWordSet(words.wordSet);
    setCorrectWord(words.todaysWord); // Update correctWord after updating wordsGuessed
    setWordIndex(prevIndex => prevIndex + 1);
    setBoard(boardDefault);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
  
    if (wordList.length === wordIndex + 1) {
      setShowNextWordButton(false);
      setShowEndGameButton(true);
    } else {
      setShowNextWordButton(true);
      setShowEndGameButton(false);
    }
  
    setNumAttempts(0);
    setNumWordsGuessed(updatedWordsGuessed.length); // Update the number of words guessed
    setGameOver({ gameOver: false, guessedWord: false });
    setGameFinished(false);
  };


  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = board.map((row, index) => {
      return index === currAttempt.attempt ? [...row] : row;
    });
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
     
  };
  
  console.log("onSelectLetter" , currAttempt);

  const handleRestartGame = async () => {
    const words = await generateWordSet();
    setWordList(words.wordSet);
    setWordSet(words.wordSet);
    setCorrectWord(words.todaysWord);
    setWordIndex(0);
    setNumWordsGuessed(0);
    setBoard(boardDefault);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setGameFinished(false);
    setNumAttempts(0);
    setShowNextWordButton(false); // Hide the "Next Word" button
  };
  

  const handleEndGame = async () => {
    
    try{  
      setBoard(boardDefault);
      setCurrAttempt({ attempt: 0, letter: 0 });
      setDisabledLetters([]);
      setGameOver({ gameOver: true, guessedWord: false });
      setGameFinished(true);
      navigate("/home");
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle the error if necessary
    }
  };

  const handleScoreBoardButton = () => {
    navigate('/scoreboard');
  }

  return (
    <div className="gamepage">
      <div className="game-container">
        <Modal />
        <nav>
          <h1>{currentUser.displayName} You can DO IT!</h1>
        </nav>
        
        <ToastContainer />

        <GameContext.Provider
          value={{
            board,
            setBoard,
            currAttempt,
            setCurrAttempt,
            correctWord,
            onSelectLetter,
            onDelete,
            onEnter,
            setDisabledLetters,
            disabledLetters,
            gameOver,
            handleRestartGame,
            handleNextWord,
            numAttempts,
            gameFinished,
            wordList,
            wordIndex,
            numWordsGuessed,
          }}
        >
          <div className="game">
            <p className="attempts">Number of Attempts: {numAttempts}</p>
            <Board gameFinished={gameFinished} />
            {gameOver.gameOver ? (
              <GameOver />
            ) : (
              <Keyboard />
            )}
            {gameFinished && (
                <div className="game-buttons">
                  {gameOver.gameOver && gameOver.guessedWord && (
                    <Button variant="light" onClick={handleNextWord}>
                      Next Word
                    </Button>
                  )}
                  {showEndGameButton && (
                    <EndGameButton handleEndGame={handleEndGame} />
                  )}
                </div>
              )}
            <p className="attempts">Number of Words Guessed : {wordsGuessed.length}</p>
            <EndGameButton handleEndGame={handleEndGame} />
            <div className="game-buttons">
            <Button
              variant="light"
              onClick={handleScoreBoardButton}
            >
              Scoreboard
            </Button>
            <Button
              variant="danger"
              onClick={handleRestartGame}
            >
              Restart Game
            </Button>
            </div>
          </div>
         
        </GameContext.Provider>
      </div>
    </div>
  );
}

export default GamePage;
