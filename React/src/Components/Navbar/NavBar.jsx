import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

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
