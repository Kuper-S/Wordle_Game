import './App.css';
import React, {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/authPages/SingUpPage';
import SignInPage from './pages/authPages/SignInPage';
import {AuthProvider} from './auth/AuthContext'
import GamePage from './pages/GamePage/GamePage';
import ResponsiveAppBar from './component/Navbar/NavBar';


function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider >
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
