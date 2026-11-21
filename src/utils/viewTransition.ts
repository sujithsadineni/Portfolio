import { flushSync } from "react-dom";

// Run a DOM/state update inside a native View Transition.
// `kind` becomes a class on <html> (vt-<kind>) so CSS can style each kind of
// transition separately. Falls back to a plain update when unsupported or when
// the user prefers reduced motion.
export const withViewTransition = (kind: string, update: () => void): Promise<void> => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add(`vt-${kind}`);
  if (!document.startViewTransition || reduce) {
    // instant switch: vt-<kind> still pauses CSS transitions for this frame
    update();
    void root.offsetWidth; // flush styles before transitions come back
    root.classList.remove(`vt-${kind}`);
    return Promise.resolve();
  }
  const t = document.startViewTransition(() => flushSync(update));
  return t.finished.finally(() => root.classList.remove(`vt-${kind}`));
};
