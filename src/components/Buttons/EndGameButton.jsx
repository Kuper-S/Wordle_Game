import React from "react";
import Button from "react-bootstrap/Button";

const EndGameButton = ({ handleEndGame }) => {
  return (
    <Button variant="info" onClick={handleEndGame}>
      End Game
    </Button>
  );
};

export default EndGameButton;