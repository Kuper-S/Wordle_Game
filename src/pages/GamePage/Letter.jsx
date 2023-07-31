import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GamePage";

// function Letter({ letterPos, attemptVal }) {
//   const { board, setDisabledLetters, currAttempt, correctWord } = useContext(GameContext);
//   const letter = board?.[attemptVal]?.[letterPos];
//   const correct = correctWord?.toUpperCase()[letterPos] === letter;
//   const almost = !correct && letter !== "" && correctWord?.toUpperCase().includes(letter);
//   const letterState = currAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

//   const [isPressed, setIsPressed] = useState(false);
  
//   useEffect(() => {
//     if (letter !== "" && !correct && !almost) {
//       setDisabledLetters((prev) => [...prev, letter]);
//     }
//   }, [almost, correct, letter, setDisabledLetters]);

//   const handleClick = () => {
//     setIsPressed(true);
//   };

//   return (
//     <div className={`letter ${isPressed ? "pressed" : ""}`} id={letterState ? letterState : undefined} onClick={handleClick}>
//       {letter}
//     </div>
//   );
// }

// export default Letter;
function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } = useContext(GameContext);
  const letter = board?.[attemptVal]?.[letterPos];
  const [correct, setCorrect] = useState(false);
  const [inCorrectPosition, setInCorrectPosition] = useState(false);
  const almost = !correct && letter !== "" && correctWord?.toUpperCase().includes(letter);
 
  
  useEffect(() => {
  // Update correct and inCorrectPosition whenever correctWord changes
  const isCorrect = correctWord?.toUpperCase()[letterPos] === letter;
  setCorrect(isCorrect);
  setInCorrectPosition(isCorrect && correctWord?.toUpperCase().charAt(letterPos) === letter);
}, [almost, correct, correctWord, letter, letterPos]);

  const letterState = currAttempt.attempt > attemptVal && (correct && inCorrectPosition ? "correct" : almost ? "almost" : "error");
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [almost, correct, letter, setDisabledLetters]);

  const handleClick = () => {
    setIsPressed(true);
  };
 
  return (
    <div className={`letter ${isPressed ? "pressed" : ""}`} id={letterState ? letterState : undefined} onClick={handleClick}>
      {letter}
    </div>
  );
}

export default Letter;