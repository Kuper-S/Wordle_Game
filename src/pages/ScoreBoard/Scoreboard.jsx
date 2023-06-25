import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Alert, Spinner, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useUserData from "../../Hooks/useUserData";

function ScoreBoard() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userData = useUserData();

  const handleToHomePage = async () => {
    navigate('/');
  };

  
  

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
                <td>{userData?.username}</td>
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
