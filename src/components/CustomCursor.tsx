"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const cyan = (percent: number) =>
  `color-mix(in srgb, var(--accent-cyan) ${percent}%, transparent)`;

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="project"], [data-cursor="link"], [data-cursor="text"]'
      );
      if (interactive) {
        setHovered(true);
        const text = interactive.getAttribute("data-cursor-text");
        setHoverText(text || "");
      } else {
        setHovered(false);
        setHoverText("");
      }
    };

    document.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <style jsx global>{`
        body.custom-cursor * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovered ? 2.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="rounded-full transition-all duration-200"
          style={{
            width: hovered ? "60px" : "8px",
            height: hovered ? "60px" : "8px",
            backgroundColor: hovered ? cyan(20) : cyan(60),
            backdropFilter: hovered ? "blur(4px)" : "none",
            border: hovered ? `1px solid ${cyan(30)}` : "none",
          }}
        />
        {hoverText && (
          <span
            className="absolute text-[8px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent-cyan)" }}
          >
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
}
