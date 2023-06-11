import './App.css';
import React, {useState} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";
// import {
//   BrowserRouter, Routes,
//   Route,
  
// } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/authPages/SingUpPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="singup" element={<SignUpPage />}>
          
        </Route>
      </Routes>
    </BrowserRouter>

  );
 
}

export default App;
