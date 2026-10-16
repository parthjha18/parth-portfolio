"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, education, stats } from "@/lib/data";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            {"// ABOUT_ME"}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Building at the{" "}
            <span className="text-glow-cyan">intersection</span> of
            <br />
            engineering & intelligence.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-3"
          >
            <motion.p variants={fadeUp} className="mb-6 text-lg leading-relaxed text-text-muted">
              {personalInfo.about}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {["Java", "Full-Stack", "Agentic AI", "System Design", "DSA"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-surface px-3 py-1 font-mono text-xs text-text-muted"
                >
                  #{tag.toLowerCase().replace(/\s+/g, "_")}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* System Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="rounded-xl border border-border bg-surface/50 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-accent-green" />
                SYSTEM STATS
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-mono text-sm text-text-muted">Status</span>
                  <span className="font-mono text-sm text-accent-green">{stats.status}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-mono text-sm text-text-muted">Location</span>
                  <span className="font-mono text-sm text-text-primary">{personalInfo.location}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-mono text-sm text-text-muted">Education</span>
                  <span className="font-mono text-sm text-text-primary">B.E. ISE</span>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <span className="font-mono text-sm text-text-muted">GPA</span>
                  <span className="font-mono text-sm text-accent-cyan">{stats.gpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-sm text-text-muted">LeetCode</span>
                  <span className="font-mono text-sm text-accent-magenta">{stats.leetcode}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-text-muted">
            Education
          </h3>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                className="group flex items-start gap-4"
              >
                <div className="mt-1.5 flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full border border-accent-cyan bg-accent-cyan/20 group-hover:bg-accent-cyan/50 transition-colors" />
                  <div className="h-full w-[1px] bg-border" />
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-text-primary">{edu.institution}</h4>
                    <span className="font-mono text-xs text-accent-cyan">{edu.gpa}</span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-text-muted">{edu.degree}</p>
                  <p className="font-mono text-xs text-text-muted/60">{edu.period}</p>
                  {edu.highlight && (
                    <p className="mt-2 inline-block rounded-md bg-accent-green/10 px-2 py-0.5 font-mono text-xs text-accent-green">
                      ★ {edu.highlight}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
