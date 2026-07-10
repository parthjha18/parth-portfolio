"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find active section
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border/50 bg-[#0a0a0f]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={{ backgroundColor: scrolled ? "rgba(10,10,15,0.8)" : "transparent" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-mono text-sm font-bold text-text-primary hover:text-accent-cyan transition-colors"
            data-cursor="link"
            data-cursor-text="TOP"
          >
            <span className="text-accent-cyan">P</span>arth
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {sections.slice(1).map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`relative px-3 py-2 font-mono text-xs transition-colors duration-200 ${
                  activeSection === section.id
                    ? "text-accent-cyan"
                    : "text-text-muted hover:text-text-primary"
                }`}
                data-cursor="link"
                data-cursor-text={section.label.toUpperCase()}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-accent-cyan/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            ))}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm transition-all duration-300 hover:border-accent-cyan/30"
              aria-label="Toggle theme"
            >
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? "🌙" : "☀️"}
              </motion.span>
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm"
              aria-label="Toggle theme"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1"
              aria-label="Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-5 bg-text-primary"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-[2px] w-5 bg-text-primary"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="h-[2px] w-5 bg-text-primary"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`font-mono text-2xl transition-colors ${
                    activeSection === section.id
                      ? "text-accent-cyan"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
