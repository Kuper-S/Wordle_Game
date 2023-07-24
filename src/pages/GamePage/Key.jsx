import React, { useContext, useState } from "react";
import { GameContext } from "./GamePage";

function Key({ keyVal, bigKey, disabled }) {
  const { gameOver, onSelectLetter, onDelete, onEnter } = useContext(GameContext);
  const [isPressed, setIsPressed] = useState(false);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
      setIsPressed(true); // Set the isPressed state to true when the key is clicked
    }
  };

  return (
    <div
      className={`key ${isPressed ? "pressed" : ""}`}
      id={bigKey ? "big" : disabled ? "disabled" : undefined}
      onClick={selectLetter}
      onMouseUp={() => setIsPressed(false)} // Reset the isPressed state to false when the mouse is released
    >
      {keyVal}
    </div>
  );
}

export default Key;
