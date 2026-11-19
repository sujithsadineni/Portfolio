import React, { useEffect, useState } from "react";
import Celebration from "./Celebration";
import { games } from "../../data/content";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// Hidden easter egg: ↑ ↑ ↓ ↓ ← → ← → B A anywhere on the page.
const KonamiEgg: React.FC = () => {
  const [on, setOn] = useState(false);

  useEffect(() => {
    console.info(games.konami.consoleHint);
    let recent: string[] = []; // last 10 keys
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      recent = [...recent, key].slice(-CODE.length);
      if (recent.join() === CODE.join()) {
        recent = [];
        setOn(true);
        setTimeout(() => setOn(false), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!on) return null;
  return (
    <>
      <Celebration pieces={400} />
      <div className="konami-toast" role="status">
        {games.konami.message}
      </div>
    </>
  );
};

export default KonamiEgg;
