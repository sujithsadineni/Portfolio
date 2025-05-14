// src/components/about/About.tsx

import React from 'react';
import './About.scss';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about-content">
        <h1>About Me</h1>
        <p>
          I'm Sujith, a passionate web developer specializing in building responsive and engaging web applications
          using modern technologies like React, TypeScript, and SCSS.
        </p>
        <p>
          I love to create visually appealing designs with smooth animations and interactive UI components.
          Always eager to learn new technologies and enhance my skills.
        </p>
      </div>
    </section>
  );
};

export default About;
