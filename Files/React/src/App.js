import './App.css';
import Forgot from './Components/Forgot/Forgot';
import Login from './Components/Login/JSX/Login';
import Home from './Components/Home/Home';
import Msg from './Components/Message/JSX/Msg';
import AllQuestion from './Components/Message/JSX/AllQuestion';
import Write from './Components/Write/Write';
import Input from './Components/Write/Input';
import Main from './Components/Main/JSX/Main';
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
          <Route path="/confirm/:id/:token" element={<Confirm />} />

          <Route path="/message" element={<Msg />} />
          <Route path="/allquestion" element={<AllQuestion />} />
          <Route path="/write" element={<Write />} />
          <Route path="/input" element={<Input />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
