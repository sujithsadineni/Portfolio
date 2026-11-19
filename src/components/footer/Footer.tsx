import React from "react";
import { about, links, footer } from "../../data/content";
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
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a
            href={links.instagram}
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href={links.email}
            aria-label="Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGmail />
          </a>

          <a
            href={links.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href={links.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
          <a
            href={links.youtube}
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href={links.reddit}
            aria-label="Reddit"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaReddit />
          </a>
        </div>
        <p>{about.shortName}'s Portfolio.</p>

        <p className="tech-used">{footer.techUsed}</p>

        <p className="copy-right">
          © {new Date().getFullYear()} All rights reserved. Designed and Developed By <FaReact />{" "}
          React , TypeScript and SCSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
