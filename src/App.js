import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ApiProvider from "./api/ApiProvider";
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/authPages/SingUpPage';


function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="singup" element={<SignUpPage />}>  
          </Route>
        </Routes>
      </ApiProvider>
    </BrowserRouter>

  );
 
}

export default App;
