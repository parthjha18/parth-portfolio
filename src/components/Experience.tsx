"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience, hackathons, certifications } from "@/lib/data";

function GitLogEntry({
  children,
  hash,
  branch,
  date,
  isActive = false,
}: {
  children: React.ReactNode;
  hash: string;
  branch: string;
  date: string;
  isActive?: boolean;
}) {
  return (
    <div className="group flex gap-4 font-mono text-sm">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
            isActive
              ? "border-accent-cyan bg-accent-cyan/20 text-accent-cyan"
              : "border-border bg-surface-raised text-text-muted"
          }`}
        >
          <span className="text-[10px]">◆</span>
        </div>
        <div className="h-full w-[1px] bg-border" />
      </div>
      <div className="flex-1 pb-8">
        <div className="mb-1 flex flex-wrap items-baseline gap-2 text-xs text-text-muted">
          <span className="text-accent-cyan font-mono">{hash}</span>
          <span className="text-border">|</span>
          <span>{branch}</span>
          <span className="text-border">|</span>
          <span>{date}</span>
        </div>
        <div className="rounded-lg border border-border bg-surface/50 p-4 backdrop-blur-sm transition-colors group-hover:border-accent-cyan/20">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-green">
            // EXPERIENCE
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Commit <span className="text-glow-cyan text-accent-green">log</span>.
          </h2>
        </motion.div>

        <div className="space-y-2">
          {/* Experience entries */}
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              <GitLogEntry
                hash={`#${String(i + 1).padStart(4, "0")}`}
                branch={exp.company.toLowerCase().replace(/\s+/g, "-")}
                date={exp.period}
                isActive
              >
                <h3 className="mb-1 text-base font-semibold text-text-primary">{exp.role}</h3>
                <p className="mb-2 text-xs text-accent-cyan">{exp.company}</p>
                <ul className="space-y-1">
                  {exp.description.map((desc, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-text-muted/40" />
                      {desc}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GitLogEntry>
            </motion.div>
          ))}

          {/* Hackathons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GitLogEntry
              hash="#hack"
              branch="hackathons"
              date="2024 – 2025"
            >
              <h3 className="mb-3 text-base font-semibold text-text-primary">Hackathons</h3>
              <div className="space-y-2">
                {hackathons.map((h, i) => (
                  <div key={i} className="flex flex-col gap-1 rounded-md bg-surface-raised/50 p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-magenta">⚡</span>
                      <span className="text-sm font-medium text-text-primary">{h.name}</span>
                    </div>
                    <p className="text-xs text-text-muted pl-5">{h.achievement}</p>
                  </div>
                ))}
              </div>
            </GitLogEntry>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <GitLogEntry
              hash="#cert"
              branch="certifications"
              date="2025"
            >
              <h3 className="mb-3 text-base font-semibold text-text-primary">Certifications</h3>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-accent-green">◆</span>
                    <span className="text-text-primary">{cert.title}</span>
                    <span className="text-text-muted">— {cert.issuer}</span>
                  </div>
                ))}
              </div>
            </GitLogEntry>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
