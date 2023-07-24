// export default Keyboard;
import React, { useCallback, useEffect, useContext, useMemo } from "react";
import Key from "./Key";
import { GameContext } from "./GamePage";

function Keyboard() {
  const keys = useMemo(
    () => [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"]
    ],
    []
  );

  const {
    disabledLetters,
    gameOver,
    gameFinished,
    onSelectLetter,
    onEnter,
    onDelete,
    handleNextWord
  } = useContext(GameContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (gameOver.gameOver) return;
      if (event.key === "Enter") {
        if (gameFinished) {
          handleNextWord();
        } else {
          onEnter();
        }
      } else if (event.key === "Backspace") {
        onDelete();
      } else {
        keys.forEach((line) => {
          line.forEach((key) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
              onSelectLetter(key);
            }
          });
        });
      }
    },
    [gameOver.gameOver, gameFinished, handleNextWord, onEnter, onDelete, keys, onSelectLetter]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard">
      {keys.map((line, lineIndex) => (
        <div className={`line${lineIndex + 1}`} key={lineIndex}>
          {line.map((key, keyIndex) => (
            <Key
              key={`${lineIndex}-${keyIndex}`}
              keyVal={key}
              disabled={disabledLetters.includes(key)}
            />
          ))}
        </div>
      ))}
      <div className="line2">
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  );
}

export default Keyboard;
