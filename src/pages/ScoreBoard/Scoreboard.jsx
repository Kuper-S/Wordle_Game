
import React, { useState, useEffect,useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Alert, Spinner, Table, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchAllUsersData } from "../../api/fetchUserData";
import '../../App.css';


function ScoreBoard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(currentUser);
  console.log(usersData);
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchAllUsersData();
        setUsersData(data);
        setLoading(false); // Data loading completed
      } catch (error) {
        console.error(error);
        setError("Failed to fetch users' data"); // Set error state
        setLoading(false); // Data loading completed (with error)
      }
    };

    fetchData();
  }, []);

  const popover = (
    <Popover id="scoreExplanationPopover">
      <Popover.Body sx={{ p: 2 }}>
        The overall score is calculated based on the number of words guessed correctly and the number of attempts made. The score rewards players who guessed more words accurately with fewer attempts.
      </Popover.Body>
    </Popover>
  );

  const sortedUsersData = useMemo(() => {
    const filteredUsersData = usersData.filter(
      (user, index, arr) =>
        user?.username && // Check if username property exists
        user?.wordsGuessed?.length > 0 &&
        arr.findIndex((u) => u.username === user.username) === index
    );

    return filteredUsersData.sort((a, b) => {
      if (a.wordsGuessed.length === b.wordsGuessed.length) {
        return a.totalAttempts - b.totalAttempts;
      } else {
        return b.wordsGuessed.length - a.wordsGuessed.length;
      }
    });
  }, [usersData]);

  const handleNewGameButton = async () => {
    navigate('/game');
  };

  const handleToHomePage = async () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="scoreboard-container">
        <Spinner animation="border"  variant="warning" role="status"/>
      </div>
    );
  }

 

  return (
    <div className="scoreboard-container">
      <h1>Scoreboard 🏅</h1>
      {currentUser && (
        <h2>{currentUser.displayName}</h2>
      )}
      <div className="scoreExplanationTh">
        <OverlayTrigger trigger={['hover', 'hover']} placement="right" overlay={popover}>
          <span>Overall Score ℹ️</span>
        </OverlayTrigger>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="table_div">
        <div className="table_container">
          <Table striped bordered hover responsive="md" variant="dark">
            <thead>
              <tr>
                <th>Place</th>
                <th>Username</th>
                <th>Number of Words Guessed</th>
                <th>Total Attempts</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsersData.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user?.wordsGuessed.length}</td>
                  <td>{user?.totalAttempts}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="light" onClick={handleNewGameButton}>
            New Game 🕹️
          </Button>
        </div>
        <Button variant="success" onClick={handleToHomePage}>
          Back Home🏠
        </Button>
      </div>
    </div>
  );
}

export default ScoreBoard;
