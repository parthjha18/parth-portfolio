"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 1024) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
      className="group"
    >
      <div
        className="relative cursor-pointer"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(!expanded)}
        data-cursor="project"
        data-cursor-text={expanded ? "CLOSE" : "VIEW"}
      >
        {/* Main card */}
        <div className="glow-shadow-cyan relative overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm transition-all duration-500 hover:border-accent-cyan/30">
          {/* Gradient accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-cyan">
                  Project #{String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">{project.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{project.subtitle}</p>
              </div>
              {/* Metrics */}
              <div className="hidden gap-3 sm:flex">
                {project.metrics.map((m, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-lg font-bold text-accent-cyan">{m.value}</div>
                    <div className="font-mono text-[10px] uppercase text-text-muted">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case study - always visible summary */}
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">Problem</div>
                <p className="text-sm leading-relaxed text-text-primary">{project.problem}</p>
              </div>
              <div>
                <div className="mb-1 font-mono text-xs uppercase tracking-wider text-text-muted">Approach</div>
                <p className="text-sm leading-relaxed text-text-primary">{project.approach}</p>
              </div>
            </div>

            {/* Result (always visible) */}
            <div className="mb-4 rounded-lg border border-border/50 bg-surface/50 p-3">
              <div className="mb-1 font-mono text-xs uppercase tracking-wider text-accent-green">Result</div>
              <p className="text-sm leading-relaxed text-text-primary">{project.result}</p>
            </div>

            {/* Expanded tech stack */}
            <motion.div
              animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-border">
                <div className="mb-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                  Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs text-text-muted transition-colors hover:border-accent-cyan/30 hover:text-accent-cyan"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Expand indicator */}
            <div className="mt-4 flex items-center gap-1 font-mono text-xs text-text-muted/60">
              <span>{expanded ? "▲ Show less" : "▼ Show full tech stack"}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-magenta">
            // PROJECTS
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Systems I've{" "}
            <span className="text-glow-magenta">built</span>.
          </h2>
        </motion.div>

        <div className="space-y-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
