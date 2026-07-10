"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "SYSTEM INITIALIZING...", delay: 0 },
  { text: "> Loading kernel modules...", delay: 300 },
  { text: "> Mounting filesystems... OK", delay: 600 },
  { text: "> Initializing display engine... OK", delay: 900 },
  { text: "> Establishing network connections... OK", delay: 1200 },
  { text: "> Loading user profile: PARTH", delay: 1500 },
  { text: "> Verifying credentials... OK", delay: 1800 },
  { text: "", delay: 2100, isDivider: true },
  { text: "╔══════════════════════════════════╗", delay: 2200 },
  { text: "║    PARTH — SYSTEM v1.0.0         ║", delay: 2300 },
  { text: "║    Full-Stack Developer          ║", delay: 2400 },
  { text: "║    ML Engineer                   ║", delay: 2500 },
  { text: "╚══════════════════════════════════╝", delay: 2600 },
  { text: "", delay: 2700, isDivider: true },
  { text: "SYSTEM READY. ENTERING PORTFOLIO...", delay: 2800 },
];

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    const total = bootLines[bootLines.length - 1].delay + 1200;
    setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 800);
    }, total);

    return () => {
      // cleanup handled by component unmount
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-bg"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-sm leading-relaxed">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={
                  line.isDivider
                    ? "h-2"
                    : line.text.startsWith("╔") || line.text.startsWith("╚")
                    ? "text-accent-cyan"
                    : line.text.startsWith("║")
                    ? "text-accent-cyan"
                    : line.text.startsWith(">")
                    ? "text-text-muted"
                    : line.text.startsWith("SYSTEM READY")
                    ? "text-accent-green font-bold"
                    : "text-accent-cyan font-bold"
                }
              >
                {line.text.startsWith(">") ? (
                  <>
                    <span className="text-accent-cyan">{line.text}</span>
                    {i === visibleLines - 1 && !done && (
                      <span className="ml-1 animate-pulse text-accent-cyan">_</span>
                    )}
                  </>
                ) : line.text.startsWith("╔") || line.text.startsWith("╚") || line.text.startsWith("║") ? (
                  <span className="drop-shadow-[0_0_6px_rgba(0,240,255,0.5)]">
                    {line.text}
                  </span>
                ) : line.text.startsWith("SYSTEM") ? (
                  <>
                    <span className="text-accent-green">{line.text}</span>
                    <span className="ml-1 animate-pulse text-accent-green">_</span>
                  </>
                ) : (
                  <span>{line.text}</span>
                )}
                {i === visibleLines - 1 && line.text.startsWith(">") && (
                  <span className="ml-1 animate-pulse text-accent-cyan">_</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
