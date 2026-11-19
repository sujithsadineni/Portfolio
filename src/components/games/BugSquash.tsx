import React, { useEffect, useReducer, useRef } from "react";
import { FaBug, FaCheckCircle } from "react-icons/fa";
import { GameProps, keyHint, playPop, useClock, useNumberKeys } from "./shared";

const DURATION = 20_000;
const FLAKY_FLIP = 350; // ms between bug/test while flaky

type Kind = "bug" | "critical" | "flaky" | "test" | "fx";
type Hole = { kind: Kind; born: number; until: number; fx?: string; bad?: boolean } | null;

const multiplier = (combo: number) => (combo >= 6 ? 3 : combo >= 3 ? 2 : 1);
const flakyIsBug = (h: { born: number }, now: number) => Math.floor((now - h.born) / FLAKY_FLIP) % 2 === 0;

const BugSquash: React.FC<GameProps> = ({ onFinish, paused }) => {
  const [, render] = useReducer((x: number) => x + 1, 0);
  const clock = useClock(paused);
  const g = useRef({
    holes: Array<Hole>(9).fill(null),
    score: 0,
    combo: 0,
    bestCombo: 0,
    squashed: 0,
    escaped: 0,
    testsHit: 0,
    nextSpawn: 0,
    done: false,
  });

  useEffect(() => {
    const id = setInterval(() => {
      const s = g.current;
      if (s.done) return;
      const now = clock();
      s.holes = s.holes.map((h) => {
        if (!h || h.until > now) return h;
        if (h.kind !== "test" && h.kind !== "fx") {
          s.escaped += 1; // a bug got away
          s.combo = 0;
        }
        return null;
      });
      if (now >= DURATION) {
        s.done = true;
        const attempts = s.squashed + s.escaped + s.testsHit;
        const accuracy = attempts ? Math.round((s.squashed / attempts) * 100) : 0;
        onFinish({
          score: s.score,
          stats: { squashed: s.squashed, escaped: s.escaped, testsHit: s.testsHit },
          rows: [
            ["squashed", `${s.squashed}`],
            ["escaped to prod", `${s.escaped}`],
            ["tests broken", `${s.testsHit}`],
            ["accuracy", `${accuracy}%`],
            ["best combo", `×${multiplier(s.bestCombo)} (${s.bestCombo} in a row)`],
          ],
        });
        return;
      }
      if (now >= s.nextSpawn) {
        const p = now / DURATION; // 0 → 1: gets faster
        const empty = s.holes.flatMap((h, i) => (h ? [] : [i]));
        if (empty.length) {
          const i = empty[Math.floor(Math.random() * empty.length)];
          const r = Math.random();
          const kind: Kind = r < 0.12 ? "critical" : r < 0.25 ? "flaky" : r < 0.45 ? "test" : "bug";
          const visible = (1100 - 450 * p) * (kind === "critical" ? 0.6 : 1);
          s.holes[i] = { kind, born: now, until: now + visible };
        }
        s.nextSpawn = now + 700 - 350 * p;
      }
      render();
    }, 50);
    return () => clearInterval(id);
  }, [onFinish, clock]);

  const hit = (i: number) => {
    const s = g.current;
    const h = s.holes[i];
    if (paused || s.done || !h || h.kind === "fx") return;
    const now = clock();
    const isBug = h.kind === "bug" || h.kind === "critical" || (h.kind === "flaky" && flakyIsBug(h, now));
    if (isBug) {
      const pts = (h.kind === "critical" ? 3 : h.kind === "flaky" ? 2 : 1) * multiplier(s.combo);
      s.score += pts;
      s.squashed += 1;
      s.combo += 1;
      s.bestCombo = Math.max(s.bestCombo, s.combo);
      playPop();
      s.holes[i] = { kind: "fx", born: now, until: now + 300, fx: `+${pts}` };
    } else {
      s.score -= 2;
      s.testsHit += 1;
      s.combo = 0;
      s.holes[i] = { kind: "fx", born: now, until: now + 450, fx: "−2", bad: true };
    }
    render();
  };
  useNumberKeys(!paused, hit);

  const s = g.current;
  const now = clock();
  const left = Math.max(0, Math.ceil((DURATION - now) / 1000));
  const mult = multiplier(s.combo);
  return (
    <div className="game-play">
      <div className="hud">
        <span>⏱ {left}s</span>
        <span>Score {s.score}</span>
        <span className={`combo ${mult > 1 ? "on" : ""}`}>{mult > 1 ? `×${mult} 🔥` : "×1"}</span>
      </div>
      <div className="grid-3">
        {s.holes.map((h, i) => {
          const shown = h?.kind === "flaky" ? (flakyIsBug(h, now) ? "bug" : "test") : h?.kind;
          return (
            <button
              key={i}
              type="button"
              className={`hole ${h?.kind ?? ""} ${shown ?? ""} ${h?.bad ? "oops" : ""}`}
              aria-label={shown === "test" ? "Passing test" : shown && shown !== "fx" ? `${h!.kind} bug, squash it` : "Empty file"}
              onClick={() => hit(i)}
            >
              <span className="key-hint" aria-hidden="true">{keyHint(i)}</span>
              {(shown === "bug" || shown === "critical") && <FaBug />}
              {shown === "test" && <FaCheckCircle />}
              {h?.kind === "fx" && <span className="fx">{h.fx}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BugSquash;
