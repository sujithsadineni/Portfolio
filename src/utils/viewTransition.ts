import { flushSync } from "react-dom";

// Run a DOM/state update inside a native View Transition.
// `kind` becomes a class on <html> (vt-<kind>) so CSS can style each kind of
// transition separately. Falls back to a plain update when unsupported or when
// the user prefers reduced motion.
// running transitions per kind: a fast 2nd click skips the 1st, whose cleanup must not
// strip the class while the 2nd is still animating
const running: Record<string, number> = {};
const done = (kind: string) => {
  if (--running[kind] === 0) document.documentElement.classList.remove(`vt-${kind}`);
};

export const withViewTransition = (kind: string, update: () => void): Promise<void> => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  running[kind] = (running[kind] ?? 0) + 1;
  root.classList.add(`vt-${kind}`);
  if (!document.startViewTransition || reduce) {
    // instant switch: vt-<kind> still pauses CSS transitions for this frame
    update();
    void root.offsetWidth; // flush styles before transitions come back
    done(kind);
    return Promise.resolve();
  }
  const t = document.startViewTransition(() => flushSync(update));
  return t.finished.finally(() => done(kind));
};
