import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Board from "./Board";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import { useAuth } from "../../context/AuthContext";
import useUserData from "../../Hooks/useUserData";
import Modal from "../../components/Modals/Modal";

export const GameContext = React.createContext();

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
    showNextWordButton,
    showEndGameButton,
  } = gameState;

  const setGameStateProperty = (property, value) => {
    setGameState((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (loading || !currentUser) {
      return;
    }

    const fetchData = async () => {
      setLoadingScoreboard(true);
      setGameState({
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
        
      });

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
  console.log(correctWord)
  const onEnter = () => {
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
      return;
    }

    setGameStateProperty("numAttempts", numAttempts + 1);

    if (currAttempt.attempt === 5) {
      setGameState((prevState) => ({
        ...prevState,
        gameFinished: true,
        gameOver: { gameOver: true, guessedWord: false },
      }));
      return;
    }
  };

  const handleNextWord = async () => {
    const words = await generateWordSet();
    const guessedWord = board[currAttempt.attempt].join("");
    const updatedWordsGuessed = [...wordsGuessed, guessedWord].filter(Boolean);

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

  const updateUserScore = async (wordsGuessed, attempts) => {
    try {
      await updateUserData(wordsGuessed, attempts);
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error state or show an error message to the user
    }
  };

  const handleScoreBoardButton = async () => {
    if (userData) {
      try {
        setGameStateProperty("showEndGameButton", true);
        await updateUserScore(wordsGuessed, totalAttempts);

        setLoadingScoreboard(false);
        navigate("/scoreboard", { userData });
      } catch (error) {
        console.error("Error updating user data:", error);
        // Handle error state or show an error message to the user
      }
    } else {
      console.log('ERROR updating user data from game page');
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
  };

  const handleRestartGame = async () => {
    const words = await generateWordSet();

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

  if (loading || loadingScoreboard) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (!userData) {
    return <div>Error: User data not found.</div>;
  }

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
            setShowNextWordButton: (value) =>
              setGameStateProperty("showNextWordButton", value),
            setShowEndGameButton: (value) =>
              setGameStateProperty("showEndGameButton", value),
          }}
        >
          <div className="game">
            <p className="attempts">Number of Attempts: {numAttempts}</p>
            <p className="attempts">Total Attempts: {totalAttempts}</p>
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
                {gameOver.gameOver && !gameOver.guessedWord && (
                  <Button variant="warning" onClick={handleScoreBoardButton}>
                    <Link to='/scoreboard'>Scoreboard</Link>
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

