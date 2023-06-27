import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserData from "../../Hooks/useUserData";

const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const userData = useUserData();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  console.log(userData?.displayName);
  console.log(userData?.username);
  const handleToGame = async () => {
    navigate('/game');
  };

  return (
    <Container className="home-container ">
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12} md={2} className="text-center">
          <h1>Welcome {userData?.displayName} Ready to Play?</h1>
          {currentUser && (
            <div>
              
              <Button variant="info" onClick={handleToGame} className="mb-3">
                NEW GAME
              </Button>
              <Link to="/profile" className="mb-3">
                <Button variant="primary">Go to Profile</Button>
              </Link>
              <Button variant="danger" onClick={handleLogout} className="mb-3">
                Log Out
              </Button>
            </div>
          )}
          {!currentUser && (
            <div>
              <Link to="/login" className="mb-3">
                <Button variant="primary">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
