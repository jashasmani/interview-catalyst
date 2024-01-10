import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        {/* <img  src={} alt=""></img> */}
        <h2 id='catalyst'>Interview Catalyst</h2>
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
      <div className='container'>
        <div className='wrapper'><h1>Ask , Chat,<br />Answer , Repeat.</h1></div>
        <div className='wrapper1'><h2> Ask questions and get real answers from real people.</h2></div>
        <button className='btn' onClick={() => navigate('/login')}>Start Reading</button>

        {/* <Link to="/login" className='link'>Get Started</Link> */}
      </div>

      {/* <msg/> */}
    </>
  );
};

export default Home;