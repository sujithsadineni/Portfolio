import React from "react";
import "./ProfessionalExperience.scss";

const timeline = [
  {
    date: "Dec 2022 – Present",
    title: "Senior Full-Stack Developer",
    company: "Morgan Stanly",
    logo: "/Portfolio/morgan.jpeg",
    description:
      "Leading scalable frontend and backend systems using React, GraphQL, Node.js and Next.js. Delivered secure authentication and reusable UI libraries.",
  },
  {
    date: "2022 – 2024",
    title: "Master's In Computer Science",
    company: "Southern Arkansas University",
    logo: "/Portfolio/sau.png",
    description:
      "Built feature flag platforms and contributed to large-scale product releases using React, Node.js, Express and GraphQL. Delivered CI/CD improvements.",
  },
  {
    date: "2016 – 2021",
    title: "Software Engineer",
    company: "Wells Fargo",
    logo: "/Portfolio/assets/wellsfargo.svg",
    description:
      "Maintained enterprise-grade banking UIs using React, Redux, and JavaScript. Mentored developers and improved code reusability across teams.",
  },
  {
    date: "2011 – 2015",
    title: "B.Tech in Computer Science",
    company: "JNTU Hyderabad",
    logo: "/Portfolio/assets/jntu.png",
    description:
      "Graduated with strong academic performance and built foundational skills in Java, OOPs, and data structures.",
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
                  <h3>{item.title}</h3>
                  <p className="company">{item.company}</p>
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
