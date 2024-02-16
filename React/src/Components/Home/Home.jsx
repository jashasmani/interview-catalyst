
import React from 'react';
import './Home.css';
import  NavBar from '../Navbar/NavBar';
import  Footer from '../Footer/JSX/Footer'


const Home = () => {
     return (
       <>
        <NavBar/>
        <div className='container'>
          <div className='wrapper'><h1>Ask , Chat ,<br/>Answer , Repeat.</h1></div>
          <div className='wrapper1'><h4> Ask questions and get real answers from real people.</h4></div>
          <button className='btn'>Get Started</button>
        </div>
        <Footer/>
        
       </>
     );
}; 

export default Home;




