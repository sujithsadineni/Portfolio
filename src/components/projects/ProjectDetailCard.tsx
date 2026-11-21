import React, { useEffect, useId, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaRegFileCode } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { projectsText, type Project } from "../../data/content";
import { withViewTransition } from "../../utils/viewTransition";

// onToggle must be stable (useCallback): the open effect depends on it
// covered: another project is open on top of this card
type Props = { project: Project; open: boolean; covered: boolean; onToggle: (title: string) => void };

const host = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

// icon-only links on the small card (names come from aria-label)
const IconLinks: React.FC<{ project: Project }> = ({ project }) => (
  <div className="pd-icon-links">
    {project.repo && (
      <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} ${projectsText.code}`} title={projectsText.code}>
        <FaGithub aria-hidden />
      </a>
    )}
    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} ${projectsText.live}`} title={projectsText.live}>
        <FaExternalLinkAlt aria-hidden />
      </a>
    )}
  </div>
);

const Numbered: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="pd-panel">
    <h4>{title}</h4>
    <ol className="pd-numbered">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ol>
  </div>
);

// right side of the open card: the live site, else the repo's files, else the description
const Window: React.FC<{ project: Project }> = ({ project }) => {
  const { screenshot, files } = project.details;
  const address = project.live ? host(project.live) : project.repo ? host(project.repo) : project.title;
  return (
    <figure className="pd-browser">
      <div className="pd-browser-bar" aria-hidden>
        <span />
        <span />
        <span />
        <em>{address}</em>
      </div>
      {screenshot ? (
        <img className="pd-shot" src={screenshot.src} alt={screenshot.alt} />
      ) : files ? (
        <div className="pd-window-body">
          <p className="pd-window-label">{projectsText.files}</p>
          <ul className="pd-files">
            {files.map((f) => (
              <li key={f}>
                <FaRegFileCode aria-hidden /> {f}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="pd-window-body">
          <p className="pd-window-text">{project.description}</p>
        </div>
      )}
      {project.tags.length > 0 && (
        <ul className="tags" aria-label={projectsText.stack}>
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
    </figure>
  );
};

const ProjectDetailCard: React.FC<Props> = ({ project, open, covered, onToggle }) => {
  const d = project.details;
  const panelId = useId();
  const cardRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(open);
  // a project with a screenshot shows it on the small card (logo on its edge); others get the chips card
  const preview = Boolean(d.screenshot);

  // only the card being toggled carries the view-transition name (names must be unique)
  const toggle = () => {
    const card = cardRef.current;
    card?.classList.add("vt-me");
    withViewTransition("projects", () => onToggle(project.title)).finally(() => card?.classList.remove("vt-me"));
  };
  const toggleRefFn = useRef(toggle);
  toggleRefFn.current = toggle;

  useEffect(() => {
    if (open) {
      closeRef.current?.focus({ preventScroll: true });
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      panelRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && toggleRefFn.current();
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    wasOpen.current = open;
  }, [open]);

  // tapping the card opens it; links and buttons inside keep their own clicks
  const onCardClick = (e: React.MouseEvent) => {
    if (!open && !(e.target as HTMLElement).closest("a, button")) toggle();
  };

  return (
    <article ref={cardRef} className={`project-detail ${open ? "open" : ""}`} aria-labelledby={`${panelId}-title`}>
      {/* the small card keeps its grid cell while open, hidden under the panel */}
      <div className={`pd-summary ${preview ? "pd-preview" : "pd-clean"}`} onClick={onCardClick} inert={open || covered} aria-hidden={open || covered}>
        {preview && d.screenshot && <img className="pd-thumb" src={d.screenshot.src} alt="" loading="lazy" />}
        {(project.logo || project.status) && (
          <div className="pd-head">
            {project.logo && <img className="pd-logo" src={project.logo} alt="" width={36} height={36} />}
            {project.status && <span className={`status ${project.status === "In progress" ? "wip" : ""}`}>{project.status}</span>}
          </div>
        )}
        <div className="pd-body">
          <h3 id={`${panelId}-title`}>{project.title}</h3>
          <p className="pd-tagline">{project.tagline}</p>
          {!preview && project.tags.length > 0 && (
            <ul className="tags">
              {project.tags.slice(0, 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="pd-foot">
          <IconLinks project={project} />
          <button ref={toggleRef} type="button" className="pd-more" aria-expanded={open} aria-controls={panelId} onClick={toggle}>
            {projectsText.open} <FaArrowRight aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        // covers the whole grid of cards (positioned against .project-cards)
        <div className="pd-full" id={panelId} ref={panelRef} role="region" aria-label={project.title}>
          <button ref={closeRef} type="button" className="pd-close" aria-label={projectsText.close} onClick={toggle}>
            <IoClose aria-hidden />
          </button>
          <div className="pd-story">
            <div className="pd-title">
              {project.logo && <img src={project.logo} alt="" width={52} height={52} />}
              <div>
                <h3>{project.title}</h3>
                <p className="pd-tagline">{project.tagline}</p>
              </div>
            </div>
            <Numbered title={projectsText.solved} items={d.solved} />
            {d.learned && d.learned.length > 0 && <Numbered title={projectsText.learned} items={d.learned} />}
            {(project.repo || project.live) && (
              <div className="pd-links">
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <FaGithub aria-hidden /> {projectsText.code}
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt aria-hidden /> {projectsText.live}
                  </a>
                )}
              </div>
            )}
          </div>
          <Window project={project} />
        </div>
      )}
    </article>
  );
};

export default ProjectDetailCard;
