"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative px-4 py-20" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-green">
            // ACHIEVEMENTS
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Milestones.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="group glow-shadow-green relative overflow-hidden rounded-xl border border-border bg-surface/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent-green/30"
            >
              {/* Icon */}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-accent-green/20 bg-accent-green/10 text-lg">
                {i === 0 ? "💻" : i === 1 ? "🏆" : "📚"}
              </div>
              <p className="text-sm leading-relaxed text-text-primary">{achievement}</p>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-accent-green/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
