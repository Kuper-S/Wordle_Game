import React, { useContext, useEffect } from "react";
import { GameContext } from "./GamePage";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(GameContext);
  const letter = board?.[attemptVal]?.[letterPos];
  const correct = correctWord?.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord?.toUpperCase().includes(letter);
  const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [almost, correct, letter, setDisabledLetters]);

  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;