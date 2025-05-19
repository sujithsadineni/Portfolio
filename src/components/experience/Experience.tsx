import React, { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaBolt,
  FaVial,
  FaJava,
  FaAngular,
  FaJenkins,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { SiApachekafka } from "react-icons/si";
import { IoClose } from "react-icons/io5";
import "./Experience.scss";

const experienceData = [
  {
    title: "Frontend Development",
    icon: (
      <>
        <FaReact /> + <FaAngular /> + <RiNextjsFill />
      </>
    ),
    short: "React, Angular, Next.js, Redux, Hooks, UI/UX Design....",
    details: (
      <ul>
        <li>Developed responsive SPAs using React.js, Angular, and Next.js.</li>
        <li>
          Leveraged Redux, React Hooks, and SCSS/Tailwind for modular,
          accessible UI.
        </li>
        <li>
          Optimized load time via lazy loading, virtual DOM, and bundle
          splitting.
        </li>
        <li>
          Collaborated with UI/UX teams to ensure WCAG compliance and mobile
          responsiveness.
        </li>
        <li>Delivered testable components with RTL, Jest, and Cypress.</li>
      </ul>
    ),
  },
  {
    title: "Backend Development",
    icon: (
      <>
        <FaNodeJs /> + <FaJava />
      </>
    ),
    short: "Node.js, Java, Express, Spring Boot, GraphQL, RestAPI....",
    details: (
      <ul>
        <li>
          Built secure and scalable REST/GraphQL APIs using Node.js, Express,
          Java, and Spring Boot.
        </li>
        <li>
          Integrated Prisma, JPA, and Hibernate for ORM-based database access.
        </li>
        <li>
          Applied JWT/OAuth for stateless authentication and secure API layers.
        </li>
        <li>
          Developed custom middleware for logging, validation, and versioning.
        </li>
        <li>
          Ensured performance via async patterns, schema optimization, and SQL
          tuning.
        </li>
      </ul>
    ),
  },
  {
    title: "Cloud & DevOps",
    icon: (
      <>
        <FaAws /> + <SiApachekafka />
      </>
    ),
    short: "AWS, ECS, EC2, S3, CI/CD, Secrets Manager...",
    details: (
      <ul>
        <li>Deployed microservices using ECS, EC2, and Docker.</li>
        <li>
          Automated CI/CD pipelines via Jenkins, GitHub Actions, and AWS
          CodePipeline.
        </li>
        <li>Secured configuration using AWS Secrets Manager and IAM roles.</li>
        <li>
          Provisioned scalable infrastructure with VPC, S3, CloudWatch, and ELB.
        </li>
        <li>
          Implemented centralized monitoring using CloudWatch and ELK Stack.
        </li>
      </ul>
    ),
  },
  {
    title: "Containerization",
    icon: (
      <>
        <FaDocker /> + <FaJenkins />
      </>
    ),
    short: "Docker, Kubernetes, EKS, CI/CD....",
    details: (
      <ul>
        <li>Containerized frontend and backend apps using Docker.</li>
        <li>Managed deployments using Kubernetes and AWS EKS clusters.</li>
        <li>
          Created Dockerfiles and Helm charts for efficient orchestration.
        </li>
        <li>
          Integrated containers into CI/CD workflows for consistent delivery.
        </li>
        <li>
          Improved portability, rollback strategies, and environment parity.
        </li>
      </ul>
    ),
  },
  {
    title: "Performance Optimization",
    icon: <FaBolt />,
    short: "Lazy loading, useCallback, indexing, tuning.....",
    details: (
      <ul>
        <li>
          Used code-splitting, lazy loading, and memoization for frontend
          performance.
        </li>
        <li>
          Optimized backend using indexed SQL queries and tuned database schema.
        </li>
        <li>Integrated Kafka for async processing and improved throughput.</li>
        <li>Monitored app health with Prometheus and Grafana dashboards.</li>
        <li>Resolved bottlenecks in core banking and analytics modules.</li>
      </ul>
    ),
  },
  {
    title: "Testing & Quality",
    icon: <FaVial />,
    short: "Jest, RTL, JUnit, Mockito, Cypress, Sonar....",
    details: (
      <ul>
        <li>Ensured frontend quality with Jest, RTL, and Cypress.</li>
        <li>Wrote robust backend tests using JUnit and Mockito.</li>
        <li>Maintained high test coverage across services and components.</li>
        <li>
          Used SonarQube for static analysis and enforcing code standards.
        </li>
        <li>Practiced TDD, peer reviews, and tested real-world user flows.</li>
      </ul>
    ),
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
