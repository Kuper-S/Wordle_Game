import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Button} from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HomePage.css';
import GameButton from "../../components/Buttons/GameButton";


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
  }
  return (
    <div className="container-fluid home-container">
      <ToastContainer />

      <Link to="/profile">Go to Profile</Link>
      <Button variant="info" onClick={handleToGame}>To Game Page</Button>
      <Button variant="danger" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};

export default Home;
