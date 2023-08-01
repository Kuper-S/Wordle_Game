import React, { useEffect, useState } from "react";
import { fetchAllUsersData } from "../../api/fetchUserData"; 

function TopPlayers() {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    fetchTopPlayersData();
  }, []);

  const fetchTopPlayersData = async () => {
    try {
      const usersData = await fetchAllUsersData();
  
      // Filter users with at least one word guessed and a valid username
      const filteredUsersData = usersData.filter(
        (user) =>
          user?.username && // Check if username property exists
          user?.wordsGuessed?.length > 0
      );
  
      // Calculate the overall score based on words guessed and total attempts
      const sortedUsers = filteredUsersData.sort((a, b) => {
        const scoreA = a.wordsGuessed.length * (a.totalAttempts || 1);
        const scoreB = b.wordsGuessed.length * (b.totalAttempts || 1);
        return scoreB - scoreA; // Sort in descending order
      });
  
      // Get the top 3 players (or less if there are fewer than 3 players)
      const topPlayers = sortedUsers.slice(0, 3);
      console.log(topPlayers);
      setTopPlayers(topPlayers);
    } catch (error) {
      console.error("Error fetching top players data:", error);
    }
  };

  return (
    <div className="top-players-container">
      <h2 className="top-players-header">Top 3 Players</h2>
      <ul className="top-players-list">
        {topPlayers.map((player, index) => (
          <li key={index}>
            {player.username} - Gueesed: {player.wordsGuessed.length} Words
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopPlayers;
