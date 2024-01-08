import './App.css';
import Forgot from './Components/Forgot/Forgot';
import Login from './Components/Login/JSX/Login';
import Home from './Components/Forgot/Home';
import Confirm from './Components/Forgot/Confirm';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/home" element={<Home />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
