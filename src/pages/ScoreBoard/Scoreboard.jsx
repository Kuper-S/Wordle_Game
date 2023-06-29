import React, { useState, useEffect } from 'react';
import { useAuth }  from '../../context/AuthContext';
import { Alert, Spinner, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useUserData from "../../Hooks/useUserData";
import useScores from '../../Hooks/useScores';
import "../../App.css"

function ScoreBoard() {
  const { currentUser } = useAuth();
  const { loading, error } = useScores();
  const navigate = useNavigate();
  const userData = useUserData();
  const [usersData, setUsersData] = useState([]);
  
  console.log(userData);
  console.log(currentUser);
  
  const handleToHomePage = async () => {
    navigate('/');
  };

  useEffect(() => {
    if (userData) {
      setUsersData([userData]); // Wrap userData in an array and set it as usersData
    }
  }, [userData]);

  // Sort the usersData based on the number of attempts in ascending order
  const sortedUsersData = [...usersData].sort((a, b) => a.attempts - b.attempts);

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
                  <th>Place</th>
                  <th>Username</th>
                  <th>Guesses</th>
                  <th>Guessed The Word</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsersData.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user?.score}</td>
                    <td>{user.guessit ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
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