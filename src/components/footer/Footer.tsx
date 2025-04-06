// src/components/footer/Footer.tsx

import React from 'react';
import './Footer.scss';
import { FaInstagram, FaTwitter, FaGithub, FaLinkedinIn, FaYoutube, FaReact, FaQuora } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.instagram.com/sujith_sadineni/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.instagram.com/sujith_sadineni/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://github.com/sujithsadineni" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/sujith-sadineni-508322209/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
          <a href="https://www.youtube.com/@Sujithkumarsadineni" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://www.youtube.com/@Sujithkumarsadineni" target="_blank" rel="noopener noreferrer">
            <FaQuora />
          </a>
        </div>
        <p>Sujith Sadineni's Portfolio.</p>
        <p></p>
        <p>© 2024 All rights reserved. Designed and Developed By < FaReact /> React and SCSS</p>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
