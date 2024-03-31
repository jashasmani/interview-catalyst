import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram, FaLinkedin, FaGoogle } from "react-icons/fa";



const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h1 className="tag">Interview Catalyst</h1>
        {/* <p>
          Made  <span></span> 
           by Dhairya and Jash
        </p> */}
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <ul className="socials">
          <li>
            <Link to="#">
              <FaGoogle size={30} color="#DB4437" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <FaInstagram size={30} color="#DB4437" />
            </Link>
          </li>
          
          <li>
            <Link to="#">
              <FaLinkedin size={30} color="#0077B5" />
            </Link>
          </li>
        </ul>
        
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <Link to="#">Interview Catalyst, 2024</Link>{" "}
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;





