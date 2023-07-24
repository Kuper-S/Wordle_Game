import React from "react";
import Robot from "./Robot";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./GameRules.css"; 

function GameRules() {
  const navigate = useNavigate();

  const handleToHomePage = async () => {
    navigate('/home');
  };

  return (
    <div className="game-rules-container">
      <h2 className="game-rules-title">Game Rules</h2>
      <ol className="game-rules-ol">
        <li>Objective: Guess the secret five-letter word within six attempts to earn points.</li>
        <li>You can enter one letter per attempt to form a word.</li>
        <li>Letters in the correct position will be marked as "Correct."</li>
        <li>Letters present in the secret word but in the wrong position will be marked as "Almost."</li>
        <li>Letters not in the secret word will be marked as "Error."</li>
        <li>If you correctly guess the word within six attempts, you win the round.</li>
        <li>After six attempts, the round ends, and the correct word will be revealed.</li>
      </ol>

      <h2 className="game-rules-title">Score Explanation</h2>
      <p className="game-rules-text">
        The scoring is based on the number of attempts it takes to correctly guess the word.
        In case of a tie (two or more players guessing the same number of words),
        the player with the lowest total attempts across all words guessed will be ranked higher.
        The lower the total attempts, the better your score.
      </p>

      <h3 className="game-rules-text">Example Scores:</h3>
      <table className="example-scores-table">
        <thead>
          <tr>
            <th>Player Name</th>
            <th>Number of Words Guessed</th>
            <th>Total Attempts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Player A</td>
            <td>3</td>
            <td>13</td>
          </tr>
          <tr>
            <td>Player B</td>
            <td>3</td>
            <td>11</td>
          </tr>
        </tbody>
      </table>
      <p className="game-rules-text">
        In this case, Player B will be ranked higher because they guessed the same number of words but with fewer attempts overall.
      </p>
      <Button variant="success" onClick={handleToHomePage}>
            HOME
      </Button>
      <div className="robot-container">
        <Robot />
      </div>
     
    </div>
  );
}

export default GameRules;
