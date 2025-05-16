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
import { IoClose } from "react-icons/io5";
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
        <FaNodeJs /> + <FaJava />
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
        Node, Java, SpringBoot & AWS.
      </p>
      <div className="experience-grid">
        {experienceData.map((item, index) => {
          const isActive = activeIndex === index;
          const isHidden = activeIndex !== null && !isActive;

          return (
            <div
              key={index}
              className={`experience-card ${isActive ? "active" : ""} ${
                isHidden ? "hidden" : ""
              }`}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
            >
              {isActive && (
                <button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(null);
                  }}
                >
                  <IoClose />
                </button>
              )}
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{isActive ? item.details : item.short}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
