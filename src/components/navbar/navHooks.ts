import { useEffect, useState } from "react";

export const sections = [
  ["about", "About"],
  ["experience", "Experience"],
  ["journey", "Journey"],
  ["projects", "Projects"],
  ["contact", "Contact"],
] as const;

// Which section is under the middle of the screen (scroll-spy).
export const useActiveSection = () => {
  const [active, setActive] = useState<string>("about");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" } // a thin band across the middle of the viewport
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
};

// Scrolled past the top? And which way is the user scrolling?
export const useScroll = (threshold = 12) => {
  const [state, setState] = useState({ scrolled: false, down: false });
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return; // ignore jitter
      setState({ scrolled: y > threshold, down: y > last && y > 120 });
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return state;
};

// Mobile menu: Esc closes it, optional page-scroll lock while open.
export const useMenu = (lockScroll = false) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    if (lockScroll) document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      if (lockScroll) document.documentElement.style.overflow = "";
    };
  }, [open, lockScroll]);
  return { open, setOpen, toggle: () => setOpen((o) => !o), close: () => setOpen(false) };
};
