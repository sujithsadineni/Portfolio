import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaDice, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Celebration from "./Celebration";
import Result from "./Result";
import { games, GameId } from "../../data/content";
import {
  GameProps,
  GameResult,
  isMuted,
  loadBest,
  loadSet,
  pick,
  saveBest,
  saveSet,
  setMuted,
} from "./shared";
import LogoPop from "./LogoPop";
import BugSquash from "./BugSquash";
import StackMatch from "./StackMatch";
import PatchVulns from "./PatchVulns";
import TypeCommand from "./TypeCommand";
import "./Games.scss";

const registry: Record<
  GameId,
  { Game: React.FC<GameProps>; better: "lower" | "higher"; format: (n: number) => string; hasHard?: boolean }
> = {
  pop: { Game: LogoPop, better: "lower", format: (n) => `${n.toFixed(2)}s`, hasHard: true },
  bugs: { Game: BugSquash, better: "higher", format: (n) => `${n} pts` },
  match: { Game: StackMatch, better: "lower", format: (n) => `${n} moves` },
  vulns: { Game: PatchVulns, better: "higher", format: (n) => `${n} pts` },
  type: { Game: TypeCommand, better: "higher", format: (n) => `${n} WPM` },
};
const ids = Object.keys(registry) as GameId[];

// Badge rules (titles/icons live in content.ts)
const earns: Record<string, (id: GameId, r: GameResult, played: Set<string>) => boolean> = {
  "player-one": () => true,
  "full-stack": (_, __, played) => ids.every((g) => played.has(g)),
  "quick-draw": (id, r) => id === "pop" && r.score < 5,
  "clean-code": (id, r) => id === "bugs" && r.stats?.testsHit === 0 && (r.stats?.squashed ?? 0) >= 10,
  photographic: (id, r) => id === "match" && r.score <= 7,
  "zero-day": (id, r) => id === "vulns" && r.stats?.exploited === 0,
  "touch-typist": (id, r) => id === "type" && r.score >= 50 && r.stats?.accuracy === 100,
};

type Phase = "ready" | "countdown" | "playing" | "done";
type Outcome = GameResult & { newBest: boolean; prevBest: number | null; newBadges: string[] };

