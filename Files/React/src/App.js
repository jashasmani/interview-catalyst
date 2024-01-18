import './App.css';
import React, { useState } from 'react';
import Forgot from './Components/Forgot/Forgot';
import Login from './Components/Login/JSX/Login';
import Home from './Components/Home/Home';
import Msg from './Components/Message/JSX/Msg';
import AllQuestion from './Components/Message/JSX/AllQuestion';
import Write from './Components/Write/Write';
import Input from './Components/Write/Input';
import Main from './Components/Main/JSX/Main';
import Confirm from './Components/Forgot/Confirm';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';

import Log1 from './Components/Demo/Demo1'
import Buy from './Components/Demo/Demo3'
import Home1 from './Components/Demo/Demo2';


function App() {


  const [token, setToken] = useState('');

  const handleLogin = (userToken) => {
    setToken(userToken);
  };



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

          
          <Route path="/log1" element={<Log1 />} />
          <Route path="/home1" element={<Home1 />} />

          
        </Routes>
      </Router>
    </>
  );
}

export default App;
