import React, { useState, useRef } from "react";
import Typewriter from "typewriter-effect";
import { FaFilePdf, FaLinkedin } from "react-icons/fa";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./About.scss";

type Bubble = {
  name: string;
  src: string;
  style: {
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
  };
};

const techLogos = [
  { name: "React", src: "/Portfolio/assets/react.svg" },
  { name: "Node.js", src: "/Portfolio/assets/nodejs.svg" },
  { name: "AWS", src: "/Portfolio/assets/aws.svg" },
  { name: "GraphQL", src: "/Portfolio/assets/graphql.svg" },
  { name: "Docker", src: "/Portfolio/assets/docker.svg" },
  { name: "TypeScript", src: "/Portfolio/assets/typescript.svg" },
  { name: "Java", src: "/Portfolio/assets/java.svg" },
  { name: "Spring", src: "/Portfolio/assets/spring.svg" },
  { name: "Angular", src: "/Portfolio/assets/angular.svg" },
];

const generateGridPositions = (cols: number, rows: number) => {
  const positions = [];
  const gapX = 100 / cols;
  const gapY = 100 / rows;
  for (let i = 0; i < cols * rows; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions.push({
      top: `${row * gapY + Math.random() * 5}%`,
      left: `${col * gapX + Math.random() * 5}%`,
      animationDuration: `${8 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    });
  }
  return positions;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const About: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppingIndex, setPoppingIndex] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [scoreMessage, setScoreMessage] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { width, height } = useWindowSize();

  const startGame = () => {
    const newPositions = generateGridPositions(3, 3);
    setBubbles(
      shuffleArray(techLogos).map((logo, i) => ({
        ...logo,
        style: newPositions[i],
      }))
    );
    setStartTime(null);
    setScoreMessage(null);
    setGameStarted(true);
    setShowConfetti(false);
  };

  const popBubble = (index: number) => {
    if (!startTime) setStartTime(Date.now());
    setPoppingIndex(index);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    setTimeout(() => {
      setBubbles((prev) => {
        const updated = prev.filter((_, i) => i !== index);
        if (updated.length === 0 && startTime) {
          const duration = ((Date.now() - startTime) / 1000).toFixed(2);
          setScoreMessage(`🎉 You popped all logos in ${duration} seconds!`);
          setShowConfetti(true);
        }
        return updated;
      });
      setPoppingIndex(null);
    }, 200);
  };

  return (
    <section id="about">
      <div className="about-wrapper">
        <div className="about-text">
          <h1>👋 Hi, </h1>
          <h1>I'm Sujith Kumar Sadineni</h1>
          <div className="typewriter-text">
            <Typewriter
              options={{
                strings: [
                  "Senior Full-Stack Developer",
                  "7 Years of Professional Experience",
                  "AWS Certified Solution Architect 🚀",
                  "React.js | Angular.js | TypeScript ",
                  "Node.js | Java | SpringBoot | Express.js",
                  "Building Scalable & Secure Web Apps",
                  "Providing End to End Solutions",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 25,
              }}
            />
          </div>

          <p>
            I'm a results-driven Full-Stack Developer with over 6 years of
            experience designing and building scalable, high-performance web
            applications. I specialize in{" "}
            <strong>React.js, Next.js, Java, Node.js, TypeScript</strong>, and
            cloud platforms like <strong>AWS</strong>. My work focuses on secure
            API design, responsive UI/UX, and enterprise-grade architecture
            across full SDLC.
          </p>

          <div className="button-group">
            <a
              href="https://www.linkedin.com/in/sujith-sadineni-508322209/"
              className="linkedin-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin style={{ marginRight: "8px" }} />
              LinkedIn
            </a>

            <a
              href="/Portfolio/Sujith_Sadineni_React.pdf"
              className="resume-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFilePdf style={{ marginRight: "8px" }} />
              My Resume
            </a>
          </div>
        </div>

        <div className="tech-bubble-game">
          <h2>👆 CLICK TO POP THE LOGO</h2>
          <div className="game-controls">
            {!gameStarted && (
              <button className="game-button" onClick={startGame}>
                Start Game
              </button>
            )}
            {scoreMessage && (
              <>
                <p className="score-message animate-score">{scoreMessage}</p>
                <button className="game-button" onClick={startGame}>
                  Restart Game
                </button>
              </>
            )}
          </div>

          {gameStarted && (
            <div className="bubble-area">
              {bubbles.map((bubble, index) => (
                <img
                  key={index}
                  src={bubble.src}
                  alt={bubble.name}
                  className={`bubble fade-in ${
                    poppingIndex === index ? "popping" : ""
                  }`}
                  style={{
                    top: bubble.style.top,
                    left: bubble.style.left,
                    animationDuration: bubble.style.animationDuration,
                    animationDelay: bubble.style.animationDelay,
                    position: "absolute",
                  }}
                  title={`Click to pop ${bubble.name}`}
                  onClick={() => popBubble(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {showConfetti && <Confetti width={width} height={height} />}
      <audio ref={audioRef} src="/Portfolio/pop.mp3" preload="auto" />
    </section>
  );
};

export default About;
