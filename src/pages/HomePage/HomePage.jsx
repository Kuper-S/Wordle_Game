import React from "react";import TopPlayers from "../../components/TopPlayers/TopPlayers";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from "../LandingPage/Landing";
import HomeGameBtn from "../../components/Buttons/HomeGameBtn";

const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };
  const handleToGame = async () => {
    setTimeout (() => {
      navigate('/game');
    }, 3000);
    
  };
  
  return (
    <Container className="home-container">
      <TopPlayers />
      <ToastContainer />
      
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h1>Welcome {currentUser.displayName}! 🚀</h1>
          <h3>Ready to Play?</h3>

          {currentUser && (
            
            <div>
              <Row className="mt-4 justify-content-center">
                <Col xs={12} md={6} className="text-center">
                  <HomeGameBtn onClick={handleToGame}/>
                </Col>
              </Row>

              <div className="home-logout">
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </div>
          )}
          {!currentUser && (
            <Landing />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;