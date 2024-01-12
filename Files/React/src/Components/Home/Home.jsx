import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        {/* <img  src={} alt=""></img> */}
        <h3 id='catalyst'>Interview Catalyst</h3>
        <nav >
          <div className='navigation'>
            <a href='/demo/'>Demo</a>
          </div>
          <div className='navigation'>
            <a href='/demo/'>Demo</a>
          </div>
          <div className='navigation'>
            <a href='/Write/'>Write</a>
          </div>
          <div className='navigation'>
            <Link to="/login" className='link'>Get Started</Link>
          </div>


        </nav>
      </header>
      <div className='container-home'>
        <div className='wrapper'>Ask,Chat,<br />Answer,Repeat.</div>
        <div className='wrapper1'><h2> Ask questions and get real answers from real people.</h2></div>
        <button className='btn' onClick={() => navigate('/login')}>Start Reading</button>

      </div>

      {/* <msg/> */}
    </>
  );
};

export default Home;