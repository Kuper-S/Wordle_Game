import React from "react";
import '../../App.css';
const Score = ({ currentGuesses, maxGuesses }) => {
  return (
    <div className="score">
      <p>Guesses: {currentGuesses}/{maxGuesses}</p>
    </div>
  );
};

export default Score;
