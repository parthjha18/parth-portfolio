"use client";
import { useRef, useEffect } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
}

function getCyanRgb(): string {
  if (typeof document === "undefined") return "0, 240, 255";
  return getComputedStyle(document.documentElement)
    .getPropertyValue("--accent-cyan-rgb")
    .trim() || "0, 240, 255";
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMousePosition();
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const cyanRgb = useRef("0, 240, 255");

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    // Read accent colour and watch for theme changes
    cyanRgb.current = getCyanRgb();
    const observer = new MutationObserver(() => {
      cyanRgb.current = getCyanRgb();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 120);
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const rgb = cyanRgb.current;

      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.02;
          p.vy += (dy / dist) * force * 0.02;
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i];
          const b = particles.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / 120) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
