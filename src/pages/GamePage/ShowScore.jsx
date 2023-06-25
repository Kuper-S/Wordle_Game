import React from "react";
import '../../App.css';

const Score = ({ currentGuesses, maxGuesses, score }) => {
  return (
    <div className="score">
      <p>Guesses: {currentGuesses}/{maxGuesses}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default Score;