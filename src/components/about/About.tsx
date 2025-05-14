import React from "react";
import "./About.scss";

const About: React.FC = () => {
  return (
    <section id="about">
      <div className="about-wrapper">
        <div className="about-text">
          <h1>Senior Full-Stack Developer</h1>
          <p>
            Hi, I'm Sujith Kumar Sadineni, an innovative Frontend Developer with
            6+ years of experience, specializing in building dynamic,
            user-centric web applications...
          </p>

          <div className="button-group">
            <a
              href="https://www.linkedin.com/in/YOUR-LINKEDIN-ID"
              className="linkedin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on LinkedIn
            </a>

            <a
              href="https://github.com/sujithsadineni/Portfolio/blob/main/public/Sujith_Sadineni_React.pdf"
              className="resume-button"
              download
            >
              My Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
