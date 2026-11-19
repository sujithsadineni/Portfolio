import React, { useEffect, useReducer, useRef, useState } from "react";
import { FaBan } from "react-icons/fa";
import { games, techLogos } from "../../data/content";
import { GameProps, playPop, shuffle, useClock } from "./shared";

const COLS = 4;
const ROWS = 3;
const DECOYS = 3;
const PENALTY = 2000;

type Bubble = { id: string; name: string; src?: string; decoy: boolean; top: string; left: string; dur: string; delay: string };

// 12 cells: 9 logos + 3 legacy decoys, each centred in its cell with jitter.
const layout = (): Bubble[] => {
  const items = shuffle([
    ...techLogos.map((l) => ({ id: l.name, name: l.name, src: l.src, decoy: false })),
    ...Array.from({ length: DECOYS }, (_, i) => ({ id: `legacy-${i}`, name: "Legacy", decoy: true })),
  ]);
  const jitter = () => Math.round((Math.random() - 0.5) * 10);
  return items.map((it, i) => ({
    ...it,
    top: `calc(${((Math.floor(i / COLS) + 0.5) * 100) / ROWS}% - var(--bubble) / 2 + ${jitter()}px)`,
    left: `calc(${(((i % COLS) + 0.5) * 100) / COLS}% - var(--bubble) / 2 + ${jitter()}px)`,
    dur: `${3 + Math.random() * 2}s`,
    delay: `${0.4 + Math.random() * 2}s`,
  }));
};

const LogoPop: React.FC<GameProps> = ({ onFinish, paused, hard }) => {
  const [bubbles, setBubbles] = useState(layout);
  const [popping, setPopping] = useState<string[]>([]);
  const [fact, setFact] = useState<{ text: string; n: number } | null>(null);
  const [, render] = useReducer((x: number) => x + 1, 0);
  const clock = useClock(paused);
  const penalty = useRef(0);
  const decoysHit = useRef(0);
  const area = useRef<HTMLDivElement>(null);
  const els = useRef(new Map<string, HTMLButtonElement>());
  const logosLeft = bubbles.filter((b) => !b.decoy).length;

  // live timer
  useEffect(() => {
    const t = setInterval(render, 100);
    return () => clearInterval(t);
  }, []);

  // Hard mode: drift + bounce off the walls (positions written straight to the DOM)
  useEffect(() => {
    if (!hard || paused) return;
    const box = area.current!;
    const motion = new Map<string, { x: number; y: number; vx: number; vy: number }>();
    for (const [id, el] of els.current) {
      const a = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 40; // px/s
      motion.set(id, { x: el.offsetLeft, y: el.offsetTop, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed });
    }
    let last = performance.now();
    let raf = requestAnimationFrame(function step(t) {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      for (const [id, m] of motion) {
        const el = els.current.get(id);
        if (!el) continue;
        const maxX = box.clientWidth - el.offsetWidth;
        const maxY = box.clientHeight - el.offsetHeight;
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        if (m.x < 0 || m.x > maxX) {
          m.vx *= -1;
          m.x = Math.max(0, Math.min(maxX, m.x));
        }
        if (m.y < 0 || m.y > maxY) {
          m.vy *= -1;
          m.y = Math.max(0, Math.min(maxY, m.y));
        }
        el.style.left = `${m.x}px`;
        el.style.top = `${m.y}px`;
      }
      raf = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [hard, paused]);

  const pop = (b: Bubble) => {
    if (paused || popping.includes(b.id)) return;
    if (b.decoy) {
      penalty.current += PENALTY;
      decoysHit.current += 1;
      setFact({ text: "Legacy code! +2s", n: Date.now() });
    } else {
      playPop();
      setFact({ text: games.facts[b.name] ?? b.name, n: Date.now() });
    }
    setPopping((p) => [...p, b.id]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((x) => x.id !== b.id));
      setPopping((p) => p.filter((n) => n !== b.id));
    }, 200);
  };

  useEffect(() => {
    if (logosLeft > 0) return;
    const raw = clock() / 1000;
    const n = decoysHit.current;
    onFinish({
      score: Number((raw + (n * PENALTY) / 1000).toFixed(2)),
      rows: [
        ["popping time", `${raw.toFixed(2)}s`],
        ["legacy popped", n ? `${n} (+${(n * PENALTY) / 1000}s)` : "0"],
      ],
    });
  }, [logosLeft, onFinish, clock]);

  return (
    <div className="game-play">
      <div className="hud">
        <span>⏱ {((clock() + penalty.current) / 1000).toFixed(1)}s</span>
        <span>Logos {9 - logosLeft}/9</span>
      </div>
      <div className={`bubble-area ${hard ? "hard" : ""}`} ref={area}>
        {bubbles.map((b) => (
          <button
            key={b.id}
            ref={(el) => {
              if (el) els.current.set(b.id, el);
              else els.current.delete(b.id);
            }}
            type="button"
            className={`bubble ${b.decoy ? "decoy" : ""} ${popping.includes(b.id) ? "popping" : ""}`}
            style={{ top: b.top, left: b.left, "--float-dur": b.dur, "--float-delay": b.delay } as React.CSSProperties}
            aria-label={b.decoy ? "Legacy decoy, don't pop" : `Pop ${b.name}`}
            onClick={() => pop(b)}
          >
            {b.decoy ? (
              <span className="decoy-face">
                <FaBan />
                <small>legacy</small>
              </span>
            ) : (
              <img src={b.src} alt="" />
            )}
          </button>
        ))}
      </div>
      <p className="fact" aria-live="polite" key={fact?.n}>
        {fact?.text ?? " "}
      </p>
    </div>
  );
};

export default LogoPop;
