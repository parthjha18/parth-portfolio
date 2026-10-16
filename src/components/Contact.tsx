"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data";

const socialLinks = [
  {
    name: "LinkedIn",
    url: personalInfo.links.linkedin,
    icon: "in",
    color: "hover:border-accent-cyan/30 hover:text-accent-cyan",
  },
  {
    name: "GitHub",
    url: personalInfo.links.github,
    icon: "gh",
    color: "hover:border-accent-magenta/30 hover:text-accent-magenta",
  },
  {
    name: "LeetCode",
    url: personalInfo.links.leetcode,
    icon: "lc",
    color: "hover:border-accent-green/30 hover:text-accent-green",
  },
  {
    name: "Email",
    url: `mailto:${personalInfo.email}`,
    icon: "@",
    color: "hover:border-accent-cyan/30 hover:text-accent-cyan",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
            {"// CONTACT"}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Let&apos;s{" "}
            <span className="text-glow-cyan">connect</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-muted">
            I&apos;m always open to interesting conversations, project collaborations, or just geeking out about backend systems and AI.
          </p>
        </motion.div>

        {/* Terminal-style contact panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-border bg-surface/50 backdrop-blur-sm"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
            <span className="ml-2 font-mono text-xs text-text-muted">contact.sh — 80×24</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-sm leading-relaxed sm:p-8">
            <div className="mb-4 text-text-muted">
              <span className="text-accent-green">$</span> cat contact_info.txt
            </div>

            <div className="mb-1 flex gap-4">
              <span className="w-20 text-text-muted">Name:</span>
              <span className="text-text-primary">{personalInfo.fullName}</span>
            </div>
            <div className="mb-1 flex gap-4">
              <span className="w-20 text-text-muted">Location:</span>
              <span className="text-text-primary">{personalInfo.location}</span>
            </div>
            <div className="mb-1 flex gap-4">
              <span className="w-20 text-text-muted">Email:</span>
              <button
                onClick={copyEmail}
                className="text-accent-cyan underline underline-offset-2 decoration-border decoration-dotted hover:decoration-accent-cyan transition-all"
              >
                {personalInfo.email}
              </button>
              <span className="text-xs text-text-muted">
                {copied ? "✓ copied!" : "[copy]"}
              </span>
            </div>
            <div className="mb-4 flex gap-4">
              <span className="w-20 text-text-muted">Phone:</span>
              <span className="text-text-primary">{personalInfo.phone}</span>
            </div>

            <div className="mb-4 text-text-muted">
              <span className="text-accent-green">$</span> ./connect.sh --channels
            </div>

            {/* Social links */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  className={`group flex items-center gap-3 rounded-lg border border-border bg-surface-raised/50 p-3 transition-all duration-300 ${link.color}`}
                  data-cursor="link"
                  data-cursor-text={link.name.toUpperCase()}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 font-mono text-xs font-bold text-text-muted group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-text-primary group-hover:text-inherit transition-colors">
                      {link.name}
                    </div>
                    <div className="font-mono text-[10px] text-text-muted/60">connect</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 text-center font-mono text-xs text-text-muted/40"
        >
          <div className="mb-2 flex items-center justify-center gap-4">
            <span>Built with Next.js</span>
            <span className="h-3 w-[1px] bg-border" />
            <span>Framer Motion</span>
            <span className="h-3 w-[1px] bg-border" />
            <span>Tailwind CSS</span>
          </div>
          <p>© {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}
