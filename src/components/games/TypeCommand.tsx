import React, { useEffect, useReducer, useRef, useState } from "react";
import { games } from "../../data/content";
import { GameProps, pick, playPop, useClock } from "./shared";

const OUTPUT_LINE_MS = 250;

// One command per tier (easy → hard); touch devices get shorter ones.
const choose = () => {
  const touch = matchMedia("(pointer: coarse)").matches;
  const tiers = touch ? [1, 1, 2] : [1, 2, 3];
  const used = new Set<string>();
  return tiers.map((tier) => {
    const c = pick(games.commands.filter((x) => x.tier === tier && !used.has(x.cmd)));
    used.add(c.cmd);
    return c;
  });
};

const TypeCommand: React.FC<GameProps> = ({ onFinish, paused }) => {
  const [cmds] = useState(choose);
  const [round, setRound] = useState(0);
  const [value, setValue] = useState("");
  const [shownLines, setShownLines] = useState(0); // output lines printed (0 = typing)
  const [, render] = useReducer((x: number) => x + 1, 0);
  const clock = useClock(paused);
  const typing = useRef({ ms: 0, roundStart: 0, keys: 0, correct: 0, doneChars: 0 });
  const input = useRef<HTMLInputElement>(null);
  const c = cmds[round];
  const printing = shownLines > 0;

  useEffect(() => {
    const t = setInterval(render, 250); // live WPM
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!printing && !paused) input.current?.focus({ preventScroll: true });
  }, [printing, paused, round]);

  // print fake output line by line, then next round / finish
  useEffect(() => {
    if (!printing || paused) return;
    const t = setTimeout(() => {
      if (shownLines < c.output.length) return setShownLines(shownLines + 1);
      if (round + 1 < cmds.length) {
        setRound(round + 1);
        setValue("");
        setShownLines(0);
        typing.current.roundStart = clock();
        return;
      }
      const s = typing.current;
      const accuracy = s.keys ? Math.round((s.correct / s.keys) * 100) : 0;
      const wpm = Math.round(s.doneChars / 5 / (s.ms / 60_000)); // 5 chars = 1 word
      onFinish({ score: wpm, stats: { accuracy }, rows: [["accuracy", `${accuracy}%`], ["commands", `${cmds.length}/${cmds.length}`]] });
    }, OUTPUT_LINE_MS);
    return () => clearTimeout(t);
  }, [printing, paused, shownLines, round, cmds.length, c, clock, onFinish]);

  const change = (v: string) => {
    if (printing || paused) return;
    const s = typing.current;
    // count each newly typed character; correct if it matches the target at that position
    for (let i = value.length; i < v.length; i++) {
      s.keys += 1;
      if (v[i] === c.cmd[i]) s.correct += 1;
    }
    setValue(v);
    if (v !== c.cmd) return;
    playPop();
    s.ms += clock() - s.roundStart;
    s.doneChars += c.cmd.length;
    setShownLines(1);
  };

  // live stats
  let ok = 0;
  while (ok < value.length && value[ok] === c.cmd[ok]) ok++;
  const s = typing.current;
  const liveMs = s.ms + (printing ? 0 : clock() - s.roundStart);
  // at least 1s in the divisor: no absurd spikes on the first keystrokes
  const liveWpm = Math.round((s.doneChars + (printing ? 0 : ok)) / 5 / (Math.max(liveMs, 1000) / 60_000));
  const liveAcc = s.keys ? Math.round((s.correct / s.keys) * 100) : 100;

  return (
    <div className="game-play">
      <div className="hud">
        <span>
          {round + 1}/{cmds.length}
        </span>
        <span>{liveWpm} WPM</span>
        <span>{liveAcc}%</span>
      </div>
      <div className="terminal" onClick={() => input.current?.focus()}>
        <code className="target" aria-hidden="true">
          <span className="prompt">$ </span>
          <span className="done">{c.cmd.slice(0, ok)}</span>
          {value.length > ok && <span className="wrong">{c.cmd.slice(ok, value.length) || " "}</span>}
          <span className="todo">{c.cmd.slice(Math.max(ok, value.length))}</span>
        </code>
        <p className="explain"># {c.explain}</p>
        {printing ? (
          <pre className="output" aria-live="polite">
            {c.output.slice(0, shownLines).join("\n")}
          </pre>
        ) : (
          <input
            ref={input}
            value={value}
            onChange={(e) => change(e.target.value)}
            onPaste={(e) => e.preventDefault()}
            onDrop={(e) => e.preventDefault()}
            aria-label={`Type: ${c.cmd}`}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
};

export default TypeCommand;
