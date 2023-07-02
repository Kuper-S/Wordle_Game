import React,{useEffect,useState} from "react";
import Letter from "./Letter";
import { boardDefault } from "./Words";


function Board({ gameFinished }) {
  const [board, setBoard]  = useState();
  useEffect(() => {
    // Clear board when gameFinished is true
    if (gameFinished) {
      setBoard(boardDefault);
    }
  }, [gameFinished]);
 
  return (
    <div className="board">
      <div className="row">
        <Letter key={`row-0-letter-0`} letterPos={0} attemptVal={0} />
        <Letter key={`row-0-letter-1`} letterPos={1} attemptVal={0} />
        <Letter key={`row-0-letter-2`} letterPos={2} attemptVal={0} />
        <Letter key={`row-0-letter-3`} letterPos={3} attemptVal={0} />
        <Letter key={`row-0-letter-4`} letterPos={4} attemptVal={0} />
      </div>
      <div className="row">
        <Letter key={`row-1-letter-0`} letterPos={0} attemptVal={1} />
        <Letter key={`row-1-letter-1`} letterPos={1} attemptVal={1} />
        <Letter key={`row-1-letter-2`} letterPos={2} attemptVal={1} />
        <Letter key={`row-1-letter-3`} letterPos={3} attemptVal={1} />
        <Letter key={`row-1-letter-4`} letterPos={4} attemptVal={1} />
      </div>
      <div className="row">
        <Letter key={`row-2-letter-0`} letterPos={0} attemptVal={2} />
        <Letter key={`row-2-letter-1`} letterPos={1} attemptVal={2} />
        <Letter key={`row-2-letter-2`} letterPos={2} attemptVal={2} />
        <Letter key={`row-2-letter-3`} letterPos={3} attemptVal={2} />
        <Letter key={`row-2-letter-4`} letterPos={4} attemptVal={2} />
      </div>
      <div className="row">
        <Letter key={`row-3-letter-0`} letterPos={0} attemptVal={3} />
        <Letter key={`row-3-letter-1`} letterPos={1} attemptVal={3} />
        <Letter key={`row-3-letter-2`} letterPos={2} attemptVal={3} />
        <Letter key={`row-3-letter-3`} letterPos={3} attemptVal={3} />
        <Letter key={`row-3-letter-4`} letterPos={4} attemptVal={3} />
      </div>
      <div className="row">
        <Letter key={`row-4-letter-0`} letterPos={0} attemptVal={4} />
        <Letter key={`row-4-letter-1`} letterPos={1} attemptVal={4} />
        <Letter key={`row-4-letter-2`} letterPos={2} attemptVal={4} />
        <Letter key={`row-4-letter-3`} letterPos={3} attemptVal={4} />
        <Letter key={`row-4-letter-4`} letterPos={4} attemptVal={4} />
      </div>
      <div className="row">
        <Letter key={`row-5-letter-0`} letterPos={0} attemptVal={5} />
        <Letter key={`row-5-letter-1`} letterPos={1} attemptVal={5} />
        <Letter key={`row-5-letter-2`} letterPos={2} attemptVal={5} />
        <Letter key={`row-5-letter-3`} letterPos={3} attemptVal={5} />
        <Letter key={`row-5-letter-4`} letterPos={4} attemptVal={5} />
      </div>
    </div>
  );
}

export default Board;
