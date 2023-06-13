import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Login from './pages/UserAuthPages/LoginPage';
import Register from './pages/UserAuthPages/RegisterPage';
import Home from './pages/HomePage/HomePage';
import firebase from './services/firebase_test';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponsiveAppBar from "./components/Navbar/NavBar";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <ResponsiveAppBar />
          <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
