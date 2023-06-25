import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Alert, Spinner, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function ScoreBoard() {
  const { currentUser, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToHomePage = async () => {
    navigate('/');
  };

  console.log('SCORE FROM SCOREBOARD', currentUser.score);
  console.log(currentUser);

  return (
    <div className="scoreboard-container">
      <h1>Scoreboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentUser.displayName}</td>
                <td>{currentUser.score}</td>
              </tr>
            </tbody>
          </Table>

          <Button variant="success" onClick={handleToHomePage}>
            Back Home
          </Button>
        </>
      )}
    </div>
  );
}

export default ScoreBoard;
