import './App.css';
import Forgot from './Components/Forgot/Forgot';
import Login from './Components/Login/JSX/Login';
import Home from './Components/Home/Home';
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
          <Route path="/confirm/:_id/:token" element={<Confirm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
