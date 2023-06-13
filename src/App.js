// export default App;
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/UserAuthPages/LoginPage';
import Home from './pages/HomePage/HomePage';
import firebase  from './services/firebase_test';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./auth/AuthContext"
import ResponsiveAppBar from "./components/Navbar/NavBar"
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <Router>
      <AuthProvider>
        
        <div className="app">
          <ResponsiveAppBar/>
          <Routes>
            <Route path="/" element={user ? <Home user={user} /> : <Login />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}