import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">Sujith's Portfolio</div>
        <ul className={isMobile ? "navbar__links navbar__links--mobile" : "navbar__links"} onClick={() => setIsMobile(false)}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        <div className="navbar__toggle" onClick={() => setIsMobile(!isMobile)}>
          {isMobile ? <>&#10005;</> : <>&#9776;</>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

