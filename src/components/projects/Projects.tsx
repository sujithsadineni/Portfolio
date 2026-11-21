import React, { useCallback, useState } from "react";
import { projects, projectsText } from "../../data/content";
import ProjectDetailCard from "./ProjectDetailCard";
import "./Projects.scss";

const Projects: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleExpanded = useCallback((title: string) => setExpanded((e) => (e === title ? null : title)), []);

  return (
    <section id="projects" className="projects-3d">
      <h2>{projectsText.heading}</h2>
      <div className={`project-cards ${expanded ? "has-open" : ""}`}>
        {projects.map((project) => (
          <ProjectDetailCard
            key={project.title}
            project={project}
            open={expanded === project.title}
            covered={expanded !== null && expanded !== project.title}
            onToggle={toggleExpanded}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
