import React, { useState, createContext, useEffect } from "react";
import { Row } from 'react-bootstrap';
import SingUp from './pages/UserAuthPages/SingUp';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import LogIn from './pages/UserAuthPages/LogIn';
import AuthProvider from './context/AuthContext';
import Profile from './pages/ProfilePage/Profile';
import PrivateRoute from './pages/UserAuthPages/PrivateRoute';
import ForgetPassword from './pages/UserAuthPages/ForgetPassword';
import ResponsiveAppBar from './components/Navbar/NavBar'
import Home from './pages/HomePage/HomePage';
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';
import GamePage from './pages/GamePage/GamePage'


function App() {
  return (
    <div className='container-fluid'>
      <Row>
          <div className='App'>
            <AuthProvider>
            
            <ResponsiveAppBar/>
              <Routes>
                <Route path='/' element ={<Home/>}/>
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SingUp />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path='/scoreboard' element={<ScoreBoard />} />
                <Route path='/game' element={<GamePage />} />
              </Routes>
              
            </AuthProvider>
            
          </div>
        
      </Row>
    </div>
  );
}

export default App;
