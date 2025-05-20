// src/components/footer/Footer.tsx

import React from "react";
import "./Footer.scss";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaReact,
  FaReddit,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a
            href="https://www.instagram.com/sujith_sadineni/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:sujithsadineni@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGmail />
          </a>

          <a
            href="https://github.com/sujithsadineni"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/sujith-sadineni-508322209/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.youtube.com/@Sujithkumarsadineni"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.reddit.com/user/E-11-EVN/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaReddit />
          </a>
        </div>
        <p>Sujith Sadineni's Portfolio.</p>

        <p className="tech-used">
          🛠 Built with React 19, confetti, Vite, TypeScript, EmailJS, SCSS, and
          GitHub Pages
        </p>

        <p className="copy-right">
          © 2024 All rights reserved. Designed and Developed By <FaReact />{" "}
          React , TypeScript and SCSS
        </p>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