const GameBoard: React.FC = () => {
  const [id, setId] = useState<GameId>(() => pick(ids)); // random game per visit
  const [hard, setHard] = useState(false);
  const bestKey = `${id}${hard ? "-hard" : ""}`;
  const [phase, setPhase] = useState<Phase>("ready");
  const [count, setCount] = useState(3);
  const [paused, setPaused] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [best, setBest] = useState(() => loadBest(id));
  const [badges, setBadges] = useState(() => loadSet("badges"));
  const [muted, setMutedState] = useState(isMuted);
  const [shared, setShared] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const { Game, better, format, hasHard } = registry[id];
  const info = games.items[id];

  const choose = (next: GameId, nextHard = false) => {
    setId(next);
    setHard(nextHard);
    setBest(loadBest(`${next}${nextHard ? "-hard" : ""}`));
    setPhase("ready");
    setOutcome(null);
    setPaused(false);
  };

  const start = () => {
    setOutcome(null);
    setShared(false);
    setPaused(false);
    setCount(3);
    setPhase("countdown");
    // bring the whole board into view; the countdown covers the scroll
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    boardRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  };

  // 3-2-1 (stalls while paused)
  useEffect(() => {
    if (phase !== "countdown" || paused) return;
    const t = setTimeout(() => (count > 1 ? setCount(count - 1) : setPhase("playing")), 500);
    return () => clearTimeout(t);
  }, [phase, count, paused]);

  // Pause when the tab is hidden, or (once playing) the board scrolls out of view.
  // Resume is always a click, so nobody loses a round without seeing it.
  const active = phase === "playing" || phase === "countdown";
  useEffect(() => {
    if (!active) return;
    const onVis = () => document.hidden && setPaused(true);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [active]);
  useEffect(() => {
    if (phase !== "playing") return; // countdown = start-scroll still settling
    const io = new IntersectionObserver(([e]) => e.intersectionRatio < 0.3 && setPaused(true), {
      threshold: [0, 0.3, 1],
    });
    io.observe(boardRef.current!);
    return () => io.disconnect();
  }, [phase]);

  const finish = useCallback(
    (r: GameResult) => {
      const prev = loadBest(bestKey);
      const newBest = prev === null || (better === "lower" ? r.score < prev : r.score > prev);
      if (newBest) {
        saveBest(bestKey, r.score);
        setBest(r.score);
      }
      const played = loadSet("played");
      played.add(id);
      saveSet("played", played);
      const owned = loadSet("badges");
      const newBadges = games.badges
        .filter((b) => !owned.has(b.id) && earns[b.id]?.(id, r, played))
        .map((b) => b.id);
      newBadges.forEach((b) => owned.add(b));
      saveSet("badges", owned);
      setBadges(owned);
      setOutcome({ ...r, newBest, prevBest: prev, newBadges });
      setPhase("done");
    },
    [id, bestKey, better]
  );

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  const share = async () => {
    if (!outcome) return;
    const text = games.share(format(outcome.score), info.title);
    const url = location.origin + location.pathname;
    try {
      if (navigator.share) await navigator.share({ text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShared(true);
      }
    } catch {
      /* user cancelled the share sheet */
    }
  };

  const badgeInfo = (b: string) => games.badges.find((x) => x.id === b)!;

  return (
    <div className={`game-board phase-${phase}`} ref={boardRef}>
      <div className="game-tabs" role="group" aria-label="Choose a game">
        {ids.map((g) => (
          <button key={g} type="button" className={g === id ? "active" : ""} aria-pressed={g === id} onClick={() => choose(g)}>
            {games.items[g].title}
          </button>
        ))}
        <button type="button" className="icon" aria-label="Random game" title="Random game" onClick={() => choose(pick(ids.filter((g) => g !== id)))}>
          <FaDice />
        </button>
        <button type="button" className="icon" aria-label={muted ? "Unmute sounds" : "Mute sounds"} title={muted ? "Unmute" : "Mute"} aria-pressed={muted} onClick={toggleMute}>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      <h2>
        {info.title}
        {hard && <span className="hard-tag">hard</span>}
      </h2>

      {phase === "playing" && <Game onFinish={finish} paused={paused} hard={hard} />}

      {phase === "countdown" && (
        <div className="countdown" aria-live="assertive" key={count}>
          {count}
        </div>
      )}

      {phase === "done" && outcome && (
        <Result
          score={format(outcome.score)}
          newBest={outcome.newBest}
          compare={
            outcome.prevBest === null
              ? "First score on this game"
              : `${outcome.newBest ? "Previous" : "Your"} best: ${format(outcome.prevBest)}`
          }
          rows={outcome.rows ?? []}
          badges={outcome.newBadges.map(badgeInfo)}
          link={outcome.link}
          shared={shared}
          onPlay={start}
          onShare={share}
          onNext={() => choose(pick(ids.filter((g) => g !== id)))}
        />
      )}

      {phase === "ready" && (
        <div className="game-intro">
          <p className="how">{info.how}</p>
          {best !== null && <p className="best">Your best: {format(best)}</p>}
          {hasHard && (
            <label className="hard-toggle">
              <input type="checkbox" checked={hard} onChange={(e) => choose(id, e.target.checked)} />
              Hard mode (logos drift)
            </label>
          )}
          <button type="button" className="game-button" onClick={start}>
            Start
          </button>
          <p className="badge-shelf" aria-label={`Badges: ${badges.size} of ${games.badges.length}`}>
            {games.badges.map((b) => (
              <span key={b.id} className={badges.has(b.id) ? "earned" : ""} title={`${b.title}: ${b.how}`}>
                {b.icon}
              </span>
            ))}
            <small>
              {badges.size}/{games.badges.length}
            </small>
          </p>
        </div>
      )}

      {paused && (phase === "playing" || phase === "countdown") && (
        <div className="paused-overlay">
          <button type="button" className="game-button" onClick={() => setPaused(false)}>
            <FaPlay /> Resume
          </button>
        </div>
      )}

      {phase === "done" && outcome?.newBest && <Celebration />}
    </div>
  );
};

export default GameBoard;
