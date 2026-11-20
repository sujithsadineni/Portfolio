// My Journey: desktop = Road (a road that draws itself as you scroll),
// phones = Metro (a train riding a transit line fixed under the navbar).
// No animation library: rAF-throttled scroll handlers only.
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaFlagCheckered, FaGraduationCap, FaTrain } from "react-icons/fa";
import { journeyToday, timeline, TimelineItem } from "../../data/content";
import { useIsPhone } from "../../utils/useIsPhone";
import "./ProfessionalExperience.scss";


// ---- shared ---------------------------------------------------------------
type Stop = TimelineItem | (typeof journeyToday & { kind: "now"; date: string; start: string; end: null; logo?: undefined });
// Chronological: oldest → newest, ending at "Today".
const stops: Stop[] = [
  ...[...timeline].sort((a, b) => a.start.localeCompare(b.start)),
  { ...journeyToday, kind: "now", date: "Today", start: "9999", end: null },
];
const yearOf = (s: Stop) => (s.kind === "now" ? "Today" : s.start.slice(0, 4));
const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const duration = (it: Stop) => {
  if (it.kind !== "work") return null;
  const [y1, m1] = it.start.split("-").map(Number);
  const now = new Date();
  const [y2, m2] = it.end ? it.end.split("-").map(Number) : [now.getFullYear(), now.getMonth() + 1];
  const months = (y2 - y1) * 12 + (m2 - m1) + 1; // inclusive, like LinkedIn
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
};

const Card: React.FC<{ s: Stop }> = ({ s }) => (
  <article className={`js-card kind-${s.kind}`}>
    <div className="js-head">
      {s.logo ? (
        <img src={s.logo} alt="" className="js-logo" />
      ) : (
        <span className="js-logo js-flag" aria-hidden="true">
          <FaFlagCheckered />
        </span>
      )}
      <div>
        <h3>{s.title}</h3>
        <p className="js-company">{s.company}</p>
      </div>
    </div>
    <p className="js-meta">
      <span>{s.date}</span>
      {duration(s) && <span>· {duration(s)}</span>}
      {s.kind === "work" && s.end === null && <span className="js-now">Now</span>}
      {s.kind === "edu" && (
        <span className="js-edu">
          <FaGraduationCap aria-hidden="true" /> Education
        </span>
      )}
    </p>
    <ul className="js-points">
      {s.highlights.map((h) => (
        <li key={h}>{h}</li>
      ))}
    </ul>
    <p className="js-tags">
      {s.tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </p>
  </article>
);

// progress (0..1) of `el` past a line at `at` × viewport height; rAF-throttled
const useScrollProgress = (ref: React.RefObject<HTMLElement | null>, at = 0.6) => {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.max(0, Math.min(1, (innerHeight * at - r.top) / r.height)));
    };
    const on = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [ref, at]);
  return p;
};

// index of the last stop whose marker has passed the reading line
const useActiveStop = (refs: React.RefObject<(HTMLElement | null)[]>, at = 0.55) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let a = 0;
      refs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top < innerHeight * at) a = i;
      });
      setActive(a);
    };
    const on = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [refs, at]);
  return active;
};

const jumpTo = (el: HTMLElement | null | undefined) => {
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - innerHeight * 0.3, behavior: reduce() ? "auto" : "smooth" });
};

