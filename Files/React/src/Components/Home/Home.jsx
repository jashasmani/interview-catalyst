import React from 'react';
import './Home.css';



const Home = () => {
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
            <a href='/GetStarted/'>Get Started</a>
          </div>


          </nav>
        </header>
        <div className='container'>
          <div className='wrapper'><h1>Ask , Chat,<br/>Answer , Repeat.</h1></div>
          <div className='wrapper1'><h2> Ask questions and get real answers from real people.</h2></div>
          <button className='btn'><span>Start Reading</span></button>
        </div>


    </>
  );
};

export default Home;
