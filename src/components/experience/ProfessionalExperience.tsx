import React from "react";
import { timeline } from "../../data/content";
import "./ProfessionalExperience.scss";

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
                </div>
              </div>
              <p className="description">{item.description}</p>
            </div>
            <div className="dot" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperience;
