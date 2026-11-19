import React, { useEffect, useReducer, useRef, useState } from "react";
import { games, techLogos } from "../../data/content";
import { GameProps, playPop, shuffle, useClock } from "./shared";

const PAIRS = 6;
const PEEK_MS = 1500;
const stars = (moves: number) => (moves <= 8 ? "★★★" : moves <= 11 ? "★★☆" : "★☆☆");

// Each pair = a logo card + its name card.
const deal = () =>
  shuffle(
    shuffle(techLogos)
      .slice(0, PAIRS)
      .flatMap((logo) => [
        { ...logo, kind: "logo" as const },
        { ...logo, kind: "name" as const },
      ])
  ).map((card, uid) => ({ ...card, uid }));

const StackMatch: React.FC<GameProps> = ({ onFinish, paused }) => {
  const [cards] = useState(deal);
  const [open, setOpen] = useState<number[]>([]); // uids face-up, not yet matched
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [fact, setFact] = useState<{ text: string; n: number } | null>(null);
  const [, render] = useReducer((x: number) => x + 1, 0);
  const clock = useClock(paused);
  const peeking = clock() < PEEK_MS;
  const openRef = useRef<number[]>([]); // source of truth: two taps can land before a re-render
  const show = (o: number[]) => {
    openRef.current = o;
    setOpen(o);
  };

  useEffect(() => {
    const t = setInterval(render, 100); // timer + end of peek
    return () => clearInterval(t);
  }, []);

  const flip = (uid: number) => {
    const card = cards[uid];
    const cur = openRef.current;
    if (paused || peeking || cur.length === 2 || cur.includes(uid) || matched.includes(card.name)) return;
    const next = [...cur, uid];
    show(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    if (cards[next[0]].name === card.name) {
      playPop();
      setMatched((m) => [...m, card.name]);
      setFact({ text: games.facts[card.name] ?? card.name, n: Date.now() });
      show([]);
    } else {
      setTimeout(() => show([]), 700);
    }
  };

  useEffect(() => {
    if (matched.length !== PAIRS) return;
    const secs = ((clock() - PEEK_MS) / 1000).toFixed(1);
    onFinish({ score: moves, rows: [["rating", stars(moves)], ["time", `${secs}s`], ["pairs", `${PAIRS}/${PAIRS}`]] });
  }, [matched.length, moves, onFinish, clock]);

  const secs = Math.max(0, (clock() - PEEK_MS) / 1000).toFixed(1);
  return (
    <div className="game-play">
      <div className="hud">
        {peeking ? (
          <span>👀 Memorise…</span>
        ) : (
          <>
            <span>⏱ {secs}s</span>
            <span>Moves {moves}</span>
            <span className="stars">{stars(moves)}</span>
          </>
        )}
      </div>
      <div className="grid-4">
        {cards.map((c) => {
          const isMatched = matched.includes(c.name);
          const up = peeking || open.includes(c.uid) || isMatched;
          return (
            <button
              key={c.uid}
              type="button"
              className={`memory-card ${up ? "up" : ""} ${isMatched ? "matched" : ""}`}
              aria-label={up ? (c.kind === "logo" ? `${c.name} logo` : `${c.name} name`) : `Card ${c.uid + 1}, face down`}
              onClick={() => flip(c.uid)}
            >
              <span className="face back">?</span>
              <span className="face front">
                {c.kind === "logo" ? <img src={c.src} alt="" /> : <span className="card-name">{c.name}</span>}
              </span>
            </button>
          );
        })}
      </div>
      <p className="fact" aria-live="polite" key={fact?.n}>
        {fact?.text ?? " "}
      </p>
    </div>
  );
};

export default StackMatch;
