import React from 'react'
import { Row, Col } from 'react-bootstrap';
import SingUp from './pages/UserAuthPages/SingUp';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/UserAuthPages/LogIn';
import AuthProvider from './context/AuthContext';
import Profile from './pages/ProfilePage/Profile';
import PrivateRoute from './pages/UserAuthPages/PrivateRoute';
import ForgetPassword from './pages/UserAuthPages/ForgetPassword';
import ResponsiveAppBar from './components/Navbar/NavBar'
import Home from './pages/HomePage/HomePage';
import ScoreBoard from './pages/ScoreBoard/ScoreBoard';

function App() {
  return (
    <div className='container-fluid'>
      <Row>
          <div className=''>
            <AuthProvider>
            <ResponsiveAppBar/>
              <Routes>
                <Route path='/' element ={<Home/>}/>
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/signup' element={<SingUp />} />
                <Route path='/forgetpassword' element={<ForgetPassword />} />
                <Route path='/scoreboard' element={<ScoreBoard />} />
              </Routes>
            </AuthProvider>
          </div>
        
      </Row>
    </div>
  );
}

export default App;
