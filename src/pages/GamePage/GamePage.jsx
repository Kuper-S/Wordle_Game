import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Board from "./Board";
import Confetti from 'react-confetti';
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../Hooks/useUserData";
import Modal from "../../components/Modals/Modal";

export const GameContext = React.createContext();

const MemoizedBoard = React.memo(Board);
const MemoizedKeyboard = React.memo(Keyboard);

function GamePage() {
  const navigate = useNavigate();
  const { userData, loading } = useUserData();
  const { currentUser, updateUserData } = useAuth();
  const [gameState, setGameState] = useState({
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
  });
  const [loadingScoreboard, setLoadingScoreboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const {
    board,
    currAttempt,
    wordSet,
    correctWord,
    gameFinished,
    setDisabledLetters,
    disabledLetters,
    gameOver,
    numAttempts,
    wordList,
    wordIndex,
    numWordsGuessed,
    wordsGuessed,
    totalAttempts,
  } = gameState;

  const setGameStateProperty = (property, value) => {
    setGameState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };
  console.log(correctWord);
  useEffect(() => {
    if (loading || !currentUser) {
      return;
    }

    const fetchData = async () => {
      setLoadingScoreboard(true);
      setGameState((prevState) => ({
        ...prevState,
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
        numWordsGuessed: wordsGuessed.length,
        wordsGuessed: [],
        totalAttempts: 0,
        showNextWordButton: false,
        showEndGameButton: false,
      }));

      try {
        const words = await generateWordSet();
        setGameState((prevState) => ({
          ...prevState,
          wordSet: words.wordSet,
          wordList: Array.from(words.wordSet),
          correctWord: words.todaysWord,
          setDisabledLetters: () => {},
        }));
      } catch (error) {
        console.error("Failed to generate word set:", error);
      }

      setLoadingScoreboard(false);
    };

    fetchData();
  }, [currentUser, loading]);

  const updateUserScore = async (newWordsGuessed, newAttempts) => {
    try {
      await updateUserData(newWordsGuessed, newAttempts);
      
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error state or show an error message to the user
    }
  };

  const onEnter = async () => {
    if (currAttempt.letter !== 5) return;
  
    const enteredWord = board[currAttempt.attempt].join("");
  
    if (wordSet.has(enteredWord.toLowerCase())) {
      setGameStateProperty("currAttempt", {
        attempt: currAttempt.attempt + 1,
        letter: 0,
      });
    } else {
      toast.error("Word not found");
      return;
    }
  
    if (enteredWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameState((prevState) => ({
        ...prevState,
        gameFinished: true,
        showNextWordButton: true,
        wordsGuessed: [...prevState.wordsGuessed, enteredWord],
        gameOver: { gameOver: true, guessedWord: true },
      }));
      toast.success("Great job!");
      setShowConfetti(true);
  
      // Update user score when the game is over
      await updateUserScore(wordsGuessed, numAttempts);
  
      return;
    }
  
    setGameStateProperty("numAttempts", numAttempts + 1);
  
    if (currAttempt.attempt === 5) {
      setGameState((prevState) => ({
        ...prevState,
        gameFinished: true,
        gameOver: { gameOver: true, guessedWord: false },
      }));
  
      // Update user score when the game is over
      await updateUserScore(wordsGuessed, numAttempts);
  
      return;
    }
  };

  
  const handleNextWord = async () => {
    const words = await generateWordSet();
    const guessedWord = board[currAttempt.attempt].join("");
    const updatedWordsGuessed = [...wordsGuessed, guessedWord].filter(Boolean);
    console.log("Board" ,board);
    console.log("currAttempt.attempt" ,currAttempt.attempt)
    setShowConfetti(false);
    setGameState((prevState) => ({
      ...prevState,
      wordSet: words.wordSet,
      correctWord: words.todaysWord,
      wordIndex: wordIndex + 1,
      board: boardDefault,
      currAttempt: { attempt: 0, letter: 0 },
      disabledLetters: [],
      numAttempts: 0,
      totalAttempts: totalAttempts + numAttempts,
      showNextWordButton: wordList.length === wordIndex + 1 ? false : true,
      showEndGameButton: wordList.length === wordIndex + 1 ? true : false,
      numWordsGuessed: updatedWordsGuessed.length,
      wordsGuessed: updatedWordsGuessed,
      gameOver: { gameOver: false, guessedWord: false },
      gameFinished: false,
    }));
  };


  const handleScoreBoardButton = async () => {
    if (userData) {
      try {
        setShowConfetti(false);
        setGameStateProperty("showEndGameButton", true);
        setLoadingScoreboard(true);
        setLoadingScoreboard(false);
        navigate("/scoreboard", { state: { userData } });
        // Remove the navigate line from here
      } catch (error) {
        console.error("Error updating user data:", error);
        // Handle error state or show an error message to the user
      }
    } else {
      console.log('ERROR updating user data from game page');
    }
  };
  
  


  const handleRestartGame = async () => {
    const words = await generateWordSet();
    setShowConfetti(false);
    setGameState((prevState) => ({
      ...prevState,
      wordList: words.wordSet,
      wordSet: words.wordSet,
      correctWord: words.todaysWord,
      wordIndex: 0,
      wordsGuessed: [],
      totalAttempts: 0,
      numWordsGuessed: 0,
      board: boardDefault,
      currAttempt: { attempt: 0, letter: 0 },
      disabledLetters: [],
      gameOver: { gameOver: false, guessedWord: false },
      gameFinished: false,
      numAttempts: 0,
      showNextWordButton: false,
    }));
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
  
    const newBoard = board.map((row, index) => {
      return index === currAttempt.attempt ? [...row] : row;
    });
    
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setGameStateProperty("board", newBoard);
    setGameStateProperty("currAttempt", {
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
    const guessedLetter = newBoard[currAttempt.attempt][currAttempt.letter];
    if (guessedLetter === correctWord[currAttempt.letter]) {
      setShowConfetti(true);
    }
  };
  
  const onDelete = () => {
    if (currAttempt.letter === 0) return;
  
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setGameStateProperty("board", newBoard);
    setGameStateProperty("currAttempt", {
      ...currAttempt,
      letter: currAttempt.letter - 1,
    });
  };

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 60,
    elementCount: 200,
    dragFriction: 0.1,
    duration: 3000,
    stagger: 4,
    width: "10px",
    height: "10px",
    colors: ["#FF0000", "#00FF00", "#0000FF"],
  };


  return (
    <div className="gamepage">
      <div className="game-container">
        <Modal />
        <nav>
          <h1>{currentUser.displayName}, You can do it!</h1>
        </nav>

        <ToastContainer />

        <GameContext.Provider
          value={{
            board,
            currAttempt,
            correctWord,
            onSelectLetter,
            onDelete,
            onEnter,
            disabledLetters,
            setDisabledLetters,
            gameOver,
            handleRestartGame,
            handleNextWord,
            numAttempts,
            gameFinished,
            wordList,
            wordIndex,
            numWordsGuessed,
            totalAttempts,
            setShowNextWordButton: (value) =>
              setGameStateProperty("showNextWordButton", value),
            setShowEndGameButton: (value) =>
              setGameStateProperty("showEndGameButton", value),
          }}
        >
          <div className="game">
            {showConfetti && <Confetti config={confettiConfig} />}
            <p className="attempts">Number of Attempts: {numAttempts}</p>
            <p className="attempts">Total Attempts: {totalAttempts}</p>
            <MemoizedBoard gameFinished={gameFinished} />
            {gameOver.gameOver ? (
              <GameOver />
            ) : (
              <MemoizedKeyboard />
            )}
            {gameFinished && (
              <div className="game-buttons">
                {gameOver.gameOver && gameOver.guessedWord && (
                  <Button variant="light" onClick={handleNextWord}>
                    Next Word
                  </Button>
                )}
                {gameOver.gameOver && !gameOver.guessedWord && (
                  <Button variant="warning" onClick={handleScoreBoardButton}>
                    Scoreboard
                  </Button>
                )}
              </div>
            )}
            <p className="attempts">Number of Words Guessed: {numWordsGuessed}</p>

            <div className="game-buttons">
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




  // const updateUserScore = async (wordsGuessed, totalAttempts) => {
  //   try {
  //     await updateUserData(wordsGuessed, totalAttempts);
  //   } catch (error) {
  //     console.error("Error updating user data:", error);
  //     // Handle error state or show an error message to the user
  //   }
  // };
  
  // const handleScoreBoardButton = async () => {
  //   if (userData) {
  //     try {
  //       setShowConfetti(false);
  //       setGameStateProperty("showEndGameButton", true);
  //       setLoadingScoreboard(true);
  //       await updateUserScore(wordsGuessed, totalAttempts);
        
  //       setLoadingScoreboard(false);
  //       navigate("/scoreboard", { userData });
  //     } catch (error) {
  //       console.error("Error updating user data:", error);
  //       // Handle error state or show an error message to the user
  //     }
  //   } else {
  //     console.log('ERROR updating user data from game page');
  //   }
  // };
