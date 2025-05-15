import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaBolt,
  FaVial,
  FaJava,
} from "react-icons/fa";
import "./Experience.scss";

const experienceData = [
  {
    title: "Frontend Development",
    icon: <FaReact />,
    short: "React, Redux, Hooks, UI/UX, Performance",
    details:
      "Built scalable SPAs using React, Redux, Hooks, and Context API. Applied SCSS, Tailwind, and lazy loading to enhance performance and accessibility.",
  },
  {
    title: "Backend Development",
    icon: (
      <>
        <FaNodeJs /> +
        <FaJava />
      </>
    ),
    short: "Node.js, Express, Java, Spring Boot",
    details:
      "Developed REST and GraphQL APIs using Node.js, Express, Java, and Spring Boot. Used Prisma, PostgreSQL, Spring Data JPA for efficient DB interaction.",
  },
  {
    title: "Cloud & DevOps",
    icon: <FaAws />,
    short: "AWS, CI/CD, Jenkins, ECS, EC2",
    details:
      "Deployed microservices on AWS using ECS, EC2, S3, and CloudWatch. Automated pipelines with Jenkins, GitHub Actions, and AWS CodePipeline.",
  },
  {
    title: "Containerization",
    icon: <FaDocker />,
    short: "Docker, Kubernetes",
    details:
      "Used Docker to containerize microservices and frontend builds. Managed deployments with Kubernetes for scalable infrastructure.",
  },
  {
    title: "Performance Optimization",
    icon: <FaBolt />,
    short: "Lazy loading, useCallback, bundle splitting",
    details:
      "Optimized frontend using virtual DOM techniques, useCallback, and dynamic imports. Reduced bundle sizes with code splitting and async patterns.",
  },
  {
    title: "Testing & Quality",
    icon: <FaVial />,
    short: "Jest, RTL, JUnit, Mockito, Cypress",
    details:
      "Implemented unit and integration tests for React and Spring Boot apps using Jest, React Testing Library, JUnit, and Cypress. Maintained high test coverage.",
  },
];

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="experiance" className="experience-section">
      <h2>Areas of Expertise</h2>
      <p className="subtitle">
        Based on 6+ years of experience as a Full-Stack Developer with React,
        Node, java, SpringBoot & AWS.
      </p>
      <div className="experience-grid">
        {experienceData.map((item, index) => (
          <div
            key={index}
            className={`experience-card ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{activeIndex === index ? item.details : item.short}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
