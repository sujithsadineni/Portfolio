import React, { useEffect, useReducer, useRef } from "react";
import { FaExclamationTriangle, FaShieldAlt } from "react-icons/fa";
import { games } from "../../data/content";
import { GameProps, keyHint, playPop, useClock, useNumberKeys } from "./shared";

const DURATION = 20_000;
const MAJOR_CHANCE = 0.15;
// npm audit severities: time to patch before exploit, points won/lost
const SEVERITY = {
  low: { ms: 4000, pts: 1, weight: 0.35 },
  moderate: { ms: 3000, pts: 2, weight: 0.3 },
  high: { ms: 2000, pts: 3, weight: 0.25 },
  critical: { ms: 1200, pts: 5, weight: 0.1 },
};
type Sev = keyof typeof SEVERITY;
const SEVS = Object.keys(SEVERITY) as Sev[];
const rollSeverity = (): Sev => {
  let r = Math.random();
  for (const s of SEVS) if ((r -= SEVERITY[s].weight) < 0) return s;
  return "low";
};

const bump = (v: string, major: boolean) => {
  const [a, b, c] = v.split(".").map(Number);
  return major ? `${a + 1}.0.0` : `${a}.${b}.${c + 1}`;
};

type Tile = {
  name: string;
  version: string;
  state: "ok" | "vuln" | "confirm" | "patched" | "breached";
  sev: Sev;
  major: boolean;
  until: number; // game-time ms
  label?: string; // "4.17.20 → 4.17.21"
};

const tally = () => ({ low: 0, moderate: 0, high: 0, critical: 0 }) as Record<Sev, number>;
const list = (t: Record<Sev, number>) =>
  [...SEVS].reverse().filter((s) => t[s]).map((s) => `${t[s]} ${s}`).join(", ");

const PatchVulns: React.FC<GameProps> = ({ onFinish, paused }) => {
  const [, render] = useReducer((x: number) => x + 1, 0);
  const clock = useClock(paused);
  const g = useRef({
    tiles: games.packages.map((p): Tile => ({ ...p, state: "ok", sev: "low", major: false, until: 0 })),
    score: 0,
    patched: tally(),
    exploited: tally(),
    nextSpawn: 0,
    done: false,
  });

  useEffect(() => {
    const id = setInterval(() => {
      const s = g.current;
      if (s.done) return;
      const now = clock();
      for (const t of s.tiles) {
        if (t.until > now) continue;
        if (t.state === "vuln" || t.state === "confirm") {
          s.exploited[t.sev] += 1;
          s.score -= SEVERITY[t.sev].pts;
          t.state = "breached";
          t.until = now + 700;
        } else if (t.state !== "ok") {
          t.state = "ok";
        }
      }
      if (now >= DURATION) {
        s.done = true;
        const patched = Object.values(s.patched).reduce((a, b) => a + b, 0);
        const exploited = Object.values(s.exploited).reduce((a, b) => a + b, 0);
        onFinish({
          score: s.score,
          stats: { patched, exploited },
          rows: [
            ["patched", patched ? `${patched} (${list(s.patched)})` : "0"],
            ["exploited", exploited ? `${exploited} (${list(s.exploited)})` : "0"],
            ["npm audit", exploited ? `✗ ${exploited} got exploited` : "found 0 vulnerabilities ✓"],
          ],
          link: { href: "#projects", label: "This game is based on my Dependency Watch project →" },
        });
        return;
      }
      if (now >= s.nextSpawn) {
        const healthy = s.tiles.filter((t) => t.state === "ok");
        if (healthy.length) {
          const t = healthy[Math.floor(Math.random() * healthy.length)];
          t.sev = rollSeverity();
          t.major = Math.random() < MAJOR_CHANCE;
          t.state = "vuln";
          t.until = now + SEVERITY[t.sev].ms;
        }
        s.nextSpawn = now + 900 - 300 * (now / DURATION); // speeds up
      }
      render();
    }, 100);
    return () => clearInterval(id);
  }, [onFinish, clock]);

  const patch = (i: number) => {
    const t = g.current.tiles[i];
    if (paused || g.current.done) return;
    if (t.state === "vuln" && t.major) {
      t.state = "confirm"; // breaking change: confirm with a second click
    } else if (t.state === "vuln" || t.state === "confirm") {
      const to = bump(t.version, t.major);
      t.label = `${t.version} → ${to}`;
      t.version = to;
      g.current.patched[t.sev] += 1;
      g.current.score += SEVERITY[t.sev].pts;
      t.state = "patched";
      t.until = clock() + 900;
      playPop();
    } else return;
    render();
  };
  useNumberKeys(!paused, patch);

  const s = g.current;
  const left = Math.max(0, Math.ceil((DURATION - clock()) / 1000));
  return (
    <div className="game-play">
      <div className="hud">
        <span>⏱ {left}s</span>
        <span>Score {s.score}</span>
      </div>
      <div className="grid-3">
        {s.tiles.map((t, i) => (
          <button
            key={t.name}
            type="button"
            className={`pkg ${t.state} sev-${t.sev}`}
            aria-label={`${t.name}: ${
              t.state === "vuln" ? `${t.sev} vulnerability, click to upgrade` : t.state === "confirm" ? "major upgrade, click again to confirm" : t.state
            }`}
            onClick={() => patch(i)}
          >
            <span className="key-hint" aria-hidden="true">{keyHint(i)}</span>
            <span className="pkg-name">{t.name}</span>
            <span className="pkg-state">
              {t.state === "ok" && <>{t.version}</>}
              {t.state === "vuln" && (
                <>
                  <FaExclamationTriangle /> {t.sev}
                  {t.major && " · major"}
                </>
              )}
              {t.state === "confirm" && <>⚠ breaking: {bump(t.version, true)}? click</>}
              {t.state === "patched" && (
                <>
                  <FaShieldAlt /> {t.label}
                </>
              )}
              {t.state === "breached" && <>💥 exploited</>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatchVulns;
