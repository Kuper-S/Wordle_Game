// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Alert, Spinner, Table, Button, OverlayTrigger, Popover } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { fetchAllUsersData } from "../../api/fetchUserData";
// import { fetchScoresForAllUsers, calculateOverallScore } from '../../Hooks/useScores';
// import '../../App.css';

// function ScoreBoard() {
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();
//   const [usersData, setUsersData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchAllUsersData()
//       .then((data) => {
//         setUsersData(data);
//         setLoading(false); // Data loading completed
//       })
//       .catch((error) => {
//         console.error(error);
//         setError("Failed to fetch users' data"); // Set error state
//         setLoading(false); // Data loading completed (with error)
//       });
//   }, []);

//   const popover = (
//     <Popover id="scoreExplanationPopover">
//       <Popover.Body sx={{ p: 2 }}>
//         The overall score is calculated based on the number of words guessed correctly and the number of attempts made. The score rewards players who guessed more words accurately with fewer attempts.
//       </Popover.Body>
//     </Popover>
//   );
   
//   const sortedUsersData = usersData.sort((a, b) => b.overallScore - a.overallScore);

//   const filteredUsersData = sortedUsersData.filter(
//     (user, index, arr) =>
//       user?.username && // Check if username property exists
//       user?.wordsGuessed?.length > 0 &&
//       arr.findIndex((u) => u.username === user.username) === index
//   );

//   const handleNewGameButton = async () => {
//     navigate('/game');
//   };

//   const handleToHomePage = async () => {
//     navigate('/home');
//   };
//   console.log(currentUser);
//   if (loading) {
//     return (
//       <div className="scoreboard-container">
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="scoreboard-container">
//         <Alert variant="danger">{error}</Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="scoreboard-container">
//       <h1>Scoreboard 🏅</h1>
//       <h2>{currentUser.displayName}</h2>
//       <div className="scoreExplanationTh">
//         <OverlayTrigger trigger={['hover', 'hover']} placement="right" overlay={popover}>
//           <span>Overall Score ℹ️</span>
//         </OverlayTrigger>
//       </div>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <div className="table_div">
//         <div className="table_container">
//           <Table striped bordered hover responsive="md" variant="dark">
//             <thead>
//               <tr>
//                 <th>Place</th>
//                 <th>Username</th>
//                 <th>Number of Words Guessed</th>
//                 <th>Overall Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsersData.map((currentUser, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{currentUser.username}</td>
//                   <td>{currentUser?.wordsGuessed.length}</td>
//                   <td>{currentUser?.overallScore}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//           <Button variant="light" onClick={handleNewGameButton}>
//             New Game 🕹️
//           </Button>
//         </div>
//         <Button variant="success" onClick={handleToHomePage}>
//           Back Home🏠
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ScoreBoard;


import React, { useState, useEffect } from 'react';
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
  useEffect(() => {
    fetchAllUsersData()
      .then((data) => {
        setUsersData(data);
        setLoading(false); // Data loading completed
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch users' data"); // Set error state
        setLoading(false); // Data loading completed (with error)
      });
  }, []);

  const popover = (
    <Popover id="scoreExplanationPopover">
      <Popover.Body sx={{ p: 2 }}>
        The overall score is calculated based on the number of words guessed correctly and the number of attempts made. The score rewards players who guessed more words accurately with fewer attempts.
      </Popover.Body>
    </Popover>
  );
   
  const sortedUsersData = usersData.sort((a, b) => b.overallScore - a.overallScore);

  const filteredUsersData = sortedUsersData.filter(
    (user, index, arr) =>
      user?.username && // Check if username property exists
      user?.wordsGuessed?.length > 0 &&
      arr.findIndex((u) => u.username === user.username) === index
  );

  const handleNewGameButton = async () => {
    navigate('/game');
  };

  const handleToHomePage = async () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="scoreboard-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="scoreboard-container">
        <Alert variant="danger">{error}</Alert>
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
                <th>Overall Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsersData.map((currentUser, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{currentUser.username}</td>
                  <td>{currentUser?.wordsGuessed.length}</td>
                  <td>{currentUser?.overallScore}</td>
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
