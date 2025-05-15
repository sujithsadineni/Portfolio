import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { FaFilePdf, FaLinkedin } from "react-icons/fa";
import "./About.scss";

const techLogos = [
  { name: "React", src: "/Portfolio/assets/react.svg" },
  { name: "Node.js", src: "/Portfolio/assets/nodejs.svg" },
  { name: "AWS", src: "/Portfolio/assets/aws.svg" },
  { name: "GraphQL", src: "/Portfolio/assets/graphql.svg" },
  { name: "Docker", src: "/Portfolio/assets/docker.svg" },
  { name: "TypeScript", src: "/Portfolio/assets/typescript.svg" },
  { name: "Java", src: "/Portfolio/assets/java.svg" },
  { name: "Spring", src: "/Portfolio/assets/spring.svg" },
  { name: "Angular", src: "/Portfolio/assets/angular.svg" },
];

const generateGridPositions = (cols: number, rows: number) => {
  const positions = [];
  const gapX = 100 / cols;
  const gapY = 100 / rows;

  for (let i = 0; i < cols * rows; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      top: `${row * gapY + Math.random() * 5}%`,
      left: `${col * gapX + Math.random() * 5}%`,
      animationDuration: `${8 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    });
  }

  return positions;
};

const About: React.FC = () => {
  const [bubbles, setBubbles] = useState(
    techLogos.map((logo, i) => ({
      ...logo,
      style: generateGridPositions(3, 3)[i],
    }))
  );

  const popBubble = (index: number) => {
    setBubbles((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const reset = setInterval(() => {
      setBubbles(
        techLogos.map((logo, i) => ({
          ...logo,
          style: generateGridPositions(3, 3)[i],
        }))
      );
    }, 10000);
    return () => clearInterval(reset);
  }, []);

  return (
    <section id="about">
      <div className="about-wrapper">
        {/* LEFT: About Text */}
        <div className="about-text">
          <h1>👋 Hi, I'm Sujith Kumar Sadineni</h1>
          <div className="typewriter-text">
            <Typewriter
              options={{
                strings: [
                  "Senior Full-Stack Developer",
                  "React | Angular | TypeScript | JavaScript",
                  "Node.js | Java | SpringBoot | Express.js",
                  "6+ Years Experience | AWS Certified Solution Architect ",
                  "Building Scalable & Secure Web Apps",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 25,
              }}
            />
          </div>

          <p>
            I'm a results-driven Full-Stack Developer with over 6 years of
            experience designing and building scalable, high-performance web
            applications. I specialize in{" "}
            <strong>React.js, Node.js, TypeScript</strong>, and cloud platforms
            like <strong>AWS</strong>. My work focuses on secure API design,
            responsive UI/UX, and enterprise-grade architecture across full
            SDLC.
          </p>

          <div className="button-group">
            <a
              href="https://www.linkedin.com/in/sujith-sadineni-508322209/"
              className="linkedin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin style={{ marginRight: "8px" }} />
              LinkedIn
            </a>

            <a
              href="/Portfolio/Sujith_Sadineni_React.pdf"
              className="resume-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf style={{ marginRight: "8px" }} />
              My Resume
            </a>
          </div>
        </div>

        {/* RIGHT: Tech Bubble Pop Game */}
        <div className="tech-bubble-game">
          <h2>👆 CLICK TO POP</h2>
          <div className="bubble-area">
            {bubbles.map((bubble, index) => (
              <img
                key={index}
                src={bubble.src}
                alt={bubble.name}
                className="bubble"
                style={{
                  top: bubble.style.top,
                  left: bubble.style.left,
                  animationDuration: bubble.style.animationDuration,
                  animationDelay: bubble.style.animationDelay,
                }}
                title={`Click to pop ${bubble.name}`}
                onClick={() => popBubble(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
