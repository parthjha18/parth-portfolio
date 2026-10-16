"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  Languages: "from-blue-400 to-blue-600",
  Web: "from-cyan-400 to-cyan-600",
  Frameworks: "from-purple-400 to-pink-500",
  Databases: "from-emerald-400 to-emerald-600",
  "ML/AI": "from-orange-400 to-red-500",
  Tools: "from-yellow-400 to-amber-500",
  "Core CS": "from-violet-400 to-indigo-500",
};

export default function SkillsConstellation() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-magenta">
            {"// SKILLS"}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Tech <span className="text-glow-magenta">constellation</span>.
          </h2>
        </motion.div>

        {/* Category filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap gap-2"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-300 ${
              activeCategory === null
                ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                : "border-border text-text-muted hover:border-text-muted"
            }`}
          >
            All
          </button>
          {Object.keys(skills).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all duration-300 ${
                activeCategory === cat
                  ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                  : "border-border text-text-muted hover:border-text-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Constellation grid */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-xl border border-border bg-surface/30 p-6 sm:p-10"
        >
          {/* Category groups */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills)
              .filter(([cat]) => !activeCategory || cat === activeCategory)
              .map(([category, items], groupIdx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + groupIdx * 0.1 }}
                >
                  <div className="rounded-lg border border-border bg-surface-raised/50 p-4 transition-all duration-300 hover:border-accent-cyan/30 hover:shadow-[0_0_12px_rgba(0,240,255,0.04)]">
                    <div className="mb-3 flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
                      <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
                        {category}
                      </h3>
                      <span className="ml-auto font-mono text-[10px] text-text-muted/40">
                        {items.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="group/skill relative overflow-hidden rounded-md border border-border/50 bg-surface/50 px-2.5 py-1 font-mono text-xs transition-all duration-200 hover:border-accent-cyan/30 hover:bg-accent-cyan/5 hover:text-accent-cyan"
                        >
                          {skill}
                          <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-accent-cyan/5 to-transparent transition-transform duration-500 group-hover/skill:translate-x-full" />
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Decorative grid overlay */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
            aria-hidden="true"
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
