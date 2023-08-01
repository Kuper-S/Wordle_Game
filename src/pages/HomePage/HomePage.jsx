import React from "react";import TopPlayers from "../../components/TopPlayers/TopPlayers";
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from "../LandingPage/Landing";
import HomeGameBtn from "../../components/Buttons/HomeGameBtn";
import AnimatedTitle from "../../assets/AnimatedTitle/animatedTitle";
const Home = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log('ERROR' , error.message);
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
      <AnimatedTitle/>
      {/* <StyledHeader/> */}
      <h1>Welcome {currentUser.displayName}! 🚀</h1>
      <Row className="justify-content-center">
      <TopPlayers />
      <ToastContainer />
        <Col xs={12} className="text-center">
          
          <h3>Ready to Play and do BETTER??</h3>

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