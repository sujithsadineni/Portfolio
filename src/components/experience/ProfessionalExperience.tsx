import React from "react";
import "./ProfessionalExperience.scss";

const timeline = [
  {
    date: "May 2025 – Present",
    title: "Senior Full-Stack Developer",
    company: "North Carolina State",
    logo: "/Portfolio/nc-state.jpg",
    description:
      "Designed SPAs with React, Hooks, and Redux. Built scalable APIs with Node.js/Express, implemented JWT auth, CI/CD using Jenkins, AWS ECS, and monitored apps with CloudWatch and ELK Stack.",
  },
  {
    date: "Dec 2022 – May 2025",
    title: "Senior Full-Stack Developer",
    company: "Morgan Stanley",
    logo: "/Portfolio/morgan.jpeg",
    description:
      "Delivered secure microservices using Node.js, Prisma ORM, and PostgreSQL. Led CI/CD workflows via Jenkins and AWS CodePipeline. Maintained SPAs using React, SASS, and RTL.",
  },
  {
    date: "2022 – 2024",
    title: "Master's In Computer Science",
    company: "Southern Arkansas University",
    logo: "/Portfolio/sau.png",
    description:
      "Completed MS in Computer Science. Built full-stack apps with React, GraphQL, Node.js. Improved backend performance with Express middleware and PostgreSQL indexing.",
  },
  {
    date: "Apr 2019 – Aug 2022",
    title: "Full-Stack Developer",
    company: "Cognizant",
    logo: "/Portfolio/Cognizant-Logo.png",
    description:
      "Developed scalable SPAs using React.js and Hooks. Built GraphQL APIs with Java Spring Boot. Focused on accessibility, modular styling (SCSS), and CI/CD with Docker & Jenkins.",
  },
  {
    date: "2015 – 2019",
    title: "B.E in Computer Science",
    company: "St Joseph's College Of Engineering",
    logo: "/Portfolio/st.joseph.logo.png",
    description:
      "Graduated in Computer Science. Gained strong foundation in Java, OOP, data structures, and participated in web and full-stack development internships.",
  },
];

const ProfessionalExperience: React.FC = () => {
  return (
    <section id="journey" className="journey-section">
      <h2>My Journey</h2>
      <div className="timeline">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
          >
            <div className="content">
              <div className="date">{item.date}</div>
              <div className="card">
                <img src={item.logo} alt={`${item.company} logo`} />
                <div>
                  <h3 className="company">{item.company}</h3>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
            <div className="dot" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperience;
