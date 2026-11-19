import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { about, links } from "../../data/content";
import { sections, useActiveSection, useMenu, useScroll } from "./navHooks";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.scss";

// Full-width bar: transparent at the top, compact frosted bar once scrolled.
const Navbar: React.FC = () => {
  const active = useActiveSection();
  const { scrolled } = useScroll();
  const menu = useMenu(true);

  return (
    <header className={`site-nav ${scrolled ? "scrolled" : ""} ${menu.open ? "open" : ""}`}>
      <nav className="bar" aria-label="Main">
        <a href="#about" className="brand" onClick={menu.close}>
          <span className="mono">SS</span>
          <span className="name">{about.shortName}</span>
        </a>

        <ul className="links">
          {sections.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "active" : ""} aria-current={active === id ? "true" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="actions">
          <ThemeToggle />
          <button
            type="button"
            className="burger"
            aria-label={menu.open ? "Close menu" : "Open menu"}
            aria-expanded={menu.open}
            aria-controls="site-menu"
            onClick={menu.toggle}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="site-menu" className="overlay" hidden={!menu.open}>
        <ul>
          {sections.map(([id, label], i) => (
            <li key={id} style={{ "--i": i } as React.CSSProperties}>
              <a href={`#${id}`} className={active === id ? "active" : ""} onClick={menu.close}>
                <small>0{i + 1}</small>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="overlay-foot" style={{ "--i": sections.length } as React.CSSProperties}>
          <a className="icon" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a className="icon" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
