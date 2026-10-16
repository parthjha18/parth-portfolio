"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/lib/data";

type Status = "idle" | "sending" | "sent" | "error";

const aboutOptions = [
  "Portfolio website",
  ...projects.map((p) => p.title),
  "Something else",
];

const fieldClass =
  "w-full rounded-md border border-border bg-surface-raised/50 px-3 py-2 font-mono text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted/50 focus:border-accent-cyan/50";

export default function Suggestions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="feedback" className="relative px-4 py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent-magenta">
            {"// FEEDBACK"}
          </div>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Got a <span className="text-glow-magenta">suggestion</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-text-muted">
            Ideas for this site or any of my projects are welcome. Your message goes
            straight to my inbox, it is never shown publicly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-xl border border-border bg-surface/50 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
            <span className="ml-2 font-mono text-xs text-text-muted">suggest.sh — private</span>
          </div>

          <form onSubmit={onSubmit} className="space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-text-muted">
                  About
                </span>
                <select name="about" defaultValue={aboutOptions[0]} className={fieldClass}>
                  {aboutOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-text-muted">
                  Name <span className="text-text-muted/50">(optional)</span>
                </span>
                <input name="name" maxLength={80} autoComplete="name" className={fieldClass} />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Email <span className="text-text-muted/50">(optional, only if you want a reply)</span>
              </span>
              <input
                name="email"
                type="email"
                maxLength={120}
                autoComplete="email"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-mono text-xs uppercase tracking-wider text-text-muted">
                Suggestion
              </span>
              <textarea
                name="message"
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                placeholder="What would make this better?"
                className={`${fieldClass} resize-y`}
              />
            </label>

            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-lg border border-accent-cyan/50 bg-accent-cyan/10 px-6 py-3 font-mono text-sm font-medium text-accent-cyan transition-all duration-300 hover:bg-accent-cyan/20 disabled:opacity-50"
                data-cursor="link"
                data-cursor-text="SEND"
              >
                {status === "sending" ? "Sending..." : "Send suggestion"}
              </button>
              <p role="status" className="font-mono text-xs">
                {status === "sent" && (
                  <span className="text-accent-green">✓ Sent privately. Thank you!</span>
                )}
                {status === "error" && <span className="text-red-400">{error}</span>}
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
