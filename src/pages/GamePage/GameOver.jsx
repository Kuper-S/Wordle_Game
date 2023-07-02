import React, { useContext } from "react";
import { GameContext } from "./GamePage";

function GameOver() {
  const {
    currAttempt,
    gameOver,
    correctWord,
  } = useContext(GameContext);

  
  return (
    <div className="gameOver">
      <h3 >
        {gameOver.guessedWord
          ? "You Correctly Guessed the Wordle"
          : "You Failed to Guess the Word"}
      </h3>
      <h1>Correct Word: {correctWord}</h1>
      {gameOver.guessedWord && (
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;
