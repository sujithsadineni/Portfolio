import React, { useState } from 'react';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="logo">Sujith Sadineni</div>
      <ul className={`nav-links ${isMobile ? 'active' : ''}`}>
        <li><a href="#about">About</a></li>
        <li><a href="#experiance">Experiance</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#clients">Clients</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={`menu-toggle ${isMobile ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
