import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Alert, Spinner, Table, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useUserData from '../../Hooks/useUserData';
import useScores from '../../Hooks/useScores';
import '../../App.css';

function ScoreBoard() {
  const { currentUser } = useAuth();
  const { loading, error, usersData: scoresData } = useScores();
  const navigate = useNavigate();
  const userData = useUserData();
  const [usersData, setUsersData] = useState([]);

  const handleToHomePage = async () => {
    navigate('/home');
  };

  useEffect(() => {
    if (userData) {
      setUsersData([userData]);
    }
  }, [userData]);

  const popover = (
    <Popover id="scoreExplanationPopover">
      <Popover.Body>
        The overall score is calculated based on the number of words guessed correctly and the number of attempts made. The score rewards players who guessed more words accurately with fewer attempts. The lower the score, the better the performance.
      </Popover.Body>
    </Popover>
  );

  const sortedUsersData = [...usersData, ...scoresData].sort((a, b) => {
    if (a.score === b.score) {
      return a.guessit - b.guessit; // Sort by "guessit" property in descending order
    } else {
      return b.score - a.score; // Sort by score in ascending order
    }
  });

  const filteredUsersData = sortedUsersData.filter(user => user.username);
  return (
    <div className="scoreboard-container">
      <h1>Scoreboard 🏅</h1>
      <OverlayTrigger trigger={['hover', 'hover']} placement="right" overlay={popover}>
        <th className="scoreExplanationTh">Overall Score ℹ️</th>
      </OverlayTrigger>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
        <div className="table_div">
            <div className="table_container">
              <Table striped bordered hover responsive="md" variant="dark">
                <thead>
                  <tr>
                    <th>Place</th>
                    <th>Username</th>
                    <th>Number of Words Guessed</th>
                    <th>Overall Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsersData.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.username}</td>
                      <td>{user?.score}</td>
                      <td>{user.guessit ? 'Yes' : 'No'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Button variant="success" onClick={handleToHomePage}>
              Back Home🏠
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ScoreBoard;
