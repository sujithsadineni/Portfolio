import { useCallback, useEffect, useRef } from "react";
import { popSound } from "../../data/content";

export type GameResult = {
  score: number;
  stats?: Record<string, number>; // used for badges
  rows?: [string, string][]; // end-screen stats: [label, value]
  link?: { href: string; label: string };
};
export type GameProps = {
  onFinish: (r: GameResult) => void;
  paused: boolean;
  hard?: boolean;
};

export const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const pick = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

// ---- per-visitor storage (can throw in private mode → treat as empty)
const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const write = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};
// Storage is outside our control: anything non-numeric counts as "no best yet".
export const loadBest = (key: string): number | null => {
  const v = Number(read(`best:${key}`) ?? NaN);
  return Number.isFinite(v) ? v : null;
};
export const saveBest = (key: string, score: number) => {
  if (Number.isFinite(score)) write(`best:${key}`, String(score));
};
export const loadSet = (key: string) => {
  try {
    const v = JSON.parse(read(key) ?? "[]");
    return new Set<string>(Array.isArray(v) ? v : []);
  } catch {
    return new Set<string>();
  }
};
export const saveSet = (key: string, set: Set<string>) => write(key, JSON.stringify([...set]));

// ---- sound
export const isMuted = () => read("sound") === "off";
export const setMuted = (muted: boolean) => write("sound", muted ? "off" : "on");
let audio: HTMLAudioElement | null = null;
export const playPop = () => {
  if (isMuted()) return;
  audio ??= new Audio(popSound);
  audio.currentTime = 0;
  audio.play().catch(() => {}); // autoplay rules / no audio device
};

// Game time in ms that stops while paused (tab hidden / board off-screen).
export const useClock = (paused: boolean) => {
  const c = useRef<{ start: number; pausedAt: number | null; pausedTotal: number } | null>(null);
  c.current ??= { start: performance.now(), pausedAt: null, pausedTotal: 0 };
  useEffect(() => {
    const s = c.current!;
    const t = performance.now();
    if (paused && s.pausedAt === null) s.pausedAt = t;
    if (!paused && s.pausedAt !== null) {
      s.pausedTotal += t - s.pausedAt;
      s.pausedAt = null;
    }
  }, [paused]);
  return useCallback(() => {
    const s = c.current!;
    return (s.pausedAt ?? performance.now()) - s.start - s.pausedTotal;
  }, []);
};

// Number keys → 3x3 grid index, laid out like a numpad (7 8 9 top row).
const NUMPAD: Record<string, number> = { "7": 0, "8": 1, "9": 2, "4": 3, "5": 4, "6": 5, "1": 6, "2": 7, "3": 8 };
export const keyHint = (i: number) => Object.keys(NUMPAD).find((k) => NUMPAD[k] === i);
export const useNumberKeys = (enabled: boolean, onIndex: (i: number) => void) => {
  const cb = useRef(onIndex);
  useEffect(() => {
    cb.current = onIndex;
  });
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const i = NUMPAD[e.key];
      const t = e.target as HTMLElement;
      if (i === undefined || t.closest("input, textarea")) return;
      e.preventDefault();
      cb.current(i);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);
};
