// export default App;
import { useState, useEffect } from 'react';

import Login from './pages/UserAuthPages/LoginPage';
import Home from './pages/HomePage/HomePage';
import firebase  from './services/firebase_test';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./auth/AuthContext"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <div className="app">
      {user ? <Home user={user} /> : <Login/>}
    </div>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}