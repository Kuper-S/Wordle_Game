import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css';


const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handleToGame = async () => {
    navigate('/game');
  };

  return (
    <Container className="home-container">
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h1>Welcome to the Home Page</h1>
          {currentUser && (
            <>
              <Link to="/profile">
                <Button variant="primary" className="my-3">
                  Go to Profile
                </Button>
              </Link>
              <Button variant="info" onClick={handleToGame}>To Game Page</Button>

              <Button variant="danger" onClick={handleLogout} className="my-3">
                Log Out
              </Button>
            </>
          )}
          {!currentUser && (
            <>
              <Link to="/login">
                <Button variant="primary" className="my-3">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" className="my-3">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
