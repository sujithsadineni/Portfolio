import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { expertise } from "../../data/content";
import { withViewTransition } from "../../utils/viewTransition";
import "./Experience.scss";

const Experience: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) =>
    withViewTransition("expertise", () => setActiveIndex((cur) => (cur === index ? null : index)));

  return (
    <section id="experience" className="experience-section">
      <h2>Areas of Expertise</h2>
      <p className="subtitle">{expertise.subtitle}</p>
      <div className="experience-grid">
        {expertise.items.map((item, index) => {
          const isActive = activeIndex === index;
          const detailsId = `expertise-details-${index}`;
          return (
            <article
              key={item.title}
              className={`experience-card ${isActive ? "active" : ""}`}
              style={{ viewTransitionName: `expertise-${index}` }}
            >
              <button
                type="button"
                className="card-toggle"
                aria-expanded={isActive}
                aria-controls={detailsId}
                onClick={() => toggle(index)}
              >
                <span className="icon" aria-hidden="true">
                  {item.icons.map((Icon, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span className="plus">+</span>}
                      <Icon />
                    </React.Fragment>
                  ))}
                </span>
                <span className="title-row">
                  <span className="card-title">{item.title}</span>
                  <FaChevronDown className="chevron" aria-hidden="true" />
                </span>
                {!isActive && <span className="short">{item.short}</span>}
              </button>
              {isActive && (
                <ul id={detailsId} className="details">
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
