import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function HomeGameBtn() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();


  const handleToGame = async () => {
    setIsClicked(true);
    setTimeout(() => {
        setIsClicked(false);
      }, 3000);
    navigate('/game');
  };

  return (
    <div className="homepage-game-btn">
      <button
        className={`glow-on-hover ${isClicked ? 'clicked' : ''}`}
        type="button"
        onClick={handleToGame}
      >
      <h1 className="new-g-btn">NEW GAME🕹️</h1>
        
      </button>
    </div>
  );
}

export default HomeGameBtn;