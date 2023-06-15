import React, { useState,useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import RandomAvatar from "../../components/RandomAvatar";
import { useAuthValue } from '../../auth/AuthContext';
import { auth } from "../../services/firebase_test";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css'; // Import the CSS file for Home component

const Home = () => {
  const { user } = useAuthValue();

  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const handleAvatarButtonClick = () => {
    setShowAvatarPopup(true);
  };
  useEffect(() => {
    toast.success(`Welcome ${user.displayName}`, { autoClose: 3000 });
  }, [user.displayName]);
  if (!user) {
    return null; // Render a loading state or redirect to a login page
  }

  return (
    <div className="container-fluid home-container">
      <div className="row">
        <Card.Body>
          <Card.Title>Welcome</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.displayName}
          </Card.Subtitle>

          <img className="avatar" src={user.photoURL} alt="" />
          <Button
            className="sign-out-button"
            variant="outline-danger"
            type="submit"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
          <Button
            className="choose-avatar-button"
            variant="outline-primary"
            onClick={handleAvatarButtonClick}
          >
            Choose Avatar
          </Button>
        </Card.Body>
      </div>

      {showAvatarPopup && (
        <div className="row">
          <RandomAvatar onClose={() => setShowAvatarPopup(false)} />
        </div>
      )}
    </div>
  );
};

export default Home;
