import React  from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './context/AuthContext';
import ResponsiveAppBar from './components/Navbar/NavBar';
import Home from './pages/HomePage/HomePage';
import Profile from './pages/ProfilePage/Profile';
import LogIn from './pages/UserAuthPages/LogIn';
import SignUp from './pages/UserAuthPages/SignUp';
import ForgetPassword from './pages/UserAuthPages/ForgetPassword';
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';
import GamePage from './pages/GamePage/GamePage';
import Landing from "./pages/LandingPage/Landing";
import GameRules from './pages/GameRules/GameRules';
import Footer from './components/Footer/Footer';

function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="App">
      <AuthProvider>
        <ResponsiveAppBar />
          <Routes>
              <Route path="/" element={<Landing />} />
              {currentUser && <Route path="/home" element={<Home />} />}
              <Route path="/login" element={<LogIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgetpassword" element={<ForgetPassword />} />
              <Route path="/scoreboard" element={<ScoreBoard />} /> 
              <Route path="/gamerules" element={<GameRules />} /> 
              {currentUser && <Route path="/game" element={<GamePage />} />}
              {currentUser && <Route path="/profile" element={<Profile />} />}
              {!currentUser && (
                <Route
                  path="/*"
                  element={() => {
                    navigate('/login', { replace: true });
                    return null;
                  }}
                />
              )}
          </Routes>
          <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
