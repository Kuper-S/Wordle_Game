import React, { useState } from 'react';
import { useAuth }  from '../../context/AuthContext';
import { Alert, Spinner, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useUserData from "../../Hooks/useUserData";
import "../../App.css"

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
          <div className="table_div">
          <Table striped bordered hover responsive="md" variant="dark">
            <thead>
              <tr>
                <th>Username</th>
                <th>Guesses</th>
                <th>Guess The Word</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userData?.username}</td>
                <td>{currentUser.score}</td>
                <th>{}</th>
              </tr>
            </tbody>
          </Table>

          <Button variant="success" onClick={handleToHomePage}>
            Back Home
          </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default ScoreBoard;
