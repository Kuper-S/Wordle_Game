import React, { useContext, useEffect } from "react";
import { AppContext } from "./GamePage";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      console.log(letter);
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [almost, correct, currAttempt.attempt, letter, setDisabledLetters]);

  return (
    <div className="letter" id={letterState.toString()}>
      {letter}
    </div>
  );
}

export default Letter;
