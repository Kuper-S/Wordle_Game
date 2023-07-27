import React, { useContext } from "react";
import { GameContext } from "./GamePage";
import Alert from 'react-bootstrap/Alert';

function GameOver() {
  const { currAttempt, gameOver, correctWord } = useContext(GameContext);

  return (
    <div className="gameOver">
      {gameOver.guessedWord ? (
        <Alert variant="success">
          <Alert.Heading>You Correctly Guessed the Wordle</Alert.Heading>
          <p className="gameover-alert">You guessed in {currAttempt.attempt} attempts</p>
          
          <p className="gameover-alert">Correct Word: {correctWord.toUpperCase()}</p>
        </Alert>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>You Failed to Guess the Word</Alert.Heading>
         
          <p className="gameover-alert">Correct Word: {correctWord.toUpperCase()}</p>
        </Alert>
      )}
    </div>
  );
}

export default GameOver;