import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import { expertise, Expertise } from "../../data/content";
import { useIsPhone } from "../../utils/useIsPhone";
import "./Experience.scss";

const chips = (it: Expertise) =>
  it.short
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const Icons: React.FC<{ item: Expertise }> = ({ item }) => (
  <span className="xv-icons" aria-hidden="true">
    {item.icons.map((Icon, i) => (
      <Icon key={i} />
    ))}
  </span>
);

const Points: React.FC<{ item: Expertise }> = ({ item }) => (
  <ul>
    {item.details.map((d, j) => (
      <li key={d} style={{ "--j": j } as React.CSSProperties}>
        <FaCheck aria-hidden="true" /> {d}
      </li>
    ))}
  </ul>
);

// Adds .in-view once the element scrolls into view (staggered entrance).
const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
};

const NEW = 0; // index of the area flagged "new" (AI)

// Desktop: fixed list on the left; only the right panel changes.
// All panels share one grid cell, so the section is always as tall as the
// longest panel and nothing on the page moves when switching.
const Tabs: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const n = expertise.items.length;

  const onKey = (e: React.KeyboardEvent) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (step === undefined && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const i = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (active + step! + n) % n;
    setActive(i);
    tabs.current[i]?.focus();
  };

  return (
    <div ref={ref} className={`tabs-wrap ${seen ? "in-view" : ""}`}>
      <div className="tab-list" role="tablist" aria-label="Areas of expertise" aria-orientation="vertical" onKeyDown={onKey}>
        {expertise.items.map((t, i) => (
          <button
            key={t.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`exp-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`exp-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            className={i === active ? "active" : ""}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => setActive(i)}
          >
            <Icons item={t} />
            <span>{t.title}</span>
            {i === NEW && <span className="new-pill">new</span>}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        {expertise.items.map((it, i) => (
          <div
            key={it.title}
            role="tabpanel"
            id={`exp-panel-${i}`}
            aria-labelledby={`exp-tab-${i}`}
            className={`panel-inner ${i === active ? "active" : ""}`}
            aria-hidden={i !== active}
            inert={i !== active}
          >
            <div className="panel-head">
              <Icons item={it} />
              <h3>{it.title}</h3>
            </div>
            <p className="panel-lead">{it.lead}</p>
            <p className="panel-chips">
              {chips(it).map((c) => (
                <span key={c}>{c}</span>
              ))}
            </p>
            <Points item={it} />
            <p className="panel-count" aria-hidden="true">
              {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Phones: numbered rows, one open at a time, smooth height.
const Accordion: React.FC = () => {
  const [ref, seen] = useInView<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div ref={ref} className={`acc ${seen ? "in-view" : ""}`}>
      {expertise.items.map((it, i) => {
        const isOpen = open === i;
        return (
          <article key={it.title} className={`row ${isOpen ? "open" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`acc-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <Icons item={it} />
                <span className="row-title">
                  {it.title}
                  {i === NEW && <span className="new-pill">new</span>}
                </span>
                <FaChevronDown className="chev" aria-hidden="true" />
              </button>
            </h3>
            <div id={`acc-${i}`} className="reveal-rows" role="region" aria-label={`${it.title} details`}>
              <div>
                <div className="row-body">
                  <p className="row-lead">{it.lead}</p>
                  <p className="row-chips">
                    {chips(it).map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </p>
                  <Points item={it} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const Experience: React.FC = () => {
  const phone = useIsPhone();
  return (
    <section id="experience" className="xv">
      <header className="xv-head">
        <h2>Areas of Expertise</h2>
        <p className="subtitle">{expertise.subtitle}</p>
      </header>
      {phone ? <Accordion /> : <Tabs />}
    </section>
  );
};

export default Experience;
