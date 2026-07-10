"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const codeSnippets = [
  "class SystemBuilder { constructor() { this.skills = ['ML', 'FullStack']; } }",
  "const Parth = { title: 'Developer & ML Engineer', location: 'Bangalore' };",
  "function solve(n) { return n <= 1 ? n : solve(n-1) + solve(n-2); }",
  'db.collection("projects").find({ type: "fullstack" }).sort({ impact: -1 })',
  "model.fit(X_train, y_train, epochs=50, validation_split=0.2)",
  'git commit -m "feat: build recommendation engine"',
  "docker compose up --build -d && npm run dev",
  "@app.post('/recommend') async def get_recommendations(user_id: str):",
  "SELECT * FROM accommodations WHERE trust_score > 0.8 ORDER BY distance;",
  "const app = express(); app.use(cors(), json(), authMiddleware);",
];

function LetterScramble({ text, className = "" }: { text: string; className?: string }) {
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`".split("");
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 20;
    const interval = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        setDisplay(text);
        setDone(true);
        clearInterval(interval);
        return;
      }
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            return frame > i ? char : chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={`${className} ${done ? "" : "text-accent-cyan"}`}>
      {display}
      {!done && <span className="ml-0.5 animate-pulse">|</span>}
    </span>
  );
}

export default function Hero() {
  const [codeIndex, setCodeIndex] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);

  // Rotating code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((i) => (i + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* Code stream background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
        <div className="mt-20 space-y-3 font-mono text-xs leading-relaxed text-accent-cyan">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="animate-code-scroll"
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                transform: `translateX(${(Math.random() - 0.5) * 40}px)`,
              }}
            >
              {codeSnippets[i % codeSnippets.length]}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        {/* Small tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 font-mono text-xs text-text-muted backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse" />
          SYSTEM ONLINE — BANGALORE, INDIA
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-4 text-5xl font-bold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block">I'm{" "}
            <span className="text-glow-cyan">
              <LetterScramble text={personalInfo.fullName} />
            </span>
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-text-muted">
            {personalInfo.tagline}
          </span>
        </motion.h1>

        {/* Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-text-muted leading-relaxed"
        >
          {personalInfo.statement}
        </motion.p>

        {/* Live code ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto max-w-xl"
          ref={codeRef}
        >
          <div className="rounded-lg border border-border bg-surface/80 px-4 py-3 font-mono text-xs backdrop-blur-sm">
            <div className="mb-1 flex items-center gap-2 text-text-muted">
              <span className="text-accent-cyan">$</span>
              <span>~/code</span>
              <span className="ml-auto text-accent-green">● live</span>
            </div>
            <div className="h-5 overflow-hidden">
              <motion.div
                key={codeIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-text-primary"
              >
                <span className="text-accent-magenta">❯</span>{" "}
                {codeSnippets[codeIndex]}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="group glow-shadow-cyan relative overflow-hidden rounded-lg border border-accent-cyan/50 bg-accent-cyan/10 px-6 py-3 font-mono text-sm font-medium text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/20"
            data-cursor="link"
            data-cursor-text="EXPLORE"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-accent-cyan/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-lg border border-border bg-surface/50 px-6 py-3 font-mono text-sm font-medium text-text-primary backdrop-blur-sm transition-all duration-300 hover:border-text-muted"
            data-cursor="link"
            data-cursor-text="CONTACT"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Scroll
          </span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-accent-cyan to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
