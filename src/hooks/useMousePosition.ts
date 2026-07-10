"use client";
import { useState, useEffect, useRef } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return pos;
}
