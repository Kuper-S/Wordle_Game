import React from 'react';
import { Row } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import ResponsiveAppBar from './components/Navbar/NavBar';
import Home from './pages/HomePage/HomePage';
import Profile from './pages/ProfilePage/Profile';
import  PrivateRoute  from './pages/UserAuthPages/PrivateRoute';
import LogIn from './pages/UserAuthPages/LogIn';
import SignUp from './pages/UserAuthPages/SignUp';
import ForgetPassword from './pages/UserAuthPages/ForgetPassword';
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';
import GamePage from './pages/GamePage/GamePage';
import Footer from './pages/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Row>
        <AuthProvider>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/scoreboard" element={<ScoreBoard />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Row>
    </div>
  );
}

export default App;
