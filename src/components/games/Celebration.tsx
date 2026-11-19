import React from "react";
import { createPortal } from "react-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

// Full-screen confetti in a clipped fixed layer: the canvas is window-sized
// (includes the scrollbar), so without the clip it adds a horizontal scrollbar.
// Portalled to <body>: the game board is a CSS container (layout containment),
// which would otherwise become the containing block for this fixed layer.
const Celebration: React.FC<{ pieces?: number }> = ({ pieces = 250 }) => {
  const { width, height } = useWindowSize();
  return createPortal(
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2000 }}
    >
      <Confetti width={width} height={height} recycle={false} numberOfPieces={pieces} />
    </div>,
    document.body
  );
};

export default Celebration;
