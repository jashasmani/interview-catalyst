import React from "react";
import "./Home.css";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/JSX/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nav = useNavigate();
  return (
    <>
      <NavBar />
      <div className="home-maindiv">
        <div className="container">
          <div className="wrapper">
            <h1>
              Ask , Chat ,<br />
              Answer , Repeat.
            </h1>
          </div>
          <div className="wrapper1">
            <h4> Ask questions and get real answers from real people.</h4>
          </div>
          <button className="btn" onClick={() => nav("/signin")}>
            Get Started
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
