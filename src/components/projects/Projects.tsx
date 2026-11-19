import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "../../data/content";
import "./Projects.scss";

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="projects-3d">
      <h2>🚀 Featured Projects</h2>
      <div className="project-cards">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={project.title}
              className={`project-card ${isActive ? "active" : ""} ${index === 0 ? "lead" : ""}`}
              onClick={() => setActiveIndex(isActive ? null : index)}
            >
              <div className="card-inner">
                <div className="card-front">
                  {project.status && (
                    <span className={`status ${project.status === "In progress" ? "wip" : ""}`}>
                      {project.status}
                    </span>
                  )}
                  <h3>{project.title}</h3>
                  {project.tags.length > 0 && (
                    <p className="front-tags">{project.tags.slice(0, 3).join(" · ")}</p>
                  )}
                </div>
                <div className="card-back">
                  <button
                    className="close-button"
                    aria-label="Close"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(null);
                    }}
                  >
                    <IoClose />
                  </button>
                  <p>{project.description}</p>
                  {project.tags.length > 0 && (
                    <ul className="tags">
                      {project.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                  {(project.repo || project.live) && (
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                          <FaGithub /> Code
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <FaExternalLinkAlt /> Live
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
