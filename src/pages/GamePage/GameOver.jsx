import React, { useContext } from "react";
import { GameContext } from "./GamePage";
import Alert from 'react-bootstrap/Alert';

function GameOver() {
  const { currAttempt, gameOver, correctWord } = useContext(GameContext);

  return (
    <div className="gameOver">
      {gameOver.guessedWord ? (
        <Alert variant="info" className="alert-guessed">
          
          <h1>You guessed in {currAttempt.attempt} attempts</h1>
          
          <h3>Correct Word: {correctWord.toUpperCase()}</h3>
        </Alert>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>
            <h1 className="wrong-message">You Failed to Guess the Word</h1>
          </Alert.Heading>
          
          
          <h3 className="wrong-word">Correct Word: {correctWord.toUpperCase()}</h3>
          
        </Alert>
      )}
    </div>
  );
}

export default GameOver;
