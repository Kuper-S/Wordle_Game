import React, { useEffect, useState } from "react";
import { fetchAllUsersData } from "../../api/fetchUserData"; // Replace "../api/apiFile" with the correct path to your API file

function TopPlayers() {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    fetchTopPlayersData();
  }, []);

  const fetchTopPlayersData = async () => {
    try {
      const usersData = await fetchAllUsersData();

      // Sort the users by score in descending order to get the top players
      const sortedUsers = usersData.sort((a, b) => b.score - a.score);

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
      <h2>Top 3 Players</h2>
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
