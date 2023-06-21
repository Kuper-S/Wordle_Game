import "../../App.css";
import { ToastContainer, toast } from 'react-toastify';

import Button from "react-bootstrap/Button";
import { FaQuestionCircle } from 'react-icons/fa';
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, useEffect,createContext } from "react";
import GameOver from "./GameOver";
import { useAuth } from '../../context/AuthContext'
import Modal from "../../components/Modals/Modal";
export const AppContext = createContext();

function GamePage() {
  const { currentUser, updateUserData } = useAuth();
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [gameFinished, setGameFinished] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [numAttempts, setNumAttempts] = useState(0);
 
  

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);
    });
  }, []);


  const onEnter = () => {
    if (currAttempt.letter !== 5) return;
  
    const enteredWord = board[currAttempt.attempt].join("");
  
    if (wordSet.has(enteredWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      toast.error("Word not found");
    }
  
    if (enteredWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameFinished(true);
      setGameOver({ gameOver: true, guessedWord: true });
  
      if (currentUser) {
        updateUserData(currentUser.displayName, currAttempt.attempt + 1);
      }
  
      return;
    }
  
    setNumAttempts(numAttempts + 1);
  
    if (numAttempts === 5) {
      setGameFinished(true);
      setGameOver({ gameOver: true, guessedWord: false });
  
      if (currentUser) {
        updateUserData(currentUser.displayName, currAttempt.attempt + 1);
      }
  
      return;
    }
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
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };
  console.log('USER NAME' , currentUser);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRestartGame = () => {
    setBoard(boardDefault);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    setGameFinished(false);
    setNumAttempts(0);
  
    // Clear the board by setting all tiles to empty strings
    const emptyBoard = boardDefault.map((row) => row.map(() => ""));
    setBoard(emptyBoard);
  };
  
  return (
    <div className="gamepage">
    <Modal/>
      <nav>
        
        <h1 >{currentUser.displayName} You can DO IT!</h1> 
        
      </nav>
      
      
      <ToastContainer />
      
      <AppContext.Provider
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
        }}
      >
        
        <div className="game">
        <p>Number of Attempts: {numAttempts}</p>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
          {gameFinished && (
              <div>
                <Button variant="info">Show Solution</Button>
              </div>
            )}
            <Button variant="danger" onClick={handleRestartGame}>Restart Game</Button>

        </div>
      </AppContext.Provider>
    </div>
  );
}

export default GamePage;
