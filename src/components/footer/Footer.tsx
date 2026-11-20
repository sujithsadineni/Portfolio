import React from "react";
import { links, footer } from "../../data/content";
import "./Footer.scss";
import {
  FaInstagram,
  FaGithub,
  FaLinkedinIn,
  FaYoutube,
  FaReddit,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const social = [
  ["instagram", FaInstagram],
  ["email", SiGmail],
  ["github", FaGithub],
  ["linkedin", FaLinkedinIn],
  ["youtube", FaYoutube],
  ["reddit", FaReddit],
] as const;

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          {social.map(([key, Icon]) => (
            <a
              key={key}
              href={links[key]}
              aria-label={footer.social[key]}
              // mailto opens the mail app; a new tab would just stay blank
              {...(key !== "email" && { target: "_blank", rel: "noopener noreferrer" })}
            >
              <Icon />
            </a>
          ))}
        </div>
        <p className="copy-right">{footer.copyright(new Date().getFullYear())}</p>
        <p className="tech-used">{footer.techUsed}</p>
      </div>
    </footer>
  );
};

export default Footer;
