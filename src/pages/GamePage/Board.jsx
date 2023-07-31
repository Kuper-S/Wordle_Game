import React, { useEffect, useState } from "react";
import Letter from "./Letter";
import { boardDefault } from "./Words";

function Board({ gameFinished }) {
  const [board, setBoard] = useState(boardDefault);

  useEffect(() => {
    // Clear board when gameFinished is true
    if (gameFinished) {
      setBoard(boardDefault);
    }
  }, [gameFinished]);

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div className="row" key={`row-${rowIndex}`}>
          {row.map((_letter, letterIndex) => ( // Use _ prefix to indicate the variable is intentionally unused
            <Letter
              key={`row-${rowIndex}-letter-${letterIndex}`}
              letterPos={letterIndex}
              attemptVal={rowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
