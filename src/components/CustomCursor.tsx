"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function getCyanRgb(): string {
  if (typeof document === "undefined") return "0, 240, 255";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-cyan-rgb")
      .trim() || "0, 240, 255"
  );
}

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cyanRgb = useRef("0, 240, 255");

  useEffect(() => {
    cyanRgb.current = getCyanRgb();
    const observer = new MutationObserver(() => {
      cyanRgb.current = getCyanRgb();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
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
  }, [mouseX, mouseY, visible]);

  const rgb = cyanRgb.current;

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
            backgroundColor: hovered
              ? `rgba(${rgb}, 0.2)`
              : `rgba(${rgb}, 0.6)`,
            backdropFilter: hovered ? "blur(4px)" : "none",
            border: hovered ? `1px solid rgba(${rgb}, 0.3)` : "none",
          }}
        />
        {hoverText && (
          <span
            className="absolute text-[8px] font-mono font-semibold uppercase tracking-widest"
            style={{ color: `rgba(${rgb}, 1)` }}
          >
            {hoverText}
          </span>
        )}
      </motion.div>
    </>
  );
}
