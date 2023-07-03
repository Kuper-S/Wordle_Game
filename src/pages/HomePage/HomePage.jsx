import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useUserData from "../../Hooks/useUserData";
import Landing from "../LandingPage/Landing"
const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const userData = useUserData();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  console.log(currentUser);
  const handleToGame = async () => {
    navigate('/game');
  };

  return (
    <Container className="home-container ">
      <ToastContainer />
      <Row className="justify-content-center">
        <Col xs={12}  className="text-center">
        <h1>Welcome {currentUser.displayName} ! 🚀</h1>
        <h3>Ready to Play?</h3>

          {currentUser && (
            <div>
              
              <Button variant="info" onClick={handleToGame} className="m-5 p-lg-3">
                NEW GAME
              </Button>
              <Link to="/profile" >
                <Button variant="primary" className="m-5 p-lg-3">Go to Profile</Button>
              </Link>
              
                <div>
                <Button variant="danger" onClick={handleLogout} className="mt-10">
                Log Out
              </Button>
                </div>
            </div>
            
          )}
          {!currentUser && (
            <Landing/>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