// ---- 1 Road: a winding road draws itself; a traveller rides the tip -------
const JourneyRoad: React.FC = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGPathElement>(null);
  const markers = useRef<(HTMLElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0, d: "", ys: [] as number[], anchors: [] as { x: number; y: number }[] });
  // model train: locomotive + 2 wagons, each placed on the track and turned with the curve
  const [cars, setCars] = useState([{ x: 0, y: 0, a: 90 }]);
  // one box per stop: t = 0 on its card, 1 loaded on its wagon (driven by scroll, not time)
  const [boxes, setBoxes] = useState<{ x: number; y: number; a: number; t: number }[]>([]);
  const tip = cars[0];
  // stops passed so far: each one adds a wagon with a crate + a puff of smoke
  const passed = size.ys.filter((y) => tip.y >= y - 4).length;
  const [puff, setPuff] = useState(0);
  const lastPassed = useRef(0);
  useEffect(() => {
    if (passed > lastPassed.current) setPuff(Date.now());
    lastPassed.current = passed;
  }, [passed]);
  const p = useScrollProgress(wrap, 0.6);
  const prog = reduce() ? 1 : p;

  // build the road through each stop's marker (desktop: weaves around centre; phone: left edge)
  const layout = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const phone = w < 700;
    const base = phone ? 20 : w / 2;
    const swing = phone ? 8 : 70;
    const top = el.getBoundingClientRect().top;
    const pts = markers.current.map((m, i) => {
      const r = m?.getBoundingClientRect();
      return { x: base + (i % 2 ? swing : -swing), y: r ? r.top - top + r.height / 2 : 0 };
    });
    const all = [{ x: base, y: 0 }, ...pts, { x: base, y: h }];
    let d = `M ${all[0].x} ${all[0].y}`;
    for (let i = 1; i < all.length; i++) {
      const a = all[i - 1];
      const b = all[i];
      const my = (a.y + b.y) / 2;
      d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
    }
    // each card's box starts on the card's top-right corner (clear of the logo)
    const left = el.getBoundingClientRect().left;
    const anchors = markers.current.map((m) => {
      const card = m?.closest(".road-stop")?.querySelector(".js-card")?.getBoundingClientRect();
      if (!card) return { x: 0, y: 0 };
      return { x: card.right - 22 - left, y: card.top - top + 22 };
    });
    setSize({ w, h, d, ys: pts.map((q) => q.y), anchors });
  }, []);
  useLayoutEffect(() => {
    layout();
    const ro = new ResizeObserver(layout);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [layout]);

  // place each car at the drawn tip (and behind it), rotated to the track's direction
  useEffect(() => {
    const path = svg.current;
    if (!path || !size.d) return;
    const L = path.getTotalLength();
    // loco + one wagon per stop passed (newest right behind the loco)
    const head = L * prog;
    const at = (d: number) => {
      const c = Math.max(0, Math.min(L, d));
      const p = path.getPointAtLength(c);
      const q = path.getPointAtLength(Math.max(0, c - 2));
      const r = path.getPointAtLength(Math.min(L, c + 2));
      return { x: p.x, y: p.y, a: (Math.atan2(r.y - q.y, r.x - q.x) * 180) / Math.PI };
    };
    // path distance of each stop (where the track passes its marker)
    const dStops = size.ys.map((y) => {
      let lo = 0;
      let hi = L;
      for (let k = 0; k < 24; k++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < y) lo = mid;
        else hi = mid;
      }
      return lo;
    });
    const ahead = dStops.filter((d) => head >= d).length;
    const train = Array.from({ length: 1 + ahead }, (_, k) => at(head - k * 40));
    setCars(train);
    // box i lifts off its card when the engine reaches the stop and lands on its wagon 140px of track later
    const FLIGHT = 140;
    setBoxes(
      dStops.map((d, i) => {
        const t = Math.max(0, Math.min(1, (head - d) / FLIGHT));
        const from = size.anchors[i] ?? { x: 0, y: 0 };
        const to = train[ahead - i] ?? from; // its wagon: newest right behind the engine
        const ease = t * t * (3 - 2 * t);
        return {
          x: from.x + (to.x - from.x) * ease,
          y: from.y + (to.y - from.y) * ease - Math.sin(Math.PI * t) * 40, // arc up, then down
          a: (to.a ?? 0) * ease,
          t,
        };
      })
    );
  }, [prog, size]);

  return (
    <section id="journey" className="js js-road">
      <h2>My Journey</h2>
      <p className="js-sub">From my first line of Java to production AI features.</p>
      <div ref={wrap} className="road-wrap">
        <svg className="road" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
          {/* two rails = one wide stroke with its middle masked out, so they follow every curve */}
          <defs>
            <mask id="rails-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={size.w || 1} height={size.h || 1}>
              <path d={size.d} stroke="#fff" strokeWidth="14" fill="none" />
              <path d={size.d} stroke="#000" strokeWidth="8" fill="none" />
            </mask>
          </defs>
          <path className="sleepers" d={size.d} />
          <path className="rails" d={size.d} mask="url(#rails-mask)" />
          <path ref={svg} className="road-line" d={size.d} pathLength={1} mask="url(#rails-mask)" style={{ strokeDashoffset: 1 - prog }} />
        </svg>
        <div className="model-train" aria-hidden="true">
          {cars.map((c, i) => (
            <span
              key={i}
              className={i === 0 ? "traveller mt-loco" : "mt-wagon"}
              style={{ transform: `translate(${c.x}px, ${c.y}px) rotate(${c.a}deg)` }}
            >
              {i === 0 && (
                <>
                  <i className="mt-boiler" />
                  <i className="mt-cab" />
                  <i className="mt-chimney" />
                  <i className="mt-lamp" />
                </>
              )}
            </span>
          ))}
          {boxes.map((b, i) => (
            <span
              key={`box-${i}`}
              className={`mt-box ${b.t >= 1 ? "loaded" : b.t > 0 ? "flying" : ""}`}
              style={{ transform: `translate(${b.x}px, ${b.y}px) rotate(${b.a}deg) scale(${1 + Math.sin(Math.PI * b.t) * 0.25})` }}
            />
          ))}
          {puff > 0 && (
            <span key={puff} className="mt-smoke" style={{ transform: `translate(${tip.x}px, ${tip.y}px)` }}>
              <i />
              <i />
              <i />
            </span>
          )}
        </div>
        <ol className="road-stops">
          {stops.map((s, i) => {
            const reached = size.ys[i] !== undefined && tip.y >= size.ys[i] - 4;
            return (
              <li key={s.company} className={`road-stop ${i % 2 ? "right" : "left"} ${reached ? "reached" : ""}`}>
                <span
                  className="road-marker"
                  ref={(el) => {
                    markers.current[i] = el;
                  }}
                  aria-hidden="true"
                >
                  {yearOf(s)}
                </span>
                <Card s={s} />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

// ---- 2 Metro: transit line + train; stations light up; click to travel ----
const JourneyMetro: React.FC = () => {
  const list = useRef<HTMLOListElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const active = useActiveStop(cards, 0.55);
  const p = useScrollProgress(list, 0.55);
  const n = stops.length;
  // train sits between stations: snap progress to the active stop plus a little
  const trainPos = Math.min(1, Math.max(active / (n - 1), p));
  return (
    <section id="journey" className="js js-metro">
      <h2>My Journey</h2>
      <p className="js-sub">Every stop on the line, 2015 → today.</p>
      <div className="metro">
        <nav className="metro-map" aria-label="Journey stations">
          <div className="metro-line" style={{ "--t": trainPos } as React.CSSProperties}>
            <span className="metro-fill" />
            <span className="train" aria-hidden="true">
              <FaTrain />
            </span>
            {stops.map((s, i) => (
              <button
                key={s.company}
                type="button"
                className={`station ${i <= active ? "passed" : ""} ${i === active ? "here" : ""} kind-${s.kind}`}
                style={{ "--s": i / (n - 1) } as React.CSSProperties}
                aria-current={i === active ? "step" : undefined}
                onClick={() => jumpTo(cards.current[i])}
              >
                <span className="dot" aria-hidden="true" />
                <span className="label">
                  <b>{yearOf(s)}</b>
                  <small>{s.company}</small>
                </span>
              </button>
            ))}
          </div>
        </nav>
        <ol ref={list} className="metro-cards">
          {stops.map((s, i) => (
            <li
              key={s.company}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={i === active ? "active" : ""}
            >
              <Card s={s} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

const ProfessionalExperience: React.FC = () => (useIsPhone() ? <JourneyMetro /> : <JourneyRoad />);


export default ProfessionalExperience;
