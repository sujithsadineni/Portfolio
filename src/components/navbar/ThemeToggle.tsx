import React, { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { withViewTransition } from "../../utils/viewTransition";

type Theme = "light" | "dark";
const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  // index.html already set data-theme before first paint
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) ?? "dark");
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    withViewTransition("theme", () => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    });
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: theme still applies for this visit */
    }
  };
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggle} aria-label={label} title={label}>
      <span className="theme-icon" key={theme}>
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </span>
    </button>
  );
};

export default ThemeToggle;
