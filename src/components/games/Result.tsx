import React from "react";
import { FaRedo, FaShareAlt, FaArrowRight, FaFilePdf, FaEnvelope, FaTrophy } from "react-icons/fa";
import { games, links } from "../../data/content";
import "./Result.scss";

type Props = {
  score: string;
  newBest: boolean;
  compare: string; // "Previous best: 14.20s" / "Your best: 14.20s"
  rows: [string, string][];
  badges: { icon: string; title: string }[];
  link?: { href: string; label: string };
  shared: boolean;
  onPlay: () => void;
  onShare: () => void;
  onNext: () => void;
};

// End-of-game screen: score panel left, stats list right (stacks on narrow boards).
const Result: React.FC<Props> = (p) => (
  <div className="rv rv-split">
    <div className="rv-grid">
      <div className={`rv-panel ${p.newBest ? "best" : ""}`} role="status">
        {p.newBest && (
          <span className="rv-ribbon">
            <FaTrophy /> New best
          </span>
        )}
        <span className="rv-score">{p.score}</span>
        <span className="rv-compare">{p.compare}</span>
      </div>
      <dl className="rv-list">
        {p.rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
        {p.badges.map((b) => (
          <div key={b.title} className="badge-row">
            <dt>{b.icon} new badge</dt>
            <dd>{b.title}</dd>
          </div>
        ))}
      </dl>
    </div>

    {p.link && (
      <a className="rv-link" href={p.link.href}>
        {p.link.label}
      </a>
    )}

    <div className="rv-actions">
      <button type="button" className="rv-primary" onClick={p.onPlay}>
        <FaRedo /> Play again
      </button>
      <button type="button" className="rv-secondary" onClick={p.onShare} aria-label="Share score">
        <FaShareAlt /> {p.shared ? "Copied!" : "Share"}
      </button>
      <button type="button" className="rv-ghost" onClick={p.onNext} aria-label="Next game">
        <span className="lbl">Next game</span> <FaArrowRight />
      </button>
    </div>

    <div className="rv-cta">
      <span className="lbl">{games.cta.text}</span>
      <a href={links.resume} target="_blank" rel="noopener noreferrer">
        <FaFilePdf /> {games.cta.resume}
      </a>
      <a href="#contact">
        <FaEnvelope /> {games.cta.contact}
      </a>
    </div>
  </div>
);

export default Result;
