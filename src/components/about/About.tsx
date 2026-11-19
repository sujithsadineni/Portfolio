import React from "react";
import Typewriter from "typewriter-effect";
import { FaFilePdf, FaLinkedin } from "react-icons/fa";
import { about, links } from "../../data/content";
import GameBoard from "../games/GameBoard";
import "./About.scss";

const d = (i: number) => ({ "--d": `${i * 0.08}s` }) as React.CSSProperties; // stagger delay

const About: React.FC = () => (
  <section id="about">
    <div className="about-wrapper">
      <div className="about-text">
        <p className="greeting reveal" style={d(0)}>
          {about.greeting}
        </p>
        <h1 className="reveal" style={d(1)}>
          I'm {about.name}
        </h1>
        <div className="typewriter-text reveal" style={d(2)} aria-label={about.typewriter.join(", ")}>
          <Typewriter options={{ strings: about.typewriter, autoStart: true, loop: true, delay: 50, deleteSpeed: 25 }} />
        </div>
        <p className="bio reveal" style={d(3)}>
          {about.bio.map((part, i) => (typeof part === "string" ? part : <strong key={i}>{part.strong}</strong>))}
        </p>
        <div className="button-group reveal" style={d(4)}>
          <a href={links.linkedin} className="hero-btn linkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href={links.resume} className="hero-btn resume" target="_blank" rel="noopener noreferrer">
            <FaFilePdf /> My Resume
          </a>
        </div>
      </div>

      {/* opacity-only fade: a transform here would trap the game's fixed overlays */}
      <div className="about-game fade" style={d(3)}>
        <GameBoard />
      </div>
    </div>
  </section>
);

export default About;
