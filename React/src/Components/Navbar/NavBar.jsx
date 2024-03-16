// Navbar.js

import React, { useState } from "react";
// import search from "../images/search.png";
import {  NavLink } from "react-router-dom"; // Import Link and NavLink from react-router-dom
import "./NavBar.css"; // Import the CSS file for styling

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="" alt="" className="logo" />
        <span className="site-name">Interview Catalyst</span>
      </div>
      <div className={`buttons-container ${isMobileMenuOpen ? "show" : ""}`}>
        <NavLink to="/signin" className="button" activeClassName="active">
          Signup
        </NavLink>

        <NavLink to="/signin" className="button" activeClassName="active">
          Login
        </NavLink>
        
      </div>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        &#9776;
      </div>
    </nav>
  );
};

export default Navbar;
