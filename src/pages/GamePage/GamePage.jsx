import "../../App.css";
import { ToastContainer, toast } from 'react-toastify';
import ReactModal from 'react-modal';
import { FaQuestionCircle, FaTimes } from 'react-icons/fa';
import Board from "./Board";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, useEffect,createContext } from "react";
import GameOver from "./GameOver";
import { useAuth } from '../../context/AuthContext'
ReactModal.setAppElement('#root');
export const AppContext = createContext();

function GamePage() {
  const { currentUser, updateUserData } = useAuth();
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [numAttempts, setNumAttempts] = useState(0);
  // get the Current user info:
  

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
      setGameOver({ gameOver: true, guessedWord: true });

      if (currentUser) {
        updateUserData(currentUser.displayName, currAttempt.attempt + 1);
      }

      return;
    }

    setNumAttempts(numAttempts + 1);

    if (numAttempts === 5) {
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
  return (
    <div className="gamepage">
      <nav>
        
        <h1 >{currentUser.displayName} You can DO IT!</h1> 
        <div className="tooltip-container">
          <FaQuestionCircle onClick={openModal} className="question-icon" />
        </div>
      </nav>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2>How To Play</h2>
          <p>Guess the Wordle in 6 tries.</p>
          <p>Each guess must be a valid 5-letter word.</p>
          <p>The color of the tiles will change to show how close your guess was to the word.</p>
          <h3>Examples</h3>
          <ul>
            <li>W is in the word and in the correct spot.</li>
            <li>I is in the word but in the wrong spot.</li>
            <li>U is not in the word in any spot.</li>
          </ul>
          <p>A new puzzle is released daily at midnight. If you haven’t already, you can sign up for our daily reminder email.</p>
          <p>Have feedback? Email us at xyz@xyz.com.</p>
        </div>
        <FaTimes onClick={closeModal} className="close-icon" />
      </ReactModal>
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
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default GamePage;
