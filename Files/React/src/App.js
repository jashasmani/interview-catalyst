import './App.css';
import Forgot from './Components/Forgot/Forgot';
import Login from './Components/Login/JSX/Login';
import Home from './Components/Home/Home';
import Msg from './Components/Message/Msg';
import AllQuestion from './Components/Message/AllQuestion';
import Confirm from './Components/Forgot/Confirm';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/message" element={<Msg />} />
          <Route path="/allquestion" element={<AllQuestion />} />
          <Route path="/confirm/:id/:token" element={<Confirm />} />
          {/* <Route path="/confirm" element={<Confirm />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
