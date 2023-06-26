import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import ResponsiveAppBar from './components/Navbar/NavBar';
import Home from './pages/HomePage/HomePage';
import Profile from './pages/ProfilePage/Profile';
import LogIn from './pages/UserAuthPages/LogIn';
import SignUp from './pages/UserAuthPages/SignUp';
import ForgetPassword from './pages/UserAuthPages/ForgetPassword';
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';
import GamePage from './pages/GamePage/GamePage';
import Footer from './pages/Footer/Footer';
import useUserData from './Hooks/useUserData'
function App() {
  const { currentUser } = useAuth();
  
  console.log(currentUser);
  return (
    <div className="App">
      <AuthProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/scoreboard" element={<ScoreBoard />} />
          <Route path="/game" element={<GamePage />} />
          {currentUser ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Navigate to="/login" replace />
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
